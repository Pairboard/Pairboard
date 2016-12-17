[![Build Status](https://travis-ci.org/Pairboard/Pairboard.svg?branch=master)](https://travis-ci.org/Pairboard/Pairboard)

# Pairboard

Development version of the Pairboard app. This currently has no live hosting or live database.

## Getting started Unix Flavoured Terminals

+ Clone the repo
+ `npm run first` in the root folder
+ `npm start` in the root folder

## Getting started on Windows

+ Clone the repo
+ `npm install` in the root folder
+ **AND** `npm install` in the client folder
+ In the config folder, make a copy of config_template.json and rename it config.json
+ `npm start` in the root folder

---

In both cases, `npm start` will launch client and server concurrently. 
There is no need to run them in separate terminals.

## Linting

This repo has its very own eslint config. To run eslint from the command line `npm run lint`. The client and the server must be linted separately because of differing dependencies, to lint the server, run the command from the root, to lint the client, run the command from `/client`.

Many linting rules can be automatically fixed by eslint. `npm run lint-fix` to automatically fix all fixable linting errors. Again, this must be run separately for the client and server.

Please lint your code before submitting a pull request.

It is recommended you install a linting plugin for your code editor and enable automatic fix on save. For atom this is [linter-eslint](https://atom.io/packages/linter-eslint).
