import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
// import './helpUs.css';
import no_image from '../help-us-find-page/no-image.png';
const host = 'http://localhost:3010';
const DisplayForm = (props) => {
  const { item, setShowForm, theme } = props;

  return (
    <>
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
              ? `${host}/lost/lostItemImages/${item.itemImage}`
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
        </CardContent>
      </Card>
    </>
  );
};
export default DisplayForm;
