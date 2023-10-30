# ConFessAndConQuer

This is inspired by real Truth and Dare game.

## Running 
- Clone the repo into your machine and navigate to there.
- $ npm i
- $ node server.js
  
## Face Recognition Model
The face recognition model is able to detect faces by capturing image. The model is not currently integrated with the project because of limited time.
To run the model:
-Run the app.py
-Go on index.html
-Click on Recognise button on webpage 
-The image is compared with image stored in loginpics folder
-Then it returns the output in terminal

## Dependencies
- Agora SDK
- bcrypt
- JsonWebToken

Note: In order to use Stream feature , you have to follow these steps:
- Signup to Agora.io
- Create a new project with any name
- Configure the project in Live and generate temp RTC Token
- Set Channel name to main & Add App ID and temp Token to main.js
  
