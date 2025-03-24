import React from 'react';
import { Card } from 'antd';

const IndexingTableReport = ({ data }) => {
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
          ULR No. CC215319000000136F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>REPORT NUMBER: ML/IDT-01/19.05/023</strong>
          </div>
          <div style={styles.reportRow}>
            <span>DATE: 20-05-2019</span>
            <span>Sheet: 1 of 2</span>
          </div>
        </div>

        <h3>Mechanical Calibration.</h3>
        <h4>Calibration of Indexing Table:</h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader} rowSpan="2">Sl. No.</th>
              <th style={styles.tableHeader} rowSpan="2">
                Nominal Position of<br/>
                Indexing Table<br/>
                in Degree
              </th>
              <th style={styles.tableHeader} colSpan="3">
                Calibrated Cumulative Errors in<br/>
                arc seconds
              </th>
              <th style={styles.tableHeader} rowSpan="2">
                Average<br/>
                cumulative<br/>
                Errors in<br/>
                arc seconds
              </th>
            </tr>
            <tr>
              <th style={styles.tableHeader}>1st Set</th>
              <th style={styles.tableHeader}>2nd Set</th>
              <th style={styles.tableHeader}>3rd Set</th>
            </tr>
          </thead>
          <tbody>
            {data?.mechanical_calibrations?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.normal_positioning}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.firstset_calibrated_cumulative_errors}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.secondset_calibrated_cumulative_errors}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.thirdset_calibrated_cumulative_errors}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.average_cumulative_errors}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            Calibration is carried out by mounting the Precision Polygon Mirror on the indexing table and by using Autocollimator.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ---***---
        </div>
      </div>
    </Card>
  );
};

export default IndexingTableReport;