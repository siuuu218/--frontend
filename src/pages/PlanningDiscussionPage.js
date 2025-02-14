import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Container,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

const ChatContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 140px)',
    padding: theme.spacing(2)
}));

const MessagesBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
}));

const MessageBubble = styled(Paper)(({ theme, isAi }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxWidth: '80%',
    alignSelf: isAi ? 'flex-start' : 'flex-end',
    backgroundColor: isAi ? '#f5f5f5' : theme.palette.primary.main,
    color: isAi ? 'inherit' : '#fff'
}));

const PlanningDiscussionPage = () => {
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const context = location.state?.context || {};

    useEffect(() => {
        // 초기 메시지 설정
        const initialMessage = {
            text: `지금까지 입력하신 내용을 바탕으로 기획에 대해 논의해보겠습니다. 
                  어떤 부분에 대해 더 자세히 이야기 나누고 싶으신가요?`,
            isAi: true
        };
        setMessages([initialMessage]);
    }, []);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const userMessage = {
            text: newMessage,
            isAi: false
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setIsLoading(true);

        try {
            // AI 응답 로직 구현 필요
            const aiResponse = {
                text: "AI 응답이 여기에 들어갑니다.",
                isAi: true
            };
            
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error getting AI response:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <ChatContainer>
                <Typography variant="h5" gutterBottom>
                    기획 내용 논의하기
                </Typography>
                
                <MessagesBox>
                    {messages.map((message, index) => (
                        <MessageBubble key={index} isAi={message.isAi}>
                            <Typography>{message.text}</Typography>
                        </MessageBubble>
                    ))}
                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    )}
                </MessagesBox>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="메시지를 입력하세요..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        endIcon={<SendIcon />}
                    >
                        전송
                    </Button>
                </Box>
            </ChatContainer>
        </Container>
    );
};

export default PlanningDiscussionPage; 