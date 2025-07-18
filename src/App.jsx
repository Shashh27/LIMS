import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuotationLayout from './layouts/QuotationLayout';
import PpmLayout from './layouts/PpmLayout';
import Login from './pages/Login';

import GenerateReport from './pages/GenerateReport';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import PpmForm from './PpmForm';
import PpmEnquiry from './pages/PpmEnquiry';
import PpmReports from './pages/PpmReports';
import Supervisor from './pages/Supervisor';
import PpmGenerateReport from './pages/PpmGenerateReport';
import Operator from './pages/Operator';
import AutocollimatorAnaloge from './pages/AutocollimatorAnaloge';
import AutocollimatorDigital from './pages/AutocollimatorDigital';
import Clinometer from './pages/Clinometer';
import DepthMicroChecker from './pages/DepthMicroChecker';
import InclinometerAnaloge from './pages/InclinometerAnaloge';
import InclinometerDigital from './pages/InclinometerDigital';
import LaserMicrometer from './pages/LaserMicrometer';
import LengthBar from './pages/LengthBar';
import LongSlip from './pages/LongSlip';
import SpiritLevel from './pages/SpiritLevel';
import ExternalMicrometerAnalogue from './pages/ExternalMicrometerAnalogue';
import ExternalMicrometerDigital from './pages/ExternalMicrometerDigital';
import VernierDepthGauge from './pages/VernierDepthGauge';
import ElectronicLevel from './pages/ElectronicLevel';
import FrameLevel from './pages/FrameLevel';
import IndexingTable from './pages/IndexingTable';
import RotaryTable from './pages/RotaryTable';
import VernierCaliper from './pages/VernierCaliper';

// Protected Route Component
const ProtectedRoute = ({ children, allowedDepartment, allowedRoles = [] }) => {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userStr);
  
  if (user.department !== allowedDepartment) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/operator/*" element={<Operator/>} />
        
        {/* PPM Department Routes */}
        <Route path="/ppm-quotation" element={
            <PpmLayout />
        }>
          <Route path="enquiry" element={<PpmEnquiry />} />
          <Route path="enquiry/add-quotation" element={<PpmGenerateReport />} />
          <Route path="reports" element={<PpmReports />} />
        </Route>

        {/* MNTM Department Routes */}
        <Route path="/quotation" element={
            <QuotationLayout />
        }>
          <Route path="add-report" element={<GenerateReport />} />
          <Route path="reports" element={<Reports />} />
          <Route path="charges" element={
              <Admin />
          } />
          <Route path="supervisor" element={
            <ProtectedRoute allowedDepartment="mntm" allowedRoles={["supervisor"]}>
              <Supervisor />
            </ProtectedRoute>
          } />
          <Route path="ppm" element={<PpmForm />}/>
        </Route>

        <Route path="/operator/autocollimator-analoge" element={<AutocollimatorAnaloge />} />
        <Route path="/operator/autocollimator-digital" element={<AutocollimatorDigital />} />
        <Route path="/operator/clinometer" element={<Clinometer />} />
        <Route path="/operator/depth-micro-checker" element={<DepthMicroChecker />} />
        <Route path="/operator/inclinometer-analoge" element={<InclinometerAnaloge />} />
        <Route path="/operator/inclinometer-digital" element={<InclinometerDigital />} />
        <Route path="/operator/laser-micrometer" element={<LaserMicrometer />} />
        <Route path="/operator/length-bar" element={<LengthBar />} />
        <Route path="/operator/long-slip" element={<LongSlip />} />
        <Route path="/operator/spirit-level" element={<SpiritLevel />} />
        <Route path="/operator/external-micrometer-analogue" element={<ExternalMicrometerAnalogue />} />
        <Route path="/operator/external-micrometer-digital" element={<ExternalMicrometerDigital />} />
        <Route path="/operator/vernier-depth-gauge" element={<VernierDepthGauge />} />
        <Route path="/operator/electronic-level" element={<ElectronicLevel />} />
        <Route path="/operator/frame-level" element={<FrameLevel />} />
        <Route path="/operator/indexing-table" element={<IndexingTable />} />
        <Route path="/operator/rotary-table" element={<RotaryTable />} />
        <Route path="/operator/vernier-caliper" element={<VernierCaliper />} />

      </Routes>
    </Router>
  );
}

export default App;