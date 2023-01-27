

|  **Version**  |  **Published**  |  **Changed By**  |  **Comment**  | 
|  --- |  --- |  --- |  --- | 
| v1 | 31/08/22 | Keigo Nagai | Created testing documentation table. | 
| v2 | 14/10/22 | Keigo | Added tests for ID-001, ID-003 and ID-006 | 
| v3 | 22/10/22 | Keigo | Added tests for ID-011, ID-012, ID-013 | 



Refer to [[this page|Testing-Plan]] for testing plan and more on documentation on testing. [[Link for user stories page|User-stories]].



|  **TC-ID**  |  **User Story ID**  |  **Test Case**  |  **Test Steps**  |  **Test Data**  |  **Expected Result**  |  **Test Type**  |  **Configuration**  |  **Passed**  | 
|  --- |  --- |  --- |  --- |  --- |  --- |  --- |  --- |  --- | 
| 001 | 001 | Login page shows correctly | 
1. Visit login page


1. Check whether an h1 element with Login exists



 | NA | There is a h1 element with value “Login” | E2E | Cypress | Passed | 
| 002 | 001 | User can sign up with email | 
1. Visit login page


1. Click ‘Sign Up’ link


1. Enter  _email_  and  _password_ 


1. Check if user is taken to homepage



 |  _email_  = “cypresstest@mail.com” _password_  = “123456” | User is taken to homepage (showing list of houses).Firebase creates a new user document on firestore (can be seen on logs) through execution of cloud function - createUserDocument. | End-to-end | Cypress | Passed | 
| 003 | 001 | User can login with email | 
1. Visit login page


1. Enter  _email_  and  _password_ 


1. Check if user is taken to homepage



 |  _email_  = “cypresstest@mail.com” _password_  = “123456” | User is taken to homepage (showing list of houses). | End-to-end | Cypress | Passed | 
| 004 | 003 | User can create a household | 
1. Login with  _email_  and  _password_ 


1. Click ‘Create household button’


1. Add  _houseInfo_ to form.


1. Submit



 |  _email_  = “cypresstest@mail.com” _password_  = “123456” _houseInfo = {_  _houseName:_  “testHouse” _houseDesc_ : “Test in progress”}  | A new house appears on the list of houses, with the input house details, on the homepage. | End-to-end | Cypress | Passed | 
| 005 | 006-1 | User can send invite to another user | 
1. Login with  _email_  and  _password_ 


1. Click into ‘testHouse’ household page


1. Enter a  _testEmailaddress_ 


1. Click ‘Add’ button next to the input element



 |  _email_  = “cypresstest@mail.com” _password_  = “123456” _testEmailaddress_ = “cypresstest2@mail.com” | “Sent!” should appear on the input element, to indicate that the invite has been successfully sent. | End-to-end | Cypress | Passed | 
| 006 | 006-2 | User cannot send invite to themselves | Same steps as TC-ID005 however, different  _testEmailaddress_  |  _email_  = “cypresstest@mail.com” _password_  = “123456” _testEmailaddress_ = “cypresstest@mail.com” | A error message below the input element, "You can't invite yourself LOL" should appear. | E2E | Cypress | Passed | 
| 007 | 006-3 | User cannot invite already invited users | Same steps as TC-ID005 however, different  _testEmailaddress_ , given that an invite has already been send to this email address in test ID005 |  _testEmailaddress =_ “cypresstest2@mail.com” | A error message below the input element, "Invite already sent to this email address!" should appear. | E2E | Cypress | Passed | 
| 008 | 002 | User can view their profile | 
1. Login with  _email_  and  _password_ 


1. Visit Profile page



 |  _email_  = “cypresstest@mail.com” _password_  = “123456” | Displays username, email and authentication method on the profile page correctly | E2E | Cypress  | Passed | 
| 009 | 011 | Add new utilities to household with name and description | 
1. Login with  _email_ and  _password_ 


1. Go to  _testHouse_ 


1. Click  _Add New Utility_ 


1. Select  _utilityType,_ enter  _utilityName_ and  _utilityDesc_ 


1. Click  _Create Utility_ 



 |  _email_  = “cypresstest@mail.com” _password_  = “123456” _testHouse_ = House created in TC-ID004 _utilityType =_ Toilet _utilityName_ = Test Toilet _utilityDesc_ = Testing | A new utility pops up on the the left column. of the household page, with a button “Go to Utility” which takes the user to the utility page. | E2E | Cypress | Passed | 
| 010 | 012 | User can create a valid booking with a description | 
1. Go to  _utility_ 


1. Click “Book”


1. Enter  _bookingDesc, fromDate, toDate_ 


1. Click “Book“



 |  _utility_ = utility created in TC-ID009 _bookingDesc_ = “Toilet session” _fromDate_ =  an hour after the test commence time _toDate_ = two hours after the test commence time | The form will successfully submit, and the new booking will appear on the calendar on the utility page. | E2E | Cypress | Passed | 
| 011 | 013-1 | User cannot book if  _from_  time is after  _to_ time | Same steps as TC-ID010 |  _utility_ = utility created in TC-ID009 _bookingDesc_ = “Toilet session” _fromDate_ =  two hours after the test commence time _toDate_ = an hour after the test commence time | The input should return a validation message saying that the  _toDate_ has to be after the  _fromDate_ . The booking will not be made. | E2E | Cypress | Passed | 
| 012 | 013-2 | User cannot create clashing bookings | Same steps as TC-ID010 | Same Test Data as TC-ID010 | An error alert will appear on the booking modal describing the clash that is present with the booking the user is trying to create. (This test runs after TC-ID010, which means there is already a booking made in the same time slot in advance.) | E2E | Cypress | Passed | 
| 013 | 004 | Owner can update the house name, and description | 
1. Go to  _household_ 


1. Click Edit button on the dropdown


1. Type in  _newHouseName_ and  _newHouseDesc_ 


1. Click “Edit”



 |  _household:_ Household created in TCID-004. _newHouseName_ = “New House Name” _newHouseDesc_  = “New House Desc” | The House name and description changes and is updated on the database. | E2E | Cypress | Passed | 
| 014 | 008-1 | User can leave the household | 
1. Go to a household


1. Click “Delete/Delegate/Leave Button on the dropdown


1. Click “Leave House”



 | No input data required. Requires the user to be a member and not an owner of the household. | User is redirected to the homepage with a green success alert saying they have left the house. | E2E | Manual | Passed | 
| 014 | 008-2 | User can delete the household | 
1. Go to  _household_ 


1. Click “Delete/Delegate/Leave” on the dropdown


1. Click “Delete House”



 |  _household:_ Household created in TCID-004. | User is redirected to the homepage with a success alert saying the user has successfully deleted the household. | E2E | Cypress | Passed | 
| 015 | 005 | Owner can delegate ownership of household to another member | 
1. Create a household as user A


1. Send an invitation to user B’s email address


1. Logout from user A


1. Login as user B


1. Accept invitation from User A to household.


1. Login as user A again


1. Click into household


1. Click “Delete/Delegate/Leave” on the dropdown menu


1. Select user B as the new owner


1. Click “Delegate”



 |  | After the owner (user A) clicks “Delegate”, the modal will close, showing a green alert and the new owner switched to user B. They will no longer have the option of delegating/deleting the household. | E2E | Manual | Passed | 
| 016 | 016 + 017 | User can see bookings of particular utility | 
1. Go to  _household_ 


1. Go to  _utility_ 


1. Create a  _new booking_ 



 |  _household:_ Household created in TCID-004. _utility:_ Utility created in TCID-009 _new booking:_  Nov 10 2000 14:30 ~ 14:35 | The new booking for the utility will popup on the calendar of the utility with the time (from and to), user’s display name and description. | E2E | Manual | Passed | 
|  |  |  |  |  |  |  |  |  | 





*****

[[category.storage-team]] 
[[category.confluence]] 
