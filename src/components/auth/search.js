import react, { Component, useEffect, useReducer, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from '../pages/Navbar';
import './search.css';

export default function Search(props) {
  const cookies = new Cookies();

  const history = useHistory();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    if (cookies.get('email')) {
      fetch('https://book-backend.vercel.app/users/search?email=' + cookies.get('email'))
        .then((res) => res.json())
        .then((json) => {
          setData(json.a);
          setCart(json.user.cart);
          setLoaded(true);
        });
    } else history.push('/login');
  }, [ignored]);

  function handleClick(e) {
    const id = e.currentTarget.id;
    const data1 = {
      id: id,
    };
    var result;
    if (e.currentTarget.name == cookies.get('email')) {
      result = window.confirm("Do you want to delete your listed book?");
    }
    else {
      result = window.confirm('Are you sure you want to buy the book?');
    }

    if (result) {
      Axios.post('https://book-backend.vercel.app/users/delete', data1).then((res) => {
        alert('Purchase Successful');
        forceUpdate();
      });
    }
  }
  function handleCart(e) {
    const id = e.currentTarget.id;
    const data = {
      id: id,
      cart: cart,
      email: cookies.get('email'),
    };
    var result = window.confirm('Are you sure you want to add the book to cart?');
    if (result) {
      Axios.post('https://book-backend.vercel.app/users/add', data).then((res) => {
        console.log(res);
        forceUpdate();
        alert(res.data.message);
      });
    }
  }
  return isLoaded ? (
    <>
      <Navbar />
      <div style={{ minHeight: "120vh", height:"140%",overflow:"hidden", backgroundColor: "#2F4F4F" }} >
        <div>

          <div className='text-center'><b className="text-center title m-auto">PURCHASE USED BOOKS</b></div>
        </div>
        <ul style={{ listStyleType: 'none' }}>
          <div>
            {data.length > 0 ? data.map((item) => (
              <div key={item._id}>
                <li className="main1">
                  <br />
                  <p className="details">
                    BookName : <b>&nbsp;&nbsp;{item.bookName}</b>{' '}
                  </p>
                  <p className="details">
                    Author &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>&nbsp;&nbsp;{item.author}</b>
                  </p>
                  <p className="details">
                    Email ;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>&nbsp;&nbsp;{item.email}</b>
                  </p>
                  <p className="details">
                    Phone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>&nbsp;&nbsp;{item.phoneno}</b>
                  </p>
                  <button
                    className="details_btn"
                    id={item._id}
                    name={item.email}
                    onClick={handleClick}>
                    {' '}
                    {item.email == cookies.get('email') ? "DELETE" : "BUY"}{' '}
                  </button>

                  {item.email != cookies.get('email') ? <button
                    className="details_btn"
                    id={item._id}
                    onClick={handleCart}>
                    {' '}
                    Add to cart{' '}
                  </button> : null}
                  <br />
                </li>
                <br />
              </div>
            )) : <div className="text-center h3 py-5 text-light">NO BOOKS FOUND</div>}
            <br />
            <div className="text-center text-light">
              {' '}
              Can't find your book? <Link to="/find"> Click here</Link>
            </div>
          </div>
        </ul>
      </div>
    </>
  ) : (
    <div>Loading</div>
  );
}
