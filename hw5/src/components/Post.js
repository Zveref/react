import React, {useState} from "react";
import { PencilSquare, ChatText } from 'react-bootstrap-icons';

export default function Post(props) {
    const {posterUsername, posterName, posterAva, title, content, time, image} = props
    const [visible, setVisible] = useState(false);
    const comments = ["test1test1test1test1test1", "test2test2test2test2test2", "test3test3test3test3test3"]

    Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1;
        var dd = this.getDate();
      
        return [this.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('-');
      };

  return (
      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <img
                  className="rounded-circle"
                  width="45"
                  src={posterAva}
                  alt=""
                  
                />
              </div>
              <div className="mx-3">
                <div className="h6 m-0">@{posterUsername}</div>
                <div className="h7 text-muted">Name: {posterName}</div>
              </div>
            </div>
          </div>
        </div>
        <img class="card-img-top" src={image} sizes="10%" alt="Card image cap"></img>
        <div className="card-body">
          <p className="card-link" href="#">
            <h5 className="card-title">
                {title}
            </h5>
          </p>

          <p className="card-text">
              {content}
          </p>

          <p className="card-text text-muted">
              {time.yyyymmdd()}
          </p>
          
        </div>
        <div className="card-footer">
          <a className="card-link" onClick={() => setVisible(e => !e)}>
            <ChatText /> Comment
          </a>
          <a href="#" className="card-link ">
          <PencilSquare />{' '}Edit
          </a>
          <ul>
            {visible && comments.map(comment => {
              return <li>{comment}</li>
            })}
          </ul>

        </div>
      </div>
  );
}

