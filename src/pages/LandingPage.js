import { Box } from '@mui/material';
import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import CTASection from '../components/landing/CTASection';

const LandingPage = () => {
  return (
    <Box component="main" sx={{ 
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage; 