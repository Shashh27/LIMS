import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form, DatePicker, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const RotaryTable = () => {
  const navigate = useNavigate();
  const [calibrationData, setCalibrationData] = useState([{ key: '1' }]);
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

  const handleAddRow = () => {
    const newKey = Date.now().toString();
    setCalibrationData([...calibrationData, { key: newKey }]);
  };

  const handleDeleteRow = (key) => {
    setCalibrationData(calibrationData.filter(item => item.key !== key));
  };

  const calculateAverage = (record) => {
    const { firstset_calibrated_cumulative_errors, secondset_calibrated_cumulative_errors, thirdset_calibrated_cumulative_errors } = record;
    if (firstset_calibrated_cumulative_errors && secondset_calibrated_cumulative_errors && thirdset_calibrated_cumulative_errors) {
      const avg = (parseFloat(firstset_calibrated_cumulative_errors) + parseFloat(secondset_calibrated_cumulative_errors) + parseFloat(thirdset_calibrated_cumulative_errors)) / 3;
      return avg.toFixed(3);
    }
    return '';
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 21,
        test_number: parseInt(testNo),
        mechanical_calibrations: calibrationData.map(item => ({
          nominal_positioning: parseInt(item.nominal_positioning) || '',
          pair_of_facesets_on_polygon_mirror: item.pair_of_facesets_on_polygon_mirror || '',
          firstset_calibrated_cumulative_errors: item.firstset_calibrated_cumulative_errors || '',
          secondset_calibrated_cumulative_errors: item.secondset_calibrated_cumulative_errors || '',
          thirdset_calibrated_cumulative_errors: item.thirdset_calibrated_cumulative_errors || '',
          average_cumulative_errors_wrt_mastervalues: calculateAverage(item)
        })).filter(item => item.nominal_positioning && item.pair_of_facesets_on_polygon_mirror && item.firstset_calibrated_cumulative_errors && item.secondset_calibrated_cumulative_errors && item.thirdset_calibrated_cumulative_errors)
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/rotary-calibration`,
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

  const columns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Nominal Position of Rotary Table in Degree',
      dataIndex: 'nominal_positioning',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, nominal_positioning: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Pair of Face sets on Polygon Mirror',
      dataIndex: 'pair_of_facesets_on_polygon_mirror',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, pair_of_facesets_on_polygon_mirror: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Cumulative Errors in arc seconds (Compensated) 1st Set',
      dataIndex: 'firstset_calibrated_cumulative_errors',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, firstset_calibrated_cumulative_errors: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Cumulative Errors in arc seconds (Compensated) 2nd Set',
      dataIndex: 'secondset_calibrated_cumulative_errors',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, secondset_calibrated_cumulative_errors: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Cumulative Errors in arc seconds (Compensated) 3rd Set',
      dataIndex: 'thirdset_calibrated_cumulative_errors',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, thirdset_calibrated_cumulative_errors: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Avg. cumulative Errors w.r.t. Master values in arc seconds',
      key: 'average_cumulative_errors_wrt_mastervalues',
      width: 200,
      render: (_, record) => calculateAverage(record),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteRow(record.key)}
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
        <Title level={4} style={{ margin: 0 }}>Rotary Table Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        {/* CalibrationDetails Component Integrated Here */}
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

        {/* RotaryTable Component */}
        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          
          <Title level={4}>I. Calibration of Rotary Table:</Title>
          <Table
            columns={columns}
            dataSource={calibrationData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleAddRow}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: '24px', marginLeft: "10px" }}
          >
            Submit
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default RotaryTable;