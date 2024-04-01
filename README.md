# Keeper

A React.js project with a express server and SQL database to create and delete notes.

## Deployment

To run locally:

```bash
  npm install
  npm run dev
```

On another terminal.

```bash
  cd server/
  npm install
  nodemon index.js
```

The React app runs on port 3000 and server on port 8080. Using proxy.

To only run the server:

```bash
  npm run build
  mv dist/ server/
  cd server/
  npm install
  nodemon index.js
```

Running on port 8080
