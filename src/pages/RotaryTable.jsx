import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form } from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const RotaryTable = () => {
  const navigate = useNavigate();
  const [calibrationData, setCalibrationData] = useState([{ key: '1' }]);
  const [testNo, setTestNo] = useState('');
  const [form] = Form.useForm();

  const handleAddRow = () => {
    const newKey = Date.now().toString();
    setCalibrationData([...calibrationData, { key: newKey }]);
  };

  const handleDeleteRow = (key) => {
    setCalibrationData(calibrationData.filter(item => item.key !== key));
  };

  const calculateAverage = (record) => {
    const { firstset_calibrated_cumulative_errors, secondset_calibrated_cumulative_errors, thirdset_calibrated_cumulative_errors } = record;
    if (firstset_calibrated_cumulative_errors && secondset_calibrated_cumulative_errors && thirdset_calibrated_cumulative_errors) {
      const avg = (parseFloat(firstset_calibrated_cumulative_errors) + parseFloat(secondset_calibrated_cumulative_errors) + parseFloat(thirdset_calibrated_cumulative_errors)) / 3;
      return avg.toFixed(3);
    }
    return '';
  };

  const handleSubmit = async () => {
    try {
      // Validate the form first to ensure test number is provided
      await form.validateFields();
      
      const formData = {
        certificate_id: 21,
        test_number: parseInt(testNo),
        mechanical_calibrations: calibrationData.map(item => ({
          nominal_positioning: parseInt(item.nominal_positioning) || '',
          pair_of_facesets_on_polygon_mirror: item.pair_of_facesets_on_polygon_mirror || '',
          firstset_calibrated_cumulative_errors: item.firstset_calibrated_cumulative_errors || '',
          secondset_calibrated_cumulative_errors: item.secondset_calibrated_cumulative_errors || '',
          thirdset_calibrated_cumulative_errors: item.thirdset_calibrated_cumulative_errors || '',
          average_cumulative_errors_wrt_mastervalues: calculateAverage(item)
        })).filter(item => item.nominal_positioning && item.pair_of_facesets_on_polygon_mirror && item.firstset_calibrated_cumulative_errors && item.secondset_calibrated_cumulative_errors && item.thirdset_calibrated_cumulative_errors)
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/rotary-calibration`,
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
      title: 'Nominal Position of Rotary Table in Degree',
      dataIndex: 'nominal_positioning',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, nominal_positioning: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Pair of Face sets on Polygon Mirror',
      dataIndex: 'pair_of_facesets_on_polygon_mirror',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, pair_of_facesets_on_polygon_mirror: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Cumulative Errors in arc seconds (Compensated) 1st Set',
      dataIndex: 'firstset_calibrated_cumulative_errors',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, firstset_calibrated_cumulative_errors: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Cumulative Errors in arc seconds (Compensated) 2nd Set',
      dataIndex: 'secondset_calibrated_cumulative_errors',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, secondset_calibrated_cumulative_errors: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated Cumulative Errors in arc seconds (Compensated) 3rd Set',
      dataIndex: 'thirdset_calibrated_cumulative_errors',
      width: 200,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setCalibrationData(prev => prev.map(item => 
              item.key === record.key ? { ...item, thirdset_calibrated_cumulative_errors: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Avg. cumulative Errors w.r.t. Master values in arc seconds',
      key: 'average_cumulative_errors_wrt_mastervalues',
      width: 200,
      render: (_, record) => calculateAverage(record),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteRow(record.key)}
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
        <Title level={4} style={{ margin: 0 }}>Rotary Table Calibration</Title>
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
          
          <Title level={4}>I. Calibration of Rotary Table:</Title>
          <Table
            columns={columns}
            dataSource={calibrationData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={handleAddRow}
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

export default RotaryTable;