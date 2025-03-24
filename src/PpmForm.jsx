import React from 'react';
import logo from './assets/cmti_full.png';
import qr from './assets/qr.png';
import signature from './assets/signature.png';
import stamp from './assets/stamp.png';

export default function PpmForm({ quotationData }) {
  return (
    <>
      <div style={{ width: '700px', border: '1px solid black', padding: '10px' , fontFamily:'sans-serif'}}>
        <img style={{ paddingLeft: '410px' }} src={logo} alt="CMTI Logo" />
        <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>Quotation</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
        <p style={{ fontWeight: 'bold', fontSize: '15px' }}>Quotation No. : {quotationData.qoutation_no}</p>
        <p style={{ fontWeight: 'bold', fontSize: '15px' }}>Date: {quotationData.date}</p>
              </div>

      {/* Customer details with reduced top margin */}
      <p style={{ fontWeight: 'bold', fontSize: '15px', marginTop: '5px' }}>Customer Details</p>

        {/* Customer Details Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , fontSize:'13px'}}>
        <tbody>
          <tr>
              <td rowSpan="5" style={{ border: '1px solid black', padding: '5px', width: '50%' }}>
                {quotationData.customer_details}
            </td>
              <td style={{ border: '1px solid black', padding: '5px' }}>Contact Person</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{quotationData.contact_person}</td>
          </tr>
          <tr>
              <td style={{ border: '1px solid black', padding: '5px' }}>Designation</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{quotationData.designation}</td>
          </tr>
          <tr>
              <td style={{ border: '1px solid black', padding: '5px' }}>Department</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{quotationData.department}</td>
          </tr>
          <tr>
              <td style={{ border: '1px solid black', padding: '5px' }}>Mobile Number</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{quotationData.mobile_number}</td>
          </tr>
          <tr>
              <td style={{ border: '1px solid black', padding: '5px' }}>Phone Number</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{quotationData.phone_number}</td>
          </tr>
          </tbody>
        </table>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' , fontSize:'13px'}}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', width: '20%' }}>Customer Code</td>
              <td style={{ border: '1px solid black', padding: '5px', width: '25%' }}>{quotationData.customer_code}</td>
              <td style={{ border: '1px solid black', padding: '5px', width: '20%' }}>E-mail ID</td>
              <td style={{ border: '1px solid black', padding: '5px', width: '25%' }}>
                <a href={`mailto:${quotationData.email_id}`}>{quotationData.email_id}</a>
            </td>
          </tr>
          <tr>
              <td style={{ border: '1px solid black', padding: '5px' }}>GST Details</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{quotationData.gst_details}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>Enquiry Ref & Date</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{quotationData.enquiry_ref_date}</td>
          </tr>
          </tbody>
        </table>
        <p style={{padding: '5px', fontWeight: 'bold', fontSize: '15px' }}>Subject : {quotationData.subject}</p>
        <p style={{padding:'5px' , fontWeight:'10px'}}>Dear sir/madam,<br/>We thank you for your enquiry. We are pleased to inform you that we will take up the under mentioned work as per our following Terms & Conditions.</p>
        <p style={{padding: '5px', fontWeight: 'bold', fontSize: '15px'}}>1. Quotation</p>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontSize: '14px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '5px' }}>Sl. No.</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Sample / Activity</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Specification</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>HSN / SAC Code</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Qty</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Unit</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Unit Rate</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Total cost in Rs.</th>
          </tr>
          </thead>
          <tbody>
            {quotationData.details.map((detail, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>
                  {detail.sample}
            </td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                  {detail.specification}
            </td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{detail.sac_code}</td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{detail.qty}</td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{detail.unit}</td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{detail.unit_rate_in_rs}</td>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{detail.total_cost}</td>
          </tr>
            ))}
          </tbody>
        </table>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontSize: '14px', marginTop: '0' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right', fontWeight: 'bold', width: '85%' }}><span style={{paddingRight:'70px'}}>Total</span>{quotationData.total}</td>
          </tr>
          <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>Amount in words :  Rupees One Thousand Only</td>
          </tr>
          </tbody>
        </table>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black', fontSize: '12px', marginTop: '0' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px' }}>
                <strong>Goods & Service Tax : </strong>In addition to the above charges GST will be charged as applicable at the time of billing <br/>
                <strong>CMTI GST NO.: {quotationData.gst_no}</strong>
            </td>
          </tr>
          </tbody>
        </table>
        <p ><span style={{padding:'5px', fontWeight:'bold' , fontSize:'13px'}}>Activity Note:</span> <span style={{fontSize:'12px'}}> 1. Quoted price are for each qty. </span></p>
       
        <table style={{ fontSize: '14px' , lineHeight: '1' }}>
      <tbody>
        <tr>
          <td style={{ padding: '2px', fontWeight: 'bold', verticalAlign: 'top' }}>2. Place of Work:</td>
          <td style={{ padding: '2px' }}>{quotationData.place_of_work}</td>
          </tr>
          <tr>
          <td style={{ padding: '2px', fontWeight: 'bold', verticalAlign: 'top' }}>3. Scope of Work:</td>
          <td style={{ padding: '2px' }}>{quotationData.scope_of_work}</td>
          </tr>
          <tr>
          <td style={{ padding: '2px', fontWeight: 'bold', verticalAlign: 'top' }}>4. Validity Period:</td>
          <td style={{ padding: '2px' }}>The rates quoted above are valid up to {quotationData.validity_period}</td>
          </tr>
          <tr>
          <td style={{ padding: '2px', fontWeight: 'bold', verticalAlign: 'top' }}>5. Payment Terms:</td>
          <td style={{ padding: '2px' }}>100% Payment before collection of item and report.</td>
          </tr>
          <tr>
          <td style={{ padding: '2px', fontWeight: 'bold', verticalAlign: 'top' }}>6. Delivery Period:</td>
          <td style={{ padding: '2px' }}>{quotationData.delivery_period}</td>
          </tr>
      </tbody>
    </table>

        <div style={{ marginTop: '50px' }}>
          <div style={{ 
            width: '100%', 
            borderTop: '1px solid #000', 
            textAlign: 'center', 
            padding: '10px 0', 
            fontSize: '12px'
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>
              CENTRAL MANUFACTURING TECHNOLOGY INSTITUTE
            </div>
            <div style={{ fontWeight: 'bold' }}>
              TUMKUR ROAD, BENGALURU - 560022
            </div>
            <div style={{ marginTop: '5px' }}>
              Tel.: 91-80-22188233 / 300, E-mail : labservices@cmti.res.in / ppm@cmti.res.in, Fax : 91-80-23370428, Website: www.cmti.res.in
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop:'20px', width: '700px', border: '1px solid black', padding: '10px' , fontFamily:'sans-serif'}}>
        <img style={{ paddingLeft: '410px' }} src={logo} alt="CMTI Logo" />
            
        <div style={{ padding: '10px', fontSize: '13px', lineHeight: '1.2' }}>
            <p style={{ fontWeight: 'bold', fontSize: '13px', margin: '0', padding: '0' }}>7. Terms and conditions:</p>
            <div style={{ paddingLeft: '20px', fontSize: '11px', margin: '0' }}>
                <p style={{ margin: '3px 0' }}><strong>I.</strong> Please note that customers have to make their own arrangement at their cost to deliver the item & collect it back after completion of work from CMTI.</p>
                <p style={{ margin: '3px 0' }}><strong>II.</strong> For safety of items/samples we insist items/samples are to be handed over to CMTI and collected it back in-person.</p>
                <p style={{ margin: '3px 0' }}><strong>III.</strong> In case you insist that the items/ samples after the work to be dispatched by courier, we can do so AT YOUR RISK ON TO PAY BASIS WITH RELEVANT DOCUMENTS and CMTI will not be held responsible for any damages that may occur during transit.</p>
                <p style={{ margin: '3px 0' }}><strong>IV.</strong> We are accredited by NABL for calibration/Testing of instruments / masters as per our scope of accreditation. The accreditation is on the basis of its compliance to NABL Criteria based on ISO/IEC 17025: 2017. All the measurements are traceable to National/International Standards. Details of scope of accreditation is available in www.cmti.res.in</p>
              </div>
            
            <p style={{ fontWeight: 'bold', fontSize: '13px', margin: '5px 0 0 0', padding: '0' }}>8. Governing Law and Dispute Resolution:</p>
            <p style={{ fontSize: '11px', margin: '3px 0' , marginLeft:'20px'}}>
                This contract/order shall be governed by and construed in accordance with the laws of India, without reference to its conflict of laws provisions. The Parties agree that any disputes arising out of or in relation to this contract shall be first attempted to be resolved mutually between the Parties, failing which, such dispute shall be finally referred to arbitration to be conducted in accordance with Arbitration and Conciliation Act, 1996 as amended till date ("Rules"). The arbitration shall be held in Bengaluru, India and shall be conducted in English language by one arbitrator, appointed by both the Parties in accordance with said Rules. If parties fail to appoint a single arbitrator, then a panel of 3 is constituted, whereby each of the parties will appoint the third arbitrator, as a contingency measure. The decision of such arbitrator/s shall be final and binding on the Parties and judgment thereon may be entered in any court of competent jurisdiction. The Governing law for the purpose of this offer shall be India.
            </p>
            
            <p style={{ fontWeight: 'bold', fontSize: '13px', margin: '5px 0 0 0', padding: '0' }}>9. Jurisdiction:</p>
            <p style={{ fontSize: '11px', marginLeft:'20px' , margin:'3px' }}>
                This contract shall be deemed to have been concluded in Bangalore for all purposes and therefore only courts of Bangalore shall have jurisdiction for the purpose of any adjudication in case of disputes and differences remain unsolved in spite of arbitration.
            </p>
            
            <p style={{ fontSize: '11px', margin: '8px 0 3px 0' , marginLeft:'20px' }}>
                If you need any information/clarification please feel free to contact <strong>Mrs. Khushboo, Scientist-D, GH., C-MMTM Dept., Email id : metrologylab@cmti.res.in, Phone No. : 080-22188392, Fax No. : 080-23370428</strong>
            </p>
            
            <p style={{ fontSize: '11px', margin: '3px 0' }}>
              Please ensure to quote the Quotation No. and date in your Purchase Order for immediate action. We welcome you to utilize our facilities for your needs and we assure you the best of our services.
            </p>
            </div>

            <div style={{ marginTop: '20px', fontSize: '13px' , padding:'10px' }}>
          <p style={{ margin: '3px 0' }}>Thanking you,</p>
          <p style={{ margin: '15px 0 3px 0' }}>Yours faithfully,</p>
              <p style={{ margin: '0' }}>For CMTI</p>
          
          <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
            <div style={{ width: '50%' }}>
              <div style={{display:'flex' , gap:'80px'}}>
                <img src={signature} alt="Signature" style={{width:'100px' , height:'80px'}} />
                <img src={stamp} alt="stamp" style={{width:'150px' , height:'80px'}} />
              </div>
              
              </div>
              </div>
            <div style={{display:'flex' , gap:'270px'}}>
              <div style={{ marginTop: '10px'}}>
              <p style={{ margin: '5px 0' }}>KUSUMA A</p>
              <p style={{ margin: '3px 0' }}>Office Superintendent I</p>
              <p style={{ margin: '3px 0' }}>Project Planning & Business Development</p>
                <p style={{ fontWeight: 'bold', margin: '5px 0' }}>CMTI Bank Details:</p>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <tbody>
                    <tr>
                      <td>Bank Name</td>
                      <td>: State Bank of India</td>
          </tr>
          <tr>
                      <td>A/c No.</td>
                      <td>: 10521862015</td>
          </tr>
          <tr>
                      <td>IFS Code</td>
                      <td>: SBIN0003297</td>
          </tr>
          <tr>
                      <td>Branch</td>
                      <td>: Yeshwanthpura</td>
          </tr>
        </tbody>
      </table>
    </div>
            <div>
                <img src={qr} alt='qr' style={{width:'200px' , height:'180px'}}/>
            </div>
            </div>
          </div>

          <div style={{ marginTop: '50px' }}>
          <div style={{ 
            width: '100%', 
            borderTop: '1px solid #000', 
            textAlign: 'center', 
            padding: '10px 0', 
            fontSize: '12px'
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '13px' }}>
              CENTRAL MANUFACTURING TECHNOLOGY INSTITUTE
            </div>
            <div style={{ fontWeight: 'bold' }}>
              TUMKUR ROAD, BENGALURU - 560022
            </div>
            <div style={{ marginTop: '5px' }}>
              Tel.: 91-80-22188233 / 300, E-mail : labservices@cmti.res.in / ppm@cmti.res.in, Fax : 91-80-23370428, Website: www.cmti.res.in
            </div>
          </div>
        </div>
          </div>
    </>
  );
}
