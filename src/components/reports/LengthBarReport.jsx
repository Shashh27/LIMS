import React from 'react';
import { Card } from 'antd';

const LengthBarReport = ({ data }) => {
  // Inline styles
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
    units: {
      fontSize: '14px',
      color: 'red',
      marginLeft: '10px'
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
    },
    methodNote: {
      marginTop: '20px',
      marginBottom: '10px'
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      fontWeight: 'bold'
    }
  };

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-GB');
  
  // Check if data is available
  const hasData = data && data.length > 0;
  
  return (
    <Card>
      <div style={styles.calibrationReport}>
        <div style={styles.ulrNumber}>
          ULR No.CC215321000000142F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>CERTIFICATE NUMBER: {data?.certificate_id}</strong>
          </div>
          <div style={styles.reportRow}>
            <span>Date: {currentDate}</span>
            <span>Sheet: 1 of 2</span>
          </div>
        </div>

        <h3>Mechanical Calibration</h3>
        <h4>
          Calibration of Length bars:
          <span style={styles.units}>(All values are in mm)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Length bar Size / Sl. No.</th>
              <th style={styles.tableHeader}>Calibrated Values</th>
            </tr>
          </thead>
          <tbody>
            {data?.length_bars?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>
                  {item.length_bar_size}
                </td>
                <td style={{...styles.tableCell, ...styles.redText}}>
                  {item.calibrated_value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.methodNote}>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            Length bars are calibrated by comparison method with respect to Grade 'K' Slip 
            Gauges (Secondary Masters) using Electronic Probe-Plunger type.
          </p>
        </div>

        <div style={styles.methodNote}>
          <h4>Note:</h4>
          <p style={styles.redText}>
            • Only Parameter requested by the customer has been calibrated.<br />
            • Dent and Scratch marks are observed on measuring faces of Length bars.
          </p>
        </div>

        <div style={styles.footer}>
          ---***---
        </div>
      </div>
    </Card>
  );
};

export default LengthBarReport;