import { Table, Button, Typography, notification } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Enquiry = () => {
  const navigate = useNavigate();

  // Function to handle generate report button click
  const handleGenerateReport = (record) => {
    // Navigate to the report generation page with the selected record data
    navigate('/quotation/enquiry/report', { state: { customerData: record } });
  };

  const columns = [
    {
      title: 'Sl No.',
      dataIndex: 'slNo',
      key: 'slNo',
      width: 80,
    },
    {
      title: 'Customer Details',
      dataIndex: 'customerDetails',
      key: 'customerDetails',
      width: 200,
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      width: 150,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      width: 150,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 150,
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      width: 150,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: 'Email ID',
      dataIndex: 'emailId',
      key: 'emailId',
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<FileTextOutlined />}
          style={{
            background: '#1890ff'
          }}
          onClick={() => handleGenerateReport(record)}
        >
          Generate Report
        </Button>
      ),
    },
  ];

  // Sample data with 5 entries
  const data = [
    {
      key: '1',
      slNo: 1,
      customerDetails: 'BHEL-EDN',
      contactPerson: 'Mr. S BALAJEE',
      designation: 'Additional Engineer Gr.II',
      department: 'QUALITY SERVICES',
      mobileNumber: '9449440026',
      phoneNumber: '-',
      emailId: 'balajees@bhel.in',
    },
    {
      key: '2',
      slNo: 2,
      customerDetails: 'Tata Motors Ltd',
      contactPerson: 'Ms. Priya Sharma',
      designation: 'Senior Engineer',
      department: 'Quality Assurance',
      mobileNumber: '9876543210',
      phoneNumber: '080-23456789',
      emailId: 'priya.sharma@tatamotors.com',
    },
    {
      key: '3',
      slNo: 3,
      customerDetails: 'Infosys Technologies',
      contactPerson: 'Mr. Rajesh Kumar',
      designation: 'Project Manager',
      department: 'Facilities',
      mobileNumber: '8765432109',
      phoneNumber: '080-28765432',
      emailId: 'rajesh.kumar@infosys.com',
    },
    {
      key: '4',
      slNo: 4,
      customerDetails: 'HAL Aerospace',
      contactPerson: 'Dr. Anil Verma',
      designation: 'Chief Engineer',
      department: 'R&D Division',
      mobileNumber: '7654321098',
      phoneNumber: '080-22221111',
      emailId: 'anil.verma@hal.co.in',
    },
    {
      key: '5',
      slNo: 5,
      customerDetails: 'Bosch India',
      contactPerson: 'Mrs. Sunita Patel',
      designation: 'Procurement Manager',
      department: 'Supply Chain',
      mobileNumber: '9988776655',
      phoneNumber: '080-33445566',
      emailId: 'sunita.patel@bosch.com',
    },
  ];

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <Title level={3} style={{ 
        color: '#1565c0',
        marginBottom: '24px',
        borderBottom: '2px solid #1e88e5',
        paddingBottom: '12px'
      }}>
        Enquiry Details
      </Title>
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 1500 }}
        pagination={{
          pageSize: 10,
          position: ['bottomRight'],
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
        components={{
          header: {
            cell: props => (
              <th
                {...props}
                style={{
                  backgroundColor: '#f0f5ff',
                  color: '#1565c0',
                  fontWeight: 'bold',
                  borderBottom: '2px solid #1890ff',
                  ...props.style,
                }}
                />
              )
            }
          }}
      />
    </div>
  );
};

export default Enquiry;