import React from 'react';
import { Card } from 'antd';

const LaserMicrometerReport = ({ data }) => {
  // Inline styles
  const styles = {
    calibrationReport: {
      width: '210mm',
      height: '297mm',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    
    ulrNumber: {
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: 'bold',
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
    reportNumber: {
      fontWeight: 'bold'
    },
    reportRow: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    units: {
      fontSize: '14px',
      color: 'red',
      marginLeft: '370px'
    },
    calibrationTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px'
    },
    tableCell: {
      border: '1px solid black',
      textAlign: 'center'
    },
    tableHeader: {
      border: '1px solid black',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    redText: {
      color: 'red',
      fontWeight: 'bold',
      paddingBottom: '10px'
    },
    calibrationMethod: {
      marginTop: '20px',
      fontSize: '16px'
    },
    methodParagraph: {
      marginBottom: '2px',
      marginTop: '20px',
      paddingBottom: '10px'
    },
    footer: {
      textAlign: 'center',
      fontSize: '14px',
      marginTop: '20px',
      fontWeight: 'bold'
    },
    methodNote: {
      marginTop: '5px',
      marginBottom: '5px',
      lineHeight: '1.2'
    }
  };

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-GB');
  
  // Check if data is available and has at least one item
  const hasData = Array.isArray(data) && data.length > 0;
  
  // Certificate number and test number from first data item if available
  const certificateNumber = hasData ? `22/53/01/041/3/${data[0].certificate_id.toString().padStart(3, '0')}` : '22/53/01/041/3/000';
  const testNumber = hasData ? data[0].test_number : 'N/A';

  return (
    <Card>
      <div style={styles.calibrationReport}>
        

        {/* Report Details */}
        <div style={styles.reportHeader}>
          <div style={styles.reportNumber}>
            CERTIFICATE NUMBER: {certificateNumber}
          </div>
          <div style={styles.reportRow}>
            <span>Date: {currentDate}</span>
            <span>Sheet: 1 of 1</span>
          </div>
        </div>

        {/* Mechanical Calibration Section */}
        <h4 style={styles.methodNote}>Mechanical Calibration</h4>
        <h4 style={styles.methodNote}>
          Calibration of Laser Micrometer:
          <span style={styles.units}>(All values are in <span style={styles.redText}>mm</span>)</span>
        </h4>

        {/* Calibration Table */}
        <table style={styles.calibrationTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader} rowSpan="2">Sl. No.</th>
              <th style={styles.tableHeader} rowSpan="2">Actual size of Setting plug gauges</th>
              <th style={styles.tableHeader} colSpan="4">Errors of Laser Micrometer</th>
            </tr>
            <tr>
              <th style={styles.tableHeader}>1st Set</th>
              <th style={styles.tableHeader}>2nd Set</th>
              <th style={styles.tableHeader}>3rd Set</th>
              <th style={styles.tableHeader}>Average</th>
            </tr>
          </thead>
          <tbody>
            {hasData ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{index + 1}.</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>Ø {item.actual_size}</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.first_set}</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.second_set}</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.third_set}</td>
                  <td style={{...styles.tableCell, ...styles.redText}}>{item.average_error}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.tableCell}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Method of Calibration - Static content as requested */}
        <h4 style={styles.methodNote}>Method of Calibration:</h4>
        <p style={styles.methodNote}>Calibration was carried out by placing the Setting plug gauges on V-Block / Holding fixture of Laser Micrometer.</p>

        {/* Notes Section - Static content */}
        <h4 style={styles.methodNote}>Note:</h4>
        <p style={styles.methodNote}><strong>1)</strong> Error = Laser Micrometer reading – Setting plug gauge size.</p>
        <p style={styles.methodNote}><strong>2)</strong> Actual sizes of Setting Plug gauges are taken from Calibration certificate.</p>

        {/* Footer */}
        <div style={styles.footer}>--- * ---</div>
      </div>
    </Card>
  );
};

export default LaserMicrometerReport;