import { useState, useEffect } from 'react';
import { Button, Modal, Typography, Spin, notification, Table, Tag } from 'antd';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import QuotationForm from '../QuotationForm';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Reports = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/quotation/');
      setQuotations(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch quotations',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Sl.No',
      key: 'slNo',
      width: 80,
      fixed: 'left',
      render: (_, record, index) => {
        const { current, pageSize } = pagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 100,
    },
    {
      title: 'Customer Details',
      dataIndex: 'customer_details',
      key: 'customer_details',
      width: 250,
    },
    {
      title: 'Contact Person',
      dataIndex: 'contact_person',
      key: 'contact_person',
      width: 150,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 300,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        let color = 'gold';
        let text = 'Pending';
        
        if (status === 'approved') {
          color = 'green';
          text = 'Approved';
        } else if (status === 'rejected') {
          color = 'red';
          text = 'Rejected';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 200,
      render: (remarks) => remarks || '-',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={() => handleViewQuotation(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Title level={3} style={{ 
          color: '#1565c0',
          margin: 0,
          borderBottom: '2px solid #1e88e5',
          paddingBottom: '12px'
        }}>
          Quotations
        </Title>
        <Button 
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/quotation/add-report')}
          style={{
            background: '#1565c0'
          }}
        >
          New Quotation
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={quotations}
          rowKey="id"
          scroll={{ x: 1300 }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
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
      </Spin>

      <Modal
        title="Quotation Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={1000}
        footer={null}
      >
        {selectedQuotation && (
          <QuotationForm quotationData={selectedQuotation} />
        )}
      </Modal>
    </div>
  );
};

export default Reports; 