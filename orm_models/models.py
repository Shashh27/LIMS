from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
Base = declarative_base()

class CalibrationCharges(Base):
    __tablename__ = "calibration_charges"

    id = Column(Integer, primary_key=True, autoincrement=True)
    slno = Column(String, nullable=True)
    particulars = Column(String, nullable=True)
    specifications = Column(String, nullable=True)
    scope_of_calibration = Column(String, nullable=True)
    charges_april_2020 = Column(String, nullable=True)
    proposed_charges_2023 = Column(String, nullable=True)
    percentage_increase = Column(String, nullable=True)
    nabl_logo = Column(String, nullable=True)

    class Config:
        orm_mode = True

class AdditionalCalibrationCharges(Base):
    __tablename__ = "additional_callibration_charges"

    id = Column(Integer, primary_key=True, autoincrement=True)
    particulars = Column(String, nullable=True)
    main_activity = Column(String, nullable=True)
    charges_april_2020 = Column(String, nullable=True)

    class Config:
        orm_mode = True


class QuotationForm(Base):
    __tablename__ = "quotation_form"

    id = Column(Integer, primary_key=True, autoincrement=True)
    centre = Column(String, nullable=True)
    lab = Column(String, nullable=True)
    enq_no = Column(String, nullable=True)
    date = Column(String, nullable=True)
    customer_details = Column(String, nullable=True)
    contact_person = Column(String, nullable=True)
    designation = Column(String, nullable=True)
    department = Column(String, nullable=True)
    mobile_number = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    email_id = Column(String, nullable=True)
    enquiry_ref_and_date = Column(String, nullable=True)
    customer_code = Column(String, nullable=True)
    gst_details = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    total = Column(String, nullable=True)
    activity_note_1 = Column(String, nullable=True)
    activity_note_2 = Column(String, nullable=True)
    activity_note_3 = Column(String, nullable=True)
    activity_note_4 = Column(String, nullable=True)
    activity_note_5 = Column(String, nullable=True)
    payment = Column(String, nullable=True)
    delivery_period = Column(String, nullable=True)
    scope_note_1 = Column(String, nullable=True)
    scope_note_2 = Column(String, nullable=True)
    scope_note_3 = Column(String, nullable=True)
    scope_note_4 = Column(String, nullable=True)
    place_of_work = Column(String, nullable=True)
    ot_charges = Column(String, nullable=True)
    terms_and_conditions_1 = Column(String, nullable=True)
    terms_and_conditions_2 = Column(String, nullable=True)
    no_of_person_visiting_1 = Column(String, nullable=True)
    no_of_person_visiting_2 = Column(String, nullable=True)
    status = Column(String, nullable=True)
    remarks = Column(String , nullable=True)

    # Relationship with QuotationDetails
    details = relationship("QuotationDetails", back_populates="quotation_form")

    class Config:
        orm_mode = True


class QuotationDetails(Base):
    __tablename__ = "quotation_details"

    id = Column(Integer, primary_key=True, autoincrement=True)
    quotationform_id = Column(Integer, ForeignKey("quotation_form.id"), nullable=True)
    sample = Column(String, nullable=True)
    description = Column(String, nullable=True)
    specification = Column(String, nullable=True)
    qty = Column(String, nullable=True)
    unit = Column(String, nullable=True)
    unit_rate_in_rs = Column(String, nullable=True)
    total_cost = Column(String, nullable=True)

    # Relationship with QuotationForm
    quotation_form = relationship("QuotationForm", back_populates="details")

    class Config:
        orm_mode = True


class PpmQuotationForm(Base):
    __tablename__ = "ppm_quotation_form"

    id = Column(Integer, primary_key=True, autoincrement=True)
    quotation_no = Column(String)
    date = Column(String, nullable=True)
    customer_details = Column(String, nullable=True)
    contact_person = Column(String, nullable=True)
    designation = Column(String, nullable=True)
    department = Column(String, nullable=True)
    mobile_number = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    email_id = Column(String, nullable=True)
    enquiry_ref_and_date = Column(String, nullable=True)
    customer_code = Column(String, nullable=True)
    gst_details = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    total = Column(String, nullable=True)
    delivery_period = Column(String, nullable=True)
    scope_of_work = Column(String, nullable=True)
    place_of_work = Column(String, nullable=True)
    status = Column(String, nullable=True)
    remarks = Column(String , nullable=True)

    # Relationship with QuotationDetails
    ppm_details = relationship("PpmQuotationDetails", back_populates="ppm_quotation_form")

    class Config:
        orm_mode = True


class PpmQuotationDetails(Base):
    __tablename__ = "ppm_quotation_details"

    id = Column(Integer, primary_key=True, autoincrement=True)
    quotationform_id = Column(Integer, ForeignKey("ppm_quotation_form.id"), nullable=True)
    sample = Column(String, nullable=True)
    description = Column(String, nullable=True)
    specification = Column(String, nullable=True)
    sac_code = Column(String, nullable=True)
    qty = Column(String, nullable=True)
    unit = Column(String, nullable=True)
    unit_rate_in_rs = Column(String, nullable=True)
    total_cost = Column(String, nullable=True)

    # Relationship with QuotationForm
    ppm_quotation_form = relationship("PpmQuotationForm", back_populates="ppm_details")

    class Config:
        orm_mode = True


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    department = Column(String, nullable=True)

    class Config:
        orm_mode = True



class Equipment(Base):
    __tablename__ = 'equipments'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String)

    class Config:
        orm_mode = True


class Master(Base):
    __tablename__ = "master_table"

    id = Column(Integer , primary_key=True , autoincrement=True)
    certification_name = Column(String, nullable=False)

    polygon_mirror_calibrations = relationship("CalibrationOfPolygonMirror", back_populates="master")
    polygon_mirror_details = relationship("PolygonMirrorDetails", back_populates="master")
    setting_rod_calibrations = relationship("SettingRod", back_populates="master")
    setting_rod_details = relationship("SettingRodDetails", back_populates="master")
    sine_bar_calibrations = relationship("CalibrationOfSineBar", back_populates="master")
    sine_bar_details = relationship("SineBarDetails", back_populates="master")
    straight_edge_calibrations = relationship("StraightEdge", back_populates="master")
    autocollimator = relationship("AutocollimatorAnalogue", back_populates="master", cascade="all, delete")
    autocollimator_ms = relationship("AutocollimatorMainScale", back_populates="master", cascade="all, delete")
    autocollimator_details = relationship("AutocollimatorDetails", back_populates="master", cascade="all, delete")
    autocollimator_digital =  relationship("AutocollimatorDigital", back_populates="master")
    autocollimator_digital_y =  relationship("AutocollimatorDigitalYaxis", back_populates="master")
    autocollimator_digital_details = relationship("AutocollimatorDigitalDetails", back_populates="master")
    clinometer_bubble = relationship("ClinometerCalibration", back_populates="master")
    clinometer_drumscale = relationship("ClinometerCalibrationDrum", back_populates="master")
    clinometer_main = relationship("ClinometerCalibrationMain", back_populates="master")
    clinometer_details = relationship("ClinometerCalibrationDetails", back_populates="master")
    depth_microchecker = relationship("DepthMicroChecker", back_populates="master")
    depth_microchecker_anvil = relationship("DepthMicroCheckerAnvilBlock", back_populates="master")
    depth_microchecker_details = relationship("DepthMicroCheckerDetails", back_populates="master")
    inclinometer_analogue_mechcal = relationship("InclinometerAnalogue", back_populates="master")
    inclinometer_analogue_mechcal_details = relationship("InclinometerAnalogueDetails", back_populates="master")
    inclinometer_dig_xaxis = relationship("Inclinometer_Dig_XAxis", back_populates="master")
    inclinometer_dig_yaxis = relationship("Inclinometer_Dig_YAxis", back_populates="master")
    inclinometer_dig_details = relationship("InclinometerDigDetails", back_populates="master")
    laser_micrometer = relationship("LaserMicrometer", back_populates="master")
    laser_micrometer_details = relationship("LaserMicrometerDetails", back_populates="master")
    length_bar = relationship("LengthBar", back_populates="master")
    length_bar_details = relationship("LengthBarDetails", back_populates="master")
    long_slip300 = relationship("LongSlip300", back_populates="master")
    long_slip300_details = relationship("LongSlip300Details", back_populates="master")

    ext_mm_thimble = relationship("ExternalMicrometer", back_populates="certificate", cascade="all, delete")
    ext_mm_interchangable_anvils = relationship("InterchangableAnvils", back_populates="certificate", cascade="all, delete")
    ext_mm_setting_gauge_rods = relationship("MicrometerSettingGaugeRods", back_populates="certificate", cascade="all, delete")
    ext_mm_allowablevalues_LC = relationship("AllowableValuesForLC_Micrometer", back_populates="certificate", cascade="all, delete")
    allowable_values_LC_details = relationship("AllowableValuesForLC_MicrometerDetails", back_populates="certificate", cascade="all, delete")

    ext_mm_digital_thimble = relationship("ExternalMicrometerDigtal", back_populates="certificate", cascade="all, delete")
    ext_mm_digital_anvil = relationship("ExternalMicrometerDigtalAnvils", back_populates="certificate", cascade="all, delete")
    ext_mm_digital_setting_gaugerods = relationship("ExternalMicrometerSettingGaugeRods", back_populates="certificate", cascade="all, delete")
    ext_mm_digital_allowablevalues_LC = relationship("ExternalMicrometerAllowableValuesDigital", back_populates="certificate", cascade="all, delete")
    ext_mm_digital_details = relationship("ExternalMicrometerDigitalDetails", back_populates="certificate", cascade="all, delete")

    vdg = relationship("VernierDepthGaugeCalibration", back_populates = "certificate")
    vdg_psc = relationship("VernierDepthGaugeCalibrationPartialSurfaceContact", back_populates = "certificate")
    vdg_mc = relationship("VernierDepthGaugeCalibrationMetrological", back_populates = "certificate")
    vdg_details = relationship("VernierDepthGaugeCalibrationDetails", back_populates = "certificate")

    electronic_levels = relationship("ElecLevelMechanicalCalibration", back_populates="certificate", cascade="all, delete")
    geometrical_parameters = relationship("ElecLevelGeometricalParameters", back_populates="certificate", cascade="all, delete")
    electronic_details = relationship("ElecLevelDetails", back_populates="certificate", cascade="all, delete")

    frame_level_bubble_accuracy = relationship("FrameLevelCalibrationBubbleAccuracy", back_populates="certificate", cascade="all, delete")
    frame_level_bubble_consistency = relationship("FrameLevelCalibrationBubbleConsistency", back_populates="certificate", cascade="all, delete")
    frame_level_geometrical_parameter = relationship("FrameLevelGeometricalCalibration", back_populates="certificate", cascade="all, delete")
    frame_details = relationship("FrameLevelDetails", back_populates="certificate", cascade="all, delete")

    indexing_table_calibration = relationship("IndexingTableMechanicalCalibration", back_populates="certificate", cascade="all, delete")
    indexing_table_additional = relationship("IndexingTableDetails", back_populates="certificate", cascade="all, delete")

    rotary_table_calibration = relationship("RotaryTableMechanicalCalibration", back_populates="certificate", cascade="all, delete")
    rotary_table_calibration_details = relationship("RotaryTableMechanicalCalibrationDetails", back_populates="certificate", cascade="all, delete")


    spiritlevel_calibration = relationship("SpiritLevel", back_populates="certificate", cascade="all, delete")
    spiritlevel_calibration_consistency = relationship("SpiritLevelBubbleConsistency", back_populates="certificate", cascade="all, delete")
    spiritlevel_calibration_gp = relationship("SpiritLevelGeometricalParameters", back_populates="certificate", cascade="all, delete")
    spiritlevel_calibration_info = relationship("SpiritLevelDetails", back_populates="certificate", cascade="all, delete")

    vc_emj = relationship("VernierCaliperCalibration", back_populates = "certificate", cascade = "all, delete")
    vc_imj = relationship("VernierCaliperCalibration2", back_populates = "certificate", cascade = "all, delete")
    vc_dmb = relationship("VernierCaliperCalibration3", back_populates = "certificate", cascade = "all, delete")
    vc_psc = relationship("VernierCaliperCalibration4", back_populates = "certificate", cascade = "all, delete")
    vc_cw = relationship("VernierCaliperCalibration5", back_populates = "certificate", cascade = "all, delete")
    vc_mc = relationship("VernierCaliperCalibration6", back_populates = "certificate", cascade = "all, delete")
    vc_details = relationship("VernierCaliperCalibrationDetails", back_populates = "certificate", cascade = "all, delete")


    class Config:
        orm_mode = True



class FirstSheet(Base):
    __tablename__ = "first_sheet"

    id = Column(Integer, primary_key=True, index=True)
    ulr_no = Column(String, nullable=True)
    report_issued_date = Column(String, nullable=True)
    customer_name_and_address = Column(String, nullable=True)
    item_description = Column(String, nullable=True)
    identification_no = Column(String, nullable=True)
    Sl_no = Column(String, nullable=True)
    DC_no = Column(String, nullable=True)
    DC_no_dated = Column(String, nullable=True)
    PO_no = Column(String, nullable=True)
    PO_no_dated = Column(String, nullable=True)
    date_of_calibration = Column(String, nullable=True)
    place_of_calibration = Column(String, nullable=True)
    reference_document_based_on_IS = Column(String, nullable=True)
    reference_document_based_on_IS_and_WP_no = Column(String, nullable=True)
    temperature_during_calibration = Column(String, nullable=True)
    uncertainity_of_measurement = Column(String, nullable=True)
    test_number = Column(String, nullable=True)

    # Relationship to Equipment
    equipment = relationship("FirstSheetEquipments", back_populates="certificate", cascade="all, delete")


class FirstSheetEquipments(Base):
    __tablename__ = "first_sheet_equipments"

    id = Column(Integer, primary_key=True, index=True)
    report_no = Column(Integer, ForeignKey("first_sheet.id"),nullable=False)
    equipment_details = Column(String, nullable=True)
    

    # Relationship back to Calibration
    certificate = relationship("FirstSheet", back_populates="equipment")



class CalibrationOfPolygonMirror(Base):
    __tablename__ = "calibration_of_polygon_mirror"

    id = Column(Integer, primary_key=True, autoincrement=True)
    cumulative_angle_between_faces = Column(String, nullable=True)
    cumulative_measured_error_in_arc_seconds = Column(String, nullable=True)
    adjacent_angle_between_faces = Column(String, nullable=True)
    adjacent_measured_error_in_arc_seconds = Column(String, nullable=True)
    certification_id = Column(Integer, ForeignKey("master_table.id"), nullable=True)
    test_no = Column(Integer, nullable=True)

    # Updated relationship with Master table
    master = relationship("Master", back_populates="polygon_mirror_calibrations")

    class Config:
        orm_mode = True

class PolygonMirrorDetails(Base):
    __tablename__ = "polygon_mirror_details"

    id = Column(Integer, primary_key=True, autoincrement=True)
    method_of_calibration = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship with Master table
    master = relationship("Master", back_populates="polygon_mirror_details")

    class Config:
        orm_mode = True


class SettingRod(Base):
    __tablename__ = "calibration_of_setting_rod"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nominal_values = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_no = Column(Integer, nullable=False)

    master = relationship("Master", back_populates="setting_rod_calibrations")

    class Config:
        orm_mode = True


class SettingRodDetails(Base):
    __tablename__ = "setting_rod_details"

    id = Column(Integer, primary_key=True, autoincrement=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship with Master table
    master = relationship("Master", back_populates="setting_rod_details")

    class Config:
        orm_mode = True

class CalibrationOfSineBar(Base):
    __tablename__ = "calibration_of_sine_bar"

    id = Column(Integer, primary_key=True, autoincrement=True)
    certification_id = Column(Integer, ForeignKey("master_table.id"), nullable=True)
    Flatness_of_working_surfaces = Column(String, nullable=True)
    Parallelism_of_working_faces_to_contact_surface = Column(String, nullable=True)
    left_end_roller = Column(String, nullable=True)
    right_end_roller = Column(String, nullable=True)
    Parallelity_between_roller_axis = Column(String, nullable=True)
    working_face_end_face_1 = Column(String, nullable=True)
    working_face_end_face_2 = Column(String, nullable=True)
    side_face_1 = Column(String, nullable=True)
    side_face_2 = Column(String, nullable=True)
    end_face_1_side_face_1 = Column(String, nullable=True)
    end_face_2_side_face_1 = Column(String, nullable=True)
    end_face_1_side_face_2 = Column(String, nullable=True)
    end_face_2_side_face_2 = Column(String, nullable=True)
    diameter_roller_1 = Column(String, nullable=True)
    diameter_roller_2 = Column(String, nullable=True)
    cylindricity_roller_1 = Column(String, nullable=True)
    Variation_in_Diameter_of_rollers = Column(String, nullable=True)
    Centre_distance_between_rollers = Column(String, nullable=True)
    setting_angle_error_15 = Column(String, nullable=True)
    setting_angle_error_30 = Column(String, nullable=True)
    setting_angle_error_45 = Column(String, nullable=True)
    test_no = Column(Integer, nullable=True)

    # Relationship with Master table
    master = relationship("Master", back_populates="sine_bar_calibrations")

    class Config:
        orm_mode = True


class SineBarDetails(Base):
    __tablename__ = "sine_bar_details"

    id = Column(Integer, primary_key=True, autoincrement=True)
    certification_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)

    # Relationship with Master table
    master = relationship("Master", back_populates="sine_bar_details")

    class Config:
        orm_mode = True

class StraightEdge(Base):
    __tablename__ = "straight_edge"

    id = Column(Integer, primary_key=True, autoincrement=True)
    certification_id = Column(Integer, ForeignKey("master_table.id"), nullable=True)
    allowable_value_for_Straightness_of_Face_A = Column(String, nullable=True)
    allowable_value_for_Straightness_of_Face_B = Column(String, nullable=True)
    allowable_value_Parallelity_between_Faces = Column(String, nullable=True)
    calibrated_value_for_Straightness_of_Face_A = Column(String, nullable=True)
    calibrated_value_for_Straightness_of_Face_B = Column(String, nullable=True)
    calibrated_value_Parallelity_between_Faces = Column(String, nullable=True)

    # Relationship with Master table
    master = relationship("Master", back_populates="straight_edge_calibrations")

    class Config:
        orm_mode = True



class AutocollimatorAnalogue(Base):
    __tablename__ = "autocollimator_drumscale"

    id = Column(Integer, primary_key=True, index=True)
    nominal_angle = Column(String, nullable=False)
    x_axis_calibrated_values = Column(String, nullable=False)
    y_axis_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="autocollimator")

class AutocollimatorMainScale(Base):
    __tablename__ = "autocollimator_mainscale"

    id = Column(Integer, primary_key=True, index=True)
    nominal_angle = Column(String, nullable=False)
    x_axis_calibrated_values = Column(String, nullable=False)
    y_axis_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="autocollimator_ms")  

class AutocollimatorDetails(Base):
    __tablename__ = "autocollimator_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="autocollimator_details")


class AutocollimatorDigital(Base):
    __tablename__ = "autocollimator_digital_x_axis"

    id = Column(Integer, primary_key=True, index=True)
    nominal_angle = Column(String, nullable=False)
    positive_direction_calibrated_values = Column(String, nullable=False)
    negative_direction_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="autocollimator_digital")

class AutocollimatorDigitalYaxis(Base):
    __tablename__ = "autocollimator_digital_y_axis"

    id = Column(Integer, primary_key=True, index=True)
    nominal_angle = Column(String, nullable=False)
    positive_direction_calibrated_values = Column(String, nullable=False)
    negative_direction_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="autocollimator_digital_y")

class AutocollimatorDigitalDetails(Base):
    __tablename__ = "autocollimator_digital_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="autocollimator_digital_details")


class ClinometerCalibration(Base):
    __tablename__ = "clinometer_calibration_bubble"

    id = Column(Integer, primary_key=True, index=True)
    leftside_scale_reading = Column(String, nullable=False)
    leftside_calibrated_values = Column(String, nullable=False)
    rightside_scale_reading = Column(String, nullable=False)
    rightside_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="clinometer_bubble")

class ClinometerCalibrationDrum(Base):
    __tablename__ = "clinometer_calibration_drumscale"

    id = Column(Integer, primary_key=True, index=True)
    scale_reading = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="clinometer_drumscale")

class ClinometerCalibrationMain(Base):
    __tablename__ = "clinometer_calibration_mainscale"

    id = Column(Integer, primary_key=True, index=True)
    scale_reading = Column(String, nullable=False)
    clockwise_direction_calibrated_values = Column(String, nullable=False)
    counter_clockwise_direction_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="clinometer_main")


class ClinometerCalibrationDetails(Base):
    __tablename__ = "clinometer_calibration_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="clinometer_details")


class DepthMicroChecker(Base):
    __tablename__ = "depth_micro_checker"

    id = Column(Integer, primary_key=True, index=True)
    nominal_size = Column(String, nullable=False)
    B_side_calibrated_values = Column(String, nullable=False)
    A_side_calibrated_values = Column(String, nullable=False)
    Parallelity_between_A_side_and_B_side_Calibratedvalues = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="depth_microchecker")


class DepthMicroCheckerAnvilBlock(Base):
    __tablename__ = "depthmicro_checker_anvil_block"

    id = Column(Integer, primary_key=True, index=True)
    anvil_block_size = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="depth_microchecker_anvil")

class DepthMicroCheckerDetails(Base):
    __tablename__ = "depth_micro_checker_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="depth_microchecker_details")


class InclinometerAnalogue(Base):
    __tablename__ = "inclinometer_analogue_mechanical_calibration"

    id = Column(Integer, primary_key=True, index=True)
    inclinometer_scale_readings = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="inclinometer_analogue_mechcal")


class InclinometerAnalogueDetails(Base):
    __tablename__ = "inclinometer_analogue_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    master = relationship("Master", back_populates="inclinometer_analogue_mechcal_details")


class Inclinometer_Dig_XAxis(Base):
    __tablename__ = "inclinometer_digital_xaxis"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    inclinometer_reading = Column(String, nullable=False)  # Inclinometer Readings
    positive_direction = Column(String, nullable=False)  # Calibrated Value in +Ve Direction
    negative_direction = Column(String, nullable=False)  # Calibrated Value in -Ve Direction

    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False) 

    master = relationship("Master", back_populates="inclinometer_dig_xaxis")

class Inclinometer_Dig_YAxis(Base):
    __tablename__ = "inclinometer_digital_yaxis"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    inclinometer_reading = Column(String, nullable=False)  # Inclinometer Readings
    positive_direction = Column(String, nullable=False)  # Calibrated Value in +Ve Direction
    negative_direction = Column(String, nullable=False)  # Calibrated Value in -Ve Direction

    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False) 

    master = relationship("Master", back_populates="inclinometer_dig_yaxis")

class InclinometerDigDetails(Base):
    __tablename__ = "inclinometer_digital_details"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    method = Column(String, nullable=True)
    note = Column(String, nullable=True)
    certificate_id = Column(Integer, ForeignKey("master_table.id", ondelete="CASCADE"), nullable=False)

    master = relationship("Master", back_populates="inclinometer_dig_details")


class LaserMicrometer(Base):
    __tablename__ = "laser_micrometer"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    actual_size_of_setting_plug_gauge = Column(String, nullable=False)  # Actual size of setting plug gauges
    first_set_error = Column(String, nullable=False)  # Error in 1st set
    second_set_error = Column(String, nullable=False)  # Error in 2nd set
    third_set_error = Column(String, nullable=False)  # Error in 3rd set
    average_error = Column(String, nullable=False)  # Average error

    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)  # Linking to master table
    test_number = Column(Integer, nullable=False)  # Test number

    master = relationship("Master", back_populates="laser_micrometer")

class LaserMicrometerDetails(Base):
    __tablename__ = "laser_micrometer_details"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    method = Column(String, nullable=True)
    note = Column(String, nullable=True)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    master = relationship("Master", back_populates="laser_micrometer_details")


class LengthBar(Base):
    __tablename__ = "length_bar"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    length_bar_size = Column(String, nullable=False)
    calibrated_value = Column(String, nullable=False)

    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False) 
    test_number = Column(Integer, nullable=False)  

    master = relationship("Master", back_populates="length_bar")

class LengthBarDetails(Base):
    __tablename__ = "length_bar_details"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    method = Column(String, nullable=True)
    note = Column(String, nullable=True)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    master = relationship("Master", back_populates="length_bar_details")




class LongSlip300(Base):
    __tablename__ = "long_slip300"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nominal_size = Column(String, nullable=False)  # Nominal Size
    deviation_at_center = Column(String, nullable=False)  # Deviation at Center
    min_variation = Column(String, nullable=False)  # Minimum Overall Variation
    max_variation = Column(String, nullable=False)  # Maximum Overall Variation
    identification_number = Column(String, nullable=False)  # Identification Number

    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)  # Links to master table
    test_number = Column(Integer, nullable=False)  # Test number

    master = relationship("Master", back_populates="long_slip300")

class LongSlip300Details(Base):
    __tablename__ = "long_slip300_details"

    sl_no = Column(Integer, primary_key=True, autoincrement=True, index=True)
    method = Column(String, nullable=True)
    note = Column(String, nullable=True)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    master = relationship("Master", back_populates="long_slip300_details")


class ExternalMicrometer(Base):
    __tablename__ = "external_micrometer_thimble"

    id = Column(Integer, primary_key=True, index=True)
    micrometer_reading = Column(String, nullable=False)
    slip_gauge_size = Column(String, nullable=False)
    error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_thimble", cascade="all, delete")

class InterchangableAnvils(Base):
    __tablename__ = "external_micrometer_interchangable_anvils"

    id = Column(Integer, primary_key=True, index=True)
    range_of_micrometer = Column(String, nullable=False)
    anvil_error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_interchangable_anvils", cascade="all, delete")

class MicrometerSettingGaugeRods(Base):
    __tablename__ = "external_micrometer_setting_gauge_rods"

    id = Column(Integer, primary_key=True, index=True)
    nominal_values = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_setting_gauge_rods", cascade="all, delete")

class AllowableValuesForLC_Micrometer(Base):
    __tablename__ = "external_micrometer_allowable_values_for_LC"

    id = Column(Integer, primary_key=True, index=True)
    permissible_total_error_over_a_range_of_150_to_200mm = Column(String, nullable=False)
    permissible_total_error_over_a_range_of_200_to_250mm = Column(String, nullable=False)
    permissible_total_error_over_a_range_of_250_to_300mm = Column(String, nullable=False)
    parallelity_of_measuring_faces_over_range_of_150_to_200mm = Column(String, nullable=False)
    parallelity_of_measuring_faces_over_range_of_200_to_250mm = Column(String, nullable=False)
    parallelity_of_measuring_faces_over_range_of_250_to_300mm = Column(String, nullable=False)
    flatness_of_measuring_faces = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_allowablevalues_LC", cascade="all, delete")

class AllowableValuesForLC_MicrometerDetails(Base):
    __tablename__ = "allowable_values_LC_micrometer_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="allowable_values_LC_details")


class ExternalMicrometerDigtal(Base):
    __tablename__ = "external_micrometer_digital_thimble"

    id = Column(Integer, primary_key=True, index=True)
    slip_gauge_size = Column(String, nullable=False)
    micrometer_reading = Column(String, nullable=False)
    error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_digital_thimble", cascade="all, delete")


class ExternalMicrometerDigtalAnvils(Base):
    __tablename__ = "external_micrometer_digital_interchangable_anvils"

    id = Column(Integer, primary_key=True, index=True)
    range_of_micrometer = Column(String, nullable=False)
    anvil_error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_digital_anvil", cascade="all, delete")


class ExternalMicrometerSettingGaugeRods(Base):
    __tablename__ = "external_micrometer_digital_setting_gaugerods"

    id = Column(Integer, primary_key=True, index=True)
    nominal_values = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_digital_setting_gaugerods", cascade="all, delete")

class ExternalMicrometerAllowableValuesDigital(Base):
    __tablename__ = "external_micrometer_digital_allowable_values_LC"

    id = Column(Integer, primary_key=True, index=True)
    permissible_total_error_over_a_range_of_150_to_200mm = Column(String, nullable=False)
    permissible_total_error_over_a_range_of_200_to_250mm = Column(String, nullable=False)
    permissible_total_error_over_a_range_of_250_to_300mm = Column(String, nullable=False)
    parallelity_of_measuring_faces_over_range_of_150_to_200mm = Column(String, nullable=False)
    parallelity_of_measuring_faces_over_range_of_200_to_250mm = Column(String, nullable=False)
    parallelity_of_measuring_faces_over_range_of_250_to_300mm = Column(String, nullable=False)
    flatness_of_measuring_faces = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer,nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_digital_allowablevalues_LC", cascade="all, delete")


class ExternalMicrometerDigitalDetails(Base):
    __tablename__ = "external_micrometer_digital_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="ext_mm_digital_details")


class VernierDepthGaugeCalibration(Base):
    __tablename__ = "vernier_depth_gauge"

    id = Column(Integer, primary_key=True, index=True)
    slip_gauge_size = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vdg")

class VernierDepthGaugeCalibrationPartialSurfaceContact(Base):
    __tablename__ = "vernier_depth_gauge_partial_surface_contact"

    id = Column(Integer, primary_key=True, index=True)
    slip_gauge_size = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    partial_surface_contact_error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vdg_psc")

class VernierDepthGaugeCalibrationMetrological(Base):
    __tablename__ = "vernier_depth_gauge_metrological"

    id = Column(Integer, primary_key=True, index=True)
    partial_surface_error = Column(String, nullable=False)
    repeatability_of_partial_error = Column(String, nullable=False)    
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vdg_mc")

class VernierDepthGaugeCalibrationDetails(Base):
    __tablename__ = "vernier_depth_gauge_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vdg_details")


class ElecLevelMechanicalCalibration(Base):
    __tablename__ = "elec_level_calibration"

    id = Column(Integer, primary_key=True, index=True)
    electronic_level_readings = Column(String, nullable=False)
    positive_calibrated_values = Column(String, nullable=False)
    negative_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="electronic_levels", cascade="all, delete")


class ElecLevelGeometricalParameters(Base):
    __tablename__ = "elec_level_geometrical_parameters"

    id = Column(Integer, primary_key=True, index=True)
    flatness_of_bottom_face = Column(String, nullable=False)
    parellelity_of_V_to_flat_of_bottom_face = Column(String, nullable=False)
    perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face = Column(String, nullable=False)
    perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="geometrical_parameters")

class ElecLevelDetails(Base):
    __tablename__ = "elec_level_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="electronic_details")


class FrameLevelCalibrationBubbleAccuracy(Base):
    __tablename__ = "frame_level_calibration"

    id = Column(Integer, primary_key=True, index=True)
    scale_reading = Column(String, nullable=False)
    right_side_calibrated_values = Column(String, nullable=False)
    left_side_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="frame_level_bubble_accuracy")

class FrameLevelCalibrationBubbleConsistency(Base):
    __tablename__ = "frame_level_calibration2"

    id = Column(Integer, primary_key=True, index=True)
    parameter = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="frame_level_bubble_consistency")


class FrameLevelGeometricalCalibration(Base):
    __tablename__ = "frame_level_geometrical_calibration"

    id = Column(Integer, primary_key=True, index=True)
    flatness_of_base_A = Column(String, nullable=True)
    parallelity_flat_to_V_face_A = Column(String, nullable=True)
    parallelity_face_C_wrt_face_A = Column(String, nullable=True)
    parallelity_face_D_wrt_face_B = Column(String, nullable=True)
    perpendicularity_face_B_wrt_face_A_flat_to_flat = Column(String, nullable=True)
    perpendicularity_face_B_wrt_face_A = Column(String, nullable=True)
    perpendicularity_of_face_d = Column(String, nullable=True)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="frame_level_geometrical_parameter")


class FrameLevelDetails(Base):
    __tablename__ = "frame_level_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="frame_details")


class IndexingTableMechanicalCalibration(Base):
    __tablename__ = "indexing_table"

    id = Column(Integer, primary_key=True, index=True)
    normal_positioning = Column(Integer, nullable=False)
    firstset_calibrated_cumulative_errors = Column(String, nullable=False)
    secondset_calibrated_cumulative_errors = Column(String, nullable=False)
    thirdset_calibrated_cumulative_errors = Column(String, nullable=False)
    average_cumulative_errors = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="indexing_table_calibration")


class IndexingTableDetails(Base):
    __tablename__ = "indexing_table_details"

    id = Column(Integer, primary_key=True, index=True)
    method_used = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="indexing_table_additional")


class RotaryTableMechanicalCalibration(Base):
    __tablename__ = "rotary_table"

    id = Column(Integer, primary_key=True, index=True)
    nominal_positioning = Column(Integer, nullable=False)
    pair_of_facesets_on_polygon_mirror = Column(String, nullable=False)
    firstset_calibrated_cumulative_errors = Column(String, nullable=False)
    secondset_calibrated_cumulative_errors = Column(String, nullable=False)
    thirdset_calibrated_cumulative_errors = Column(String, nullable=False)
    average_cumulative_errors_wrt_mastervalues = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="rotary_table_calibration")


class RotaryTableMechanicalCalibrationDetails(Base):
    __tablename__ = "rotary_table_details"

    id = Column(Integer, primary_key=True, index=True)
    method_used = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="rotary_table_calibration_details")


class SpiritLevel(Base):
    __tablename__ = "spirit_level_bubble_accuracy"
    
    id = Column(Integer, primary_key=True, index=True)
    leftside_scale_reading = Column(String, nullable=False)
    leftside_calibrated_values = Column(String, nullable=False)
    rightside_scale_reading = Column(String, nullable=False)
    rightside_calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="spiritlevel_calibration")

class SpiritLevelBubbleConsistency(Base):
    __tablename__ = "spirit_level_bubble_consistency"

    id = Column(Integer, primary_key=True, index=True)
    parameter = Column(String, nullable=False)
    calibrated_values = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="spiritlevel_calibration_consistency")

class SpiritLevelGeometricalParameters(Base):
    __tablename__ = "spirit_level_geometrical_parameters"

    id = Column(Integer, primary_key=True, index=True)
    flatness_of_base = Column(String, nullable=True)
    parallelism_of_v_wrt_flat_base = Column(String, nullable=True)    
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="spiritlevel_calibration_gp")

class SpiritLevelDetails(Base):
    __tablename__ = "spirit_level_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    certificate = relationship("Master", back_populates="spiritlevel_calibration_info")



class VernierCaliperCalibration(Base):
    __tablename__ = "vernier_caliper_external_measuring_jaws"

    id = Column(Integer, primary_key=True, index=True)
    slip_gauge_size = Column(String, nullable=False)
    caliper_reading = Column(String, nullable=False)
    error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vc_emj")

class VernierCaliperCalibration2(Base):
    __tablename__ = "vernier_caliper_internal_measuring_jaws"

    id = Column(Integer, primary_key=True, index=True)
    setting_ring_gauge_size = Column(String, nullable=False)
    caliper_reading = Column(String, nullable=False)
    error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vc_imj")

class VernierCaliperCalibration3(Base):
    __tablename__ = "vernier_caliper_depth_measuring_blade"

    id = Column(Integer, primary_key=True, index=True)
    slip_gauge_size = Column(String, nullable=False)
    caliper_reading = Column(String, nullable=False)
    error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vc_dmb")

class VernierCaliperCalibration4(Base):
    __tablename__ = "vernier_caliper_partial_surface_contact"

    id = Column(Integer, primary_key=True, index=True)
    slip_gauge_size = Column(String, nullable=False)
    caliper_reading = Column(String, nullable=False)
    partial_surface_contact_error = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vc_psc")

class VernierCaliperCalibration5(Base):
    __tablename__ = "vernier_caliper_combined_width"

    id = Column(Integer, primary_key=True, index=True)
    nominal_value = Column(String, nullable=False)
    calibrated_value = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vc_cw")

class VernierCaliperCalibration6(Base):
    __tablename__ = "vernier_caliper_metrological_characteristics"

    id = Column(Integer, primary_key=True, index=True)
    partial_surface_contact_error = Column(String, nullable=False)
    repeatability_of_partial_surface_contact_error= Column(String, nullable=False)
    scale_shift_error= Column(String, nullable=False)
    line_contact_error= Column(String, nullable=False)
    full_surface_contact_error= Column(String, nullable=False)
    error_due_to_crossed_knife_edge_distance= Column(String, nullable=False)

    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)
    test_number = Column(Integer, nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vc_mc")

class VernierCaliperCalibrationDetails(Base):
    __tablename__ = "vernier_caliper_details"

    id = Column(Integer, primary_key=True, index=True)
    method_of_calibration = Column(String, nullable=False)
    note = Column(String, nullable=False)
    certificate_id = Column(Integer, ForeignKey("master_table.id"), nullable=False)

    # Relationship to CertificateMaster
    certificate = relationship("Master", back_populates="vc_details")
