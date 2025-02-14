import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Divider
} from '@mui/material';
import { ExpandMore, Description } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ResponsePaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: '20px auto',
    maxWidth: 800,
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
}));

const SimilarCaseBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    '& + &': {
        marginTop: theme.spacing(2)
    }
}));

const ResponseDisplay = ({ response }) => {
    if (!response) return null;

    const { answer, similar_cases } = response;

    return (
        <ResponsePaper elevation={3}>
            {/* 메인 답변 */}
            <Typography variant="body1" component="div" 
                sx={{ 
                    whiteSpace: 'pre-line',
                    lineHeight: 1.8,
                    marginBottom: 3
                }}>
                {answer}
            </Typography>

            {/* 유사 사례 섹션 */}
            <Divider sx={{ my: 2 }} />
            
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ backgroundColor: '#f8f9fa' }}
                >
                    <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Description sx={{ mr: 1 }} />
                        참고한 유사 사례
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {similar_cases?.map((item, index) => (
                        <SimilarCaseBox key={index}>
                            <Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
                                {item.source && (
                                    <Chip 
                                        label={`출처: ${item.source.split('/').pop()}`}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                )}
                                {item.page && (
                                    <Chip 
                                        label={`페이지: ${item.page}`}
                                        size="small"
                                        variant="outlined"
                                    />
                                )}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {item.content}
                            </Typography>
                        </SimilarCaseBox>
                    ))}
                </AccordionDetails>
            </Accordion>
        </ResponsePaper>
    );
};

export default ResponseDisplay; 