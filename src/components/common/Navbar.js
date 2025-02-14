import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(20px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
}));

const NavButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  textTransform: 'none',
  fontSize: '1rem',
  color: '#1a1a1a',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: theme.palette.primary.main
  }
}));

// 임시 로고 텍스트 스타일
const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  textDecoration: 'none'
}));

const Logo = styled('img')({
  height: 36
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { title: '기능', path: '/features' },
    { title: '요금제', path: '/pricing' },
    { title: '소개', path: '/about' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 모바일 메뉴 드로어
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.title} 
            component={RouterLink} 
            to={item.path}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
          >
            로그인
          </Button>
        </ListItem>
        <ListItem>
          <Button
            component={RouterLink}
            to="/business-plan"
            variant="contained"
            fullWidth
          >
            시작하기
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* 로고 부분 수정 */}
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <LogoText>
              복주머니
            </LogoText>
          </RouterLink>
          
          <Box sx={{ flexGrow: 1 }} />

          {/* 반응형 네비게이션 */}
          {isMobile ? (
            <>
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                  sx: {
                    width: 240,
                    backgroundColor: '#fff'
                  }
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            // 데스크톱 메뉴
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <NavButton
                  key={item.title}
                  component={RouterLink}
                  to={item.path}
                >
                  {item.title}
                </NavButton>
              ))}
              <NavButton
                component={RouterLink}
                to="/login"
                sx={{ 
                  ml: 2,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.primary.main
                  }
                }}
              >
                로그인
              </NavButton>
              <NavButton
                component={RouterLink}
                to="/business-plan"
                variant="contained"
                sx={{
                  ml: 2,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                시작하기
              </NavButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar; 