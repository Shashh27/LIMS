import React from 'react';

const InclinometerAnalogeReport = ({ data }) => {
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
      
      {/* Inclinometer Section */}
      <div>
        <h3>I. Calibration of Inclinometer: 
          <span style={{ marginLeft: '20px', fontWeight: 'normal' }}>
            (All values are in <span style={{ color: 'red' }}>degrees</span>)
          </span>
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', width: '100px' }}>Sl. No.</th>
              <th style={{ border: '1px solid black' }}>Inclinometer scale Readings</th>
              <th style={{ border: '1px solid black' }}>Calibrated Values</th>
            </tr>
          </thead>
          <tbody>
            {data?.inclinometer_calibrations?.map((item, index) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.inclinometer_scale_readings}
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                  {item.calibrated_values}
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
        <p><strong>Note:</strong> <p style={{ color: 'red' }}>Only Parameter requested by the customer has been calibrated.</p></p>
        <p style={{ textAlign: 'center' }}>---***---</p>
      </div>
    </div>
  );
};

export default InclinometerAnalogeReport; 