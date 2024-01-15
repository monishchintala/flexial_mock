import React, { useState } from "react";
import './index.css'

const FlexelTableComponent = (props) => {
  const { fields, data } = props;
  const [editableCell, setEditableCell] = useState(null);

  const handleDoubleClick = (rowIndex, colIndex, cellValue) => {
    setEditableCell({ rowIndex, colIndex, value: cellValue });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEditableCell((prev) => ({ ...prev, value }));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      saveChanges();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  const saveChanges = () => {
    const { rowIndex, colIndex, value } = editableCell;
    const updatedData = [...data];
    updatedData[rowIndex][colIndex] = value;
    setEditableCell(null);
  //  props.onEdit(updatedData);
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
          {data &&
            data.map((record, rowIndex) => (
              <tr key={rowIndex}>
                {record.map((cell, colIndex) => (
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
                        value={editableCell.value}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        onBlur={cancelEditing}
                        autoFocus
                      />
                    ) : (
                      cell
                    )}
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
