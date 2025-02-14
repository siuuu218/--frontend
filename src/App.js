import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import BusinessPlanPage from './pages/BusinessPlanPage';
import PlanningDiscussionPage from './pages/PlanningDiscussionPage';
import GeneratePlanPage from './pages/GeneratePlanPage';
import BusinessPlanForm from './components/BusinessPlanForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/business-plan" element={<BusinessPlanPage />} />
            <Route path="/planning-discussion" element={<PlanningDiscussionPage />} />
            <Route path="/business-plan-form" element={<BusinessPlanForm />} />
            <Route path="/generate-plan" element={<GeneratePlanPage />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
