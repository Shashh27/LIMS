import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form, DatePicker, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const VernierDepthGauge = () => {
  const navigate = useNavigate();
  const [scaleData, setScaleData] = useState([{ key: '1' }]);
  const [partialSurfaceData, setPartialSurfaceData] = useState([{ key: '1' }]);
  const [metrologicalData, setMetrologicalData] = useState({
    partial_surface_error: '',
    repeatability_of_partial_error: ''
  });
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();
  
  // CalibrationDetails state
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
        certificate_id: 17,
        test_number: parseInt(testNo),
        depth_gauge_calibrations: scaleData.map(item => ({
          slip_gauge_size: item.slip_gauge_size || '',
          calibrated_values: item.calibrated_values || '',
          error: item.error || ''
        })).filter(item => item.slip_gauge_size && item.calibrated_values && item.error),
        partial_surface_contact_calibrations: partialSurfaceData.map(item => ({
          slip_gauge_size: item.slip_gauge_size || '',
          calibrated_values: item.calibrated_values || '',
          partial_surface_contact_error: item.partial_surface_contact_error || ''
        })).filter(item => item.slip_gauge_size && item.calibrated_values && item.partial_surface_contact_error),
        metrological_calibrations: [{
          partial_surface_error: metrologicalData.partial_surface_error,
          repeatability_of_partial_error: metrologicalData.repeatability_of_partial_error
        }]
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/vernier_depth_gauge`,
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

  const scaleColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Slip Gauge Size',
      dataIndex: 'slip_gauge_size',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, slip_gauge_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Values',
      dataIndex: 'calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Error',
      dataIndex: 'error',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, error: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setScaleData)}
        />
      ),
    },
  ];

  const partialSurfaceColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Slip Gauge Size',
      dataIndex: 'slip_gauge_size',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setPartialSurfaceData(prev => prev.map(item => 
              item.key === record.key ? { ...item, slip_gauge_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Values',
      dataIndex: 'calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setPartialSurfaceData(prev => prev.map(item => 
              item.key === record.key ? { ...item, calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Partial Surface Contact Error',
      dataIndex: 'partial_surface_contact_error',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setPartialSurfaceData(prev => prev.map(item => 
              item.key === record.key ? { ...item, partial_surface_contact_error: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setPartialSurfaceData)}
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
        <Title level={4} style={{ margin: 0 }}>Vernier Depth Gauge Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        {/* CalibrationDetails Component - Merged inline */}
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

        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          
          <Title level={4}>I. Calibration of Scale: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table
            columns={scaleColumns}
            dataSource={scaleData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setScaleData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Partial Surface Contact Error</Title>
          <Table
            columns={partialSurfaceColumns}
            dataSource={partialSurfaceData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setPartialSurfaceData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>III. Calibration of Metrological Characteristics</Title>
          <Table
            columns={[
              {
                title: 'Metrological Characteristics',
                dataIndex: 'characteristic',
                width: 300,
                render: (_, record) => record.characteristic,
              },
              {
                title: 'Errors',
                dataIndex: 'value',
                width: 150,
                render: (text, record) => (
                  <Input
                    value={metrologicalData[record.key] || ''}
                    onChange={(e) => {
                      setMetrologicalData(prev => ({
                        ...prev,
                        [record.key]: e.target.value
                      }));
                    }}
                  />
                ),
              },
            ]}
            dataSource={[
              { key: 'partial_surface_error', characteristic: 'Partial surface contact error (E)' },
              { key: 'repeatability_of_partial_error', characteristic: 'Repeatability of partial surface contact error (R)' },
            ]}
            pagination={false}
            bordered
          />

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

export default VernierDepthGauge;