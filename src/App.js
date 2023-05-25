import React, { Component } from "react";
import Navigation from "./Components/Navigation/Navigation";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Footer from "./Components/Footer/Footer";
import isUrl from "is-url";
import "./App.css";

// Set state for user, link input, the URL, bounding box, route, and sign in status
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    email: "",
    name: "",
    entries: 0,
    joined: "",
  },
  isUrlValid: true,
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // Load user info from user object
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  // Use Clarifai API data to calculate the box for face detection using bounding box data
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  // Display box around face
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  // When the input is changed, set state to target the new input
  onInputChange = (event) => {
    this.setState({ input: event.target.value, isUrlValid: true });
  };

  // When detect is clicked, first check that the URL entered is valid, then connect with Clarifai API and display the bounding box around the face in the image
  onSubmit = (event) => {
    event.preventDefault();
    const checkValidUrl = isUrl(this.state.input);
    if (!checkValidUrl) {
      this.setState({ isUrlValid: false });
      return;
    }
    this.setState({ imageUrl: this.state.input });
    fetch("http://localhost:3000/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  };

  // Create routes for signed in, home, and signed out. Clear user and imageUrl props on signout and signin routes to ensure previous image does not display with new sign in
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({
        ...initialState,
        imageUrl: "",
      });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "signin") {
      this.setState({
        isSignedIn: false,
        imageUrl: "",
      });
    }
    this.setState({ route: route });
  };

  // Render components and change routes based on whether the user is signing in or registering
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    const currentPage = this.state.route;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          currentPage={currentPage}
        />
        {route === "home" ? (
          <main className="container">
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              isUrlValid={this.state.isUrlValid}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </main>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
        <Footer isSignedIn={isSignedIn} />
      </div>
    );
  }
}
export default App;
