import React, { useEffect } from "react";
import '../css/manage-products.css'
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
const ManageProducts = () => {
  useEffect(() => {
    getProducts();
    getBuyedProducts();
    getShoppedProducts();
    }, [])

    const [productsList, setProductsList] = useState([]);
    const [buyproduct,setBuyproduct]=useState();
    const [shoppingproduct,setshoppingproduct]=useState();
    const [broughtList,setbroughtList]=useState([]);
    const [shoppingcartList,setshoppingcartList]=useState([]);
    const [buycartproduct,setBuycartproduct]=useState();
    const [delProduct,setDelProduct]=useState();
    const [ sId,setsId]=useState();
    async function getProducts() {
      const config = {
        method: 'get',
        url: 'http://localhost:8000/getProducts.php'
      }
  
      let res = await axios(config)
      setProductsList(res.data);
    }
    async function getBuyedProducts() {
      const config = {
        method: 'get',
        url: 'http://localhost:8000/getbroughtproducts.php'
      }
  
      let res = await axios(config)
      setbroughtList(res.data);
    }
    async function getShoppedProducts() {
      const config = {
        method: 'get',
        url: 'http://localhost:8000/getshoppingcart.php'
      }
  
      let res = await axios(config)
      setshoppingcartList(res.data);
    }

    let currentUser;
    if (window.sessionStorage.getItem("userDetails")) {
      currentUser = JSON.parse(window.sessionStorage.getItem("userDetails"));
    }
    let currentRole;
    if (currentUser) {
      currentRole = currentUser.role
    }
    else {
      currentRole = null;
    }
    let currentuserId;
    if(currentUser){
      currentuserId = currentUser.userId
    }
    else{
      currentuserId = null;
    }
   
    function addProductForm(e) {
    
    
      axios({
        method: 'post',
        url: 'http://localhost:8000/buyproducts.php',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          buyproduct: buyproduct,  buyedBy: currentUser.userId , requestType: "Buy"
        }
      })
        .then(result => {

          if (result.data === "success") {
            alert("Product " + buyproduct + " is bought successfully");
            
          }
          else {
            alert("Product " + buyproduct + " cannot be bought.");
            console.log()
          }
        })
        .catch(error => console.log(error));
    
    
    setBuyproduct('');
    e.preventDefault();
  }
  function addShoppingcartForm(e) {
    
    
    axios({
      method: 'post',
      url: 'http://localhost:8000/shoppingcart.php',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        shoppingproduct: buyproduct,  addedBy: currentUser.userId , requestType: "Add to cart"
      }
    })
      .then(result => {

        if (result.data === "success") {
          alert("Product " + buyproduct + " is added to cart");
          
        }
        else {
          alert("Product " + buyproduct + " cannot be added.");
          console.log()
        }
      })
      .catch(error => console.log(error));
  
  
  setshoppingproduct('');
  e.preventDefault();
}
function BuyCartProductForm(buycartproduct,sId) {
    
    
  axios({
    method: 'post',
    url: 'http://localhost:8000/buycartproduct.php',
    headers: {
      'content-type': 'application/json'
    },
    data: {
      buycartproduct: buycartproduct,  addedBy: currentUser.userId ,sId : sId, requestType: "Buy"
    }
  })
    .then(result => {

      if (result.data === "success") {
        alert("Product " + buycartproduct + " is bought");
        
      }
      else {
        alert("Product " + buycartproduct + " cannot be added.");
        console.log(buycartproduct)
      }
    })
    .catch(error => console.log(error));



}
function deleteProductForm(delProduct,ProductName) {
  axios({
    method: 'post',
    url: 'http://localhost:8000/ManageProducts.php',
    headers: {
      'content-type': 'application/json'
    },
    data: {
      delProduct: delProduct ,ProductName:ProductName
    }
  })
    .then(result => {

      if (result.data === "success") {
        alert("Product " + ProductName + " was returned  successfully.");
        
      }
      else {
        alert("Something went wrong. Try again");
      }
    })
    .catch(error => console.log(error));
  
}

function deleteShoppingCartForm(delProduct,ProductName) {
  axios({
    method: 'post',
    url: 'http://localhost:8000/deletecartproduct.php',
    headers: {
      'content-type': 'application/json'
    },
    data: {
      delProduct: delProduct ,ProductName:ProductName
    }
  })
    .then(result => {

      if (result.data === "success") {
        alert("Product " + ProductName + " was deleted successfully.");
        
      }
      else {
        alert("Something went wrong. Try again");
      }
    })
    .catch(error => console.log(error));
  
}


  return (
    <>
<div className="mb-main-div">
  <div className="main-title">Manage Products</div>
  <div className="mb-content-div">
    <div className="mb-sub-content">
      <div>
        <div className="sub-title">Buy a product</div>
        <form >
          <div className="buy-product">
            <div className="mb-single-option">
              <div>
                <label htmlFor="da-product-name" style={{ fontSize: 15 }}>
                  Select a product
                </label>
              </div>
              <div>
                <select
                  name="da-product-name"
                  id="da-product-name"
                  title="select a product"
                  value={buyproduct}
                  onChange={e => setBuyproduct(e.target.value)}
                  required
                >
                  <option disabled selected value>
                    -- Select a product --
                  </option>
                  {productsList.map(i => <option value={i.ProductName}>{i.ProductName}</option>)}
                </select>
              </div>
            </div>
            <div className="button-div">
              <div>
                <button type="buy" className="mma-buy-btn"  onClick={() => addProductForm()}>Buy</button>
                  
              </div>
              <div>
                <button type="cart" className="mma-cart-btn"onClick={() => addShoppingcartForm()} >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mb-content-div">
        <div className="mb-single-option">
          <div className="return-product">
            <div className="mb-sub-content">
              <div>
                <div className="sub-title">Return a product</div>
                <div className="return-product-title" />
                <table className="styled-table" id="product-table">
                  <thead>
                    <tr>
                      <td>Product</td>
                      <td>Cost</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                  {broughtList.length > 0 ? broughtList.map((i,key) =>
                      <tr>
                        <td>{i.ProductName}</td>
                        <td>{i.price}</td>
                        
                        <td><button type="buy" className="mma-buy-btn"  onClick={() => deleteProductForm(i.bId,i.ProductName)}>ReturnProduct</button>
               </td>
                        
                      </tr>
                    ) : <tr><td colSpan={5}>Sorry! There are no brought Products. Please create new to view them here.</td></tr>}
                 
                   </tbody>
                </table>
              </div>
            </div>
            <div className="mb-sub-content">
              <div>
                <div className="sub-title">Delete Product</div>
                <div className="delete-product-title" />
                <table className="styled-table" id="product-table">
                  <thead>
                    <tr>
                      <td>Product</td>
                      <td>Cost</td>
                      <td>Actions</td>
                      <td />
                    </tr>
                  </thead>
                  <tbody>
                  {shoppingcartList.length > 0 ? shoppingcartList.map((i,index)=>
                      <tr key={index}>
                        <td >{i.ProductName}</td>
                        <td>{i.price}</td>
                      
                        <td><button type="buy" className="mma-buy-btn"  onClick={() => BuyCartProductForm(i.ProductName,i.sId)}>Buy</button>
                         
                        </td>
                        <td> <button type="buy" className="mma-buy-btn" onClick={() => deleteShoppingCartForm(i.sId,i.ProductName)} >Delete product</button>
                          </td>
                        
                      </tr>
                    ) : <tr><td colSpan={5}>Sorry! There are no brought Products. Please create new to view them here.</td></tr>}
                 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default ManageProducts;