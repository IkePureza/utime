Zoom recordings of meetings: [https://drive.google.com/drive/folders/1LCBM088xSC2v4Qf2S76OrAywVk8za0-h?usp=sharing](https://drive.google.com/drive/folders/1LCBM088xSC2v4Qf2S76OrAywVk8za0-h?usp=sharing)



|  **Date**  |  **Minutes**  | 
|  --- |  --- | 
| Meeting 1; 04/08 Thursday |  **Agenda** :<ul><li>Team introductions, ice breakers

</li><li>Client and team expectations

</li><li>Discuss ideas for potential CRUD apps, and consolidate thoughts and feedback

</li><li>Paper prototype showcase of one of our ideas ([Excalidraw](https://excalidraw.com/#room=7a6788147fb877f5620c,hEYhkeSIK0RJnQRw8_fZRg))

</li></ul> **Discussion** :<ul><li>Easy and simple CRUD app

</li><li>Client prefers a personal registry app, with the ability to store links to webpages, and a good UI like google drive

</li><li>Team prefers a sharehouse scheduling app as the idea is more original

</li><li>May have some difficulties with database management and scalability on the sharehouse app, as well as potentially not fulfilling the create criteria of CRUD.

</li><li>Sharehouse app is only useful if can manage multiple households and multiple utilities

</li><li>Some people cant control the time they want to use the toilet

</li></ul> **Conclusion** :<ul><li>Personal registry seems simpler. Idea for sharehouse is great, but may be complicated (scalability)

</li><li>Need to decide on whether to proceed with sharehouse app or to switch to personal registry asap

</li></ul> **Action items:** <ul><li>Work out feasibility of database for sharehouse → Henri

</li><li>Rough visual story board for personal registry → Geordan

</li><li>User stories for our MVP (minimum viable product) → Whole team

</li><li>Invite client to confluence space → Henri

</li></ul> | 
| Meeting 2; 17/08 Wednesday |  **Agenda:** <ul><li>Showcase of desktop prototype

</li><li>PoC of backend, feasibility, thoughts

</li><li>Brainstorming user stories with client

</li></ul> **Discussion:** Solved:<ul><li>Create account → Solved with firebase google auth

</li></ul>TBD:<ul><li>To make it as simple as possible, link user to mobile phone (1 user per device) (TBD further)

</li><li>Allowing users to join via code and not just by email invites (security issues, TBD further)

</li></ul>To implement:<ul><li>Add overview page of group members, client and tutor

</li><li>Nothing stopping users from creating separate entities of the same thing in real life (2 people creating “toilet downstairs” under different name)

<ul><li>Autosuggestion, when typing out name do a search on current utilities and suggest (user stories)

</li><li>Creating and changing user roles and privileges (user stories)

<ul><li>If owner wants to leave

</li><li>If normal housemate wants to leave

</li></ul></li></ul></li><li>Asynchronous system (2 people registering for the same timeslot at approx the same time can cause data mismatch) → can be debugged later

</li><li>NoSQL problem (may end up with same piece of data stored in different places eg. booking data is stored both under booking and household → amenities)

</li><li>Instead of nesting things, perhaps linking utilities on the database could be easier (if someone wants to book, if linked utilities are already booked send a warning but allow if user chooses to)

</li><li>Different color for chore vs normal booking

</li><li>Scheduling should be calendar instead of a list of that day

</li></ul> **Conclusion:** <ul><li>User stories (Autosuggestion, allocate user role if new member joins, removing admin role if owner wants to leave)

</li><li>Database management (linking as opposed to nesting)

</li><li>Scheduling should be calendar

</li><li>Next client meeting, we should have a prototype where the client can click through as a user and give his feedback accordingly

</li></ul> **Action items:** <ul><li>Adding user stories → Luca

</li><li>Overview page → Edson

</li><li>Expanding on low fidelity prototype → Geordan

</li><li>Improve more aspects on the database based on the meeting discussion → Henri

</li></ul> | 
| Meeting 3; 21/09 Wednesday |  **Agenda:** <ul><li>Product showcase (local development,figma)

</li><li>Further comments on the product functionality, UI, confluence documentation (if any)

</li><li>CI/CD discussion

</li></ul> **Discussion:** App Review<ul><li>Invite links: Send out invites on email

</li><li>Sign in page: add a loading screen

</li><li>Ability to delete households, utilities, bookings, users

</li><li>User roles: not implemented yet

</li><li>Utilities: eventually expand to user-defined types?

</li><li>Booking utilities: should reroute back to the main house page after booking

</li><li>Logout: bug where it doesn’t refresh page if inside household

</li><li>Settings: themes, darkmode

</li><li>Profile page

</li><li>Nav needs improvement: maybe a side bar (kinda like showing the number of households, followed by utilities within that household, sort of like file explorer)

</li><li>Description of house not showing

</li></ul>CI/CD<ul><li>Client noted our current implementation was impressive

</li><li>Should note in our design notebook/reuse plan

</li><li>Document in our CI/CD design choices

</li></ul> **Conclusion:** App is still working towards mvp, but decent progress so far. **Action items:** <ul><li>Continue implementing app features that are under ‘should have’ in our user stories

</li><li>Add any features mentioned in the discussion into user stories if not there

</li></ul> | 
| Meeting 4; 06/11 |  **Agenda:** <ul><li>Product Handover

<ul><li>Showing the product in terms of the use cases

</li><li>Instructions on how to start up and shutdown the application (READMEs)

</li><li>Populate README with repository structure

</li><li>Accessing the database and hosting service

</li></ul></li></ul> **Discussion:** <ul><li>Did app demo, similar to the presentation

</li><li>Instructed on the startup process, with a note to make READMEs clearer

</li><li>Final comments, post project thoughts and feedback

</li></ul> **Conclusion:** <ul><li>Team did well, not many major hick-ups along the way, good job.

</li></ul> **Action Items:** <ul><li>Populate READMEs with:

<ul><li>Accessing FireBase and Vercel (also invite Shizhan) → Henrique

</li><li>Any other loose ends

</li></ul></li><li>Update the production link on our github → Henrique

</li><li>Invite client to FireBase, Vercel, and GitHub → Henrique

</li></ul> | 
|  |  | 





*****

[[category.storage-team]] 
[[category.confluence]] 
