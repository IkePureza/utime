 _Coding conventions/standards followed by the team are described here_ 



|  **Version**  |  **Published**  |  **Changed By**  |  **Comment**  | 
|  --- |  --- |  --- |  --- | 
| v1 |  | Henrique Pureza | Created page with directory structure and naming standards | 
| v2 | 24/08/22 | Keigo Nagai | Added few pointers on linters | 



|  **To be documented**  |  **Done**  | 
|  --- |  --- | 
| <ul><li>Naming variables

</li><li>Function high cohesion, low coupling

</li><li>Separation of concerns? (how important is this, we must decide in terms of tailwind css)

<ul><li>Inline is okay. Seperation of style and structure not important for us

</li></ul></li></ul> |  | 


### Directory Structure

```
src/
  config/
  
  components/
    <component>/
  ...

```
Naming
* Components are always PascalCase


* Utilities, stylesheets and tests are camelCase


* The following should all be camelCase


    * Utilities


    * Stylesheets


    * Hooks


    * Stories


    * Tests



    
* Higher order components should not be used unless under extraordinary circumstances. Use hooks instead.


    * If they must be used, they should be in PascalCase and should be prefixed using With, such as WithAuthorisation.js



    



 **Linters** 


* [ESlint](https://eslint.org/) is automatically installed with the NextJS framework to detect code quality and coding style issues.


* Commitlint is installed to set and check commit message standards (further discussed [[here|Version-Control]]).






### Testing Standards

* see [[Testing Plan|Testing-Plan]]





*****

[[category.storage-team]] 
[[category.confluence]] 
