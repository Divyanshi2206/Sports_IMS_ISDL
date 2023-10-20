import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "./signuppage.css"


function Login() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/signup",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                    history("/home",{state:{id:email}})
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="container">

        <div className="signup-container">

            <h1>Signup</h1>

            <form className="signup-form" action="POST">
                <input className="input email " type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input className="input password" type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input className="input submit" type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/" className="login-page-link">Login Page</Link>

        </div>
        </div>
    )
}

export default Login