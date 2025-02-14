import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const HeroWrapper = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  background: 'linear-gradient(45deg, #f3f4f6 30%, #ffffff 90%)',
  display: 'flex',
  alignItems: 'center'
}));

const HeroContent = styled(Box)(({ theme }) => ({
  width: '100%'
}));

const HeroImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  right: -100,
  top: '50%',
  transform: 'translateY(-50%)',
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <HeroContent>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2
                }}
              >
                복지사를 위한<br />
                AI 사업기획 플랫폼
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ mb: 4 }}
              >
                머리 아픈 사업기획은 복주머니에게,<br />
                복지사는 서비스에 집중하세요.<br />
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/business-plan')}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem'
                }}
              >
                무료로 시작하기
              </Button>
            </HeroContent>
          </Grid>
        </Grid>
      </Container>
    </HeroWrapper>
  );
};

export default HeroSection; 