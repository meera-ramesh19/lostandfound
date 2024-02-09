import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MarkLost from './MarkLost'; // Import the MarkLost component
import { Button } from '@mui/material';

const ReportAsFoundButton = ({ item }) => {
  const [openForm, setOpenForm] = useState(false);

  const handleButtonClick = () => {
    setOpenForm(true);
  };

  return (
    <div>
      <Link to="#" onClick={handleButtonClick}>
        <Button
          size='small'
          style={{
            fontFamily: "'Poppins', sans-serif",
            marginTop: '10px',
            borderRadius: '20px',
          }}
          variant='contained'
          color='secondary'
        >
          REPORT AS FOUND
        </Button>
      </Link>

      {openForm && (
        <MarkLost
          formData={{ field1: item.category, field2: item.subcategory }}
        />
      )}
    </div>
  );
};

export default ReportAsFoundButton;
