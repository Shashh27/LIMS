import React, { useState } from 'react';
import { Table, Input, Button, Space, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const AutocollimatorAnaloge = () => {
  const navigate = useNavigate();
  const [drumScaleData, setDrumScaleData] = useState([{ key: '1' }]);
  const [mainScaleData, setMainScaleData] = useState([{ key: '1' }]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleDrumScaleAdd = () => {
    const newKey = Date.now().toString();
    setDrumScaleData([...drumScaleData, { key: newKey }]);
  };

  const handleMainScaleAdd = () => {
    const newKey = Date.now().toString();
    setMainScaleData([...mainScaleData, { key: newKey }]);
  };

  const handleDrumScaleDelete = (key) => {
    setDrumScaleData(drumScaleData.filter(item => item.key !== key));
  };

  const handleMainScaleDelete = (key) => {
    setMainScaleData(mainScaleData.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 5, // You might want to make this dynamic
        test_no: parseInt(testNo),
        drum_scale_calibrations: drumScaleData.map(item => ({
          nominal_angle: item.nominal_angle,
          x_axis: item.x_axis,
          y_axis: item.y_axis
        })).filter(item => item.nominal_angle && item.x_axis && item.y_axis),
        main_scale_calibrations: mainScaleData.map(item => ({
          nominal_angle: item.nominal_angle,
          x_axis: item.x_axis,
          y_axis: item.y_axis
        })).filter(item => item.nominal_angle && item.x_axis && item.y_axis)
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/autocollimator-analogue`,
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
      dataIndex: 'x_axis',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'drum' ? 
              drumScaleData.map(item => item.key === record.key ? { ...item, x_axis: e.target.value } : item) :
              mainScaleData.map(item => item.key === record.key ? { ...item, x_axis: e.target.value } : item);
            record.type === 'drum' ? setDrumScaleData(newData) : setMainScaleData(newData);
          }}
        />
      ),
    },
    {
      title: 'Y-Axis',
      dataIndex: 'y_axis',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = record.type === 'drum' ? 
              drumScaleData.map(item => item.key === record.key ? { ...item, y_axis: e.target.value } : item) :
              mainScaleData.map(item => item.key === record.key ? { ...item, y_axis: e.target.value } : item);
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

export default AutocollimatorAnaloge;