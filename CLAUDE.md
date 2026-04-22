# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run serve    # Dev server on port 8888
npm run build    # Production build
npm run lint     # ESLint
```

No test suite exists in this project.

## Architecture

**Vue 2 SPA** using Vuex (state), Vue Router (routing), and axios (HTTP). Built with Vue CLI / webpack.

### HATEOAS-driven API

The central design principle: the client never hardcodes API URLs. On startup, `store/actions.js:initialize()` calls `VUE_APP_INIT`, which returns the initial state including a `links` array. Every subsequent API call resolves its URL by looking up a matching link from `src/shared/linkHandlers.js`:

```js
link("GET", "entries", state.links)   // returns { href, method, entity, rel }
```

All API calls go through `actions.js:apiRequest()`, which attaches auth headers and dispatches the resolved link.

### Context System

Beyond the initial links, views register "contexts" with the store (via `addContext()` / `removeContext()`) to signal what the user is currently viewing. The store sends these to `/api/contextLinks`, which returns additional links appropriate for that context (e.g., edit/delete links for a specific entry). Context links are cached by a hash of the context JSON to avoid redundant requests.

This means **feature availability is server-driven**: whether a user can edit/delete/comment on something depends entirely on whether the server returned those links.

### State Shape (`store/initialState.js`)

Key slices:
- `links` — current available HATEOAS links
- `entries` / `entriesById` — paginated entry list and by-ID lookup
- `context` / `contextHistory` — active view contexts
- `user` / `roles` / `authToken` / `sessToken` — auth state
- `editMode` — whether admin edit controls are visible

### Authentication

Login/logout handled via `sessToken` and `authToken` in `localStorage`. Both are sent as request headers on every API call (via `getters.js:headers`). On init, the app also checks `sessionStorage` for a short-lived `accessToken`. Only users with the `blog-admin` role are permitted to log in.

### Entry Editing

Blog post bodies are stored as **Quill Delta format** on the server and rendered to HTML client-side via `quill-delta-to-html`. The `BlogEntryForm.vue` component wraps the Quill editor. Drafts are separate from published entries and have their own CRUD actions.

### Theming

`vue.config.js` maps the `@theme` alias to `src/styles/${VUE_APP_THEME}`, allowing full theme swapping via environment variable. The default theme is `default`.

### Environment Variables

- `VUE_APP_INIT` — initialization endpoint (required)
- `VUE_APP_SITE_NAME` — blog title
- `VUE_APP_THEME` — theme directory name
- `VUE_APP_TRACKING_CODE` — Google Analytics ID
- `VUE_APP_RECAPTCHA_CODE` — reCAPTCHA v2 site key

Multiple `.env` files exist: `.env` (local), `.env.production`, `.env.esf`.

### Route Navigation

`App.vue` intercepts clicks on `.vue-route` anchor tags and calls `router.push()` instead of allowing default browser navigation. This is how server-rendered HTML links (returned in entry bodies or HATEOAS responses) trigger client-side navigation.
