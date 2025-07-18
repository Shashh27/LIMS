import React from 'react';
import './AutocollimatorAnalogeReport.css';

const DepthMicroCheckerReport = ({ data }) => {
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
                <div style={{ padding: "5px" }}>{data?.test_number}</div>
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
              {data?.first_sheet?.equipments?.map((equipment, index) => (
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
              <tr>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  7. Results of Calibration
                </td>
                <td style={{ textAlign: "center", border: "none" }}>
                  :
                </td>
                <td style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal" }}>
                  Refer sheet 2.
                </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ padding: "5px", textAlign: "left", border: "none", fontWeight: "normal", paddingLeft: "5px" }}>
                  8. The reported results are valid only for the condition of the received <strong>Thread Plug Gauge </strong>  
                  at the time of and under the stated conditions of the Calibration.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Second Sheet */}
      <div style={{ padding: '20px', margin: '0 auto', fontFamily: 'Arial, sans-serif', maxWidth: '800px', width: "210mm",
        height: "297mm", backgroundColor: "#ffffff", paddingTop:"20px",
        border: "1px solid #ccc", 
        boxSizing: "border-box", pageBreakAfter:"always", display:"block", marginTop:"50px" }}>

        {/* Depth Micro Checker Section */}
        <div>
          <h4>I. Calibration of Depth Micro Checker 
            <span style={{ marginLeft: '20px', fontWeight: 'normal' }}>
              (All values in <span style={{ color: 'red' }}>mm</span>)
            </span>
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th rowSpan="2" style={{ border: '1px solid black', verticalAlign: 'middle' }}>Sl. No.</th>
                <th rowSpan="2" style={{ border: '1px solid black', verticalAlign: 'middle' }}>Nominal Size</th>
                <th colSpan="3" style={{ border: '1px solid black'}}>Calibrated Values</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black' }}>"B Side" Step blocks</th>
                <th style={{ border: '1px solid black' }}>"A Side" Step blocks</th>
                <th style={{ border: '1px solid black' }}>Parallelity b/w "A Side" & "B Side"</th>
              </tr>
            </thead>
            <tbody>
              {data?.depth_micro_checker_calibrations?.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                    {item.nominal_size}
                  </td>
                  <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                    {item.B_side_calibrated_values}
                  </td>
                  <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                    {item.A_side_calibrated_values}
                  </td>
                  <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                    {item.Parallelity_between_A_side_and_B_side_Calibratedvalues}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Anvil Block Section */}
        <div>
          <h3>II. Calibration of Anvil Block:</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', width: '50%' }}>Anvil Block Size</th>
                <th style={{ border: '1px solid black', width: '50%' }}>Calibrated Values</th>
              </tr>
            </thead>
            <tbody>
              {data?.anvil_block_calibrations?.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                    {item.anvil_block_size}
                  </td>
                  <td style={{ border: '1px solid black', textAlign: 'center', color: 'red' }}>
                    {item.calibrated_values}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Method of Calibration Section */}
        <div style={{ marginTop: '20px' }}>
          <p><strong>Method of Calibration:</strong></p>
          <p style={{ color: 'red' }}>
            Depth Micro Checker & Anvil Block were calibrated by comparison method w.r.t "0" grade Slip Gauges and Electronic Comparator.
          </p>
          <p><strong>Note:</strong></p>
          <p>1) Only Parameter requested by the customer has been calibrated.</p>
          <p>2) Scratches and Stain marks observed on the base of the Depth Micro Checker and working Surfaces of Anvil block.</p>
          <p style={{ textAlign: 'center' }}>---***---</p>
        </div>
      </div>
    </div>
  );
};

export default DepthMicroCheckerReport; 