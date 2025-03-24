import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const DepthMicroChecker = () => {
  const navigate = useNavigate();
  const [depthMicroData, setDepthMicroData] = useState([{ key: '1' }]);
  const [anvilBlockData, setAnvilBlockData] = useState([{ key: '1' }]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleAdd = (setData) => {
    const newKey = Date.now().toString();
    setData(prev => [...prev, { key: newKey }]);
  };

  const handleDelete = (key, setData) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 8, // You might want to make this dynamic
        test_no: parseInt(testNo),
        depth_micro_calibrations: depthMicroData.map(item => ({
          nominal_size: item.nominal_size,
          b_side_calibrated_values: item.b_side_calibrated_values,
          a_side_calibrated_values: item.a_side_calibrated_values,
          parallelity_values: item.parallelity_values
        })).filter(item => item.nominal_size && item.b_side_calibrated_values && 
                          item.a_side_calibrated_values && item.parallelity_values),
        anvil_block_calibrations: anvilBlockData.map(item => ({
          anvil_block_size: item.anvil_block_size,
          calibrated_values: item.calibrated_values
        })).filter(item => item.anvil_block_size && item.calibrated_values)
      };

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
        message.error('Failed to submit data');
        console.error(error);
      }
    }
  };

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
      title: '"B Side" Step Blocks',
      dataIndex: 'b_side_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDepthMicroData(prev => prev.map(item => 
              item.key === record.key ? { ...item, b_side_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: '"A Side" Step Blocks',
      dataIndex: 'a_side_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDepthMicroData(prev => prev.map(item => 
              item.key === record.key ? { ...item, a_side_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Parallelity b/w "A Side" & "B Side"',
      dataIndex: 'parallelity_values',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDepthMicroData(prev => prev.map(item => 
              item.key === record.key ? { ...item, parallelity_values: e.target.value } : item
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
          <Title level={4}>I. Calibration of Depth Micro Checker <span style={{ fontSize: '14px' }}>(All values in mm)</span></Title>
          <Table
            columns={depthMicroColumns}
            dataSource={depthMicroData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAdd(setDepthMicroData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Anvil Block</Title>
          <Table
            columns={anvilBlockColumns}
            dataSource={anvilBlockData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAdd(setAnvilBlockData)}
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

export default DepthMicroChecker;