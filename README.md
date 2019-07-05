## Frontend

### Install

`yarn`

### Run locally

`npm start`

### Deploy 

```
firebase login
npm run build
firebase deploy
```

## Functions

Inside the `functions` directory.

### Install

`yarn`

### Run Locally

Copy `shared` from `src` to `functions/src`.
In `index.tsx` uncomment the line:

`firebase.functions().useFunctionsEmulator('http://localhost:5000')`

```
npm run serve
```

### Deploy

Copy `shared` from `src` to `functions/src`.
In `index.tsx` comment out the line:

`firebase.functions().useFunctionsEmulator('http://localhost:5000')`

```
npm run build
npm run deploy
```