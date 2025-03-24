import { useState, useEffect } from 'react';
import { Button, Modal, Typography, Spin, notification, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import PpmForm from '../PpmForm'; // Import PpmForm instead of PpmGenerateReport
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const PpmReports = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
      const response = await axios.get('http://127.0.0.1:8000/quotation/ppm-qoutation');
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
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Action',
      key: 'action',
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
          PPM Quotations
        </Title>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={quotations}
          rowKey="id"
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
        width={780}
        footer={null}
      >
        {selectedQuotation && (
          <PpmForm quotationData={selectedQuotation} />
        )}
      </Modal>
    </div>
  );
};

export default PpmReports;