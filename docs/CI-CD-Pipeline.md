

|  **Version**  |  **Published**  |  **Changed By**  |  **Comment**  | 
|  --- |  --- |  --- |  --- | 
| v1 | 22/09/22 | Keigo Nagai | Documented CICD related technologies used and decision making. | 
| v1.2 | 15/10/22 | Keigo | Added relevant GitHub Actions for CI | 


## Continuous Integration (CI)

### Github Actions
cypress.io - [https://github.com/marketplace/actions/cypress-io/](https://github.com/marketplace/actions/cypress-io/)Create a workflow to run cypress tests stored in the application repository.

upload-artifactSaves Cypress test artifacts run per workflow

setup-javaInstalls java on to the CI environment for firebase CLI to run emulators for testing.

 **google-auth** 

Authenticates access to a Google Cloud Project by providing a Service Account key json file. 

 **create-json** 

Creates a JSON file given input for the running CI environment. This is used to create a dummy runtime configuration file for running Cypress tests on Firebase Emulators.


## Continuous Deployment (CD)

### Vercel - [https://vercel.com](https://vercel.com)
Is owned by the company that manages NextJS, and supports/encourages applications built on NextJS to be deployed on Vercel for smoother operations. It provides us with the functionality to build, and start and deploy a preview website for every pull request made on GtiHub, which allows other parties such as clients to preview our application in progress with ease. 

Additionally has a GitHub Actions to build and pass through linters to verify structure of the application.



*****

[[category.storage-team]] 
[[category.confluence]] 
