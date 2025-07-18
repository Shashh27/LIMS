import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form , Row , Col} from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const FrameLevel = () => {
  const navigate = useNavigate();
  const [bubbleAccuracyData, setBubbleAccuracyData] = useState([{ key: '1' }]);
  const [consistencyValue, setConsistencyValue] = useState('');
  const [geometricalData, setGeometricalData] = useState({
    flatness_of_base_A: '',
    parallelity_flat_to_V_face_A: '',
    parallelity_face_C_wrt_face_A: '',
    parallelity_face_D_wrt_face_B: '',
    perpendicularity_face_B_wrt_face_A_flat_to_flat: '',
    perpendicularity_face_B_wrt_face_A: '',
    perpendicularity_of_face_d: ''
  });
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

  const handleAddRow = (setData) => {
    const newKey = Date.now().toString();
    setData(prev => [...prev, { key: newKey }]);
  };

  const handleDeleteRow = (key, setData) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = {
        certificate_id: 19,
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
        bubble_accuracy: bubbleAccuracyData
          .filter(item => item.scale_reading && item.right_side_calibrated_values && item.left_side_calibrated_values)
          .map(item => ({
            scale_reading: item.scale_reading,
            right_side_calibrated_values: item.right_side_calibrated_values,
            left_side_calibrated_values: item.left_side_calibrated_values
          })),
        bubble_consistency: [{
          parameter: "Consistency (Repeatability)",
          calibrated_values: consistencyValue
        }],
        geometrical_parameters: [{
          flatness_of_base_A: geometricalData.flatness_of_base_A,
          parallelity_flat_to_V_face_A: geometricalData.parallelity_flat_to_V_face_A,
          parallelity_face_C_wrt_face_A: geometricalData.parallelity_face_C_wrt_face_A,
          parallelity_face_D_wrt_face_B: geometricalData.parallelity_face_D_wrt_face_B,
          perpendicularity_face_B_wrt_face_A_flat_to_flat: geometricalData.perpendicularity_face_B_wrt_face_A_flat_to_flat,
          perpendicularity_face_B_wrt_face_A: geometricalData.perpendicularity_face_B_wrt_face_A,
          perpendicularity_of_face_d: geometricalData.perpendicularity_of_face_d
        }],
        frame_level_details: [{
          method_of_calibration: "The calibration was carried out by comparison method using standard angle gauge block set.",
          note: "Only Parameter requested by the customer has been calibrated."
        }]
      };

      console.log('Submitting data:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/frame-level-calibration`,
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

  const bubbleAccuracyColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Scale Reading',
      dataIndex: 'scale_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setBubbleAccuracyData(prev => prev.map(item => 
              item.key === record.key ? { ...item, scale_reading: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated values Right side (towards cross bubble)',
      dataIndex: 'right_side_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setBubbleAccuracyData(prev => prev.map(item => 
              item.key === record.key ? { ...item, right_side_calibrated_values: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Calibrated values Left side (towards cross bubble)',
      dataIndex: 'left_side_calibrated_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setBubbleAccuracyData(prev => prev.map(item => 
              item.key === record.key ? { ...item, left_side_calibrated_values: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setBubbleAccuracyData)}
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
        <Title level={4} style={{ margin: 0 }}>Frame Level Calibration</Title>
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
          
          <Title level={4}>I. Calibration of Bubble accuracy (Sensitivity): <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
          <Table
            columns={bubbleAccuracyColumns}
            dataSource={bubbleAccuracyData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setBubbleAccuracyData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Bubble Consistency (Repeatability): <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
          <Table
            columns={[
              {
                title: 'Parameters',
                dataIndex: 'parameter',
                width: 300,
                render: () => 'Consistency (Repeatability)',
              },
              {
                title: 'Calibrated Values',
                dataIndex: 'value',
                width: 150,
                render: () => (
                  <Input
                    value={consistencyValue}
                    onChange={(e) => setConsistencyValue(e.target.value)}
                  />
                ),
              },
            ]}
            dataSource={[{ key: '1' }]}
            pagination={false}
            bordered
          />

          <Title level={4} style={{ marginTop: '24px' }}>III. Calibration of Geometrical Parameter: <span style={{ fontSize: '14px' }}>(All values are in mm/m)</span></Title>
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
                title: 'Calibrated Values in mm',
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
              { key: 'flatness_of_base_A', parameter: 'Flatness of Base A' },
              { key: 'parallelity_flat_to_V_face_A', parameter: 'Parallelity between Flat to "V" of Face "A"' },
              { key: 'parallelity_face_C_wrt_face_A', parameter: 'Parallelity of Face "C" w.r.t. Face "A" (Flat to flat)' },
              { key: 'parallelity_face_D_wrt_face_B', parameter: 'Parallelity of Face "D" w.r.t. Face "B" (Flat to flat)' },
              { key: 'perpendicularity_face_B_wrt_face_A_flat_to_flat', parameter: 'Perpendicularity of Face "B" w.r.t. Face "A" (Flat to flat)' },
              { key: 'perpendicularity_face_B_wrt_face_A', parameter: 'Perpendicularity of Face "B" w.r.t. Face "A" (Flat of Face "A" to "V" of Face "B")' },
              { key: 'perpendicularity_of_face_d', parameter: 'Perpendicularity of Face "D" w.r.t. Face "A" (Flat to flat)' },
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
        </Form>
      </Content>
    </Layout>
  );
};

export default FrameLevel;