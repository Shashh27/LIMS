import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const InclinometerAnaloge = () => {
  const navigate = useNavigate();
  const [inclinometerData, setInclinometerData] = useState([{ key: '1' }]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleAdd = () => {
    const newKey = Date.now().toString();
    setInclinometerData(prev => [...prev, { key: newKey }]);
  };

  const handleDelete = (key) => {
    setInclinometerData(prev => prev.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 9, // You might want to make this dynamic
        test_no: parseInt(testNo),
        inclinometer_calibrations: inclinometerData.map(item => ({
          inclinometer_scale_readings: item.inclinometer_scale_readings,
          calibrated_values: item.calibrated_values
        })).filter(item => item.inclinometer_scale_readings && item.calibrated_values)
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/inclinometer-analogue`,
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
      title: 'Inclinometer Scale Readings',
      dataIndex: 'inclinometer_scale_readings',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setInclinometerData(prev => prev.map(item => 
              item.key === record.key ? { ...item, inclinometer_scale_readings: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Values',
      dataIndex: 'calibrated_values',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setInclinometerData(prev => prev.map(item => 
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
        <Title level={4} style={{ margin: 0 }}>Inclinometer Analoge Calibration</Title>
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
          
          <Title level={4}>I. Calibration of Inclinometer <span style={{ fontSize: '14px' }}>(All values are in degrees)</span></Title>
          <Table
            columns={columns}
            dataSource={inclinometerData}
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
            style={{ marginTop: '24px' }}
          >
            Submit
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default InclinometerAnaloge;