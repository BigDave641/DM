package edu.drew.dm.http;

import edu.drew.dm.Models;
import edu.drew.dm.SemanticStore;
import edu.drew.dm.Server;
import edu.drew.dm.User;
import edu.drew.dm.vocabulary.OpenArchivesTerms;
import edu.drew.dm.vocabulary.Perm;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.sparql.lang.sparql_11.ParseException;
import org.apache.jena.sparql.vocabulary.FOAF;
import org.apache.jena.vocabulary.DCTypes;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author <a href="http://gregor.middell.net/">Gregor Middell</a>
 */
@Path("/store/users")
public class Users {

    private final SemanticStore store;

    @Inject
    public Users(SemanticStore store) {
        this.store = store;
    }


    @Path("/{user}")
    @GET
    public Model read(@PathParam("user") String user, @Context UriInfo ui) {
        return store.read((source, target) -> {
            source.listSubjectsWithProperty(RDFS.label, user)
                    .filterKeep(subject -> subject.hasProperty(RDF.type, FOAF.Agent))
                    .forEachRemaining(agent -> {
                        target.add(agent.listProperties());

                        agent.getModel().listObjectsOfProperty(agent, Perm.hasPermissionOver)
                                .mapWith(RDFNode::asResource)
                                .filterKeep(subject -> subject.hasProperty(RDF.type, DCTypes.Collection))
                                .forEachRemaining(project -> target.add(project.listProperties()));
                    });
        });
    }

    @Path("/{user}")
    @PUT
    public Model update(@PathParam("user") String user, Model model, @Context  UriInfo ui) throws ParseException {
        return store.merge(model);
    }

    public static Model identifiers2Locators(Model model, UriInfo ui) {
        model.listSubjectsWithProperty(RDF.type, FOAF.Agent).forEachRemaining(agent -> {
            model.add(
                    agent,
                    OpenArchivesTerms.isDescribedBy,
                    model.createResource(userResource(ui, agent.getRequiredProperty(RDFS.label).getString()))
            );
        });
        return Models.renameResources(model, (r -> {
            final String uri = r.getURI();
            final URI parsed = URI.create(uri);
            return "user".equals(parsed.getScheme()) ? userResource(ui, parsed.getSchemeSpecificPart()) : uri;
        }));
    }

    public static String locators2Identifiers(Resource resource) {
        final String uri = resource.getURI();
        final Matcher userMatcher = USER_URI.matcher(uri);
        return userMatcher.find() ? User.uri(userMatcher.group(1)): uri;
    }

    private static final Pattern USER_URI = Pattern.compile("/store/users/(.+)$");

    private static String userResource(UriInfo ui, String user) {
        return Server.baseUri(ui)
                .path(Users.class)
                .path(Users.class, "read")
                .resolveTemplate("user", user)
                .build().toString();
    }


}