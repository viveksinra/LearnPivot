import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React,{useState} from 'react';

const FilterComponent = () => {
  const [filterData,setFilterData] = useState(
    [
      {
      title:"Class",
      tags:[
        {label:"Class 4",id:"class4"},
        {label:"Class 5",id:"class5"},
        {label:"Class 6",id:"class6"},
      ]
    },
      {
      title:"Type",
      tags:[
        {label:"Crash Course",id:"crashCourse"},
        {label:"Full Course",id:"fullCourse"},
      ]
    },
      {
      title:"Duration",
      tags:[
        {label:"3 Months",id:"3months"},
        {label:"1 Years",id:"1years"},
      ]
    },
  ]
  );
  return (
    <>  
      {filterData && 
        filterData.map((e, j) => (
          <>
            <h3 key={j}><strong>{e.title}</strong></h3>
            <FormGroup>
              {e?.tags?.map((i, k) => (
                <FormControlLabel
                  key={k}
                  control={<Checkbox name={i.id} />}
                  label={i.label}
                />
              ))}
            </FormGroup>
          </>
        ))}
    </>
  );
  
  
};

export default FilterComponent;
