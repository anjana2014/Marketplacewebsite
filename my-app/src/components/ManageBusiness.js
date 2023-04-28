import React, { useState, useEffect } from "react";
import '../css/manage-business.css'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
const ManageBusiness = () => {
  useEffect(() => {
    getBuildings();
  }, [])
  const [rbBuilding, setRbBuilding] = useState('');
  const [rProdcategory , setrProdcategory]=useState('');
  const [rPrice , setrPrice]=useState('');
  const [rbApartment, setRbApartment] = useState('');
  const [buildingList, setBuildingList] = useState([]);
  const [delApartmentList, setDelApartmentList] = useState([]);
  const [naBuilding, setNaBuilding] = useState('');
  const [naApartment, setNaApartment] = useState('');
  const [daBuilding, setDaBuilding] = useState('');
  const [daApartment, setDaApartment] = useState('');
  const [dbBuilding, setDbBuilding] = useState('');
  const [rnbBuilding, setRnbBuilding] = useState('');
  const [rnbNewBuilding, setRnbNewBuilding] = useState('');
  const [rnaBuilding, setRnaBuilding] = useState('');
  const [rnaApartment, setRnaApartment] = useState('');
  const [rnaNewApartment, setRnaNewApartment] = useState('');
  const [rnaApartmentList, setRnaApartmentList] = useState([]);
  const [addedby,setaddedby]=useState('');
  const [naprodcategory,setnaprodcategory]=useState('');
  const [naprice,setnaprice]=useState('');
  const[delBusiness,setDelBusiness]=useState('');
  
  async function getBuildings() {
    const config = {
      method: 'get',
      url: 'http://localhost:8000/getBusiness.php'
    }

    let res = await axios(config)
    setBuildingList(res.data);
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
  function registerBuildingForm(e) {
    let aptRegex =/^[a-zA-Z, ]*$/;
    if (rbApartment.match(aptRegex)) {
      axios({
        method: 'post',
        url: 'http://localhost:8000/managebusiness.php',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          rbBuilding: rbBuilding.trim(), rbApartment: rbApartment.trim(), reqType: 'registerBuilding',
          naBuilding: '', naApartment: '', daBuilding: '', daApartment: '', dbBuilding: '',
          rnbBuilding: '', rnbNewBuilding: '', rnaBuilding: '', rnaApartment: '', rnaNewApartment: '',rProdcategory:rProdcategory.trim(),
          rPrice:rPrice.trim(),addedby:currentUser.userId
        }
      })
        .then(result => {
          if (result.data.building === 'success') {
            alert("Business added successfully");
            let apts = rbApartment.split(',');
            let addedApts = '';
            let failedApts = '';
            setRbBuilding('');
            setRbApartment('');
            setrProdcategory('');
            setrPrice('');
            getBuildings();
          }
          else {
            alert("Sorry the business was not added. Looks like there's a business the same name. If not please try again");
          }
        })
        .catch(error => console.log(error));
      e.preventDefault();
    }
    else {
      alert("Please check the Product field.");
      e.preventDefault();
      return false;
    }
  }

  function addNewApartmentForm(e) {
    let aptRegex = /^[a-zA-Z, ]*$/;
    if (naApartment.match(aptRegex)) {
      axios({
        method: 'post',
        url: 'http://localhost:8000/updateproducts.php',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          rbBuilding: '', rbApartment:'', reqType: 'addNewApt',
          naBuilding: '', naApartment: '', daBuilding: '', daApartment: '', dbBuilding: '',
          rnbBuilding: '', rnbNewBuilding: '', rnaBuilding: '', rnaApartment: '', rnaNewApartment: '',rProdcategory:'',
          rPrice:'',addedby:currentUser.userId,naprodcategory:naprodcategory.trim(),naprice:naprice.trim()
        }
      })
      .then(result => {
        if (result.data.building === 'success') {
          alert("Products added successfully");
          let apts = naApartment.split(',');
          let addedApts = '';
          let failedApts = '';
          setNaBuilding('');
          setNaApartment('');
          setnaprodcategory('');
          setnaprice('');
          
        }
      }).catch(error => console.log(error));
      e.preventDefault();
    }
    else {
      alert("Please check the product field. Only names and commas are allowed");
      e.preventDefault();
      return false;
    }
  }
  function getDeleteApartments(e) {
    setDaBuilding(e.target.value);
    axios({
      method: 'post',
      url: 'http://localhost:8000/getProducts.php',
      headers: {
        'content-type': 'application/json'
      },
      data: { building: e.target.value }
    })
      .then(result => {
        setDelApartmentList(result.data);
      })
      .catch(error => console.log(error));

  }
  function getRenameApartments(e) {
    setRnaBuilding(e.target.value);
    axios({
      method: 'post',
      url: 'http://localhost:8000/getProducts.php',
      headers: {
        'content-type': 'application/json'
      },
      data: { building: e.target.value }
    })
      .then(result => {
        setRnaApartmentList(result.data);
      })
      .catch(error => console.log(error));

  }
  function deleteApartmentForm(e) {
    let apt = prompt("Are you sure you want to delete the apartment '" + daApartment + "'? This action can't be undone. Please type the apartment number in the textbox below to confirm.");
    if (apt === daApartment) {
      axios({
        method: 'post',
        url: 'http://localhost:8000/ManageBusiness.php',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          naBuilding: '', naApartment: '', reqType: 'delApt', rbBuilding: '', rbApartment: '',
          daBuilding: daBuilding.trim(), daApartment: parseInt(daApartment.trim()), dbBuilding: '',
          rnbBuilding: '', rnbNewBuilding: '', rnaBuilding: '', rnaApartment: '', rnaNewApartment: '',rProdcategory:'',
          rPrice:'',addedby:currentUser.userId
        }
      })
        .then(result => {
          if (result.data === 'success') {
            alert("Apartment " + daApartment + " deleted successfully!");
          }
          else {
            alert("Looks like Apartment " + daApartment + " is Occupied. You can't delete an apartment with a resident in it.");
          }
          setDaBuilding('');
          setDaApartment('');
          setDelApartmentList([]);
        })
        .catch(error => console.log(error));
    }
    e.preventDefault();
  }

  function deleteBuildingForm(e) {
    let build = prompt("Are you sure you want to delete the business '" + delBusiness + "'? This action can't be undone. Please type the business name in the textbox below to confirm.");
    if (build.toLowerCase() === delBusiness.toLowerCase()) {
      axios({
        method: 'post',
        url: 'http://localhost:8000/delbusiness.php',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          delBusiness:delBusiness
        }
      })
        .then(result => {

          if (result.data === 'success') {
            alert("Building " + delBusiness + " deleted successfully!");
            getBuildings();
          }
          else {
            alert("Looks like Business " + delBusiness + " has products in it.")}
          setDelBusiness('');
        })
        .catch(error => console.log(error));
    }
    e.preventDefault();
  }
  function renameBuildingForm(e) {
    axios({
      method: 'post',
      url: 'http://localhost:8000/ManageBusiness.php',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        naBuilding: '', naApartment: '', reqType: 'renameBuilding', rbBuilding: '', rbApartment: '',
        daBuilding: '', daApartment: '', dbBuilding: '', rnbBuilding: rnbBuilding, rnbNewBuilding: rnbNewBuilding.trim(),
        rnaBuilding: '', rnaApartment: '', rnaNewApartment: '',rProdcategory:'',
        rPrice:'',addedby:currentUser.userId
      }
    })
      .then(result => {

        if (result.data === 'success') {
          alert("Building " + dbBuilding + " renamed successfully!");
          getBuildings();
        }
        else {
          alert("Looks like something went wrong. Building " + rnbBuilding + " was not renamed. There might me another building with the same name. Please try again using a different name.");
        }
        setRnbBuilding('');
        setRnbNewBuilding('');
      })
      .catch(error => console.log(error));
    e.preventDefault();
  }
  function renameApartmentForm(e) {
    let aptRegex = /^[0-9]*$/;
    if (rnaNewApartment.match(aptRegex)) {
      axios({
        method: 'post',
        url: 'http://localhost:8000/ManageBusiness.php',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          naBuilding: '', naApartment: '', reqType: 'renameApartment', rbBuilding: '', rbApartment: '',
          daBuilding: '', daApartment: '', dbBuilding: '', rnbBuilding: '', rnbNewBuilding: '',rProdcategory:'',
          rPrice:'',addedby:currentUser.userId,
          rnaBuilding: rnaBuilding, rnaApartment: rnaApartment, rnaNewApartment: rnaNewApartment.trim()
        }
      })
        .then(result => {

          if (result.data === 'success') {
            alert("Apartment " + rnaApartment + " renamed successfully!");
          }
          else {
            alert("Looks like something went wrong. Apartment " + rnaApartment + " was not renamed. There might me another apartment with the same number. Please try again using a different number.");
          }
          setRnaBuilding('');
          setRnaApartment('');
          setRnaNewApartment('');
          setRnaApartmentList([]);
        })
        .catch(error => console.log(error));
    }
    else {
      alert("Only numbers are allowed in the apartment number");
      setRnaNewApartment('');
    }

    e.preventDefault();
  }
  return (
    currentRole === "Admin" || currentRole === "BusinessOwner" ?
      <>
        
        <div className="mb-main-div">
          <div className="main-title">Manage Business</div>
          <div className="mb-content-div">
            <div className="mb-sub-content">
              <div>
                <div className="sub-title">Register a new Business</div>
                <form className="ctm-form" onSubmit={registerBuildingForm}>
                  <div className="add-building">
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-building-name" style={{ fontSize: "15px" }}>Name for new building:</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Business Name"
                          autoComplete="nope"
                          required
                          name="add-building-name"
                          id="add-building-name"
                          value={rbBuilding}
                          onChange={e => setRbBuilding(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-apartment-name" style={{ fontSize: "15px" }}
                        >Enter Products category 
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Product Names"
                          autoComplete="nope"
                          required
                          name="add-apartment-name"
                          id="add-apartment-name"
                          value={rProdcategory}
                          onChange={e => setrProdcategory(e.target.value)}
                          
                        />
                        
                      </div>
                      
                    </div>
                    
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-apartment-name" style={{ fontSize: "15px" }}
                        >Enter Products followed by comma(,)
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Product Names"
                          autoComplete="nope"
                          required
                          name="add-apartment-name"
                          id="add-apartment-name"
                          value={rbApartment}
                          onChange={e => setRbApartment(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-apartment-name" style={{ fontSize: "15px" }}
                        >Enter Price
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Products Price"
                          autoComplete="nope"
                          required
                          name="add-apartment-name"
                          id="add-apartment-name"
                          value={rPrice}
                          onChange={e => setrPrice(e.target.value)}
                          
                        />
                      </div>
                      
                    </div>
                    <div className="button-div">
                      <div>
                        <button type="submit" className="submit-btn">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* <div>
                <div className="sub-title">Add new product to a business</div>
                <form className="ctm-form" onSubmit={addNewApartmentForm}>
                  <div className="add-new-apartment">
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-apartment-building" style={{ fontSize: "15px" }}
                        >Business to add a product</label>
                      </div>
                      <div>
                        <select
                          name="add-apartment-building"
                          id="add-apartment-building"
                          title="select a building"
                          required
                          value={naBuilding}
                          onChange={e => setNaBuilding(e.target.value)}
                        >
                          <option disabled value=''>
                            --Select a business--
                          </option>
                          {buildingList.map(i => <option value={i.BusinessName}>{i.BusinessName}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-new-apartment-name" style={{ fontSize: "15px" }}
                        >Enter Product Names followed by comma(,)
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Product Names(s)"
                          autoComplete="nope"
                          required
                          name="add-new-apartment-name"
                          id="add-new-apartment-name"
                          value={naApartment}
                          onChange={e => setNaApartment(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-apartment-name" style={{ fontSize: "15px" }}
                        >Enter Products category 
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Product Names"
                          autoComplete="nope"
                          required
                          name="add-apartment-name"
                          id="add-apartment-name"
                          value={naprodcategory}
                          onChange={e => setnaprodcategory(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="add-apartment-name" style={{ fontSize: "15px" }}
                        >Enter Price
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Products Price"
                          autoComplete="nope"
                          required
                          name="add-apartment-name"
                          id="add-apartment-name"
                          value={naprice}
                          onChange={e => setnaprice(e.target.value)}
                          
                        />
                        {console.log(naApartment)}
                      </div>
                      {console.log(naprice)}
                    </div>
                    <div className="button-div">
                      <div>
                        <button type="submit" className="submit-btn">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div> */}
              <div>
                <div className="sub-title">Delete a business</div>
                <form className="ctm-form" onSubmit={deleteBuildingForm}>
                  <div className="delete-building">
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="delete-building-name" style={{ fontSize: "15px" }}>Business to Delete</label>
                      </div>
                      <div>
                        <select
                          name="delete-building-name"
                          id="delete-building-name"
                          title="select a building"
                          required
                          value={delBusiness}
                          onChange={e => setDelBusiness(e.target.value)}>
                          <option disabled value=''>
                            -- Select a business --
                          </option>
                          {buildingList.map(i => <option value={i.BusinessName}>{i.BusinessName}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="button-div">
                      <div>
                        <button type="submit" className="delete-btn">Delete</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="sub-title">Delete an Product</div>
                <form className="ctm-form" onSubmit={deleteApartmentForm}>
                  <div className="delete-apartment">
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="da-building-name" style={{ fontSize: "15px" }}>Select a business</label>
                      </div>
                      <div>
                        <select
                          name="da-building-name"
                          id="da-building-name"
                          title="select a building"
                          required
                          value={daBuilding}
                          onChange={getDeleteApartments}
                        >
                          <option disabled value=''>
                            -- Select a business --
                          </option>
                          {buildingList.map(i => <option value={i.BusinessName}>{i.BusinessName}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="da-apartment-name" style={{ fontSize: "15px" }}>Select product to delete</label>
                      </div>
                      <div>
                        <select
                          name="da-apartment-name"
                          id="da-apartment-name"
                          title="select an apartment"
                          required
                          value={daApartment}
                          onChange={e => setDaApartment(e.target.value)}
                        >
                          <option disabled value=''>
                            -- Select an product --
                          </option>
                          {delApartmentList.map(i => <option value={i.ProductName}>{i.ProductName}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="button-div">
                      <div>
                        <button type="submit" className="delete-btn">Delete</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="sub-title">Rename a business</div>
                <form className="ctm-form" onSubmit={renameBuildingForm}>
                  <div className="rename-building">
                    <div className="mb-single-option">
                      <div>
                        <label htmlFor="old-building-name" style={{ fontSize: "15px" }}
                        >Business to rename</label>
                      </div>
                      <div>
                        <select
                          name="old-building-name"
                          id="old-building-name"
                          title="select a building"
                          required
                          value={rnbBuilding}
                          onChange={e => setRnbBuilding(e.target.value)}
                        >
                          <option disabled value=''>
                            -- Select a business --
                          </option>
                          {buildingList.map(i => <option value={i.BusinessName}>{i.BusinessName}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="mb-single-option">
                      <div>
                        <label
                          htmlFor="new-rename-building-name"
                          style={{ fontSize: "15px" }}
                        >Enter new name
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="New Name for business"
                          autoComplete="nope"
                          required
                          name="new-rename-building-name"
                          id="new-rename-building-name"
                          value={rnbNewBuilding}
                          onChange={e => setRnbNewBuilding(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="button-div">
                      <div>
                        <button type="submit" className="submit-btn">Rename</button>
                      </div>
                      {/* <div>
                        <button type="reset" className="reset-btn">Reset</button>
                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
             
            </div>
          </div>
        </div>
      </>
      :
      <>
        <div style={{ marginTop: "200px" }}>

          You are not authorised to access this page. Please
          <Link to="/login" style={{ color: "red" }}> login </Link> with admin or BusinessOwner role to view this page.
        </div>

      </>
  )
}

export default ManageBusiness;