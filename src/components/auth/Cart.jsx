import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import Navbar from "../pages/Navbar";
export default function Cart() {
  const cookies = new Cookies();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const history = useHistory();
  const [cart, setCart] = useState([]);
  function checkout() {
    let data = {
      email: cookies.get("email"),
      cart: cart,
    };
    if (window.confirm("Purchase all items?")) {
      Axios.post("https://book-backend.vercel.app/users/clearCart", data).then(
        (res) => {
          console.log(res);
          forceUpdate();
          alert(res.data.message);
        }
      );
    }
  }
  function deleteItem(index) {
    let data = {
      index,
      email: cookies.get("email"),
      cart,
    };
    if (window.confirm("Delete item from cart?")) {
      Axios.post(
        "https://book-backend.vercel.app/users/deleteFromCart",
        data
      ).then((res) => {
        console.log(res);
        forceUpdate();
        alert(res.data.message);
      });
    }
  }
  useEffect(() => {
    if (cookies.get("email")) {
      fetch(
        "https://book-backend.vercel.app/users/search?email=" +
          cookies.get("email")
      )
        .then((res) => res.json())
        .then((json) => {
          setCart(json.user.cart);
        });
    } else history.push("/login");
  }, [ignored]);
  return (
    <>
      <Navbar></Navbar>
      <div
        className="m-auto p-5 "
        style={{ backgroundColor: "#B0E0E6", height: "100vh" }}
      >
        <p
          className="text-center h2 p-4"
          style={{ color: "red", fontWeight: "bold" }}
        >
          CART
        </p>
        <table className="table table-bordered table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Book Name</th>
              <th scope="col">Author</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((element, index) => (
              <tr key={element._id}>
                <th scope="row">{element.bookName} </th>
                <td>{element.author} </td>
                <td>
                  <button onClick={() => deleteItem(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <button
            type="button"
            onClick={() => checkout()}
            className="btn btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
