import "./Main.css";
import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import LeftBar from "./components/LeftBar";
import CentralContent from "./components/CentralContent";
import RightBar from "./components/RightBar";


export default function Main(props) {
    const { username, setUser} = props;
    const [follows, setFollows] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [rawPosts, setRawPosts] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem(username));

    function getRandomDate(){
        const d1 =new Date(2012, 0, 1);
        const d2 = new Date();
        return new Date(d1.getTime() + Math.random() * (d2.getTime() - d1.getTime()));
    }

    function findFollow(tempUser){
        if(parseInt(tempUser.id) - parseInt(user.userID) <= 3 && parseInt(tempUser.id) - parseInt(user.userID) > 0) return true;
        if(parseInt(tempUser.id) + 10 - parseInt(user.userID) <= 3 && parseInt(tempUser.id) - parseInt(user.userID)) return true;
        return false;
    }

    // useEffect(() =>{
    //     const temp = localStorage.getItem("active_user_name")
    //     if(temp == null) navigate('/')
    //     // else setUser(temp)
    // }, [])

    useEffect(() => {
        const userID = user.userID;
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`).then(res => res.json())
        .then(res => res.map(item => {return {
            name:user.display_name,
            username: username,
            id: item.id,
            userId: item.userId,
            time: getRandomDate(),
            title: item.title,
            body: item.body
            }
        }))
        .then(res => setRawPosts(res));
    }, [username])

    // useEffect(() => {
    //     const userID = user.userID;
    //     const temp = []
    //     fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json())
    //     .then(res => res.map(item => 
    //         {
    //         return {
    //         username: item.username,
    //         userID: item.id,
    //         display_name: item.name,
    //         email: item.email,
    //         number: item.phone,
    //         birth: "NA",
    //         zipcode: item.address.zipcode,
    //         password: item.address.street,
    //         status: item.company.catchPhrase
    //         }
    //         }
    //     ))
    //     .then(res =>{
    //         res.forEach(tempUser => {
    //             if(parseInt(tempUser.userID) - parseInt(userID) <= 3 && parseInt(tempUser.userID) - parseInt(userID) > 0) temp.push(tempUser);
    //             if(parseInt(tempUser.userID) + 10 - parseInt(userID) <= 3 && parseInt(tempUser.userID) + 10 - parseInt(userID) > 0) temp.push(tempUser);
                
    //         })
    //     });
    //     setAllUsers(temp)
        
    // }, [username])
    
    // useEffect(() =>{
    //     setFollows(allUsers)
    // }, [allUsers.length])

    useEffect(() => {
        const currUserId = user.userID;
        if(parseInt(currUserId)<=10){

            var followedUser = [];
            
            const id1 = (parseInt(currUserId)+1)%(parseInt(10))
            const id2 = (parseInt(currUserId)+2)%(parseInt(10))
            const id3 = (parseInt(currUserId)+3)%(parseInt(10))

            Object.keys(localStorage).forEach(function(key){
                if(key == "active_user_name"){
                    return
                }
                var user = JSON.parse(localStorage.getItem(key));
                if(user.userID == id1){
                    followedUser.push(user);
                }else if(user.userID == id2){
                    followedUser.push(user);
                }else if(user.userID == id3){
                    followedUser.push(user);
                }
             });            
            setFollows(followedUser);  
        }
    },[]);

    // useEffect(() => {
    //     const temp = []
    //     rawPosts.forEach(item => {
    //         const ss = {
    //             name:user.display_name,
    //             username: username,
    //             userId: item.userId,
    //             time: getRandomDate(),
    //             title: item.title,
    //             body: item.body
    //         }
    //         temp.push(ss);
    //     })
    //     console.log("ss: ", temp)
    //     setPosts(temp)
    // }, [rawPosts])

    useEffect(() => {
        const fetchData = async () => {
            const promises = follows.map(follow => {
                return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${follow.userID}`)
                .then(res => res.json())
                .then(res => res.map(obj => ({...obj, 
                    name:follow.display_name,
                    username:follow.username,
                    time: getRandomDate()})))
                })
            const response = await Promise.all(promises)
            setPosts([...rawPosts, ...response.flat()]);
            console.log("fetch posts")
        }
        fetchData().catch(console.error);
    }, [follows.length])


    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
    //     .then(res => {
    //       res.forEach(user => {
    //         localStorage.setItem(user.username, JSON.stringify({
    //           userID: user.id,
    //           display_name: user.name,
    //           email: user.email,
    //           number: user.phone,
    //           birth: "NA",
    //           zipcode: user.address.zipcode,
    //           password: user.address.street,
    //           status: user.company.catchPhrase
    //         }))
    //       });
    //     });
    //   })

    
    return (
        <div className="container-fluid gedf-wrapper">
            {/* <button onClick = {() => console.log(follows)}>printFollow</button>
            <button onClick = {() => console.log(posts)}>posts</button> */}
            <div className="row">
                <LeftBar username={username} name={user.display_name} originalStatus={user.status} follows={follows} setFollows={setFollows} image="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg"/>
                <CentralContent posts={posts} posterUsername={username} posterName={user.display_name}/>
                <RightBar />
            </div>
        </div>
    )


}