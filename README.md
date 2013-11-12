DM: Tools For Digital Annotation and Linking
==

[DM Project Wiki Pages](https://github.com/timandres/DM/wiki/_pages)

*The current iteration of DM is at an alpha testing stage.*

DM is an environment for the study and annotation of images and texts. It is a suite of tools, enabling scholars to gather and organize the evidence necessary to support arguments based in digitized resources. DM enables users to mark fragments of interest in manuscripts, print materials, photographs, etc. and provide commentary on these resources and the relationships among them. A principle objective in this project is to continue to develop our understanding of scholarly work processes in order to effectively support research as it is practiced now, while opening the door for new methods of scholarship to emerge

On a technical level, DM consists of two major pieces – a HTML5 front end (found in `workspace/static/`), and a Django based back end which synchronizes and stores the data. While the back end relies upon python rdflib tools to deal with RDF data, the front end uses a custom built RDF data store, synchronization, and querying system maintained in the `sc.data` javascript package in the `workspace/static/js/sc/data/` directory.


Detailed documentation of the design and use of the project's code will be forthcoming as Lead Developer Tim Andres writes his undergraduate thesis on the design and implementation of the project. In the meantime, you can take a look at the [Interacting with RDF Data](https://github.com/timandres/DM/wiki/Interacting-with-RDF-Data) wiki page for an explanation of the core data apis of the system.
