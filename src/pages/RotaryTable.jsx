import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form , Row , Col} from 'antd';
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
  const [equipmentDetails, setEquipmentDetails] = useState([{ 
    key: '1',
    equipment_details: ''
  }]);


const handleEquipmentDelete = (key) => {
    setEquipmentDetails(equipmentDetails.filter(item => item.key !== key));
  };

  const handleEquipmentAdd = () => {
    const newKey = Date.now().toString();
    setEquipmentDetails([...equipmentDetails, { key: newKey, equipment_details: '' }]);
  };

  const equipmentColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 80,
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Equipment Details',
      dataIndex: 'equipment_details',
      width: 300,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            const newData = equipmentDetails.map(item => 
              item.key === record.key ? { ...item, equipment_details: e.target.value } : item
            );
            setEquipmentDetails(newData);
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
          onClick={() => handleEquipmentDelete(record.key)}
        />
      ),
    },
  ];

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
      const values = await form.validateFields();
      
      const formData = {
        certificate_id: 21,
        test_number: values.test_number,
        first_sheet: {
          ulr_no: values.ulr_no,
          report_issued_date: values.report_issued_date,
          customer_name_and_address: values.customer_name_and_address,
          item_description: values.item_description,
          identification_no: values.identification_no,
          Sl_no: values.Sl_no,
          DC_no: values.DC_no,
          DC_no_dated: values.DC_no_dated,
          PO_no: values.PO_no,
          PO_no_dated: values.PO_no_dated,
          date_of_calibration: values.date_of_calibration,
          place_of_calibration: values.place_of_calibration,
          reference_document_based_on_IS: values.reference_document_based_on_IS,
          reference_document_based_on_IS_and_WP_no: values.reference_document_based_on_IS_and_WP_no,
          temperature_during_calibration: values.temperature_during_calibration,
          uncertainity_of_measurement: values.uncertainity_of_measurement,
          test_number: values.test_number,
          equipment: equipmentDetails
            .filter(item => item.equipment_details)
            .map(item => ({
              equipment_details: item.equipment_details
            }))
        },
        mechanical_calibrations: calibrationData
          .filter(item => item.nominal_positioning && item.pair_of_facesets_on_polygon_mirror && 
                         item.firstset_calibrated_cumulative_errors && item.secondset_calibrated_cumulative_errors && 
                         item.thirdset_calibrated_cumulative_errors)
          .map(item => ({
            nominal_positioning: parseInt(item.nominal_positioning),
            pair_of_facesets_on_polygon_mirror: item.pair_of_facesets_on_polygon_mirror,
            firstset_calibrated_cumulative_errors: item.firstset_calibrated_cumulative_errors,
            secondset_calibrated_cumulative_errors: item.secondset_calibrated_cumulative_errors,
            thirdset_calibrated_cumulative_errors: item.thirdset_calibrated_cumulative_errors,
            average_cumulative_errors_wrt_mastervalues: calculateAverage(item)
          }))
      };

      console.log('Submitting data:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/rotary-table`,
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
        message.error('Failed to submit data: ' + (error.response?.data?.detail || error.message));
        console.error('Error details:', error);
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
      <Form form={form} layout="vertical">
          <Card title="Basic Information">
            <Row gutter={[16, 0]}>
              
              <Col span={8}>
                <Form.Item
                  name="ulr_no"
                  label="ULR Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="test_number"
                  label="Certificate Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="report_issued_date"
                  label="Report Issued Date"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="customer_name_and_address"
                  label="Customer Name and Address"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="item_description"
                  label="Item Description"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="identification_no"
                  label="Identification Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="Sl_no"
                  label="Serial Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="DC_no"
                  label="DC Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="DC_no_dated"
                  label="DC Number Dated"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="PO_no"
                  label="PO Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="PO_no_dated"
                  label="PO Number Dated"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="date_of_calibration"
                  label="Date of Calibration"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="place_of_calibration"
                  label="Place of Calibration"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="reference_document_based_on_IS"
                  label="Reference Document Based on IS"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="reference_document_based_on_IS_and_WP_no"
                  label="Reference Document Based on IS and WP Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="temperature_during_calibration"
                  label="Temperature During Calibration"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="uncertainity_of_measurement"
                  label="Uncertainty of Measurement"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Equipment Details" style={{ marginTop: '24px' }}>
            <Table
              columns={equipmentColumns}
              dataSource={equipmentDetails}
              pagination={false}
              bordered
            />
            <Button
              type="dashed"
              onClick={handleEquipmentAdd}
              icon={<PlusOutlined />}
              style={{ marginTop: '16px' }}
            >
              Add Equipment
            </Button>
          </Card>

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
        </Form>
      </Content>
    </Layout>
  );
};

export default RotaryTable;