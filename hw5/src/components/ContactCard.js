import React from "react";
import Button from 'react-bootstrap/Button';
import { PersonX} from 'react-bootstrap-icons';

export default function ContactCard(props) {
    const{image, name, userName, status, handleDelete} = props

    return (
        <li className="list-group-item p-0">
        <div className="card-body">
            <img className="rounded-circle mb-2" width="45" src={image} alt=""/>
            <div className="h5">@{userName}</div>
            <div className="h6 text-muted">Name : {name}</div>
            <div className="h7 text-muted">Status : {status}</div>
            <Button className="btn btn-secondary mx-0 mt-4" size="medium" onClick={() => handleDelete(userName)}>
                <PersonX /> Unfollow
            </Button>
        </div>
        <div className="card-footer my-0" >

        </div>
    </li>
    )
}