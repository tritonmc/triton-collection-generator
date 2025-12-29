import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Select = ({ title, options, value, onChange }) => {
  return (
    <TextField
      select
      label={title}
      value={value}
      onChange={onChange}
      fullWidth
      margin='normal'
      variant='outlined'
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

Select.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
