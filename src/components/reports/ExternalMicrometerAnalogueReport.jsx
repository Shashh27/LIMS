import React from 'react';
import { Card } from 'antd';

const ExternalMicrometerAnalogueReport = ({ data }) => {
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
          ULR No. CC215322000000777F
        </div>

        <div style={styles.reportHeader}>
          <div>
            <strong>CERTIFICATE NUMBER: 22/53/01/041-S/1/215-D1</strong>
          </div>
          <div style={styles.reportRow}>
            <span>Date: 27-12-2022</span>
            <span>Sheet: 1 of 3</span>
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
    </Card>
  );
};

export default ExternalMicrometerAnalogueReport;