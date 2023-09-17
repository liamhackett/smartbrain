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

Ideas to improve project:
- Add ranking on another page and show the leaderboards highlighting the signed in user
- Add a home page/landing page explaining whats going on
    - Have a button that says Demo or try now
- Maybe find an interesting font for the SmartBrain title

SUNDAY 

Add ability to upload file - Create new test branch to do this -> merge into master if it works
    use new states for file 
    pass the file to the face rec component and then convert it to bits there (might fix the issue i was having earlier)
    
    create function to convert file to base64
    add a check to see if its a file and change the fetch according
    add switch to imageLinkForm and input
    Get image to display on face rec
    