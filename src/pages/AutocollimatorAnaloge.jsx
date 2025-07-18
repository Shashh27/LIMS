import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Card, Typography, message, Layout, Form, DatePicker, Row, Col, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;

const AutocollimatorAnaloge = () => {
  const navigate = useNavigate();
  const [drumScaleData, setDrumScaleData] = useState([{ 
    key: '1',
    nominal_angle: '',
    x_axis_calibrated_values: '',
    y_axis_calibrated_values: ''
  }]);
  const [mainScaleData, setMainScaleData] = useState([{ 
    key: '1',
    nominal_angle: '',
    x_axis_calibrated_values: '',
    y_axis_calibrated_values: ''
  }]);
  const [equipmentDetails, setEquipmentDetails] = useState([{ 
    key: '1',
    equipment_details: ''
  }]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch equipment data when component mounts
    const fetchEquipments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/equipments/`);
        setEquipmentOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch equipment data:', error);
        message.error('Failed to load equipment options');
      }
    };

    fetchEquipments();
  }, []);

  const handleDrumScaleAdd = () => {
    const newKey = Date.now().toString();
    setDrumScaleData([...drumScaleData, { 
      key: newKey,
      nominal_angle: '',
      x_axis_calibrated_values: '',
      y_axis_calibrated_values: ''
    }]);
  };

  const handleMainScaleAdd = () => {
    const newKey = Date.now().toString();
    setMainScaleData([...mainScaleData, { 
      key: newKey,
      nominal_angle: '',
      x_axis_calibrated_values: '',
      y_axis_calibrated_values: ''
    }]);
  };

  const handleDrumScaleDelete = (key) => {
    setDrumScaleData(drumScaleData.filter(item => item.key !== key));
  };

  const handleMainScaleDelete = (key) => {
    setMainScaleData(mainScaleData.filter(item => item.key !== key));
  };

  const handleEquipmentDelete = (key) => {
    setEquipmentDetails(equipmentDetails.filter(item => item.key !== key));
  };

  const handleEquipmentAdd = () => {
    const newKey = Date.now().toString();
    setEquipmentDetails([...equipmentDetails, { key: newKey, equipment_details: '' }]);
  };

  const handleEquipmentChange = (value, key) => {
    const selectedEquipment = equipmentOptions.find(eq => eq.name === value);
    setEquipmentDetails(prevDetails =>
      prevDetails.map(detail =>
        detail.key === key
          ? { ...detail, equipment_details: selectedEquipment.description }
          : detail
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = {
        certificate_id: 5,
        test_number: values.test_number,
        first_sheet: {
          ulr_no: values.ulr_no,
          report_issued_date: values.report_issued_date,
          customer_name_and_address: values.customer_name_and_address,
          item_description: values.item_description,
          identification_no: values.identification_no,
          Sl_no: values.Sl_no,
          DC_no: values.DC_no,
          DC_no_dated: values.DC_no_dated,
          PO_no: values.PO_no,
          PO_no_dated: values.PO_no_dated,
          date_of_calibration: values.date_of_calibration,
          place_of_calibration: values.place_of_calibration,
          reference_document_based_on_IS: values.reference_document_based_on_IS,
          reference_document_based_on_IS_and_WP_no: values.reference_document_based_on_IS_and_WP_no,
          temperature_during_calibration: values.temperature_during_calibration,
          uncertainity_of_measurement: values.uncertainity_of_measurement,
          test_number: values.test_number
        },
        first_sheet_equipments: equipmentDetails
          .filter(item => item.equipment_details)
          .map(item => ({
            equipment_details: item.equipment_details
          })),
        analogue_data: drumScaleData
          .filter(item => item.nominal_angle && item.x_axis_calibrated_values && item.y_axis_calibrated_values)
          .map(item => ({
          nominal_angle: item.nominal_angle,
            x_axis_calibrated_values: item.x_axis_calibrated_values,
            y_axis_calibrated_values: item.y_axis_calibrated_values
          })),
        mainscale_data: mainScaleData
          .filter(item => item.nominal_angle && item.x_axis_calibrated_values && item.y_axis_calibrated_values)
          .map(item => ({
          nominal_angle: item.nominal_angle,
            x_axis_calibrated_values: item.x_axis_calibrated_values,
            y_axis_calibrated_values: item.y_axis_calibrated_values
          }))
      };

      console.log('Submitting data:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/autocollimatorAnalog`,
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
        message.error('Failed to submit data: ' + (error.response?.data?.detail || error.message));
        console.error('Error details:', error);
      }
    }
  };

  const equipmentColumns = [
    {
      title: 'Equipment Details',
      dataIndex: 'equipment_details',
      key: 'equipment_details',
      width: '90%',
      render: (_, record) => (
        <Select
          style={{ width: '100%' }}
          value={record.equipment_details ? equipmentOptions.find(eq => eq.description === record.equipment_details)?.name : undefined}
          onChange={(value) => handleEquipmentChange(value, record.key)}
          placeholder="Select equipment"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          dropdownStyle={{ width: 'auto', minWidth: '100%' }}
        >
          {equipmentOptions.map(equipment => (
            <Option 
              key={equipment.id} 
              value={equipment.name}
              style={{ whiteSpace: 'normal', padding: '8px' }}
            >
              {equipment.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleEquipmentDelete(record.key)}
            disabled={equipmentDetails.length === 1}
          />
        </Space>
      ),
    },
  ];

  const columns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 80,
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Nominal Angle',
      dataIndex: 'nominal_angle',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'drum' ? 
              drumScaleData.map(item => item.key === record.key ? { ...item, nominal_angle: e.target.value } : item) :
              mainScaleData.map(item => item.key === record.key ? { ...item, nominal_angle: e.target.value } : item);
            record.type === 'drum' ? setDrumScaleData(newData) : setMainScaleData(newData);
          }}
        />
      ),
    },
    {
      title: 'X-Axis',
      dataIndex: 'x_axis_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'drum' ? 
              drumScaleData.map(item => item.key === record.key ? { ...item, x_axis_calibrated_values: e.target.value } : item) :
              mainScaleData.map(item => item.key === record.key ? { ...item, x_axis_calibrated_values: e.target.value } : item);
            record.type === 'drum' ? setDrumScaleData(newData) : setMainScaleData(newData);
          }}
        />
      ),
    },
    {
      title: 'Y-Axis',
      dataIndex: 'y_axis_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'drum' ? 
              drumScaleData.map(item => item.key === record.key ? { ...item, y_axis_calibrated_values: e.target.value } : item) :
              mainScaleData.map(item => item.key === record.key ? { ...item, y_axis_calibrated_values: e.target.value } : item);
            record.type === 'drum' ? setDrumScaleData(newData) : setMainScaleData(newData);
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
          onClick={() => record.type === 'drum' ? handleDrumScaleDelete(record.key) : handleMainScaleDelete(record.key)}
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
        <Title level={4} style={{ margin: 0 }}>Autocollimator Analoge Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <Form form={form} layout="vertical">
          <Card title="Basic Information">
            <Row gutter={[16, 0]}>
              
              <Col span={8}>
                <Form.Item
                  name="ulr_no"
                  label="ULR Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="test_number"
                  label="Certificate Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="report_issued_date"
                  label="Report Issued Date"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="customer_name_and_address"
                  label="Customer Name and Address"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="item_description"
                  label="Item Description"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="identification_no"
                  label="Identification Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="Sl_no"
                  label="Serial Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="DC_no"
                  label="DC Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="DC_no_dated"
                  label="DC Number Dated"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="PO_no"
                  label="PO Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="PO_no_dated"
                  label="PO Number Dated"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="date_of_calibration"
                  label="Date of Calibration"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="place_of_calibration"
                  label="Place of Calibration"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="reference_document_based_on_IS"
                  label="Reference Document Based on IS"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="reference_document_based_on_IS_and_WP_no"
                  label="Reference Document Based on IS and WP Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="temperature_during_calibration"
                  label="Temperature During Calibration"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="uncertainity_of_measurement"
                  label="Uncertainty of Measurement"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Equipment Details" style={{ marginTop: '24px' }}>
            <Table
              columns={equipmentColumns}
              dataSource={equipmentDetails}
              pagination={false}
              bordered
            />
            <Button
              type="dashed"
              onClick={handleEquipmentAdd}
              icon={<PlusOutlined />}
              style={{ marginTop: '16px' }}
            >
              Add Equipment
            </Button>
          </Card>

          <Card title="Mechanical Calibration" style={{ marginTop: '24px' }}>
          <Title level={4}>I. Calibration of Drum Scale</Title>
          <Table
            columns={columns}
            dataSource={drumScaleData.map(item => ({ ...item, type: 'drum' }))}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleDrumScaleAdd}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Main Scale</Title>
          <Table
            columns={columns}
            dataSource={mainScaleData.map(item => ({ ...item, type: 'main' }))}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleMainScaleAdd}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>
          </Card>

          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: '24px' }}
          >
            Submit
          </Button>
        </Form>
      </Content>
    </Layout>
  );
};

export default AutocollimatorAnaloge;