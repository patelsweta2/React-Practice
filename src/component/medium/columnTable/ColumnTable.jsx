import React, { useState } from "react";

const ColumnTable = () => {
  const [noOfColumns, setNoOfColumns] = useState(4);
  const [noOfRows, setNoOfRows] = useState(2);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <label>
          Columns: {noOfColumns}
          <input
            type="range"
            min="2"
            max="8"
            value={noOfColumns}
            onChange={(e) => setNoOfColumns(Number(e.target.value))}
          />
        </label>
        <label>
          Rows: {noOfRows}
          <input
            type="range"
            min="2"
            max="8"
            value={noOfRows}
            onChange={(e) => setNoOfRows(Number(e.target.value))}
          />
        </label>
      </div>

      <table
        style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}
      >
        <tbody>
          {Array.from({ length: noOfRows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: noOfColumns }).map((_, colIndex) => {
                const cellNumber = rowIndex * noOfColumns + colIndex + 1;
                return (
                  <td
                    key={colIndex}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      minWidth: "40px",
                    }}
                  >
                    {cellNumber}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColumnTable;
