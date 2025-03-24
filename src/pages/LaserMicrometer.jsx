import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const LaserMicrometer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{ key: '1' }]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleAdd = () => {
    const newKey = Date.now().toString();
    setData([...data, { key: newKey }]);
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
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 11, // You might want to make this dynamic
        test_no: parseInt(testNo),
        actual_size_of_setting_plug_gauge: data[0]?.actual_size || '',
        first_set: data[0]?.first_set || '',
        second_set: data[0]?.second_set || '',
        third_set: data[0]?.third_set || '',
        average_error: data[0]?.average || calculateAverage(data[0])
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/laser_micrometer`,
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
      title: 'Actual size of Setting plug gauges',
      dataIndex: 'actual_size',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setData(prev => prev.map(item => 
              item.key === record.key ? { ...item, actual_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: '1st Set',
      dataIndex: 'first_set',
      width: 100,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = data.map(item => 
              item.key === record.key ? { ...item, first_set: e.target.value } : item
            );
            setData(newData);
          }}
        />
      ),
    },
    {
      title: '2nd Set',
      dataIndex: 'second_set',
      width: 100,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = data.map(item => 
              item.key === record.key ? { ...item, second_set: e.target.value } : item
            );
            setData(newData);
          }}
        />
      ),
    },
    {
      title: '3rd Set',
      dataIndex: 'third_set',
      width: 100,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = data.map(item => 
              item.key === record.key ? { ...item, third_set: e.target.value } : item
            );
            setData(newData);
          }}
        />
      ),
    },
    {
      title: 'Average',
      key: 'average',
      width: 100,
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
          
          <Title level={4}>Calibration of Laser Micrometer: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
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
            style={{ marginTop: '24px' }}
          >
            Submit
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};

export default LaserMicrometer;