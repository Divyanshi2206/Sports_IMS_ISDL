import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signuppage.css";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name,setName] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    let count=0;
    for(let i=0;i<email.length;i++)
    {
      if(email[i]==='@'){
        count++;
      }
    }
    if(count!==1)
    {
      alert("Please enter correct email");
    }
    else{
    try {
      await axios
        .post("http://localhost:8000/signup", {
          name,
          email,
          password,
        },{withCredentials:true})
        .then((res) => {
          if (res.data.message === "exist") {
            alert("User already exists");
          } else if (res.data.message === "notexist") {
            history("/", { state: { id: email } });
          }
          else if(res.data.error==="Invalid email"){
            alert("Please sign up through registered lnmiit email only");
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }}
  }

  return (
    <div className="containerr">
      <div className="box">

      <div className="box1">
            <div className="lnmiit-logo">
              <img className="lnmiit-img" src={process.env.PUBLIC_URL + "/assets/LNMIIT-LOGO.png"} />
            </div>
      </div>
      
      <div className="box2">
      <div className="signup-image-container">
        <img
          className="bg-img1"
          src={process.env.PUBLIC_URL + "/assets/background_image.jpeg"}
          alt="bg-img-loader"
          />
      </div>
      <div className="signup-container">
        <h1 className="signup-container-heading">SignUp</h1>
        <div className="signup-hr-div">
          <p className="signup-hr"></p>
        </div>

        <form className="signup-form" action="POST">
        <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            />
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
            <input
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
          />
          <input type="submit" onClick={submit} />
        </form>

        <div className="signup-divider-div">
        <p className="signup-divider" style={{ color: "white" }}>
          Or
        </p>
        </div>
        <div className="last-text">
          <p>Already have an account?</p>
          <Link to="/" className="link">
            <p className="link">Sign in</p> 
          </Link>
        </div>
   
      </div>
      </div>

      
      </div>
    </div>
  );
}

export default Signup;
