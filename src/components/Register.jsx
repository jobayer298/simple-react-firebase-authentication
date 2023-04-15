import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "./firebase/firebase.init";

const auth = getAuth(app);
const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    console.log(name, email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("Account Created successfully!");
        sendEmailVerification(result.user).then(() => {
          alert("Please verify you Email!");
          return;
        });
        updateProfile(result.user, {
          displayName: name
        })
        .then(()=>{
          console.log("User name updated");
        })
        .catch(error =>{
          setError(error.message)
        })
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSuccess("");
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto rounded-lg p-6 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-green-400">
          Please Registration...
        </h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="name"
              placeholder="your Name"
              className="input input-bordered w-1/2"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group">
            <input
              type="email"
              name="email"
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
        <input className="btn btn-primary my-5" type="submit" value="Register" />
        <p className="font-medium">
          Already have an account?{" "}
          <span className="underline ml-2 text-green-400">
            <Link to="/">Login</Link>
          </span>
        </p>
        <p className="text-green-500 font-medium">
          <small>{success}</small>
        </p>
        <p className="text-red-500 font-medium">
          <small>{error}</small>
        </p>
      </form>
    </div>
  );
};

export default Register;
