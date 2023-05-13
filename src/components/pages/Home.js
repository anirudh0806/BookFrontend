import React from "react";
import {Link} from "react-router-dom";
import "./Home.css";
import lend from "./lend.jpg";
import find from "./find.jpg";

function Home() {
  return (

      <div className="home">
        <div className="header">
        <h2 className="headerText" style={{
              display:"inline-block",
              marginTop:25,
		        	marginLeft:"10%",
		        	marginRight:0,
              
              fontWeight:"bold",
              fontSize:"220%",
               color: "yellow",
              
            }}>BOOK TRADING SYSTEM</h2>
        <Link to="/register">
          <button type="button"  className="buttoncomp btn btn-success btn-lg" >REGISTER</button>
          </Link>

        <Link to="/login">
          <button type="button"  className="buttoncomp btn btn-success btn-lg" >LOGIN</button>
          
          </Link>
        </div>
        <div className="main">
          <div className="textcomp" style={{
              padding:80,
            }}>
            <div style={{

              color:"white",
              fontSize:20,
              textAlign:"justified",
            }}><h4>Ever felt that selling books is a tiring and prolonged process?</h4><br/><p>Don't you worry because our website makes it simple by connecting the buyer and the seller with a user-friendly interface. Exchanging books was never this easy!<br></br><b>Log in or Register to use the tool.</b><br></br></p></div>
          </div>
          <div style={{
            display:"inline-block",
            position:"relative",
            left:180,

          }}>
            <img src={lend} alt="image"/>
            <h4 className="textcomp">Sell Books</h4>
            <p className="textcomp">
              Dont need a book you own?<br/>Sell used books lying idle on the shelf.
            </p>
          </div>
          <div style={{
            display:"inline-block",
            position:"relative",
            left:400,
          }}>
            <img src={find} alt="image"/>
            <h4 className="textcomp">Buy Books</h4>
            <p className="textcomp">
              Struggling to find books you like?<br/>Search for and Buy books with ease
            </p>
          </div>
        </div>
      </div>

  )
}
export default Home;
