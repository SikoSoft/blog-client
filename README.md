# blog-client

I know there are a million blog applications out there, but I don't feel like using someone else's code to power mine, so I'm writing my own. This is a personal project intended for myself, so use it at your own discretion.

To see it in action just check out

[blog.sikosoft.com](http://blog.sikosoft.com)

The code is free to use however you want, but it contains no back-end. For the back-end API my blog communicates with, I have [another repository](https://github.com/SikoSoft/blog-server) that serves endpoints this client handles. My back-end is an Azure function app, running MariaDB, but I deliberately decoupled the client from the back-end so this application could be running against a completely different setup.

# HATEOAS implementation

This blog client is only one part of a HATEOAS designed architecture. The server and the client should not need concern themselves with how the other operates, so long as they both comply with a [common specification](https://github.com/SikoSoft/blog-spec) that acts as the contract between them.

Some background on [HATEOAS](https://restfulapi.net/hateoas/)

Perhaps the most difficult aspect of developing a HATEOAS driven consumer client is the need to manage link dependency within components.

In this implementation, I use a hook into a "context" system that was already being implemented for context-specific content. A context with an ID of "view", will trigger a "contextLinks" call to the server, containing the "props" accompanying it, which will result in the server providing initial links for the current view journey.

For example:

dispatch("addContext", { id: 'view': props: ['tagRoles'] })

The server responds with any matching links for that view context. Because of this relation, consistency between the naming of endpoints on the server, and the names of views and routes used in the client is absolutely crucial to avoid the unnecessary need of additional business logic for case-by-case usage.

# Conventions

All props should be explicitly defined by their expected type.

All includes/requires should omit the file extension when possible.

Use "isOpen" when referring to the state of something, not just "open". Verbs should be reserved for actions, not states.

Use affirmative terminology in all cases. isOpen rather than isClosed.

# To Do

Make as many low level (atomic) components stateless. They should be rendered based on their props alone.

Devise a naming pattern or wrapping structure for components that makes for a clear distinction between pure and impure components (those that trigger API calls, require additional context dependencies, etc). It is starting to become difficult to determine just by looking at a component whether it will trigger API calls or simply render data it is provided as properties.

Suggestions for a pattern that allows for the flexibility, but defines the clear boundaries of usage and naming, are very much welcome.

Create clear separation of conerns regarding whether it is the components duty to issue API requests, or to keep all code related to API communication in the state actions. A high degree of mixing is happening in regard to this at the moment. Where does API communication make more sense to go? Should components own all their concerns, should the API communication be abstracted to an actions file, even if they may only be used in one context or for one purpose? What are the benefits of each?
