import React from 'react';
import { Card } from 'antd';

const VernierDepthGaugeReport = ({ data }) => {
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
          ULR No. CC215322000000756F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>CERTIFICATE NUMBER: 22/53/01/041-S/1/215-E2</strong>
          </div>
          <div style={styles.reportRow}>
            <span>DATE: 21-12-2022</span>
            <span>SHEET: 1 of 4</span>
          </div>
        </div>

        <h3>Mechanical Calibration.</h3>
        <h4>
          I. Calibration of scale:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Slip Gauge Size</th>
              <th style={styles.tableHeader}>Calibrated values</th>
              <th style={styles.tableHeader}>Error</th>
            </tr>
          </thead>
          <tbody>
            {data?.depth_gauge_calibrations?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.slip_gauge_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.calibrated_values}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>
          II. Calibration of Partial surface contact error
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Slip gauge size</th>
              <th style={styles.tableHeader}>Calibrated values</th>
              <th style={styles.tableHeader}>Partial surface contact error</th>
            </tr>
          </thead>
          <tbody>
            {data?.partial_surface_contact_calibrations?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.slip_gauge_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.calibrated_values}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.partial_surface_contact_error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>
          III) Calibration of Metrological Characteristics:
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Metrological Characteristics</th>
              <th style={styles.tableHeader}>Errors</th>
            </tr>
          </thead>
          <tbody>
            {data?.metrological_calibrations?.map((item, index) => (
              <>
                <tr key={`a${index}`}>
                  <td style={styles.tableCell}>Partial surface contact error (E)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.partial_surface_error}
                  </td>
                </tr>
                <tr key={`b${index}`}>
                  <td style={styles.tableCell}>Repeatability of partial surface contact error(R)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>
                    {item.repeatability_of_partial_error}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Method of Calibration:</h4>
          
        </div>


        
      </div>
    </Card>
  );
};

export default VernierDepthGaugeReport;