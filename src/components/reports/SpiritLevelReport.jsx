import React from 'react';
import { Card } from 'antd';

const SpiritLevelReport = ({ data }) => {
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

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader} rowSpan="2">Sl.No.</th>
              <th style={styles.tableHeader} colSpan="2">Left Side</th>
              <th style={styles.tableHeader} colSpan="2">Right Side<br/>(Towards Cross Bubble)</th>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Scale Reading</th>
              <th style={styles.tableHeader}>Calibrated values</th>
              <th style={styles.tableHeader}>Scale Reading</th>
              <th style={styles.tableHeader}>Calibrated values</th>
            </tr>
          </thead>
          <tbody>
            {data?.readings?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.leftside_scale_reading}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.leftside_calibrated_values}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.rightside_scale_reading}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.rightside_calibrated_values}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>
          II. Calibration of Bubble Consistency (Repeatability):
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm/m)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Parameter</th>
              <th style={styles.tableHeader}>Calibrated values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Consistency (Repeatability)</td>
              <td style={{...styles.tableCell, ...styles.redText}}>
                {data?.consistency?.[0]?.calibrated_values}
              </td>
            </tr>
          </tbody>
        </table>

        <h4>
          III. Calibration of geometrical parameter:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm/m)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl.No.</th>
              <th style={styles.tableHeader}>Parameters</th>
              <th style={styles.tableHeader}>Calibrated values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>1</td>
              <td style={styles.tableCell}>Flatness of base</td>
              <td style={{...styles.tableCell, ...styles.redText}}>
                {data?.geometrical_parameters?.[0]?.flatness_of_base}
              </td>
            </tr>
            <tr>
              <td style={styles.tableCell}>2</td>
              <td style={styles.tableCell}>Parallelism of "V" wrt flat base</td>
              <td style={{...styles.tableCell, ...styles.redText}}>
                {data?.geometrical_parameters?.[0]?.parallelism_of_v_wrt_flat_base}
              </td>
            </tr>
          </tbody>
        </table>

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

export default SpiritLevelReport;