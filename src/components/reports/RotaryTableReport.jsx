import React from 'react';
import { Card } from 'antd';

const RotaryTableReport = ({ data }) => {
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
          ULR No. CC215321000000118F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>CERTIFICATE NUMBER: ML/RTD-01/21.06/035</strong>
          </div>
          <div style={styles.reportRow}>
            <span>DATE: 30-06-2021</span>
            <span>Sheet: 1 of 2</span>
          </div>
        </div>

        <h3>Mechanical Calibration.</h3>
        <h4>I Calibration of rotary table:</h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader} rowSpan="2">Sl. No.</th>
              <th style={styles.tableHeader} rowSpan="2">
                Nominal<br/>
                Position<br/>
                of<br/>
                Rotary<br/>
                Table in<br/>
                Degree
              </th>
              <th style={styles.tableHeader} rowSpan="2">
                Pair of<br/>
                Face sets<br/>
                on<br/>
                Polygon<br/>
                Mirror
              </th>
              <th style={styles.tableHeader} colSpan="3">
                Calibrated Cumulative Errors in <span style={styles.redText}>arc<br/>
                seconds</span> (Compensated)
              </th>
              <th style={styles.tableHeader} rowSpan="2">
                Avg.<br/>
                Cumulative<br/>
                Errors w.r.t.<br/>
                Master<br/>
                values in<br/>
                <span style={styles.redText}>arc seconds</span>
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
                <td style={{...styles.tableCell, ...styles.redText}}>{item.nominal_positioning}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.pair_of_facesets_on_polygon_mirror}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.firstset_calibrated_cumulative_errors}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.secondset_calibrated_cumulative_errors}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.thirdset_calibrated_cumulative_errors}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.average_cumulative_errors_wrt_mastervalues}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            Calibration is carried out by mounting the Precision Polygon Mirror on the Rotary Table-Digital and by using Autocollimator.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ---***---
        </div>
      </div>
    </Card>
  );
};

export default RotaryTableReport;