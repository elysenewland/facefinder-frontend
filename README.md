# FaceFinder Frontend

## Overview

This web app was created as a personal project to explore full-stack React apps utilizing a REST API, Clarifai, creating a server (via Express.js) and using a PostgreSQL database to store user data

## Features

- Allows the user to sign in and/or register
- Uses bcrypt to securely hash passwords
- Once the user is signed in, they can input an image link in the form which will render the image (if a valid url) with a bounding box around the face(s) in the image
- Connects with Clarifai’s face-detection model API to provide the bounding box
- Tells the user how many faces were found in their image

## Project Setup

```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm start
```

## Compile and Minify for Production

```sh
npm run build
```

## Dependencies

- [React (using Create React App)](https://create-react-app.dev/docs/getting-started)
- [Clarifai API](https://www.clarifai.com/)
- [is-url](https://www.npmjs.com/package/is-url)
