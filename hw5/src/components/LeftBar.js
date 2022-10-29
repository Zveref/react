import React, { useState, useEffect, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ContactCard from "./ContactCard"
import {Routes, Route, useNavigate} from 'react-router-dom';
import { fromPairs } from "lodash";

export default function LeftBar(props) {
    const {username, name, originalStatus, image, follows, setFollows} = props
    const [helper, setHelper] = useState(false);
    const [keywords, setKeywords] = useState("");
    const [status, setStatus] = useState(originalStatus);
    const [draft, setDraft] = useState();
    const [addError, setAddError] = useState("");
    const navigate = useNavigate();

    // useEffect(() =>{
    //     const localData = JSON.parse(localStorage.getItem(username)).addFirends
    //     if(localData){
    //         localData.forEach(item => {
    //             follows.push(item);
    //         })
    //     }
    //     setFo(follows)
    // },[follows])

    // useEffect(() => {
    //     const newData = added_friends.filter(value => !fo.includes(value))
    //     newData.forEach(item => {
    //         // follows.push(item);
    //         setFo([...fo, item]);
    //     })
    //     // setFo(follows)
    // }, [added_friends])

    const handleNavigate = e => {
        if(e.target.id == "logOut"){
            localStorage.removeItem("active_user_name");
            navigate("/");
        }else{
            navigate("/profile")
        }

    }

    function handleDelete(targetUserName){
        setFollows((prev) => prev.filter(item => item.username !== targetUserName));
        // const newFo = follows.filter(item => item.username !== targetUserName)
        // setFo(newFo);
    }

    const handleInput = e => {
        if(e.target.id == "update_status"){
            setDraft(e.target.value);
        }else{
            setKeywords(e.target.value);
        }
    }

    const handleUpdate = e => {
        draft && setStatus(draft);
        const prev = JSON.parse(localStorage.getItem(username));
        prev.status = draft;
        console.log()
        localStorage.setItem(username, JSON.stringify(prev));
    }

    const handleAdd = () => {
        if(!keywords) return;

        if(!Object.keys(localStorage).includes(keywords)) {
            setAddError("User does not exist");
            setTimeout(() => {
                setAddError("")
              }, "1000")
            return;
        }

        if(username == keywords) {
            setAddError("Can't add yourself");
            setTimeout(() => {
                setAddError("")
              }, "1000")
            return;
        }

        if(follows.map(item => item.username).includes(keywords)) {
            setAddError("Already had this friend");
            setTimeout(() => {
                setAddError("")
              }, "1000")
            return;
        }

        const tempFriend = JSON.parse(localStorage.getItem(keywords));

        setFollows([...follows, tempFriend])
        setKeywords("")
        // //stored to local
        // const curUser = JSON.parse(localStorage.getItem(username));
        // if(!curUser.addFirends) {
        //     curUser.addFirends = [tempFirend];
        // }else {
        //     const prevAdds = curUser.addFirends;
        //     prevAdds.push(tempFirend);
        //     curUser.addFirends = prevAdds;
        // }
        // localStorage.setItem(username, JSON.stringify(curUser));

    }


  return (
    <>
      <div className="col-md-3">
        <div className="card">
            <div className="card-header">
                <div className="btn-toolbar justify-content-between" >
                    <div className="mt-1 ">
                        <Button variant="outline-secondary" type="reset" size="medium" id="logOut" onClick={handleNavigate}>Log Out</Button>{' '}
                        <Button variant="outline-secondary" type="submit" size="medium" id="prodile" onClick={handleNavigate}>Profile</Button>{' '}
                    </div>
                </div>
            </div>
            <img class="card-img-top" src={image} sizes="50%" alt="Card image cap"></img>
            <div className="card-body">
                <div className="h5">@{username}</div>
                <div className="h7 text-muted">Name : {name}</div>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="h6 text-muted">Status:</div>
                    <div className="h6">- {status} -</div>
                    <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="update your status"
                            aria-label="update your status"
                            aria-describedby="basic-addon2"
                            id="update_status"
                            onChange={handleInput}
                            />
                            <Button variant="outline-secondary" id="post_status" onClick={handleUpdate}>Update</Button>
                    </InputGroup>
                </li>
            </ul>
        </div>

        <div className="card mt-4">
            <div className="card-header h5">
                I'm following:
            </div>
            <ul className="list-group list-group-flush">
                {follows && follows.map(f => {
                    return <ContactCard handleDelete={handleDelete} image="https://picsum.photos/50/50" name={f.display_name} userName={f.username} status={f.status} />
                })}
            </ul>
        </div>
        <InputGroup className="mb-0 px-3 mt-3">
                <Form.Control
                placeholder="add a friend"
                aria-label="add a friend"
                aria-describedby="add a friend"
                id="add_friend"
                onChange={handleInput}
                />
                <Button variant="outline-secondary" id="search_friend" onClick={handleAdd}>Add</Button>
        </InputGroup>
        <span class="text-danger mb-3 px-3 mt-3">{addError}</span>
      </div>
    </>
  );
}
