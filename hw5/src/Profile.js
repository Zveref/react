import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import "./Main.css"
import Button from 'react-bootstrap/Button';

export default function Profile(props){
    const {username} = props
    const user = JSON.parse(localStorage.getItem(username));
    const navigate = useNavigate();
    const [oldInfo, setOldInfo] = useState({
        username: username,
        display_name: user.display_name,
        email: user.email,
        number: user.number,
        birth: user.birth,
        zipcode: user.zipcode,
        password: user.password,
    })

    const [birthError, setBirthError] = useState("");

    const [newInfo, setNewInfo] = useState({
        username: '',
        display_name: '',
        email: '',
        number: '',
        birth: '',
        zipcode: '',
        password: '',
      });

      const onInputChange = e => {
        const {name, value} = e.target;
        setNewInfo(prev => ({
        ...prev,
        [name]: value
        }));
        if(name == 'birth') validateBirth(e)
      }

      const handleUpdate = e => {
        e.preventDefault();
        if(birthError) {
        return;
        }
        setOldInfo(newInfo);
        e.target.reset();
      }

      const handleNavigate = () =>{
        if(localStorage.getItem("active_user_name")){
            navigate("/main")
        }else{
            navigate("/")
        }
      }


  const validateBirth = e => {
    const {name, value} = e.target;
    if(name != 'birth') return;
    if(value){
        const temp = value.split('-');
        var oldDate = new Date(temp[0], temp[1] - 1, temp[2]);
        const newDate = new Date(Date.now());
        if((newDate - oldDate) / (60*60*24*1000) < 18 * 365){
        setBirthError("Users under 18 are not allowed to register");
        }else{
        setBirthError("")
        }
    }
  }

    
    return(
        <div className="container-fluid gedf-wrapper">
            <div className="row">

                <div className="col-md-5">
                    <div className="card-body d-grid gap-2 mt-1 mb-3" >
                        <Button variant="outline-secondary" onClick={handleNavigate} style={{display: "inline-table"}}>
                            Back To Main
                        </Button>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-toolbar justify-content-between" >
                                <div className="my-2 h4">
                                    Profile
                                </div>
                            </div>
                        </div>
                        <img class="card-img-top" src="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" sizes="50%" alt="Card image cap"></img>
                        <div className="card-body">
                            <div className="h4">Personal Info</div>
                        </div>
                        
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="h5 text-muted">
                                <p className="my-0"><label className="h5" for="upload">Upload your Avatar</label></p>
                                <input type="file" id="upload" />
                                </div>
                            </li>
                            {Object.entries(oldInfo).map(item => {
                                return (
                                    <li className="list-group-item">
                                        <div className="h5 text-muted">{item[0]}</div>
                                        <div className="h6">{item[0] != "password" ? item[1] : "*".repeat(item[1].length)}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card px-0" style={{display: "inline-flex"}}>
                        <div className="card-header">
                            <div className="btn-toolbar justify-content-between" >
                                <div className="my-2 h4">
                                    Update
                                </div>
                            </div>
                        </div>

                        <form className="login-form" style={{display: "inline-table"}} onSubmit={handleUpdate} >
                            <div className="form-content px-1">

                            <ul className="list-group list-group-flush p-0">

                            <li className="list-group-item">
                            <div className="form-group px-0">
                                <label for="username">Account Name</label>
                                <input className="form-control mt-1" type="text" id="username" name="username" placeholder="Account Name" pattern="^[a-zA-Z][a-zA-Z0-9]*$"  onChange={onInputChange} required />
                            </div>
                            </li>

                            <li className="list-group-item">
                            <div className="form-group mt-3">
                                <label for="display_name">Display Name(optional)</label>
                                <input className="form-control mt-1" type="text" id="display_name" name="display_name" onChange={onInputChange} placeholder="Display Name" />
                            </div>
                            </li>

                            <li className="list-group-item">
                            <div className="form-group mt-3">
                                <label for="email">Email Address</label>
                                <input className="form-control mt-1" type="email" name="email" id="email" placeholder="Valid Email Address" pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={onInputChange} required />
                            </div>
                            </li>

                            <li className="list-group-item">
                            <div className="form-group mt-3">
                                <label for="number">Phone Number: 123-123-1234</label>
                                <input className="form-control mt-1" type="tel" id="number" name="number" placeholder="123-123-1234" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={onInputChange} required />
                            </div>
                            </li>

                            <li className="list-group-item">
                            <div className="form-group mt-3">
                                <label for="birth">Date of Birth</label>
                                <input className="form-control mt-1" type="date" name="birth" id="birth" onChange={onInputChange} onBlur={validateBirth} required />
                                {birthError && <span class="text-danger" >{birthError}</span>}
                            </div>
                            </li>

                            <li className="list-group-item">
                            <div className="form-group mt-3">
                                <label for="zipcode">Zip Code</label>
                                <input className="form-control mt-1" type="zip" name="zipcode" id="zipcode" placeholder="Enter your Zip Code" pattern="^([0-9]{5})(?:[-\s]*([0-9]{4}))?$" onChange={onInputChange} required />
                            </div>
                            </li>

                            <li className="list-group-item">
                            <div className="form-group mt-3">
                                <label for="password">Password</label>
                                <input className="form-control mt-1" type="password" name="password" id="password" placeholder="Input your password" onChange={onInputChange} required />
                            </div>
                            </li>

                            <li className="list-group-item">
                            <div className="d-grid gap-2 mt-3">
                                <input className="btn btn-secondary" type="reset" id="Clear" value="Clear" />
                                <input className="btn btn-primary" type="submit" id="update" value="Update" />
                            </div>
                            </li>
                            
                            </ul>
                            </div>
                        </form>
                        
                    </div>
                    
                </div>


            </div>
        </div>

    )
}

