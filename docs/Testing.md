

|  **Version**  |  **Published**  |  **Changed By**  |  **Comment**  | 
|  --- |  --- |  --- |  --- | 
| v1 | 22/09/22 | Keigo Nagai | Documented used testing frameworks and noteworthy decisions | 
| v2 | 23/09/22 | Keigo Nagai | Additional comments on how to run cypress tests in development. | 
|  |  |  |  | 

The use of Firebase and NextJS allows us to effortlessly create a full-stack application without the need to write extensive APIs and back-end code for a small-scale web application. Therefore, our team of developers will create and run End-to-end and Integration tests per user story/acceptance criteria/JIRA ticket. Cypress will be testing framework which makes front-end and back-end testing on web application easier for us.


## Cypress - [https://www.cypress.io/](https://www.cypress.io/)
A framework that enables us to easily create end-to-end and component tests on our react project.

The tests will produce artifacts (screenshots/videos) that will aid in visualizing the testing procedure and any potential problems.

Articles on best practices for writing Cypress tests:


* [https://docs.cypress.io/guides/references/best-practices](https://docs.cypress.io/guides/references/best-practices)


* [https://www.youtube.com/watch?v=5XQOK0v_YRE](https://www.youtube.com/watch?v=5XQOK0v_YRE)




## Firebase

### [cypress-firebase](https://github.com/prescottprue/cypress-firebase): Bypass Firebase Authentication
Firebase is simple to setup a secure and authenticated web server back-end, however it has it down sides when it comes to flexibility. When testing with Cypress on functionalities that heavily tie in with firebase services, the testing instance is not given permission to read or write data. We use a library provided by [Scott Prue](https://github.com/prescottprue) in order to bypass this problem. 


### [Firebase Emulators](https://firebase.google.com/docs/emulator-suite): Set up testing backend services
Firebase does not provide services to create testing environments for our database, authentication, storage and cloud functions, therefore, an emulated firebase server is run locally to separate production and testing environments. 


## Writing Tests
Tests are written and stored in app/cypress directory.

Refer to official documentation for writing Cypress tests.

[https://docs.cypress.io/guides/overview/why-cypress](https://docs.cypress.io/guides/overview/why-cypress)


## How to Test (in dev mode)

* Ensure Firebase CLI is installed on your machine. - [https://firebase.google.com/docs/cli](https://firebase.google.com/docs/cli)


* Head to the Firebase [Project console](https://console.firebase.google.com/u/0/project/shitimes-f199b/overview) → Project Settings → Service Accounts → Firebase Admin SDK → Generate new Private Key.


* Save the json file into the app directory as serviceAccount.json (make sure it is not pushed to the remote git repository).


* Ensure all dependencies (run npm i) are installed in app/functions directory and build with npm run build



1. Navigate to app/functions file and export .runtimeconfig.json to retrieve runtime env variables.


```
cd app/functions
firebase functions:config:get > .runtimeconfig.json
```
2. Navigate to app directory, and run Node in the development environment (with emulator).


```
cd app
npm run dev:emulator
```
3. After dev build compiles and runs, open a new terminal and run test script with emulators. (Keep terminal with dev build running).


```typescript
// Run tests on emulator head-lessly (without Cypress UI)
npm run test:emulate-run

// Open Cypress testing UI with emulated server
npm run test:emulate-open
```
3. Cypress UI will install/open up to then run E2E/Component tests that are stored in app/cypress/ directory.

The tests will run on emulated firebase servers, which will not affect the firebase services (database, authentication and functions) for production. Scripts are written so that npm run dev





*****

[[category.storage-team]] 
[[category.confluence]] 
