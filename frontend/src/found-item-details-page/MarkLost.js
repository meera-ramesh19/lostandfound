import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './found.css';
import { useLocation } from 'react-router-dom';
import image from './bg.jpeg';
import Switch from 'react-switch';
import dark from './darkbg.jpg';
const host = 'http://localhost:3010';

const MarkLost = () => {
  const { data } = useLocation();
  const theme = data.state.theme;
  const cat = data.state.category;

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState();
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [place, setPlace] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [details, setDetails] = useState('');
  const [isIdentifiable, setIsIdentifiable] = useState(false);

  const handleSwitchChange = (checked) => {
    setIsIdentifiable(checked);
  };

  // const handleCategoryChange = (event) => {
  //   setSelectedCategory(event.target.value);
  //   // Additional logic based on category change
  // };

  // const handleSubcategoryChange = (event) => {
  //   setSelectedSubcategory(event.target.value);
  //   // Additional logic based on subcategory change
  // };
  // const handleCategoryChange = (e) => {
  //   setCategory(e.target.value);
  //   setSubcategory('');
  //   setItemName('');
  // };

  // const handleSubcategoryChange = (e) => {
  //   setSubcategory(e.target.value);
  //   if (e.target.value === 'other') {
  //     setItemName('');
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('date', date);
    // formData.append('category', category);
    // formData.append('subcategory', subcategory);
    formData.append('itemName', itemName);
    formData.append('place', place);
    formData.append('ownerName', ownerName);
    formData.append('details', details);
    formData.append('isIdentifiable', isIdentifiable);
    // formData.append('itemImage', itemImage);
    if (itemImage) {
      formData.append('itemImage', itemImage);
    }
    console.log('FORM DATA :', formData);

    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      const response = await axios.post(
        'http://localhost:3010/found/submitFoundItem',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User created:', response.data);
      // Reset form fields after successful submission
      setDescription('');
      setDate('');
      setCategory('');
      setSubcategory('');
      setItemName('');
      setItemImage(null);
      setPlace('');
      setOwnerName('');
      setDetails('');
      setIsIdentifiable(false);
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (theme !== 'dark') {
      document.body.style.background = `url(${image}) `;
      document.body.style.backgroundSize = 'cover';
    } else {
      document.body.style.background = `url(${dark}) `;
      document.body.style.backgroundSize = 'cover';
    }

    return () => {
      document.body.style.background = null;
    };
  }, [theme]);

  return (
    <>
      <h1
      // style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
      >
        Found Item details
      </h1>

      <form
        style={{
          backgroundColor: `${theme === 'dark' ? 'rgb(74 72 72)' : ''}`,
          marginBottom: '150px',
        }}
        onSubmit={handleFormSubmit}
      >
        <div className='col-5'>
          <label
            style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
            htmlFor='description'
          >
            Description
            <input
              type='text'
              id='description'
              value={description}
              style={{
                backgroundColor: `${theme === 'dark' ? 'rgb(74 72 72)' : ''}`,
                color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
              }}
              placeholder='Enter description of the item'
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='col-4'>
          <label
            style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
            htmlFor='date'
          >
            Date
            <input
              type='date'
              id='date'
              value={date}
              style={{
                backgroundColor: `${theme === 'dark' ? 'rgb(74 72 72)' : ''}`,
                color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
              }}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='col-3'>
          <label
            style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
            htmlFor='place'
          >
            Place you Found the Item
            <input
              type='text'
              id='place'
              placeholder='Enter the place you found the item'
              style={{
                marginTop: '22px',
                paddingBottom: '15px',
                backgroundColor: `${theme === 'dark' ? 'rgb(74 72 72)' : ''}`,
                color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
              }}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </label>
        </div>

        <div className='col-3'>
          <label
            style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
            htmlFor='category'
          >
            Category:
            <input
              type='text'
              id='category'
              name='category'
              defaultValue={category}
              readonly
            />
            {/* <select
              className='pb-1 pt-2'
              id='category'
              value={categorry}
              style={{
                backgroundColor: `${theme === 'dark' ? 'rgb(74 72 72)' : ''}`,
                color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
              }}
              // onChange={handleCategoryChange}
              readOnly
            >
              <option value=''>Select category</option>
              <option value='Cards'>Cards</option>
              <option value='Electronic Devices'>Electronic Devices</option>
              <option value='Books'>Books</option>
              <option value='Others'>Others</option> 
            </select> */}
          </label>
        </div>
        {/* {categorry && ( */}
        <div className='col-3'>
          <label
            // style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
            htmlFor='subcategory'
          >
            Subcategory
            <input
              type='text'
              id='subcategory'
              name='subcategory'
              defaultValue={subcategory}
              readonly
            />
          </label>
        </div>
        {/*  {categorry === 'Cards' && (
                <select
                  id='subcategory'
                  value={subcategorry}
                  className='pb-1 pt-2'
                  style={{
                    backgroundColor: `${
                      theme === 'dark' ? 'rgb(74 72 72)' : ''
                    }`,
                    color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                  }}
                  // onChange={handleSubcategoryChange}
                  readOnly
                >
                  <option value=''>Select subcategory</option>
                  <option value='College ID Card'>College ID Card</option>
                  <option value='ATM Card'>ATM Card</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value='Aadhar Card'>Aadhar Card</option>
                  <option value='Any other item'>Any other card</option>
                </select>
              )}
              {categorry === 'Electronic Devices' && (
                <select
                  id='subcategory'
                  value={subcategorry}
                  className='pb-1 pt-2'
                  style={{
                    backgroundColor: `${
                      theme === 'dark' ? 'rgb(74 72 72)' : ''
                    }`,
                    color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                  }}
                  // onChange={handleSubcategoryChange}
                  required
                >
                  <option value=''>Select subcategory</option>
                  <option value='Mobile Phone'>Mobile Phones</option>
                  <option value='Laptop'>Laptop</option>
                  <option value='Smart Watch'>Smart Watch</option>
                  <option value='Charger'>Charger</option>
                  <option value='Any other item'>
                    Any other electronic device
                  </option>
                </select>
              )}
              {categorry === 'Books' && (
                <select
                  id='subcategory'
                  value={subcategorry}
                  className='pb-1 pt-2'
                  style={{
                    backgroundColor: `${
                      theme === 'dark' ? 'rgb(74 72 72)' : ''
                    }`,
                    color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                  }}
                  // onChange={handleSubcategoryChange}
                  required
                >
                  <option value=''>Select subcategory</option>
                  <option value='Notebook'>Notebooks/Registers</option>
                  <option value='Book'>Book</option>
                  <option value='Novel'>Novel</option>
                  <option value='Any other item'>Any other book</option>
                </select>
              )}
              {categorry === 'Others' && (
                <select
                  id='subcategory'
                  className='pb-1 pt-2'
                  value={subcategorry}
                  style={{
                    backgroundColor: `${
                      theme === 'dark' ? 'rgb(74 72 72)' : ''
                    }`,
                    color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                  }}
                  // onChange={handleSubcategoryChange}
                  required
                >
                  <option value=''>Select subcategory</option>
                  <option value='Bottle'>Bottles</option>
                  <option value='Wallet'>Wallets</option>
                  <option value='Bag'>Bags</option>
                  <option value='Any other item'>Any other item</option>
                </select>
                )}
          </label> 
        </div>
        {/* )} */}
        {/* {subcategorry === 'Any other item' && (
          <div className='col-3'>
            <label
              style={{ color: `${ theme === 'dark' ? '#f5f5f5' : ''}` }}
              htmlFor='itemName'
            >
              Name of Item
              <input
                type='text'
                id='itemName'
                style={{
                  marginTop: '22px',
                  paddingBottom: '15px',
                  backgroundColor: `${
                    theme === 'dark' ? 'rgb(74 72 72)' : ''
                  }`,
                  color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                }}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </label>
          </div>
              )}   */}
        <div className='col-3'>
          <label
            // style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
            htmlFor='itemImage'
            type='file'
          >
            Image
            <div>
              <input
                className='select pt-1'
                type='file'
                id='itemImage'
                // style={{
                //   backgroundColor: `${theme === 'dark' ? 'rgb(74 72 72)' : ''}`,
                //   color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                // }}
                onChange={(e) => setItemImage(e.target.files[0])}
                required
              />
            </div>
          </label>
        </div>
        <div className='col-4'>
          <label
          // style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
          >
            Item is Identifiable?
            <center
              style={{
                position: 'relative',
                marginBottom: '8px',
                paddingTop: '10px',
              }}
            >
              <Switch
                onChange={handleSwitchChange}
                checked={isIdentifiable}
                className='react-switch'
                id='itemIdentifiableSwitch'
              />
            </center>
          </label>
        </div>
        {isIdentifiable && (
          <>
            <div className='col-3'>
              <label
                // style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
                htmlFor='ownername'
              >
                Owner Name
                <input
                  type='text'
                  id='ownerName'
                  value={ownerName}
                  placeholder='Enter owner name'
                  // style={{
                  //   marginTop: '22px',
                  //   paddingBottom: '15px',
                  //   backgroundColor: `${
                  //     theme === 'dark' ? 'rgb(74 72 72)' : ''
                  //   }`,
                  //   color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                  // }}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className='col-3'>
              <label
                // style={{ color: `${theme === 'dark' ? '#f5f5f5' : ''}` }}
                htmlFor='anydetails'
              >
                Any other details
                <input
                  type='text'
                  id='anydetails'
                  placeholder='Enter any other details'
                  // style={{
                  //   marginTop: '22px',
                  //   paddingBottom: '15px',
                  //   backgroundColor: `${
                  //     theme === 'dark' ? 'rgb(74 72 72)' : ''
                  //   }`,
                  //   color: `${theme === 'dark' ? '#f5f5f5' : ''}`,
                  // }}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </label>
            </div>
          </>
        )}
        <div className='col-submit'>
          <button type='submit' className='submitbtn'>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default MarkLost;
