import React from 'react';
import { Card } from 'antd';
import frame from '../../assets/frame_level.png'


const FrameLevelReport = ({ data }) => {
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
      border: '2px solid #ccc',
      padding: '5px',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto 20px auto'
    },
    reportRow: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    calibrationTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
      marginBottom: '20px',
      overflowX: 'auto',
      display: 'block'
    },
    tableWrapper: {
      overflowX: 'auto',
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
    },
    frameImage: {
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
      margin: '20px auto'
    },
    '@media (max-width: 768px)': {
      tableCell: {
        padding: '4px',
        fontSize: '12px'
      },
      tableHeader: {
        padding: '4px',
        fontSize: '12px'
      },
      frameImage: {
        width: '90%'
      }
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
          ULR No. CC215320000000203F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>REPORT NUMBER: 19/53/01/041-S/3/388-A</strong>
          </div>
          <div style={styles.reportRow}>
            <span>DATE: 20-03-2020</span>
            <span>SHEET: 1 of 2</span>
          </div>
        </div>

        <h3>Mechanical Calibration.</h3>
        <h4>
          I. Calibration of Bubble accuracy (Sensitivity):
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm/m)</span>
        </h4>

        <div style={styles.tableWrapper}>
          <table style={styles.calibrationTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Sl.No.</th>
                <th style={styles.tableHeader}>Scale Reading</th>
                <th style={styles.tableHeader}>Right side (towards cross bubble)</th>
                <th style={styles.tableHeader}>Left side (towards cross bubble)</th>
              </tr>
            </thead>
            <tbody>
              {data?.bubble_accuracy?.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{index + 1}.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.scale_reading}</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.right_side_calibrated_values}</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.left_side_calibrated_values}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4>
          II. Calibration of Bubble Consistency (Repeatability):
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm/m)</span>
        </h4>

        <div style={styles.tableWrapper}>
          <table style={styles.calibrationTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Parameter</th>
                <th style={styles.tableHeader}>Calibrated values</th>
              </tr>
            </thead>
            <tbody>
              {data?.bubble_consistency?.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>Consistency (Repeatability)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.calibrated_values}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4>
          III. Calibration of geometrical parameter:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm/m)</span>
        </h4>

        <img src={frame} alt="Frame Level Diagram" style={styles.frameImage} />

        <div style={styles.tableWrapper}>
          <table style={styles.calibrationTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Sl. No.</th>
                <th style={styles.tableHeader}>Parameters</th>
                <th style={styles.tableHeader}>Calibrated Values in mm</th>
              </tr>
            </thead>
            <tbody>
              {data?.geometrical_parameters?.map((item, index) => (
                <>
                  <tr>
                    <td style={styles.tableCell}>1</td>
                    <td style={styles.tableCell}>Flatness of Base 'A'</td>
                    <td style={{...styles.tableCell, ...styles.redText}}>{item.flatness_of_base_A}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>2</td>
                    <td style={styles.tableCell}>Parallelity between Flat to "V" of Face "A"</td>
                    <td style={{...styles.tableCell, ...styles.redText}}>{item.parallelity_flat_to_V_face_A}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>3</td>
                    <td style={styles.tableCell}>Parallelity of Face "C" w.r.t. Face "A" (Flat to flat)</td>
                    <td style={{...styles.tableCell, ...styles.redText}}>{item.parallelity_face_C_wrt_face_A}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>4</td>
                    <td style={styles.tableCell}>Parallelity of Face "D" w.r.t. Face "B" (Flat to flat)</td>
                    <td style={{...styles.tableCell, ...styles.redText}}>{item.parallelity_face_D_wrt_face_B}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>5</td>
                    <td style={styles.tableCell}>Perpendicularity of Face "B" w.r.t. Face "A" (Flat to flat)</td>
                    <td style={{...styles.tableCell, ...styles.redText}}>{item.perpendicularity_face_B_wrt_face_A_flat_to_flat}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>6</td>
                    <td style={styles.tableCell}>Perpendicularity of Face "B" w.r.t. Face "A" (Flat of Face "A" to "V" of Face "B")</td>
                    <td style={{...styles.tableCell, ...styles.redText}}>{item.perpendicularity_face_B_wrt_face_A}</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>7</td>
                    <td style={styles.tableCell}>Perpendicularity of Face "D" w.r.t. Face "A" (Flat to flat)</td>
                    <td style={{...styles.tableCell, ...styles.redText}}>{item.perpendicularity_of_face_d}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            Sensitivity calibration is carried out by Placing the Spirit level on one meter bridge 
            and by using Electronic level (Talyvel 6).
          </p>
        </div>

        <div>
          <h4>Note:</h4>
          <p style={styles.redText}>
            1) Observed rust marks on base.<br/>
            2) Only Parameter requested by the customer has been calibrated.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ---***---
        </div>
      </div>
    
    </div>
  );
};

export default FrameLevelReport;