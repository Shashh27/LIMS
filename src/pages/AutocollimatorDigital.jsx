import React, { useState } from 'react';
import { Table, Input, Button, Space, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const AutocollimatorDigital = () => {
  const navigate = useNavigate();
  const [xAxisData, setXAxisData] = useState([{ key: '1' }]);
  const [yAxisData, setYAxisData] = useState([{ key: '1' }]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleXAxisAdd = () => {
    const newKey = Date.now().toString();
    setXAxisData([...xAxisData, { key: newKey }]);
  };

  const handleYAxisAdd = () => {
    const newKey = Date.now().toString();
    setYAxisData([...yAxisData, { key: newKey }]);
  };

  const handleXAxisDelete = (key) => {
    setXAxisData(xAxisData.filter(item => item.key !== key));
  };

  const handleYAxisDelete = (key) => {
    setYAxisData(yAxisData.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 6, // You might want to make this dynamic
        test_no: parseInt(testNo),
        x_axis_calibrations: xAxisData.map(item => ({
          nominal_angle: item.nominal_angle,
          positive_direction: item.positive_direction,
          negative_direction: item.negative_direction
        })).filter(item => item.nominal_angle && item.positive_direction && item.negative_direction),
        y_axis_calibrations: yAxisData.map(item => ({
          nominal_angle: item.nominal_angle,
          positive_direction: item.positive_direction,
          negative_direction: item.negative_direction
        })).filter(item => item.nominal_angle && item.positive_direction && item.negative_direction)
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/autocollimator-digital`,
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
      dataIndex: 'positive_direction',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'x' ? 
              xAxisData.map(item => item.key === record.key ? { ...item, positive_direction: e.target.value } : item) :
              yAxisData.map(item => item.key === record.key ? { ...item, positive_direction: e.target.value } : item);
            record.type === 'x' ? setXAxisData(newData) : setYAxisData(newData);
          }}
        />
      ),
    },
    {
      title: '- ve Direction',
      dataIndex: 'negative_direction',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'x' ? 
              xAxisData.map(item => item.key === record.key ? { ...item, negative_direction: e.target.value } : item) :
              yAxisData.map(item => item.key === record.key ? { ...item, negative_direction: e.target.value } : item);
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
      </Content>
    </Layout>
  );
};

export default AutocollimatorDigital;