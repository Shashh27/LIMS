import React, { useState } from 'react';
import { Layout, Menu, Card, Typography, Row, Col } from 'antd';
import { FileAddOutlined, FileSearchOutlined } from '@ant-design/icons';
import cmtiLogo from '../assets/cmti.webp';
import { useNavigate, Routes, Route } from 'react-router-dom';
import OperatorReports from './OperatorReports';

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

const { Header, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

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

const AddReportContent = () => {
  const navigate = useNavigate();
  
  const handleActivityClick = (route) => {
    navigate(route);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3} style={{ 
        color: '#1565c0', 
        marginBottom: '32px',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600'
      }}>
        Select Activity
      </Title>
      
      <Row gutter={[24, 24]}>
        {activities.map((activity, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s'
              }}
              bodyStyle={{
                padding: '16px',
                background: '#f8f9fa'
              }}
              onClick={() => handleActivityClick(activity.route)}
              cover={(
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    alt={activity.title}
                    src={activity.image}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      padding: '16px'
                    }}
                  />
                </div>
              )}
            >
              <Meta
                title={
                  <div style={{ 
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#2c3e50',
                    textAlign: 'center',
                    marginBottom: '0'
                  }}>
                    {activity.title}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const Operator = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('add-report');

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    if (key === 'view-reports') {
      navigate('/operator/reports');
    } else {
      navigate('/operator');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={cmtiLogo} 
              alt="CMTI Logo" 
              style={{ 
                height: '40px',
                marginRight: '32px'
              }} 
            />
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={[
                {
                  key: 'add-report',
                  icon: <FileAddOutlined />,
                  label: 'Add Report',
                  style: { fontSize: '16px', padding: '0 24px' }
                },
                {
                  key: 'view-reports',
                  icon: <FileSearchOutlined />,
                  label: 'View Reports',
                  style: { fontSize: '16px', padding: '0 24px' }
                }
              ]}
              style={{ 
                border: 'none',
                background: 'transparent',
                fontWeight: '500'
              }}
            />
          </div>
        </div>
      </Header>

      <Content style={{ 
        background: '#f5f5f5', 
        minHeight: '100vh',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        <Routes>
          <Route path="/" element={<AddReportContent />} />
          <Route path="/reports" element={<OperatorReports />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Operator;