import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const features = [
  {
    icon: <AutoGraphIcon />,
    title: '복지 분야 특화 AI',
    description: '복지 사업의 특성을 이해하는 AI가 현장의 니즈를 반영한 맞춤형 제안을 제공합니다.'
  },
  {
    icon: <AccessTimeIcon />,
    title: '실무자 시간 절약',
    description: '행정 업무는 줄이고 본연의 복지 서비스에 더 집중할 수 있습니다.'
  },
  {
    icon: <TrendingUpIcon />,
    title: '높은 선정률',
    description: '복지 분야 전문가들의 인사이트를 학습한 AI가 설득력 있는 제안서 작성을 도와드립니다.'
  }
];

const FeatureSection = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          sx={{ mb: 8, fontWeight: 700 }}
        >
          주요 기능
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection; 