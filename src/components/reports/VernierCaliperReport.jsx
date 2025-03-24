import React from 'react';
import { Card } from 'antd';

const VernierCaliperReport = ({ data }) => {
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
          I. Calibration of External Measuring Jaws:
          <span style={{...styles.redText, marginLeft: '10px'}}>(All values are in mm)</span>
        </h4>

        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Slip Gauge Size</th>
              <th style={styles.tableHeader}>Caliper Reading</th>
              <th style={styles.tableHeader}>Error</th>
            </tr>
          </thead>
          <tbody>
            {data?.external_measuring_jaws?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.slip_gauge_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.caliper_reading}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>II. Calibration of Internal Measuring Jaws:</h4>
        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Setting Ring Gauge Size</th>
              <th style={styles.tableHeader}>Caliper Reading</th>
              <th style={styles.tableHeader}>Error</th>
            </tr>
          </thead>
          <tbody>
            {data?.internal_measuring_jaws?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.setting_ring_gauge_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.caliper_reading}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>III. Calibration of Depth Measuring Blade:</h4>
        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Slip Gauge Size</th>
              <th style={styles.tableHeader}>Caliper Reading</th>
              <th style={styles.tableHeader}>Error</th>
            </tr>
          </thead>
          <tbody>
            {data?.depth_measuring_blade?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.slip_gauge_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.caliper_reading}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>IV. Calibration of Partial surface contact error</h4>
        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Sl. No.</th>
              <th style={styles.tableHeader}>Slip gauge size</th>
              <th style={styles.tableHeader}>Caliper Reading</th>
              <th style={styles.tableHeader}>Partial surface contact error</th>
            </tr>
          </thead>
          <tbody>
            {data?.partial_surface_contact?.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{index + 1}.</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.slip_gauge_size}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.caliper_reading}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.partial_surface_contact_error}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>V. Calibration of Combined width of internal measuring jaws</h4>
        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Nominal value</th>
              <th style={styles.tableHeader}>Calibrated value</th>
            </tr>
          </thead>
          <tbody>
            {data?.combined_width?.map((item, index) => (
              <tr key={index}>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.nominal_value}</td>
                <td style={{...styles.tableCell, ...styles.redText}}>{item.calibrated_value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>VI) Calibration of Metrological Characteristics:</h4>
        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Metrological Characteristics</th>
              <th style={styles.tableHeader}>Errors</th>
            </tr>
          </thead>
          <tbody>
            {data?.metrological_characteristics?.map((item, index) => (
              <>
                <tr key="a">
                  <td style={styles.tableCell}>Partial surface contact error (E)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.partial_surface_contact_error}</td>
                </tr>
                <tr key="b">
                  <td style={styles.tableCell}>Repeatability of partial surface contact error (R)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.repeatability_of_partial_surface_contact_error}</td>
                </tr>
                <tr key="c">
                  <td style={styles.tableCell}>Scale shift error (S)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.scale_shift_error}</td>
                </tr>
                <tr key="d">
                  <td style={styles.tableCell}>Line contact error (L)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.line_contact_error}</td>
                </tr>
                <tr key="e">
                  <td style={styles.tableCell}>Full surface contact error (J)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.full_surface_contact_error}</td>
                </tr>
                <tr key="f">
                  <td style={styles.tableCell}>Error due to crossed knife-edge distance (K)</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.error_due_to_crossed_knife_edge_distance}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        <div>
          <h4>Method of Calibration:</h4>
          <p style={styles.redText}>
            a) External measuring Jaws, Partial surface contact error (E), Repeatability of partial surface contact error (J) are calibrated by holding the Slip Gauges between measuring faces of the Instrument.<br/>
            b) Internal Measuring Jaws are calibrated by using Setting Ring gauges.<br/>
            c) Depth measuring blade is calibrated by using Grade "0" slip gauges.<br/>
            d) Scale shift error is calibrated by using Setting ring gauge and Slip Gauge.<br/>
            e) Line Contact error is calibrated by using Cylindrical measuring pin.<br/>
            f) Error due to crossed knife-edge distance (K) is calibrated by using Master ring gauge.
          </p>
        </div>

        <div>
          <h4>Note:</h4>
          <p style={styles.redText}>
            a) Error= Vernier Caliper Reading - Slip Gauge Size/Setting Ring Gauge Size.<br/>
            b) Observed loose contact between slider and beam.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          ---***---
        </div>
      </div>
    </Card>
  );
};

export default VernierCaliperReport;