import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Paper,
    CircularProgress,
    LinearProgress
} from '@mui/material';
import BusinessPlanDisplay from '../components/BusinessPlanDisplay';
import { ragService } from '../services/api';

const GeneratePlanPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [error, setError] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(0);
    const requestSentRef = useRef(false);

    useEffect(() => {
        const generatePlan = async () => {
            if (requestSentRef.current || generatedPlan) {
                return;
            }

            try {
                if (!location?.state?.context) {
                    navigate('/business-plan-form', { 
                        replace: true,
                        state: {}
                    });
                    return;
                }

                setIsGenerating(true);
                requestSentRef.current = true;

                console.log('Generating plan with context:', location.state.context);
                const response = await ragService.generateBusinessPlan(location.state.context);
                setGeneratedPlan({
                    content: response.business_plan.content
                });

            } catch (error) {
                console.error('Error details:', error);
                setError(error.message || '사업계획서 생성 중 오류가 발생했습니다.');
            } finally {
                setIsGenerating(false);
            }
        };

        if (!generatedPlan && !isGenerating) {
            generatePlan();
        }

        return () => {
            requestSentRef.current = false;
        };
    }, [location, navigate]);

    const loadingMessages = [
        '사업계획서를 분석 중입니다...',
        '비슷한 사례를 찾고 있습니다...',
        '맞춤형 방향을 제안하는 중입니다...',
        '최종 사업계획서를 작성하고 있습니다...'
    ];

    useEffect(() => {
        console.log('Received context:', location.state?.context);

        let interval;
        if (isGenerating) {
            interval = setInterval(() => {
                setLoadingMessage((prev) => 
                    prev < loadingMessages.length - 1 ? prev + 1 : prev
                );
            }, 10000);
        }
        return () => clearInterval(interval);
    }, [isGenerating]);

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    <Typography color="error">
                        오류가 발생했습니다: {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (isGenerating) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ 
                    minHeight: 'calc(100vh - 140px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 4
                }}>
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                        <CircularProgress sx={{ mb: 3 }} />
                        <Box sx={{ width: '100%', mb: 2 }}>
                            <LinearProgress />
                        </Box>
                        <Typography variant="h6" color="primary" gutterBottom>
                            {loadingMessages[loadingMessage]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            잠시만 기다려주세요...
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                {generatedPlan ? (
                    <BusinessPlanDisplay businessPlan={generatedPlan} />
                ) : (
                    <Typography color="error">
                        사업계획서 생성 중 오류가 발생했습니다.
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default GeneratePlanPage; 