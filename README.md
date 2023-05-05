# Exquisite Corpse Web App

The Exquisite Corpse Web App is a project based on Vue.js that allows users to play the game "exquisite corpse". The game involves a group of people completing a story. Each player adds a sentence to the story based on the given information, but the given information is only the sentence written by the previous player. This markdown file provides information on how to get started with the project, recommended IDE setup, and deployment instructions using Firebase.

## Installation

To get started with the Exquisite Corpse Web App, follow these steps:
1. Clone the repository
2. Install dependencies 
```
npm install
```
3. Start the development server 
```
npm run dev
```

## Recommended IDE Setup

1. Install [Visual Studio Code](https://code.visualstudio.com/)

## Deployment with Firebase

To deploy the Exquisite Corpse Web App using Firebase, follow these instructions:
1. Download the Firebase CLI 
```
npm install -g firebase-tools
```
2. Login to Firebase 
```
firebase login
```
3. After making changes to the project, build it 
```
npm run build
```
4. Deploy to Firebase 
```
firebase deploy
```

## Features

1. Local version: Designed for in-person gameplay, where players can join the game and play face-to-face.
2. Remote version: Allows players to play online, either by creating their own room or joining an existing one.

## Known Bugs

1. Firefox: player sentences that stretch a few words onto a new line may not be read when the user hits enter.
This is related to how Firefox specifically reads the contenteditable.
2. Safari: the cursor initally does not appear on the screen even though the user can type (and cannot click out
of the contenteditable)
