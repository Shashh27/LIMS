from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from Database.db import get_db
from orm_models.models import PpmQuotationDetails, PpmQuotationForm, QuotationForm, QuotationDetails
from pydantic_schema.request_body import PpmQuotationFormCreate, QuotationFormCreate, QuotationRemarksOnly, QuotationStatusOnly, QuotationStatusUpdate, QuotationUpdateResponse, RemarksUpdateResponse, StatusUpdateResponse

router = APIRouter(
    prefix="/quotation",
    tags=["Quotation"]
)

# Pydantic model for quotation details


# Response model for quotation
class QuotationResponse(BaseModel):
    id: int
    total: str
    message: str
    
    class Config:
        orm_mode = True

@router.post("/", response_model=QuotationResponse)
def create_quotation(quotation: QuotationFormCreate, db: Session = Depends(get_db)):
    try:
        # Calculate total from all detail items
        total_amount = 0
        for detail in quotation.details:
            if detail.total_cost and detail.total_cost.strip():
                try:
                    # Remove commas and other formatting characters before conversion
                    cleaned_cost = detail.total_cost.replace(',', '').replace(' ', '')
                    total_amount += float(cleaned_cost)
                except ValueError:
                    # If conversion fails, just ignore that value
                    pass
        
        # Create the quotation form with the calculated total
        db_quotation_form = QuotationForm(
            centre=quotation.centre,
            lab=quotation.lab,
            enq_no=quotation.enq_no,
            date=quotation.date,
            customer_details=quotation.customer_details,
            contact_person=quotation.contact_person,
            designation=quotation.designation,
            department=quotation.department,
            mobile_number=quotation.mobile_number,
            phone_number=quotation.phone_number,
            email_id=quotation.email_id,
            enquiry_ref_and_date=quotation.enquiry_ref_and_date,
            customer_code=quotation.customer_code,
            gst_details=quotation.gst_details,
            subject=quotation.subject,
            total=str(total_amount),  # Store the calculated total
            activity_note_1=quotation.activity_note_1,
            activity_note_2=quotation.activity_note_2,
            activity_note_3=quotation.activity_note_3,
            activity_note_4=quotation.activity_note_4,
            activity_note_5=quotation.activity_note_5,
            payment=quotation.payment,
            delivery_period=quotation.delivery_period,
            scope_note_1=quotation.scope_note_1,
            scope_note_2=quotation.scope_note_2,
            scope_note_3=quotation.scope_note_3,
            scope_note_4=quotation.scope_note_4,
            place_of_work=quotation.place_of_work,
            ot_charges=quotation.ot_charges,
            terms_and_conditions_1=quotation.terms_and_conditions_1,
            terms_and_conditions_2=quotation.terms_and_conditions_2,
            no_of_person_visiting_1=quotation.no_of_person_visiting_1,
            no_of_person_visiting_2=quotation.no_of_person_visiting_2
        )
        
        # Add to database and commit to get ID
        db.add(db_quotation_form)
        db.commit()
        db.refresh(db_quotation_form)
        
        # Create quotation details with the foreign key
        for detail in quotation.details:
            db_detail = QuotationDetails(
                quotationform_id=db_quotation_form.id,
                sample=detail.sample,
                description=detail.description,
                specification=detail.specification,
                qty=detail.qty,
                unit=detail.unit,
                unit_rate_in_rs=detail.unit_rate_in_rs,
                total_cost=detail.total_cost
            )
            db.add(db_detail)
        
        # Commit all details
        db.commit()
        
        # Return success response with the calculated total
        return {
            "id": db_quotation_form.id, 
            "total": str(total_amount),
            "message": "Quotation created successfully"
        }
        
    except Exception as e:
        # Rollback in case of error
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating quotation: {str(e)}"
        )
    

@router.post("/add-ppm", response_model=QuotationResponse)
def create_ppm_quotation(quotation: PpmQuotationFormCreate, db: Session = Depends(get_db)):
    try:
        # Calculate total from all detail items
        total_amount = 0
        for detail in quotation.details:
            if detail.total_cost and detail.total_cost.strip():
                try:
                    # Remove commas and other formatting characters before conversion
                    cleaned_cost = detail.total_cost.replace(',', '').replace(' ', '')
                    total_amount += float(cleaned_cost)
                except ValueError:
                    # If conversion fails, just ignore that value
                    pass
        
        # Create the PPM quotation form with the calculated total
        db_ppm_quotation_form = PpmQuotationForm(
            quotation_no=quotation.quotation_no,
            date=quotation.date,
            customer_details=quotation.customer_details,
            contact_person=quotation.contact_person,
            designation=quotation.designation,
            department=quotation.department,
            mobile_number=quotation.mobile_number,
            phone_number=quotation.phone_number,
            email_id=quotation.email_id,
            enquiry_ref_and_date=quotation.enquiry_ref_and_date,
            customer_code=quotation.customer_code,
            gst_details=quotation.gst_details,
            subject=quotation.subject,
            total=str(total_amount),  # Store the calculated total
            delivery_period=quotation.delivery_period,
            scope_of_work=quotation.scope_of_work,
            place_of_work=quotation.place_of_work,
        )
        
        # Add to database and commit to get ID
        db.add(db_ppm_quotation_form)
        db.commit()
        db.refresh(db_ppm_quotation_form)
        
        # Create PPM quotation details with the foreign key
        for detail in quotation.details:
            db_detail = PpmQuotationDetails(
                quotationform_id=db_ppm_quotation_form.id,
                sample=detail.sample,
                description=detail.description,
                specification=detail.specification,
                sac_code=detail.sac_code,
                qty=detail.qty,
                unit=detail.unit,
                unit_rate_in_rs=detail.unit_rate_in_rs,
                total_cost=detail.total_cost
            )
            db.add(db_detail)
        
        # Commit all details
        db.commit()
        
        # Return success response with the calculated total
        return {
            "id": db_ppm_quotation_form.id, 
            "total": str(total_amount),
            "message": "PPM Quotation created successfully"
        }
        
    except Exception as e:
        # Rollback in case of error
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating PPM quotation: {str(e)}"
        )
    

@router.get("/ppm", response_model=None)
def get_all_quotations(db: Session = Depends(get_db)):
    try:
        # Get all quotations
        quotations = (
            db.query(QuotationForm)
            .filter(QuotationForm.status == "approved")
            .order_by(QuotationForm.id.asc())  # Change `id` to the desired column
            .all()
        )        
        # Prepare the response
        results = []
        for quotation in quotations:
            # Get details for this quotation
            details = db.query(QuotationDetails).filter(
                QuotationDetails.quotationform_id == quotation.id
            ).all()
            
            # Convert details to list of dictionaries
            details_list = []
            for detail in details:
                detail_dict = {
                    "id": detail.id,
                    "sample": detail.sample,
                    "description": detail.description,
                    "specification": detail.specification,
                    "qty": detail.qty,
                    "unit": detail.unit,
                    "unit_rate_in_rs": detail.unit_rate_in_rs,
                    "total_cost": detail.total_cost
                }
                details_list.append(detail_dict)
            
            # Create a complete dictionary with all fields from the quotation
            quotation_dict = {
                "id": quotation.id,
                "centre": quotation.centre,
                "lab": quotation.lab,
                "enq_no": quotation.enq_no,
                "date": quotation.date,
                "customer_details": quotation.customer_details,
                "contact_person": quotation.contact_person,
                "designation": quotation.designation,
                "department": quotation.department,
                "mobile_number": quotation.mobile_number,
                "phone_number": quotation.phone_number,
                "email_id": quotation.email_id,
                "enquiry_ref_and_date": quotation.enquiry_ref_and_date,
                "customer_code": quotation.customer_code,
                "gst_details": quotation.gst_details,
                "subject": quotation.subject,
                "total": quotation.total,
                "activity_note_1": quotation.activity_note_1,
                "activity_note_2": quotation.activity_note_2,
                "activity_note_3": quotation.activity_note_3,
                "activity_note_4": quotation.activity_note_4,
                "activity_note_5": quotation.activity_note_5,
                "payment": quotation.payment,
                "delivery_period": quotation.delivery_period,
                "scope_note_1": quotation.scope_note_1,
                "scope_note_2": quotation.scope_note_2,
                "scope_note_3": quotation.scope_note_3,
                "scope_note_4": quotation.scope_note_4,
                "place_of_work": quotation.place_of_work,
                "ot_charges": quotation.ot_charges,
                "terms_and_conditions_1": quotation.terms_and_conditions_1,
                "terms_and_conditions_2": quotation.terms_and_conditions_2,
                "no_of_person_visiting_1": quotation.no_of_person_visiting_1,
                "no_of_person_visiting_2": quotation.no_of_person_visiting_2,
                "status":quotation.status,
                "remarks": quotation.remarks,
                "details": details_list
            }
            
            results.append(quotation_dict)
        
        return results
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving quotations: {str(e)}"
        )
    


@router.get("/", response_model=None)
def get_all_quotations(db: Session = Depends(get_db)):
    try:
        # Get all quotations
        quotations = db.query(QuotationForm).order_by(QuotationForm.id.asc()).all()
        
        # Prepare the response
        results = []
        for quotation in quotations:
            # Get details for this quotation
            details = db.query(QuotationDetails).filter(
                QuotationDetails.quotationform_id == quotation.id
            ).all()
            
            # Convert details to list of dictionaries
            details_list = []
            for detail in details:
                detail_dict = {
                    "id": detail.id,
                    "sample": detail.sample,
                    "description": detail.description,
                    "specification": detail.specification,
                    "qty": detail.qty,
                    "unit": detail.unit,
                    "unit_rate_in_rs": detail.unit_rate_in_rs,
                    "total_cost": detail.total_cost
                }
                details_list.append(detail_dict)
            
            # Create a complete dictionary with all fields from the quotation
            quotation_dict = {
                "id": quotation.id,
                "centre": quotation.centre,
                "lab": quotation.lab,
                "enq_no": quotation.enq_no,
                "date": quotation.date,
                "customer_details": quotation.customer_details,
                "contact_person": quotation.contact_person,
                "designation": quotation.designation,
                "department": quotation.department,
                "mobile_number": quotation.mobile_number,
                "phone_number": quotation.phone_number,
                "email_id": quotation.email_id,
                "enquiry_ref_and_date": quotation.enquiry_ref_and_date,
                "customer_code": quotation.customer_code,
                "gst_details": quotation.gst_details,
                "subject": quotation.subject,
                "total": quotation.total,
                "activity_note_1": quotation.activity_note_1,
                "activity_note_2": quotation.activity_note_2,
                "activity_note_3": quotation.activity_note_3,
                "activity_note_4": quotation.activity_note_4,
                "activity_note_5": quotation.activity_note_5,
                "payment": quotation.payment,
                "delivery_period": quotation.delivery_period,
                "scope_note_1": quotation.scope_note_1,
                "scope_note_2": quotation.scope_note_2,
                "scope_note_3": quotation.scope_note_3,
                "scope_note_4": quotation.scope_note_4,
                "place_of_work": quotation.place_of_work,
                "ot_charges": quotation.ot_charges,
                "terms_and_conditions_1": quotation.terms_and_conditions_1,
                "terms_and_conditions_2": quotation.terms_and_conditions_2,
                "no_of_person_visiting_1": quotation.no_of_person_visiting_1,
                "no_of_person_visiting_2": quotation.no_of_person_visiting_2,
                "status":quotation.status,
                "remarks": quotation.remarks,
                "details": details_list
            }
            
            results.append(quotation_dict)
        
        return results
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving quotations: {str(e)}"
        )
    


@router.get("/ppm-qoutation", response_model=None)
def get_all_quotations(db: Session = Depends(get_db)):
    try:
        # Get all quotations
        quotations = db.query(PpmQuotationForm).order_by(PpmQuotationForm.id.asc()).all()

        # Prepare the response
        results = []
        for quotation in quotations:
            # Get details for this quotation
            details = db.query(PpmQuotationDetails).filter(
                PpmQuotationDetails.quotationform_id == quotation.id
            ).all()
            
            # Convert details to list of dictionaries
            details_list = []
            for detail in details:
                detail_dict = {
                    "id": detail.id,
                    "sample": detail.sample,
                    "description": detail.description,
                    "specification": detail.specification,
                    "sac_code":detail.sac_code,
                    "qty": detail.qty,
                    "unit": detail.unit,
                    "unit_rate_in_rs": detail.unit_rate_in_rs,
                    "total_cost": detail.total_cost
                }
                details_list.append(detail_dict)
            
            # Create a complete dictionary with all fields from the quotation
            quotation_dict = {
                "id": quotation.id,
                "qoutation_no": quotation.quotation_no,
                "date": quotation.date,
                "customer_details": quotation.customer_details,
                "contact_person": quotation.contact_person,
                "designation": quotation.designation,
                "department": quotation.department,
                "mobile_number": quotation.mobile_number,
                "phone_number": quotation.phone_number,
                "email_id": quotation.email_id,
                "enquiry_ref_and_date": quotation.enquiry_ref_and_date,
                "customer_code": quotation.customer_code,
                "gst_details": quotation.gst_details,
                "subject": quotation.subject,
                "total": quotation.total,
                "delivery_period": quotation.delivery_period,
                "scope_of_work": quotation.scope_of_work,
                "place_of_work": quotation.place_of_work,
                "status":quotation.status,
                "remarks": quotation.remarks,
                "details": details_list
            }
            
            results.append(quotation_dict)
        
        return results
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving quotations: {str(e)}"
        )


@router.put("/{quotation_id}/status", response_model=StatusUpdateResponse)
def update_quotation_status(
    quotation_id: int, 
    status_data: QuotationStatusOnly, 
    db: Session = Depends(get_db)
):
    try:
        # Query the quotation form by ID
        quotation = db.query(QuotationForm).filter(QuotationForm.id == quotation_id).first()
        
        if not quotation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Quotation with ID {quotation_id} not found"
            )
        
        # Update the status
        quotation.status = status_data.status
        
        # Commit the changes to the database
        db.commit()
        db.refresh(quotation)
        
        # Return success response
        return {
            "id": quotation.id,
            "status": quotation.status,
            "message": "Quotation status updated successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        # Rollback in case of error
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating quotation status: {str(e)}"
        )

# Update remarks endpoint
@router.put("/{quotation_id}/remarks", response_model=RemarksUpdateResponse)
def update_quotation_remarks(
    quotation_id: int, 
    remarks_data: QuotationRemarksOnly, 
    db: Session = Depends(get_db)
):
    try:
        # Query the quotation form by ID
        quotation = db.query(QuotationForm).filter(QuotationForm.id == quotation_id).first()
        
        if not quotation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Quotation with ID {quotation_id} not found"
            )
        
        # Update the remarks
        quotation.remarks = remarks_data.remarks
        
        # Commit the changes to the database
        db.commit()
        db.refresh(quotation)
        
        # Return success response
        return {
            "id": quotation.id,
            "remarks": quotation.remarks,
            "message": "Quotation remarks updated successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        # Rollback in case of error
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating quotation remarks: {str(e)}"
        )
    


