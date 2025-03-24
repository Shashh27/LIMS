import { useState, useEffect } from 'react';
import { Table, Typography, Spin, notification, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    fetchCalibrationCharges();
  }, []);

  const fetchCalibrationCharges = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/calibration_charges/');
      setData(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch calibration charges',
      });
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Sl No.',
      dataIndex: 'slno',
      key: 'slno',
      width: 100,
      sorter: (a, b) => a.slno.localeCompare(b.slno),
      ...getColumnSearchProps('slno'),
    },
    {
      title: 'Particulars',
      dataIndex: 'particulars',
      key: 'particulars',
      width: 200,
      sorter: (a, b) => a.particulars.localeCompare(b.particulars),
      ...getColumnSearchProps('particulars'),
    },
    {
      title: 'Specifications',
      dataIndex: 'specifications',
      key: 'specifications',
      width: 200,
      render: text => text || '-',
      sorter: (a, b) => (a.specifications || '').localeCompare(b.specifications || ''),
      ...getColumnSearchProps('specifications'),
    },
    {
      title: 'Scope of Calibration',
      dataIndex: 'scope_of_calibration',
      key: 'scope_of_calibration',
      width: 250,
      
    },
    {
      title: 'Proposed Charges April 2020',
      dataIndex: 'charges_april_2020',
      key: 'charges_april_2020',
      width: 200,
      render: text => `${text}`,
      sorter: (a, b) => parseFloat(a.charges_april_2020) - parseFloat(b.charges_april_2020),
    },
    {
      title: 'Proposed Charges April 2023',
      dataIndex: 'proposed_charges_2023',
      key: 'proposed_charges_2023',
      width: 200,
      render: text => `${text}`,
      sorter: (a, b) => parseFloat(a.proposed_charges_2023) - parseFloat(b.proposed_charges_2023),
    },
    {
      title: '% Increase',
      dataIndex: 'percentage_increase',
      key: 'percentage_increase',
      width: 120,
      render: text => `${text}`,
      sorter: (a, b) => parseFloat(a.percentage_increase) - parseFloat(b.percentage_increase),
    },
    {
      title: 'NABL Logo',
      dataIndex: 'nabl_logo',
      key: 'nabl_logo',
      width: 120,
      render: text => text || '-',
      filters: [
        { text: 'NABL', value: 'NABL' },
        { text: 'Non-NABL', value: null },
      ],
      onFilter: (value, record) => record.nabl_logo === value,
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
        Calibration Charges
      </Title>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          scroll={{ x: 1300 }}
          pagination={{
            pageSize: 10,
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
      </Spin>
    </div>
  );
};

export default Admin; 