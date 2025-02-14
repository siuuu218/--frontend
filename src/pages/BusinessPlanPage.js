import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, Paper, LinearProgress, Snackbar, Alert } from '@mui/material';
import BusinessPlanForm from '../components/BusinessPlanForm';
import BusinessPlanDisplay from '../components/BusinessPlanDisplay';
import { ragService } from '../services/api';

const BusinessPlanPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(0);

  const loadingMessages = [
    '사업계획서를 분석 중입니다...',
    '비슷한 사례를 찾고 있습니다...',
    '맞춤형 방향을 제안하는 중입니다...',
    '최종 사업계획서를 작성하고 있습니다...'
  ];

  // 데스크톱 알림 함수
  const showDesktopNotification = (message) => {
    // 브라우저가 데스크톱 알림을 지원하는지 확인
    if (!('Notification' in window)) return;

    // 알림 권한 요청
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // 알림 옵션 설정
    const options = {
      body: message,
      icon: '/logo.png',
      // 알림 위치를 우하단으로 설정
      dir: 'ltr',
      requireInteraction: false, // 자동으로 사라지게 설정
      silent: false // 알림음 활성화
    };

    // 새로운 알림 생성
    const notification = new Notification('복주머니', options);

    // 알림 클릭 시 해당 페이지로 포커스
    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // 5초 후 자동으로 알림 닫기
    setTimeout(() => notification.close(), 5000);
  };

  // 로딩 메시지 순환
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMessage((prev) => 
          prev < loadingMessages.length - 1 ? prev + 1 : prev
        );
      }, 10000); // 10초마다 메시지 변경
    } else {
      setLoadingMessage(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const response = await ragService.generateBusinessPlan(formData);
      setGeneratedPlan(response.business_plan);
      showDesktopNotification('사업계획서가 생성되었습니다! 확인해보세요.');
    } catch (error) {
      console.error('Error:', error);
      showDesktopNotification('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="main" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {isLoading && (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              my: 2, 
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Box sx={{ width: '100%', mb: 2 }}>
              <LinearProgress />
            </Box>
            <Typography variant="h6" color="primary" gutterBottom>
              {loadingMessages[loadingMessage]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              생성이 완료되면 알림으로 알려드리겠습니다.
            </Typography>
          </Paper>
        )}
        
        {!generatedPlan ? (
          <BusinessPlanForm 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        ) : (
          <BusinessPlanDisplay 
            businessPlan={generatedPlan}
          />
        )}
      </Container>
    </Box>
  );
};

export default BusinessPlanPage; 