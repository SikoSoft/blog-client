# blog-client

I know there are a million blog applications out there, but I don't feel like using someone else's code to power mine, so I'm writing my own. This is a personal project intended for myself, so use it at your own discretion.

To see it in action just check out

[blog.sikosoft.com](http://blog.sikosoft.com)

The code is free to use however you want, but it contains no back-end. For the back-end API my blog communicates with, I have [another repository](https://github.com/SikoSoft/blog-server) that serves endpoints this client handles. My back-end is an Azure function app, running MariaDB, but I deliberately decoupled the client from the back-end so this application could be running against a completely different setup.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
