import React from 'react';

const ClinometerReport = ({ data }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ border: '1px solid black', padding: '5px 10px' }}>
          <span>ULR No. CC215322000000112F</span>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ border: '2px solid black', marginLeft: '20px', minWidth: '400px' }}>
            <div style={{ borderBottom: '1px solid black', padding: '5px 10px', textAlign: 'center' }}>
              CERTIFICATE NUMBER: 21/53/01/041-5/3/311
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 }}>DATE: 24-02-2022</div>
              <div style={{ padding: '5px 10px', flex: 1 }}>Sheet: 1 of 4</div>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '20px' }}>Mechanical Calibration.</h2>

      {/* Bubble Accuracy Section */}
      <div>
        <h3>I. Calibration of Bubble accuracy (Sensitivity): 
          <span style={{ marginLeft: '20px', fontWeight: 'normal' }}>
            (all values are in <span style={{ color: 'red' }}>mm/m</span>)
          </span>
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th rowSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Sl. No.</th>
              <th colSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Left Side</th>
              <th colSpan="2" style={{ border: '1px solid black', padding: '4px' }}>Right Side</th>
            </tr>
            <tr>
              <th style={{ border: '1px solid black', padding: '4px' }}>Scale Reading</th>
              <th style={{ border: '1px solid black', padding: '4px' }}>Calibrated values</th>
              <th style={{ border: '1px solid black', padding: '4px' }}>Scale Reading</th>
              <th style={{ border: '1px solid black', padding: '4px' }}>Calibrated values</th>
            </tr>
          </thead>
          <tbody>
            {data?.bubble_calibrations?.map((item, index) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', color: 'red' }}>
                  {item.leftside_scale_reading}
                </td>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', color: 'red' }}>
                  {item.leftside_calibrated_values}
                </td>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', color: 'red' }}>
                  {item.rightside_scale_reading}
                </td>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', color: 'red' }}>
                  {item.rightside_calibrated_values}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drum Scale Section */}
      <div>
        <h3>II. Calibration of Drum Scale accuracy:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '4px' }}>Sl. No.</th>
              <th style={{ border: '1px solid black', padding: '4px' }}>Scale Reading</th>
              <th style={{ border: '1px solid black', padding: '4px' }}>Calibrated Values</th>
            </tr>
          </thead>
          <tbody>
            {data?.drum_scale_calibrations?.map((item, index) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', color: 'red' }}>
                  {item.scale_reading}
                </td>
                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', color: 'red' }}>
                  {item.calibrated_values}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main Scale Section */}
      <div>
        <h3>III. Calibration of Main Scale accuracy:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th rowSpan="2" style={{ 
                border: '1px solid black', 
                padding: '4px', 
                width: '80px',
                verticalAlign: 'middle'
              }}>Sl. No.</th>
              <th rowSpan="2" style={{ 
                border: '1px solid black', 
                padding: '4px', 
                width: '150px',
                verticalAlign: 'middle'
              }}>Scale Reading</th>
              <th colSpan="2" style={{ 
                border: '1px solid black', 
                padding: '4px' 
              }}>Calibrated Values</th>
            </tr>
            <tr>
              <th style={{ 
                border: '1px solid black', 
                padding: '4px', 
                width: '200px' 
              }}>Clockwise Direction</th>
              <th style={{ 
                border: '1px solid black', 
                padding: '4px', 
                width: '200px' 
              }}>Counter Clockwise Direction</th>
            </tr>
          </thead>
          <tbody>
            {data?.main_scale_calibrations?.map((item, index) => (
              <tr key={item.id}>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '4px', 
                  textAlign: 'center',
                  verticalAlign: 'middle'
                }}>
                  {index + 1}
                </td>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '4px', 
                  textAlign: 'center', 
                  color: 'red',
                  verticalAlign: 'middle'
                }}>
                  {item.scale_reading}
                </td>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '4px', 
                  textAlign: 'center', 
                  color: 'red',
                  verticalAlign: 'middle'
                }}>
                  {item.clockwise_direction_calibrated_values}
                </td>
                <td style={{ 
                  border: '1px solid black', 
                  padding: '4px', 
                  textAlign: 'center', 
                  color: 'red',
                  verticalAlign: 'middle'
                }}>
                  {item.counter_clockwise_direction_calibrated_values}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Method of Calibration Section */}
      <div style={{ marginTop: '20px' }}>
        <p><strong>Method of Calibration:</strong> {data?.details?.method_of_calibration}</p>
        <p><strong>Note:</strong> {data?.details?.note}</p>
        <p style={{ textAlign: 'center' }}>***</p>
      </div>
    </div>
  );
};

export default ClinometerReport; 