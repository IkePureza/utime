 _Branching and version-control conventions are documented below_ 



|  **Version**  |  **Published**  |  **Changed By**  |  **Comment**  | 
|  --- |  --- |  --- |  --- | 
| v1 | 15/08/22 | Keigo Nagai | Documented Git related rules and conventions. (Yellow bold text needs modification) | 
| v2 | 15/08/22 | Henrique Pureza | Added branching conventions | 
| v3 | 18/08/22 | Keigo Nagai | Added GitHooks documentation | 
| v3.1 | 22/09/22 | Keigo Nagai | Linked term “Vercel” to CICD pipeline page | 
| v4 | 28/09/22 | Keigo Nagai | Added:<ul><li>Main branch merge procedure

</li></ul> | 


# Git/GitHub
 **Feature based Branching** The team will follow a feature based branching workflow. Each new feature will branch off the main branch, only to be merged back onto the central main branch after resolving any merge conflicts plus code reviews through pull requests.

 **Branching conventions** Use a branch name that is [Internet friendly](https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames). If appropriate, put the JIRA ticket at the start, and use a short description of what your branch achieves.


```
bad, not descriptive and uppercase:
mois-8

bad, not a valid hostname part:
!my-branch#

bad, not Internet friendly (contains underscores, which IE will not accept cookies from):
mois-43_my_branch

good, not from JIRA, but still descriptive:
move-seeds-to-typescript-scripts

good, from JIRA, friendly hostname, descriptive:
mois-8-remove-business-reg-popup

```
When your branch is ready for review, open a Pull Request. Help other developers make sense of your PR by keeping your changes small and relevant. Read this [guide](https://github.com/blog/1943-how-to-write-the-perfect-pull-request) for a good description of what makes a good Pull Request.

To get your branch ready for PR, merge or rebase master into your branch. Read this [excellent rundown](https://medium.com/@porteneuve/getting-solid-at-git-rebase-vs-merge-4fa1a48c53aa) on how to use rebase effectively.

 **Git Commit Message Conventions** Make use of [commitlint](https://commitlint.js.org/#/) as a pre-commit Git hook run using [Husky](https://typicode.github.io/husky/#/) to standardize commit messages to ensure each commit message is meaningful and easy to comprehend. This will also ensure everyone can follow a certain protocol when writing up commit messages.

Using the [standard default convention](https://commitlint.js.org/#/reference-rules), somethings we can standardize among commit messages are to have:


* a set word limit and formatting standards.


* a suitable “type” term (e.g. ‘feat’ for feature, ‘docs’ for documentation change) that describes the type of change being made to the code.


* a title, type term and body.



 **Main Branch Merging Procedure** A pull request with any new features should be accompanied with appropriate testing.

The author of the changes or the addition of the new feature needs to ensure tests are written and passes locally and at the CI stage. An automated CI pipeline is set up with [[GitHub Actions|Testing]] to execute the test suite stored in the cypress test folders. Once all valid tests pass, and reviewers follow the reviewing process, the merge can be pushed to the main branch. 

This will ensure that non-functional and bug-prevalent code is filtered and sought out before being merged to the production branch.

 **Code Reviews (Pull Requests)** An automated CI/CD pipeline is setup through [Vercel](https://github.com/marketplace/actions/cypress-io/) to ensure code can be built with structure standards and formatting in place.

Pull requests on GitHub will be used to review code changes and commits that are to be merged onto a central branch. Approval from at least 2 peers is required for a pull request to be successful and ready for merge. Code reviewers should read through changes made and write critical comments regarding standard code practices and any improvements that could be made.

Additionally, any test results/artifacts (videos, screenshots) should be thoroughly checked to ensure that new features not only work, but pass the acceptance criterion.

A pre-commit GitHook is set in place to check code standards through a linter



*****

[[category.storage-team]] 
[[category.confluence]] 
