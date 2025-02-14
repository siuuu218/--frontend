import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Paper
} from '@mui/material';
import { Description, Chat } from '@mui/icons-material';

const FinalStep = ({ context, onGeneratePlan, onStartDiscussion }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePlan = async () => {
        setIsLoading(true);
        try {
            await onGeneratePlan(context);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartDiscussion = async () => {
        setIsLoading(true);
        try {
            await onStartDiscussion(context);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    입력하신 정보 확인
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {context.summary}
                </Typography>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    startIcon={<Description />}
                    onClick={handleGeneratePlan}
                    disabled={isLoading}
                >
                    사업계획서 바로 생성하기
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<Chat />}
                    onClick={handleStartDiscussion}
                    disabled={isLoading}
                >
                    기획 내용 더 논의하기
                </Button>
            </Box>

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default FinalStep; 