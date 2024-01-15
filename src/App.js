import { useEffect, useState } from 'react';
import $ from "jquery";
import MyTabs from "./Tabs/MyTabs/MyTabs";
import "./Synopsis/js/synopsis";
import "./Synopsis/css/synopsis.css"

let isDataFetched = false;
function App() {

  const [state, setState] = useState(null);

  useEffect(() => {
    if (isDataFetched) return

    $.ajax({
      url: "https://sergio040admin.softdev.vistexcloud.com/sap/opu/odata/sap/ZSYNDATA_SRV/SYNDATASET?$format=json",
    }).done((response) => {

      let hierarchy = JSON.parse(response.d.results[0].Heirarchy);
      let _data = JSON.parse(response.d.results[0].Data);
      let data=JSON.parse(response.d.results[0].Data);
      let fields= JSON.parse(response.d.results[0].Fields);
      let _fields = JSON.parse(response.d.results[0].Fields);
      let units = JSON.parse(response.d.results[0].Unit);
      // let _dictionaries = dictionaries;
      let fIndex = _fields.findIndex(field => field.ID === "YEAR")
      let _flexialData = _data.filter(field => field[fIndex] === 2004)
      _data = _data.filter(field => field[fIndex] !== 2004)

      let obj = {
        fields: _fields,
        data: _data,
        flexialData: _flexialData,
      }
      setState(obj);
      window.Synopsis.init({
        appid: "root",
        type: "widget", // widget designer
        hierarchy: hierarchy,
        data: data,
        // dictionaries: _dictionaries,
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
     // window.Synopsis.render();
      console.log(obj);
    })
    isDataFetched = false;
  //  window.Synopsis.render();

  }, [])

  return (
    <div className="App">
     <MyTabs
      fields={state?.fields} 
      data={state?.flexialData}      
     />
      
    </div>
  );
}

export default App;
