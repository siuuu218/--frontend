import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CTAWrapper = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
  color: '#fff',
  padding: theme.spacing(10, 0)
}));

const CTAContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  color: '#fff'
}));

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <CTAWrapper>
      <Container maxWidth="md">
        <CTAContent>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 3, 
              fontWeight: 700,
              color: 'inherit'
            }}
          >
            지금 바로 시작하세요
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            AI의 도움으로 더 쉽고 빠르게<br />
            전문적인 사업계획서를 작성해보세요
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/business-plan')}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.1rem',
              backgroundColor: '#fff',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            무료로 시작하기
          </Button>
        </CTAContent>
      </Container>
    </CTAWrapper>
  );
};

export default CTASection; 