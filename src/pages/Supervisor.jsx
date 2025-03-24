import { useState, useEffect } from 'react';
import { Button, Modal, Typography, Spin, notification, Table, Space, Input, Tag } from 'antd';
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import QuotationForm from '../QuotationForm';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Supervisor = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [remarks, setRemarks] = useState({});
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchQuotations();
  }, []);

  console.log( "hii:" ,selectedQuotation);


  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/quotation/');
      setQuotations(response.data);
      // Initialize remarks state
      const remarksObj = {};
      response.data.forEach(q => {
        remarksObj[q.id] = q.remarks || '';
      });
      setRemarks(remarksObj);
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

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://127.0.0.1:8000/quotation/${id}/status`, {
        status: status
      });
      notification.success({
        message: 'Success',
        description: 'Status updated successfully'
      });
      fetchQuotations(); // Refresh the data
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update status'
      });
    }
  };

  const handleRemarksUpdate = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/quotation/${id}/remarks`, {
        remarks: remarks[id]
      });
      notification.success({
        message: 'Success',
        description: 'Remarks updated successfully'
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update remarks'
      });
    }
  };

  // Table columns configuration
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
      title: 'Authorize',
      key: 'authorize',
      width: 250,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            style={{ backgroundColor: '#52c41a' }}
            onClick={() => handleStatusUpdate(record.id, 'approved')}
          >
            Approve
          </Button>
          <Button
            type="primary"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleStatusUpdate(record.id, 'rejected')}
          >
            Reject
          </Button>
        </Space>
      ),
    },
    {
      title: 'Remarks',
      key: 'remarks',
      width: 250,
      render: (_, record) => (
        <Input.Group compact>
          <Input
            style={{ width: '70%' }}
            value={remarks[record.id]}
            onChange={(e) => setRemarks(prev => ({
              ...prev,
              [record.id]: e.target.value
            }))}
            placeholder="Enter remarks"
          />
          <Button
            type="primary"
            onClick={() => handleRemarksUpdate(record.id)}
            style={{ width: '30%' }}
          >
            Save
          </Button>
        </Input.Group>
      ),
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
      <Title level={3} style={{ 
        color: '#1565c0',
        marginBottom: '24px',
        borderBottom: '2px solid #1e88e5',
        paddingBottom: '12px'
      }}>
        Quotation Authorization
      </Title>

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

export default Supervisor; 