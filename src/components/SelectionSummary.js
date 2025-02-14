import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const SelectionSummary = ({ context, currentStep }) => {
    // 각 단계별 제목 매핑
    const stepTitles = {
        1: '대상자 정보',
        2: '문제 해결 방안',
        3: '운영 방식',
        4: '기관 정보',
        5: '목표 설정'
    };

    // 1단계부터 현재 단계까지의 배열 생성
    const steps = Array.from({ length: currentStep }, (_, i) => i + 1);

    return (
        <Box sx={{ 
            width: '40%', 
            p: 3, 
            bgcolor: '#f5f5f5',
            borderRight: '1px solid #e0e0e0',
            height: '100vh',
            overflowY: 'auto'
        }}>
            <Typography variant="h6" gutterBottom>
                
            </Typography>

            {steps.map((step) => (
                <Box key={step} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                        {stepTitles[step]}
                    </Typography>
                    
                    {context[`step${step}`]?.mainSelection?.map((selection) => (
                        <Box key={selection.id} sx={{ 
                            mb: 2, 
                            p: 2, 
                            bgcolor: 'white', 
                            borderRadius: 1,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {selection.label}
                            </Typography>
                            
                            {/* 세부 정보 표시 */}
                            {Object.entries(context[`step${step}`].detailInfo || {}).map(([key, value]) => {
                                if (value && value.length > 0) {
                                    return (
                                        <Typography key={key} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            • {Array.isArray(value) ? value.join(', ') : value}
                                        </Typography>
                                    );
                                }
                                return null;
                            })}
                        </Box>
                    ))}
                    {step < currentStep && <Divider sx={{ my: 2 }} />}
                </Box>
            ))}
        </Box>
    );
};

export default SelectionSummary; 