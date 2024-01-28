import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

const FilterComponent = () => {
  return (
    <FormGroup>
        
      <p>Processor Speed</p>
      <FormControlLabel
        control={<Checkbox name="processorSpeed1" />}
        label="1 - 1.49 GHz"
      />
      <FormControlLabel
        control={<Checkbox name="processorSpeed2" />}
        label="1.5 - 1.99 GHz"
      />
      <FormControlLabel
        control={<Checkbox name="processorSpeed3" />}
        label="2 - 2.4 GHz"
      />

      <p>Battery Capacity</p>
      <FormControlLabel
        control={<Checkbox name="batteryCapacity1" />}
        label="Up to 2,999 mAh"
      />
       <FormControlLabel
         control={<Checkbox name="batteryCapacity2" />}
         label="3,000 to 3,999 mAh"
       />
       <FormControlLabel
         control={<Checkbox name="batteryCapacity3" />}
         label="4,000 to 4,999 mAh"
       />
       <FormControlLabel
         control={<Checkbox name="batteryCapacity4" />}
         label="5,000 to 5,999 mAh"
       />
       <FormControlLabel
         control={<Checkbox name="batteryCapacity5" />}
         label= "6,000 mAh & Above"
       /> 
    </FormGroup>
  );
};

export default FilterComponent;
