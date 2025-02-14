import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
    IconButton
} from '@mui/material';
import { Send, Description } from '@mui/icons-material';

const PlanningDiscussion = ({ context, onGeneratePlan }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        setIsLoading(true);
        try {
            // 메시지 추가
            const newMessage = { role: 'user', content: input };
            setMessages(prev => [...prev, newMessage]);
            setInput('');

            // AI 응답 요청
            const response = await ragService.discussPlanning({
                context,
                messages: [...messages, newMessage]
            });

            // AI 응답 추가
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: response.data 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {messages.map((msg, idx) => (
                    <Paper 
                        key={idx}
                        sx={{ 
                            p: 2, 
                            mb: 2,
                            ml: msg.role === 'assistant' ? 0 : 'auto',
                            mr: msg.role === 'assistant' ? 'auto' : 0,
                            maxWidth: '80%'
                        }}
                    >
                        <Typography>{msg.content}</Typography>
                    </Paper>
                ))}
            </Box>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="기획에 대해 질문하거나 의견을 나눠보세요"
                        disabled={isLoading}
                    />
                    <IconButton 
                        onClick={handleSend}
                        disabled={isLoading}
                    >
                        <Send />
                    </IconButton>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Description />}
                    onClick={() => onGeneratePlan(context, messages)}
                    sx={{ mt: 2 }}
                >
                    지금까지 논의 내용으로 사업계획서 생성하기
                </Button>
            </Box>
        </Box>
    );
};

export default PlanningDiscussion; 