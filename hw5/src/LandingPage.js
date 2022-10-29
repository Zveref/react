import './LandingPage.css';
import React, { useState, useEffect } from "react"
import {Routes, Route, useNavigate} from 'react-router-dom';

export const initialFetch = () =>{
  fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  .then(res => {
    res.forEach(user => {
      if(!localStorage.getItem(user.username)) localStorage.setItem(user.username, JSON.stringify({
        username: user.username,
        userID: user.id,
        display_name: user.name,
        email: user.email,
        number: user.phone,
        birth: "NA",
        zipcode: user.address.zipcode,
        password: user.address.street,
        status: user.company.catchPhrase
      }))
    });
  });
}

export function saveToStorage(value) {
  window.localStorage.setItem('the-key', value);
}

function LandingPage(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState(true);
  const [regisInfo, setRegisInfo] = useState({
    account_name: '',
    display_name: '',
    email: '',
    number: '',
    birth: '',
    zipcode: '',
    password: '',
    confrimPassword: '',
  });

  const [regisError, setRegisError] = useState({
    username: '',
    birth: '',
    confirm: ''
  })

  const [logInError, setLogInError] = useState({
    username: '',
    login_password: ''
  })

  const [logInfo, setLogInfo] = useState({
    username: '',
    login_password: ''
  })

  const changeAuthMode = () => {
    setHasAccount(hasAccount === true ? false : true)
  }

  const onInputChange = e => {
    const {name, value} = e.target;
    if(!hasAccount){
      setRegisInfo(prev => ({
        ...prev,
        [name]: value
      }));
      validate(e);
    }else{
      setLogInfo(prev => ({
        ...prev,
        [name]: value
      }))
    }

  }


  const validate = e => {
      const {name, value} = e.target;
      switch(name){

        case "birth": 
          if(value){
            const temp = value.split('-');
            var oldDate = new Date(temp[0], temp[1] - 1, temp[2]);
            const newDate = new Date(Date.now());
            if((newDate - oldDate) / (60*60*24*1000) < 18 * 365){
                setRegisError(prev => ({
                  ...prev,
                  birth: "Users under 18 are not allowed to register"
                }))
            }else{
                setRegisError(prev => ({
                  ...prev,
                  birth: ''
                }))
            }
          }
          break;

        case "confrimPassword":
          if(value){
            if(value != regisInfo.password){
              setRegisError(prev => ({
                ...prev,
                confirm: "two passwords must match!"
              }));
              
            }else{
              setRegisError(prev => ({
                ...prev,
                confirm: ''
              }))
            }
          }
          break;

        case "account_name":
          if(value){
            if(localStorage.getItem(value)){
              setRegisError(prev => ({
                ...prev,
                username: 'This username has already been used'
              }))
            }else{
              setRegisError(prev => ({
                ...prev,
                username: ''
              }))
            }
          }
          break;

        default:
          break;

      }

    }

  /* fetch placeholders*/
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
    .then(res => {
      res.forEach(user => {
        if(!localStorage.getItem(user.username)) localStorage.setItem(user.username, JSON.stringify({
          username: user.username,
          userID: user.id,
          display_name: user.name,
          email: user.email,
          number: user.phone,
          birth: "NA",
          zipcode: user.address.zipcode,
          password: user.address.street,
          status: user.company.catchPhrase
        }))
      });
    });
  },[])

 
  const handleLogIn = e => {
    e.preventDefault();
    if(!localStorage.getItem(logInfo.username)){
      setLogInError(prev => ({
        ...prev,
        username: 'This userName is not registered'
      }));
      return;
    }else if(JSON.parse(localStorage.getItem(logInfo.username)).password != logInfo.login_password){
      setLogInError(prev => ({
        ...prev,
        login_password: 'Your password is wrong, please check again'
      }));
      return;
    }else{
      setLogInError({
        username: '',
        login_password: ''
      })
    }
    for(let key in logInError) if(logInError[key]) return
    // setOnline(logInfo.username);
    localStorage.setItem("active_user_name", logInfo.username)
    setUser(logInfo.username)
    console.log("going go main>>>", localStorage.getItem("active_user_name"))
    navigate("/main");
  }

  /* login page*/
  if(hasAccount){
    return (
      
      <div className="login-portal" >
      <form className="login-form" method="post" onSubmit={handleLogIn} >
        <div className="form-content">
          <h3 className="form-title">Log In</h3>

          <div className="form-group mt-3">
            <label id="username_lable" for="username">User Name</label>
            <input className="form-control mt-1" type="text" id="username" name="username" placeholder="User Name" onChange={onInputChange} required />
            {logInError.username && <span data-testid="usernameError" class="text-danger" >{logInError.username}</span>}
          </div>

          <div className="form-group mt-3">
            <label id="password_lable" for="login_password">Password</label>
            <input className="form-control mt-1" type="password" name="login_password" id="login_password" placeholder="password" onChange={onInputChange} required />
            {logInError.login_password && <span data-testid="passwordError" class="text-danger" >{logInError.login_password}</span>}
          </div>

          <div className="form-group mt-3">
            <p className="forgot-password text-right mt-2">
              Don't have an account? {' '}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign up
              </span>
            </p>
          </div>
{/* 
          <div className="d-grid gap-2 mt-3">
            <input className="btn btn-primary" type="submit" id="logIn" value="LogIn" />
          </div> */}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" name="log-in-btn" className="btn btn-primary">Log in</button>
          </div>


        </div>
      </form>
    </div>
    );
  }

  
  const handleRegister = e => {
    e.preventDefault();
    for(let key in regisError) if(regisError[key]) return //no error
    localStorage.setItem(regisInfo["account_name"], JSON.stringify({
      userID: regisInfo["account_name"] + "_" + regisInfo["display_name"],
      display_name: regisInfo["display_name"] == null ? "NA" : regisInfo["display_name"],
      email: regisInfo["email"],
      number: regisInfo["number"],
      birth: regisInfo["birth"],
      zipcode: regisInfo["zipcode"],
      password: regisInfo["password"],
      status: "hello, world!"
    }));
    setHasAccount(true);
    setUser(regisInfo["account_name"]);
    localStorage.setItem("active_user_name", regisInfo["account_name"]);
    // setOnline(regisInfo["account_name"]);
    // localStorage.setItem("active_user_name", regisInfo["account_name"])
    navigate("/main");
  }

  /* Register Page*/
  return (
    <div className="login-portal">
      <form className="login-form" onSubmit={handleRegister}>
        <div className="form-content">
          <h3 className="form-title">Sign Up</h3>

          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>

          <div className="form-group mt-3">
            <label for="account_name">Account Name</label>
            <input className="form-control mt-1" type="text" id="account_name" name="account_name" placeholder="Account Name" pattern="^[a-zA-Z][a-zA-Z0-9]*$"  onChange={onInputChange} required />
            {regisError.username && <span class="text-danger" >{regisError.username}</span>}
          </div>

          <div className="form-group mt-3">
            <label for="display_name">Display Name(optional)</label>
            <input className="form-control mt-1" type="text" id="display_name" name="display_name" onChange={onInputChange} placeholder="Display Name" />
          </div>

          <div className="form-group mt-3">
            <label for="email">Email Address</label>
            <input className="form-control mt-1" type="email" name="email" id="email" placeholder="Valid Email Address" pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={onInputChange} required />
          </div>

          <div className="form-group mt-3">
            <label for="number">Phone Number: 123-123-1234</label>
            <input className="form-control mt-1" type="tel" id="number" name="number" placeholder="123-123-1234" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={onInputChange} required />
          </div>

          <div className="form-group mt-3">
            <label for="birth">Date of Birth</label>
            <input className="form-control mt-1" type="date" name="birth" id="birth" onChange={onInputChange} onBlur={validate} required />
            {regisError.birth && <span class="text-danger" >{regisError.birth}</span>}
          </div>

          <div className="form-group mt-3">
            <label for="zipcode">Zip Code</label>
            <input className="form-control mt-1" type="zip" name="zipcode" id="zipcode" placeholder="Enter your Zip Code" pattern="^([0-9]{5})(?:[-\s]*([0-9]{4}))?$" onChange={onInputChange} required />
          </div>

          <div className="form-group mt-3">
            <label for="password">Password</label>
            <input className="form-control mt-1" type="password" name="password" id="password" placeholder="Input your password" onChange={onInputChange} required />
          </div>

          <div className="form-group mt-3">
            <label for="confrimPassword">Confirm Password</label>
            <input className="form-control mt-1" type="password" name="confrimPassword" id="confrimPassword" placeholder="Reinput your password" onChange={onInputChange} onBlur={validate} required />
            {regisError.confirm && <span class="text-danger" >{regisError.confirm}</span>}
          </div>

          <div className="d-grid mt-3">
            <input className="btn btn-secondary" type="reset" id="Clear" value="Clear" />
          </div>

          <div className="d-grid gap-2 mt-3">
            <input className="btn btn-primary" type="submit" id="Register" value="Register" />
          </div>
          
        </div>
      </form>
    </div>
  ); 

 
    // <form method="get" id="regis_form" onsubmit="return validateAdult()" action="./formProcessor.html">
    // </form>


}

export default LandingPage;
