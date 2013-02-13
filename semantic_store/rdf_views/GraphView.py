import uuid

from django.db import transaction
from django.http import HttpResponse
from django.views.generic import View

from rdflib import Graph, ConjunctiveGraph, BNode, URIRef


class GraphView(View):
    http_method_names = ['post']
    permit_post_identifier = False

    def new_nodes(self, g):
        raise NotImplementedError()

    def no_nodes_found(self, g):
        raise NotImplementedError()

    def validator(self, request):
        raise NotImplementedError()

    def add_node(self, g, node, uri):
        raise NotImplementedError

    def create_nodes(self, g):
        num_nodes = 0
        graphs = []
        identifiers = []
        nodes = self.new_nodes(g)
        with transaction.commit_on_success():
            for n in nodes:
                num_nodes += 1
                if type(n) is BNode:
                    identifier = URIRef(uuid.uuid4())
                else:
                    identifier = n
                identifiers.append(identifier)
                graphs.append(self.add_node(g, n, identifier))
        if num_nodes is 1:
            return graphs[0].serialize()
        else:
            nodes_str = ""
            g = Graph()
            aggregation = BNode()
            for i in identifiers:
                g.add((aggregation, NS.ore['aggregates'], i))
            nodes_str += g.serialize()
            for g in graphs:
                nodes_str += g.serialize()
            return nodes_str
            
            
    def post(self, *args, **kwargs):
        self.request = args[0]
        if not self.__class__.permit_post_identifier:
            identifier = kwargs['identifier']
            if identifier:
                return HttpResponse(status=400, 
                                    content="URI not permitted in create request.")
        g = Graph()
        try:
            g.parse(data=self.request.body)
        except:
            return HttpResponse(status=400, content="Unable to parse serialization.")
        nodes = self.new_nodes(g)
        if not nodes:
            return HttpResponse(status=400, content=self.no_nodes_found())

        validator = self.validator(self.request)
        for n in nodes:
            if not validator.valid(g, n):
                return HttpResponse(status=400, content=validator.failure)

        created_str = self.create_nodes(g)

        return HttpResponse(status=201, content=created_str)