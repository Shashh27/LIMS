import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form , Row , Col} from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const Clinometer = () => {
  const navigate = useNavigate();
  const [bubbleData, setBubbleData] = useState([{ 
    key: '1',
    leftside_scale_reading: '',
    leftside_calibrated_values: '',
    rightside_scale_reading: '',
    rightside_calibrated_values: ''
  }]);
  const [drumScaleData, setDrumScaleData] = useState([{ 
    key: '1',
    scale_reading: '',
    calibrated_values: ''
  }]);
  const [mainScaleData, setMainScaleData] = useState([{ 
    key: '1',
    scale_reading: '',
    clockwise_direction_calibrated_values: '',
    counter_clockwise_direction_calibrated_values: ''
  }]);
  const [testNo, setTestNo] = useState('');
  const [equipmentDetails, setEquipmentDetails] = useState([{ 
    key: '1',
    equipment_details: ''
  }]);
  const [form] = Form.useForm();

  const handleAdd = (setData, type) => {
    const newKey = Date.now().toString();
    let newItem;
    switch(type) {
      case 'bubble':
        newItem = {
          key: newKey,
          leftside_scale_reading: '',
          leftside_calibrated_values: '',
          rightside_scale_reading: '',
          rightside_calibrated_values: ''
        };
        break;
      case 'drum':
        newItem = {
          key: newKey,
          scale_reading: '',
          calibrated_values: ''
        };
        break;
      case 'main':
        newItem = {
          key: newKey,
          scale_reading: '',
          clockwise_direction_calibrated_values: '',
          counter_clockwise_direction_calibrated_values: ''
        };
        break;
      default:
        newItem = { key: newKey };
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
    const newKey = Date.now().toString();
    setEquipmentDetails([...equipmentDetails, { key: newKey, equipment_details: '' }]);
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = {
        certificate_id: 7,
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
        bubble_calibration: bubbleData
          .filter(item => item.leftside_scale_reading && item.leftside_calibrated_values && 
                         item.rightside_scale_reading && item.rightside_calibrated_values)
          .map(item => ({
            leftside_scale_reading: item.leftside_scale_reading,
            leftside_calibrated_values: item.leftside_calibrated_values,
            rightside_scale_reading: item.rightside_scale_reading,
            rightside_calibrated_values: item.rightside_calibrated_values
          })),
        drum_calibration: drumScaleData
          .filter(item => item.scale_reading && item.calibrated_values)
          .map(item => ({
            scale_reading: item.scale_reading,
            calibrated_values: item.calibrated_values
          })),
        main_calibration: mainScaleData
          .filter(item => item.scale_reading && item.clockwise_direction_calibrated_values && 
                         item.counter_clockwise_direction_calibrated_values)
          .map(item => ({
            scale_reading: item.scale_reading,
            clockwise_direction_calibrated_values: item.clockwise_direction_calibrated_values,
            counter_clockwise_direction_calibrated_values: item.counter_clockwise_direction_calibrated_values
          }))
      };

      console.log('Submitting data:', formData);

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
        message.error('Failed to submit data: ' + (error.response?.data?.detail || error.message));
        console.error('Error details:', error);
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
      dataIndex: 'clockwise_direction_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMainScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, clockwise_direction_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Counter Clockwise Direction',
      dataIndex: 'counter_clockwise_direction_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMainScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, counter_clockwise_direction_calibrated_values: e.target.value } : item
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
            onClick={() => handleAdd(setBubbleData, 'bubble')}
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
            onClick={() => handleAdd(setDrumScaleData, 'drum')}
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
            onClick={() => handleAdd(setMainScaleData, 'main')}
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

export default Clinometer;