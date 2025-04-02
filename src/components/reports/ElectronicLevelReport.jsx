import React from 'react';
import { Card } from 'antd';
import right from '../../assets/right.png'
import left from '../../assets/left_angle.png'


const ElectronicLevelReport = ({ data }) => {

  const styles = {
    calibrationReport: {
      padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', maxWidth: '800px', width: "210mm",
      height: "297mm", backgroundColor: "#ffffff", 
      border: "1px solid #ccc", 
      boxSizing: "border-box",padding:"50px",pageBreakAfter:"always",display:"block",marginTop:"50px"
    },
    ulrNumber: {
      textAlign: 'left',
      fontSize: '14px',
      marginBottom: '10px'
    },
    reportHeader: {
      display: 'table',
      fontSize: '15px',
      marginLeft: '475px',
      border: '2px solid #ccc',
      padding: '5px',
      width: '300px'
    },
    reportRow: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    calibrationTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
      marginBottom: '20px'
    },
    tableCell: {
      border: '1px solid black',
      padding: '8px',
      textAlign: 'center'
    },
    tableHeader: {
      border: '1px solid black',
      padding: '8px',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    redText: {
      color: 'red'
    }
  };

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
    
      <div style={styles.calibrationReport}>
        <div style={styles.ulrNumber}>
          ULR No. CC215322000000530F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>CERTIFICATE NUMBER: 22/53/01/041-S/3/137</strong>
          </div>
          <div style={styles.reportRow}>
            <span>DATE: 07-09-2022</span>
            <span>Sheet: 1 of 6</span>
          </div>
        </div>

        <h3>Mechanical Calibration.</h3>
        <h4>
          I. Calibration of Electronic Level (will be entered):
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm/m)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader} rowSpan="2">Sl. No.</th>
              <th style={styles.tableHeader} rowSpan="2">Electronic Level Readings</th>
              <th style={styles.tableHeader} colSpan="2">Calibrated Values</th>
            </tr>
            <tr>
              <th style={styles.tableHeader}> <img src={right}/> +ve Direction</th>
              <th style={styles.tableHeader}><img src={left} />-ve Direction</th>
            </tr>
          </thead>
          <tbody>
            {data?.mechanical_calibrations?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.electronic_level_readings}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.positive_calibrated_values}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.negative_calibrated_values}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>
          II. Calibration of Geometrical Parameters:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Parameters</th>
              <th style={styles.tableHeader}>Calibrated Values</th>
            </tr>
          </thead>
          <tbody>
            {data?.geometrical_parameters?.map((item, index) => (
              <>
                <tr>
                  <td style={styles.tableCell}>1.</td>
                  <td style={styles.tableCell}>Flatness of Bottom face</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.flatness_of_bottom_face}
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>2.</td>
                  <td style={styles.tableCell}>Parallelity of "V" to flat of bottom face</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.parellelity_of_V_to_flat_of_bottom_face}
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>3.</td>
                  <td style={styles.tableCell}>Perpendicularity between flat of side face w.r.t. flat of bottom face</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face} {" (> 90°)"}
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>4.</td>
                  <td style={styles.tableCell}>Perpendicularity between "V" of side face w.r.t. flat of bottom face</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face} {" (> 90°)"}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            a) Electronic Level (Clinobevel 3) is calibrated by initially making absolute zero at reference plane on One meter bridge.<br/>
            b) Electronic Level (Clinobevel 3) up to 15 arc min range is calibrated by placing the Electronic Level on 1 meter bridge and by using Autocollimator.<br/>
            c) Above 15 arc min range is calibrated by mounting Electronic level(Clinobevel 3) on Precision rotary table.<br/>
            d) Flatness of bottom face is carried out by using Electronic Probe-Lever Type.<br/>
            e) Parallelity measurement is carried out by placing the Electronic level(Clinobevel 3) on a cylindrical mandrel & by using the Electronic Probe-Lever Type.<br/>
            f) Perpendicularity Measurement is carried out by placing the Electronic Level on the Master Granite Surface plate & by using Height Gauge - Digital.
          </p>
        </div>

        <div>
          <h4>Note:</h4>
          <p style={styles.redText}>
            1) Calibration has been done w.r.t. absolute zero.<br/>
            2) Only parameter requested by the customer has been calibrated.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ---***---
        </div>
      </div>
      
   
    </div>
  );
};

export default ElectronicLevelReport;