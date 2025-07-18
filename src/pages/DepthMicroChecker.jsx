import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const DepthMicroChecker = () => {
  const navigate = useNavigate();
  const [depthMicroData, setDepthMicroData] = useState([{ 
    key: '1',
    nominal_size: '',
    B_side_calibrated_values: '',
    A_side_calibrated_values: '',
    Parallelity_between_A_side_and_B_side_Calibratedvalues: ''
  }]);
  const [anvilBlockData, setAnvilBlockData] = useState([{ 
    key: '1',
    anvil_block_size: '',
    calibrated_values: ''
  }]);
  const [equipmentDetails, setEquipmentDetails] = useState([{ 
    key: '1',
    equipment_details: ''
  }]);
  const [form] = Form.useForm();

  const handleAdd = (setData, type) => {
    const newKey = Date.now().toString();
    let newItem;
    switch(type) {
      case 'depth':
        newItem = {
          key: newKey,
          nominal_size: '',
          B_side_calibrated_values: '',
          A_side_calibrated_values: '',
          Parallelity_between_A_side_and_B_side_Calibratedvalues: ''
        };
        break;
      case 'anvil':
        newItem = {
          key: newKey,
          anvil_block_size: '',
          calibrated_values: ''
        };
        break;
      default:
        newItem = { key: newKey, equipment_details: '' };
    }
    setData(prev => [...prev, newItem]);
  };

  const handleDelete = (key, setData) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const handleEquipmentDelete = (key) => {
    setEquipmentDetails(equipmentDetails.filter(item => item.key !== key));
  };

  const handleEquipmentAdd = () => {
    handleAdd(setEquipmentDetails, 'equipment');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = {
        certificate_id: 8,
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
          equipment: equipmentDetails
            .filter(item => item.equipment_details)
            .map(item => ({
              equipment_details: item.equipment_details
            }))
        },
        depth_micro_checker_calibrations: depthMicroData
          .filter(item => item.nominal_size && item.B_side_calibrated_values && 
                         item.A_side_calibrated_values && item.Parallelity_between_A_side_and_B_side_Calibratedvalues)
          .map(item => ({
            nominal_size: item.nominal_size,
            B_side_calibrated_values: item.B_side_calibrated_values,
            A_side_calibrated_values: item.A_side_calibrated_values,
            Parallelity_between_A_side_and_B_side_Calibratedvalues: item.Parallelity_between_A_side_and_B_side_Calibratedvalues
          })),
        anvil_block_calibrations: anvilBlockData
          .filter(item => item.anvil_block_size && item.calibrated_values)
          .map(item => ({
            anvil_block_size: item.anvil_block_size,
            calibrated_values: item.calibrated_values
          }))
      };

      console.log('Submitting data:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/depth-micro-checker`,
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

  const depthMicroColumns = [
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
            setDepthMicroData(prev => prev.map(item => 
              item.key === record.key ? { ...item, nominal_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'B Side Calibrated Values',
      dataIndex: 'B_side_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDepthMicroData(prev => prev.map(item => 
              item.key === record.key ? { ...item, B_side_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'A Side Calibrated Values',
      dataIndex: 'A_side_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDepthMicroData(prev => prev.map(item => 
              item.key === record.key ? { ...item, A_side_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Parallelity between A side and B side Calibrated values',
      dataIndex: 'Parallelity_between_A_side_and_B_side_Calibratedvalues',
      width: 300,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDepthMicroData(prev => prev.map(item => 
              item.key === record.key ? { ...item, Parallelity_between_A_side_and_B_side_Calibratedvalues: e.target.value } : item
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
          onClick={() => handleDelete(record.key, setDepthMicroData)}
        />
      ),
    },
  ];

  const anvilBlockColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Anvil Block Size',
      dataIndex: 'anvil_block_size',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setAnvilBlockData(prev => prev.map(item => 
              item.key === record.key ? { ...item, anvil_block_size: e.target.value } : item
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
            setAnvilBlockData(prev => prev.map(item => 
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
          onClick={() => handleDelete(record.key, setAnvilBlockData)}
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
        <Title level={4} style={{ margin: 0 }}>Depth Micro Checker Calibration</Title>
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
                  label="Test Number"
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
            <Title level={4}>I. Depth Micro Checker Calibration</Title>
            <Table
              columns={depthMicroColumns}
              dataSource={depthMicroData}
              pagination={false}
              bordered
            />
            <Button
              type="dashed"
              onClick={() => handleAdd(setDepthMicroData, 'depth')}
              icon={<PlusOutlined />}
              style={{ marginTop: '16px' }}
            >
              Add Row
            </Button>

            <Title level={4} style={{ marginTop: '24px' }}>II. Anvil Block Calibration</Title>
            <Table
              columns={anvilBlockColumns}
              dataSource={anvilBlockData}
              pagination={false}
              bordered
            />
            <Button
              type="dashed"
              onClick={() => handleAdd(setAnvilBlockData, 'anvil')}
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

export default DepthMicroChecker;