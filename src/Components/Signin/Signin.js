import React from "react";
import "../../Login.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      loginError: false,
    };
  }

  // Set signInEmail prop to the user's entered email input
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  // Set signInPassword prop to the user's entered password input
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  // When the form is submitted, send the input to the server, check if the user id is present, and if so direct the user to their home page. If user id is not valid, display loginError message
  onSubmitSignIn = (event) => {
    fetch("https://facefinder-backend.onrender.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({ loginError: true });
        }
      });
    event.preventDefault();
  };

  render() {
    const { onRouteChange } = this.props;
    const { loginError } = this.state;
    return (
      <main className="login-grid">
        <div className="login-form">
          <a className="login-logo" href="/#">
            <img src="/images/FaceFinder-Logo.svg" alt="Face Finder Logo" />
          </a>
          <div className="login-text">
            <h1 className="login-headline">Welcome back!</h1>
            <p className="login-body">
              Don't have an account?{" "}
              <span
                className="login-register"
                onClick={() => onRouteChange("register")}
              >
                Sign up
              </span>
            </p>
          </div>
          <form onSubmit={this.onSubmitSignIn}>
            <label className="login-label" htmlFor="email-address">
              Email address
            </label>
            <input
              className="login-input"
              type="email"
              name="email-address"
              id="email-address"
              onChange={this.onEmailChange}
            />
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              onChange={this.onPasswordChange}
            />

            {loginError && (
              <p className="login-error" aria-live="polite">
                Whoops! You entered the wrong email or password.
              </p>
            )}

            <button className="login-button btn" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="login-gradient-wrapper">
          <img
            className="login-gradient"
            src="/images/bg-gradient.jpg"
            alt="Colorful background gradient"
          />
        </div>
      </main>
    );
  }
}

export default SignIn;
