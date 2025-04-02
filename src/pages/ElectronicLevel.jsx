import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form, DatePicker, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const ElectronicLevel = () => {
  const navigate = useNavigate();
  const [mechanicalData, setMechanicalData] = useState([{ key: '1' }]);
  const [geometricalData, setGeometricalData] = useState({
    flatness_of_bottom_face: '',
    parellelity_of_V_to_flat_of_bottom_face: '',
    perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face: '',
    perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face: ''
  });
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();
  
  // Calibration Details state
  const [formData, setFormData] = useState({
    ulrNumber: "",
    certificateNumber: "",
    date: "",
    sheet: "",
    customerName: "",
    customerAddress: "",
    itemDescription: "",
    identificationNumber: "",
    serialNumber: "",
    customerReference: "",
    calibrationDate: "",
    calibrationPlace: "",
    referenceDocument: "",
    temperature: "",
    uncertainty: "",
  });

  const [equipmentList, setEquipmentList] = useState([{ id: 1, value: "" }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEquipmentChange = (id, value) => {
    setEquipmentList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const addEquipmentRow = () => {
    setEquipmentList([...equipmentList, { id: Date.now(), value: "" }]);
  };

  const removeEquipmentRow = (id) => {
    setEquipmentList(equipmentList.filter((item) => item.id !== id));
  };

  const handleAddRow = (setData) => {
    const newKey = Date.now().toString();
    setData(prev => [...prev, { key: newKey }]);
  };

  const handleDeleteRow = (key, setData) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 18,
        test_number: parseInt(testNo),
        mechanical_calibrations: mechanicalData.map(item => ({
          electronic_level_readings: item.electronic_level_readings || '',
          positive_calibrated_values: item.positive_calibrated_values || '',
          negative_calibrated_values: item.negative_calibrated_values || ''
        })).filter(item => item.electronic_level_readings && item.positive_calibrated_values && item.negative_calibrated_values),
        geometrical_parameters: [{
          flatness_of_bottom_face: geometricalData.flatness_of_bottom_face,
          parellelity_of_V_to_flat_of_bottom_face: geometricalData.parellelity_of_V_to_flat_of_bottom_face,
          perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face: geometricalData.perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face,
          perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face: geometricalData.perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face
        }]
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/electronic-level`,
        formData
      );

      if (response.status === 201) {
        message.success('Data submitted successfully');
        navigate('/operator');
      }
    } catch (error) {
      if (error.errorFields) {
        message.error('Please fill in all required fields');
      } else {
        message.error('Failed to submit data');
        console.error(error);
      }
    }
  };

  const mechanicalColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Electronic Level Readings',
      dataIndex: 'electronic_level_readings',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMechanicalData(prev => prev.map(item => 
              item.key === record.key ? { ...item, electronic_level_readings: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Values +Ve Direction',
      dataIndex: 'positive_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMechanicalData(prev => prev.map(item => 
              item.key === record.key ? { ...item, positive_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Value -Ve Direction',
      dataIndex: 'negative_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMechanicalData(prev => prev.map(item => 
              item.key === record.key ? { ...item, negative_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteRow(record.key, setMechanicalData)}
        />
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/operator')}
            type="text"
          />
          <img 
            src={cmtiLogo} 
            alt="CMTI Logo" 
            style={{ height: '40px', width: 'auto' }} 
          />
        </div>
        <Title level={4} style={{ margin: 0 }}>Electronic Level Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        {/* CalibrationDetails Component - Integrated directly */}
        <Card style={{ width: "100%", padding: "20px", position: "relative", marginBottom: "24px" }}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            {/* ULR No (Left) */}
            <Col span={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <Title level={5} style={{ marginRight: "10px", whiteSpace: "nowrap", flexShrink: 0 }}>
                <span style={{ color: "red" }}>*</span> ULR No:
              </Title>
              <Input
                name="ulrNumber"
                value={formData.ulrNumber}
                onChange={handleChange}
                style={{ width: "50%", marginTop: "20px" }}
              />
            </Col>

            {/* Certificate No (Center) */}
            <Col span={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Title level={5} style={{ marginRight: "10px", whiteSpace: "nowrap", flexShrink: 0 }}>
                CERTIFICATE NO:
              </Title>
              <Input
                name="certificateNumber"
                value={formData.certificateNumber}
                onChange={handleChange}
                style={{ width: "50%", marginTop: "20px" }}
              />
            </Col>

            {/* Date (Right) */}
            <Col span={8} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <Title level={5} style={{ marginRight: "10px", whiteSpace: "nowrap", flexShrink: 0 }}>
                DATE:
              </Title>
              <DatePicker
                name="date"
                onChange={(date, dateString) => setFormData({ ...formData, date: dateString })}
                style={{ width: "50%", marginTop: "20px" }}
              />
            </Col>
          </Row>

          {/* Grouped Customer Details Box */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Text style={{ fontSize: "14px" }} strong>
                Name & Address of the Customer:
              </Text>
              <Input.TextArea
                name="customerNameAddress"
                value={`${formData.customerName}\n${formData.customerAddress}`}
                onChange={(e) => {
                  const [name, address] = e.target.value.split("\n");
                  setFormData({
                    ...formData,
                    customerName: name,
                    customerAddress: address || "",
                  });
                }}
                placeholder="Customer Name & Address"
                rows={2}
                style={{ marginBottom: "5px" }}
              />
            </Col>

            <Col span={24}>
              <Text style={{ fontSize: "14px" }} strong>
                Description of the Item:
              </Text>
              <Input
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                placeholder="Item Description"
              />
            </Col>

            <Col span={24}>
              <Text style={{ fontSize: "14px" }} strong>
                Identification & Serial No.:
              </Text>
              <Row gutter={16}>
                <Col span={12}>
                  <Input
                    name="identificationNumber"
                    value={formData.identificationNumber}
                    onChange={handleChange}
                    placeholder="Identification No."
                  />
                </Col>
                
                <Col span={12}>
                  <Input
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    placeholder="Serial No."
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          {/* Bottom Section */}
          <Row gutter={[16, 16]} style={{ fontSize: "14px" }}>
            <Col span={24}>
              <Text style={{ fontSize: "14px" }}>
                <span style={{ color: "red" }}>*</span><span style={{marginBottom:"50px"}}>1. Customer's Reference:</span>
              </Text>
              <Input
                name="customerReference"
                value={formData.customerReference}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Text style={{ fontSize: "14px" }}>
                <span style={{ color: "red" }}>*</span> 2. Date & Place of Calibration:
              </Text>
              <Row gutter={16}>
                <Col span={12}>
                  <Input
                    name="calibrationDate"
                    value={formData.calibrationDate}
                    onChange={handleChange}
                    placeholder="Calibration Date"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    name="calibrationPlace"
                    value={formData.calibrationPlace}
                    onChange={handleChange}
                    placeholder="Calibration Place"
                  />
                </Col>
              </Row>
            </Col>

            {/* Dynamic Equipment Details Section */}
            <Col span={24}>
              <Text style={{ fontSize: "14px" }}>
                <span style={{ color: "red" }}>*</span> 3. Equipment Used for Calibration & Traceability:
              </Text>

              {equipmentList.map((item, index) => (
                <Row key={item.id} gutter={16} align="middle" style={{ marginBottom: "10px" }}>
                  <Col span={22}>
                    <Input
                      value={item.value}
                      onChange={(e) => handleEquipmentChange(item.id, e.target.value)}
                      placeholder="Enter Equipment Details"
                    />
                  </Col>
                  <Col span={2}>
                    {index > 0 && (
                      <Button type="text" icon={<DeleteOutlined />} onClick={() => removeEquipmentRow(item.id)} />
                    )}
                  </Col>
                </Row>
              ))}

              <Button type="dashed" onClick={addEquipmentRow} style={{ marginTop: "10px" }}>
                + Add Row
              </Button>
            </Col>

            {/* Other Input Fields */}
            <Col span={24}>
              <Text style={{ fontSize: "14px" }}>
                <span style={{ color: "red" }}>*</span> 4. Reference Document:
              </Text>
              <Input
                name="referenceDocument"
                value={formData.referenceDocument}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Text style={{ fontSize: "14px" }}>
                <span style={{ color: "red" }}>*</span> 5. Temperature during Calibration:
              </Text>
              <Input
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
              />
            </Col>

            <Col span={24}>
              <Text style={{ fontSize: "14px" }}>
                <span style={{ color: "red" }}>*</span> 6. Uncertainty of Measurement:
              </Text>
              <Input
                name="uncertainty"
                value={formData.uncertainty}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Card>
       
        {/* Electronic Level Component */}
        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          
          <Title level={4}>I. Calibration of Electronic Level: <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
          <Table
            columns={mechanicalColumns}
            dataSource={mechanicalData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setMechanicalData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Geometrical Parameters: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table
            columns={[
              {
                title: 'Sl.No',
                key: 'slNo',
                width: 60,
                render: (_, __, index) => index + 1,
              },
              {
                title: 'Parameters',
                dataIndex: 'parameter',
                width: 300,
                render: (_, record) => record.parameter,
              },
              {
                title: 'Calibrated Values',
                dataIndex: 'value',
                width: 150,
                render: (text, record) => (
                  <Input
                    value={geometricalData[record.key] || ''}
                    onChange={(e) => {
                      setGeometricalData(prev => ({
                        ...prev,
                        [record.key]: e.target.value
                      }));
                    }}
                  />
                ),
              },
            ]}
            dataSource={[
              { key: 'flatness_of_bottom_face', parameter: 'Flatness of Bottom face' },
              { key: 'parellelity_of_V_to_flat_of_bottom_face', parameter: 'Parallelity of "V" to flat of bottom face' },
              { key: 'perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face', parameter: 'Perpendicularity between flat of side face w.r.t. flat of bottom face' },
              { key: 'perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face', parameter: 'Perpendicularity between "V" of side face w.r.t. flat of bottom face' },
            ]}
            pagination={false}
            bordered
          />

          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: '24px', marginLeft: '10px' }}
          >
            Submit
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default ElectronicLevel;