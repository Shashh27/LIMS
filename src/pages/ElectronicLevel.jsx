import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const ElectronicLevel = () => {
  const navigate = useNavigate();
  const [mechanicalData, setMechanicalData] = useState([{ key: '1' }]);
  const [geometricalData, setGeometricalData] = useState({
    flatness_of_bottom_face: '',
    parellelity_of_V_to_flat_of_bottom_face: '',
    perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face: '',
    perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face: ''
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
        certificate_id: 18,
        test_number: parseInt(testNo),
        mechanical_calibrations: mechanicalData.map(item => ({
          electronic_level_readings: item.electronic_level_readings || '',
          positive_calibrated_values: item.positive_calibrated_values || '',
          negative_calibrated_values: item.negative_calibrated_values || ''
        })).filter(item => item.electronic_level_readings && item.positive_calibrated_values && item.negative_calibrated_values),
        geometrical_parameters: [{
          flatness_of_bottom_face: geometricalData.flatness_of_bottom_face,
          parellelity_of_V_to_flat_of_bottom_face: geometricalData.parellelity_of_V_to_flat_of_bottom_face,
          perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face: geometricalData.perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face,
          perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face: geometricalData.perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face
        }]
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/electronic-level`,
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

  const mechanicalColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Electronic Level Readings',
      dataIndex: 'electronic_level_readings',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMechanicalData(prev => prev.map(item => 
              item.key === record.key ? { ...item, electronic_level_readings: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Values +Ve Direction',
      dataIndex: 'positive_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMechanicalData(prev => prev.map(item => 
              item.key === record.key ? { ...item, positive_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Value -Ve Direction',
      dataIndex: 'negative_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setMechanicalData(prev => prev.map(item => 
              item.key === record.key ? { ...item, negative_calibrated_values: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setMechanicalData)}
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
        <Title level={4} style={{ margin: 0 }}>Electronic Level Calibration</Title>
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
          
          <Title level={4}>I. Calibration of Electronic Level: <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
          <Table
            columns={mechanicalColumns}
            dataSource={mechanicalData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setMechanicalData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Geometrical Parameters: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table
            columns={[
              {
                title: 'Sl.No',
                key: 'slNo',
                width: 60,
                render: (_, __, index) => index + 1,
              },
              {
                title: 'Parameters',
                dataIndex: 'parameter',
                width: 300,
                render: (_, record) => record.parameter,
              },
              {
                title: 'Calibrated Values',
                dataIndex: 'value',
                width: 150,
                render: (text, record) => (
                  <Input
                    value={geometricalData[record.key] || ''}
                    onChange={(e) => {
                      setGeometricalData(prev => ({
                        ...prev,
                        [record.key]: e.target.value
                      }));
                    }}
                  />
                ),
              },
            ]}
            dataSource={[
              { key: 'flatness_of_bottom_face', parameter: 'Flatness of Bottom face' },
              { key: 'parellelity_of_V_to_flat_of_bottom_face', parameter: 'Parallelity of "V" to flat of bottom face' },
              { key: 'perpendicularity_between_flat_of_side_face_wrt_flat_of_bottom_face', parameter: 'Perpendicularity between flat of side face w.r.t. flat of bottom face' },
              { key: 'perpendicularity_between_V_of_side_face_wrt_flat_of_bottom_face', parameter: 'Perpendicularity between "V" of side face w.r.t. flat of bottom face' },
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

export default ElectronicLevel;