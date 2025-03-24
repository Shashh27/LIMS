import React from 'react';
import './AutocollimatorAnalogeReport.css'; // We can reuse the same CSS

const AutocollimatorDigitalReport = ({ data }) => {
  return (
    <div className="report-container">
      <div className="header-section">
        <div className="ulr-section">
          <span>ULR No. CC2153220000055F</span>
        </div>
        <div className="certificate-section">
          <div className="certificate-box">
            <div className="certificate-number">
              CERTIFICATE NUMBER: ML/ACM-02/22.01/013
            </div>
            <div className="certificate-details">
              <div className="date">DATE: 27-01-2022</div>
              <div className="sheet">Sheet: 1 of 4</div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-title">
        <p className="instrument-type">(Autocollimator digital)</p>
      </div>

      <h2>Mechanical Calibration</h2>
      <div className="calibration-section">
        <h3>I. Calibration of X-Axis: 
          <span style={{marginLeft:'380px' , fontWeight:'normal'}}>
            (All Values are in <span className="note">arc sec</span>)
          </span>
        </h3>
        <table className="calibration-table">
          <thead>
            <tr>
              <th rowSpan="2">Sl. No.</th>
              <th rowSpan="2">Nominal Angle</th>
              <th colSpan="2">Calibrated Values</th>
            </tr>
            <tr>
              <th>+ Ve Direction</th>
              <th>- Ve Direction</th>
            </tr>
          </thead>
          <tbody>
            {data?.x_axis_calibrations?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="value-cell">{item.nominal_angle}</td>
                <td className="value-cell">{item.positive_direction_calibrated_values}</td>
                <td className="value-cell">{item.negative_direction_calibrated_values}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="calibration-section">
        <h3>II. Calibration of Y-Axis: 
          <span style={{marginLeft:'380px' , fontWeight:'normal'}} >
            (All Values are in <span className="note">arc sec</span>)
          </span>
        </h3>
        <table className="calibration-table">
          <thead>
            <tr>
              <th rowSpan="2">Sl. No.</th>
              <th rowSpan="2">Nominal Angle</th>
              <th colSpan="2">Calibrated Values</th>
            </tr>
            <tr>
              <th>+ Ve Direction</th>
              <th>- Ve Direction</th>
            </tr>
          </thead>
          <tbody>
            {data?.y_axis_calibrations?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="value-cell">{item.nominal_angle}</td>
                <td className="value-cell">{item.positive_direction_calibrated_values}</td>
                <td className="value-cell">{item.negative_direction_calibrated_values}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="method-section">
        <p><strong>Method of Calibration:</strong> {data?.details?.method_of_calibration}</p>
        <p className="centered">***</p>
      </div>
    </div>
  );
};

export default AutocollimatorDigitalReport; 