import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import Navbar from '../pages/Navbar';

export default function App() {
  const cookies = new Cookies();
  const history = useHistory();
  const [bookname, setBookname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  useEffect(() => {
    if (!cookies.get('email')) history.push('/login');
    else
    {
      setEmail(cookies.get('email'))
    }
  },[]);
  function changeBookName(event) {
    setBookname(event.target.value);
  }
  function changeUsername(event) {
    setUsername(event.target.value);
  }
  // function changeEmail(event) {
  //   setEmail(event.target.value);
  // }
  function changePhoneno(event) {
    setPhoneno(event.target.value);
  }
  function onSubmit(event) {
    event.preventDefault();
    const registered = {
      bookName: bookname,
      username: username,
      email: email,
      phoneno: phoneno,
    };

    axios
      .post('https://book-backend.vercel.app/users/profile', registered)
      .then((response) => console.log(response.data));
    alert('Book Added');
    setBookname('');
    setUsername('');
    setEmail(cookies.get('email'));
    setPhoneno('');
  }
  return (
    <div  style={{height: "100vh" ,backgroundColor:"#000030"}}>
    <Navbar />

    <div className="container1 justify-content-center mx-auto px-4">
      <div>
        <br />
        
        <form className="form23" onSubmit={onSubmit}>
          <input
            type="text"
            required
            placeholder="Book"
            onChange={changeBookName}
            value={bookname}
            className="form-control form-group"
          />
          <input
            type="text"
            required
            placeholder="Author"
            onChange={changeUsername}
            value={username}
            className="form-control form-group"
          />
          {/* <input
            type="email"
            required
            placeholder="Email"
            onChange={changeEmail}
            value={email}
            className="form-control form-group"
          /> */}
          <input
            type="text"
            required
            pattern="^\d{10}$"
            placeholder="Phone Number (10 digits)"
            onChange={changePhoneno}
            value={phoneno}
            className="form-control form-group"
          />
          <br />
          <div className="d-flex justify-content-center">
            <input
              type="submit"
              className="  btn btn-outline-primary px-5"
              value="Sell"
            />
            {/* <Link to="/search" className=" btn btn-outline-primary px-5">
              Library
            </Link> */}
            {/* <button
              value="Sign Out"
              onClick={(e) => {
                e.preventDefault();
                cookies.remove('email');
                history.push('/');
              }}
              className="btn btn-outline-primary px-5">
              Sign Out
            </button> */}
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
