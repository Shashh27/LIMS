import React, { useState } from 'react';
import { Table, Input, Button, Space, Card, Typography, message, Layout, Form, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const AutocollimatorDigital = () => {
  const navigate = useNavigate();
  const [xAxisData, setXAxisData] = useState([{ 
    key: '1',
    nominal_angle: '',
    positive_direction_calibrated_values: '',
    negative_direction_calibrated_values: ''
  }]);
  const [yAxisData, setYAxisData] = useState([{ 
    key: '1',
    nominal_angle: '',
    positive_direction_calibrated_values: '',
    negative_direction_calibrated_values: ''
  }]);
  const [equipmentDetails, setEquipmentDetails] = useState([{ 
    key: '1',
    equipment_details: ''
  }]);
  const [form] = Form.useForm();

  const handleXAxisAdd = () => {
    const newKey = Date.now().toString();
    setXAxisData([...xAxisData, { 
      key: newKey,
      nominal_angle: '',
      positive_direction_calibrated_values: '',
      negative_direction_calibrated_values: ''
    }]);
  };

  const handleYAxisAdd = () => {
    const newKey = Date.now().toString();
    setYAxisData([...yAxisData, { 
      key: newKey,
      nominal_angle: '',
      positive_direction_calibrated_values: '',
      negative_direction_calibrated_values: ''
    }]);
  };

  const handleXAxisDelete = (key) => {
    setXAxisData(xAxisData.filter(item => item.key !== key));
  };

  const handleYAxisDelete = (key) => {
    setYAxisData(yAxisData.filter(item => item.key !== key));
  };

  const equipmentColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 80,
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Equipment Details',
      dataIndex: 'equipment_details',
      width: 300,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = equipmentDetails.map(item => 
              item.key === record.key ? { ...item, equipment_details: e.target.value } : item
            );
            setEquipmentDetails(newData);
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
          onClick={() => handleEquipmentDelete(record.key)}
        />
      ),
    },
  ];

  const handleEquipmentAdd = () => {
    const newKey = Date.now().toString();
    setEquipmentDetails([...equipmentDetails, { key: newKey, equipment_details: '' }]);
  };

  const handleEquipmentDelete = (key) => {
    setEquipmentDetails(equipmentDetails.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = {
        certificate_id: 6,
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
        x_axis: xAxisData
          .filter(item => item.nominal_angle && item.positive_direction_calibrated_values && item.negative_direction_calibrated_values)
          .map(item => ({
            nominal_angle: item.nominal_angle,
            positive_direction_calibrated_values: item.positive_direction_calibrated_values,
            negative_direction_calibrated_values: item.negative_direction_calibrated_values
          })),
        y_axis: yAxisData
          .filter(item => item.nominal_angle && item.positive_direction_calibrated_values && item.negative_direction_calibrated_values)
          .map(item => ({
            nominal_angle: item.nominal_angle,
            positive_direction_calibrated_values: item.positive_direction_calibrated_values,
            negative_direction_calibrated_values: item.negative_direction_calibrated_values
          }))
      };

      console.log('Submitting data:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/autocollimatordigital`,
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
            const newData = record.type === 'x' ? 
              xAxisData.map(item => item.key === record.key ? { ...item, nominal_angle: e.target.value } : item) :
              yAxisData.map(item => item.key === record.key ? { ...item, nominal_angle: e.target.value } : item);
            record.type === 'x' ? setXAxisData(newData) : setYAxisData(newData);
          }}
        />
      ),
    },
    {
      title: '+ ve Direction',
      dataIndex: 'positive_direction_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'x' ? 
              xAxisData.map(item => item.key === record.key ? { ...item, positive_direction_calibrated_values: e.target.value } : item) :
              yAxisData.map(item => item.key === record.key ? { ...item, positive_direction_calibrated_values: e.target.value } : item);
            record.type === 'x' ? setXAxisData(newData) : setYAxisData(newData);
          }}
        />
      ),
    },
    {
      title: '- ve Direction',
      dataIndex: 'negative_direction_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'x' ? 
              xAxisData.map(item => item.key === record.key ? { ...item, negative_direction_calibrated_values: e.target.value } : item) :
              yAxisData.map(item => item.key === record.key ? { ...item, negative_direction_calibrated_values: e.target.value } : item);
            record.type === 'x' ? setXAxisData(newData) : setYAxisData(newData);
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
          onClick={() => record.type === 'x' ? handleXAxisDelete(record.key) : handleYAxisDelete(record.key)}
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
        <Title level={4} style={{ margin: 0 }}>Autocollimator Digital Calibration</Title>
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
       
        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          
          <Title level={4}>I. Calibration of X-Axis <span style={{ fontSize: '14px' }}>(All Values are in arc sec)</span></Title>
          <Table
            columns={columns}
            dataSource={xAxisData.map(item => ({ ...item, type: 'x' }))}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleXAxisAdd}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Y-Axis <span style={{ fontSize: '14px' }}>(All Values are in arc sec)</span></Title>
          <Table
            columns={columns}
            dataSource={yAxisData.map(item => ({ ...item, type: 'y' }))}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleYAxisAdd}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: '24px' }}
          >
            Submit
          </Button>
        </Card>
        </Form>
      </Content>
    </Layout>
  );
};

export default AutocollimatorDigital;