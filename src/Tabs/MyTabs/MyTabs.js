import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FlexelTableComponent from '../FlexelTab/FlexelTableComponent';

const MyTabs = ({ fields, data, flexialData, hierarchy, units, dictionaries }) => {
  const [value, setValue] = useState(0);
  const [fData, setFdata] = useState(flexialData);

  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      window.Synopsis.init({
        appid: "synopsisTab",
        type: "widget", // widget designer
        hierarchy: hierarchy,
        data: data,
        flexialData: fData,
        dictionaries: dictionaries,
        fields: fields,
        units: units,
        styleFormats: {},
        formats: {
          dateFormat: "MM/DD/YYYY",
          decimalNotation: "X",
          currencyFormat: "X",
          negNumFormat: "",
        },
        options: {
          showDownloadButton: true,
          showUserViews: true,
          showFilters: true,
          showUserSettings: true,
          showFullScreenButton: false,
        },
      });
      window.Synopsis.render();
    }
    setValue(newValue);
  };

  const onUpdate = (value) => {
    setFdata(value);
  }

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="FlexelTab" />
        <Tab label="SynopsisTab" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FlexelTableComponent
          fields={fields}
          data={fData}
          onUpdate={onUpdate}
        />
      </TabPanel>
      <TabPanel value={value} index={1} id='synopsisTab' style={{ height: "calc(100vh - 48px)" }}>
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
      {value === index &&
        <Box
          style={{
            overflow: "scroll",
            height: "calc(100vh - 64px)",
            width: "calc(100vw - 16px)",
          }}
          p={1}
        >{children}</Box>}
    </div>
  );
};

export default MyTabs;
