import React from 'react';
import { Card } from 'antd';
import right from '../../assets/right.png'
import left from '../../assets/left_angle.png'

const ElectronicLevelReport = ({ data }) => {
  const styles = {
    calibrationReport: {
      width: '210mm',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
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
    <Card>
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
    </Card>
  );
};

export default ElectronicLevelReport;