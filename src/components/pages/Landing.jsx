import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import './Landing.css';
import { Link } from "react-router-dom";

const Header = () => {
  const cookies = new Cookies();

  const history = useHistory();
  useEffect(() => {
    // if (!cookies.get('email')) history.push('/login');
  });
  return (
    <>
      
      <div className="home1">
          <Navbar></Navbar>
        <div className="main2">
          <div className="col col1">
            <h2>WELCOME TO THE BOOK TRADING PLATFORM!</h2>
            <p>
              <br />
              If you love books and want to trade them, just click the button to
              register yourself.
            </p>
            <button type="button">REGISTER</button>
          </div>
          <div className="col">
            <Link to="/library"><div className="cardc card1"></div></Link>
            <br />
            <Link to="/find"><div className="cardc card2"></div></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
