# FaceFinder Frontend

## Overview 
This app was created as a personal project to explore full-stack React apps utilizing REST API (Clarifai), server (via Express.js) and PostgreSQL database. 

## Features
Allows the user to sign and/or register
Once the user is signed in, they can input an image link in the form which will render the image (if a valid url) with a bounding box around the face(s) in the image
Connects with Clarifai’s face-detection model API to provide the bounding box

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
* [Axios](https://axios-http.com/docs/intro)
* [Clarifai API](https://www.clarifai.com/)
* [is-url](https://www.npmjs.com/package/is-url)
* [React (using Create React App)](https://create-react-app.dev/docs/getting-started)
