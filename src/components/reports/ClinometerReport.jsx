import React from 'react';
import './AutocollimatorAnalogeReport.css';

const ClinometerReport = ({ data }) => {
  return (
    <div>
      {/* First Sheet */}
      <div className="report-container">
        <div style={{ width: "100%" }}>
          {/* Header with ULR and Certificate Table */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ fontSize: "14px", whiteSpace: "nowrap", marginRight: "10px", fontWeight: "normal" }}>
              ULR No. {data?.first_sheet?.ulr_no}
            </div>
            <div
              style={{
                display: "inline-block",
                border: "1px solid black",
                textAlign: "left",
                width: "70%",
                fontSize: "14px",
                marginLeft: "20px"
              }}
            >
              <div style={{ display: "flex", borderBottom: "1px solid black", fontWeight: "bold" }}>
                <div style={{ padding: "5px", whiteSpace: "nowrap" }}>
                  CERTIFICATE NUMBER:
                </div>
                <div style={{ padding: "5px" }}>{data?.test_number}</div>
              </div>
  
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold" }}>
                <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 }}>DATE: {data?.first_sheet?.report_issued_date}</div>
                <div style={{ padding: '5px 10px', flex: 1 }}>Sheet: 1 of 2</div>
              </div>
            </div>
          </div>
  
          {/* Customer Information Table */}
          <div
            style={{
              border: "1px solid black",
              padding: "5px",
              width: "99%",
              backgroundColor: "#ffffff",
              fontSize: "14px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", border: "none" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "5px", width: "35%", textAlign: "left", border: "none", verticalAlign: "top", fontWeight: "normal" }}>
                    Name & Address of the Customer
                  </td>
                  <td style={{ width: "5%", textAlign: "center", border: "none", verticalAlign: "top" }}>
                    :
                  </td>
                  <td style={{ padding: "5px", width: "60%", textAlign: "left", border: "none" }}>
                    {data?.first_sheet?.customer_name_and_address}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", fontWeight: "normal", textAlign: "left", border: "none", verticalAlign: "top" }}>
                    Description of the Item
                  </td>
                  <td style={{ textAlign: "center", border: "none", verticalAlign: "top" }}>
                    :
                  </td>
                  <td style={{ padding: "5px", textAlign: "left", border: "none" }}>
                    {data?.first_sheet?.item_description}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "normal", padding: "5px", textAlign: "left", border: "none", verticalAlign: "top" }}>
                    Identification & SI. No.
                  </td>
                  <td style={{ textAlign: "center", border: "none", verticalAlign: "top" }}>
                    :
                  </td>
                  <td style={{ padding: "5px", textAlign: "left", border: "none" }}>
                    Id. No.: {data?.first_sheet?.identification_no} & SI No.: {data?.first_sheet?.Sl_no}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          {/* Additional Details */}
          <table style={{ width: "100%", borderCollapse: "collapse", border: "none" }}>
            <tbody>
              <tr>
                <td style={{ padding: "5px", width: "40%", textAlign: "left", border: "none", fontWeight: "normal", verticalAlign: "top" }}>
                  1. Customer's Reference
                </td>
                <td style={{ width: "5%", textAlign: "center", border: "none", verticalAlign: "top" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  D.C. No.: {data?.first_sheet?.DC_no}, Dated: {data?.first_sheet?.DC_no_dated} & P.O. No.: {data?.first_sheet?.PO_no}, Dated: {data?.first_sheet?.PO_no_dated}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  2. Date & Place of Calibration
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  {data?.first_sheet?.date_of_calibration}, {data?.first_sheet?.place_of_calibration}
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  3. Equipment Used For Calibration & Traceability:
                </td>
              </tr>
              {data?.first_sheet_equipments?.map((equipment, index) => (
                <tr key={index}>
                  <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", marginLeft: "20px", textIndent: "-20px" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{equipment.equipment_details}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  4. Reference Document
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  Based on {data?.first_sheet?.reference_document_based_on_IS}, {data?.first_sheet?.reference_document_based_on_IS_and_WP_no}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", whiteSpace: "nowrap" }}>
                  5. Temperature during Calibration
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  {data?.first_sheet?.temperature_during_calibration}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  6. Uncertainty of Measurement
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  {data?.first_sheet?.uncertainity_of_measurement}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  7. Results of Calibration
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  Refer sheet 2.
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", paddingLeft: "5px" }}>
                  8. The reported results are valid only for the condition of the received <strong>Thread Plug Gauge </strong>  
                  at the time of and under the stated conditions of the Calibration.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Second Sheet */}
      <div className="report-container">
        <div style={{ width: "100%" }}>
          <h3>Mechanical Calibration</h3>

          {/* Bubble Accuracy Section */}
          <div>
            <h4>I. Calibration of Bubble accuracy (Sensitivity): 
              <span style={{ fontWeight: 'normal', fontSize: "15px", paddingLeft: '80px' }}>
                (all values are in <span style={{ color: 'red' }}>mm/m</span>)
              </span>
            </h4>
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
                {data?.bubble_calibration?.map((item, index) => (
                  <tr key={index}>
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
            <h4>II. Calibration of Drum Scale accuracy:</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '4px' }}>Sl. No.</th>
                  <th style={{ border: '1px solid black', padding: '4px' }}>Scale Reading</th>
                  <th style={{ border: '1px solid black', padding: '4px' }}>Calibrated Values</th>
                </tr>
              </thead>
              <tbody>
                {data?.drum_calibration?.map((item, index) => (
                  <tr key={index}>
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
            <h4>III. Calibration of Main Scale accuracy:</h4>
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
                {data?.main_calibration?.map((item, index) => (
                  <tr key={index}>
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
            <p><strong>Method of Calibration:</strong> a)Bubble accuracy (Sensitivity) of Clinometer is calibrated by placing the Clinometer on One meter bridge and by using Electronic Level (Talyvel 6).
            b)Drum Scale accuracy & Main Scale accuracy of the Clinometer is calibrated by using Precision Rotary table.</p>
            <p><strong>Note:</strong> Only parameter requested by the customer has been calibrated.</p>
            <p style={{ textAlign: 'center' }}>***</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinometerReport;