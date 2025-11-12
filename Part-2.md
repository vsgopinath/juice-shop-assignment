# [Add Cover Letter to Profile Page] - Test Scenarios 


## Functional Testing Scenarios

### 1.Verify the existing users of the portal are able to add Coverletter by uploading
#### Steps
1. Login as existing user in the portal
2. Navigate to My resume and skills section
3. Click on Edit button to add cover letter
4. Check the user able to see the option to upload cover
5. Upload DOCX/PDF/HTML file for Cover
6. Check the upload is successful
7. Check the user is able to see the document in his/her profile
8. Validate the user is able to see this new cover letter when applying for a new assignment/role 

### 2.Verify the new users of the portal are able to add Coverletter by uploading
#### Steps
1. Login as existing user in the portal
2. Navigate to My resume and skills section
3. Click on Edit button to add cover letter
4. Check the user able to see the option to upload cover letter
5. Upload DOCX/PDF/HTML file for Cover letter
6. Check the upload is successful
7. Check the user is able to see the document in his/her profile
8. Validate the user is able to see this new cover letter when applying for a new assignment/role

### 3.Verify the users of the portal should not able to upload file > 5MB
#### Steps
1. Login as existing user in the portal
2. Navigate to My resume and skills section
3. Click on Edit button to add cover letter
4. Check the user able to see the option to upload cover letter
5. Upload DOCX/PDF/HTML file greater than 5MB
6. Check the upload is unsuccessful
7. Check the user is able to see the error for Maximum size exceeded

### 4.Verify the users of the portal should able to type in Free Text Area
#### Steps
1. Login as existing user in the portal
2. Navigate to My resume and skills section
3. Click on Edit button to add cover letter
4. Check the user able to see the option to type free text
5. Enter cover letter details in the free text and save
6. Check the text is saved and in non-editable mode
7. Validate the user is able to see this new cover letter when applying for a new assignment/role

### 5.Verify the users of the portal should not able to upload file other file format
#### Steps
1. Login as existing user in the portal
2. Navigate to My resume and skills section
3. Click on Edit button to add cover letter
4. Check the user able to see the option to upload cover letter
5. Upload any JS/TS file
6. Check the upload is unsuccessful
7. Check the user is able to see the error for unsupported file format

### 6.Verify the cover letter details when both upload and free text is given (not part of the requirement details)
#### Steps
1. Login as existing/new user in the portal
2. Navigate to My resume and skills section
3. Click on Edit button to add cover letter
4. Check the user able to see the option to upload cover letter
5. Upload a valid cover letter document
6. Also add cover letter details in free text
7. Check the user is able to select any one of the two cover letter options
8. Validate the user is able to see the selected cover letter when applying for a new assignment/role
   
### 7.Verify the existing user should upload mandatory cover letter (not part of the requirement details)
#### Steps
1. Login as existing user in the portal
2. Navigate to My resume and skills section
3. Click on Edit button to add cover letter
4. Check the Cover Letter section is displayed and specified as mandatory
5. Check the user should not able to save without adding a cover letter by either free text or upload file


### 8.Verify the user have the option to upload or enter cover letter text when applying (not part of the requirement details)
#### Steps
1. Login as existing user in the portal
2. Select any job in the listing and click on apply
3. Check the user is able to see the cover letter option
4. Enter text or upload cover letter and apply for the job
5. Navigate to My resume and skills section
6. Check the user is able to see the cover letter which was added during job apply


## Non-Functional Testing Scenarios

1. Verify the new Cover letter section displayed responsively across different browsers (Usability)
2. Verify the upload file option is working fine in different operating system and browsers (Compatibilty)
3. Validate the upload cover letter api for concurrent users (Performance)
4. Validate the accessibility details and features enabled for upload cover letter (Accessibility)
5. Verify the upload cover letter feature in different languages (Localization)


# Sprint Activities & Process

1. Once the BA/PO create this story, story will need to be refined with the team
2. Myself and along with the team members, we review the stories details mainly in regards to:
   1. Definition of Ready - Design links, API readiness & dependencies with other teams/functionality
   2. Definition of Done - Acceptance Criteria
3. Check with Design or UX team for any questions during or before the refinement
4. Create test scenarios for the story and update in the story
5. Check or review the test scenarios with PO & Developers
6. Once the development is done, verify the functionality in dev or local environment first
7. Once the story is approved and merged to main/release branch, verify the functionality in acceptance environment
8. Once the story is live, monitor for any errors or issues in Production
9. Develop automated test cases to validate this functionality both at UI & API Level
10. Add or update test cases to regression test suite 
11. Make sure the updated regression suite runs on each merge for master & release

