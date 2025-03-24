import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const LongSlip = () => {
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

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 13,
        test_number: parseInt(testNo),
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
        <Title level={4} style={{ margin: 0 }}>Long Slip 125 to 300 Calibration</Title>
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
          
          <Title level={4}>1. Calibration of Long Slip Gauges: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
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

export default LongSlip;