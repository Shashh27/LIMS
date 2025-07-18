from typing import List, Optional
from pydantic import BaseModel


class QuotationDetailCreate(BaseModel):
    sample: Optional[str] = None
    description: Optional[str] = None
    specification: Optional[str] = None
    qty: Optional[str] = None
    unit: Optional[str] = None
    unit_rate_in_rs: Optional[str] = None
    total_cost: Optional[str] = None

# Pydantic model for quotation form (note: total is not included in input)
class QuotationFormCreate(BaseModel):
    centre: Optional[str] = None
    lab: Optional[str] = None
    enq_no: Optional[str] = None
    date: Optional[str] = None
    customer_details: Optional[str] = None
    contact_person: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    mobile_number: Optional[str] = None
    phone_number: Optional[str] = None
    email_id: Optional[str] = None
    enquiry_ref_and_date: Optional[str] = None
    customer_code: Optional[str] = None
    gst_details: Optional[str] = None
    subject: Optional[str] = None
    activity_note_1: Optional[str] = None
    activity_note_2: Optional[str] = None
    activity_note_3: Optional[str] = None
    activity_note_4: Optional[str] = None
    activity_note_5: Optional[str] = None
    payment: Optional[str] = None
    delivery_period: Optional[str] = None
    scope_note_1: Optional[str] = None
    scope_note_2: Optional[str] = None
    scope_note_3: Optional[str] = None
    scope_note_4: Optional[str] = None
    place_of_work: Optional[str] = None
    ot_charges: Optional[str] = None
    terms_and_conditions_1: Optional[str] = None
    terms_and_conditions_2: Optional[str] = None
    no_of_person_visiting_1: Optional[str] = None
    no_of_person_visiting_2: Optional[str] = None
    
    # List of quotation details
    details: List[QuotationDetailCreate]

    class Config:
        orm_mode = True



class PpmQuotationDetailCreate(BaseModel):
    sample: Optional[str] = None
    description: Optional[str] = None
    specification: Optional[str] = None
    sac_code: Optional[str] = None
    qty: Optional[str] = None
    unit: Optional[str] = None
    unit_rate_in_rs: Optional[str] = None
    total_cost: Optional[str] = None

# Pydantic model for quotation form (note: total is not included in input)
class PpmQuotationFormCreate(BaseModel):
    quotation_no :Optional[str] = None
    date: Optional[str] = None
    customer_details: Optional[str] = None
    contact_person: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    mobile_number: Optional[str] = None
    phone_number: Optional[str] = None
    email_id: Optional[str] = None
    enquiry_ref_and_date: Optional[str] = None
    customer_code: Optional[str] = None
    gst_details: Optional[str] = None
    subject: Optional[str] = None
    delivery_period: Optional[str] = None
    scope_of_work: Optional[str] = None
    place_of_work: Optional[str] = None
    
    # List of quotation details
    details: List[PpmQuotationDetailCreate]

    class Config:
        orm_mode = True


class QuotationStatusUpdate(BaseModel):
    status: str
    remarks: str

class QuotationUpdateResponse(BaseModel):
    id: int
    status: str
    remarks: str
    message: str
    
    class Config:
        orm_mode = True


class QuotationStatusOnly(BaseModel):
    status: str
    
    class Config:
        orm_mode = True

class QuotationRemarksOnly(BaseModel):
    remarks: str
    
    class Config:
        orm_mode = True

# Response models
class StatusUpdateResponse(BaseModel):
    id: int
    status: str
    message: str
    
    class Config:
        orm_mode = True

class RemarksUpdateResponse(BaseModel):
    id: int
    remarks: str
    message: str
    
    class Config:
        orm_mode = True


class AutocollimatorAnalogueBase(BaseModel):
    nominal_angle: Optional[str]
    x_axis_calibrated_values: Optional[str]
    y_axis_calibrated_values: Optional[str]

class AutocollimatorMainScaleBase(BaseModel):
    nominal_angle: Optional[str]
    x_axis_calibrated_values: Optional[str]
    y_axis_calibrated_values: Optional[str]

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str] 
    report_issued_date: Optional[str] 
    customer_name_and_address: Optional[str] 
    item_description: Optional[str] 
    identification_no: Optional[str] 
    Sl_no: Optional[str] 
    DC_no: Optional[str] 
    DC_no_dated: Optional[str] 
    PO_no: Optional[str]
    PO_no_dated: Optional[str] 
    date_of_calibration: Optional[str] 
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str] 
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str] 
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int] 

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str] 

class AutocollimatorCalibrationCreate(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    analogue_data: List[AutocollimatorAnalogueBase]
    mainscale_data: List[AutocollimatorMainScaleBase]

class AutocollimatorAnalogueDetailsResponse(BaseModel):
    method: Optional[str] = None
    note: Optional[str] = None

class AutocollimatorCalibrationResponse(BaseModel):
    certificate_id: int
    test_number: Optional[int]
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    analogue_data: List[AutocollimatorAnalogueBase]
    mainscale_data: List[AutocollimatorMainScaleBase]
    details: Optional[AutocollimatorAnalogueDetailsResponse]


class AutocollimatorDigitalXBase(BaseModel):
    nominal_angle: Optional[str]
    positive_direction_calibrated_values: Optional[str]
    negative_direction_calibrated_values: Optional[str]

class AutocollimatorDigitalYBase(BaseModel):
    nominal_angle: Optional[str]
    positive_direction_calibrated_values: Optional[str]
    negative_direction_calibrated_values: Optional[str]

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str] 
    report_issued_date: Optional[str] 
    customer_name_and_address: Optional[str] 
    item_description: Optional[str] 
    identification_no: Optional[str] 
    Sl_no: Optional[str] 
    DC_no: Optional[str] 
    DC_no_dated: Optional[str] 
    PO_no: Optional[str]
    PO_no_dated: Optional[str] 
    date_of_calibration: Optional[str] 
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str] 
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str] 
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int] 

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str]

class AutocollimatorDigitalCreate(BaseModel):
    certificate_id: int
    test_number: Optional[int]
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    x_axis: List[AutocollimatorDigitalXBase]
    y_axis: List[AutocollimatorDigitalYBase]


class AutocollimatorDigitalDetailsBase(BaseModel):
    method: Optional[str] = None
    note: Optional[str] = None

class AutocollimatorDigitalResponse(BaseModel):
    certificate_id: int
    test_number: Optional[int]
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    x_axis: List[AutocollimatorDigitalXBase]
    y_axis: List[AutocollimatorDigitalYBase]
    details: Optional[AutocollimatorDigitalDetailsBase]


class ClinometerBubbleUpdate(BaseModel):
    leftside_scale_reading: Optional[str] = None
    leftside_calibrated_values: Optional[str] = None
    rightside_scale_reading: Optional[str] = None
    rightside_calibrated_values: Optional[str] = None

class ClinometerDrumUpdate(BaseModel):
    scale_reading: Optional[str] = None
    calibrated_values: Optional[str] = None

class ClinometerMainUpdate(BaseModel):
    scale_reading: Optional[str] = None
    clockwise_direction_calibrated_values: Optional[str] = None
    counter_clockwise_direction_calibrated_values: Optional[str] = None

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str] 
    report_issued_date: Optional[str] 
    customer_name_and_address: Optional[str] 
    item_description: Optional[str] 
    identification_no: Optional[str] 
    Sl_no: Optional[str] 
    DC_no: Optional[str] 
    DC_no_dated: Optional[str] 
    PO_no: Optional[str]
    PO_no_dated: Optional[str] 
    date_of_calibration: Optional[str] 
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str] 
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str] 
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int] 

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str]

class ClinometerUpdate(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    bubble_calibration: List[ClinometerBubbleUpdate] 
    drum_calibration: List[ClinometerDrumUpdate]
    main_calibration: List[ClinometerMainUpdate]

class ClinometerDetailsBase(BaseModel):
    method: Optional[str] = None
    note: Optional[str] = None

class ClinometerResponse(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    bubble_calibration: List[ClinometerBubbleUpdate] 
    drum_calibration: List[ClinometerDrumUpdate]
    main_calibration: List[ClinometerMainUpdate]
    details: Optional[ClinometerDetailsBase]
    

class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str] = None
    report_issued_date: Optional[str] = None
    customer_name_and_address: Optional[str] = None
    item_description: Optional[str] = None
    identification_no: Optional[str] = None
    Sl_no: Optional[str] = None
    DC_no: Optional[str] = None
    DC_no_dated: Optional[str] = None
    PO_no: Optional[str] = None
    PO_no_dated: Optional[str] = None
    date_of_calibration: Optional[str] = None
    place_of_calibration: Optional[str] = None
    reference_document_based_on_IS: Optional[str] = None
    reference_document_based_on_IS_and_WP_no: Optional[str] = None
    temperature_during_calibration: Optional[str] = None
    uncertainity_of_measurement: Optional[str] = None
    equipment: List[FirstSheetEquipmentSchema] = []

class DepthMicroCheckerCalibrationSchema(BaseModel):
    nominal_size: str
    B_side_calibrated_values: str
    A_side_calibrated_values: str
    Parallelity_between_A_side_and_B_side_Calibratedvalues: str

class DepthMicroCheckerAnvilBlockSchema(BaseModel):
    anvil_block_size: str
    calibrated_values: str

class DepthMicroCheckerDetailsSchema(BaseModel):
    method_of_calibration: str
    note: str

class DepthMicroCheckerRequest(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    depth_micro_checker_calibrations: List[DepthMicroCheckerCalibrationSchema]
    anvil_block_calibrations: List[DepthMicroCheckerAnvilBlockSchema]


class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str] = None
    report_issued_date: Optional[str] = None
    customer_name_and_address: Optional[str] = None
    item_description: Optional[str] = None
    identification_no: Optional[str] = None
    Sl_no: Optional[str] = None
    DC_no: Optional[str] = None
    DC_no_dated: Optional[str] = None
    PO_no: Optional[str] = None
    PO_no_dated: Optional[str] = None
    date_of_calibration: Optional[str] = None
    place_of_calibration: Optional[str] = None
    reference_document_based_on_IS: Optional[str] = None
    reference_document_based_on_IS_and_WP_no: Optional[str] = None
    temperature_during_calibration: Optional[str] = None
    uncertainity_of_measurement: Optional[str] = None
    equipment: List[FirstSheetEquipmentSchema] = []

class InclinometerAnalogueCalibrationSchema(BaseModel):
    inclinometer_scale_readings: str
    calibrated_values: str

class InclinometerAnalogueDetailsSchema(BaseModel):
    method_of_calibration: str
    note: str

class InclinometerAnalogueRequest(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    inclinometer_calibrations: List[InclinometerAnalogueCalibrationSchema]
    details: InclinometerAnalogueDetailsSchema


class InclinometerXAxisUpdate(BaseModel):
    inclinometer_reading: Optional[str] = None
    positive_direction: Optional[str] = None
    negative_direction: Optional[str] = None

class InclinometerYAxisUpdate(BaseModel):
    inclinometer_reading: Optional[str] = None
    positive_direction: Optional[str] = None
    negative_direction: Optional[str] = None

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int]

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str]

class InclinometerUpdate(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    x_axis: List[InclinometerXAxisUpdate]
    y_axis: List[InclinometerYAxisUpdate]

class InclinometerDetailsBase(BaseModel):
    method: str
    note: str

class InclinometerResponse(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    x_axis: List[InclinometerXAxisUpdate]
    y_axis: List[InclinometerYAxisUpdate]
    details: Optional[InclinometerDetailsBase] 


class LaserMicrometerBase(BaseModel):
    actual_size_of_setting_plug_gauge: str
    first_set_error: str
    second_set_error: str
    third_set_error: str
    average_error: str

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int]

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str]

class LaserMicrometerCreate(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    values: List[LaserMicrometerBase]  

class LaserMicrometerDetailsResponse(BaseModel):
    method: Optional[str]
    note: Optional[str]

class LaserMicrometerResponse(BaseModel):
    certificate_id: int
    test_number: Optional[int]
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    values: List[LaserMicrometerBase]
    details: Optional[LaserMicrometerDetailsResponse]

class LaserMicrometerPUT(BaseModel):
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    values: List[LaserMicrometerBase] 


class LengthBarBase(BaseModel):
    length_bar_size: str
    calibrated_value: str

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int]

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str]

class LengthBarCalibrationCreate(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    length_bars: List[LengthBarBase]  

class LengthBarDetailsResponse(BaseModel):
    method: Optional[str]
    note: Optional[str]

class LengthBarCalibrationResponse(BaseModel):
    certificate_id: int
    test_number: Optional[int]
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    length_bars: List[LengthBarBase]
    details: Optional[LengthBarDetailsResponse]

class LengthBarCalibrationPUT(BaseModel):
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    length_bars: List[LengthBarBase]


class LongSlip300Base(BaseModel):
    nominal_size: Optional[str] = None
    deviation_at_center: Optional[str] = None
    min_variation: Optional[str] = None
    max_variation: Optional[str] = None
    identification_number: Optional[str] = None

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int]

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str]

class LongSlip300CalibrationCreate(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    gauges: List[LongSlip300Base]

class LongSlip300DetailsResponse(BaseModel):
    method: Optional[str]
    note: Optional[str]

class LongSlip300Response(BaseModel):
    certificate_id: int
    test_number: Optional[int]
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    gauges: List[LongSlip300Base]
    details: Optional[LongSlip300DetailsResponse]

class LongSlip300Calibrationput(BaseModel):
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    gauges: List[LongSlip300Base]


class SpiritLevelBase(BaseModel):
    leftside_scale_reading: Optional[str] = None
    leftside_calibrated_values: Optional[str] = None
    rightside_scale_reading: Optional[str] = None
    rightside_calibrated_values: Optional[str] = None

class SpiritLevelBubbleConsistencyResponse(BaseModel):
    parameter: Optional[str] = None
    calibrated_values: Optional[str] = None

class SpiritLevelGeometricalParametersResponse(BaseModel):
    flatness_of_base: Optional[str] = None
    parallelism_of_v_wrt_flat_base: Optional[str] = None

class SpiritLevelDetailsResponse(BaseModel):
    method: str
    note: str

class FirstSheetBase(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: Optional[int]

class FirstSheetEquipmentsBase(BaseModel):
    equipment_details: Optional[str]

class SpiritLevelCalibrationCreate(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    readings: List[SpiritLevelBase]
    consistency: List[SpiritLevelBubbleConsistencyResponse]
    geometrical_parameters: List[SpiritLevelGeometricalParametersResponse]

class SpiritLevelReportResponse(BaseModel):
    certificate_id: int
    test_number: Optional[int]
    first_sheet: Optional[FirstSheetBase]
    first_sheet_equipments: Optional[List[FirstSheetEquipmentsBase]]
    readings: List[SpiritLevelBase]
    consistency: List[SpiritLevelBubbleConsistencyResponse]
    geometrical_parameters: List[SpiritLevelGeometricalParametersResponse]
    details: Optional[SpiritLevelDetailsResponse]

class SpiritLevelCalibrationput(BaseModel):
    first_sheet: FirstSheetBase
    first_sheet_equipments: List[FirstSheetEquipmentsBase]
    readings: List[SpiritLevelBase]
    consistency: List[SpiritLevelBubbleConsistencyResponse]
    geometrical_parameters: List[SpiritLevelGeometricalParametersResponse]


class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str] = None
    report_issued_date: Optional[str] = None
    customer_name_and_address: Optional[str] = None
    item_description: Optional[str] = None
    identification_no: Optional[str] = None
    Sl_no: Optional[str] = None
    DC_no: Optional[str] = None
    DC_no_dated: Optional[str] = None
    PO_no: Optional[str] = None
    PO_no_dated: Optional[str] = None
    date_of_calibration: Optional[str] = None
    place_of_calibration: Optional[str] = None
    reference_document_based_on_IS: Optional[str] = None
    reference_document_based_on_IS_and_WP_no: Optional[str] = None
    temperature_during_calibration: Optional[str] = None
    uncertainity_of_measurement: Optional[str] = None
    equipment: List[FirstSheetEquipmentSchema] = []

class MicrometerThimbleCalibrationSchema(BaseModel):
    micrometer_reading: str
    slip_gauge_size: str
    error: str

class InterchangeableAnvilsCalibrationSchema(BaseModel):
    range_of_micrometer: str
    anvil_error: str

class SettingGaugeRodsCalibrationSchema(BaseModel):
    nominal_values: str
    calibrated_values: str

class AllowableValuesCalibrationSchema(BaseModel):
    permissible_total_error_over_a_range_of_150_to_200mm: str
    permissible_total_error_over_a_range_of_200_to_250mm: str
    permissible_total_error_over_a_range_of_250_to_300mm: str
    parallelity_of_measuring_faces_over_range_of_150_to_200mm: str
    parallelity_of_measuring_faces_over_range_of_200_to_250mm: str
    parallelity_of_measuring_faces_over_range_of_250_to_300mm: str
    flatness_of_measuring_faces: str

class ExternalMicrometerAnalogueRequest(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    micrometer_thimble_calibrations: List[MicrometerThimbleCalibrationSchema]
    interchangeable_anvils_calibrations: List[InterchangeableAnvilsCalibrationSchema]
    setting_gauge_rods_calibrations: List[SettingGaugeRodsCalibrationSchema]
    allowable_values_calibrations: Optional[List[AllowableValuesCalibrationSchema]] = None


class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str] = None
    report_issued_date: Optional[str] = None
    customer_name_and_address: Optional[str] = None
    item_description: Optional[str] = None
    identification_no: Optional[str] = None
    Sl_no: Optional[str] = None
    DC_no: Optional[str] = None
    DC_no_dated: Optional[str] = None
    PO_no: Optional[str] = None
    PO_no_dated: Optional[str] = None
    date_of_calibration: Optional[str] = None
    place_of_calibration: Optional[str] = None
    reference_document_based_on_IS: Optional[str] = None
    reference_document_based_on_IS_and_WP_no: Optional[str] = None
    temperature_during_calibration: Optional[str] = None
    uncertainity_of_measurement: Optional[str] = None
    equipment: List[FirstSheetEquipmentSchema] = []

class ExternalMicrometerDigitalThimbleSchema(BaseModel):
    slip_gauge_size: str
    micrometer_reading: str
    error: str

class ExternalMicrometerDigitalAnvilsSchema(BaseModel):
    range_of_micrometer: str
    anvil_error: str

class ExternalMicrometerSettingGaugeRodsSchema(BaseModel):
    nominal_values: str
    calibrated_values: str

class ExternalMicrometerAllowableValuesDigitalSchema(BaseModel):
    permissible_total_error_over_a_range_of_150_to_200mm: str
    permissible_total_error_over_a_range_of_200_to_250mm: str
    permissible_total_error_over_a_range_of_250_to_300mm: str
    parallelity_of_measuring_faces_over_range_of_150_to_200mm: str
    parallelity_of_measuring_faces_over_range_of_200_to_250mm: str
    parallelity_of_measuring_faces_over_range_of_250_to_300mm: str
    flatness_of_measuring_faces: str

class ExternalMicrometerDigitalRequest(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    micrometer_thimble_calibrations: List[ExternalMicrometerDigitalThimbleSchema]
    interchangeable_anvils_calibrations: List[ExternalMicrometerDigitalAnvilsSchema]
    setting_gauge_rods_calibrations: List[ExternalMicrometerSettingGaugeRodsSchema]
    allowable_values_calibrations: Optional[List[ExternalMicrometerAllowableValuesDigitalSchema]] = None



class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: int
    equipment: List[FirstSheetEquipmentSchema]

# -------------------------- Depth Gauge Schema --------------------------
class DepthGaugeCalibrationSchema(BaseModel):
    slip_gauge_size: str
    calibrated_values: str
    error: str

class PartialSurfaceContactSchema(BaseModel):
    slip_gauge_size: str
    calibrated_values: str
    partial_surface_contact_error: str

class MetrologicalSchema(BaseModel):
    partial_surface_error: str
    repeatability_of_partial_error: str

class DepthGaugeDetailsSchema(BaseModel):
    method_of_calibration: str
    note: str

class DepthGaugeCalibrationRequest(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetSchema
    depth_gauge_calibrations: List[DepthGaugeCalibrationSchema]
    partial_surface_contact_calibrations: List[PartialSurfaceContactSchema]
    metrological_calibrations: List[MetrologicalSchema]
    depth_gauge_details:List[DepthGaugeDetailsSchema]


class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: str
    equipment: List[FirstSheetEquipmentSchema]

# -------------------------- Electronic Level Schema --------------------------
class ElecLevelMechanicalCalibrationSchema(BaseModel):
    electronic_level_readings: str
    positive_calibrated_values: str
    negative_calibrated_values: str

class ElecLevelGeometricalParametersSchema(BaseModel):
    flatness_of_bottom_face: str
    parellelity_of_V_to_flat_of_bottom_face: str
    perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face: str
    perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face: str

class ElecLevelDetailsSchema(BaseModel):
    method_of_calibration: str
    note: str

class ElecLevelCalibrationRequest(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    mechanical_calibrations: List[ElecLevelMechanicalCalibrationSchema]
    geometrical_parameters: List[ElecLevelGeometricalParametersSchema]
    ele_details_schema:List[ElecLevelDetailsSchema]

# -------------------------- POST Endpoint --------------------------
class ElecLevelCalibrationResponse(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    mechanical_calibrations: List[ElecLevelMechanicalCalibrationSchema]
    geometrical_parameters: List[ElecLevelGeometricalParametersSchema]
    ele_details_schema: Optional[List[ElecLevelDetailsSchema]] = None


class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: str
    equipment: List[FirstSheetEquipmentSchema]

# -------------------------- Frame Level Schema --------------------------
class FrameLevelCalibrationBubbleAccuracySchema(BaseModel):
    scale_reading: str
    right_side_calibrated_values: str
    left_side_calibrated_values: str

class FrameLevelCalibrationBubbleConsistencySchema(BaseModel):
    parameter: str
    calibrated_values: str

class FrameLevelGeometricalCalibrationSchema(BaseModel):
    flatness_of_base_A: Optional[str]
    parallelity_flat_to_V_face_A: Optional[str]
    parallelity_face_C_wrt_face_A: Optional[str]
    parallelity_face_D_wrt_face_B: Optional[str]
    perpendicularity_face_B_wrt_face_A_flat_to_flat: Optional[str]
    perpendicularity_face_B_wrt_face_A: Optional[str]
    perpendicularity_of_face_d: Optional[str]

class FrameLevelDetailsSchema(BaseModel):
    method_of_calibration: str
    note: str

class FrameLevelCalibrationRequest(BaseModel):
    certificate_id: int
    test_number: str
    first_sheet: FirstSheetSchema
    bubble_accuracy: List[FrameLevelCalibrationBubbleAccuracySchema]
    bubble_consistency: List[FrameLevelCalibrationBubbleConsistencySchema]
    geometrical_parameters: List[FrameLevelGeometricalCalibrationSchema]
    frame_level_details:List[FrameLevelDetailsSchema]



class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: str
    equipment: List[FirstSheetEquipmentSchema]


class IndexingTableMechanicalCalibrationSchema(BaseModel):
    normal_positioning: int
    firstset_calibrated_cumulative_errors: str
    secondset_calibrated_cumulative_errors: str
    thirdset_calibrated_cumulative_errors: str
    average_cumulative_errors: str

class IndexingTableDetailsSchema(BaseModel):
    method_used: str

class IndexingTableCalibrationRequest(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetSchema
    mechanical_calibrations: List[IndexingTableMechanicalCalibrationSchema]
  
    
class IndexingTableCalibrationResponse(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet:FirstSheetSchema
    mechanical_calibrations: List[IndexingTableMechanicalCalibrationSchema]
    details: Optional[IndexingTableDetailsSchema]



class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: str
    equipment: List[FirstSheetEquipmentSchema]

class RotaryTableMechanicalCalibrationSchema(BaseModel):
    nominal_positioning: int
    pair_of_facesets_on_polygon_mirror: str
    firstset_calibrated_cumulative_errors: str
    secondset_calibrated_cumulative_errors: str
    thirdset_calibrated_cumulative_errors: str
    average_cumulative_errors_wrt_mastervalues: str

class RotaryTableDetailsSchema(BaseModel):
    method_used: str

class RotaryTableCalibrationRequest(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetSchema
    mechanical_calibrations: List[RotaryTableMechanicalCalibrationSchema]

class RotaryTableCalibrationResponse(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetSchema
    mechanical_calibrations: List[RotaryTableMechanicalCalibrationSchema]
    details: Optional[RotaryTableDetailsSchema]


class FirstSheetEquipmentSchema(BaseModel):
    equipment_details: str

class FirstSheetSchema(BaseModel):
    ulr_no: Optional[str]
    report_issued_date: Optional[str]
    customer_name_and_address: Optional[str]
    item_description: Optional[str]
    identification_no: Optional[str]
    Sl_no: Optional[str]
    DC_no: Optional[str]
    DC_no_dated: Optional[str]
    PO_no: Optional[str]
    PO_no_dated: Optional[str]
    date_of_calibration: Optional[str]
    place_of_calibration: Optional[str]
    reference_document_based_on_IS: Optional[str]
    reference_document_based_on_IS_and_WP_no: Optional[str]
    temperature_during_calibration: Optional[str]
    uncertainity_of_measurement: Optional[str]
    test_number: int
    equipment: List[FirstSheetEquipmentSchema]

# -------------------------- Vernier Caliper Schema --------------------------
class VernierCaliperExternalMeasuringJawsSchema(BaseModel):
    slip_gauge_size: str
    caliper_reading: str
    error: str

class VernierCaliperInternalMeasuringJawsSchema(BaseModel):
    setting_ring_gauge_size: str
    caliper_reading: str
    error: str

class VernierCaliperDepthMeasuringBladeSchema(BaseModel):
    slip_gauge_size: str
    caliper_reading: str
    error: str

class VernierCaliperPartialSurfaceContactSchema(BaseModel):
    slip_gauge_size: str
    caliper_reading: str
    partial_surface_contact_error: str

class VernierCaliperCombinedWidthSchema(BaseModel):
    nominal_value: str
    calibrated_value: str

class VernierCaliperMetrologicalCharacteristicsSchema(BaseModel):
    partial_surface_contact_error: str
    repeatability_of_partial_surface_contact_error: str
    scale_shift_error: str
    line_contact_error: str
    full_surface_contact_error: str
    error_due_to_crossed_knife_edge_distance: str



class VernierCaliperDetailsSchema(BaseModel):
    method_of_calibration: str
    note: str

class VernierCaliperCalibrationRequest(BaseModel):
    certificate_id: int
    test_number: int
    first_sheet: FirstSheetSchema
    external_measuring_jaws: List[VernierCaliperExternalMeasuringJawsSchema]
    internal_measuring_jaws: List[VernierCaliperInternalMeasuringJawsSchema]
    depth_measuring_blade: List[VernierCaliperDepthMeasuringBladeSchema]
    partial_surface_contact: List[VernierCaliperPartialSurfaceContactSchema]
    combined_width: List[VernierCaliperCombinedWidthSchema]
    metrological_characteristics: List[VernierCaliperMetrologicalCharacteristicsSchema]


