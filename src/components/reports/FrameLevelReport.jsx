import React from 'react';
import { Card } from 'antd';
import frame from '../../assets/frame_level.png'

const FrameLevelReport = ({ data }) => {
  const styles = {
    calibrationReport: {
      width: '100%',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      padding: '10px'
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
    <Card>
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
    </Card>
  );
};

export default FrameLevelReport;