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
