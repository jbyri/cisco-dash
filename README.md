# Cisco Customer Dashboard


This repository holds the TypeScript source code of the [cisco-dashboard](https://github.com/wnamen/cisco-dash)

It's been extended with testing support so you can start writing tests immediately.

**This is not the perfect arrangement for your application. It is not designed for production.
It exists primarily to get you started quickly with learning and prototyping in Angular**

We are unlikely to accept suggestions about how to grow this QuickStart into something it is not.
Please keep that in mind before posting issues and PRs.


## Prerequisites

Node.js and npm are essential to Angular development.

<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.

**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node and npm.

## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

>Doesn't work in _Bash for Windows_ which does not support servers as of January, 2017.

The `npm start` command first compiles the application,
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with `Ctrl-C`.

You're ready to write your application.

### npm scripts
We've captured many of the most useful commands in npm scripts defined in the `package.json`:

* `npm run start:nix` - runs the compiler, mongo db, passport, and lite http server at the same time, in "watch mode".
* `npm run start:win` - same as `start:nix` but for the windows (7+) platform.
* `npm run serve` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server

#### Dev workflow
Local Workflow:

* `npm run dev:win` - restarts the http server and application (but not MongoDB or Passport app). This is faster when development of frontend is the primary goal so the app will refresh more quickly.
* `npm run dev:nix` - same as `dev:win` but for mac / unix workspaces.

#### Build Pipeline
Local Builds
* `npm run build` - runs the TypeScript and SaSS compilers once using `gulp`.

Builds on AWS
* `npm run dist:full` - builds everything and copies to the `dist` directory, including `node_modules` (all JS files)
* `npm run dist:quick` - builds everything and copies only the artifacts generated by OUR code to `dist` directory.

#### Release pipleline
On AWS:
* `npm run deploy:release` - Run this from the repository on your AWS instance. This calls quickDistro task, and upon completion, copies the contents of the dist directory to the /var/www/html server root.
- NOTE: This task currently has issues with completion of copying HUGE folders (i.e `node_modules`) so sometimes a quick `cp -R ~/git/cisco-dash/node_modules /var/www/html/` should solve any issues with missing node_modules.

[John Papa](https://github.com/johnpapa) and
[Christopher Martin](https://github.com/cgmartin)
with excellent support for Angular apps that use routing.

Here are the test related scripts:
* `npm test` - compiles, runs and watches the karma unit tests
* `npm run e2e` - compiles and run protractor e2e tests, written in Typescript (\*e2e-spec.ts)

## Build Pipeline
This build uses gulp to compile typescript code. The resulting js / map files are
placed alongside their .ts counterparts. (\* see gulp.js)

## Testing
The QuickStart documentation doesn't discuss testing.
This repo adds both karma/jasmine unit test and protractor end-to-end testing support.

These tools are configured for specific conventions described below.

*It is unwise and rarely possible to run the application, the unit tests, and the e2e tests at the same time.
We recommend that you shut down one before starting another.*

### Unit Tests
TypeScript unit-tests are usually in the `src/app` folder. Their filenames must end in `.spec.ts`.

Look for the example `src/app/app.component.spec.ts`.
Add more `.spec.ts` files as you wish; we configured karma to find them.

Run it with `npm test`

That command first compiles the application, then simultaneously re-compiles and runs the karma test-runner.
Both the compiler and the karma watch for (different) file changes.

Shut it down manually with `Ctrl-C`.

Test-runner output appears in the terminal window.
We can update our app and our tests in real-time, keeping a weather eye on the console for broken tests.
Karma is occasionally confused and it is often necessary to shut down its browser or even shut the command down (`Ctrl-C`) and
restart it. No worries; it's pretty quick.

### End-to-end (E2E) Tests

E2E tests are in the `e2e` directory, side by side with the `src` folder.
Their filenames must end in `.e2e-spec.ts`.

Look for the example `e2e/app.e2e-spec.ts`.
Add more `.e2e-spec.js` files as you wish (although one usually suffices for small projects);
we configured Protractor to find them.

Thereafter, run them with `npm run e2e`.

That command first compiles, then simultaneously starts the `lite-server` at `localhost:8080`
and launches Protractor.  

The pass/fail test results appear at the bottom of the terminal window.
A custom reporter (see `protractor.config.js`) generates a  `./_test-output/protractor-results.txt` file
which is easier to read; this file is excluded from source control.

Shut it down manually with `Ctrl-C`.

# Passport Authentication
Authentication is supported with Node JS, which runs on the local server at port 5000.
## mongod
mongo db is used to store the user credentials, and must be running
run `./start-mongod.sh` to start mongo db.
run `./start-server.sh` to start the app

## Develpoment (Local)
`npm run start:win` (Windows) or `npm run start` (OSX, Unix)


## Editor of choice
Atom https://atom.io

### Atom Packages
#### Linter
1. [Linter](https://atom.io/packages/linter)
2. [HTML Hint](https://atom.io/packages/linter-htmlhint)
3. [CSS Lint](https://atom.io/packages/linter-csslint)
4. [JS Hint](https://atom.io/packages/linter-jshint)

#### Code Style

##### Beautify and Indentation Detect
Auto format and indent code

1. [Indentation Auto-Detection](https://atom.io/packages/auto-detect-indentation)
2. [Atom Beautify](https://atom.io/packages/atom-beautify)

##### Pigments
Add some color to your code...
1. [Pigments](https://atom.io/packages/pigments)

## Points of interest
  - [Passport Deployment Instructions](./backend/README.md)
  - [AWS Deployment Instructions](./backend/aws/README.md)
  - [Application Documentation](./src/app/README.md)
  - [Charting Documentation](./src/app/components/ui/chart/README.md)
  - [Components Documentation](./src/app/components/README.md)
  - [Assets Documentation](./src/app/assets/README.md)
  - [Services](./src/app/services/README.md)
