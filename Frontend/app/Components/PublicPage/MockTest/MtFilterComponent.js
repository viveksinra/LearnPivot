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
        { label: "Initial Test", id: "initialTest" },
        { label: "After Course", id: "afterCourseTest" },
      ]
    },
      {
      title:"Duration",
      tags:[
        { label: "30 Minutes", id: "30minutes" },
        { label: "1 Hours", id: "1hours" },
        { label: "2 Hours", id: "2hours" },
        { label: "3 Hours", id: "3hours" },
      ]
    },
  ]
  );
  return (
    <>  
      {filterData && 
        filterData.map((e, j) => (
          <div key={j}>
        <h3 key={j} style={{ color:"#082952", fontFamily: "Adequate,Helvetica Neue,Helvetica,\"sans-serif\"" }}><strong>{e.title}</strong></h3>
<FormGroup>
  {e?.tags?.map((i, k) => (
    <FormControlLabel
      key={k}
      control={<Checkbox name={i.id} style={{ color: '#333' }} />}
      label={<span style={{ color:"#082952" }}>{i.label}</span>}
    />
  ))}
</FormGroup>
          </div>
        ))}
    </>
  );
  
  
};

export default FilterComponent;
