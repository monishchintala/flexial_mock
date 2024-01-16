import React, { useState } from "react";
import './FlexelTableComponent.css'

const FlexelTableComponent = ({ fields, data, onUpdate }) => {

  const [fData, setFdata] = useState(JSON.parse(JSON.stringify(data)));
  const handleInputChange = (e, rowIndex, colIndex) => {
    const { value } = e.target;
    fData[rowIndex][colIndex] = parseFloat(value);
    setFdata([...fData]);
  };

  const [editableCell, setEditableCell] = useState(null);

  const handleDoubleClick = (rowIndex, colIndex, cellValue) => {
    if(editableCell?.flag) onUpdate(fData);
    setEditableCell({ rowIndex, colIndex, value: cellValue,flag: true });
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      onUpdate(fData);
      setEditableCell(null);
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  const cancelEditing = () => {
    setEditableCell(null);
  };

  return (
    <>
      <table className="flexelTableContainer">
        <thead className="table-column-headings">
          <tr>
            {fields &&
              fields.map((field, index) => (
                <th className="th" key={index}>{field.DESCRIPTION}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {fData &&
            fData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    className="td"
                    key={colIndex}
                    onDoubleClick={() => handleDoubleClick(rowIndex, colIndex, cell)}
                  >
                    {editableCell &&
                      editableCell.rowIndex === rowIndex &&
                      editableCell.colIndex === colIndex ? (
                      <input
                        type="text"
                        name={`editable-${rowIndex}-${colIndex}`}
                        value={cell}
                        onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                        on
                        onKeyDown={handleInputKeyDown}
                        // onBlur={cancelEditing}
                        autoFocus
                      />
                    ) : (
                      cell
                    )}
                    {/* <input
                      value={cell}
                      onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                    /> */}
                    {/* {cell} */}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default FlexelTableComponent;
