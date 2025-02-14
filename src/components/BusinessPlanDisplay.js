import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    Button,
    Stack,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    LinearProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import {
    ContentCopy,
    SaveAlt,
    Edit,
    ExpandMore,
    CheckCircleOutline
} from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { 
    Document, 
    Paragraph, 
    TextRun, 
    Packer
} from 'docx';

const BusinessPlanDisplay = ({ businessPlan }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        if (businessPlan?.content) {
            setEditedContent(businessPlan.content);
        }
    }, [businessPlan]);

    // businessPlan prop의 유효성 검사 추가
    const content = businessPlan?.content || '';

    // 클립보드 복사 기능
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(businessPlan.content);
            setSnackbar({
                open: true,
                message: '클립보드에 복사되었습니다.',
                severity: 'success'
            });
        } catch (err) {
            setSnackbar({
                open: true,
                message: '복사 중 오류가 발생했습니다.',
                severity: 'error'
            });
        }
    };

    // 텍스트 파일 저장
    const handleSaveText = () => {
        if (!content) return;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, '사업계획서.txt');
    };

    // Word 파일 저장
    const handleSaveWord = () => {
        if (!content) return;
        const doc = new Document({
            sections: [{
                properties: {},
                children: content.split('\n').map(paragraph => 
                    new Paragraph({
                        children: [new TextRun({ text: paragraph })]
                    })
                )
            }]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, '사업계획서.docx');
        });
    };

    return (
        <Box sx={{ 
            maxWidth: '400px', 
            margin: '0 auto', 
            p: 2,
            textAlign: 'center' 
        }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    my: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                {/* 완료 아이콘 */}
                <Box 
                    sx={{ 
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                    }}
                >
                    <CheckCircleOutline sx={{ color: 'white', fontSize: 30 }} />
                </Box>

                {/* 제목 */}
                <Typography variant="h5" component="h2" gutterBottom>
                    사업계획서
                </Typography>

                {/* 상태 텍스트 */}
                <Typography 
                    variant="body1" 
                    color="primary"
                    sx={{ mb: 3 }}
                >
                    완성됨
                </Typography>

                {/* 버튼 그룹 */}
                <Stack 
                    spacing={2} 
                    sx={{ 
                        width: '100%'
                    }}
                >
                    <Button
                        fullWidth
                        startIcon={<SaveAlt />}
                        onClick={handleSaveText}
                        variant="outlined"
                        sx={{
                            py: 1.5,
                            backgroundColor: 'background.paper'
                        }}
                    >
                        텍스트 저장
                    </Button>
                    <Button
                        fullWidth
                        startIcon={<SaveAlt />}
                        onClick={handleSaveWord}
                        variant="outlined"
                        sx={{
                            py: 1.5,
                            backgroundColor: 'background.paper'
                        }}
                    >
                        Word 저장
                    </Button>
                </Stack>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BusinessPlanDisplay; 