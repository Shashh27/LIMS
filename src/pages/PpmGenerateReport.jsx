import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  Divider,
  Card,
  Select,
  Row,
  Col,
  Space,
  InputNumber,
  Table,
  notification,
  AutoComplete,
  Popconfirm,
  Spin,
  message
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  SearchOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const PpmGenerateReport = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const today = moment().format('D/M/YY');
  const [loading, setLoading] = useState(false);
  const [calibrationCharges, setCalibrationCharges] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  // State for dynamic section items
  const [items, setItems] = useState([
    {
      key: '1',
      sample: '',
      description: '',
      specification: '',
      sac_code:'',
      qty: '',
      unit: '',
      unit_rate_in_rs: '',
      total_cost: '',
    },
  ]);

  // Fetch calibration charges from API
  useEffect(() => {
    const fetchCalibrationCharges = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/calibration_charges/');
        setCalibrationCharges(response.data);
        
        // Prepare search options with unique keys using id
        const options = response.data.map(item => ({
          key: item.id, // Add unique key using id
          value: `${item.particulars}-${item.id}`, // Make value unique
          label: `${item.particulars}${item.specifications ? ` - ${item.specifications}` : ''}`,
          data: item
        }));
        
        setSearchOptions(options);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch calibration charges. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCalibrationCharges();
  }, []);

  console.log(searchOptions);

  // Set initial form values
  useEffect(() => {
    form.setFieldsValue({
      centre: 'CMNTM',
      lab: 'METROLOGY LAB',
      date: today,
      activity_note_1: 'Quoted price are per each qty / Parameter.',
      delivery_period: 'Four to Five weeks',
      place_of_work: 'CMTI',
      scope_of_work: 'Calibration'
    });
  }, [ form, today]);

  useEffect(() => {
    // Get the stored quotation data when component mounts
    const storedData = localStorage.getItem('selectedQuotationData');
    console.log("store",storedData)
    if (storedData) {
      const quotationData = JSON.parse(storedData);
      
      // Pre-fill the form with the stored data
      form.setFieldsValue({
        customer_details: quotationData.customer_details,
        contact_person: quotationData.contact_person,
        designation: quotationData.designation,
        department: quotationData.department,
        mobile_number: quotationData.mobile_number,
        phone_number: quotationData.phone_number,
        email_id: quotationData.email_id,
        enquiry_ref_and_date: quotationData.enquiry_ref_and_date,
        subject: quotationData.subject,
      });

      // Set initial items if available
      if (quotationData.details) {
        setItems(quotationData.details.map((detail, index) => ({
          key: index.toString(),
          sample: detail.sample,
          description: detail.description,
          specification: detail.specification,
          sac_code: detail.sac_code,
          qty: detail.qty,
          unit: detail.unit,
          unit_rate_in_rs: detail.unit_rate_in_rs,
          total_cost: detail.total_cost
        })));
      }
    }
  }, [form]);

  // Handle adding a new item
  const handleAddItem = () => {
    const newKey = Date.now().toString();
    const newItem = {
      key: newKey,
      sample: '',
      description: '',
      specification: '',
      qty: '',
      unit: '',
      unit_rate_in_rs: '',
      total_cost: '',
    };
    setItems([...items, newItem]);
  };

  // Handle deleting an item
  const handleDeleteItem = (key) => {
    // Don't allow deleting the last item
    if (items.length === 1) {
      notification.warning({
        message: 'Cannot Delete',
        description: 'At least one item is required',
      });
      return;
    }
    
    const newItems = items.filter(item => item.key !== key);
    // Update sl numbers
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      slNo: index + 1,
    }));
    setItems(updatedItems);
  };

  // Handle item change
  const handleItemChange = (key, field, value) => {
    const newItems = [...items];
    const index = newItems.findIndex(item => item.key === key);
    
    if (index !== -1) {
      newItems[index] = {
        ...newItems[index],
        [field]: value,
      };
      
      // Calculate total cost if both qty and unit rate are available
      if ((field === 'qty' || field === 'unit_rate_in_rs') && 
          newItems[index].qty && newItems[index].unit_rate_in_rs) {
        const qty = parseFloat(newItems[index].qty);
        const rate = parseFloat(newItems[index].unit_rate_in_rs);
        
        if (!isNaN(qty) && !isNaN(rate)) {
          const total = qty * rate;
          newItems[index].total_cost = total.toLocaleString('en-IN');
        }
      }
      
      setItems(newItems);
    }
  };
  
  // Handle selecting a calibration charge item from search
  const handleSelectItem = (value, option, key) => {
    const itemData = option.data;
    const newItems = [...items];
    const index = newItems.findIndex(item => item.key === key);
    
    if (index !== -1) {
      newItems[index] = {
        ...newItems[index],
        sample: itemData.particulars, // Use just particulars for display
        description: itemData.scope_of_calibration,
        specification: itemData.specifications || '',
        unit_rate_in_rs: itemData.proposed_charges_2023 || itemData.charges_april_2020,
      };
      
      // Calculate total cost if qty is already available
      if (newItems[index].qty) {
        const qty = parseFloat(newItems[index].qty);
        const rate = parseFloat(newItems[index].unit_rate_in_rs);
        
        if (!isNaN(qty) && !isNaN(rate)) {
          const total = qty * rate;
          newItems[index].total_cost = total.toLocaleString('en-IN');
        }
      }
      
      setItems(newItems);
    }
  };

  // Table columns for the items
  const itemColumns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 60,
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Sample/Activity',
      dataIndex: 'sample',
      key: 'sample',
      width: 300,
      render: (_, record) => (
        <AutoComplete
          style={{ width: '100%' }}
          options={searchOptions}
          value={record.sample}
          placeholder="Search calibration items"
          onChange={(value) => handleItemChange(record.key, 'sample', value)}
          onSelect={(value, option) => handleSelectItem(value, option, record.key)}
          filterOption={(inputValue, option) => {
            const searchText = option.label.toLowerCase();
            return searchText.includes(inputValue.toLowerCase());
          }}
          notFoundContent="No items found"
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (_, record) => (
        <Input
          value={record.description}
          onChange={(e) => handleItemChange(record.key, 'description', e.target.value)}
          placeholder="Enter description"
        />
      ),
    },
    {
      title: 'Specification',
      dataIndex: 'specification',
      key: 'specification',
      width: 200,
      render: (_, record) => (
        <Input
          value={record.specification}
          onChange={(e) => handleItemChange(record.key, 'specification', e.target.value)}
          placeholder="Enter specification"
        />
      ),
    },
    {
        title: 'HSN / SAC Code',
        dataIndex: 'sac_code',
        key: 'sac_code',
        width: 150,
        render: (_, record) => (
          <Input
            value={record.sac_code}
            onChange={(e) => handleItemChange(record.key, 'sac_code', e.target.value)}
            placeholder="HSN / SAC Code"
          />
        ),
      },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      width: 80,
      render: (_, record) => (
        <Input
          value={record.qty}
          onChange={(e) => handleItemChange(record.key, 'qty', e.target.value)}
          placeholder="Qty"
        />
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      width: 120,
      render: (_, record) => (
        <Select
          style={{ width: '100%' }}
          value={record.unit}
          onChange={(value) => handleItemChange(record.key, 'unit', value)}
          placeholder="Select unit"
        >
          <Option value="No">No</Option>
          <Option value="Set">Set</Option>
          <Option value="Pc">Pc</Option>
          <Option value="Hr">Hr</Option>
          <Option value="Day">Day</Option>
        </Select>
      ),
    },
    {
      title: 'Unit Rate (₹)',
      dataIndex: 'unit_rate_in_rs',
      key: 'unit_rate_in_rs',
      width: 120,
      render: (_, record) => (
        <Input
          value={record.unit_rate_in_rs}
          onChange={(e) => handleItemChange(record.key, 'unit_rate_in_rs', e.target.value)}
          placeholder="Rate"
        />
      ),
    },
    {
      title: 'Total Cost (₹)',
      dataIndex: 'total_cost',
      key: 'total_cost',
      width: 120,
      render: (_, record) => (
        <Input
          value={record.total_cost}
          disabled
          placeholder="Total"
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => handleDeleteItem(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ),
    },
  ];

  // Submit form handler
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = {
        quotation_no: "CMTI" + Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString('en-GB'),
        ...values,
        details: items.map(item => ({
          sample: item.sample,
          description: item.description,
          specification: item.specification,
          sac_code: item.sac_code,
          qty: item.qty,
          unit: item.unit,
          unit_rate_in_rs: item.unit_rate_in_rs,
          total_cost: item.total_cost
        }))
      };

      const response = await axios.post('http://127.0.0.1:8000/quotation/add-ppm', formData);
      
      message.success('PPM Quotation created successfully');

      // Clear stored data
      localStorage.removeItem('selectedQuotationData');
      
      navigate('/ppm-quotation/enquiry');
    } catch (error) {
      message.error('Failed to create PPM quotation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5' }}>
      <Spin spinning={loading} tip="Loading...">
        <Card bordered={false}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/ppm-quotation/enquiry')}
              style={{ marginRight: '16px' }}
            >
              Back
            </Button>
            <Title level={3} style={{ color: '#1565c0', margin: 0 , marginLeft:'250px'}}>
              Generate Quotation
            </Title>
          </div>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            centre: 'CMNTM',
            lab: 'METROLOGY LAB',
            date: today,
          }}
        >
          <Row gutter={24}>
            
            <Col span={6}>
              <Form.Item
                label="Quotation No."
                name="qoutation_no"
              >
                <Input placeholder="Enter quotation number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please enter date' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Customer Information</Divider>
          
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Customer Details"
                name="customer_details"
                rules={[{ required: true, message: 'Please enter customer details' }]}
              >
                <TextArea rows={3} placeholder="Enter customer details" />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Contact Person"
                    name="contact_person"
                  >
                    <Input placeholder="Enter contact person name"/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Designation"
                    name="designation"
                  >
                    <Input placeholder="Enter designation "/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Department"
                    name="department"
                  >
                    <Input placeholder="Enter department"/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Mobile Number"
                    name="mobile_number"
                  >
                    <Input placeholder="Enter mobile number"/>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
              >
                <Input placeholder="Enter phone number"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email ID"
                name="email_id"
              >
                <Input placeholder="Enter email id"/>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Enquiry Ref. and Date"
                name="enquiry_ref_and_date"
              >
                <Input placeholder="Enter reference and date" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Customer Code"
                name="customer_code"
              >
                <Input placeholder="Enter customer code" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="GST Details"
                name="gst_details"
              >
                <Input placeholder="Enter GST details" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: 'Please enter subject' }]}
              >
                <Input placeholder="e.g. Quotation for the Calibration charges of Slip Gauges, Angle Gauges" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Items/Activities</Divider>
          
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              type="dashed" 
              onClick={handleAddItem} 
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              Add Item
            </Button>
            
            
          </div>
          
          <Table
            columns={itemColumns}
            dataSource={items}
            pagination={false}
            bordered
            size="middle"
            scroll={{ x: 1200 }}
          />
                    
          
          
          <Divider orientation="left">Terms & Conditions</Divider>
          
          <Row gutter={24}>
            
            <Col span={8}>
              <Form.Item
                label="Delivery Period"
                name="delivery_period"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Place of Work"
                name="place_of_work"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Scope of Work"
                name="scope_of_work"
              >
                <Input placeholder='enter scope of work'/>
              </Form.Item>
            </Col>
          </Row>
          
          
          
          
          
          <Divider />
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Submit Quotation
              </Button>
              <Button onClick={() => navigate('/ppm-quotation/enquiry')}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      </Spin>
    </div>
  );
};

export default PpmGenerateReport;