import axios from 'axios';

// 환경변수에서 API URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,  // localhost 대신 환경변수 사용
    headers: {
        'Content-Type': 'application/json',
    }
});

export const ragService = {
    generateBusinessPlan: async (context) => {
        try {
            // 데이터 구조 변환
            const requestData = {
                step1: {
                    mainSelection: context.step1?.mainSelection || [],
                    detailInfo: context.step1?.detailInfo || {}
                },
                step2: {
                    mainSelection: context.step2?.mainSelection || [],
                    detailInfo: context.step2?.detailInfo || {}
                },
                step3: {
                    mainSelection: context.step3?.mainSelection || [],
                    detailInfo: context.step3?.detailInfo || {}
                },
                step4: {
                    mainSelection: context.step4?.mainSelection || [],
                    detailInfo: {
                        projectName: context.step4?.detailInfo?.projectName || '',
                        projectPeriod: context.step4?.detailInfo?.projectPeriod || '',
                        ...context.step4?.detailInfo
                    }
                },
                step5: {
                    mainSelection: context.step5?.mainSelection || [],
                    detailInfo: context.step5?.detailInfo || {}
                }
            };

            // 필수 필드 검증
            if (!requestData.step4.detailInfo.projectName || 
                !requestData.step4.detailInfo.projectPeriod) {
                throw new Error('필수 데이터(사업명, 사업기간)가 누락되었습니다.');
            }

            console.log('Request data:', requestData);
            const response = await api.post('/api/v1/business-plan/generate', requestData);
            return response.data;
        } catch (error) {
            console.error('Error in generateBusinessPlan:', error);
            throw error;
        }
    },

    getStats: async () => {
        try {
            const response = await api.get('/rag/stats');
            return response.data;
        } catch (error) {
            console.error('Error getting stats:', error.response?.data || error.message);
            throw error;
        }
    },

    // 채팅 메시지 전송
    sendChatMessage: async ({ message, chat_history = [], context = {} }) => {
        try {
            const response = await api.post('/api/v1/business-plan/chat', {
                message,
                chat_history,
                context
            });
            return response.data;
        } catch (error) {
            console.error('Chat API Error:', error);
            throw error;
        }
    }
}; 