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
              ULR No. CC215325000000044F
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
                <div style={{ padding: "5px" }}>24/53/01/041-S/3/286-A</div>
              </div>
  
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold" }}>
                <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 }}>DATE: 27-10-2025</div>
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
                    M/s. SANSERA ENGINEERING LTD, PLANT-2,  
                    # 261/C, Bommasandra Indl. Area,  
                    Bangalore – 560 099.
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
                    Thread Plug Gauge (01 Set),  
                    Size: M8X1.0-6H (GO & NOGO gauge),  
                    Make: MERC.
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
                    Id. No.: 18A1899 & SI No.: 10081458.
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
                  D.C. No.: 1101167423,Dated: 19-11-2024 & P.O. No.: 1240043568,Dated: 27-11-2024.
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
                  24-01-2025, PML.
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  3. Equipment Used For Calibration & Traceability:
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", marginLeft: "20px", textIndent: "-20px" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;<strong>a) Universal Length Measuring Machine:</strong> (Make: Octagon, Sl.No:003, Idfn. No.: ULM-C-01 Model No: LMM Gold plus)  
                  Calibrated by CSIR NPL-India vide certificate No.: <u>23111208/D1.02/C-020/amend</u>, dated: 19-06-2024, Valid up to 18-06-2026.
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", marginLeft: "20px", textIndent: "-20px" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;<strong>b) Thread Measuring Wires:</strong> (Make: Microrep-Italy, Idfn. No.: TMC-C-02)  
                  Calibrated in-house Vide Certificate No.: <u>ML/TMC-02/24.11/016</u>, Dated: 22-11-2024 valid up to 21-11-2025,  
                  using master traceable to CSIR NPL-India vide Certificate No.: <u>23111208/D1.02/C-020/amend</u>, dated: 19-06-2024.
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  4. Reference Document
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  Based on IS: 2334-2001, IS: 4218 & W. P. No.: <u>QM/ML/WP/001-8.070</u>.
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
                  19.9° to 20.1° C.
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  6. Uncertainty of Measurement  
                  (At 95% Confidence Level with Coverage Factor k=2)
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  ±0.001 mm
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
        
          {/* Header Section */}
          <div style={{ width: "100%", paddingTop: "20px" }}>
            {/* Header with ULR and Certificate Table */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ fontSize: "14px", whiteSpace: "nowrap", marginRight: "10px", fontWeight: "normal" }}>
                ULR No. CC215325000000044F
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
                  <div style={{ padding: "5px" }}>21/53/01/041-5/3/311</div>
                </div>
    
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold" }}>
                  <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 }}>DATE: 24-02-2022</div>
                  <div style={{ padding: '5px 10px', flex: 1 }}>Sheet: 1 of 4</div>
                </div>
              </div>
            </div>

            <h3 style={{ marginTop: '20px' }}>Mechanical Calibration</h3>

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
                  {data?.bubble_calibrations?.map((item, index) => (
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
                  {data?.drum_scale_calibrations?.map((item, index) => (
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
                  {data?.main_scale_calibrations?.map((item, index) => (
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
              <p><strong>Method of Calibration:</strong> {data?.details?.method_of_calibration}</p>
              <p><strong>Note:</strong> {data?.details?.note}</p>
              <p style={{ textAlign: 'center' }}>***</p>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default ClinometerReport;