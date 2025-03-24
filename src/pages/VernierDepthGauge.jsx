import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const VernierDepthGauge = () => {
  const navigate = useNavigate();
  const [scaleData, setScaleData] = useState([{ key: '1' }]);
  const [partialSurfaceData, setPartialSurfaceData] = useState([{ key: '1' }]);
  const [metrologicalData, setMetrologicalData] = useState({
    partial_surface_error: '',
    repeatability_of_partial_error: ''
  });
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleAddRow = (setData) => {
    const newKey = Date.now().toString();
    setData(prev => [...prev, { key: newKey }]);
  };

  const handleDeleteRow = (key, setData) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 17,
        test_number: parseInt(testNo),
        depth_gauge_calibrations: scaleData.map(item => ({
          slip_gauge_size: item.slip_gauge_size || '',
          calibrated_values: item.calibrated_values || '',
          error: item.error || ''
        })).filter(item => item.slip_gauge_size && item.calibrated_values && item.error),
        partial_surface_contact_calibrations: partialSurfaceData.map(item => ({
          slip_gauge_size: item.slip_gauge_size || '',
          calibrated_values: item.calibrated_values || '',
          partial_surface_contact_error: item.partial_surface_contact_error || ''
        })).filter(item => item.slip_gauge_size && item.calibrated_values && item.partial_surface_contact_error),
        metrological_calibrations: [{
          partial_surface_error: metrologicalData.partial_surface_error,
          repeatability_of_partial_error: metrologicalData.repeatability_of_partial_error
        }]
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/vernier_depth_gauge`,
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

  const scaleColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Slip Gauge Size',
      dataIndex: 'slip_gauge_size',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, slip_gauge_size: e.target.value } : item
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
            setScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Error',
      dataIndex: 'error',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setScaleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, error: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setScaleData)}
        />
      ),
    },
  ];

  const partialSurfaceColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Slip Gauge Size',
      dataIndex: 'slip_gauge_size',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setPartialSurfaceData(prev => prev.map(item => 
              item.key === record.key ? { ...item, slip_gauge_size: e.target.value } : item
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
            setPartialSurfaceData(prev => prev.map(item => 
              item.key === record.key ? { ...item, calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Partial Surface Contact Error',
      dataIndex: 'partial_surface_contact_error',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setPartialSurfaceData(prev => prev.map(item => 
              item.key === record.key ? { ...item, partial_surface_contact_error: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setPartialSurfaceData)}
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
        <Title level={4} style={{ margin: 0 }}>Vernier Depth Gauge Calibration</Title>
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
          
          <Title level={4}>I. Calibration of Scale: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table
            columns={scaleColumns}
            dataSource={scaleData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setScaleData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Partial Surface Contact Error</Title>
          <Table
            columns={partialSurfaceColumns}
            dataSource={partialSurfaceData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setPartialSurfaceData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>III. Calibration of Metrological Characteristics</Title>
          <Table
            columns={[
              {
                title: 'Metrological Characteristics',
                dataIndex: 'characteristic',
                width: 300,
                render: (_, record) => record.characteristic,
              },
              {
                title: 'Errors',
                dataIndex: 'value',
                width: 150,
                render: (text, record) => (
                  <Input
                    value={metrologicalData[record.key] || ''}
                    onChange={(e) => {
                      setMetrologicalData(prev => ({
                        ...prev,
                        [record.key]: e.target.value
                      }));
                    }}
                  />
                ),
              },
            ]}
            dataSource={[
              { key: 'partial_surface_error', characteristic: 'Partial surface contact error (E)' },
              { key: 'repeatability_of_partial_error', characteristic: 'Repeatability of partial surface contact error (R)' },
            ]}
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

export default VernierDepthGauge;