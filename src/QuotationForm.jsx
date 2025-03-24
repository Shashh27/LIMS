import React from 'react';
import { Typography } from 'antd';

const QuotationForm = ({ quotationData }) => {
  // If no data is provided, return null or a loading state
  if (!quotationData) {
    return <div>No quotation data available</div>;
  }

  // Format date if needed
  const formattedDate = quotationData.date || '';
  
  // Calculate total if needed
  const total = parseFloat(quotationData.total || 0).toLocaleString('en-IN');

  return (
    <>
      <div style={{height:'100%', width:'900px', border:'1px solid black', padding:'20px'}}>
        <h2 style={{textAlign:'center'}}>Quotation</h2>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <table style={{
            marginTop:'98px',
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
                <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black" , textAlign:'right'}}>
                  Centre :
                </td>
                <td style={{ fontWeight: "bold", padding: "5px", border: "1px solid black" }}>{quotationData.centre || ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black", textAlign:'right' }}>
                  Lab :
                </td>
                <td style={{fontWeight: "bold", padding: "5px", border: "1px solid black" }}>{quotationData.lab || ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black" , textAlign:'right'}}>
                  Enq No. :
                </td>
                <td style={{ padding: "5px", border: "1px solid black" }}>{quotationData.enq_no || ''}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", backgroundColor: "#d9e1f2", padding: "5px", border: "1px solid black" , textAlign:'right' }}>
                  Date:
                </td>
                <td style={{ padding: "5px", border: "1px solid black" }}>{formattedDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="details">
          <div style={{ display: 'flex'}}>
            <div style={{width: '400px', border: '1px solid black', padding: '10px'}}>
              <div style={{fontWeight: 'bold'}}>{quotationData.customer_details || ''}</div>
              {/* Additional address info could be added here */}
            </div>
            <div style={{width: '600px'}}>
              <table style={{
                borderCollapse: 'collapse',
                width: '100%'
              }}>
                <tbody>
                  <tr>
                    <td style={{border: '1px solid black', width: '180px' , backgroundColor:'#d9e1f2' , fontWeight:'bold'}}>Contact Person : </td>
                    <td style={{border: '1px solid black',width:'350px' }}>{quotationData.contact_person || ''}</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black', backgroundColor:'#d9e1f2', fontWeight:'bold'}}>Designation :</td>
                    <td style={{border: '1px solid black', }}>{quotationData.designation || ''}</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black',backgroundColor:'#d9e1f2' , fontWeight:'bold'}}>Department :</td>
                    <td style={{border: '1px solid black', }}>{quotationData.department || ''}</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black', backgroundColor:'#d9e1f2', fontWeight:'bold'}}>Mobile number :</td>
                    <td style={{border: '1px solid black', }}>{quotationData.mobile_number || ''}</td>
                  </tr>
                  <tr>
                    <td style={{border: '1px solid black',backgroundColor:'#d9e1f2', fontWeight:'bold' }}>Phone number :</td>
                    <td style={{border: '1px solid black', }}>{quotationData.phone_number || ''}</td>
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
                  <td style={{border: '1px solid black', width:'140px'}}>{quotationData.customer_code || ''}</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid black',backgroundColor:'#d9e1f2', fontWeight:'bold'}}>GST Details :</td>
                  <td style={{border: '1px solid black',}}>{quotationData.gst_details || ''}</td>
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
                    <td style={{border: '1px solid black', width:'350px'}}>{quotationData.email_id || ''}</td>
                  </tr>
                <tr>
                  <td style={{border: '1px solid black', backgroundColor:'#d9e1f2', fontWeight:'bold'}}>Enquiry Ref & date :</td>
                  <td style={{border: '1px solid black', }}>{quotationData.enquiry_ref_and_date || ''}</td>
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
                  {quotationData.subject || ''}
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
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Sl No.</th>
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Sample / Activity</th>
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Description</th>
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Specification</th>
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Qty</th>
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Unit</th>
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Unit Rate in Rs.</th>
                <th style={{border: '1px solid black', backgroundColor: '#d9e1f2'}}>Total cost in Rs.</th>
              </tr>

              {/* Table Rows - Dynamically generated from details array */}
              {quotationData.details && quotationData.details.map((detail, index) => (
                <tr key={detail.id || index}>
                  <td style={{border: '1px solid black', textAlign:'center'}}>{index + 1}</td>
                  <td style={{border: '1px solid black'}}>{detail.sample || ''}</td>
                  <td style={{border: '1px solid black'}}>{detail.description || ''}</td>
                  <td style={{border: '1px solid black'}}>{detail.specification || ''}</td>
                  <td style={{border: '1px solid black'}}>{detail.qty || ''}</td>
                  <td style={{border: '1px solid black'}}>{detail.unit || ''}</td>
                  <td style={{border: '1px solid black'}}>{detail.unit_rate_in_rs || ''}</td>
                  <td style={{border: '1px solid black'}}>{detail.total_cost || ''}</td>
                </tr>
              ))}
              
              <tr>
                <td colSpan="7" style={{border: '1px solid black', textAlign: 'right', fontWeight: 'bold'}}>Total</td>
                <td style={{border: '1px solid black'}}>{total}</td>
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
                <td style={{border: '1px solid black'}}>
                  {quotationData.activity_note_1 || ''}
                </td>
              </tr>
              <tr>
                <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>2</td>
                <td style={{border: '1px solid black'}}>
                  {quotationData.activity_note_2 || ''}
                </td>
              </tr>
              <tr>
                <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>3</td>
                <td style={{border: '1px solid black'}}>
                  {quotationData.activity_note_3 || ''}
                </td>
              </tr>
              <tr>
                <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>4</td>
                <td style={{border: '1px solid black'}}>
                  {quotationData.activity_note_4 || ''}
                </td>
              </tr>
              <tr>
                <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>5</td>
                <td style={{border: '1px solid black'}}>
                  {quotationData.activity_note_5 || ''}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Payment, Delivery, and Other Details */}
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              <tr>
                <td style={{
                  border: '1px solid black',
                  backgroundColor: '#d9e1f2',
                  width: '120px',
                  fontWeight:'bold'
                }}>2. Payment Terms/Advance (Rs):</td>
                <td style={{border: '1px solid black'}}>{quotationData.payment || ''}</td>
              </tr>
              <tr>
                <td style={{
                  border: '1px solid black',
                  backgroundColor: '#d9e1f2',
                  fontWeight:'bold',
                  width:'140px'
                }}>3. Delivery period :</td>
                <td style={{border: '1px solid black'}}>{quotationData.delivery_period || ''}</td>
              </tr>
              <tr>
                <td style={{
                  border: '1px solid black',
                  backgroundColor: '#d9e1f2',               
                  fontWeight:'bold'
                }}>4. Scope of work</td>
                <td style={{border: '1px solid black'}}></td>
              </tr>
            </tbody>
          </table>

          {/* Notes Section */}
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              <tr>
                <td style={{
                  border: '1px solid black',
                  backgroundColor: '#d9e1f2',
                  width: '140px',
                  fontWeight:'bold',
                  textAlign:'right'
                }}>Note : 1</td>
                <td style={{border: '1px solid black'}}>{quotationData.scope_note_1 || ''}</td>
              </tr>
              <tr>
                <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>2</td>
                <td style={{border: '1px solid black'}}>{quotationData.scope_note_2 || ''}</td>
              </tr>
              <tr>
                <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>3</td>
                <td style={{border: '1px solid black'}}>{quotationData.scope_note_3 || ''}</td>
              </tr>
              <tr>
                <td style={{border: '1px solid black', textAlign:'right', fontWeight:'bold'}}>4</td>
                <td style={{border: '1px solid black'}}>{quotationData.scope_note_4 || ''}</td>
              </tr>
            </tbody>
          </table>

          {/* Place of Work and OT Charges */}
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              <tr>
                <td style={{
                  border: '1px solid black',
                  backgroundColor: '#d9e1f2',
                  width: '140px',
                  fontWeight:'bold'
                }}>5. Place of work :</td>
                <td style={{border: '1px solid black'}}>{quotationData.place_of_work || ''}</td>
              </tr>
              <tr>
                <td style={{
                  border: '1px solid black',
                  backgroundColor: '#d9e1f2', 
                  fontWeight:'bold'
                }}>6. OT Charges :</td>
                <td style={{border: '1px solid black'}}>{quotationData.ot_charges || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* OOD section */}
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
                  For OOD Only (onsite Assignment)
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
                  {quotationData.terms_and_conditions_1 || ''}
                </td>
                <td style={{
                  border: '1px solid black',
                  padding: '5px',
                  textAlign: 'center'
                }}>
                  {quotationData.terms_and_conditions_2 || ''}
                </td>
              </tr>
              <tr>
                <td style={{
                  border: '1px solid black',
                  backgroundColor: '#d9e1f2',
                  fontWeight: 'bold'
                }}>
                  8. No. of person/s visiting the place :
                </td>
                <td style={{
                  border: '1px solid black',
                  padding: '5px',
                  textAlign: 'center'
                }}>
                  {quotationData.no_of_person_visiting_1 || ''}
                </td>
                <td style={{
                  border: '1px solid black',
                  padding: '5px',
                  textAlign: 'center'
                }}>
                  {quotationData.no_of_person_visiting_2 || ''}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature section */}
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

        <div style={{marginTop: '50px', marginLeft:'20px'}}>
          <div>CH ( PP & BD)</div>
        </div>
      </div>
    </>
  );
};

export default QuotationForm;