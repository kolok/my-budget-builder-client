# Komber client side

Komber is a SAAS product to manage Hiring planning and budget. It allows CEO, CFO and HR to plan, share and execute their Hiring plan.

This repository is the client side of the App and is linked to another repository :
https://gitlab.com/komber/komber-server

### technologies
##### Vue.js, Koa.js, Node.js, Postgresql

Main technologies used are the following
 * Postgresql as a high performance structured database
 * Node.js / Koa.js as a RESTFul API
 * Vue.js as a client side framework

Specific to Client
   - [Vue](https://vuejs.org/)
   - [ElementUI](https://element.eleme.io/#/en-US)
   - [Axios](https://github.com/axios/axios) (HTTP Client Library)
   - Webpack 4
   - WebpackDevServer (Development mode only)

### Demo:
The Demo is not available yet.
TODO: Click [here](http://demo.komber.io) to see our demo website.

You can sign up or use the following access:
<pre>
  email: admin1@komber.io
  password: azerty
</pre>


### Architecture

    client                  # frontend folder
      ├─src                  # frontend src
      │  ├─api               # api services
      │  │  └─common         # api common components (used by services)
      │  ├─components        # Vue components
      │  │  ├─common         # Vue common component
      │  │  └─_packages_     # Vue component stored by package
      │  ├─store             # state management
      │  │  └─modules
      │  ├─styles
      │  ├─view              # app pages
      │  │  └─_packages_     # pages are stored by packages
      │  ├─router.js         # app router
      │  ├─main.js           # main js: start point of the app
      │  └─App.vue           # Main App page
      └─_config_files_

### Run through Docker

install docker and docker-compose

Launch the server:

```bash
    docker-compose up #(-d)# it will launch server and client side
```

And check the log:

```bash
    docker-compose logs # display the docker's logs
```

After adding a npm module (ex : npm i my_lib --save) you'll need to rebuild the docker image and restart it:

```bash
    docker-compose build --no-cache
    docker-compose restart
```


### ESLint

To manage the code quality, eslint is used.
It is possible to edit the eslint rule in the config files client/.eslintrc.json

Add to run it, use these commands
```bash
npm run eslint     # Check your coding style
npm run eslint-fix # Use auto ESLint fix
```
