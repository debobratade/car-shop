import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:5000/productGet",{

    headers:{
      authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }

  })
    result = await result.json();
    setProducts(result);
  };
  //   console.warn("products", products)

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/productDel/${id}`, {
      method: "Delete",
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    if (result) {
      alert("Record deleted");
      getproducts();
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;

    if (key) {
      let result = await fetch(`http://localhost:5000/productSearch/${key}`,{

        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();

      if (result) {
        setProducts(result);
      }
    } else {
      getproducts();
    }
  };

  return (
    <>
    <div className="product-list">
      {/* <h2>Product list</h2> */}
      <input
        className="searchbox"
        type="text"
        placeholder="Search product"
        onChange={searchHandle}
      />
      </div>

      <div className="midlle">
      {
      products.length>0 ? products.map((item, index) => (
        <ul >
          <li>
            {
          <div className='card'>
          <img src={item.image} alt={item.name}/>
          <article> By {item.company}</article>
          <h3>{item.name}</h3>
          <p>{item.category}</p>
          <h2>₹ {item.price}</h2>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <button>
              <Link to={`/update/${item._id}`}>update</Link>
            </button>
            
        </div>
 } </li>
        </ul>
      ))
      : <h1>No result found</h1>
      }
    </div>
    </>
  );
};

export default ProductList;
