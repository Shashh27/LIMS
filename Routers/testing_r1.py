from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from Database.db import get_db
from pydantic_schema.request_body import AllowableValuesCalibrationSchema, AutocollimatorAnalogueBase, AutocollimatorAnalogueDetailsResponse, AutocollimatorCalibrationCreate, AutocollimatorCalibrationResponse, AutocollimatorDigitalCreate, AutocollimatorDigitalDetailsBase, AutocollimatorDigitalResponse, AutocollimatorDigitalXBase, AutocollimatorDigitalYBase, AutocollimatorMainScaleBase, ClinometerBubbleUpdate, ClinometerDetailsBase, ClinometerDrumUpdate, ClinometerMainUpdate, ClinometerResponse, ClinometerUpdate, DepthGaugeCalibrationRequest, DepthGaugeCalibrationSchema, DepthGaugeDetailsSchema, DepthMicroCheckerRequest, ElecLevelCalibrationRequest, ElecLevelCalibrationResponse, ElecLevelDetailsSchema, ElecLevelGeometricalParametersSchema, ElecLevelMechanicalCalibrationSchema, ExternalMicrometerAnalogueRequest, ExternalMicrometerDigitalRequest, FirstSheetBase, FirstSheetEquipmentSchema, FirstSheetEquipmentsBase, FirstSheetSchema, FrameLevelCalibrationRequest, InclinometerAnalogueRequest, InclinometerDetailsBase, InclinometerResponse, InclinometerUpdate, InclinometerXAxisUpdate, InclinometerYAxisUpdate, IndexingTableCalibrationRequest, IndexingTableCalibrationResponse, IndexingTableDetailsSchema, IndexingTableMechanicalCalibrationSchema, InterchangeableAnvilsCalibrationSchema, LaserMicrometerBase, LaserMicrometerCreate, LaserMicrometerDetailsResponse, LaserMicrometerPUT, LaserMicrometerResponse, LengthBarBase, LengthBarCalibrationCreate, LengthBarCalibrationPUT, LengthBarCalibrationResponse, LengthBarDetailsResponse, LongSlip300Base, LongSlip300CalibrationCreate, LongSlip300Calibrationput, LongSlip300DetailsResponse, LongSlip300Response, MetrologicalSchema, MicrometerThimbleCalibrationSchema, PartialSurfaceContactSchema, RotaryTableCalibrationRequest, RotaryTableCalibrationResponse, RotaryTableDetailsSchema, RotaryTableMechanicalCalibrationSchema, SettingGaugeRodsCalibrationSchema, SpiritLevelBase, SpiritLevelBubbleConsistencyResponse, SpiritLevelCalibrationCreate, SpiritLevelCalibrationput, SpiritLevelDetailsResponse, SpiritLevelGeometricalParametersResponse, SpiritLevelReportResponse, VernierCaliperCalibrationRequest
from orm_models.models import AllowableValuesForLC_Micrometer, AllowableValuesForLC_MicrometerDetails, AutocollimatorAnalogue, AutocollimatorDetails, AutocollimatorDigital, AutocollimatorDigitalDetails, AutocollimatorDigitalYaxis, AutocollimatorMainScale, ClinometerCalibration, ClinometerCalibrationDetails, ClinometerCalibrationDrum, ClinometerCalibrationMain, DepthMicroChecker, DepthMicroCheckerAnvilBlock, DepthMicroCheckerDetails, ElecLevelDetails, ElecLevelGeometricalParameters, ElecLevelMechanicalCalibration, ExternalMicrometer, ExternalMicrometerAllowableValuesDigital, ExternalMicrometerDigitalDetails, ExternalMicrometerDigtal, ExternalMicrometerDigtalAnvils, ExternalMicrometerSettingGaugeRods, FirstSheet, FirstSheetEquipments, FrameLevelCalibrationBubbleAccuracy, FrameLevelCalibrationBubbleConsistency, FrameLevelDetails, FrameLevelGeometricalCalibration, Inclinometer_Dig_XAxis, Inclinometer_Dig_YAxis, InclinometerAnalogue, InclinometerAnalogueDetails, InclinometerDigDetails, IndexingTableDetails, IndexingTableMechanicalCalibration, InterchangableAnvils, LaserMicrometer, LaserMicrometerDetails, LengthBar, LengthBarDetails, LongSlip300, LongSlip300Details, MicrometerSettingGaugeRods, RotaryTableMechanicalCalibration, RotaryTableMechanicalCalibrationDetails, SpiritLevel, SpiritLevelBubbleConsistency, SpiritLevelDetails, SpiritLevelGeometricalParameters, VernierCaliperCalibration, VernierCaliperCalibration2, VernierCaliperCalibration3, VernierCaliperCalibration4, VernierCaliperCalibration5, VernierCaliperCalibration6, VernierCaliperCalibrationDetails, VernierDepthGaugeCalibration, VernierDepthGaugeCalibrationDetails, VernierDepthGaugeCalibrationMetrological, VernierDepthGaugeCalibrationPartialSurfaceContact

router = APIRouter(
    prefix="/testing",
    tags=["Testing_R1"]
)

@router.post("/autocollimatorAnalog", status_code=status.HTTP_201_CREATED)
def create_autocollimator_calibration(
    data: AutocollimatorCalibrationCreate, 
    db: Session = Depends(get_db)
):
    try:
        first_sheet = FirstSheet(**data.first_sheet.dict())
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        equipment_entries = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(equipment_entries)

        db.add_all([
            AutocollimatorAnalogue(  certificate_id=data.certificate_id,test_number=data.test_number,  **analogue.dict()
            ) for analogue in data.analogue_data
        ])

        db.add_all([
            AutocollimatorMainScale( certificate_id=data.certificate_id,  test_number=data.test_number, **mainscale.dict()
            ) for mainscale in data.mainscale_data
        ])

        db.commit()
        return {"message": "Autocollimator calibration data saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/autocollimatorAnalog/{test_no}", response_model=AutocollimatorCalibrationResponse)
def get_autocollimator_calibration_report(test_no: str, db: Session = Depends(get_db)):
    try:
        # Fetch analogue readings
        analogue_data = db.query(AutocollimatorAnalogue).filter(
            AutocollimatorAnalogue.test_number == test_no
        ).all()
        if not analogue_data:
            raise HTTPException(status_code=404, detail="No Autocollimator report found.")

        # Extract certificate_id
        certificate_id = analogue_data[0].certificate_id if analogue_data else None
        if not certificate_id:
            raise HTTPException(status_code=404, detail="Certificate ID not found.")

        # Fetch main scale readings
        mainscale_data = db.query(AutocollimatorMainScale).filter(
            AutocollimatorMainScale.test_number == test_no
        ).all()

        # Fetch First Sheet details
        first_sheet = db.query(FirstSheet).filter(
            FirstSheet.test_number == test_no
        ).first()
        first_sheet_equipments = []
        if first_sheet:
            first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all()

        # Fetch Details (Method and Notes)
        details = db.query(AutocollimatorDetails).filter(
            AutocollimatorDetails.certificate_id == certificate_id
        ).first()

        first_sheet_data = FirstSheetBase(**first_sheet.__dict__).dict() if first_sheet else None

        # Create details response with default values if details is None
        details_response = None
        if details:
            details_response = AutocollimatorAnalogueDetailsResponse(
                method=details.method if hasattr(details, 'method') else None,
                note=details.note if hasattr(details, 'note') else None
            )

        return AutocollimatorCalibrationResponse(
            certificate_id=certificate_id,
            test_number=test_no,
            first_sheet=first_sheet_data,
            first_sheet_equipments=[FirstSheetEquipmentsBase(**eq.__dict__).dict() for eq in first_sheet_equipments] if first_sheet_equipments else None,
            analogue_data=[AutocollimatorAnalogueBase(**data.__dict__) for data in analogue_data],
            mainscale_data=[AutocollimatorMainScaleBase(**data.__dict__) for data in mainscale_data],
            details=details_response
        )
    except Exception as e:
        # Log the full error for debugging
        print(f"Error in autocollimator endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    

@router.put("/autocollimatorAnalog/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_autocollimator_calibration(
    certificate_id: int,
    test_no: int,
    data: AutocollimatorCalibrationCreate,
    db: Session = Depends(get_db)
):
    try:
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")
        
        for key, value in data.first_sheet.dict(exclude_unset=True).items():
            setattr(first_sheet, key, value)
        
        db.commit()
        db.refresh(first_sheet)
        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        
        new_equipments = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(new_equipments)

        db.query(AutocollimatorAnalogue).filter(
            AutocollimatorAnalogue.certificate_id == certificate_id, 
            AutocollimatorAnalogue.test_number == str(test_no)
        ).delete()
        
        new_analogue_data = [
            AutocollimatorAnalogue( certificate_id=certificate_id, test_number=test_no,**analogue.dict()
            ) for analogue in data.analogue_data
        ]
        db.add_all(new_analogue_data)

        db.query(AutocollimatorMainScale).filter(
            AutocollimatorMainScale.certificate_id == certificate_id, 
            AutocollimatorMainScale.test_number == str(test_no)
        ).delete()
        
        new_mainscale_data = [
            AutocollimatorMainScale( certificate_id=certificate_id,test_number=test_no,**mainscale.dict()
            ) for mainscale in data.mainscale_data
        ]
        db.add_all(new_mainscale_data)

        db.commit()
        return {"message": "Autocollimator calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


    
@router.post("/autocollimatordigital", status_code=status.HTTP_201_CREATED)
def create_autocollimator_calibration(
    data: AutocollimatorDigitalCreate, 
    db: Session = Depends(get_db)
):
    try:
        first_sheet = FirstSheet(**data.first_sheet.dict())
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        equipment_entries = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(equipment_entries)

        # Save Autocollimator Digital X-Axis Data
        db.add_all([
            AutocollimatorDigital(certificate_id=data.certificate_id,test_number=data.test_number,**reading.dict()
            ) for reading in data.x_axis
        ])

        # Save Autocollimator Digital Y-Axis Data
        db.add_all([
            AutocollimatorDigitalYaxis(certificate_id=data.certificate_id,test_number=data.test_number,**reading.dict()
            ) for reading in data.y_axis
        ])

        # Commit changes
        db.commit()
        return {"message": "Autocollimator Digital calibration data saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/autocollimatordigital/{test_no}", response_model=AutocollimatorDigitalResponse)
def get_autocollimator_digital_calibration(test_no: str, db: Session = Depends(get_db)):
    try:
        # Fetch X-Axis Data
        x_axis_data = db.query(AutocollimatorDigital).filter(
            AutocollimatorDigital.test_number == test_no
        ).all()

        if not x_axis_data:
            raise HTTPException(status_code=404, detail="No Autocollimator Digital report found.")

        # Extract certificate_id
        certificate_id = x_axis_data[0].certificate_id if x_axis_data else None
        if not certificate_id:
            raise HTTPException(status_code=404, detail="Certificate ID not found.")

        # Fetch Y-Axis Data
        y_axis_data = db.query(AutocollimatorDigitalYaxis).filter(
            AutocollimatorDigitalYaxis.test_number == test_no
        ).all()

        # Fetch First Sheet details
        first_sheet = db.query(FirstSheet).filter(
            FirstSheet.test_number == test_no
        ).first()
        first_sheet_equipments = []
        if first_sheet:
            first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all()

        # Fetch Details (Method and Notes)
        details = db.query(AutocollimatorDigitalDetails).filter(
            AutocollimatorDigitalDetails.certificate_id == certificate_id
        ).first()

        first_sheet_data = FirstSheetBase(**first_sheet.__dict__) if first_sheet else None

        first_sheet_equipments_data = [
            FirstSheetEquipmentsBase(**eq.__dict__) for eq in first_sheet_equipments
        ] if first_sheet_equipments else []

        return AutocollimatorDigitalResponse(
            certificate_id=certificate_id,
            test_number=test_no,
            first_sheet=first_sheet_data.model_dump() if first_sheet_data else None,
            first_sheet_equipments=[eq.model_dump() for eq in first_sheet_equipments_data] if first_sheet_equipments_data else None,
            x_axis=[AutocollimatorDigitalXBase(**data.__dict__) for data in x_axis_data],
            y_axis=[AutocollimatorDigitalYBase(**data.__dict__) for data in y_axis_data],
            details=AutocollimatorDigitalDetailsBase(**details.__dict__) if details else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/autocollimatordigital/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_autocollimator_digital(
    certificate_id: int,
    test_no: int,
    data: AutocollimatorDigitalCreate,
    db: Session = Depends(get_db)
):
    try:
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")

        for key, value in data.first_sheet.dict(exclude_unset=True).items():
            setattr(first_sheet, key, value)
        db.commit()
        db.refresh(first_sheet)

        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        new_equipments = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(new_equipments)

        db.query(AutocollimatorDigital).filter(
            AutocollimatorDigital.certificate_id == certificate_id, AutocollimatorDigital.test_number == str(test_no)
        ).delete()

        db.query(AutocollimatorDigitalYaxis).filter(
            AutocollimatorDigitalYaxis.certificate_id == certificate_id, AutocollimatorDigitalYaxis.test_number == str(test_no)
        ).delete()

        new_x_values = [
            AutocollimatorDigital( certificate_id=certificate_id,  test_number=test_no, **value.dict() )
            for value in data.x_axis
        ]
        db.add_all(new_x_values)

        new_y_values = [
            AutocollimatorDigitalYaxis(certificate_id=certificate_id, test_number=test_no, **value.dict() )
            for value in data.y_axis
        ]
        db.add_all(new_y_values)

        db.commit()
        return {"message": "Autocollimator Digital calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/clinometer", status_code=status.HTTP_201_CREATED)
def create_clinometer_calibration(data: ClinometerUpdate, db: Session = Depends(get_db)):
    try:
        with db.begin():
            # Remove duplicate test_number before passing to FirstSheet
            first_sheet_data = data.first_sheet.dict()
            first_sheet_data.pop("test_number", None)  # Remove if exists

            first_sheet = FirstSheet(**first_sheet_data, test_number=data.test_number)
            db.add(first_sheet)
            db.flush()
            
            equipment_entries = [
                FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
                for item in data.first_sheet_equipments
            ]
            db.add_all(equipment_entries)
            
            if data.bubble_calibration:
                bubble_entries = [
                    ClinometerCalibration(certificate_id=data.certificate_id, test_number=data.test_number, **bubble.dict())
                    for bubble in data.bubble_calibration
                ]
                db.add_all(bubble_entries)
            
            if data.drum_calibration:
                drum_entries = [
                    ClinometerCalibrationDrum(certificate_id=data.certificate_id, test_number=data.test_number, **drum.dict())
                    for drum in data.drum_calibration
                ]
                db.add_all(drum_entries)
            
            if data.main_calibration:
                main_entries = [
                    ClinometerCalibrationMain(certificate_id=data.certificate_id, test_number=data.test_number, **main.dict())
                    for main in data.main_calibration
                ]
                db.add_all(main_entries)
        db.commit()
        
        return {"message": "Clinometer calibration data saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/clinometer/{test_no}", response_model=ClinometerResponse)
def get_clinometer_calibration(
    test_no: str,
    db: Session = Depends(get_db)
):
    try:
        # Fetch clinometer calibration data using test_number
        bubble_data = db.query(ClinometerCalibration).filter(ClinometerCalibration.test_number == test_no).all()
        drum_data = db.query(ClinometerCalibrationDrum).filter(ClinometerCalibrationDrum.test_number == test_no).all()
        main_data = db.query(ClinometerCalibrationMain).filter(ClinometerCalibrationMain.test_number == test_no).all()

        if not bubble_data and not drum_data and not main_data:
            raise HTTPException(status_code=404, detail="No Clinometer calibration data found.")

        certificate_id = bubble_data[0].certificate_id if bubble_data else (drum_data[0].certificate_id if drum_data else main_data[0].certificate_id)

        details = db.query(ClinometerCalibrationDetails).filter_by(certificate_id=certificate_id).first() if certificate_id else None
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_no).first()
        first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all() if first_sheet else []

        # Convert test_number to string for Pydantic schema compatibility
        first_sheet_data = FirstSheetBase(**first_sheet.__dict__) if first_sheet else None
        if first_sheet_data:
            first_sheet_data.test_number = str(first_sheet_data.test_number)

        first_sheet_equipments_data = [FirstSheetEquipmentsBase(**eq.__dict__) for eq in first_sheet_equipments] if first_sheet_equipments else None

        return ClinometerResponse(
            certificate_id=certificate_id,
            test_number=str(test_no),
            first_sheet=first_sheet_data.model_dump() if first_sheet_data else None,
            first_sheet_equipments=[eq.model_dump() for eq in first_sheet_equipments_data] if first_sheet_equipments_data else None,
            bubble_calibration=[ClinometerBubbleUpdate(**b.__dict__) for b in bubble_data],
            drum_calibration=[ClinometerDrumUpdate(**d.__dict__) for d in drum_data],
            main_calibration=[ClinometerMainUpdate(**m.__dict__) for m in main_data],
            details=ClinometerDetailsBase(**details.__dict__) if details else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/clinometer/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_clinometer_calibration(
    certificate_id: int,
    test_no: int,
    data: ClinometerUpdate,
    db: Session = Depends(get_db)
):
    try:
        # Fetch existing first_sheet using test_no
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")
        
        # Update first_sheet fields
        for key, value in data.first_sheet.dict(exclude_unset=True).items():
            setattr(first_sheet, key, value)
        
        db.commit()
        db.refresh(first_sheet)

        # Delete existing equipment entries
        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        
        # Add new equipment entries
        new_equipments = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(new_equipments)

        # Delete existing Clinometer calibration values
        db.query(ClinometerCalibration).filter(
            ClinometerCalibration.certificate_id == certificate_id, ClinometerCalibration.test_number == str(test_no)
        ).delete()

        db.query(ClinometerCalibrationDrum).filter(
            ClinometerCalibrationDrum.certificate_id == certificate_id, ClinometerCalibrationDrum.test_number == str(test_no)
        ).delete()

        db.query(ClinometerCalibrationMain).filter(
            ClinometerCalibrationMain.certificate_id == certificate_id, ClinometerCalibrationMain.test_number == str(test_no)
        ).delete()

        # Add new Clinometer calibration values
        new_bubble_values = [
            ClinometerCalibration(
                certificate_id=certificate_id,test_number=test_no,**value.dict()
            )
            for value in data.bubble_calibration
        ]
        db.add_all(new_bubble_values)

        new_drum_values = [
            ClinometerCalibrationDrum(
                certificate_id=certificate_id,test_number=test_no,**value.dict()
            )
            for value in data.drum_calibration
        ]
        db.add_all(new_drum_values)

        new_main_values = [
            ClinometerCalibrationMain(
                certificate_id=certificate_id,test_number=test_no,**value.dict()
            )
            for value in data.main_calibration
        ]
        db.add_all(new_main_values)

        db.commit()
        return {"message": "Clinometer calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/depth-micro-checker", status_code=status.HTTP_201_CREATED)
def create_depth_micro_checker(
    data: DepthMicroCheckerRequest,
    db: Session = Depends(get_db)
):
    try:
        # Create First Sheet entry
        first_sheet = FirstSheet(**data.first_sheet.dict(exclude={'equipment'}))
        first_sheet.test_number = data.test_number
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        # Create First Sheet Equipment entries
        equipment_entries = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet.equipment
        ]
        db.add_all(equipment_entries)

        # Create Depth Micro Checker entries
        depth_micro_entries = [
            DepthMicroChecker(
                certificate_id=data.certificate_id,
                test_number=data.test_number,
                nominal_size=calibration.nominal_size,
                B_side_calibrated_values=calibration.B_side_calibrated_values,
                A_side_calibrated_values=calibration.A_side_calibrated_values,
                Parallelity_between_A_side_and_B_side_Calibratedvalues=calibration.Parallelity_between_A_side_and_B_side_Calibratedvalues
            )
            for calibration in data.depth_micro_checker_calibrations
        ]
        db.add_all(depth_micro_entries)

        # Create Anvil Block entries
        anvil_block_entries = [
            DepthMicroCheckerAnvilBlock(
                certificate_id=data.certificate_id,
                test_number=data.test_number,
                anvil_block_size=anvil.anvil_block_size,
                calibrated_values=anvil.calibrated_values
            )
            for anvil in data.anvil_block_calibrations
        ]
        db.add_all(anvil_block_entries)
        
        db.commit()
        return {"message": "Depth Micro Checker data saved successfully"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/depth-micro-checker")
def get_depth_micro_checker(
    test_number: str,
    db: Session = Depends(get_db)
):
    try:
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test number")

        first_sheet_equipments = db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).all()

        # Fetch Depth Micro Checker Data
        depth_micro_checker_data = db.query(DepthMicroChecker).filter(DepthMicroChecker.test_number == test_number).all()
        
        # Fetch Anvil Block Calibrations
        anvil_block_data = db.query(DepthMicroCheckerAnvilBlock).filter(DepthMicroCheckerAnvilBlock.test_number == test_number).all()
        
        # Fetch Details
        # Assuming we can get certificate_id from one of the depth micro checker entries
        if depth_micro_checker_data:
            certificate_id = depth_micro_checker_data[0].certificate_id
            details = db.query(DepthMicroCheckerDetails).filter(DepthMicroCheckerDetails.certificate_id == certificate_id).first()
        else:
            details = None
        
        return {
            "test_number": test_number,
            "first_sheet": {
                "ulr_no": first_sheet.ulr_no,
                "report_issued_date": first_sheet.report_issued_date,
                "customer_name_and_address": first_sheet.customer_name_and_address,
                "item_description": first_sheet.item_description,
                "identification_no": first_sheet.identification_no,
                "Sl_no": first_sheet.Sl_no,
                "DC_no": first_sheet.DC_no,
                "DC_no_dated": first_sheet.DC_no_dated,
                "PO_no": first_sheet.PO_no,
                "PO_no_dated": first_sheet.PO_no_dated,
                "date_of_calibration": first_sheet.date_of_calibration,
                "place_of_calibration": first_sheet.place_of_calibration,
                "reference_document_based_on_IS": first_sheet.reference_document_based_on_IS,
                "reference_document_based_on_IS_and_WP_no": first_sheet.reference_document_based_on_IS_and_WP_no,
                "temperature_during_calibration": first_sheet.temperature_during_calibration,
                "uncertainity_of_measurement": first_sheet.uncertainity_of_measurement,
                "equipments": [{"equipment_details": eq.equipment_details} for eq in first_sheet_equipments]
            },
            "depth_micro_checker_calibrations": [
                {
                    "nominal_size": item.nominal_size,
                    "B_side_calibrated_values": item.B_side_calibrated_values,
                    "A_side_calibrated_values": item.A_side_calibrated_values,
                    "Parallelity_between_A_side_and_B_side_Calibratedvalues": item.Parallelity_between_A_side_and_B_side_Calibratedvalues
                } for item in depth_micro_checker_data
            ],
            "anvil_block_calibrations": [
                {
                    "anvil_block_size": item.anvil_block_size,
                    "calibrated_values": item.calibrated_values
                } for item in anvil_block_data
            ],
            "details": {
                "method_of_calibration": details.method_of_calibration if details else None,
                "note": details.note if details else None
            } if details else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




@router.post("/inclinometer-analogue", status_code=status.HTTP_201_CREATED)
def create_inclinometer_analogue(
    data: InclinometerAnalogueRequest,
    db: Session = Depends(get_db)
):
    try:
        
        test_number_str = str(data.test_number)
        

        first_sheet_data = data.first_sheet.dict(exclude={'equipment'})
        first_sheet_data['test_number'] = test_number_str

        # Insert into First Sheet
        first_sheet_entry = FirstSheet(**first_sheet_data)
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Inclinometer Analogue Calibrations
        for calibration in data.inclinometer_calibrations:
            db.add(InclinometerAnalogue(
                inclinometer_scale_readings=calibration.inclinometer_scale_readings,
                calibrated_values=calibration.calibrated_values,
                test_number=test_number_str,
                certificate_id=data.certificate_id
            ))

        # Insert Details
        details = InclinometerAnalogueDetails(
            method_of_calibration=data.details.method_of_calibration,
            note=data.details.note,
            certificate_id=data.certificate_id
        )
        db.add(details)

        db.commit()
        return {"message": "Inclinometer Analogue data saved successfully", "test_number": test_number_str}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/inclinometer-analogue")
def get_inclinometer_analogue(
    test_number: str,
    db: Session = Depends(get_db)
):
    try:
        
        test_number_str = str(test_number)
        
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number_str).first()
        if not first_sheet:
            # Try with integer conversion if string comparison fails
            try:
                test_number_int = int(test_number)
                first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number_int).first()
            except ValueError:
                pass
                
            if not first_sheet:
                raise HTTPException(status_code=404, detail=f"No first sheet data found for test number: {test_number}")

        first_sheet_equipments = db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).all()

        # Fetch Inclinometer Analogue Data 
        inclinometer_data = db.query(InclinometerAnalogue).filter(
            InclinometerAnalogue.test_number == test_number_str
        ).all()
        
        if not inclinometer_data:
            try:
                test_number_int = int(test_number)
                inclinometer_data = db.query(InclinometerAnalogue).filter(
                    InclinometerAnalogue.test_number == test_number_int
                ).all()
            except ValueError:
                pass
                
        # Fetch Details
        # Try to get certificate_id from first_sheet if available, otherwise from inclinometer data
        certificate_id = None
        if hasattr(first_sheet, 'certificate_id') and first_sheet.certificate_id:
            certificate_id = first_sheet.certificate_id
        elif inclinometer_data:
            certificate_id = inclinometer_data[0].certificate_id
            
        details = None
        if certificate_id:
            details = db.query(InclinometerAnalogueDetails).filter(
                InclinometerAnalogueDetails.certificate_id == certificate_id
            ).first()
        
        return {
            "test_number": test_number,
            "first_sheet": {
                "ulr_no": first_sheet.ulr_no,
                "report_issued_date": first_sheet.report_issued_date,
                "customer_name_and_address": first_sheet.customer_name_and_address,
                "item_description": first_sheet.item_description,
                "identification_no": first_sheet.identification_no,
                "Sl_no": first_sheet.Sl_no,
                "DC_no": first_sheet.DC_no,
                "DC_no_dated": first_sheet.DC_no_dated,
                "PO_no": first_sheet.PO_no,
                "PO_no_dated": first_sheet.PO_no_dated,
                "date_of_calibration": first_sheet.date_of_calibration,
                "place_of_calibration": first_sheet.place_of_calibration,
                "reference_document_based_on_IS": first_sheet.reference_document_based_on_IS,
                "reference_document_based_on_IS_and_WP_no": first_sheet.reference_document_based_on_IS_and_WP_no,
                "temperature_during_calibration": first_sheet.temperature_during_calibration,
                "uncertainity_of_measurement": first_sheet.uncertainity_of_measurement,
                "equipments": [{"equipment_details": eq.equipment_details} for eq in first_sheet_equipments]
            },
            "inclinometer_calibrations": [
                {
                    "inclinometer_scale_readings": item.inclinometer_scale_readings,
                    "calibrated_values": item.calibrated_values
                } for item in inclinometer_data
            ],
            "details": {
                "method_of_calibration": details.method_of_calibration if details else None,
                "note": details.note if details else None
            } if details else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



@router.post("/inclinometer-digital", status_code=status.HTTP_201_CREATED)
def create_inclinometer_calibration(data: InclinometerUpdate, db: Session = Depends(get_db)):
    try:
        # Safely handle first_sheet data if available
        first_sheet_data = data.first_sheet.dict() if data.first_sheet else {}
        first_sheet = FirstSheet(**first_sheet_data)
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        if data.first_sheet_equipments:
            equipment_entries = [
                FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
                for item in data.first_sheet_equipments
            ]
            db.add_all(equipment_entries)

        if data.x_axis:
            x_axis_entries = [
                Inclinometer_Dig_XAxis(certificate_id=data.certificate_id, test_number=data.test_number, **item.dict())
                for item in data.x_axis
            ]
            db.add_all(x_axis_entries)

        if data.y_axis:
            y_axis_entries = [
                Inclinometer_Dig_YAxis(certificate_id=data.certificate_id, test_number=data.test_number, **item.dict())
                for item in data.y_axis]
            db.add_all(y_axis_entries)

        db.commit()
        return {"message": "Inclinometer calibration data saved successfully"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/inclinometer-digital/report/{test_no}", response_model=InclinometerResponse)
def get_inclinometer_report(test_no: str, db: Session = Depends(get_db)):
    try:
        x_axis_readings = db.query(Inclinometer_Dig_XAxis).filter(Inclinometer_Dig_XAxis.test_number == test_no).all()
        y_axis_readings = db.query(Inclinometer_Dig_YAxis).filter(Inclinometer_Dig_YAxis.test_number == test_no).all()

        if not x_axis_readings and not y_axis_readings:
            raise HTTPException(status_code=404, detail="No Inclinometer data found.")

        certificate_id = x_axis_readings[0].certificate_id if x_axis_readings else None
        if not certificate_id:
            raise HTTPException(status_code=404, detail="Certificate ID not found.")

        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_no).first()

        first_sheet_equipments = []
        if first_sheet:
            first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all()

        details = db.query(InclinometerDigDetails).filter(InclinometerDigDetails.certificate_id == certificate_id).first()

        first_sheet_data = FirstSheetBase(**first_sheet.__dict__).dict() if first_sheet else None

        return InclinometerResponse(
            certificate_id=certificate_id,
            test_number=test_no,
            first_sheet=first_sheet_data,
            first_sheet_equipments=[FirstSheetEquipmentsBase(**eq.__dict__).dict() for eq in first_sheet_equipments] if first_sheet_equipments else None,
            x_axis=[InclinometerXAxisUpdate(**x.__dict__) for x in x_axis_readings],
            y_axis=[InclinometerYAxisUpdate(**y.__dict__) for y in y_axis_readings],
            details=InclinometerDetailsBase(**details.__dict__) if details else None
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/inclinometer-digital/update/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_inclinometer_calibration(
    certificate_id: int,
    test_no: int,
    data: InclinometerUpdate,
    db: Session = Depends(get_db)
):
    try:
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")

        for key, value in data.first_sheet.dict(exclude_unset=True).items():
            setattr(first_sheet, key, value)
        db.commit()
        db.refresh(first_sheet)

        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        new_equipments = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments]
        db.add_all(new_equipments)

        db.query(Inclinometer_Dig_XAxis).filter(
            Inclinometer_Dig_XAxis.certificate_id == certificate_id, Inclinometer_Dig_XAxis.test_number == str(test_no)
        ).delete()

        db.query(Inclinometer_Dig_YAxis).filter(
            Inclinometer_Dig_YAxis.certificate_id == certificate_id, Inclinometer_Dig_YAxis.test_number == str(test_no)
        ).delete()

        new_x_values = [
            Inclinometer_Dig_XAxis(certificate_id=certificate_id,test_number=test_no,**value.dict() )
            for value in data.x_axis
        ]
        db.add_all(new_x_values)

        new_y_values = [
            Inclinometer_Dig_YAxis(certificate_id=certificate_id,test_number=test_no,**value.dict())
            for value in data.y_axis
        ]
        db.add_all(new_y_values)

        db.commit()
        return {"message": "Inclinometer calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

# First add the Pydantic model for the response
class ReportListItem(BaseModel):
    test_no: int
    certificate_id: int
    activity: str

@router.get("/reports", response_model=List[ReportListItem])
def get_all_reports(db: Session = Depends(get_db)):
    try:
        reports = []
        
        # Get Autocollimator Analogue reports
        analogue_reports = db.query(AutocollimatorAnalogue.test_number, AutocollimatorAnalogue.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Autocollimator Analoge"} for r in analogue_reports])
        
        # Get Autocollimator Digital reports
        digital_reports = db.query(AutocollimatorDigital.test_number, AutocollimatorDigital.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Autocollimator Digital"} for r in digital_reports])
        
        # Get Clinometer reports
        clinometer_reports = db.query(ClinometerCalibration.test_number, ClinometerCalibration.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Clinometer"} for r in clinometer_reports])
        
        # Get Depth Micro Checker reports
        depth_reports = db.query(DepthMicroChecker.test_number, DepthMicroChecker.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Depth Micro Checker"} for r in depth_reports])
        
        # Get Inclinometer Analogue reports
        incl_analogue_reports = db.query(InclinometerAnalogue.test_number, InclinometerAnalogue.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Inclinometer Analoge"} for r in incl_analogue_reports])
        
        # Get Inclinometer Digital reports
        incl_digital_reports = db.query(Inclinometer_Dig_XAxis.test_number, Inclinometer_Dig_XAxis.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Inclinometer Digital"} for r in incl_digital_reports])
        
        laser_micrometer_reports = db.query(LaserMicrometer.test_number, LaserMicrometer.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Laser Micrometer"} for r in laser_micrometer_reports])
        
        length_bar_reports = db.query(LengthBar.test_number, LengthBar.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Length Bar"} for r in length_bar_reports])
        
        long_slip300_reports = db.query(LongSlip300.test_number, LongSlip300.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Long Slip 300"} for r in long_slip300_reports])

        spirit_level_reports = db.query(SpiritLevel.test_number, SpiritLevel.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Spirit level"} for r in spirit_level_reports])
        
        external_micrometer_analogue_reports = db.query(ExternalMicrometer.test_number, ExternalMicrometer.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "External Micrometer Analogue"} for r in external_micrometer_analogue_reports])

        external_micrometer_digital_reports = db.query(ExternalMicrometerDigtal.test_number, ExternalMicrometerDigtal.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "External Micrometer Digital"} for r in external_micrometer_digital_reports])

        vernier_depth_gauge_reports = db.query(VernierDepthGaugeCalibration.test_number, VernierDepthGaugeCalibration.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Vernier Depth Gauge"} for r in vernier_depth_gauge_reports])
        
        electronic_level_reports = db.query(ElecLevelMechanicalCalibration.test_number, ElecLevelMechanicalCalibration.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Electronic Level"} for r in electronic_level_reports])
        
        frame_level_reports = db.query(FrameLevelCalibrationBubbleAccuracy.test_number, FrameLevelCalibrationBubbleAccuracy.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Frame level"} for r in frame_level_reports])
        
        indexing_table_reports = db.query(IndexingTableMechanicalCalibration.test_number, IndexingTableMechanicalCalibration.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Indexing table"} for r in indexing_table_reports])
        
        rotary_table_reports = db.query(RotaryTableMechanicalCalibration.test_number, RotaryTableMechanicalCalibration.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Rotary table"} for r in rotary_table_reports])
        
        vernier_calibration_reports = db.query(VernierCaliperCalibration5.test_number, VernierCaliperCalibration5.certificate_id)\
            .distinct().all()
        reports.extend([{"test_no": r.test_number, "certificate_id": r.certificate_id, 
                        "activity": "Vernier Caliper"} for r in vernier_calibration_reports])

        return reports
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )
    


@router.post("/laser_micrometer", status_code=status.HTTP_201_CREATED)
def create_laser_micrometer(data: LaserMicrometerCreate, db: Session = Depends(get_db)):
    try:
        first_sheet = FirstSheet(**data.first_sheet.dict())
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        equipment_entries = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(equipment_entries)
        
        db.add_all([LaserMicrometer(certificate_id=data.certificate_id, test_number=data.test_number, **value.dict()) for value in data.values])
        db.commit()
        return {"message": "Laser Micrometer calibration data, First Sheet, and Equipments saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/laser_micrometer/{test_no}", response_model=LaserMicrometerResponse)
def get_laser_micrometer(test_no: str, db: Session = Depends(get_db)):
    try:
        values = db.query(LaserMicrometer).filter(LaserMicrometer.test_number == test_no).all()
        if not values:
            raise HTTPException(status_code=404, detail="No Laser Micrometer data found.")
        
        certificate_id = values[0].certificate_id if values else None
        details = db.query(LaserMicrometerDetails).filter_by(certificate_id=certificate_id).first() if certificate_id else None
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_no).first()
        first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all() if first_sheet else []

        first_sheet_data = FirstSheetBase(**first_sheet.__dict__) if first_sheet else None
        first_sheet_equipments_data = [FirstSheetEquipmentsBase(**eq.__dict__) for eq in first_sheet_equipments] if first_sheet_equipments else None

        return LaserMicrometerResponse(
            certificate_id=certificate_id,
            test_number=str(test_no),
            first_sheet=first_sheet_data.model_dump() if first_sheet_data else None,
            first_sheet_equipments=[eq.model_dump() for eq in first_sheet_equipments_data] if first_sheet_equipments_data else None,
            values=[LaserMicrometerBase(**val.__dict__) for val in values],
            details=LaserMicrometerDetailsResponse(**details.__dict__) if details else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/laser_micrometer/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_laser_micrometer(
    certificate_id: int,
    test_no: int,
    data: LaserMicrometerPUT,
    db: Session = Depends(get_db)
):
    try:
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")
        
        for key, value in data.first_sheet.dict(exclude_unset=True).items():
            setattr(first_sheet, key, value)
        
        db.commit()
        db.refresh(first_sheet)

        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        new_equipments = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(new_equipments)
        
        db.query(LaserMicrometer).filter(
            LaserMicrometer.certificate_id == certificate_id, LaserMicrometer.test_number == str(test_no)
        ).delete()
        
        new_values = [
            LaserMicrometer(
                certificate_id=certificate_id,
                test_number=test_no,
                actual_size=value.actual_size,
                first_set=value.first_set,
                second_set=value.second_set,
                third_set=value.third_set,
                average_error=value.average_error
            )
            for value in data.values
        ]
        db.add_all(new_values)

        db.commit()
        return {"message": "Laser Micrometer calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/lengthbar", status_code=status.HTTP_201_CREATED)
def create_length_bar_calibration(data: LengthBarCalibrationCreate, db: Session = Depends(get_db)):
    try:
        first_sheet = FirstSheet(**data.first_sheet.dict())
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        equipment_entries = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(equipment_entries)
        
        db.add_all([LengthBar(certificate_id=data.certificate_id, test_number=data.test_number, **bar.dict()) for bar in data.length_bars])
        db.commit()
        return {"message": "Length bar calibration data, First Sheet, and Equipments saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/lengthbar/{test_no}", response_model=LengthBarCalibrationResponse)
def get_length_bar_calibration(
    test_no: str,
    db: Session = Depends(get_db)
):
    try:
        # Fetch length bars using test_number
        length_bars = db.query(LengthBar).filter(LengthBar.test_number == test_no).all()
        if not length_bars:
            raise HTTPException(status_code=404, detail="No Length Bar calibration data found.")

        certificate_id = length_bars[0].certificate_id if length_bars else None
        details = db.query(LengthBarDetails).filter_by(certificate_id=certificate_id).first() if certificate_id else None
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_no).first()
        first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all() if first_sheet else []

        #  Convert `test_number` to string to match Pydantic schema
        first_sheet_data = FirstSheetBase(**first_sheet.__dict__) if first_sheet else None
        if first_sheet_data:
            first_sheet_data.test_number = str(first_sheet_data.test_number)  # 🔹 Fix: Convert to string

        first_sheet_equipments_data = [FirstSheetEquipmentsBase(**eq.__dict__) for eq in first_sheet_equipments] if first_sheet_equipments else None

        return LengthBarCalibrationResponse(
            certificate_id=certificate_id,
            test_number=str(test_no),  # 🔹 Fix: Ensure `test_number` is string
            first_sheet=first_sheet_data.model_dump() if first_sheet_data else None,
            first_sheet_equipments=[eq.model_dump() for eq in first_sheet_equipments_data] if first_sheet_equipments_data else None,
            length_bars=[LengthBarBase(**lb.__dict__) for lb in length_bars],
            details=LengthBarDetailsResponse(**details.__dict__) if details else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/lengthbar/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_length_bar_calibration(
    certificate_id: int,
    test_no: int,
    data: LengthBarCalibrationPUT,
    db: Session = Depends(get_db)
):
    try:
        # Fetch existing first_sheet using test_no
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")
        
        #  Explicitly update first_sheet fields
        for key, value in data.first_sheet.dict(exclude_unset=True).items():
            setattr(first_sheet, key, value)
        
        db.commit()  #  Explicitly commit first_sheet updates
        db.refresh(first_sheet)  #  Refresh to reflect latest changes

        #  Delete existing equipment entries
        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        
        #  Add new equipment entries
        new_equipments = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(new_equipments)

        #  Delete existing Length Bar values
        db.query(LengthBar).filter(
            LengthBar.certificate_id == certificate_id, LengthBar.test_number == str(test_no)
        ).delete()
        
        # Add new Length Bar values
        new_values = [
            LengthBar(
                certificate_id=certificate_id,
                test_number=test_no,
                length_bar_size=value.length_bar_size,
                calibrated_value=value.calibrated_value
            )
            for value in data.length_bars
        ]
        db.add_all(new_values)

        db.commit()  #Final commit to save all changes
        return {"message": "Length Bar calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        error_message = str(e) if e else "Unknown error occurred"
        raise HTTPException(status_code=500, detail=error_message)



@router.post("/longslip300", status_code=status.HTTP_201_CREATED)
def create_long_slip300_calibration(data: LongSlip300CalibrationCreate, db: Session = Depends(get_db)):
    try:
        first_sheet = FirstSheet(**data.first_sheet.dict())
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        equipment_entries = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(equipment_entries)
        
        db.add_all([
            LongSlip300(certificate_id=data.certificate_id, test_number=data.test_number, **gauge.dict()) 
            for gauge in data.gauges
        ])
        db.commit()
        return {"message": "Long Slip 300 calibration data, First Sheet, and Equipments saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/longslip300/{test_no}", response_model=LongSlip300Response)
def get_long_slip300_calibration(test_no: str, db: Session = Depends(get_db)):
    try:
        gauges = db.query(LongSlip300).filter(LongSlip300.test_number == test_no).all()
        if not gauges:
            raise HTTPException(status_code=404, detail="No Long Slip 300 calibration data found.")

        certificate_id = gauges[0].certificate_id if gauges else None
        details = db.query(LongSlip300Details).filter_by(certificate_id=certificate_id).first() if certificate_id else None
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_no).first()
        first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all() if first_sheet else []

        first_sheet_data = FirstSheetBase(**first_sheet.__dict__) if first_sheet else None
        first_sheet_equipments_data = [FirstSheetEquipmentsBase(**eq.__dict__) for eq in first_sheet_equipments] if first_sheet_equipments else []
        
        return LongSlip300Response(
            certificate_id=certificate_id,
            test_number=int(test_no),
            first_sheet=first_sheet_data.dict() if first_sheet_data else None,
            first_sheet_equipments=[eq.dict() for eq in first_sheet_equipments_data] if first_sheet_equipments_data else None,
            gauges=[LongSlip300Base(**g.__dict__).dict() for g in gauges],
            details=LongSlip300DetailsResponse(**details.__dict__).dict() if details else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/longslip300/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_long_slip300_calibration(certificate_id: int, test_no: int, data: LongSlip300Calibrationput, db: Session = Depends(get_db)):
    try:
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()

        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")
        
        for key, value in data.first_sheet.dict().items():
            setattr(first_sheet, key, value)
        
        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        new_equipments = [FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details) for item in data.first_sheet_equipments]
        db.add_all(new_equipments)
        
        db.query(LongSlip300).filter(LongSlip300.certificate_id == certificate_id, LongSlip300.test_number == test_no).delete()
        new_gauges = [LongSlip300(certificate_id=certificate_id, test_number=test_no, **gauge.dict()) for gauge in data.gauges]
        db.add_all(new_gauges)

        db.commit()
        return {"message": "Long Slip 300 calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/spirit-level", status_code=status.HTTP_201_CREATED)
def create_spirit_level_calibration(data: SpiritLevelCalibrationCreate, db: Session = Depends(get_db)):
    try:
        first_sheet = FirstSheet(**data.first_sheet.dict())
        db.add(first_sheet)
        db.commit()
        db.refresh(first_sheet)

        equipment_entries = [
            FirstSheetEquipments(report_no=first_sheet.id, equipment_details=item.equipment_details)
            for item in data.first_sheet_equipments
        ]
        db.add_all(equipment_entries)
        
        db.add_all([
            SpiritLevel(certificate_id=data.certificate_id, test_number=data.test_number, **reading.dict())
            for reading in data.readings
        ])
        
        db.add_all([
            SpiritLevelBubbleConsistency(certificate_id=data.certificate_id, test_number=data.test_number, **consistency.dict())
            for consistency in data.consistency
        ])
        
        db.add_all([
            SpiritLevelGeometricalParameters(certificate_id=data.certificate_id, test_number=data.test_number, **gp.dict())
            for gp in data.geometrical_parameters
        ])

        db.commit()
        return {"message": "Spirit Level calibration data saved successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/spirit-level/report/{test_no}", response_model=SpiritLevelReportResponse)
def get_spirit_level_report(test_no: str, db: Session = Depends(get_db)):
    try:
        readings = db.query(SpiritLevel).filter(SpiritLevel.test_number == test_no).all()
        if not readings:
            raise HTTPException(status_code=404, detail="No Spirit Level report found.")

        # Extract certificate_id from the first reading entry
        certificate_id = readings[0].certificate_id if readings else None
        if not certificate_id:
            raise HTTPException(status_code=404, detail="Certificate ID not found.")

        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_no).first()
        first_sheet_equipments = []
        if first_sheet:
            first_sheet_equipments = db.query(FirstSheetEquipments).filter_by(report_no=first_sheet.id).all()

        # Fetch details using certificate_id
        details = db.query(SpiritLevelDetails).filter(SpiritLevelDetails.certificate_id == certificate_id).first()

        consistency = db.query(SpiritLevelBubbleConsistency).filter(SpiritLevelBubbleConsistency.test_number == test_no).all()
        geometrical_parameters = db.query(SpiritLevelGeometricalParameters).filter(SpiritLevelGeometricalParameters.test_number == test_no).all()

        first_sheet_data = FirstSheetBase(**first_sheet.__dict__).dict() if first_sheet else None

        return SpiritLevelReportResponse(
            certificate_id=certificate_id,
            test_number=test_no,
            first_sheet=first_sheet_data,
            first_sheet_equipments=[FirstSheetEquipmentsBase(**eq.__dict__).dict() for eq in first_sheet_equipments] if first_sheet_equipments else None,
            readings=[SpiritLevelBase(**r.__dict__) for r in readings],
            consistency=[SpiritLevelBubbleConsistencyResponse(**c.__dict__) for c in consistency],
            geometrical_parameters=[SpiritLevelGeometricalParametersResponse(**gp.__dict__) for gp in geometrical_parameters],
            details=SpiritLevelDetailsResponse(**details.__dict__) if details else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/spirit-level/{certificate_id}/{test_no}", status_code=status.HTTP_200_OK)
def update_spirit_level(
    certificate_id: int,
    test_no: int,
    data: SpiritLevelCalibrationput,
    db: Session = Depends(get_db)
):
    try:
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == str(test_no)).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="First Sheet not found.")
        
        for key, value in data.first_sheet.dict(exclude_unset=True).items():
            setattr(first_sheet, key, value)
        
        db.commit()
        db.refresh(first_sheet)
        
        db.query(SpiritLevel).filter(
            SpiritLevel.certificate_id == certificate_id, SpiritLevel.test_number == test_no
        ).delete()
        db.add_all([
            SpiritLevel(certificate_id=certificate_id, test_number=test_no, **reading.dict())
            for reading in data.readings
        ])
        
        db.query(SpiritLevelBubbleConsistency).filter(
            SpiritLevelBubbleConsistency.certificate_id == certificate_id, SpiritLevelBubbleConsistency.test_number == test_no
        ).delete()
        db.add_all([
            SpiritLevelBubbleConsistency(certificate_id=certificate_id, test_number=test_no, **consistency.dict())
            for consistency in data.consistency
        ])
        
        db.query(SpiritLevelGeometricalParameters).filter(
            SpiritLevelGeometricalParameters.certificate_id == certificate_id, SpiritLevelGeometricalParameters.test_number == test_no
        ).delete()
        db.add_all([
            SpiritLevelGeometricalParameters(certificate_id=certificate_id, test_number=test_no, **gp.dict())
            for gp in data.geometrical_parameters
        ])
        
        db.commit()
        return {"message": "Spirit Level calibration data updated successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    


@router.post("/external-micrometer-analogue", status_code=status.HTTP_201_CREATED)
def create_external_micrometer_analogue(
    data: ExternalMicrometerAnalogueRequest,
    db: Session = Depends(get_db)
):
    try:
        

        first_sheet_data = data.first_sheet.dict(exclude={'equipment'})
        first_sheet_data['test_number'] = data.test_number

        # Insert into First Sheet
        first_sheet_entry = FirstSheet(**first_sheet_data)
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Micrometer Thimble Calibrations
        for micrometer in data.micrometer_thimble_calibrations:
            db.add(ExternalMicrometer(
                **micrometer.dict(),
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))
        
        # Insert Interchangeable Anvils Calibrations
        for anvils in data.interchangeable_anvils_calibrations:
            db.add(InterchangableAnvils(
                **anvils.dict(),
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))
        
        # Insert Setting Gauge Rods Calibrations
        for setting_gauge in data.setting_gauge_rods_calibrations:
            db.add(MicrometerSettingGaugeRods(
                **setting_gauge.dict(),
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))

        # Insert Allowable Values Calibrations (if provided)
        if data.allowable_values_calibrations:
            for allowable_value in data.allowable_values_calibrations:
                db.add(AllowableValuesForLC_Micrometer(
                    **allowable_value.dict(),
                    test_number=data.test_number,
                    certificate_id=data.certificate_id
                ))

        db.commit()
        return {"message": "Data saved successfully for both sheets"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/external-micrometer-analogue")
def get_combined_calibration(
    test_number: str,
    db: Session = Depends(get_db)
):
    try:
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test number")

        first_sheet_equipments = db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).all()

        # Fetch Second Sheet Data
        micrometer_data = db.query(ExternalMicrometer).filter(ExternalMicrometer.test_number == test_number).all()
        anvils_data = db.query(InterchangableAnvils).filter(InterchangableAnvils.test_number == test_number).all()
        setting_gauge_data = db.query(MicrometerSettingGaugeRods).filter(MicrometerSettingGaugeRods.test_number == test_number).all()

        # Fetch Allowable Values (optional)
        allowable_values = db.query(AllowableValuesForLC_Micrometer).filter(AllowableValuesForLC_Micrometer.test_number == test_number).all()

    
        allowable_values_details = []
        if hasattr(first_sheet, 'certificate_id') and first_sheet.certificate_id:
            allowable_values_details = db.query(AllowableValuesForLC_MicrometerDetails).filter(
                AllowableValuesForLC_MicrometerDetails.certificate_id == first_sheet.certificate_id
            ).all()

        return {
            "test_number": first_sheet.test_number,
            "first_sheet": {
                "ulr_no": first_sheet.ulr_no,
                "report_issued_date": first_sheet.report_issued_date,
                "customer_name_and_address": first_sheet.customer_name_and_address,
                "item_description": first_sheet.item_description,
                "identification_no": first_sheet.identification_no,
                "Sl_no": first_sheet.Sl_no,
                "DC_no": first_sheet.DC_no,
                "DC_no_dated": first_sheet.DC_no_dated,
                "PO_no": first_sheet.PO_no,
                "PO_no_dated": first_sheet.PO_no_dated,
                "date_of_calibration": first_sheet.date_of_calibration,
                "place_of_calibration": first_sheet.place_of_calibration,
                "reference_document_based_on_IS": first_sheet.reference_document_based_on_IS,
                "reference_document_based_on_IS_and_WP_no": first_sheet.reference_document_based_on_IS_and_WP_no,
                "temperature_during_calibration": first_sheet.temperature_during_calibration,
                "uncertainity_of_measurement": first_sheet.uncertainity_of_measurement,
                "equipments": [{"equipment_details": eq.equipment_details} for eq in first_sheet_equipments]
            },
            "second_sheet": {
                "micrometer_thimble_calibrations": [
                    {
                        "micrometer_reading": item.micrometer_reading,
                        "slip_gauge_size": item.slip_gauge_size,
                        "error": item.error
                    } for item in micrometer_data
                ],
                "interchangeable_anvils_calibrations": [
                    {
                        "range_of_micrometer": item.range_of_micrometer,
                        "anvil_error": item.anvil_error
                    } for item in anvils_data
                ],
                "setting_gauge_rods_calibrations": [
                    {
                        "nominal_values": item.nominal_values,
                        "calibrated_values": item.calibrated_values
                    } for item in setting_gauge_data
                ],
                "allowable_values_calibrations": [
                    {
                        "permissible_total_error_over_a_range_of_150_to_200mm": item.permissible_total_error_over_a_range_of_150_to_200mm,
                        "permissible_total_error_over_a_range_of_200_to_250mm": item.permissible_total_error_over_a_range_of_200_to_250mm,
                        "permissible_total_error_over_a_range_of_250_to_300mm": item.permissible_total_error_over_a_range_of_250_to_300mm,
                        "parallelity_of_measuring_faces_over_range_of_150_to_200mm": item.parallelity_of_measuring_faces_over_range_of_150_to_200mm,
                        "parallelity_of_measuring_faces_over_range_of_200_to_250mm": item.parallelity_of_measuring_faces_over_range_of_200_to_250mm,
                        "parallelity_of_measuring_faces_over_range_of_250_to_300mm": item.parallelity_of_measuring_faces_over_range_of_250_to_300mm,
                        "flatness_of_measuring_faces": item.flatness_of_measuring_faces
                    } for item in allowable_values
                ],
                "allowable_values_details": [
                    {
                        "method_of_calibration": item.method_of_calibration,
                        "note": item.note
                    } for item in allowable_values_details
                ]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




class ExternalMicrometerAnalogueUpdateRequest(BaseModel):
    first_sheet: FirstSheetSchema
    micrometer_thimble_calibrations: List[MicrometerThimbleCalibrationSchema]
    interchangeable_anvils_calibrations: List[InterchangeableAnvilsCalibrationSchema]
    setting_gauge_rods_calibrations: List[SettingGaugeRodsCalibrationSchema]
    allowable_values_calibrations: Optional[List[AllowableValuesCalibrationSchema]] = None

@router.put("/external-micrometer-analogue/{certificate_id}/{test_number}", status_code=status.HTTP_200_OK)
def update_external_micrometer_analogue(
    certificate_id: int,
    test_number: str,
    data: ExternalMicrometerAnalogueUpdateRequest,
    db: Session = Depends(get_db)
):
    try:
          
        # Check if test_number exists
        existing_first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not existing_first_sheet:
            raise HTTPException(status_code=404, detail="Test number not found")
            
        # Update first sheet data 
        first_sheet_data = data.first_sheet.dict(exclude={'equipment'})
        first_sheet_data['test_number'] = test_number  # Ensure we're using the path parameter
        
        # Update FirstSheet
        db.query(FirstSheet).filter(FirstSheet.test_number == test_number).update(first_sheet_data)
        
        # Delete existing equipment records
        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == existing_first_sheet.id).delete()
        
        # Insert updated equipment
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=existing_first_sheet.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)
            
        # Delete and update Micrometer Thimble Calibrations
        db.query(ExternalMicrometer).filter(
            ExternalMicrometer.test_number == test_number,
            ExternalMicrometer.certificate_id == certificate_id
        ).delete()
        
        for micrometer in data.micrometer_thimble_calibrations:
            db.add(ExternalMicrometer(
                **micrometer.dict(),
                test_number=test_number,
                certificate_id=certificate_id
            ))
            
        # Delete and update Interchangeable Anvils Calibrations
        db.query(InterchangableAnvils).filter(
            InterchangableAnvils.test_number == test_number,
            InterchangableAnvils.certificate_id == certificate_id
        ).delete()
        
        for anvils in data.interchangeable_anvils_calibrations:
            db.add(InterchangableAnvils(
                **anvils.dict(),
                test_number=test_number,
                certificate_id=certificate_id
            ))
            
        # Delete and update Setting Gauge Rods Calibrations
        db.query(MicrometerSettingGaugeRods).filter(
            MicrometerSettingGaugeRods.test_number == test_number,
            MicrometerSettingGaugeRods.certificate_id == certificate_id
        ).delete()
        
        for setting_gauge in data.setting_gauge_rods_calibrations:
            db.add(MicrometerSettingGaugeRods(
                **setting_gauge.dict(),
                test_number=test_number,
                certificate_id=certificate_id
            ))
            
        # Delete and update Allowable Values Calibrations (if provided)
        db.query(AllowableValuesForLC_Micrometer).filter(
            AllowableValuesForLC_Micrometer.test_number == test_number,
            AllowableValuesForLC_Micrometer.certificate_id == certificate_id
        ).delete()
        
        if data.allowable_values_calibrations:
            for allowable_value in data.allowable_values_calibrations:
                db.add(AllowableValuesForLC_Micrometer(
                    **allowable_value.dict(),
                    test_number=test_number,
                    certificate_id=certificate_id
                ))
                
        db.commit()
        return {"message": "Data updated successfully for external micrometer analogue"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")



@router.post("/external-micrometer-digital", status_code=status.HTTP_201_CREATED)
def create_external_micrometer_digital(
    data: ExternalMicrometerDigitalRequest,
    db: Session = Depends(get_db)
):
    try:
        
        # Prepare first sheet data excluding equipment
        first_sheet_data = data.first_sheet.dict(exclude={'equipment'})
        first_sheet_data['test_number'] = data.test_number

        # Insert into First Sheet
        first_sheet_entry = FirstSheet(**first_sheet_data)
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Micrometer Thimble Calibrations
        for micrometer in data.micrometer_thimble_calibrations:
            db.add(ExternalMicrometerDigtal(
                slip_gauge_size=micrometer.slip_gauge_size,
                micrometer_reading=micrometer.micrometer_reading,
                error=micrometer.error,
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))

        # Insert Interchangeable Anvils Calibrations
        for anvils in data.interchangeable_anvils_calibrations:
            db.add(ExternalMicrometerDigtalAnvils(
                range_of_micrometer=anvils.range_of_micrometer,
                anvil_error=anvils.anvil_error,
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))

        # Insert Setting Gauge Rods Calibrations
        for setting_gauge in data.setting_gauge_rods_calibrations:
            db.add(ExternalMicrometerSettingGaugeRods(
                nominal_values=setting_gauge.nominal_values,
                calibrated_values=setting_gauge.calibrated_values,
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))

        # Insert Allowable Values Calibrations (if provided)
        if data.allowable_values_calibrations:
            for allowable_value in data.allowable_values_calibrations:
                db.add(ExternalMicrometerAllowableValuesDigital(
                    **allowable_value.dict(),
                    test_number=data.test_number,
                    certificate_id=data.certificate_id
                ))

        db.commit()
        return {"message": "External Micrometer Digital data saved successfully"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/external-micrometer-digital")
def get_external_micrometer_digital(
    test_number: str,
    db: Session = Depends(get_db)
):
    try:
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test number")

        first_sheet_equipments = db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).all()

        # Fetch Calibration Data
        micrometer_data = db.query(ExternalMicrometerDigtal).filter(ExternalMicrometerDigtal.test_number == test_number).all()
        anvils_data = db.query(ExternalMicrometerDigtalAnvils).filter(ExternalMicrometerDigtalAnvils.test_number == test_number).all()
        setting_gauge_data = db.query(ExternalMicrometerSettingGaugeRods).filter(ExternalMicrometerSettingGaugeRods.test_number == test_number).all()
        
        # Fetch Allowable Values
        allowable_values = db.query(ExternalMicrometerAllowableValuesDigital).filter(
            ExternalMicrometerAllowableValuesDigital.test_number == test_number
        ).all()

        # Fetch Details 
        certificate_id = None
        if micrometer_data:
            certificate_id = micrometer_data[0].certificate_id
        elif anvils_data:
            certificate_id = anvils_data[0].certificate_id
        elif setting_gauge_data:
            certificate_id = setting_gauge_data[0].certificate_id
        elif allowable_values:
            certificate_id = allowable_values[0].certificate_id
        
        details = None
        if certificate_id:
            details = db.query(ExternalMicrometerDigitalDetails).filter(
                ExternalMicrometerDigitalDetails.certificate_id == certificate_id
            ).first()

        return {
            "test_number": test_number,
            "first_sheet": {
                "ulr_no": first_sheet.ulr_no,
                "report_issued_date": first_sheet.report_issued_date,
                "customer_name_and_address": first_sheet.customer_name_and_address,
                "item_description": first_sheet.item_description,
                "identification_no": first_sheet.identification_no,
                "Sl_no": first_sheet.Sl_no,
                "DC_no": first_sheet.DC_no,
                "DC_no_dated": first_sheet.DC_no_dated,
                "PO_no": first_sheet.PO_no,
                "PO_no_dated": first_sheet.PO_no_dated,
                "date_of_calibration": first_sheet.date_of_calibration,
                "place_of_calibration": first_sheet.place_of_calibration,
                "reference_document_based_on_IS": first_sheet.reference_document_based_on_IS,
                "reference_document_based_on_IS_and_WP_no": first_sheet.reference_document_based_on_IS_and_WP_no,
                "temperature_during_calibration": first_sheet.temperature_during_calibration,
                "uncertainity_of_measurement": first_sheet.uncertainity_of_measurement,
                "equipments": [{"equipment_details": eq.equipment_details} for eq in first_sheet_equipments]
            },
            "micrometer_thimble_calibrations": [
                {
                    "slip_gauge_size": item.slip_gauge_size,
                    "micrometer_reading": item.micrometer_reading,
                    "error": item.error
                } for item in micrometer_data
            ],
            "interchangeable_anvils_calibrations": [
                {
                    "range_of_micrometer": item.range_of_micrometer,
                    "anvil_error": item.anvil_error
                } for item in anvils_data
            ],
            "setting_gauge_rods_calibrations": [
                {
                    "nominal_values": item.nominal_values,
                    "calibrated_values": item.calibrated_values
                } for item in setting_gauge_data
            ],
            "allowable_values_calibrations": [
                {
                    "permissible_total_error_over_a_range_of_150_to_200mm": item.permissible_total_error_over_a_range_of_150_to_200mm,
                    "permissible_total_error_over_a_range_of_200_to_250mm": item.permissible_total_error_over_a_range_of_200_to_250mm,
                    "permissible_total_error_over_a_range_of_250_to_300mm": item.permissible_total_error_over_a_range_of_250_to_300mm,
                    "parallelity_of_measuring_faces_over_range_of_150_to_200mm": item.parallelity_of_measuring_faces_over_range_of_150_to_200mm,
                    "parallelity_of_measuring_faces_over_range_of_200_to_250mm": item.parallelity_of_measuring_faces_over_range_of_200_to_250mm,
                    "parallelity_of_measuring_faces_over_range_of_250_to_300mm": item.parallelity_of_measuring_faces_over_range_of_250_to_300mm,
                    "flatness_of_measuring_faces": item.flatness_of_measuring_faces
                } for item in allowable_values
            ],
            "details": {
                "method_of_calibration": details.method_of_calibration if details else None,
                "note": details.note if details else None
            } if details else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@router.post("/vernier-depth-gauge", status_code=status.HTTP_201_CREATED)
def create_depth_gauge_calibration(
    data: DepthGaugeCalibrationRequest, db: Session = Depends(get_db)
):
    try:
        # Insert First Sheet
        first_sheet_entry = FirstSheet(
            ulr_no=data.first_sheet.ulr_no,
            report_issued_date=data.first_sheet.report_issued_date,
            customer_name_and_address=data.first_sheet.customer_name_and_address,
            item_description=data.first_sheet.item_description,
            identification_no=data.first_sheet.identification_no,
            Sl_no=data.first_sheet.Sl_no,
            DC_no=data.first_sheet.DC_no,
            DC_no_dated=data.first_sheet.DC_no_dated,
            PO_no=data.first_sheet.PO_no,
            PO_no_dated=data.first_sheet.PO_no_dated,
            date_of_calibration=data.first_sheet.date_of_calibration,
            place_of_calibration=data.first_sheet.place_of_calibration,
            reference_document_based_on_IS=data.first_sheet.reference_document_based_on_IS,
            reference_document_based_on_IS_and_WP_no=data.first_sheet.reference_document_based_on_IS_and_WP_no,
            temperature_during_calibration=data.first_sheet.temperature_during_calibration,
            uncertainity_of_measurement=data.first_sheet.uncertainity_of_measurement,
            test_number=data.test_number
        )
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Depth Gauge Calibrations
        for gauge in data.depth_gauge_calibrations:
            db_gauge = VernierDepthGaugeCalibration(
                slip_gauge_size=gauge.slip_gauge_size,
                calibrated_values=gauge.calibrated_values,
                error=gauge.error,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_gauge)
        
        # Insert Partial Surface Contact Calibrations
        for surface_contact in data.partial_surface_contact_calibrations:
            db_surface_contact = VernierDepthGaugeCalibrationPartialSurfaceContact(
                slip_gauge_size=surface_contact.slip_gauge_size,
                calibrated_values=surface_contact.calibrated_values,
                partial_surface_contact_error=surface_contact.partial_surface_contact_error,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_surface_contact)
        
        # Insert Metrological Calibrations
        for metrological in data.metrological_calibrations:
            db_metrological = VernierDepthGaugeCalibrationMetrological(
                partial_surface_error=metrological.partial_surface_error,
                repeatability_of_partial_error=metrological.repeatability_of_partial_error,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_metrological)

        # Insert Depth Gauge Details
        for detail in data.depth_gauge_details:
            db_detail = VernierDepthGaugeCalibrationDetails(
                method_of_calibration=detail.method_of_calibration,
                note=detail.note,
                certificate_id=data.certificate_id
            )
            db.add(db_detail)

        db.commit()
        return {"message": "Data saved successfully"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# GET Endpoint 
@router.get("/vernier-depth-gauge/{test_number}")
def get_combined_calibration(
    test_number: str, db: Session = Depends(get_db)
):
    try:
        # Fetch First Sheet
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test number")

        # Fetch First Sheet Equipments
        first_sheet_equipments = db.query(FirstSheetEquipments).filter(
            FirstSheetEquipments.report_no == first_sheet.id
        ).all()

        # Fetch Depth Gauge Calibrations
        depth_gauge_calibrations = db.query(VernierDepthGaugeCalibration).filter(
            VernierDepthGaugeCalibration.test_number == test_number
        ).all()

        # Fetch Partial Surface Contact Calibrations
        partial_surface_contacts = db.query(VernierDepthGaugeCalibrationPartialSurfaceContact).filter(
            VernierDepthGaugeCalibrationPartialSurfaceContact.test_number == test_number
        ).all()

        # Fetch Metrological Calibrations
        metrological_calibrations = db.query(VernierDepthGaugeCalibrationMetrological).filter(
            VernierDepthGaugeCalibrationMetrological.test_number == test_number
        ).all()

        # Fetch Depth Gauge Details 
        depth_gauge_details = db.query(VernierDepthGaugeCalibrationDetails).filter(
            VernierDepthGaugeCalibrationDetails.certificate_id == 
            (depth_gauge_calibrations[0].certificate_id if depth_gauge_calibrations else None)
        ).all() if depth_gauge_calibrations else []
        
        return {
            "first_sheet": {
                "ulr_no": first_sheet.ulr_no,
                "report_issued_date": first_sheet.report_issued_date,
                "customer_name_and_address": first_sheet.customer_name_and_address,
                "item_description": first_sheet.item_description,
                "identification_no": first_sheet.identification_no,
                "Sl_no": first_sheet.Sl_no,
                "DC_no": first_sheet.DC_no,
                "DC_no_dated": first_sheet.DC_no_dated,
                "PO_no": first_sheet.PO_no,
                "PO_no_dated": first_sheet.PO_no_dated,
                "date_of_calibration": first_sheet.date_of_calibration,
                "place_of_calibration": first_sheet.place_of_calibration,
                "reference_document_based_on_IS": first_sheet.reference_document_based_on_IS,
                "reference_document_based_on_IS_and_WP_no": first_sheet.reference_document_based_on_IS_and_WP_no,
                "temperature_during_calibration": first_sheet.temperature_during_calibration,
                "uncertainity_of_measurement": first_sheet.uncertainity_of_measurement,
                "equipments": [
                    {"equipment_details": eq.equipment_details} 
                    for eq in first_sheet_equipments
                ]
            },
            "depth_gauge_calibrations": [
                {
                    "slip_gauge_size": cal.slip_gauge_size,
                    "calibrated_values": cal.calibrated_values,
                    "error": cal.error
                } for cal in depth_gauge_calibrations
            ],
            "partial_surface_contact_calibrations": [
                {
                    "slip_gauge_size": contact.slip_gauge_size,
                    "calibrated_values": contact.calibrated_values,
                    "partial_surface_contact_error": contact.partial_surface_contact_error
                } for contact in partial_surface_contacts
            ],
            "metrological_calibrations": [
                {
                    "partial_surface_error": metro.partial_surface_error,
                    "repeatability_of_partial_error": metro.repeatability_of_partial_error
                } for metro in metrological_calibrations
            ],
            "depth_gauge_details": [
                {
                    "method_of_calibration": detail.method_of_calibration,
                    "note": detail.note
                } for detail in depth_gauge_details
            ]
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



class DepthGaugeCalibrationUpdateRequest(BaseModel):
    first_sheet: FirstSheetSchema
    depth_gauge_calibrations: List[DepthGaugeCalibrationSchema]
    partial_surface_contact_calibrations: List[PartialSurfaceContactSchema]
    metrological_calibrations: List[MetrologicalSchema]
    depth_gauge_details: List[DepthGaugeDetailsSchema]

@router.put("/vernier-depth-gauge/{certificate_id}/{test_number}", status_code=status.HTTP_200_OK)
def update_depth_gauge_calibration(
    certificate_id: int,
    test_number: str,  # Changed to str to match database type
    data: DepthGaugeCalibrationUpdateRequest,
    db: Session = Depends(get_db)
):
    try:
        # Fetch existing record to verify it exists
        existing_first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not existing_first_sheet:
            raise HTTPException(status_code=404, detail="No data found for the given test number")
            
        # Update first sheet data excluding equipment
        first_sheet_data = {
            "ulr_no": data.first_sheet.ulr_no,
            "report_issued_date": data.first_sheet.report_issued_date,
            "customer_name_and_address": data.first_sheet.customer_name_and_address,
            "item_description": data.first_sheet.item_description,
            "identification_no": data.first_sheet.identification_no,
            "Sl_no": data.first_sheet.Sl_no,
            "DC_no": data.first_sheet.DC_no,
            "DC_no_dated": data.first_sheet.DC_no_dated,
            "PO_no": data.first_sheet.PO_no,
            "PO_no_dated": data.first_sheet.PO_no_dated,
            "date_of_calibration": data.first_sheet.date_of_calibration,
            "place_of_calibration": data.first_sheet.place_of_calibration,
            "reference_document_based_on_IS": data.first_sheet.reference_document_based_on_IS,
            "reference_document_based_on_IS_and_WP_no": data.first_sheet.reference_document_based_on_IS_and_WP_no,
            "temperature_during_calibration": data.first_sheet.temperature_during_calibration,
            "uncertainity_of_measurement": data.first_sheet.uncertainity_of_measurement,
            # Keep the test_number unchanged
        }
        
        # Update the FirstSheet
        db.query(FirstSheet).filter(FirstSheet.id == existing_first_sheet.id).update(first_sheet_data)
        
        # add equipment
        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == existing_first_sheet.id).delete()
        
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=existing_first_sheet.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)
            
        # update Depth Gauge Calibrations
        db.query(VernierDepthGaugeCalibration).filter(
            VernierDepthGaugeCalibration.test_number == test_number
        ).delete()
        
        for gauge in data.depth_gauge_calibrations:
            db_gauge = VernierDepthGaugeCalibration(
                slip_gauge_size=gauge.slip_gauge_size,
                calibrated_values=gauge.calibrated_values,
                error=gauge.error,
                certificate_id=certificate_id,
                test_number=test_number
            )
            db.add(db_gauge)
            
        #  update Partial Surface Contact Calibrations
        db.query(VernierDepthGaugeCalibrationPartialSurfaceContact).filter(
            VernierDepthGaugeCalibrationPartialSurfaceContact.test_number == test_number
        ).delete()
        
        for surface_contact in data.partial_surface_contact_calibrations:
            db_surface_contact = VernierDepthGaugeCalibrationPartialSurfaceContact(
                slip_gauge_size=surface_contact.slip_gauge_size,
                calibrated_values=surface_contact.calibrated_values,
                partial_surface_contact_error=surface_contact.partial_surface_contact_error,
                certificate_id=certificate_id,
                test_number=test_number
            )
            db.add(db_surface_contact)
            
        #  update Metrological Calibrations
        db.query(VernierDepthGaugeCalibrationMetrological).filter(
            VernierDepthGaugeCalibrationMetrological.test_number == test_number
        ).delete()
        
        for metrological in data.metrological_calibrations:
            db_metrological = VernierDepthGaugeCalibrationMetrological(
                partial_surface_error=metrological.partial_surface_error,
                repeatability_of_partial_error=metrological.repeatability_of_partial_error,
                certificate_id=certificate_id,
                test_number=test_number
            )
            db.add(db_metrological)
            
        #  update Depth Gauge Details
        db.query(VernierDepthGaugeCalibrationDetails).filter(
            VernierDepthGaugeCalibrationDetails.certificate_id == certificate_id
        ).delete()
        
        for detail in data.depth_gauge_details:
            db_detail = VernierDepthGaugeCalibrationDetails(
                method_of_calibration=detail.method_of_calibration,
                note=detail.note,
                certificate_id=certificate_id
            )
            db.add(db_detail)
            
        db.commit()
        return {"message": "Depth gauge calibration data updated successfully"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    



@router.post("/electronic-level", response_model=ElecLevelCalibrationResponse, status_code=status.HTTP_201_CREATED)
def create_elec_level_calibration(
    data: ElecLevelCalibrationRequest, db: Session = Depends(get_db)
):
    try:
        # Insert First Sheet
        first_sheet_entry = FirstSheet(
            ulr_no=data.first_sheet.ulr_no,
            report_issued_date=data.first_sheet.report_issued_date,
            customer_name_and_address=data.first_sheet.customer_name_and_address,
            item_description=data.first_sheet.item_description,
            identification_no=data.first_sheet.identification_no,
            Sl_no=data.first_sheet.Sl_no,
            DC_no=data.first_sheet.DC_no,
            DC_no_dated=data.first_sheet.DC_no_dated,
            PO_no=data.first_sheet.PO_no,
            PO_no_dated=data.first_sheet.PO_no_dated,
            date_of_calibration=data.first_sheet.date_of_calibration,
            place_of_calibration=data.first_sheet.place_of_calibration,
            reference_document_based_on_IS=data.first_sheet.reference_document_based_on_IS,
            reference_document_based_on_IS_and_WP_no=data.first_sheet.reference_document_based_on_IS_and_WP_no,
            temperature_during_calibration=data.first_sheet.temperature_during_calibration,
            uncertainity_of_measurement=data.first_sheet.uncertainity_of_measurement,
            test_number=data.test_number
        )
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Mechanical Calibrations
        for mec in data.mechanical_calibrations:
            db_mec = ElecLevelMechanicalCalibration(
                electronic_level_readings=mec.electronic_level_readings,
                positive_calibrated_values=mec.positive_calibrated_values,
                negative_calibrated_values=mec.negative_calibrated_values,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_mec)
        
        # Insert Geometrical Parameters
        for geo in data.geometrical_parameters:
            db_geo = ElecLevelGeometricalParameters(
                flatness_of_bottom_face=geo.flatness_of_bottom_face,
                parellelity_of_V_to_flat_of_bottom_face=geo.parellelity_of_V_to_flat_of_bottom_face,
                perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face=geo.perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face,
                perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face=geo.perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_geo)
        
        db.commit()
        
        # Return the saved data
        return {
            "certificate_id": data.certificate_id,
            "test_number": data.test_number,
            "first_sheet": data.first_sheet,
            "mechanical_calibrations": data.mechanical_calibrations,
            "geometrical_parameters": data.geometrical_parameters
        }
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# GET Endpoint
@router.get("/electronic-level/{test_number}", response_model=ElecLevelCalibrationResponse)
def get_elec_level_calibration(
    test_number: str, db: Session = Depends(get_db)
):
    try:
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test_number")

        # Fetch First Sheet Equipments
        first_sheet_equipments = db.query(FirstSheetEquipments).filter(
            FirstSheetEquipments.report_no == first_sheet.id
        ).all()

        # Update first_sheet with equipment
        first_sheet_data = FirstSheetSchema(
            ulr_no=first_sheet.ulr_no,
            report_issued_date=first_sheet.report_issued_date,
            customer_name_and_address=first_sheet.customer_name_and_address,
            item_description=first_sheet.item_description,
            identification_no=first_sheet.identification_no,
            Sl_no=first_sheet.Sl_no,
            DC_no=first_sheet.DC_no,
            DC_no_dated=first_sheet.DC_no_dated,
            PO_no=first_sheet.PO_no,
            PO_no_dated=first_sheet.PO_no_dated,
            date_of_calibration=first_sheet.date_of_calibration,
            place_of_calibration=first_sheet.place_of_calibration,
            reference_document_based_on_IS=first_sheet.reference_document_based_on_IS,
            reference_document_based_on_IS_and_WP_no=first_sheet.reference_document_based_on_IS_and_WP_no,
            temperature_during_calibration=first_sheet.temperature_during_calibration,
            uncertainity_of_measurement=first_sheet.uncertainity_of_measurement,
            test_number=str(test_number),  # Explicitly convert test_number to string
            equipment=[
                {"equipment_details": equip.equipment_details}
                for equip in first_sheet_equipments
            ]
        )

        # Fetch Mechanical Calibrations
        mechanical_calibrations = db.query(ElecLevelMechanicalCalibration).filter(
            ElecLevelMechanicalCalibration.test_number == test_number
        ).all()

        # Fetch Geometrical Parameters
        geometrical_parameters = db.query(ElecLevelGeometricalParameters).filter(
            ElecLevelGeometricalParameters.test_number == test_number
        ).first()

        

        # Prepare response data
        response_data = {
            "certificate_id": 18,
            "test_number": str(test_number),  # Ensure test_number is a string
            "first_sheet": first_sheet_data,
            "mechanical_calibrations": [
                {
                    "electronic_level_readings": cal.electronic_level_readings,
                    "positive_calibrated_values": cal.positive_calibrated_values,
                    "negative_calibrated_values": cal.negative_calibrated_values
                }
                for cal in mechanical_calibrations
            ],
            "geometrical_parameters": [{
                "flatness_of_bottom_face": geometrical_parameters.flatness_of_bottom_face if geometrical_parameters else None,
                "parellelity_of_V_to_flat_of_bottom_face": geometrical_parameters.parellelity_of_V_to_flat_of_bottom_face if geometrical_parameters else None,
                "perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face": geometrical_parameters.perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face if geometrical_parameters else None,
                "perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face": geometrical_parameters.perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face if geometrical_parameters else None
            }] if geometrical_parameters else [],
            
        }

        return response_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



class ElecLevelCalibrationUpdateRequest(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    mechanical_calibrations: List[ElecLevelMechanicalCalibrationSchema]
    geometrical_parameters: List[ElecLevelGeometricalParametersSchema]
    ele_details_schema: Optional[List[ElecLevelDetailsSchema]] = None

# -------------------------- PUT Endpoint --------------------------
@router.put("/electronic-level/{test_number}", response_model=ElecLevelCalibrationResponse)
def update_elec_level_calibration(
    test_number: str, data: ElecLevelCalibrationUpdateRequest, db: Session = Depends(get_db)
):
    try:
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test_number")

        # Update First Sheet Data
        first_sheet.ulr_no = data.first_sheet.ulr_no
        first_sheet.report_issued_date = data.first_sheet.report_issued_date
        first_sheet.customer_name_and_address = data.first_sheet.customer_name_and_address
        first_sheet.item_description = data.first_sheet.item_description
        first_sheet.identification_no = data.first_sheet.identification_no
        first_sheet.Sl_no = data.first_sheet.Sl_no
        first_sheet.DC_no = data.first_sheet.DC_no
        first_sheet.DC_no_dated = data.first_sheet.DC_no_dated
        first_sheet.PO_no = data.first_sheet.PO_no
        first_sheet.PO_no_dated = data.first_sheet.PO_no_dated
        first_sheet.date_of_calibration = data.first_sheet.date_of_calibration
        first_sheet.place_of_calibration = data.first_sheet.place_of_calibration
        first_sheet.reference_document_based_on_IS = data.first_sheet.reference_document_based_on_IS
        first_sheet.reference_document_based_on_IS_and_WP_no = data.first_sheet.reference_document_based_on_IS_and_WP_no
        first_sheet.temperature_during_calibration = data.first_sheet.temperature_during_calibration
        first_sheet.uncertainity_of_measurement = data.first_sheet.uncertainity_of_measurement
        first_sheet.test_number = data.test_number
        first_sheet.certificate_id = data.certificate_id
        
        db.commit()
        db.refresh(first_sheet)

        # Update First Sheet Equipments
        db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).delete()
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)
        
        # Update Mechanical Calibrations
        db.query(ElecLevelMechanicalCalibration).filter(ElecLevelMechanicalCalibration.test_number == test_number).delete()
        for mec in data.mechanical_calibrations:
            db_mec = ElecLevelMechanicalCalibration(
                electronic_level_readings=mec.electronic_level_readings,
                positive_calibrated_values=mec.positive_calibrated_values,
                negative_calibrated_values=mec.negative_calibrated_values,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_mec)

        # Update Geometrical Parameters
        db.query(ElecLevelGeometricalParameters).filter(ElecLevelGeometricalParameters.test_number == test_number).delete()
        for geo in data.geometrical_parameters:
            db_geo = ElecLevelGeometricalParameters(
                flatness_of_bottom_face=geo.flatness_of_bottom_face,
                parellelity_of_V_to_flat_of_bottom_face=geo.parellelity_of_V_to_flat_of_bottom_face,
                perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face=geo.perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face,
                perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face=geo.perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_geo)

        db.commit()
        
        # Return the updated data
        return {
            "certificate_id": data.certificate_id,
            "test_number": data.test_number,
            "first_sheet": data.first_sheet,
            "mechanical_calibrations": data.mechanical_calibrations,
            "geometrical_parameters": data.geometrical_parameters,
            "ele_details_schema": data.ele_details_schema
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    


@router.post("/frame-level-calibration", status_code=status.HTTP_201_CREATED)
def create_frame_level_calibration(
    data: FrameLevelCalibrationRequest, db: Session = Depends(get_db)
):
    try:
        # Insert First Sheet
        first_sheet_entry = FirstSheet(
            ulr_no=data.first_sheet.ulr_no,
            report_issued_date=data.first_sheet.report_issued_date,
            customer_name_and_address=data.first_sheet.customer_name_and_address,
            item_description=data.first_sheet.item_description,
            identification_no=data.first_sheet.identification_no,
            Sl_no=data.first_sheet.Sl_no,
            DC_no=data.first_sheet.DC_no,
            DC_no_dated=data.first_sheet.DC_no_dated,
            PO_no=data.first_sheet.PO_no,
            PO_no_dated=data.first_sheet.PO_no_dated,
            date_of_calibration=data.first_sheet.date_of_calibration,
            place_of_calibration=data.first_sheet.place_of_calibration,
            reference_document_based_on_IS=data.first_sheet.reference_document_based_on_IS,
            reference_document_based_on_IS_and_WP_no=data.first_sheet.reference_document_based_on_IS_and_WP_no,
            temperature_during_calibration=data.first_sheet.temperature_during_calibration,
            uncertainity_of_measurement=data.first_sheet.uncertainity_of_measurement,
            test_number=data.first_sheet.test_number
        )
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Bubble Accuracy Data
        bubble_accuracy_entries = []
        for ba in data.bubble_accuracy:
            db_ba = FrameLevelCalibrationBubbleAccuracy(
                scale_reading=ba.scale_reading,
                right_side_calibrated_values=ba.right_side_calibrated_values,
                left_side_calibrated_values=ba.left_side_calibrated_values,
                certificate_id=data.certificate_id,
                test_number=int(data.test_number)
            )
            bubble_accuracy_entries.append(db_ba)
            db.add(db_ba)
        
        # Insert Bubble Consistency Data
        bubble_consistency_entries = []
        for bc in data.bubble_consistency:
            db_bc = FrameLevelCalibrationBubbleConsistency(
                parameter=bc.parameter,
                calibrated_values=bc.calibrated_values,
                certificate_id=data.certificate_id,
                test_number=int(data.test_number)
            )
            bubble_consistency_entries.append(db_bc)
            db.add(db_bc)
        
        # Insert Geometrical Parameters
        geometrical_parameters_entries = []
        for gp in data.geometrical_parameters:
            db_gp = FrameLevelGeometricalCalibration(
                flatness_of_base_A=gp.flatness_of_base_A,
                parallelity_flat_to_V_face_A=gp.parallelity_flat_to_V_face_A,
                parallelity_face_C_wrt_face_A=gp.parallelity_face_C_wrt_face_A,
                parallelity_face_D_wrt_face_B=gp.parallelity_face_D_wrt_face_B,
                perpendicularity_face_B_wrt_face_A_flat_to_flat=gp.perpendicularity_face_B_wrt_face_A_flat_to_flat,
                perpendicularity_face_B_wrt_face_A=gp.perpendicularity_face_B_wrt_face_A,
                perpendicularity_of_face_d=gp.perpendicularity_of_face_d,
                certificate_id=data.certificate_id,
                test_number=int(data.test_number)
            )
            geometrical_parameters_entries.append(db_gp)
            db.add(db_gp)

        # Insert Frame Level Details (Note: schema suggests a list, but model suggests single entry)
        if data.frame_level_details:
            for details in data.frame_level_details:
                db_details = FrameLevelDetails(
                    method_of_calibration=details.method_of_calibration,
                    note=details.note,
                    certificate_id=data.certificate_id
                )
                db.add(db_details)

        db.commit()
        return {"message": "Data saved successfully for all sheets"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/frame-level-calibration/{test_number}")
def get_frame_level_calibration(
    test_number: str, db: Session = Depends(get_db)
):
    try:
        # Convert test_number to str for filtering
        test_number_str = str(test_number)

        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number_str).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail=f"No data found for test number {test_number}")

        
        print(f"First Sheet ID: {first_sheet.id}")
        print(f"First Sheet Test Number: {first_sheet.test_number}")

        # Fetch First Sheet Equipments
        first_sheet_equipments = db.query(FirstSheetEquipments).filter(
            FirstSheetEquipments.report_no == first_sheet.id
        ).all()

        # Fetch Frame Level Calibration Data
        bubble_accuracy = db.query(FrameLevelCalibrationBubbleAccuracy).filter(
            FrameLevelCalibrationBubbleAccuracy.test_number == test_number
        ).all()
        
        bubble_consistency = db.query(FrameLevelCalibrationBubbleConsistency).filter(
            FrameLevelCalibrationBubbleConsistency.test_number == test_number
        ).all()
        
        geometrical_parameters = db.query(FrameLevelGeometricalCalibration).filter(
            FrameLevelGeometricalCalibration.test_number == test_number
        ).all()

        # Fetch Frame Level Details 
        details_data = db.query(FrameLevelDetails).filter(
            FrameLevelDetails.certificate_id == first_sheet.id  # Adjust this if needed
        ).all()

        # Debugging: Print counts of retrieved data
        print(f"Equipment count: {len(first_sheet_equipments)}")
        print(f"Bubble Accuracy count: {len(bubble_accuracy)}")
        print(f"Bubble Consistency count: {len(bubble_consistency)}")
        print(f"Geometrical Parameters count: {len(geometrical_parameters)}")
        print(f"Details count: {len(details_data)}")
        
        return {
            "test_number": test_number,
            "first_sheet": {
                "ulr_no": first_sheet.ulr_no,
                "report_issued_date": first_sheet.report_issued_date,
                "customer_name_and_address": first_sheet.customer_name_and_address,
                "item_description": first_sheet.item_description,
                "identification_no": first_sheet.identification_no,
                "Sl_no": first_sheet.Sl_no,
                "DC_no": first_sheet.DC_no,
                "DC_no_dated": first_sheet.DC_no_dated,
                "PO_no": first_sheet.PO_no,
                "PO_no_dated": first_sheet.PO_no_dated,
                "date_of_calibration": first_sheet.date_of_calibration,
                "place_of_calibration": first_sheet.place_of_calibration,
                "reference_document_based_on_IS": first_sheet.reference_document_based_on_IS,
                "reference_document_based_on_IS_and_WP_no": first_sheet.reference_document_based_on_IS_and_WP_no,
                "temperature_during_calibration": first_sheet.temperature_during_calibration,
                "uncertainity_of_measurement": first_sheet.uncertainity_of_measurement,
                "test_number": first_sheet.test_number,
                "equipments": [{"equipment_details": eq.equipment_details} for eq in first_sheet_equipments]
            },
            "bubble_accuracy": [
                {
                    "id": ba.id,
                    "scale_reading": ba.scale_reading,
                    "right_side_calibrated_values": ba.right_side_calibrated_values,
                    "left_side_calibrated_values": ba.left_side_calibrated_values,
                    "certificate_id": ba.certificate_id,
                    "test_number": ba.test_number
                } for ba in bubble_accuracy
            ],
            "bubble_consistency": [
                {
                    "id": bc.id,
                    "parameter": bc.parameter,
                    "calibrated_values": bc.calibrated_values,
                    "certificate_id": bc.certificate_id,
                    "test_number": bc.test_number
                } for bc in bubble_consistency
            ],
            "geometrical_parameters": [
                {
                    "id": gp.id,
                    "flatness_of_base_A": gp.flatness_of_base_A,
                    "parallelity_flat_to_V_face_A": gp.parallelity_flat_to_V_face_A,
                    "parallelity_face_C_wrt_face_A": gp.parallelity_face_C_wrt_face_A,
                    "parallelity_face_D_wrt_face_B": gp.parallelity_face_D_wrt_face_B,
                    "perpendicularity_face_B_wrt_face_A_flat_to_flat": gp.perpendicularity_face_B_wrt_face_A_flat_to_flat,
                    "perpendicularity_face_B_wrt_face_A": gp.perpendicularity_face_B_wrt_face_A,
                    "perpendicularity_of_face_d": gp.perpendicularity_of_face_d,
                    "certificate_id": gp.certificate_id,
                    "test_number": gp.test_number
                } for gp in geometrical_parameters
            ],
            "frame_level_details": [
                {
                    "id": detail.id,
                    "method_of_calibration": detail.method_of_calibration,
                    "note": detail.note,
                    "certificate_id": detail.certificate_id
                } for detail in details_data
            ]
        }

    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Detailed error logging
        import traceback
        print(f"Unexpected error: {str(e)}")
        print(traceback.format_exc())
        
        # Raise with more detailed error message
        raise HTTPException(
            status_code=500, 
            detail=f"An unexpected error occurred: {str(e)}"
        )



@router.post("/indexing-table", status_code=status.HTTP_201_CREATED, response_model=dict)
def create_indexing_table(
    data: IndexingTableCalibrationRequest,
    db: Session = Depends(get_db)
):
    try:
        

        # Prepare first sheet data excluding equipment
        first_sheet_data = data.first_sheet.dict(exclude={'equipment'})
        
        # Insert into First Sheet
        first_sheet_entry = FirstSheet(**first_sheet_data)
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Indexing Table Calibrations
        for calibration in data.mechanical_calibrations:
            db.add(IndexingTableMechanicalCalibration(
                **calibration.dict(),
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))

        db.commit()
        return {"message": "Data saved successfully for indexing table"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")



@router.get("/indexing-table", response_model=IndexingTableCalibrationResponse)
def get_indexing_table_calibration(
    test_number: int,
    db: Session = Depends(get_db)
):
    try:
       
        test_number_str = str(test_number)
        
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number_str).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test number")

        first_sheet_equipments = db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).all()

        # Fetch Indexing Table Calibration Data 
        indexing_table_data = db.query(IndexingTableMechanicalCalibration).filter(
            IndexingTableMechanicalCalibration.test_number == test_number
        ).all()
        
        if not indexing_table_data:
            raise HTTPException(status_code=404, detail="No indexing table calibration data found")
            
        # Get certificate_id from the calibration data
        certificate_id = indexing_table_data[0].certificate_id if indexing_table_data else None

        # Fetch Details 
        indexing_table_detail = None
        if certificate_id:
            detail = db.query(IndexingTableDetails).filter(
                IndexingTableDetails.certificate_id == certificate_id
            ).first()
            
            if detail:
                indexing_table_detail = IndexingTableDetailsSchema(
                    method_used=detail.method_used
                )

        # Construct equipment list
        equipment_list = [
            FirstSheetEquipmentSchema(equipment_details=eq.equipment_details) 
            for eq in first_sheet_equipments
        ]
        
        # Construct first sheet response
        first_sheet_response = FirstSheetSchema(
            ulr_no=first_sheet.ulr_no,
            report_issued_date=first_sheet.report_issued_date,
            customer_name_and_address=first_sheet.customer_name_and_address,
            item_description=first_sheet.item_description,
            identification_no=first_sheet.identification_no,
            Sl_no=first_sheet.Sl_no,
            DC_no=first_sheet.DC_no,
            DC_no_dated=first_sheet.DC_no_dated,
            PO_no=first_sheet.PO_no,
            PO_no_dated=first_sheet.PO_no_dated,
            date_of_calibration=first_sheet.date_of_calibration,
            place_of_calibration=first_sheet.place_of_calibration,
            reference_document_based_on_IS=first_sheet.reference_document_based_on_IS,
            reference_document_based_on_IS_and_WP_no=first_sheet.reference_document_based_on_IS_and_WP_no,
            temperature_during_calibration=first_sheet.temperature_during_calibration,
            uncertainity_of_measurement=first_sheet.uncertainity_of_measurement,
            test_number=first_sheet.test_number,  # Keep as string from the database
            equipment=equipment_list
        )
        
        # Construct mechanical calibrations list
        mechanical_calibrations = [
            IndexingTableMechanicalCalibrationSchema(
                normal_positioning=item.normal_positioning,
                firstset_calibrated_cumulative_errors=item.firstset_calibrated_cumulative_errors,
                secondset_calibrated_cumulative_errors=item.secondset_calibrated_cumulative_errors,
                thirdset_calibrated_cumulative_errors=item.thirdset_calibrated_cumulative_errors,
                average_cumulative_errors=item.average_cumulative_errors
            ) for item in indexing_table_data
        ]

        # Construct the final response
        response = IndexingTableCalibrationResponse(
            certificate_id=certificate_id,
            test_number=test_number,  # Use the integer test_number for the response
            first_sheet=first_sheet_response,
            mechanical_calibrations=mechanical_calibrations,
            details=indexing_table_detail
        )

        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    


@router.post("/rotary-table", status_code=status.HTTP_201_CREATED, response_model=dict)
def create_rotary_table(
    data: RotaryTableCalibrationRequest,
    db: Session = Depends(get_db)
):
    try:
        

        # Prepare first sheet data excluding equipment
        first_sheet_data = data.first_sheet.dict(exclude={'equipment'})
        
        # Insert into First Sheet
        first_sheet_entry = FirstSheet(**first_sheet_data)
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Rotary Table Mechanical Calibrations
        for calibration in data.mechanical_calibrations:
            db.add(RotaryTableMechanicalCalibration(
                **calibration.dict(),
                test_number=data.test_number,
                certificate_id=data.certificate_id
            ))

        db.commit()
        return {"message": "Data saved successfully for rotary table"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/rotary-table", response_model=RotaryTableCalibrationResponse)
def get_rotary_table_calibration(
    test_number: int,
    db: Session = Depends(get_db)
):
    try:
        
        test_number_str = str(test_number)
        
        # Fetch First Sheet Data
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number_str).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test number")

        first_sheet_equipments = db.query(FirstSheetEquipments).filter(FirstSheetEquipments.report_no == first_sheet.id).all()

        # Fetch Rotary Table Calibration Data 
        rotary_table_data = db.query(RotaryTableMechanicalCalibration).filter(
            RotaryTableMechanicalCalibration.test_number == test_number
        ).all()
        
        if not rotary_table_data:
            raise HTTPException(status_code=404, detail="No rotary table calibration data found")
            
        # Get certificate_id from the calibration data
        certificate_id = rotary_table_data[0].certificate_id if rotary_table_data else None

        # Fetch Details
        rotary_table_detail = None
        if certificate_id:
            detail = db.query(RotaryTableMechanicalCalibrationDetails).filter(
                RotaryTableMechanicalCalibrationDetails.certificate_id == certificate_id
            ).first()
            
            if detail:
                rotary_table_detail = RotaryTableDetailsSchema(
                    method_used=detail.method_used
                )

        equipment_list = [
            FirstSheetEquipmentSchema(equipment_details=eq.equipment_details) 
            for eq in first_sheet_equipments
        ]
        
        # Construct first sheet response
        first_sheet_response = FirstSheetSchema(
            ulr_no=first_sheet.ulr_no,
            report_issued_date=first_sheet.report_issued_date,
            customer_name_and_address=first_sheet.customer_name_and_address,
            item_description=first_sheet.item_description,
            identification_no=first_sheet.identification_no,
            Sl_no=first_sheet.Sl_no,
            DC_no=first_sheet.DC_no,
            DC_no_dated=first_sheet.DC_no_dated,
            PO_no=first_sheet.PO_no,
            PO_no_dated=first_sheet.PO_no_dated,
            date_of_calibration=first_sheet.date_of_calibration,
            place_of_calibration=first_sheet.place_of_calibration,
            reference_document_based_on_IS=first_sheet.reference_document_based_on_IS,
            reference_document_based_on_IS_and_WP_no=first_sheet.reference_document_based_on_IS_and_WP_no,
            temperature_during_calibration=first_sheet.temperature_during_calibration,
            uncertainity_of_measurement=first_sheet.uncertainity_of_measurement,
            test_number=first_sheet.test_number,  # Keep as string from the database
            equipment=equipment_list
        )
        
        # Construct mechanical calibrations list
        mechanical_calibrations = [
            RotaryTableMechanicalCalibrationSchema(
                nominal_positioning=item.nominal_positioning,
                pair_of_facesets_on_polygon_mirror=item.pair_of_facesets_on_polygon_mirror,
                firstset_calibrated_cumulative_errors=item.firstset_calibrated_cumulative_errors,
                secondset_calibrated_cumulative_errors=item.secondset_calibrated_cumulative_errors,
                thirdset_calibrated_cumulative_errors=item.thirdset_calibrated_cumulative_errors,
                average_cumulative_errors_wrt_mastervalues=item.average_cumulative_errors_wrt_mastervalues
            ) for item in rotary_table_data
        ]

        # Construct the final response
        response = RotaryTableCalibrationResponse(
            certificate_id=certificate_id,
            test_number=test_number,  # Use the integer test_number for the response
            first_sheet=first_sheet_response,
            mechanical_calibrations=mechanical_calibrations,
            details=rotary_table_detail
        )

        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    



@router.post("/vernier-calibration", status_code=status.HTTP_201_CREATED)
def create_vernier_caliper_calibration(
    data: VernierCaliperCalibrationRequest,
    db: Session = Depends(get_db)
):
    try:
        # Insert First Sheet
        first_sheet_entry = FirstSheet(
            ulr_no=data.first_sheet.ulr_no,
            report_issued_date=data.first_sheet.report_issued_date,
            customer_name_and_address=data.first_sheet.customer_name_and_address,
            item_description=data.first_sheet.item_description,
            identification_no=data.first_sheet.identification_no,
            Sl_no=data.first_sheet.Sl_no,
            DC_no=data.first_sheet.DC_no,
            DC_no_dated=data.first_sheet.DC_no_dated,
            PO_no=data.first_sheet.PO_no,
            PO_no_dated=data.first_sheet.PO_no_dated,
            date_of_calibration=data.first_sheet.date_of_calibration,
            place_of_calibration=data.first_sheet.place_of_calibration,
            reference_document_based_on_IS=data.first_sheet.reference_document_based_on_IS,
            reference_document_based_on_IS_and_WP_no=data.first_sheet.reference_document_based_on_IS_and_WP_no,
            temperature_during_calibration=data.first_sheet.temperature_during_calibration,
            uncertainity_of_measurement=data.first_sheet.uncertainity_of_measurement,
            test_number=data.test_number
        )
        db.add(first_sheet_entry)
        db.commit()
        db.refresh(first_sheet_entry)

        # Insert First Sheet Equipments
        for equipment in data.first_sheet.equipment:
            db_equipment = FirstSheetEquipments(
                report_no=first_sheet_entry.id,
                equipment_details=equipment.equipment_details
            )
            db.add(db_equipment)

        # Insert Vernier Caliper External Measuring Jaws
        for emj in data.external_measuring_jaws:
            db_emj = VernierCaliperCalibration(
                slip_gauge_size=emj.slip_gauge_size,
                caliper_reading=emj.caliper_reading,
                error=emj.error,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_emj)
        
        # Insert Vernier Caliper Internal Measuring Jaws
        for imj in data.internal_measuring_jaws:
            db_imj = VernierCaliperCalibration2(
                setting_ring_gauge_size=imj.setting_ring_gauge_size,
                caliper_reading=imj.caliper_reading,
                error=imj.error,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_imj)
        
        # Insert Vernier Caliper Depth Measuring Blade
        for dmb in data.depth_measuring_blade:
            db_dmb = VernierCaliperCalibration3(
                slip_gauge_size=dmb.slip_gauge_size,
                caliper_reading=dmb.caliper_reading,
                error=dmb.error,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_dmb)
        
        # Insert Vernier Caliper Partial Surface Contact
        for psc in data.partial_surface_contact:
            db_psc = VernierCaliperCalibration4(
                slip_gauge_size=psc.slip_gauge_size,
                caliper_reading=psc.caliper_reading,
                partial_surface_contact_error=psc.partial_surface_contact_error,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_psc)
        
        # Insert Vernier Caliper Combined Width
        for cw in data.combined_width:
            db_cw = VernierCaliperCalibration5(
                nominal_value=cw.nominal_value,
                calibrated_value=cw.calibrated_value,
                certificate_id=data.certificate_id,
                test_number=data.test_number
            )
            db.add(db_cw)
        
        # Insert Vernier Caliper Metrological Characteristics
            for mc in data.metrological_characteristics:
                db_mc = VernierCaliperCalibration6(
                    partial_surface_contact_error=mc.partial_surface_contact_error,
                    repeatability_of_partial_surface_contact_error=mc.repeatability_of_partial_surface_contact_error,
                    scale_shift_error=mc.scale_shift_error,
                    line_contact_error=mc.line_contact_error,
                    full_surface_contact_error=mc.full_surface_contact_error,
                    error_due_to_crossed_knife_edge_distance=mc.error_due_to_crossed_knife_edge_distance,
                    certificate_id=data.certificate_id,
                    test_number=data.test_number)
            db.add(db_mc)
                
            db.commit()
        return {"message": "Data saved successfully for all sheets"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/vernier-calibration/{test_number}")
def get_vernier_caliper_calibration(
    test_number: int,
    db: Session = Depends(get_db)
):
    try:
        test_number_str = str(test_number)

        # Fetch First Sheet
        first_sheet = db.query(FirstSheet).filter(FirstSheet.test_number == test_number_str).first()
        if not first_sheet:
            raise HTTPException(status_code=404, detail="No data found for given test_number")

        # Fetch First Sheet Equipments
        first_sheet_equipments = db.query(FirstSheetEquipments).filter(
            FirstSheetEquipments.report_no == first_sheet.id
        ).all()

        # Fetch Vernier Caliper Data
        external_measuring_jaws = db.query(VernierCaliperCalibration).filter(
            VernierCaliperCalibration.test_number == test_number_str
        ).all()

        internal_measuring_jaws = db.query(VernierCaliperCalibration2).filter(
            VernierCaliperCalibration2.test_number == test_number_str
        ).all()

        depth_measuring_blade = db.query(VernierCaliperCalibration3).filter(
            VernierCaliperCalibration3.test_number == test_number_str
        ).all()

        partial_surface_contact = db.query(VernierCaliperCalibration4).filter(
            VernierCaliperCalibration4.test_number == test_number_str
        ).all()

        combined_width = db.query(VernierCaliperCalibration5).filter(
            VernierCaliperCalibration5.test_number == test_number_str
        ).all()

        metrological_characteristics = db.query(VernierCaliperCalibration6).filter(
            VernierCaliperCalibration6.test_number == test_number_str
        ).all()

        details = db.query(VernierCaliperCalibrationDetails).filter(
            VernierCaliperCalibrationDetails.certificate_id == first_sheet.id
        ).first()
        
        return {
            "certificate_id": first_sheet.id,
            "test_number": test_number,
            "first_sheet": {
                "ulr_no": first_sheet.ulr_no,
                "report_issued_date": first_sheet.report_issued_date,
                "customer_name_and_address": first_sheet.customer_name_and_address,
                "item_description": first_sheet.item_description,
                "identification_no": first_sheet.identification_no,
                "Sl_no": first_sheet.Sl_no,
                "DC_no": first_sheet.DC_no,
                "DC_no_dated": first_sheet.DC_no_dated,
                "PO_no": first_sheet.PO_no,
                "PO_no_dated": first_sheet.PO_no_dated,
                "date_of_calibration": first_sheet.date_of_calibration,
                "place_of_calibration": first_sheet.place_of_calibration,
                "reference_document_based_on_IS": first_sheet.reference_document_based_on_IS,
                "reference_document_based_on_IS_and_WP_no": first_sheet.reference_document_based_on_IS_and_WP_no,
                "temperature_during_calibration": first_sheet.temperature_during_calibration,
                "uncertainity_of_measurement": first_sheet.uncertainity_of_measurement,
                "equipment": [
                    {"equipment_details": eq.equipment_details} 
                    for eq in first_sheet_equipments
                ]
            },
            "external_measuring_jaws": [
                {
                    "slip_gauge_size": emj.slip_gauge_size,
                    "caliper_reading": emj.caliper_reading,
                    "error": emj.error
                } for emj in external_measuring_jaws
            ],
            "internal_measuring_jaws": [
                {
                    "setting_ring_gauge_size": imj.setting_ring_gauge_size,
                    "caliper_reading": imj.caliper_reading,
                    "error": imj.error
                } for imj in internal_measuring_jaws
            ],
            "depth_measuring_blade": [
                {
                    "slip_gauge_size": dmb.slip_gauge_size,
                    "caliper_reading": dmb.caliper_reading,
                    "error": dmb.error
                } for dmb in depth_measuring_blade
            ],
            "partial_surface_contact": [
                {
                    "slip_gauge_size": psc.slip_gauge_size,
                    "caliper_reading": psc.caliper_reading,
                    "partial_surface_contact_error": psc.partial_surface_contact_error
                } for psc in partial_surface_contact
            ],
            "combined_width": [
                {
                    "nominal_value": cw.nominal_value,
                    "calibrated_value": cw.calibrated_value
                } for cw in combined_width
            ],
            "metrological_characteristics": [
                {
                    "partial_surface_contact_error": mc.partial_surface_contact_error,
                    "repeatability_of_partial_surface_contact_error": mc.repeatability_of_partial_surface_contact_error,
                    "scale_shift_error": mc.scale_shift_error,
                    "line_contact_error": mc.line_contact_error,
                    "full_surface_contact_error": mc.full_surface_contact_error,
                    "error_due_to_crossed_knife_edge_distance": mc.error_due_to_crossed_knife_edge_distance
                } for mc in metrological_characteristics
            ],
            "details": {
                "method_of_calibration": details.method_of_calibration if details else None,
                "note": details.note if details else None
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
