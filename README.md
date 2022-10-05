
# Ketch Up!

## Introduction

Ketchup is a real-time chat work collabration app. 

You can create a chat for anything worth discussing, from team projects to company-wide initiatives. 

With each chat, it comes with a Google Doc and Google Sheets which can be used to collabrate with your peers.

## Setup

Install dependencies with `npm install --force`.

## Running Webpack Development Server

```sh
npm start
```


## Stack
- React
- Firebase
- Redux
- Tailwind

## Pages

### Log In Page

Users sign in with Google handling the security and authentication of the app
![home](./screenshot/homePage.png)


### Home Page
![image](https://user-images.githubusercontent.com/63982069/194167094-bd29fde3-ed82-4ec9-9247-2b25b550dda1.png)

1. Sends a email invitation link to a colleague to start collabrating, which also has email validation
2. Chat history which stores all previous chats and updates in real time whenever a new message is sent
3. Document and Sheet icons are present when there is an associated google document/sheet to the chat
4. Sidebar: Toggles the chat history tab
5. Sidebar: Signs out of the app


### Chat History
![image](https://user-images.githubusercontent.com/63982069/194169757-dfc85f86-952d-40c6-ac9f-f56f37e8eed0.png)

1. Text area to send messages to the chat
2. Leads to the associated google doc/sheet of the selected chat as seen in 3
3. Highlighted tile shows the active chat and associated doc/sheet
4. The option to use speech to text
5. scroll to bottom of the chat for longer chats


### Google Docs and Sheets
Users will have to log onto google which will send a request to the Google API and give permissions to use their google drive to create docs/sheets

![image](https://user-images.githubusercontent.com/63982069/194170143-712fc0b1-a51e-4b75-83e2-1c9629a177c6.png)

After authenticating users are able to create google docs and sheets that will be shared with the selected chat
![google doc](./screenshot/googleDoc.png)

After creating a document/sheet and giving access to the other user, the collaboration can start!
![image](https://user-images.githubusercontent.com/63982069/194172433-cf617134-3b92-4a6e-a38e-ea56aba58b6d.png)
