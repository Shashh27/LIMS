import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Row, Col, DatePicker, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

// Separate CalibrationDetails component
const CalibrationDetails = ({ setCalibrationData }) => {
  const [formData, setFormData] = useState({
    ulrNumber: "",
    certificateNumber: "",
    date: "",
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
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setCalibrationData(updatedFormData);  // Lift state up
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
    <Card style={{ width: "100%", padding: "20px", position: "relative" }}>
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
            style={{ width: "50%", marginTop: "20px" }} // Adjusted width
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
            style={{ width: "50%", marginTop: "20px" }} // Adjusted width
          />
        </Col>

        {/* Date (Right) */}
        <Col span={8} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Title level={5} style={{ marginRight: "10px", whiteSpace: "nowrap", flexShrink: 0 }}>
            DATE:
          </Title>
          <DatePicker
            name="date"
            onChange={(date, dateString) => {
              setFormData({ ...formData, date: dateString });
              setCalibrationData({ ...formData, date: dateString });
            }}
            style={{ width: "50%", marginTop: "20px" }} // Adjusted width
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
            value={formData.customerName + "\n" + formData.customerAddress}
            onChange={(e) => {
              const [name, address] = e.target.value.split("\n");
              setFormData({
                ...formData,
                customerName: name,
                customerAddress: address || "", // Ensures address is set if present
              });
              setCalibrationData({
                ...formData,
                customerName: name,
                customerAddress: address || "", // Update lifted state
              });
            }}
            placeholder="Customer Name & Address"
            rows={2} // Adjust the height of the text box (rows define the number of visible lines)
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

      {/* Calibration Details Section */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Text style={{ fontSize: "14px" }} strong>
            1. Calibration Date:
          </Text>
          <DatePicker
            name="calibrationDate"
            onChange={(date, dateString) => {
              setFormData({ ...formData, calibrationDate: dateString });
              setCalibrationData({ ...formData, calibrationDate: dateString });
            }}
            style={{ width: "100%" }}
          />
        </Col>

        <Col span={24}>
          <Text style={{ fontSize: "14px" }} strong>
            2. Calibration Place:
          </Text>
          <Input
            name="calibrationPlace"
            value={formData.calibrationPlace}
            onChange={handleChange}
            placeholder="Calibration Place"
          />
        </Col>

        <Col span={24}>
          <Text style={{ fontSize: "14px" }} strong>
            3. Reference Document:
          </Text>
          <Input
            name="referenceDocument"
            value={formData.referenceDocument}
            onChange={handleChange}
            placeholder="Reference Document"
          />
        </Col>

        <Col span={24}>
          <Text style={{ fontSize: "14px" }} strong>
            4. Temperature:
          </Text>
          <Input
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="Temperature"
          />
        </Col>

        <Col span={24}>
          <Text style={{ fontSize: "14px" }} strong>
            5. Uncertainty:
          </Text>
          <Input
            name="uncertainty"
            value={formData.uncertainty}
            onChange={handleChange}
            placeholder="Uncertainty"
          />
        </Col>

        <Col span={24}>
          <Text style={{ fontSize: "14px" }} strong>
            6. Customer Reference:
          </Text>
          <Input
            name="customerReference"
            value={formData.customerReference}
            onChange={handleChange}
            placeholder="Customer Reference"
          />
        </Col>
      </Row>
    </Card>
  );
};

const LongSlip = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{ key: '1' }]);
  const [form] = Form.useForm();
  const [calibrationData, setCalibrationData] = useState({});

  const handleAdd = () => {
    const newKey = Date.now().toString();
    setData([...data, { key: newKey }]);
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        certificate_id: 13,
        gauges: data.map(item => ({
          nominal_size: item.nominal_size || '',
          deviation_at_center: item.deviation_at_center || '',
          min_variation: item.min_variation || '',
          max_variation: item.max_variation || '',
          identification_number: item.identification_number || ''
        })).filter(item => item.nominal_size && item.deviation_at_center && item.min_variation && item.max_variation && item.identification_number)
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/longslip300`,
        formData
      );

      if (response.status === 201) {
        message.success('Data submitted successfully');
        navigate('/operator');
      }
    } catch (error) {
      message.error('Failed to submit data');
      console.error(error);
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
      title: 'Nominal Size',
      dataIndex: 'nominal_size',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setData(prev => prev.map(item => 
              item.key === record.key ? { ...item, nominal_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Deviation at Center',
      dataIndex: 'deviation_at_center',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setData(prev => prev.map(item => 
              item.key === record.key ? { ...item, deviation_at_center: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Overall Variations Minimum',
      dataIndex: 'min_variation',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setData(prev => prev.map(item => 
              item.key === record.key ? { ...item, min_variation: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Overall Variations Maximum',
      dataIndex: 'max_variation',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setData(prev => prev.map(item => 
              item.key === record.key ? { ...item, max_variation: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Idfn. No./Sl. No.',
      dataIndex: 'identification_number',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setData(prev => prev.map(item => 
              item.key === record.key ? { ...item, identification_number: e.target.value } : item
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
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/operator')} type="text" />
          <img src={cmtiLogo} alt="CMTI Logo" style={{ height: '40px', width: 'auto' }} />
        </div>
        <Title level={4} style={{ margin: 0, fontSize: '18px' }}>Long Slip 125 to 300 Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <CalibrationDetails setCalibrationData={setCalibrationData} />
        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          <Title level={4}>1. Calibration of Long Slip Gauges: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table columns={columns} dataSource={data} pagination={false} bordered />
          <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />} style={{ marginTop: '16px' }}>
            Add Row
          </Button>
          <Button type="primary" onClick={handleSubmit} style={{ marginTop: '24px', marginLeft: "10px" }}>
            Submit
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default LongSlip;
