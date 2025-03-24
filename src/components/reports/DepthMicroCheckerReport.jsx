import React from 'react';

const DepthMicroCheckerReport = ({ data }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
       
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ border: '2px solid black', marginLeft: '20px', minWidth: '400px' }}>
            <div style={{ borderBottom: '1px solid black', padding: '5px 10px', textAlign: 'center' }}>
              REPORT NUMBER:14/53/01/352-1/2/194-D
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 }}>Date: 30-12-2014</div>
              <div style={{ padding: '5px 10px', flex: 1 }}>Sheet: 1 of 2</div>
            </div>
          </div>
        </div>
      </div>

      {/* Depth Micro Checker Section */}
      <div>
        <h3>I. Calibration of Depth Micro Checker 
          <span style={{ marginLeft: '20px', fontWeight: 'normal' }}>
            (All values in <span style={{ color: 'red' }}>mm</span>)
          </span>
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th rowSpan="2" style={{ border: '1px solid black', verticalAlign: 'middle' }}>Sl. No.</th>
              <th rowSpan="2" style={{ border: '1px solid black', verticalAlign: 'middle' }}>Nominal Size</th>
              <th colSpan="3" style={{ border: '1px solid black'}}>Calibrated Values</th>
            </tr>
            <tr>
              <th style={{ border: '1px solid black',  }}>"B Side" Step blocks</th>
              <th style={{ border: '1px solid black',  }}>"A Side" Step blocks</th>
              <th style={{ border: '1px solid black',  }}>Parallelity b/w "A Side" & "B Side"</th>
            </tr>
          </thead>
          <tbody>
            {data?.depth_micro_calibrations?.map((item, index) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black',  textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: '1px solid black',  textAlign: 'center', color: 'red' }}>
                  {item.nominal_size}
                </td>
                <td style={{ border: '1px solid black',  textAlign: 'center', color: 'red' }}>
                  {item.B_side_calibrated_values}
                </td>
                <td style={{ border: '1px solid black',  textAlign: 'center', color: 'red' }}>
                  {item.A_side_calibrated_values}
                </td>
                <td style={{ border: '1px solid black',  textAlign: 'center', color: 'red' }}>
                  {item.Parallelity_between_A_side_and_B_side_Calibratedvalues}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Anvil Block Section */}
      <div>
        <h3>II. Calibration of Anvil Block:</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', width: '50%' }}>Anvil Block Size</th>
              <th style={{ border: '1px solid black',  width: '50%' }}>Calibrated Values</th>
            </tr>
          </thead>
          <tbody>
            {data?.anvil_block_calibrations?.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black',  textAlign: 'center', color: 'red' }}>
                  {item.anvil_block_size}
                </td>
                <td style={{ border: '1px solid black',  textAlign: 'center', color: 'red' }}>
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
          Depth Micro Checker & Anvil Block were calibrated by comparison method w.r.t "0" grade Slip Gauges and Electronic Comparator.
        </p>
        <p><strong>Note:</strong></p>
        <p>1) Only Parameter requested by the customer has been calibrated.</p>
        <p>2) Scratches and Stain marks observed on the base of the Depth Micro Checker and working Surfaces of Anvil block.</p>
        <p style={{ textAlign: 'center' }}>---***---</p>
      </div>
    </div>
  );
};

export default DepthMicroCheckerReport; 