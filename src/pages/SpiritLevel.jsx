import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const SpiritLevel = () => {
  const navigate = useNavigate();
  const [bubbleData, setBubbleData] = useState([{ key: '1' }]);
  const [consistencyValue, setConsistencyValue] = useState('');
  const [geometricalData, setGeometricalData] = useState([
    { key: '1', parameter: 'Flatness of base', calibrated_values: '' },
    { key: '2', parameter: 'Parallelism of "V" wrt flat base', calibrated_values: '' }
  ]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleAddBubbleRow = () => {
    const newKey = Date.now().toString();
    setBubbleData([...bubbleData, { key: newKey }]);
  };

  const handleDeleteBubbleRow = (key) => {
    setBubbleData(bubbleData.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 14,
        test_number: parseInt(testNo),
        readings: bubbleData.map(item => ({
          leftside_scale_reading: item.leftside_scale_reading || '',
          leftside_calibrated_values: item.leftside_calibrated_values || '',
          rightside_scale_reading: item.rightside_scale_reading || '',
          rightside_calibrated_values: item.rightside_calibrated_values || ''
        })).filter(item => item.leftside_scale_reading && item.leftside_calibrated_values && item.rightside_scale_reading && item.rightside_calibrated_values),
        consistency: [{
          parameter: 'Consistency (Repeatability)',
          calibrated_values: consistencyValue
        }],
        geometrical_parameters: geometricalData.map(item => ({
          flatness_of_base: item.parameter === 'Flatness of base' ? item.calibrated_values : '',
          parallelism_of_v_wrt_flat_base: item.parameter === 'Parallelism of "V" wrt flat base' ? item.calibrated_values : ''
        }))
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/spiritlevel`,
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
      title: 'Left Side Scale Reading',
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
      title: 'Left scale Calibrated values',
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
    {
      title: 'Right Side (Towards Cross Bubble) Scale Reading',
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
      title: 'Right Side (Towards Cross Bubble) Calibrated values',
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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteBubbleRow(record.key)}
        />
      ),
    },
  ];

  const geometricalColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Parameter',
      dataIndex: 'parameter',
      width: 200,
    },
    {
      title: 'Calibrated values',
      dataIndex: 'calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setGeometricalData(prev => prev.map(item => 
              item.key === record.key ? { ...item, calibrated_values: e.target.value } : item
            ));
          }}
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
        <Title level={4} style={{ margin: 0 }}>Spirit Level Calibration</Title>
      </Header>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <Form form={form}>
          <Card style={{ marginBottom: '24px' }}>
            <Form.Item
              label="Test No."
              name="test_no"
              rules={[{ required: true, message: 'Please input test number!' }]}
            >
              <Input 
                placeholder="Enter test number" 
                value={testNo}
                onChange={(e) => setTestNo(e.target.value)}
              />
            </Form.Item>
          </Card>
        </Form>

        <Card>
          <Title level={3}>Mechanical Calibration</Title>
          
          <Title level={4}>I. Calibration of Bubble accuracy (Sensitivity): <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
          <Table
            columns={bubbleColumns}
            dataSource={bubbleData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleAddBubbleRow}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Bubble Consistency (Repeatability): <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
          <Table
            columns={[
              {
                title: 'Parameter',
                dataIndex: 'parameter',
                width: 200,
                render: () => 'Consistency (Repeatability)',
              },
              {
                title: 'Calibrated values',
                dataIndex: 'calibrated_values',
                width: 150,
                render: () => (
                  <Input
                    value={consistencyValue}
                    onChange={(e) => setConsistencyValue(e.target.value)}
                  />
                ),
              },
            ]}
            dataSource={[{ key: '1' }]}
            pagination={false}
            bordered
          />

          <Title level={4} style={{ marginTop: '24px' }}>III. Calibration of geometrical parameter: <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
          <Table
            columns={geometricalColumns}
            dataSource={geometricalData}
            pagination={false}
            bordered
          />

          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: '24px' }}
          >
            Submit
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default SpiritLevel;