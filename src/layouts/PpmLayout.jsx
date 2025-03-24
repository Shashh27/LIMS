import { Layout, Menu } from 'antd';
import { FileSearchOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import cmtiLogo from '../assets/cmti.webp';

const { Sider, Content } = Layout;

const QuotationLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'enquiry',
      icon: <FileSearchOutlined />,
      label: 'Enquiry Details',
      onClick: () => navigate('/ppm-quotation/enquiry')
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'Quotations',
      onClick: () => navigate('/ppm-quotation/reports')
    },
    
  ];

  // Function to determine selected key based on current route
  const getSelectedKey = () => {
    if (location.pathname.includes('/ppm-quotation/reports')) return 'reports';
    if (location.pathname.includes('/ppm-quotation/enquiry')) return 'enquiry';
    return '';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={250}
        style={{
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '20px',
            textAlign: 'center',
            borderBottom: '1px solid #e8e8e8',
            marginBottom: '16px'
          }}>
            <img 
              src={cmtiLogo} 
              alt="CMTI Logo" 
              style={{
                width: '100px',
              }}
            />
          </div>
          <Menu
            mode="inline"
            items={menuItems}
            selectedKeys={[getSelectedKey()]}
            style={{
              borderRight: 0,
              background: '#fff'
            }}
            theme="light"
          />
        </div>
        
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e8e8e8',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          width: '100%',
          marginTop:'400px'
        }}>
          <div style={{ fontSize: '12px', color: '#666' }}>
            © 2025 CMTI. All rights reserved.
          </div>
        </div>
      </Sider>
      <Layout style={{ marginLeft: 250, background: '#f5f5f5' }}>
        <Content style={{ margin: '24px', background: '#fff', padding: '24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default QuotationLayout; 