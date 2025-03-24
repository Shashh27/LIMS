import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const VernierCaliper = () => {
  const navigate = useNavigate();
  const [externalJawsData, setExternalJawsData] = useState([{ key: '1' }]);
  const [internalJawsData, setInternalJawsData] = useState([{ key: '1' }]);
  const [depthBladeData, setDepthBladeData] = useState([{ key: '1' }]);
  const [partialSurfaceData, setPartialSurfaceData] = useState([{ key: '1' }]);
  const [combinedWidthData, setCombinedWidthData] = useState([{ key: '1' }]);
  const [metrologicalData, setMetrologicalData] = useState({
    partial_surface_contact_error: '',
    repeatability_of_partial_surface_contact_error: '',
    scale_shift_error: '',
    line_contact_error: '',
    full_surface_contact_error: '',
    error_due_to_crossed_knife_edge_distance: ''
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
        certificate_id: 22,
        test_number: parseInt(testNo),
        external_measuring_jaws: externalJawsData.map(item => ({
          slip_gauge_size: item.slip_gauge_size || '',
          caliper_reading: item.caliper_reading || '',
          error: item.error || ''
        })).filter(item => item.slip_gauge_size && item.caliper_reading && item.error),
        internal_measuring_jaws: internalJawsData.map(item => ({
          setting_ring_gauge_size: item.setting_ring_gauge_size || '',
          caliper_reading: item.caliper_reading || '',
          error: item.error || ''
        })).filter(item => item.setting_ring_gauge_size && item.caliper_reading && item.error),
        depth_measuring_blade: depthBladeData.map(item => ({
          slip_gauge_size: item.slip_gauge_size || '',
          caliper_reading: item.caliper_reading || '',
          error: item.error || ''
        })).filter(item => item.slip_gauge_size && item.caliper_reading && item.error),
        partial_surface_contact: partialSurfaceData.map(item => ({
          slip_gauge_size: item.slip_gauge_size || '',
          caliper_reading: item.caliper_reading || '',
          partial_surface_contact_error: item.partial_surface_contact_error || ''
        })).filter(item => item.slip_gauge_size && item.caliper_reading && item.partial_surface_contact_error),
        combined_width: combinedWidthData.map(item => ({
          nominal_value: item.nominal_value || '',
          calibrated_value: item.calibrated_value || ''
        })).filter(item => item.nominal_value && item.calibrated_value),
        metrological_characteristics: [{
          partial_surface_contact_error: metrologicalData.partial_surface_contact_error,
          repeatability_of_partial_surface_contact_error: metrologicalData.repeatability_of_partial_surface_contact_error,
          scale_shift_error: metrologicalData.scale_shift_error,
          line_contact_error: metrologicalData.line_contact_error,
          full_surface_contact_error: metrologicalData.full_surface_contact_error,
          error_due_to_crossed_knife_edge_distance: metrologicalData.error_due_to_crossed_knife_edge_distance
        }]
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/vernier-calibration`,
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

  const externalJawsColumns = [
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
            setExternalJawsData(prev => prev.map(item => 
              item.key === record.key ? { ...item, slip_gauge_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Caliper Reading',
      dataIndex: 'caliper_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setExternalJawsData(prev => prev.map(item => 
              item.key === record.key ? { ...item, caliper_reading: e.target.value } : item
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
            setExternalJawsData(prev => prev.map(item => 
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
          onClick={() => handleDeleteRow(record.key, setExternalJawsData)}
        />
      ),
    },
  ];

  const internalJawsColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Setting Ring Gauge Size',
      dataIndex: 'setting_ring_gauge_size',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setInternalJawsData(prev => prev.map(item => 
              item.key === record.key ? { ...item, setting_ring_gauge_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Caliper Reading',
      dataIndex: 'caliper_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setInternalJawsData(prev => prev.map(item => 
              item.key === record.key ? { ...item, caliper_reading: e.target.value } : item
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
            setInternalJawsData(prev => prev.map(item => 
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
          onClick={() => handleDeleteRow(record.key, setInternalJawsData)}
        />
      ),
    },
  ];

  const depthBladeColumns = [
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
            setDepthBladeData(prev => prev.map(item => 
              item.key === record.key ? { ...item, slip_gauge_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Caliper Reading',
      dataIndex: 'caliper_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setDepthBladeData(prev => prev.map(item => 
              item.key === record.key ? { ...item, caliper_reading: e.target.value } : item
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
            setDepthBladeData(prev => prev.map(item => 
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
          onClick={() => handleDeleteRow(record.key, setDepthBladeData)}
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
      title: 'Caliper Reading',
      dataIndex: 'caliper_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setPartialSurfaceData(prev => prev.map(item => 
              item.key === record.key ? { ...item, caliper_reading: e.target.value } : item
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

  const combinedWidthColumns = [
    {
      title: 'Nominal Value',
      dataIndex: 'nominal_value',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCombinedWidthData(prev => prev.map(item => 
              item.key === record.key ? { ...item, nominal_value: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Value',
      dataIndex: 'calibrated_value',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCombinedWidthData(prev => prev.map(item => 
              item.key === record.key ? { ...item, calibrated_value: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setCombinedWidthData)}
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
        <Title level={4} style={{ margin: 0 }}>Vernier Caliper Calibration</Title>
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
          
          <Title level={4}>I. Calibration of External Measuring Jaws: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table
            columns={externalJawsColumns}
            dataSource={externalJawsData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setExternalJawsData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Internal Measuring Jaws:</Title>
          <Table
            columns={internalJawsColumns}
            dataSource={internalJawsData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setInternalJawsData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>III. Calibration of Depth Measuring Blade:</Title>
          <Table
            columns={depthBladeColumns}
            dataSource={depthBladeData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setDepthBladeData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>IV. Calibration of Partial Surface Contact Error:</Title>
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

          <Title level={4} style={{ marginTop: '24px' }}>V. Calibration of Combined Width of Internal Measuring Jaws:</Title>
          <Table
            columns={combinedWidthColumns}
            dataSource={combinedWidthData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setCombinedWidthData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>VI. Calibration of Metrological Characteristics:</Title>
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
              { key: 'partial_surface_contact_error', characteristic: 'Partial surface contact error (E)' },
              { key: 'repeatability_of_partial_surface_contact_error', characteristic: 'Repeatability of partial surface contact error (R)' },
              { key: 'scale_shift_error', characteristic: 'Scale shift error (S)' },
              { key: 'line_contact_error', characteristic: 'Line contact error (L)' },
              { key: 'full_surface_contact_error', characteristic: 'Full surface contact error (J)' },
              { key: 'error_due_to_crossed_knife_edge_distance', characteristic: 'Error due to crossed knife-edge distance (K)' },
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

export default VernierCaliper;