import React from "react";

export default function RightBar() {
  return (
    <>
      <div className="col-md-3">
        <div className="card gedf-card">
          <div className="card-body">
            <h5 className="card-title">HW4</h5>
            <h6 className="card-subtitle mb-2 text-muted">Author: Zewen Xu</h6>
            <p className="card-text">
              Social Networks and feeds
            </p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6wo8aj1UENVXgNFeGgjADaNJ379Klgzzw0A&usqp=CAU" width="100%" alt="Card image cap"/>
          </div>
        </div>
        {/* <div className="card gedf-card">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}
