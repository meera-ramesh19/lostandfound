import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import './helpUs.css';
// import DisplayForm from '../found-item-details-page/DisplayForm';
import no_image from './no-image.png';
import loading from './loading.gif';
import { Link } from 'react-router-dom';
import dark from './dark.jpg';

const HelpUs = (props) => {
  const { theme } = props;
  const [fetched, setFetched] = useState(false);
  const [lostItems, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false); // Track whether to show the form
  // const [category, setCategory] = useState('');
  // const [subCategory, setSubCategory] = useState('');
  const host = 'http://localhost:3010';

  // const handleReportAsFound = (theme) => {

  //   // setCategory(cat);
  //   // setSubCategory(subcat);
  //   setShowForm(true); // Show the form
  // };

  const [spinner, setSpinner] = React.useState(true);
  // API call
  const url = `${host}/lost/getLostItems`;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setItems(json);
        // console.log(json);
        setFetched(true);
      } catch (error) {
        console.log(error.message);
      } finally {
        setSpinner(false); // Hide the spinner after data is fetched
      }
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundImage = `url(${dark})`;
      document.body.style.backgroundSize = 'contain';
    } else {
      document.body.style.backgroundImage =
        'linear-gradient(to right top, rgb(101 173 191), rgb(237 242 243))';
    }
    return () => {
      document.body.style.backgroundImage = null;
    };
  }, [theme]);

  return (
    <>
      <div>
        <Typography
          variant='h4'
          className={`gradient-text ${theme === 'dark' ? 'dark-mode' : ''}`}
          style={{ textTransform: 'none' }}
          align='center'
        >
          <span style={{ fontWeight: '600' }}>Help Us</span> Find
        </Typography>

        {spinner ? (
          <div className='text-center my-5 pt-5'>
            <img src={loading} alt='loading' width='40px' />
          </div>
        ) : fetched ? (
          <div className='cards-container'>
            {lostItems.map((item) => (
              <Card
                key={item.id}
                className='card'
                style={{
                  backgroundColor: `${
                    theme === 'dark' ? 'rgb(74 72 72)' : 'whitesmoke'
                  }`,
                  color: `${theme === 'dark' ? '#f5f5f5' : '#333'}`,
                }}
              >
                <CardMedia
                  component='img'
                  height='150'
                  image={
                    item.itemImage
                      ? `${host}/lostItemImages/${item.itemImage}`
                      : no_image
                  }
                  alt={item.name}
                />

                <CardContent>
                  <Typography variant='h6'>{item.category}</Typography>
                  <Typography variant='h6'>{item.subcategory}</Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    style={{
                      color: `${theme === 'dark' ? '#f5f5f5' : '#333'}`,
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    style={{
                      color: `${theme === 'dark' ? '#f5f5f5' : '#333'}`,
                    }}
                  >
                    {item.date}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    style={{
                      color: `${theme === 'dark' ? '#f5f5f5' : '#333'}`,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant='h6'>{item.phone}</Typography>
                  <Link to={{ pathname: '/markLost', state: { item, theme } }}>
                    <Button
                      size='small'
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        marginTop: '10px',
                        borderRadius: '20px',
                      }}
                      variant='contained'
                      color='secondary'
                      onClick={() => setShowForm((prev) => !prev)}
                      //component={Link} to="/marklost"
                    >
                      {' '}
                      REPORT AS FOUND{' '}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='text-center my-5 pt-5'>
            <h4>No items to display ...</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default HelpUs;
