import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Card, Typography, Layout, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import AutocollimatorAnalogeReport from '../components/reports/AutocollimatorAnalogeReport';
import AutocollimatorDigitalReport from '../components/reports/AutocollimatorDigitalReport';
import ClinometerReport from '../components/reports/ClinometerReport';
import DepthMicroCheckerReport from '../components/reports/DepthMicroCheckerReport';
import InclinometerAnalogeReport from '../components/reports/InclinometerAnalogeReport';
import InclinometerDigitalReport from '../components/reports/InclinometerDigitalReport';
import LaserMicrometerReport from '../components/reports/LaserMicrometerReport';
import LengthBarReport from '../components/reports/LengthBarReport';
import LongslipReport from '../components/reports/LongslipReport';
import SpiritLevelReport from '../components/reports/SpiritLevelReport'
import ExternalMicrometerAnalogueReport from '../components/reports/ExternalMicrometerAnalogueReport'
import ExternalMicrometerDigitalReport from '../components/reports/ExternalMicrometerDigitalReport'
import VernierDepthGaugeReport from '../components/reports/VernierDepthGaugeReport';
import ElectronicLevelReport from '../components/reports/ElectronicLevelReport';
import FrameLevelReport from '../components/reports/FrameLevelReport';
import IndexingTableReport from '../components/reports/IndexingTableReport';
import RotaryTableReport from '../components/reports/RotaryTableReport';
import VernierCaliperReport from '../components/reports/VernierCaliperReport';



const { Title, Text } = Typography;
const { Header, Content } = Layout;

const OperatorReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/testing/reports`);
      if (response.data) {
        setReports(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      message.error('Failed to fetch reports. Please try again later.');
    }
  };

  const fetchReportDetails = async (report) => {
    setLoading(true);
    try {
      let endpoint = '';
      switch(report.activity) {
        case 'Autocollimator Analoge':
          endpoint = `/testing/autocollimatorAnalog/${report.test_no}`;
          break;
        case 'Autocollimator Digital':
          endpoint = `/testing/autocollimatordigital/${report.test_no}`;
          break;
        case 'Clinometer':
          endpoint = `/testing/clinometer/${report.test_no}`;
          break;
        case 'Depth Micro Checker':
          endpoint = `/testing/depth-micro-checker?test_number=${report.test_no}`;
          break;
        case 'Inclinometer Analoge':
          endpoint = `/testing/inclinometer-analogue/?test_number=${report.test_no}`;
          break;
        case 'Inclinometer Digital':
          endpoint = `/testing/inclinometer-digital/report/${report.test_no}`;
          break;
        case 'Laser Micrometer':
          endpoint = `/testing/laser_micrometer/${report.test_no}`;
          break;
        case 'Length Bar':
          endpoint = `/testing/lengthbar/${report.test_no}`;
          break;
        case 'Long Slip 300':
          endpoint = `/testing/longslip300/${report.test_no}`;
          break;
        case 'Spirit level':
          endpoint = `/testing/spiritlevel/${report.certificate_id}?test_no=${report.test_no}`;
          break;
        case 'External Micrometer Analogue':
          endpoint = `/testing/external-micrometer-analogue/${report.certificate_id}?test_no=${report.test_no}`;
          break;
        case 'External Micrometer Digital':
          endpoint = `/testing/external-micrometer-digital/${report.certificate_id}?test_number=${report.test_no}`;
          break;
        case 'Vernier Depth Gauge':
          endpoint = `/testing/vernier_depth_gauge/${report.certificate_id}?test_number=${report.test_no}`;
          break;
        case 'Electronic Level':
          endpoint = `/testing/electronic-level/${report.certificate_id}?test_number=${report.test_no}`;
          break;
        case 'Frame level':
          endpoint = `/testing/frame-level/${report.certificate_id}?test_number=${report.test_no}`;
          break; 
        case 'Indexing table':
          endpoint = `/testing/indexing-calibration/${report.certificate_id}?test_number=${report.test_no}`;
          break;
        case 'Rotary table':
          endpoint = `/testing/rotary-calibration/${report.certificate_id}?test_number=${report.test_no}`;
          break;
        case 'Vernier Caliper':
          endpoint = `/testing/vernier-calibration/${report.certificate_id}?test_number=${report.test_no}`;
          break;
        default:
          throw new Error('Invalid activity type');
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`);
      setReportData(response.data);
      setSelectedReport(report);
      setModalVisible(true);
    } catch (error) {
      message.error('Failed to fetch report details');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Sl. No.',
      key: 'slno',
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
      width: '80px',
    },
    {
      title: 'Test Number',
      dataIndex: 'test_no',
      key: 'test_no',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => fetchReportDetails(record)}
          loading={loading && selectedReport?.test_number === record.test_number}
        >
          View Report
        </Button>
      ),
    },
  ];

  const renderReportContent = () => {
    if (!selectedReport || !reportData) return null;

    switch(selectedReport.activity) {
        case 'Autocollimator Analoge':
          return <AutocollimatorAnalogeReport data={reportData} />;
        case 'Autocollimator Digital':
          return <AutocollimatorDigitalReport data={reportData} />;
        case 'Clinometer':
          return <ClinometerReport data={reportData} />;
        case 'Depth Micro Checker':
          return <DepthMicroCheckerReport data={reportData} />;
        case 'Inclinometer Analoge':
          return <InclinometerAnalogeReport data={reportData} />;
        case 'Inclinometer Digital':
          return <InclinometerDigitalReport data={reportData} />;
        case 'Laser Micrometer':
          return <LaserMicrometerReport data={reportData} />;
        case 'Length Bar':
          return <LengthBarReport data={reportData} />;
        case 'Long Slip 300':
          return <LongslipReport data={reportData} />;

        case 'Spirit level':
          return <SpiritLevelReport data={reportData} />;

        case 'External Micrometer Analogue':
          return <ExternalMicrometerAnalogueReport data={reportData} />;

        case 'External Micrometer Digital':
          return <ExternalMicrometerDigitalReport data={reportData} />;

        case 'Vernier Depth Gauge':
          return <VernierDepthGaugeReport data={reportData} />;

        case 'Electronic Level':
          return <ElectronicLevelReport data={reportData} />;

        case 'Frame level':
          return <FrameLevelReport data={reportData} />;

        case 'Indexing table':
          return <IndexingTableReport data={reportData} />;

        case 'Rotary table':
          return <RotaryTableReport data={reportData} />;

        case 'Vernier Caliper':
          return <VernierCaliperReport data={reportData} />;

      default:
        return <div>Invalid report type</div>;
    }
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  return (
    <Layout>
      
      <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <Card>
          <Table 
            columns={columns} 
            dataSource={reports}
            rowKey="test_number"
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card>

        <Modal
          title={`${selectedReport?.activity} Report - Test No: ${selectedReport?.test_number}`}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          width={1000}
          footer={null}
        >
          {renderReportContent()}
        </Modal>
      </Content>
    </Layout>
  );
};

export default OperatorReports; 