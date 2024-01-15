import React, { useState,useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FlexelTableComponent from '../FlexelTab/FlexelTableComponent';

const MyTabs = (props) => {
  const {fields,data}=props;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    window.Synopsis.render();
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="FlexelTab" />
        <Tab label="SynopsisTab" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FlexelTableComponent 
         fields={fields}
         data={data}
         />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Render your Synopsis component when SynopsisTab is selected */}
      </TabPanel>
    </Box>
  );
};

// Custom TabPanel component to conditionally render content based on the selected tab
const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default MyTabs;
