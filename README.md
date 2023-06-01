# rock-paper-scissors

## Prerequisites

  - A Node version of at least 16 is required to create a React App.
  - Npm is a package manager. It is automatically included in your Node installation. You should have at least npm version 8.

## Technologies Used

    - this project was made using vite template with typescript
    - xstate was used for managing the state machine and the logic of the game
    - Pixi.js and @pixi/react were used to create the UI that the user can play with 

## How to run the project


- Install dependencies with `npm install`
- you can edit the package.json scripts if you wanna change the ports of the server or the web portal
- run the project with `npm run start`
- go to URL `http://localhost:5173/`


## FHS

```
src/
├── App.css
├── App.tsx
├── app
│   ├── gameMachine.ts       (state machine config)
│   └── types.ts              (app types)
├── assets                   (graphic content)
│   ├── paper.png
│   ├── rock.png
│   └── scissors.png
├── components                (UI components)
│   ├── gameHeader.tsx
│   └── gameScore.tsx
├── features
│   └── gameCounter
│       └── GameCanvas.tsx     (game feature)
├── index.css
├── main.tsx
├── provider
    └── tools.ts               (tools functions for formating)
```