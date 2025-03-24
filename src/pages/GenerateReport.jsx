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
  Spin
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

const GenerateReport = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const today = moment().format('D/M/YY');
  const [loading, setLoading] = useState(false);
  const [calibrationCharges, setCalibrationCharges] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [additionalCharges, setAdditionalCharges] = useState([]);

  // State for dynamic section items
  const [items, setItems] = useState([
    {
      key: '1',
      slNo: 1,
      sample: '',
      description: '',
      specification: '',
      qty: '',
      unit: '',
      unitRate: '',
      totalCost: '',
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

  // Add this useEffect to fetch additional charges
  useEffect(() => {
    const fetchAdditionalCharges = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/additional_calibration_charges/');
        setAdditionalCharges(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch additional charges',
        });
      }
    };
    
    fetchAdditionalCharges();
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
      ot_charges: 'Rs per Hour',
      terms_and_conditions_1: 'Local Assighnment',
      terms_and_conditions_2: 'charges are on Per day basis',
      no_of_person_visiting_1: 'NA',
      no_of_person_visiting_2: '(for Outstation Assighnment only)',
    });
  }, [ form, today]);

  // Handle adding a new item
  const handleAddItem = (isSubActivity = false) => {
    const newKey = Date.now().toString();
    const newItem = {
      key: newKey,
      slNo: isSubActivity ? null : items.length + 1,
      sample: '',
      description: '',
      specification: '',
      qty: '',
      unit: '',
      unitRate: '',
      totalCost: '',
      isSubActivity,
    };
    setItems([...items, newItem]);
  };

  // Handle adding a sub-activity
  const handleAddSubActivity = () => {
    handleAddItem(true);
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
      if ((field === 'qty' || field === 'unitRate') && 
          newItems[index].qty && newItems[index].unitRate) {
        const qty = parseFloat(newItems[index].qty);
        const rate = parseFloat(newItems[index].unitRate);
        
        if (!isNaN(qty) && !isNaN(rate)) {
          const total = qty * rate;
          // Store raw number as string for backend
          newItems[index].totalCost = total.toString();
          // Store formatted value for display
          newItems[index].totalCostDisplay = total.toLocaleString('en-IN');
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
        unitRate: itemData.proposed_charges_2023 || itemData.charges_april_2020,
      };
      
      // Calculate total cost if qty is already available
      if (newItems[index].qty) {
        const qty = parseFloat(newItems[index].qty);
        const rate = parseFloat(newItems[index].unitRate);
        
        if (!isNaN(qty) && !isNaN(rate)) {
          const total = qty * rate;
          newItems[index].totalCost = total.toLocaleString('en-IN');
        }
      }
      
      setItems(newItems);
    }
  };

  // Table columns for the items
  const itemColumns = [
    {
      title: 'Sl No',
      dataIndex: 'slNo',
      key: 'slNo',
      width: 60,
    },
    {
      title: 'Sample/Activity',
      dataIndex: 'sample',
      key: 'sample',
      width: 300,
      render: (_, record) => {
        if (record.isSubActivity) {
          return (
            <Select
              style={{ width: '100%' }}
              value={record.sample || undefined}
              placeholder="Select sub-activity"
              onChange={(value) => {
                // First find the selected charge
                const selectedCharge = additionalCharges.find(
                  charge => charge.particulars === value
                );
                
                if (selectedCharge) {
                  // Update the items state with both sample and unit rate
                  const newItems = [...items];
                  const index = newItems.findIndex(item => item.key === record.key);
                  
                  if (index !== -1) {
                    newItems[index] = {
                      ...newItems[index],
                      sample: selectedCharge.particulars,  // Set the sample value
                      unitRate: selectedCharge.charges_april_2020,  // Set the unit rate
                    };
                    setItems(newItems);
                  }
                }
              }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                if (input.toLowerCase().startsWith('el')) {
                  const charge = additionalCharges.find(c => c.particulars === option.value);
                  return charge && 
                         charge.main_activity.toLowerCase().startsWith('electronic') &&
                         option.children.toLowerCase().includes(input.toLowerCase());
                }
                return option.children.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {additionalCharges.map(charge => (
                <Select.Option 
                  key={charge.id} 
                  value={charge.particulars}
                >
                  {charge.particulars}
                </Select.Option>
              ))}
            </Select>
          );
        }

        return (
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
        );
      },
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
      dataIndex: 'unitRate',
      key: 'unitRate',
      width: 120,
      render: (_, record) => (
        <Input
          value={record.unitRate}
          onChange={(e) => handleItemChange(record.key, 'unitRate', e.target.value)}
          placeholder="Rate"
        />
      ),
    },
    {
      title: 'Total Cost (₹)',
      dataIndex: 'totalCost',
      key: 'totalCost',
      width: 120,
      render: (_, record) => (
        <Input
          value={record.totalCostDisplay || record.totalCost}
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
      
      // Format the items data
      const formattedItems = items.map(item => {
        // Calculate total cost
        const qty = parseFloat(item.qty || '0');
        const rate = parseFloat(item.unitRate || '0');
        const totalCost = !isNaN(qty) && !isNaN(rate) ? (qty * rate).toString() : '0';

        return {
          sample: item.sample,
          description: item.description,
          specification: item.specification,
          qty: item.qty || '',
          unit: item.unit || '',
          unit_rate_in_rs: item.unitRate || '',
          total_cost: totalCost,  // Match the exact field name from the API schema
          // Remove is_sub_activity as it's not in the API schema
        };
      });

      const formData = {
        ...values,
        details: formattedItems,
        // Add any missing required fields with empty strings
        activity_note_2: '',
        activity_note_3: '',
        activity_note_4: '',
        activity_note_5: '',
        scope_note_1: '',
        scope_note_2: '',
        scope_note_3: '',
        scope_note_4: '',
        payment: '',
      };

      console.log('Sending data:', formData);

      const response = await axios.post('http://127.0.0.1:8000/quotation/', formData);

      if (response.status === 201) {
        notification.success({
          message: 'Success',
          description: 'Quotation created successfully',
        });
        navigate('/quotation/enquiry');
      }
    } catch (error) {
      console.error('Error data:', error.response?.data);
      notification.error({
        message: 'Error',
        description: error.response?.data?.detail || 'Failed to create quotation',
      });
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
              onClick={() => navigate('/quotation/reports')}
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
                label="Centre"
                name="centre"
                rules={[{ required: true, message: 'Please enter the centre' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Lab"
                name="lab"
                rules={[{ required: true, message: 'Please enter the lab' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Enquiry No."
                name="enq_no"
              >
                <Input placeholder="Enter enquiry number" />
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
          
          <div style={{ marginBottom: 16, display: 'flex', gap: '20px' }}>
            <Button 
              type="dashed" 
              onClick={() => handleAddItem(false)} 
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              Add Item
            </Button>

            <Button 
              type="dashed" 
              onClick={handleAddSubActivity} 
              icon={<PlusOutlined />}
              style={{ marginBottom: 16 }}
            >
              Add Sub Activity
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
          
          <Divider orientation="left">Activity Notes</Divider>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Activity Note 1"
                name="activity_note_1"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Activity Note 2"
                name="activity_note_2"
              >
                <Input placeholder="e.g. For Sl No.:1 & 3 Slip Gauge Blocks CMC is ±(0.043+L/1600) μm, (Where L is in mm)" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Activity Note 3"
                name="activity_note_3"
              >
                <Input placeholder="e.g. Sl No.: 4, Long Slip Gauges CMC is ±(0.45+L/1000) μm. (Where L is in mm) (> 100 mm to 300mm)" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Activity Note 4"
                name="activity_note_4"
              >
                <Input placeholder="e.g. Sl No.: 4, Long Slip Gauges CMC is ±(0.6+L/925)μm. (Where L is in mm) (> 300 mm to 1000mm)" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Activity Note 5"
                name="activity_note_5"
              >
                <Input placeholder="e.g. GST extra as applicable." />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Terms & Conditions</Divider>
          
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Payment"
                name="payment"
              >
                <Input placeholder="Enter payment terms" />
              </Form.Item>
            </Col>
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
          </Row>
          
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="OT Charges"
                name="ot_charges"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Terms and Conditions 1"
                name="terms_and_conditions_1"
              >
                <Select>
                  <Option value="Local Assighnment">Local Assignment</Option>
                  <Option value="Outstation Assighnment">Outstation Assignment</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Terms and Conditions 2"
                name="terms_and_conditions_2"
              >
                <Select>
                  <Option value="charges are on Per day basis">Charges are on Per day basis</Option>
                  <Option value="charges are on Per unit basis">Charges are on Per unit basis</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="No. of Person Visiting 1"
                name="no_of_person_visiting_1"
              >
                <Select>
                  <Option value="NA">NA</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                  <Option value="7">7</Option>
                  <Option value="8">8</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="No. of Person Visiting 2"
                name="no_of_person_visiting_2"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider />
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Submit Quotation
              </Button>
              <Button onClick={() => navigate('/quotation/enquiry')}>
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

export default GenerateReport;