import React, { useRef, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebase/firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Login = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    setSuccess("");
    setError("");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("Login successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGithubSignIn = () => {
    setSuccess("");
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("Login successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleOnsubmit = (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("Login successful");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSuccess("");
      });
  };
  const handleReset = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      alert("Please provide an email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check you Email to reset you password");
        return;
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <form
      onSubmit={handleOnsubmit}
      className="w-1/2 mx-auto rounded-lg p-6 shadow-2xl"
    >
      <h2 className="text-3xl font-bold text-cyan-400">Please Login...</h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Your Email</span>
        </label>
        <label className="input-group">
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="your Email"
            className="input input-bordered w-1/2"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Your Password</span>
        </label>
        <label className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            className="input input-bordered w-1/2"
          />
        </label>
      </div>
      <input className="btn btn-primary my-5" type="submit" value="Login" />
      <p className="font-medium my-2">
        Forget password?
        <span
          onClick={handleReset}
          className="underline ml-2 text-blue-400 cursor-pointer"
        >
          Reset Password
        </span>
      </p>
      <div>
        <p
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2  bg-sky-400 p-1 rounded-lg w-[250px] mb-5 cursor-pointer"
        >
          <span className="text-[20px] rounded-full  bg-white p-1">
            <ion-icon name="logo-google"></ion-icon>
          </span>
          <span className="text-white">Sign in with google</span>
        </p>

        <p
          onClick={handleGithubSignIn}
          className="flex items-center gap-2  bg-black p-1 rounded-lg w-[250px] cursor-pointer"
        >
          <span className="text-[20px] rounded-full  bg-white p-1">
            <ion-icon name="logo-github"></ion-icon>
          </span>
          <span className="text-white">Sign in with github</span>
        </p>
      </div>
      <p className="text-green-500 font-medium">
        <small>{success}</small>
      </p>
      <p className="text-red-500 font-medium">
        <small>{error}</small>
      </p>
      <p className="font-medium">
        New to this site?
        <span className="underline ml-2 text-green-400">
          <Link to="/registration">Please Registration</Link>
        </span>
      </p>
    </form>
  );
};

export default Login;
