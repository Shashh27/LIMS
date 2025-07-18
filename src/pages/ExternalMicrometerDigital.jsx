import React, { useState } from 'react';
import { Table, Input, Button, Card, Typography, message, Layout, Form , Row , Col} from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Title } = Typography;
const { Header, Content } = Layout;

const ExternalMicrometerDigital = () => {
  const navigate = useNavigate();
  const [thimbleData, setThimbleData] = useState([{ key: '1' }]);
  const [anvilsData, setAnvilsData] = useState([{ key: '1' }]);
  const [gaugeRodsData, setGaugeRodsData] = useState([{ key: '1' }]);
  const [allowableValues, setAllowableValues] = useState({
    permissible_total_error_150_200: '',
    permissible_total_error_200_250: '',
    permissible_total_error_250_300: '',
    permissible_measuring_faces_150_200: '',
    permissible_measuring_faces_200_250: '',
    permissible_measuring_faces_250_300: '',
    flatness_of_measuring_faces: ''
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
        certificate_id: 16,
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
          equipment: equipmentDetails
            .filter(item => item.equipment_details)
            .map(item => ({
              equipment_details: item.equipment_details
            }))
        },
        micrometer_thimble_calibrations: thimbleData
          .filter(item => item.micrometer_reading && item.slip_gauge_size && item.error)
          .map(item => ({
            slip_gauge_size: item.slip_gauge_size || '',
            micrometer_reading: item.micrometer_reading || '',
            error: item.error || ''
          })),
        interchangeable_anvils_calibrations: anvilsData
          .filter(item => item.range_of_micrometer && item.anvil_error)
          .map(item => ({
            range_of_micrometer: item.range_of_micrometer || '',
            anvil_error: item.anvil_error || ''
          })),
        setting_gauge_rods_calibrations: gaugeRodsData
          .filter(item => item.nominal_values && item.calibrated_values)
          .map(item => ({
            nominal_values: item.nominal_values || '',
            calibrated_values: item.calibrated_values || ''
          })),
        allowable_values_calibrations: [{
          permissible_total_error_over_a_range_of_150_to_200mm: allowableValues.permissible_total_error_150_200,
          permissible_total_error_over_a_range_of_200_to_250mm: allowableValues.permissible_total_error_200_250,
          permissible_total_error_over_a_range_of_250_to_300mm: allowableValues.permissible_total_error_250_300,
          parallelity_of_measuring_faces_over_range_of_150_to_200mm: allowableValues.permissible_measuring_faces_150_200,
          parallelity_of_measuring_faces_over_range_of_200_to_250mm: allowableValues.permissible_measuring_faces_200_250,
          parallelity_of_measuring_faces_over_range_of_250_to_300mm: allowableValues.permissible_measuring_faces_250_300,
          flatness_of_measuring_faces: allowableValues.flatness_of_measuring_faces
        }]
      };

      console.log('Submitting data:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/testing/external-micrometer-digital`,
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

  const thimbleColumns = [
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
            setThimbleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, slip_gauge_size: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Micrometer Reading',
      dataIndex: 'micrometer_reading',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setThimbleData(prev => prev.map(item => 
              item.key === record.key ? { ...item, micrometer_reading: e.target.value } : item
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
            setThimbleData(prev => prev.map(item => 
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
          onClick={() => handleDeleteRow(record.key, setThimbleData)}
        />
      ),
    },
  ];

  const anvilsColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Range of Micrometer',
      dataIndex: 'range_of_micrometer',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setAnvilsData(prev => prev.map(item => 
              item.key === record.key ? { ...item, range_of_micrometer: e.target.value } : item
            ));
          }}
        />
      ),
    },
    {
      title: 'Anvil Error',
      dataIndex: 'anvil_error',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setAnvilsData(prev => prev.map(item => 
              item.key === record.key ? { ...item, anvil_error: e.target.value } : item
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
          onClick={() => handleDeleteRow(record.key, setAnvilsData)}
        />
      ),
    },
  ];

  const gaugeRodsColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Nominal Values',
      dataIndex: 'nominal_values',
      width: 150,
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => {
            setGaugeRodsData(prev => prev.map(item => 
              item.key === record.key ? { ...item, nominal_values: e.target.value } : item
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
            setGaugeRodsData(prev => prev.map(item => 
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
          onClick={() => handleDeleteRow(record.key, setGaugeRodsData)}
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
        <Title level={4} style={{ margin: 0 }}>External Micrometer Digital Calibration</Title>
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
          
          <Title level={4}>I. Calibration of Micrometer Thimble: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table
            columns={thimbleColumns}
            dataSource={thimbleData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setThimbleData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>II. Calibration of Inter-changable anvils</Title>
          <Table
            columns={anvilsColumns}
            dataSource={anvilsData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setAnvilsData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>III. Calibration of Setting gauge rods: <span style={{ fontSize: '14px' }}>(All values are in mm)</span></Title>
          <Table
            columns={gaugeRodsColumns}
            dataSource={gaugeRodsData}
            pagination={false}
            bordered
          />
          <Button
            type="dashed"
            onClick={() => handleAddRow(setGaugeRodsData)}
            icon={<PlusOutlined />}
            style={{ marginTop: '16px' }}
          >
            Add Row
          </Button>

          <Title level={4} style={{ marginTop: '24px' }}>Allowable Values for 0.01 mm L.C. Micrometer as per IS: 2967 – 1983</Title>
          <Table
            columns={[
              {
                title: 'Parameters',
                dataIndex: 'parameter',
                width: 300,
                render: (_, record) => record.parameter,
              },
              {
                title: 'Permissible Error',
                dataIndex: 'value',
                width: 150,
                render: (text, record) => (
                  <Input
                    value={allowableValues[record.key] || ''}
                    onChange={(e) => {
                      setAllowableValues(prev => ({
                        ...prev,
                        [record.key]: e.target.value
                      }));
                    }}
                  />
                ),
              },
            ]}
            dataSource={[
              { key: 'permissible_total_error_150_200', parameter: 'Permissible total error Over a range of 150-200 mm.' },
              { key: 'permissible_total_error_200_250', parameter: 'Permissible total error Over a range of 200-250 mm.' },
              { key: 'permissible_total_error_250_300', parameter: 'Permissible total error Over a range of 250-300 mm.' },
              { key: 'permissible_measuring_faces_150_200', parameter: 'Permissible measuring faces Over a range of 150-200 mm.' },
              { key: 'permissible_measuring_faces_200_250', parameter: 'Permissible measuring faces Over a range of 200-250 mm.' },
              { key: 'permissible_measuring_faces_250_300', parameter: 'Permissible measuring faces Over a range of 250-300 mm.' },
              { key: 'flatness_of_measuring_faces', parameter: 'Flatness of measuring faces' },
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

export default ExternalMicrometerDigital;