const QuotationForm = () => {
  return(
    <>
    <div style={{height:'100%', width:'900px' , border:'1px solid black', padding:'20px' ,marginLeft:'300px'}}>
      <h2 style={{textAlign:'center'}}>Quotation</h2>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
        <table style={{
          marginTop:'81px',
          border: '1px solid black',
          borderCollapse: 'collapse',
          width: '130px'
        }}>
          <tbody>
            <tr>
              <td style={{
                border: '1px solid black',
                padding: '5px',
                backgroundColor:'#d9e1f2',
                fontWeight:'bold'
              }}>
                Customer details
              </td>
            </tr>
          </tbody>
        </table>
        
        <table style={{  
          borderCollapse: "collapse",
          width: "300px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black" }}>
                Centre :
              </td>
              <td style={{ fontWeight: "bold", padding: "5px", border: "1px solid black" }}>CMNTM</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black" }}>
                Lab :
              </td>
              <td style={{fontWeight: "bold", padding: "5px", border: "1px solid black" }}>METROLOGY LAB</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black" }}>
                Enq No. :
              </td>
              <td style={{ padding: "5px", border: "1px solid black" }}></td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black" }}>
                Date:
              </td>
              <td style={{ padding: "5px", border: "1px solid black" }}>3/7/2025</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="details">
            <div style={{ display: 'flex'}}>
            <div style={{width: '400px', border: '1px solid black', padding: '10px'}}>
              <div style={{fontWeight: 'bold'}}>M/S. BHEL-EDN,</div>
              <div style={{fontWeight: 'bold'}}>Mysore Road, Bengaluru - 560026.</div>
            </div>
            <div style={{width: '600px'}}>
              <table style={{
                borderCollapse: 'collapse',
                width: '100%'
              }}>
                <tbody>
                  <tr>
                    <td style={{border: '1px solid black', width: '180px' , backgroundColor:'#d9e1f2' , fontWeight:'bold'}}>Contact Person : </td>
                    <td style={{border: '1px solid black',width:'350px' }}>Mr. S BALAJEE,</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black', backgroundColor:'#d9e1f2', fontWeight:'bold'}}>Designation :</td>
                    <td style={{border: '1px solid black', }}>Additional Engineer Gr.II</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black',backgroundColor:'#d9e1f2' , fontWeight:'bold'}}>Department :</td>
                    <td style={{border: '1px solid black', }}>QUALITY SERVICES</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black', backgroundColor:'#d9e1f2', fontWeight:'bold'}}>Mobile number :</td>
                    <td style={{border: '1px solid black', }}>9449440026 / 7676836471</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black',backgroundColor:'#d9e1f2', fontWeight:'bold' }}>Phone number :</td>
                    <td style={{border: '1px solid black', }}></td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Code and GST Section */}
          <div style={{display: 'flex'}}>
            <table style={{
              borderCollapse: 'collapse',
              width: '400px'
            }}>
              <tbody>
                <tr>
                  <td style={{border: '1px solid black', width: '60px' ,backgroundColor:'#d9e1f2', fontWeight:'bold'}}>Customer code :</td>
                  <td style={{border: '1px solid black', width:'140px'}}></td>
                </tr>
                <tr>
                  <td style={{border: '1px solid black',backgroundColor:'#d9e1f2', fontWeight:'bold'}}>GST Details :</td>
                  <td style={{border: '1px solid black',}}></td>
                </tr>
              </tbody>
            </table>
            <table style={{
              borderCollapse: 'collapse',
              width: '566px'
            }}>
              <tbody>
              <tr>
                    <td style={{border: '1px solid black', width:'183px' ,backgroundColor:'#d9e1f2', fontWeight:'bold'}}>E-mail ID :</td>
                    <td style={{border: '1px solid black', width:'350px'}}>balajees@bhel.in</td>
                  </tr>
                <tr>
                  <td style={{border: '1px solid black', backgroundColor:'#d9e1f2', fontWeight:'bold'}}>Enquiry Ref & date :</td>
                  <td style={{border: '1px solid black', }}></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>

      {/* Subject and Quotation Table Section */}
      <div style={{marginTop: '20px'}} className="subject">
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tbody>
            {/* Subject Row */}
            <tr>
              <td style={{
                border: '1px solid black', 
                width: '100px', 
                backgroundColor: '#d9e1f2', 
                fontWeight: 'bold', 
              }}>Subject</td>
              <td style={{
                border: '1px solid black', 
              }} colSpan="7">
                Quotation for the Calibration charges of Slip Gauges,Angle Gauges, Long Slip Gauges & Surface Roughness Master
              </td>
            </tr>

            <tr style={{height:'20px'}}>
              <td style={{
                border: '1px solid black', 
                backgroundColor: 'white', 
                fontWeight: 'bold', 
              }} colSpan="8"></td>
            </tr>
            
            {/* Quotation Header */}
            <tr >
              <td style={{
                border: '1px solid black', 
                backgroundColor: '#d9e1f2', 
                fontWeight: 'bold', 
              }} colSpan="8">1. Quotation</td>
            </tr>
            
            {/* Table Headers */}
            <tr>
              <th style={{border: '1px solid black',  backgroundColor: '#d9e1f2'}}>Sl No.</th>
              <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Sample / Activity</th>
              <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Description</th>
              <th style={{border: '1px solid black',  backgroundColor: '#d9e1f2'}}>Specification</th>
              <th style={{border: '1px solid black',  backgroundColor: '#d9e1f2'}}>Qty</th>
              <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Unit</th>
              <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Unit Rate in Rs.</th>
              <th style={{border: '1px solid black',  backgroundColor: '#d9e1f2'}}>Total cost in Rs.</th>
            </tr>

            {/* Table Rows */}
            <tr>
              <td style={{border: '1px solid black', }}>1</td>
              <td style={{border: '1px solid black', }}>
                Slip Gauges,<br/>
                Grade: "00", SI No.: 970108, Make: MITUTOYO,<br/>
                Parameter: Deviation at the centre.
              </td>
              <td style={{border: '1px solid black', }}>Size: Upto 100 mm,</td>
              <td style={{border: '1px solid black', }}>By comparison method</td>
              <td style={{border: '1px solid black', }}>112</td>
              <td style={{border: '1px solid black', }}>No.</td>
              <td style={{border: '1px solid black', }}>500</td>
              <td style={{border: '1px solid black', }}>56,000</td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', }}>2</td>
              <td style={{border: '1px solid black', }}>
                Angle Gauges<br/>
                Grade: LM, SI No.: 31282.5,<br/>
                Make:STARRET/WEBER AG16LM,<br/>
                Parameter: Deviation/Error
              </td>
              <td style={{border: '1px solid black', }}>Size: less than 90 degree</td>
              <td style={{border: '1px solid black', }}></td>
              <td style={{border: '1px solid black', }}>16</td>
              <td style={{border: '1px solid black', }}>No.</td>
              <td style={{border: '1px solid black', }}>3300</td>
              <td style={{border: '1px solid black', }}>52,800</td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', }}>3</td>
              <td style={{border: '1px solid black',}}>
                Slip Gauges (Micrometer gauge block set), Grade:<br/>
                "0", SI No.: 242622, Make: MITUTOYO,<br/>
                Parameter: Deviation at the centre.
              </td>
              <td style={{border: '1px solid black', }}>Size: Upto 100 mm,</td>
              <td style={{border: '1px solid black', }}>By comparison method</td>
              <td style={{border: '1px solid black', }}>10</td>
              <td style={{border: '1px solid black', }}>No.</td>
              <td style={{border: '1px solid black', }}>500</td>
              <td style={{border: '1px solid black', }}>5,000</td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', }}>4</td>
              <td style={{border: '1px solid black', }}>
                Long Slip Gauge blocks (Grade: "0")<br/>
                SI.No.: 102341, Make: MITUTOYO<br/>
                Parameter: Deviation at the centre.
              </td>
              <td style={{border: '1px solid black', }}>
                Range: 125-500 mm<br/>
                (Size:125,150,175,<br/>
                200,250,300,400 &<br/>
                500mm)
              </td>
              <td style={{border: '1px solid black', }}>By comparison method</td>
              <td style={{border: '1px solid black', }}>8</td>
              <td style={{border: '1px solid black', }}>No.</td>
              <td style={{border: '1px solid black', }}>5,200</td>
              <td style={{border: '1px solid black', }}>41,600</td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', }}>5</td>
              <td style={{border: '1px solid black', }}>
                Surface Roughness Master,<br/>
                SI No.: 6910200, Make: MAHR.
              </td>
              <td style={{border: '1px solid black', }}>Parameter: Rz Only<br/>(Upto 25 μm)</td>
              <td style={{border: '1px solid black', }}></td>
              <td style={{border: '1px solid black', }}>1</td>
              <td style={{border: '1px solid black', }}>parameter</td>
              <td style={{border: '1px solid black', }}>6,500</td>
              <td style={{border: '1px solid black', }}>6,500</td>
            </tr>
            <tr>
              <td colSpan="7" style={{border: '1px solid black',  textAlign: 'right', fontWeight: 'bold'}}>Total</td>
              <td style={{border: '1px solid black',  }}>161,900</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Activity Notes Section */}
      <div className="activity">
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tbody>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2',
                width: '140px',
                fontWeight: 'bold',  
                textAlign:'right'
              }}>Activity note : 1</td>
              <td style={{border: '1px solid black', }}>
                Quoted price are per each qty / Parameter.
              </td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>2</td>
              <td style={{border: '1px solid black', }}>
                For Sl No.:1 & 3 Slip Gauge Blocks CMC is ±(0.043+L/1600) μm, (Where L is in mm)
              </td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', textAlign:'right',fontWeight:'bold'}}>3</td>
              <td style={{border: '1px solid black', }}>
                Sl No.: 4, Long Slip Gauges CMC is ±(0.45+L/1000) μm. (Where L is in mm) ({'>'} 100 mm to 300mm)
              </td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>4</td>
              <td style={{border: '1px solid black', }}>
                Sl No.: 4, Long Slip Gauges CMC is ±(0.6+L/925)μm. (Where L is in mm) ({'>'} 300 mm to 1000mm)
              </td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>5</td>
              <td style={{border: '1px solid black', }}>
                GST extra as applicable.
              </td>
            </tr>
          </tbody>
        </table>

        {/* Payment, Delivery, and Other Details */}
        <table style={{width: '100%', borderCollapse: 'collapse', }}>
          <tbody>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2',
                width: '120px',
                fontWeight:'bold'
              }}>2. Payment</td>
              <td style={{border: '1px solid black', }}></td>
            </tr>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2',
                fontWeight:'bold',
                width:'140px'
              }}>3. Delivery period :</td>
              <td style={{border: '1px solid black', }}>Four to Five weeks</td>
            </tr>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2',               
                fontWeight:'bold'
              }}>4. Scope of work</td>
              <td style={{border: '1px solid black', }}></td>
            </tr>
          </tbody>
        </table>

        {/* Notes Section */}
        <table style={{width: '100%', borderCollapse: 'collapse', }}>
          <tbody>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2',
                width: '140px',
                fontWeight:'bold',
                textAlign:'right'
              }}>Note : 1</td>
              <td style={{border: '1px solid black', }}></td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold' , }}>2</td>
              <td style={{border: '1px solid black', }}></td>
            </tr>
            <tr>
              <td style={{border: '1px solid black',textAlign:'right', fontWeight:'bold' , }}>3</td>
              <td style={{border: '1px solid black', }}></td>
            </tr>
            <tr>
              <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold' , }}>4</td>
              <td style={{border: '1px solid black', }}></td>
            </tr>
          </tbody>
        </table>

        {/* Place of Work and OT Charges */}
        <table style={{width: '100%', borderCollapse: 'collapse', }}>
          <tbody>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2',
                width: '140px',
                fontWeight:'bold'

              }}>5. Place of work :</td>
              <td style={{border: '1px solid black'}}>CMT1</td>
            </tr>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2', 
                fontWeight:'bold'
              }}>6. OT Charges :</td>
              <td style={{border: '1px solid black',}}>Rs per Hour</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* After your existing activity div, add this new section */}
      <div style={{marginTop: '20px'}} className="ood">
        {/* For OOD Only Header */}
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tbody>
            <tr>
              <td style={{
                border: '1px solid black',
                padding: '5px',
                textAlign: 'center',
                backgroundColor: '#e3dcc8',
                fontWeight: 'bold'
              }}>
                For OOD Only (onsite Assighnment)
              </td>
            </tr>
          </tbody>
        </table>

        {/* Terms & Conditions and Assignment Details */}
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <tbody>
            <tr>
              <td style={{
                border: '1px solid black',
                width: '140px',
                backgroundColor: '#d9e1f2',
                fontWeight: 'bold'
              }}>
                7. Terms & Conditions :
              </td>
              <td style={{
                border: '1px solid black',
                padding: '5px',
                textAlign: 'center'
              }}>
                Local Assighnment
              </td>
              <td style={{
                border: '1px solid black',
                padding: '5px',
                textAlign: 'center'
              }}>
                charges are on Per day basis
              </td>
            </tr>
            <tr>
              <td style={{
                border: '1px solid black',
                backgroundColor: '#d9e1f2',
                fontWeight: 'bold'
              }}>
                8. No. of person/s visiting
              </td>
              <td style={{
                border: '1px solid black',
                padding: '5px',
                textAlign: 'center'
              }}>
                NA
              </td>
              <td style={{
                border: '1px solid black',
                padding: '5px',
                textAlign: 'center'
              }}>
                (for Outstation Assighnment only)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* After your OOD div, add this signature section */}
      <div style={{marginTop: '60px', display: 'flex', justifyContent: 'space-between', padding: '0 20px'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{color: 'blue', fontWeight: 'bold'}}>K.NIRANJAN REDDY</div>
          <div>CH ( MNTM )</div>
        </div>
        
        <div style={{textAlign: 'center'}}>
          <div style={{color: '#00B0F0', fontWeight: 'bold'}}>YATHISHKUMAR G</div>
          <div>Prepared by</div>
        </div>
        
        <div style={{textAlign: 'center'}}>
          <div style={{color: '#FF00FF', fontWeight: 'bold'}}>KHUSHBOO</div>
          <div>Officer Incharge</div>
        </div>
      </div>

      <div style={{marginTop: '50px' , marginLeft:'20px'}}>
        <div>CH ( PP & BD)</div>
      </div>
    </div>
    </>
  )
};

export default QuotationForm;
