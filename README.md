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
2. Install the [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
3. Disable the Vetur extension
4. Install the [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

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
