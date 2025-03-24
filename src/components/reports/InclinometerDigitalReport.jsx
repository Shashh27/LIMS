import React from 'react';

const InclinometerDigitalReport = ({ data }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ border: '1px solid black', padding: '5px 10px' }}>
          <span>ULR No. CC215321000000556F</span>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ border: '2px solid black', marginLeft: '20px', minWidth: '400px' }}>
            <div style={{ borderBottom: '1px solid black', padding: '5px 10px', textAlign: 'center' }}>
              CERTIFICATE NUMBER: 21/53/01/041-5/3/218-J
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 }}>DATE: 01-12-2021</div>
              <div style={{ padding: '5px 10px', flex: 1 }}>Sheet: 1 of 3</div>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '20px' }}>I. Mechanical Calibration.</h2>

      {/* X-Axis Calibration Section */}
      <div>
        <h3>I. Calibration of X-Axis Scale: 
          <span style={{ marginLeft: '20px', fontWeight: 'normal' }}>
            (All values are in <span style={{ color: 'red' }}>degrees</span>)
          </span>
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th rowSpan="2" style={{ border: '1px solid black' }}>Sl. No.</th>
              <th rowSpan="2" style={{ border: '1px solid black' }}>Inclinometer Readings</th>
              <th colSpan="2" style={{ border: '1px solid black' }}>Calibrated Values</th>
            </tr>
            <tr>
              <th style={{ border: '1px solid black' }}>+ Ve direction</th>
              <th style={{ border: '1px solid black' }}>-Ve Direction</th>
            </tr>
          </thead>
          <tbody>
            {data?.x_axis_calibrations?.map((item, index) => (
              <tr key={item.sl_no}>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.inclinometer_reading}
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.positive_direction}
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.negative_direction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Y-Axis Calibration Section */}
      <div>
        <h3>II. Calibration of Y-Axis Scale:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th rowSpan="2" style={{ border: '1px solid black' }}>Sl. No.</th>
              <th rowSpan="2" style={{ border: '1px solid black' }}>Inclinometer Readings<br/>are in degrees</th>
              <th colSpan="2" style={{ border: '1px solid black' }}>Calibrated Values</th>
            </tr>
            <tr>
              <th style={{ border: '1px solid black' }}>+ Ve direction</th>
              <th style={{ border: '1px solid black' }}>-Ve Direction</th>
            </tr>
          </thead>
          <tbody>
            {data?.y_axis_calibrations?.map((item, index) => (
              <tr key={item.sl_no}>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.inclinometer_reading}
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.positive_direction}
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.negative_direction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Method of Calibration Section */}
      <div style={{ marginTop: '20px' }}>
        <p><strong>Method of Calibration:</strong></p>
        <p style={{ color: 'red' }}>
          Inclinometer (Dual axis Inclinometer) is calibrated by using Precision Rotary table.
        </p>
        <p><strong>Note:</strong> <span style={{ color: 'red' }}>Only Parameter requested by the customer has been calibrated.</span></p>
        <p style={{ textAlign: 'center' }}>---***---</p>
      </div>
    </div>
  );
};

export default InclinometerDigitalReport; 