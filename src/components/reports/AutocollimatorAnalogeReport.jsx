import React from 'react';
import './AutocollimatorAnalogeReport.css';

const AutocollimatorAnalogeReport = ({ data }) => {
  return (
    <div>
      {/* First Sheet */}
      <div className="report-container">
        <div style={{ width: "100%" }}>
          {/* Header with ULR and Certificate Table */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ fontSize: "14px", whiteSpace: "nowrap", marginRight: "10px", fontWeight: "normal" }}>
              ULR No. {data?.first_sheet?.ulr_no}
            </div>
            <div
              style={{
                display: "inline-block",
                border: "1px solid black",
                textAlign: "left",
                width: "70%",
                fontSize: "14px",
                marginLeft: "20px"
              }}
            >
              <div style={{ display: "flex", borderBottom: "1px solid black", fontWeight: "bold" }}>
                <div style={{ padding: "5px", whiteSpace: "nowrap" }}>
                  CERTIFICATE NUMBER:
                </div>
                <div style={{ padding: "5px" }}>24/53/01/041-S/3/286-A</div>
              </div>
  
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: "bold" }}>
                <div style={{ padding: '5px 10px', borderRight: '1px solid black', flex: 1 }}>DATE: {data?.first_sheet?.report_issued_date}</div>
                <div style={{ padding: '5px 10px', flex: 1 }}>Sheet: 1 of 2</div>
              </div>
            </div>
          </div>
  
          {/* Customer Information Table */}
          <div
            style={{
              border: "1px solid black",
              padding: "5px",
              width: "99%",
              backgroundColor: "#ffffff",
              fontSize: "14px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", border: "none" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "5px", width: "35%", textAlign: "left", border: "none", verticalAlign: "top", fontWeight: "normal" }}>
                    Name & Address of the Customer
                  </td>
                  <td style={{ width: "5%", textAlign: "center", border: "none", verticalAlign: "top" }}>
                    :
                  </td>
                  <td style={{ padding: "5px", width: "60%", textAlign: "left", border: "none" }}>
                    {data?.first_sheet?.customer_name_and_address}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "5px", fontWeight: "normal", textAlign: "left", border: "none", verticalAlign: "top" }}>
                    Description of the Item
                  </td>
                  <td style={{ textAlign: "center", border: "none", verticalAlign: "top" }}>
                    :
                  </td>
                  <td style={{ padding: "5px", textAlign: "left", border: "none" }}>
                    {data?.first_sheet?.item_description}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "normal", padding: "5px", textAlign: "left", border: "none", verticalAlign: "top" }}>
                    Identification & SI. No.
                  </td>
                  <td style={{ textAlign: "center", border: "none", verticalAlign: "top" }}>
                    :
                  </td>
                  <td style={{ padding: "5px", textAlign: "left", border: "none" }}>
                    Id. No.: {data?.first_sheet?.identification_no} & SI No.: {data?.first_sheet?.Sl_no}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          {/* Additional Details */}
          <table style={{ width: "100%", borderCollapse: "collapse", border: "none" }}>
            <tbody>
              <tr>
                <td style={{ padding: "5px", width: "40%", textAlign: "left", border: "none", fontWeight: "normal", verticalAlign: "top" }}>
                  1. Customer's Reference
                </td>
                <td style={{ width: "5%", textAlign: "center", border: "none", verticalAlign: "top" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  D.C. No.: {data?.first_sheet?.DC_no}, Dated: {data?.first_sheet?.DC_no_dated} & P.O. No.: {data?.first_sheet?.PO_no}, Dated: {data?.first_sheet?.PO_no_dated}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  2. Date & Place of Calibration
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  {data?.first_sheet?.date_of_calibration}, {data?.first_sheet?.place_of_calibration}
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  3. Equipment Used For Calibration & Traceability:
                </td>
              </tr>
              {data?.first_sheet_equipments?.map((equipment, index) => (
                <tr key={index}>
                  <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", marginLeft: "20px", textIndent: "-20px" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{equipment.equipment_details}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  4. Reference Document
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  Based on {data?.first_sheet?.reference_document_based_on_IS}, {data?.first_sheet?.reference_document_based_on_IS_and_WP_no}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", whiteSpace: "nowrap" }}>
                  5. Temperature during Calibration
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  {data?.first_sheet?.temperature_during_calibration}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  6. Uncertainty of Measurement
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  {data?.first_sheet?.uncertainity_of_measurement}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Second Sheet */}
      <div className="report-container">
        <div style={{ width: "100%" }}>
          <div className="report-title">
            <p className="instrument-type">(Autocollimator Analoge)</p>
          </div>
          <h3>Mechanical Calibration</h3>
          <h4>I. Calibration of Drum Scale:</h4>
          <table className="calibration-table">
            <thead>
              <tr>
                <th rowSpan="2">Sl. No.</th>
                <th rowSpan="2">Nominal Angle</th>
                <th colSpan="2">Calibrated Values</th>
              </tr>
              <tr>
                <th>X-Axis</th>
                <th>Y-Axis</th>
              </tr>
            </thead>
            <tbody>
              {data?.analogue_data?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="value-cell">{item.nominal_angle}</td>
                  <td className="value-cell">{item.x_axis_calibrated_values}</td>
                  <td className="value-cell">{item.y_axis_calibrated_values}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="report-section">
            <h4>II. Calibration of Main Scale:</h4>
            <table className="calibration-table">
              <thead>
                <tr>
                  <th rowSpan="2">Sl. No.</th>
                  <th rowSpan="2">Nominal Angle</th>
                  <th colSpan="2">Calibrated Values</th>
                </tr>
                <tr>
                  <th>X-Axis</th>
                  <th>Y-Axis</th>
                </tr>
              </thead>
              <tbody>
                {data?.mainscale_data?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="value-cell">{item.nominal_angle}</td>
                    <td className="value-cell">{item.x_axis_calibrated_values}</td>
                    <td className="value-cell">{item.y_axis_calibrated_values}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="method-section">
            <p><strong>Method of Calibration:</strong> The calibration was carried out by comparison method using standard angle gauge block set.</p>
            <p><strong>Note:</strong> Only Parameter requested by the customer has been calibrated.</p>
            <p className="centered">***</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutocollimatorAnalogeReport;