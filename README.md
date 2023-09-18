Welcome to Smartbrain. 
Smartbrain is a react app that incorporates the Clarafai API to identify faces in pictures provided by a url.

To set up.

1. run npm install

2. Create a secrets.js file in src and put: 
    export const PAT = "your personal access token";

3. To start development server: npm run start



Color Pallete
2E3532
7E9181
8F9E9A
A0AAB2
C4CACF

Command to start psql on localhost
psql 'smart-brain'
then open psql app

TODO:  
Add loading spinner when waiting for data for recognition
    - Add state for loading: starts as false set to true after the fetch starts set back to false when the result comes back
    - display it conditionally based upon the loading state
(Takes a while when the file is uploaded)
Move model switch to the bottom next to where it says model: 
Profile page
Add invalid email or password on incorrect attempt
    