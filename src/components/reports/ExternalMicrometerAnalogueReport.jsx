import React from 'react';
import { Card } from 'antd';


const ExternalMicrometerAnalogueReport = ({ data }) => {
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
      marginLeft: '350px',
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
   
    <div className="report-container">
      
    <div style={{ width: "100%"  }}>
        {/* Header with ULR and Certificate Table */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ fontSize: "14px", whiteSpace: "nowrap", marginRight: "10px",fontWeight:"normal" }}>
            ULR No. CC215322000000777F
          </div>
          <div
            style={{
              display: "inline-block",
              border: "1px solid black",
              textAlign: "left",
              width: "70%",
              fontSize: "14px",
              marginLeft:"20px",
              
            }}
          >
            <div style={{ display: "flex", borderBottom: "1px solid black",fontWeight:"bold", fontfamily: "Verdana, sans-serif",}}>
              <div style={{ padding: "5px", whiteSpace: "nowrap",fontfamily: "Verdana, sans-serif" }}>
                CERTIFICATE NUMBER:
              </div>
              <div style={{ padding: "5px",fontfamily: "Verdana, sans-serif" }}>22/53/01/041-S/1/215-D1</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontfamily: "Verdana, sans-serif" }}>
              <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 ,fontfamily: "Verdana, sans-serif",fontfamily: "Verdana, sans-serif"}}>DATE: 27-12-2022</div>
              <div style={{ padding: '5px 10px', flex: 1 ,fontfamily: "Verdana, sans-serif"}}>Sheet: 1 of 3</div>
            </div>
            </div>
        </div>
        </div>

        <h3>Mechanical Calibration.</h3>
        <h4>
          I. Calibration of Micrometer Thimble:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Micrometer Reading</th>
              <th style={styles.tableHeader}>Slip Gauge Size</th>
              <th style={styles.tableHeader}>Error</th>
            </tr>
          </thead>
          <tbody>
            {data?.micrometer_thimble_calibrations?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.micrometer_reading}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.slip_gauge_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>
          II. Calibration of Inter-changeable anvils:
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Range of micrometer</th>
              <th style={styles.tableHeader}>Anvil Error</th>
            </tr>
          </thead>
          <tbody>
            {data?.interchangeable_anvils_calibrations?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.range_of_micrometer}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.anvil_error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>
          III. Calibration of Setting gauge rods:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Nominal Values</th>
              <th style={styles.tableHeader}>Calibrated Values</th>
            </tr>
          </thead>
          <tbody>
            {data?.setting_gauge_rods_calibrations?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.nominal_values}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.calibrated_values}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Allowable Values for 0.01 mm L.C. Micrometer as per IS: 2967 – 1983</h4>
        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Parameters</th>
              <th style={styles.tableHeader}>Permissible Error</th>
            </tr>
          </thead>
          <tbody>
            {data?.allowable_values_calibrations?.map((item, index) => (
              <>
                <tr key={`a${index}`}>
                  <td style={styles.tableCell}>Permissible total error Over a range of 150-200 mm.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.permissible_total_error_over_a_range_of_150_to_200mm}
                  </td>
                </tr>
                <tr key={`b${index}`}>
                  <td style={styles.tableCell}>Permissible total error Over a range of 200-250 mm.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.permissible_total_error_over_a_range_of_200_to_250mm}
                  </td>
                </tr>
                <tr key={`c${index}`}>
                  <td style={styles.tableCell}>Permissible total error Over a range of 250-300 mm.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.permissible_total_error_over_a_range_of_250_to_300mm}
                  </td>
                </tr>
                <tr key={`d${index}`}>
                  <td style={styles.tableCell}>Parallelity of measuring faces Over range of 150-200 mm.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.parallelity_of_measuring_faces_over_range_of_150_to_200mm}
                  </td>
                </tr>
                <tr key={`e${index}`}>
                  <td style={styles.tableCell}>Parallelity of measuring faces Over range of 200-250 mm.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.parallelity_of_measuring_faces_over_range_of_200_to_250mm}
                  </td>
                </tr>
                <tr key={`f${index}`}>
                  <td style={styles.tableCell}>Parallelity of measuring faces Over range of 250-300 mm.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.parallelity_of_measuring_faces_over_range_of_250_to_300mm}
                  </td>
                </tr>
                <tr key={`g${index}`}>
                  <td style={styles.tableCell}>Flatness of measuring faces</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.flatness_of_measuring_faces}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            a) Micrometer (External) has been calibrated by holding the Slip Gauges between measuring faces of the Instrument.<br/>
            b) Setting gauge rod has been calibrated by using Grade"0" slip gauge and Electronic probe-lever type.
          </p>
        </div>

        <div>
          <h4>Note:</h4>
          <p style={styles.redText}>
            1) Error= Micrometer Reading- Slip gauge Size.<br/>
            2) Only parameter requested by the Customer has been calibrated.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ---***---
        </div>
      </div>
   </div>
  );
};

export default ExternalMicrometerAnalogueReport;