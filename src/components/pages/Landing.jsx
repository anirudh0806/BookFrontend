import React from "react";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Landing.css";
import { Link } from "react-router-dom";

const Header = () => {
  const cookies = new Cookies();

  const history = useHistory();
  useEffect(() => {
    if (!cookies.get("email")) history.push("/login");
  });
  return (
    <>
      <div className="home1">
        <Navbar></Navbar>
        <div className="main2">
          <div className="col col1">
            <h2 style={{"color":"#00FF00"}}> WELCOME TO THE BOOK TRADING PLATFORM!</h2>
            <p>
              <br />
              If you love books, you are at the right place!
            </p>
            {/* <button type="button">EXPLORE</button> */}
          </div>
          <div className="col3">
            <Link to="/search">
              <div className="cardc card1" ></div>
              <div style={{color:"#DC143C",marginLeft:"10%",fontSize:"90%",fontWeight:"bolder",fontFamily:"Arial"}}><b>TRADING</b></div>
            </Link>
            
            
            <Link to="/find">
              <div className="cardc card2"></div>
              <div style={{color:"#B22222",marginLeft:"7%",fontSize:"90%",fontWeight:"bolder",fontFamily:"Arial"}}><b>BUY NEW BOOKS FROM <br />THE LATEST COLLECTION</b></div>
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
