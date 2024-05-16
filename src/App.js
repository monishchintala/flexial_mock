import { useEffect, useState } from 'react';
import $ from "jquery";
import MyTabs from "./Tabs/MyTabs/MyTabs";
// import "./Synopsis/js/synopsis";
// import "./Synopsis/css/synopsis.css"
import _dictionaries from "./mock/dictionaries.json"

let isDataFetched = false;
function App() {

  const [state, setState] = useState(null);

  useEffect(() => {
    if (isDataFetched) return

    $.ajax({
      url: "https://sergio040admin.softdev.vistexcloud.com/sap/opu/odata/sap/ZSYNDATA_SRV/SYNDATASET?$format=json",
    }).done((response) => {
      let _hierarchy = JSON.parse(response.d.results[0].Heirarchy);
      let _data = JSON.parse(response.d.results[0].Data);
      let _fields = JSON.parse(response.d.results[0].Fields);
      let _units = JSON.parse(response.d.results[0].Unit);
      let fIndex = _fields.findIndex(field => field.ID === "YEAR")
      let _flexialData = _data.filter(field => field[fIndex] === 2004)
      _data = _data.filter(field => field[fIndex] !== 2004)

      let obj = {
        fields: _fields,
        data: _data,
        flexialData: _flexialData,
        hierarchy: _hierarchy,
        units: _units,
        dictionaries: _dictionaries
      }
      setState(obj);
    })
    isDataFetched = true;
  }, [])

  return (
    <div className="App">
      {isDataFetched && <MyTabs
        // fields={state?.fields}
        // data={state?.flexialData}
        {...state}
      />}
    </div>
  );
}

export default App;
