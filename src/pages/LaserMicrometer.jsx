import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Row, Col, DatePicker } from 'antd';
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
            value={`${formData.customerName}\n${formData.customerAddress}`}
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
      <br />
      {/* Bottom Section */}
      <Row gutter={[16, 16]} style={{ fontSize: "14px" }}>
        <Col span={24}>
          <Text style={{ fontSize: "14px" }}>
            <span style={{ color: "red" }}>*</span><span style={{ marginBottom: "50px" }}>1. Customer's Reference:</span>
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


const LaserMicrometer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{ key: '1', actual_size: '', first_set: '', second_set: '', third_set: '' }]);
  const [calibrationData, setCalibrationData] = useState({});
  
  const handleAdd = () => {
    const newKey = Date.now().toString();
    setData([...data, { key: newKey, actual_size: '', first_set: '', second_set: '', third_set: '' }]);
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const calculateAverage = (record) => {
    if (record.first_set && record.second_set && record.third_set) {
      const avg = (parseFloat(record.first_set) + parseFloat(record.second_set) + parseFloat(record.third_set)) / 3;
      return avg.toFixed(3);
    }
    return '';
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        certificate_id: 11, // You might want to make this dynamic
        test_no: 1, // Placeholder, consider using a dynamic value
        first_sheet: {
          ulr_no: calibrationData.ulrNumber || "",
          report_issued_date: calibrationData.date || "",
          customer_name_and_address: `${calibrationData.customerName}\n${calibrationData.customerAddress}`,
          item_description: calibrationData.itemDescription || "",
          identification_no: calibrationData.identificationNumber || "",
          Sl_no: calibrationData.serialNumber || "",
          DC_no: "DC-123",
          DC_no_dated: "2024-03-30",
          PO_no: "PO-123",
          PO_no_dated: "2024-03-29",
          date_of_calibration: calibrationData.calibrationDate || "",
          place_of_calibration: calibrationData.calibrationPlace || "",
          reference_document_based_on_IS: calibrationData.referenceDocument || "",
          reference_document_based_on_IS_and_WP_no: "WP-123",
          temperature_during_calibration: parseFloat(calibrationData.temperature) || 0,
          uncertainity_of_measurement: parseFloat(calibrationData.uncertainty) || 0,
        },
        first_sheet_equipments: [{ equipment_details: "Equipment 1" }], // Example
        values: data.map(row => ({
          actual_size: row.actual_size,
          first_set: row.first_set,
          second_set: row.second_set,
          third_set: row.third_set,
          average_error: calculateAverage(row),
        })),
      };

      console.log('Submitting Data:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/laser_micrometer`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        message.success('Data submitted successfully');
        navigate('/operator');
      }
    } catch (error) {
      console.error('Submission Error:', error.response ? error.response.data : error);
      message.error('Submission failed. Check console for details.');
    }
  };

  const columns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Actual size of Setting plug gauges',
      dataIndex: 'actual_size',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => setData(prev => prev.map(item =>
            item.key === record.key ? { ...item, actual_size: e.target.value } : item
          ))}
        />
      ),
    },
    {
      title: '1st Set',
      dataIndex: 'first_set',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => setData(prev => prev.map(item =>
            item.key === record.key ? { ...item, first_set: e.target.value } : item
          ))}
        />
      ),
    },
    {
      title: '2nd Set',
      dataIndex: 'second_set',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => setData(prev => prev.map(item =>
            item.key === record.key ? { ...item, second_set: e.target.value } : item
          ))}
        />
      ),
    },
    {
      title: '3rd Set',
      dataIndex: 'third_set',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => setData(prev => prev.map(item =>
            item.key === record.key ? { ...item, third_set: e.target.value } : item
          ))}
        />
      ),
    },
    {
      title: 'Average',
      key: 'average',
      render: (_, record) => calculateAverage(record),
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
        <Title level={4} style={{ margin: 0 }}>Laser Micrometer Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <CalibrationDetails setCalibrationData={setCalibrationData} />

        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleAdd}
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

export default LaserMicrometer;