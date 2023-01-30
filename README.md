# Utime

Welcome to COMP30022 Moist-Blast team Capstone project repository. Utime is a CRUD app that aims to make utility sharing between housemates easier.

## Overview
![alt text](https://github.com/IkePureza/shitimes/blob/main/docs/images/storage/confluence_overview_ss.png?raw=true)

## Technology

- Nextjs
- Firebase
- Tailwind CSS
- DaisyUI

## Getting started

### Prerequesites

Make sure you have Node version 16.x installed, you can check running this command in your terminal

```
node -v
```

I recommend installing nvm to manage node versions in your enviroment.

Install yarn:

```
npm install --global yarn
```

For firebase cloud functions, you will need to install firebase tools:

```
npm install -g firebase-tools
```

You should be ready to clone the repo now:

```
gh repo clone IkePureza/shitimes (SHH or GH CLI recommended)
or
git clone https://github.com/IkePureza/shitimes.git
```

Also make sure you have prettier extension installed in VSCode.
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## Install

Go to the app directory:

```
cd app
```

Run yarn install:

```
yarn
```

You should be able to run the app now:

```
yarn run dev
```

## Deploy firebase cloudfunctions

https://firebase.google.com/docs/functions/get-started

Make the changes to the cloud functions files in `/app/functions`

```
cd app/functions
```

Login to firebase

```
firebase login
```

Deploy to firebase

```
firebase deploy --only functions
```

## Linting

We use eslint to lint our typescript application, you can run eslint manually:

```
yarn run lint
```

We use husky and commitlint to automatically lint every commit. We enforce the defualt commitlint rules https://commitlint.js.org/#/reference-rules.
