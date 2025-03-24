import React from 'react';
import { Card } from 'antd';

const LongslipReport = ({ data }) => {
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
    title: {
      textAlign: 'center',
      color: 'blue',
      fontStyle: 'italic',
      marginBottom: '20px'
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

  return (
    <Card>
      <div style={styles.calibrationReport}>
        <div style={styles.ulrNumber}>
          ULR No.CC215322000000529F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>CERTIFICATE NUMBER: 22/53/01/041-S/2/140-B</strong>
          </div>
          <div style={styles.reportRow}>
            <span>Date: 07-09-2022</span>
            <span>Sheet: 1 of 2</span>
          </div>
        </div>

        <div style={styles.title}>
          [Long slip gauges 125 to 300mm]
        </div>

        <h3>Mechanical Calibration.</h3>
        <h4>
          1. Calibration of Long Slip Gauges:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={{...styles.tableHeader}} rowSpan="2">Sl. No.</th>
              <th style={{...styles.tableHeader}} rowSpan="2">Nominal Size</th>
              <th style={{...styles.tableHeader}} rowSpan="2">Deviation at Center</th>
              <th style={{...styles.tableHeader}} colSpan="2">Overall Variations</th>
              <th style={{...styles.tableHeader}} rowSpan="2">Idfn. No./ Sl. No.</th>
            </tr>
            <tr>
              <th style={styles.tableHeader}>Minimum</th>
              <th style={styles.tableHeader}>Maximum</th>
            </tr>
          </thead>
          <tbody>
            {data?.gauges?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.nominal_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.deviation_at_center}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.min_variation}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.max_variation}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.identification_number}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.methodNote}>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            Long Slip Gauges are calibrated by comparison method with respect to Master Slip 
            Gauges (Secondary Masters) by using Electronic Probe-Plunger Type.
          </p>
        </div>

        <div style={styles.methodNote}>
          <h4>Note:</h4>
          <p style={styles.redText}>
            1. The Plus (+) sign indicates that the Long Slip Gauge is oversize and Minus (-) 
               sign indicates that the Long Slip Gauge is undersize.<br />
            2. Scratch marks observed on the measuring surfaces of the Slip Gauges.<br />
            3. Only parameter requested by the customer has been calibrated.
          </p>
        </div>

        <div style={styles.footer}>
          ---***---
        </div>
      </div>
    </Card>
  );
};

export default LongslipReport;