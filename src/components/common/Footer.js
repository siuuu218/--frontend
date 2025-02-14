import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  padding: theme.spacing(8, 0),
  marginTop: 'auto'
}));

const FooterLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
});

const Footer = () => {
  const footerSections = [
    {
      title: '서비스',
      links: [
        { name: '기능 소개', path: '/features' },
        { name: '요금제', path: '/pricing' },
        { name: '사용 가이드', path: '/guide' }
      ]
    },
    {
      title: '회사',
      links: [
        { name: '소개', path: '/about' },
        { name: '블로그', path: '/blog' },
        { name: '문의하기', path: '/contact' }
      ]
    },
    {
      title: '고객지원',
      links: [
        { name: '이용약관', path: '/terms' },
        { name: '개인정보처리방침', path: '/privacy' },
        { name: '자주 묻는 질문', path: '/faq' }
      ]
    }
  ];

  return (
    <FooterWrapper component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              AI 기술로 더 나은 사업계획서를 만듭니다.
              누구나 쉽게 전문적인 사업계획서를 작성할 수 있도록 도와드립니다.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <FooterLink
                      component={RouterLink}
                      to={link.path}
                      variant="body2"
                      color="text.secondary"
                    >
                      {link.name}
                    </FooterLink>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ 
          mt: 8, 
          pt: 4, 
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} AI Business Plan. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 