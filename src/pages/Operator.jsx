import React, { useState } from 'react';
import { Layout, Menu, Card, Typography, Button, Row, Col, message } from 'antd';
import { 
  FileAddOutlined, 
  FileSearchOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined 
} from '@ant-design/icons';
import cmtiLogo from '../assets/cmti.webp';
import { useNavigate } from 'react-router-dom';
import OperatorReports from './OperatorReports';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

// Import all images
import autocollimatorAnalogeImg from '../assets/Autocollimator_analogue.gif';
import autocollimatorDigitalImg from '../assets/Autocollimator_digital.jpg';
import clinometerImg from '../assets/Clinometer.jpg';
import depthMicroCheckerImg from '../assets/dpa.jpg';
import inclinometerAnalogeImg from '../assets/Inclinometer.avif';
import inclinometerDigitalImg from '../assets/Inclinometer_digital.jpg';
import laserMicrometerImg from '../assets/Laser_micrometer.jpg';
import lengthBarImg from '../assets/Length_bars.jpg';
import longSlipImg from '../assets/long_slip.jpg';
import spiritLevelImg from '../assets/Spirit_Level.jpg';
import externalMicrometerAnalogueImg from '../assets/Micrometer-Analog.jpg';
import externalMicrometerDigitalImg from '../assets/digital-external-micrometers.jpg';
import vernierDepthGaugeImg from '../assets/vda.jpg';
import electronicLevelImg from '../assets/Electronic_Level.jpg';
import frameLevelImg from '../assets/fl.jpg';
import indexingTableImg from '../assets/Indexing_table.jpeg';
import rotaryTableImg from '../assets/rt.jpg';
import vernierCaliperImg from '../assets/Vernier_Caliper.jpg';

// List of all activities with their image paths and routes
const activities = [
  {
    title: 'Autocollimator Analoge',
    image: autocollimatorAnalogeImg,
    route: '/operator/autocollimator-analoge'
  },
  {
    title: 'Autocollimator Digital',
    image: autocollimatorDigitalImg,
    route: '/operator/autocollimator-digital'
  },
  {
    title: 'Clinometer',
    image: clinometerImg,
    route: '/operator/clinometer'
  },
  {
    title: 'Depth Micro Checker',
    image: depthMicroCheckerImg,
    route: '/operator/depth-micro-checker'
  },
  {
    title: 'Inclinometer Analoge',
    image: inclinometerAnalogeImg,
    route: '/operator/inclinometer-analoge'
  },
  {
    title: 'Inclinometer Digital',
    image: inclinometerDigitalImg,
    route: '/operator/inclinometer-digital'
  },
  {
    title: 'Laser Micrometer',
    image: laserMicrometerImg,
    route: '/operator/laser-micrometer'
  },
  {
    title: 'Length Bar',
    image: lengthBarImg,
    route: '/operator/length-bar'
  },
  {
    title: 'Long Slip 125 to 300',
    image: longSlipImg,
    route: '/operator/long-slip'
  },
  {
    title: 'Spirit Level',
    image: spiritLevelImg,
    route: '/operator/spirit-level'
  },
  {
    title: 'External Micrometer Analogue',
    image: externalMicrometerAnalogueImg,
    route: '/operator/external-micrometer-analogue'
  },
  {
    title: 'External Micrometer Digital',
    image: externalMicrometerDigitalImg,
    route: '/operator/external-micrometer-digital'
  },
  {
    title: 'Vernier Depth Gauge',
    image: vernierDepthGaugeImg,
    route: '/operator/vernier-depth-gauge'
  },
  {
    title: 'Electronic Level',
    image: electronicLevelImg,
    route: '/operator/electronic-level'
  },
  {
    title: 'Frame Level',
    image: frameLevelImg,
    route: '/operator/frame-level'
  },
  {
    title: 'Indexing Table',
    image: indexingTableImg,
    route: '/operator/indexing-table'
  },
  {
    title: 'Rotary Table',
    image: rotaryTableImg,
    route: '/operator/rotary-table'
  },
  {
    title: 'Vernier Caliper',
    image: vernierCaliperImg,
    route: '/operator/vernier-caliper'
  }
];

const Operator = () => {
  const [selectedMenu, setSelectedMenu] = useState('add-report');
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleActivityClick = (route) => {
    navigate(route);
  };

  const AddReportContent = () => (
    <div style={{ margin: '24px' }}>
      <Title level={3} style={{ color: '#1565c0', marginBottom: '24px' }}>
        Select Activity
      </Title>
      
      <Row gutter={[16, 16]}>
        {activities.map((activity, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s'
              }}
              cover={
                <div style={{ 
                  height: '160px', 
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#f5f5f5'
                }}>
                  <img
                    alt={activity.title}
                    src={activity.image}
                    style={{ 
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              }
              onClick={() => handleActivityClick(activity.route)}
            >
              <Meta
                title={activity.title}
                style={{ textAlign: 'center' }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        theme="light" 
        width={200} 
        collapsed={collapsed}
        collapsible
        trigger={null}
        style={{ 
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <div style={{ 
          padding: '16px', 
          textAlign: 'center',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'space-between',
          alignItems: 'center'
        }}>
          <img 
            src={cmtiLogo} 
            alt="CMTI Logo" 
            style={{ 
              width: collapsed ? '50px' : '100px', 
              height: collapsed ? '40px' : '80px',
              transition: 'all 0.2s'
            }} 
          />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          items={[
            {
              key: 'add-report',
              icon: <FileAddOutlined />,
              label: 'Add Report'
            },
            {
              key: 'view-reports',
              icon: <FileSearchOutlined />,
              label: 'View Reports'
            }
          ]}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Content style={{ background: '#f5f5f5', minHeight: '100vh' }}>
          {selectedMenu === 'add-report' ? <AddReportContent /> : <OperatorReports />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Operator;