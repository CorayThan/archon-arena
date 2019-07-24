# Archon Arena

![https://i.imgur.com/Kn5La99.png](https://i.imgur.com/Kn5La99.png)

## Frontend

### Setup

```
yarn
```

### Run locally

1. Open _src/matchmaking/GameRenderer.tsx_
2. Follow the instructions in the file
3. `yarn start`
4. Navigate to `http://localhost:3000/game`

## Backend Functions

The code inside `functions` usually does not need to be changed.

### Install

```
yarn
```

### Run locally

Get the file "forge-of-the-archons-firebase-adminsdk-key.json" from someone and drop it in `/functions`

```
yarn serve
```

## Deploy

```
firebase login
yarn build
firebase deploy
```
