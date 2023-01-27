Below are some articles that help better understand the practices with using Firebase, and the reasoning behind why we can follow practices which may seem unorthodox under normal circumstances.


## Exposing Firebase API keys
[https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053)


## Firebase Security Rules
At the server level, rules can be set to filter certain users/unauthenticated users, or even by certain values being read or written from the database. This can work in addition to front-end input validation and authentication.

Documentation: [https://firebase.google.com/docs/rules](https://firebase.google.com/docs/rules)


## Database Access on Front-End Code(Firestore)
Read and write calls to Firebase’s Database, Firestore, is implemented all on the front-end side of our code along with the React components. This may seem to pose potential risks for our application, however, there are certain factors that make it secure.


1. Users need to be authenticated to read/write to Firestore.


1. Additionally, Firestore Security Rules can be implemented to ensure unwanted read and write queries are filtered out.





*****

[[category.storage-team]] 
[[category.confluence]] 
