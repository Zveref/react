import React, { useRef, useState, useEffect } from "react";
import Post from "./Post"
import { Upload } from 'react-bootstrap-icons';
import _ from "lodash"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
export default function CentralContent(props) {
    const { posts, posterName, posterUsername} = props;

    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [po, setPo] = useState([]);
    const [keywords, setKeywords] = useState();
    const[filter, setFilter] = useState();
    const inputRef = useRef(null);

    useEffect(() => {
        if(filter == null || filter == "") {
            setPo(posts)
        }else{
            const displayPo = po.filter(item => item.username.includes(filter) || item.title.includes(filter) || item.body.includes(filter))
            setPo(displayPo);
        }
    }, [posts, filter])


    const handleClick = () => inputRef.current.click();

    const handlekeyWords = e => setKeywords(e.target.value);

    const handleFilter = e => {
        if(e.target.id == "button-search"){
            setFilter(keywords);
        }else{
            setFilter("");
            setKeywords("");
        }
    }

    const handleUpload = e => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
          return;
        }
        setFile(URL.createObjectURL(e.target.files[0]));
        e.target.value = null;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(text == "" && file == "") return;
        const newPost = (file == "" ? {
            username: posterUsername,
            title: `${posterName}'s new post`,
            body: text,
            time: new Date()
        } : {
            username: posterUsername,
            title: `${posterName}'s new post`,
            body: text,
            url: file,
            time: new Date()
        })
        posts.push(newPost)
        setText("");
        setFile("");
        e.target.reset();
    }

    const handleInput = e =>{
        const {name, value} = e.target;
        setText(value)
    }


  return (
    <>
      <div className="col-md-6 gedf-main">
        <div className="card gedf-card">
          <div className="card-header">
            <a
                className="nav-link active"
                id="posts-tab"
                data-toggle="tab"
                href="#posts"
                role="tab"
                aria-controls="posts"
                aria-selected="true"
            >
            New Post
            </a>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
            {/* text */}
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="posts"
                role="tabpanel"
                aria-labelledby="posts-tab"
              >
                <div className="form-group">
                  <label className="sr-only" for="message">
                    Post Text
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    name="text"
                    placeholder="What are you thinking?"
                    onChange={handleInput}
                  ></textarea>
                </div>
              </div>
            </div>
            {/* button */}
            <div className="btn-toolbar justify-content-between" >
              <div className="mt-2 gap-2">
                <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    type="file"
                    onChange={handleUpload}
                />
                <Button variant="outline-secondary" border="1px black" onClick={handleClick}><Upload/>{' '}Attach</Button>{' '}
                <Button variant="outline-secondary" type="reset" size="medium">Cancel</Button>{' '}
                <Button variant="outline-secondary" type="submit" size="medium" >Submit</Button>{' '}
              </div>
            </div>
            </form>
          </div>
        </div>

        {/* posts */}
        <InputGroup className="mb-3">
            <Form.Control
            placeholder="search posts"
            aria-label="search posts"
            aria-describedby="basic-addon2"
            onChange={handlekeyWords}
            value={keywords}
            />
            <Button variant="outline-secondary" id="button-search" onClick={handleFilter}>Search</Button>
            <Button variant="outline-secondary" id="button-clear" onClick={handleFilter}>Clear</Button>
        </InputGroup>
        {po && po.sort((o1, o2) => o2.time - o1.time) && po.map(p => {
            return <Post posterName={p.name} posterUsername={p.username} time={p.time} posterAva="https://picsum.photos/50/50" title={p.title} content={p.body} image={_.get(p, "url", "https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg")}/>
        })}
      </div>
    </>
  );    
}