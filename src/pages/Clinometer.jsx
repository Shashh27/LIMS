import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form, DatePicker, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const CalibrationDetails = () => {
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

  return (
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
  );
};

const Clinometer = () => {
  const navigate = useNavigate();
  const [bubbleData, setBubbleData] = useState([{ key: '1' }]);
  const [drumScaleData, setDrumScaleData] = useState([{ key: '1' }]);
  const [mainScaleData, setMainScaleData] = useState([{ key: '1' }]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleAdd = (setData) => {
    const newKey = Date.now().toString();
    setData(prev => [...prev, { key: newKey }]);
  };

  const handleDelete = (key, setData) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 7,
        test_no: parseInt(testNo),
        bubble_calibrations: bubbleData.map(item => ({
          leftside_scale_reading: item.leftside_scale_reading,
          leftside_calibrated_values: item.leftside_calibrated_values,
          rightside_scale_reading: item.rightside_scale_reading,
          rightside_calibrated_values: item.rightside_calibrated_values
        })).filter(item => item.leftside_scale_reading && item.leftside_calibrated_values && 
                          item.rightside_scale_reading && item.rightside_calibrated_values),
        drum_scale_calibrations: drumScaleData.map(item => ({
          scale_reading: item.scale_reading,
          calibrated_values: item.calibrated_values
        })).filter(item => item.scale_reading && item.calibrated_values),
        main_scale_calibrations: mainScaleData.map(item => ({
          scale_reading: item.scale_reading,
          clockwise_calibrated_values: item.clockwise_calibrated_values,
          counter_clockwise_calibrated_values: item.counter_clockwise_calibrated_values
        })).filter(item => item.scale_reading && item.clockwise_calibrated_values && 
                          item.counter_clockwise_calibrated_values)
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/clinometer`,
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

  const bubbleColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Left Side',
      children: [
        {
          title: 'Scale Reading',
          dataIndex: 'leftside_scale_reading',
          width: 150,
          render: (text, record) => (
            <Input
              value={text}
              onChange={(e) => {
                setBubbleData(prev => prev.map(item => 
                  item.key === record.key ? { ...item, leftside_scale_reading: e.target.value } : item
                ));
              }}
            />
          ),
        },
        {
          title: 'Calibrated Values',
          dataIndex: 'leftside_calibrated_values',
          width: 150,
          render: (text, record) => (
            <Input
              value={text}
              onChange={(e) => {
                setBubbleData(prev => prev.map(item => 
                  item.key === record.key ? { ...item, leftside_calibrated_values: e.target.value } : item
                ));
              }}
            />
          ),
        },
      ],
    },
    {
      title: 'Right Side',
      children: [
        {
          title: 'Scale Reading',
          dataIndex: 'rightside_scale_reading',
          width: 150,
          render: (text, record) => (
            <Input
              value={text}
              onChange={(e) => {
                setBubbleData(prev => prev.map(item => 
                  item.key === record.key ? { ...item, rightside_scale_reading: e.target.value } : item
                ));
              }}
            />
          ),
        },
        {
          title: 'Calibrated Values',
          dataIndex: 'rightside_calibrated_values',
          width: 150,
          render: (text, record) => (
            <Input
              value={text}
              onChange={(e) => {
                setBubbleData(prev => prev.map(item => 
                  item.key === record.key ? { ...item, rightside_calibrated_values: e.target.value } : item
                ));
              }}
            />
          ),
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key, setBubbleData)}
        />
      ),
    },
  ];

  const drumScaleColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Scale Reading',
      dataIndex: 'scale_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDrumScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, scale_reading: e.target.value } : item
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
            setDrumScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, calibrated_values: e.target.value } : item
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
          onClick={() => handleDelete(record.key, setDrumScaleData)}
        />
      ),
    },
  ];

  const mainScaleColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Scale Reading',
      dataIndex: 'scale_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMainScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, scale_reading: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Clockwise Direction',
      dataIndex: 'clockwise_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMainScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, clockwise_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Counter Clockwise Direction',
      dataIndex: 'counter_clockwise_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMainScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, counter_clockwise_calibrated_values: e.target.value } : item
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
          onClick={() => handleDelete(record.key, setMainScaleData)}
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
        <Title level={4} style={{ margin: 0 }}>Clinometer Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        {/* Calibration Details Component now placed below header and above main content */}
        <CalibrationDetails />
        
        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          
          <Title level={4}>I. Calibration of Bubble Accuracy (Sensitivity) <span style={{ fontSize: '14px' }}>(all values are in mm/m)</span></Title>
          <Table
            columns={bubbleColumns}
            dataSource={bubbleData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAdd(setBubbleData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Drum Scale Accuracy</Title>
          <Table
            columns={drumScaleColumns}
            dataSource={drumScaleData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAdd(setDrumScaleData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>III. Calibration of Main Scale Accuracy</Title>
          <Table
            columns={mainScaleColumns}
            dataSource={mainScaleData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAdd(setMainScaleData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

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

export default Clinometer;