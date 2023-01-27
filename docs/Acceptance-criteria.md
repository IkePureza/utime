
## Terminology

*  **Acceptance criteria** : a set of requirements that must be met in order to mark a user story complete.  Determines the scope of each user story


*  **User Story:**  see [[User stories|User-stories]]




## Format

*  **Given**  \[condition]…  **When**  \[event]…  **Then** \[result]


* Each criteria refers to  _one_  user story. A user story can have multiple acceptance criteria




## History

*  _Acceptance Criteria will be added before each coding sprint such that user stories of the sprint can be tested in reference to the criteria._ 





|  **Version**  |  **Published**  |  **Changed By**  |  **Comment**  | 
|  --- |  --- |  --- |  --- | 
| v1 | 31/08 | Luca |  Acceptance criteria for  _Sprint 3: Submission & Code_  | 


# Acceptance Criteria


|  **ID**  |  **User Story**  |  **criteria outline**  |  **Given**  |  **When**  |  **Then**  |  **Passing**  | 
|  --- |  --- |  --- |  --- |  --- |  --- |  --- | 
| 001 | be able to sign in/up with everything | <ul><li> _setting username, email and password._ 

</li><li> _sign in with same details when signup_ 

</li><li> _passwords are encrypted_ 

</li><li> _can use google, facebook or email_ 

</li><li> _can sign out_ 

</li></ul> | user has not created an account or forgot details | user inputs incorrect password or username | error login failed, asked to try again |  _Pass_  | 
| user has created an account | user inputs correct details | user is directed to homepage showing house list. |  _Pass_  | 
| user is logged in | user clicks sign-out button | user is directed to login page and must enter details again |  _Pass_  | 
| 002 | update my profile information | <ul><li> _be able to update display name,_ 

</li><li> _update picture_ 

</li><li> _update profile information_ 

</li></ul> | user has created an account | user changes display name | the username of the user is updated in the DB is displayable |  _Pass_  | 
| user has created an account | user changes display image and profile information/preferences | the new information now displays |  _Pass_  | 
| 003 | create a new house | <ul><li> _new house is added to database_ 

</li><li> _user is made owner of house and is automatically joined into house_ 

</li><li> _set name of house_ 

</li><li> _house shows on user homepage, data remains after logging out_ 

</li></ul> | user is logged in | clicks “add new home” | user is redirected to Create House page where  they can configure the house name and description |  _Pass_  | 
| user wants to create a new house | user creates new house with name and description | name and description are added to database upon creation and user is made as ‘owner’ |  _Pass_  | 
| user has signed out | user logs back in | all created/joined houses show on user homepage under ‘Your Homes’ |  _Pass_  | 
| 004 | update my house information | <ul><li> _be able to update house name, icon and description_ 

</li></ul> | user is part of a house and visits house homepage | user clicks ‘more’ | pop up shows allowing changes to house name icon and description |  _Pass_  | 
| user is part of a house | changes are made to house information | new information is sent to DB and displayed for all house members |  _Pass_  | 
| 005 | change priority house user | <ul><li> _change ownership of a house_ 

</li><li> _subsequently change priority access user_ 

</li></ul> | user is part of a house and visits house page | user clicks ‘more’ | an option to change owner of the house is shown, where list of house members are shown |  _Pass_  | 
| user is not the owner | user chooses to become house owner | priority access is given and the old owner no longer has priority access |  _Pass_  | 
| user is the owner | user chooses someone else has owner | priority access changes |  _Pass_  | 
| 006 | invite members to join my house | <ul><li> _need users to invite users (share URLs) to add them to a household_ 

</li><li> _the action will simply add the userID onto the list of users on the household entity._ 

</li></ul> | user is part of a house | invites another user | the new user will be added to the list of users of the household |  _Pass_  | 
| 007 | QR code for each house | <ul><li> _QR code for each house allows users to join a house_ 

</li></ul> | user is not part of the house | user scans QR code | user is redirected to house homepage where they are now a member |  _Not Integrated_  | 
| a house exists | user obtains QR code | the code is only valid for one day |  _Not Integrated_  | 
| 008 | user can leave the house | <ul><li> _in homepage where list of houses show, user can click ‘3 dots’ of a house where popup gives option to leave house_ 

</li></ul> | user is part of a house and is viewing homepage | user clicks 3 dots of a house under ‘Your Houses’ | pop up gives user option to leave house |  _Pass_  | 
| user clicks 3 dots | user clicks ‘leave house’ | user is asked to confirm this decision |  _Pass_  | 
| user wants to leave | user confirms decision to leave | user is removed from list of users in house entity of DB |  _Pass_  | 
| 010 | nested/connected utilities | <ul><li> _have the option to nest (or connect) my appliances together_ 

</li></ul> | house has utilities | user navigates to a utility page | user has option to connect another utility from list of utilities |  _Not Integrated_  | 
| user wants to connect utility to another | user selects another utility to connect and also selects connection hierarchy (which is dependent) | utilities are now connected |  _Not Integrated_  | 
| 2 or more utilities are connected | when booking with father utility (eg bathroom) | connected dependent utility is also booked out (eg toilet connected to bathroom) |  _Not Integrated_  | 
| 011 | add new utilities to my house with name and description | <ul><li> _set name and description of utility_ 

</li><li> _utility can only belong to one house_ 

</li><li> _utility shows in house page_ 

</li><li> _utility schedule is empty at creation_ 

</li></ul> | a house with 0 or more utilities | user clicks add new utility | user is redirected to ‘Add Utility’ page |  _Pass_  | 
| a user has requested to add utility | user enters utility name and description | the utility is saved to the DB and is now part of the house, the utility will now show on the house page |  _Pass_  | 
| new utility is added to the house | user clicks on newly added utility | the user will be redirected to ‘Utility view’ page where the schedule will be empty |  _Pass_  | 
| 012 | book a utility for a specific period with description | <ul><li> _utility can be booked for time period. Includes start time/date and end time_ 

</li><li> _description included when booking_ 

</li><li> _users included when booking (book for who?)_ 

</li></ul> | a house has 1 or more utility | user clicks on a utility | the user will be redirected to the ‘Utility view’ page where they are given the option to reserve a booking |  _Pass_  | 
| user reserves a utility for a specific time period and user(s) | the booking is saved to the DB (booking user(s) and description included) |  _Pass_  | 
| 013 | scheduling clashes are avoided | <ul><li> _app checks utility schedule while booking and does not permit scheduling clashes_ 

</li></ul> | a previous booking has been made | a user requests to book a utility for a time period in which the utility is in-use | an error is presented and user is unable to make the booking |  _Pass_  | 
| 014 | schedule a chore for anyone in regards to a utility | <ul><li> _booking can be made on behalf of other users of a house_ 

</li><li> _booking can be made for multiple users_ 

</li></ul> | a house has 1 or more utility | a booking is being made | an option to book for (multiple) other users is given |  _Not Integrated_  | 
| multiple users are planning to do an activity together | one person books for multiple users | booking is made relevant to User Story 012 |  _Not Integrated_  | 
| 015 | recent bookings appear on my homepage (activity) | <ul><li> _home page of a house displays recent bookings in a intuitive manner_ 

</li></ul> | a house has 1 or more utilities | bookings are made for any of those utilities | most recent booking are shown on house homepage under ‘Activity’ |  _Pass_  | 
| 016 | see bookings of particular utility | <ul><li> _when viewing utility page, bookings are visible with their time/date_ 

</li></ul> | a house has 1 or more utility | the utility page is accessed | the user will be shown the utility schedule, description, name and option to reserve |  _Pass_  | 
| a utility has 1 or more booking | the utility page is accessed | the bookings of future, past and present are visible in the schedule with the time/date in which they were booked |  _Pass_  | 
| 017 | see booking description and user | <ul><li> _when clicking on particular booking, description is shown and user(s) are displayed._ 

</li><li> _If you made the booking, you are given option to CANCEL the booking_ 

</li></ul> | a utility has 1 or more booking | clicking on a particular booking | the booking description is shown and user(s) are displayed. |  _Pass_  | 
| you are the user who made the booking or are a user who was included in the booking | clicking on the booking | description and user(s) are displayed AND the option to cancel the booking |  _Not Integrated_  | 
| a booking is no longer required | the booking is cancelled | the booking is removed from the DB and can no longer be accessed from the schedule |  _Not Integrated_  | 
| 018 | calendar view of utility schedule | <ul><li>utility booking schedule is shown as a calendar

</li><li>able to change time/view of schedule

</li></ul> | bookings have been made | viewing a schedule | schedule appears as a calendar (can see history, future, zoom in and out etc) |  _Pass_  | 
| 019 | email notifications | <ul><li>receive and send email notifications so I am notified and can notify other housemates of bookings

</li></ul> | a house has multiple members | a booking is made | email notifications are sent to people who have email notifications turned on |  _Not Integrated_  | 
| 020 | occupied or free | <ul><li>see in real-time which utilities are occupied or free on my house homepage

</li></ul> | a booking of a utility has been made | the time comes that the booking is active | the utility now shows as occupied on the house homepage |  _Not Integrated_  | 



*****

[[category.storage-team]] 
[[category.confluence]] 
