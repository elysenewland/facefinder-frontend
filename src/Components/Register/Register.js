import React from "react";
import "../../Login.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      hasNameError: false,
      hasEmailError: false,
      hasPasswordError: false,
    };
  }

  // Check entered name against empty field. If left blank, update state to reflect that an error has been detected
  onNameChange = (event) => {
    const name = event.target.value;
    const nameError = name === "";
    const nameErrorDetected = nameError;
    this.setState({ name, nameError, hasNameError: nameErrorDetected });
  };

  // Check entered email against typical regex for validation. If the email is not a valid address, then update state to reflect that an error has been detected
  onEmailChange = (event) => {
    const email = event.target.value;
    const emailCheck = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const emailError = !emailCheck.test(email);
    this.setState({ email, hasEmailError: emailError });
  };

  // Check entered password against typical regex for validation that password must be between 10-16 chars long. If password does not meet requirements, then update state to reflect that an error has been detected
  onPasswordChange = (event) => {
    const password = event.target.value;
    const passwordCheck = /^.{10,16}$/;
    const passwordError = !passwordCheck.test(password);
    this.setState({ password, hasPasswordError: passwordError });
  };

  // Before registering new user, check for nameError, emailError, & passwordError. If an error exists don't allow the form to submit, else if everything is correct, submit the form, continue to fetch and update new user's info, then sign in user to home page
  onSubmitSignIn = (event) => {
    const { hasNameError, hasEmailError, hasPasswordError } = this.state;
    if (hasNameError || hasEmailError || hasPasswordError) {
      event.preventDefault();
      return;
    }
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
    event.preventDefault();
  };

  render() {
    // Pass in props and set prop state. If name, email, or password input has an error, display error message
    const { onRouteChange } = this.props;
    const { hasNameError, hasEmailError, hasPasswordError } = this.state;
    return (
      <main className="login-grid">
        <div className="login-form">
          <a className="login-logo" href="/">
            <img src="/images/FaceFinder-Logo.svg" alt="Face Finder Logo" />
          </a>
          <div className="login-text">
            <h1 className="login-headline">
              New to FaceFinder? Register for an account!
            </h1>
            <p className="login-body">
              Already have an account?{" "}
              <span
                className="login-register"
                onClick={() => onRouteChange("signin")}
              >
                Sign in
              </span>
            </p>
          </div>
          <form onSubmit={this.onSubmitSignIn}>
            <label className="login-label" htmlFor="name">
              Name
            </label>
            <input
              required
              className="login-input"
              type="text"
              name="name"
              id="name"
              onChange={this.onNameChange}
            />
            {hasNameError && (
              <p className="login-error">Please enter your name</p>
            )}
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
            {hasEmailError && (
              <p className="login-error">Please enter a valid email address</p>
            )}
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
            {hasPasswordError && (
              <p className="login-error">
                Password must be between 10-16 characters long
              </p>
            )}
            <button className="login-button btn" type="submit">
              Register
            </button>
          </form>
        </div>
        <div className="login-gradient-wrapper">
          <img
            className="login-gradient"
            src="/images/bg-gradient.jpg"
            alt="colorful background gradient"
          />
        </div>
      </main>
    );
  }
}

export default Register;
