[![Build Status](https://travis-ci.org/Pairboard/Pairboard.svg?branch=master)](https://travis-ci.org/Pairboard/Pairboard)

# Pairboard

Development version of the Pairboard app. This currently has no live hosting or live database.

## Getting started Unix Flavoured Terminals

+ Clone the repo
+ `npm run first` in the root folder
+ Get your authentication keys (see below)
+ run `mongod` in a separate terminal
+ `npm start` in the root folder

## Getting started on Windows

+ Clone the repo
+ `npm install` in the root folder
+ **AND** `npm install` in the client folder
+ In the config folder, make a copy of config_template.json and rename it config.json
+ Get your authentication keys (see below) 
+ run `mongod` in a separate terminal
+ `npm start` in the root folder

---

In both cases, `npm start` will launch client and server concurrently. 
There is no need to run them in separate terminals.

## Authentication Keys

In order to run the app, you need GitHub OAuth keys, which you can acquire yourself for development purposes.

1. Go to https://github.com/settings/developers
1. Select OAuth Apps and click the New OAuth App button
1. Application Name: pairboard-development
1. Homepage URL: http://localhost:3000
1. Application Description: Auth app for development purposes only
1. Authorization Callback URL: http://localhost:3001/auth/github/callback
1. Click Register Application
1. Copy your Client ID and Client Secret from this page
1. Create a file called `.env` in the root folder of the Pairboard project:
```
CLIENT_ID=**your client id goes here**
CLIENT_SECRET=**your client secret goes here**
CALLBACK_URL=http://localhost:3001/auth/github/callback
```

10. Add the line `.env` to your `.gitignore` file

## Linting

This repo has its own eslint config. To run eslint from the command line `npm run lint`. The client and the server must be linted separately because of differing dependencies, to lint the server, run the command from the root, to lint the client, run the command from `/client`.

Many linting rules can be automatically fixed by eslint. `npm run lint-fix` to automatically fix all fixable linting errors. Again, this must be run separately for the client and server.

Please lint your code before submitting a pull request.

It is recommended you install a linting plugin for your code editor and enable automatic fix on save. For atom this is [linter-eslint](https://atom.io/packages/linter-eslint).
