import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    LinearProgress,
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';

// 실제 사용하는 아이콘만 import
import { Edit } from '@mui/icons-material';
import SelectionSummary from './SelectionSummary';

// steps 정의
const steps = [
    {
        id: 'target',
        question: '서비스의 대상자는 누구인가요?',
        multiSelect: false,
        options: [
            { 
                id: 'elderly', 
                label: '노인', 
                icon: <Edit />, 
                details: {
                    title: '노인 대상자 세부사항',
                    fields: [
                        {
                            id: 'ageGroup',
                            label: '연령대',
                            type: 'multiSelect',
                            options: ['65-75세', '75세 이상', '독거노인']
                        }
                    ]
                }
            },
            { 
                id: 'disabled', 
                label: '장애인', 
                icon: <Edit />,
                details: {
                    title: '장애인 대상자 세부사항',
                    fields: [
                        {
                            id: 'disabilityType',
                            label: '장애 유형',
                            type: 'multiSelect',
                            options: ['발달장애인', '지체장애인', '감각장애인']
                        }
                    ]
                }
            },
            { 
                id: 'children', 
                label: '아동', 
                icon: <Edit />,
                details: {
                    title: '아동 대상자 세부사항',
                    fields: [
                        {
                            id: 'childrenType',
                            label: '아동 유형',
                            type: 'multiSelect',
                            options: ['영유아(0-7세)', '학령기(8-13세)', '청소년(14-19세)', '저소득층', '한부모가정', '조손가정']
                        },
                        {
                            id: 'educationLevel',
                            label: '교육단계',
                            type: 'multiSelect',
                            options: ['미취학', '초등학교', '중학교', '고등학교']
                        }
                    ]
                }
            },
            { 
                id: 'women', 
                label: '여성', 
                icon: <Edit />,
                details: {
                    title: '여성 대상자 세부사항',
                    fields: [
                        {
                            id: 'womenType',
                            label: '여성 유형',
                            type: 'multiSelect',
                            options: ['임산부', '영유아모', '한부모', '결혼이민여성', '취업준비여성', '경력단절여성']
                        },
                        {
                            id: 'ageRange',
                            label: '연령대',
                            type: 'multiSelect',
                            options: ['20대 이하', '30대', '40대', '50대', '60대 이상']
                        }
                    ]
                }
            },
            { 
                id: 'multicultural', 
                label: '다문화', 
                icon: <Edit />,
                details: {
                    title: '다문화 대상자 세부사항',
                    fields: [
                        {
                            id: 'familyType',
                            label: '가족 유형',
                            type: 'multiSelect',
                            options: ['결혼이민자', '다문화가정 자녀', '외국인근로자', '북한이탈주민']
                        },
                        {
                            id: 'nationality',
                            label: '주요 출신국가',
                            type: 'multiSelect',
                            options: ['중국', '베트남', '필리핀', '일본', '기타']
                        },
                        {
                            id: 'supportNeeded',
                            label: '필요 지원',
                            type: 'multiSelect',
                            options: ['한국어교육', '문화적응', '자녀교육', '취업지원', '생활지원']
                        }
                    ]
                }
            }
        ],
        commonDetails: {
            title: '공통 세부사항',
            fields: [
                {
                    id: 'targetCount',
                    label: '예상 인원',
                    type: 'number',
                    placeholder: '숫자만 입력해주세요'
                },
                {
                    id: 'targetArea',
                    label: '대상자 거주지역',
                    type: 'text',
                    placeholder: '예: OO구 OO동 일대'
                }
            ]
        }
    },
    {
        id: 'need',
        question: '어떤 문제를 해결하고 싶으신가요?',
        multiSelect: true,
        options: [
            { id: 'health', label: '건강', icon: <Edit />,
              details: {
                  title: '건강 문제 세부사항',
                  fields: [
                      {
                          id: 'healthIssues',
                          label: '구체적인 건강 문제',
                          type: 'multiSelect',
                          options: ['만성질환', '영양관리', '운동부족', '정신건강', '의료접근성']
                      }
                  ]
              }
            },
            { id: 'social', label: '사회적 고립', icon: <Edit />,
              details: {
                  title: '사회적 고립 세부사항',
                  fields: [
                      {
                          id: 'socialIssues',
                          label: '고립 원인',
                          type: 'multiSelect',
                          options: ['가족관계 단절', '이웃관계 부족', '외출 제한', '의사소통 어려움']
                      }
                  ]
              }
            },
            { id: 'economic', label: '경제적 어려움', icon: <Edit /> },
            { id: 'education', label: '교육', icon: <Edit /> },
            { id: 'care', label: '돌봄', icon: <Edit /> }
        ]
    },
    {
        id: 'method',
        question: '어떤 방식으로 서비스를 제공하실 건가요?',
        multiSelect: true,
        options: [
            { id: 'visit', label: '방문/대면', icon: <Edit />,
              details: {
                  title: '방문/대면 서비스 세부사항',
                  fields: [
                      {
                          id: 'visitType',
                          label: '방문 유형',
                          type: 'multiSelect',
                          options: ['가정방문', '기관방문', '순회방문']
                      },
                      {
                          id: 'visitStaff',
                          label: '방문 인력',
                          type: 'multiSelect',
                          options: ['사회복지사', '간호사', '치료사', '자원봉사자']
                      }
                  ]
              }
            },
            { id: 'group', label: '집단 프로그램', icon: <Edit />,
              details: {
                  title: '집단 프로그램 세부사항',
                  fields: [
                      {
                          id: 'programType',
                          label: '프로그램 유형',
                          type: 'multiSelect',
                          options: ['교육', '치료', '여가', '운동', '문화']
                      }
                  ]
              }
            },
            { id: 'online', label: '비대면/온라인', icon: <Edit /> },
            { id: 'delivery', label: '배달/배송', icon: <Edit /> },
            { id: 'facility', label: '시설 이용', icon: <Edit /> }
        ],
        commonDetails: {
            title: '서비스 제공 공통 세부사항',
            fields: [
                {
                    id: 'serviceFrequency',
                    label: '서비스 제공 주기',
                    type: 'select',
                    options: ['주 1회', '주 2-3회', '월 1-2회', '분기별']
                },
                {
                    id: 'serviceDuration',
                    label: '1회 제공 시간',
                    type: 'select',
                    options: ['1시간 이내', '1-2시간', '2-3시간', '3시간 이상']
                }
            ]
        }
    },
    {
        id: 'resource',
        question: '어떤 기관에 제출하실 건가요?',
        multiSelect: true,
        options: [
            { id: 'government', label: '정부/지자체', icon: <Edit />,
              details: {
                  title: '정부/지자체 지원사업 세부사항',
                  fields: [
                      {
                          id: 'govType',
                          label: '지원 부처/기관',
                          type: 'multiSelect',
                          options: ['보건복지부', '여성가족부', '광역지자체', '기초지자체']
                      },
                      {
                          id: 'govProgram',
                          label: '사업 유형',
                          type: 'multiSelect',
                          options: ['복지사업', '돌봄사업', '일자리사업', '주거환경']
                      }
                  ]
              }
            },
            { id: 'foundation', label: '복지재단', icon: <Edit />,
              details: {
                  title: '복지재단 지원사업 세부사항',
                  fields: [
                      {
                          id: 'foundationType',
                          label: '재단 유형',
                          type: 'multiSelect',
                          options: ['공익재단', '기업재단', '종교재단', '사회복지공동모금회']
                      }
                  ]
              }
            },
            { id: 'corporate', label: '기업', icon: <Edit />,
              details: {
                  title: '기업 지원사업 세부사항',
                  fields: [
                      {
                          id: 'corporateType',
                          label: '기업 분야',
                          type: 'multiSelect',
                          options: ['대기업', '중소기업', '사회적기업', '협동조합']
                      }
                  ]
              }
            }
        ],
        commonDetails: {
            title: '지원사업 공통 세부사항',
            fields: [
                {
                    id: 'organization',
                    label: '지원기관명',
                    type: 'text',
                    placeholder: '지원받을 기관명을 입력해주세요'
                },
                {
                    id: 'projectName',
                    label: '공모사업명',
                    type: 'text',
                    placeholder: '지원사업명을 입력해주세요'
                },
                {
                    id: 'fundingAmount',
                    label: '지원금액',
                    type: 'select',
                    options: ['500만원 이하', '500만원~1000만원', '1000만원~2000만원', '2000만원~3000만원', '3000만원 이상']
                },
                {
                    id: 'projectPeriod',
                    label: '사업기간',
                    type: 'select',
                    options: ['6개월 이하', '6개월~1년', '1년', '1년 이상']
                }
            ]
        }
    },
    {
        id: 'goal',
        question: '어떤 성과를 기대하시나요?',
        multiSelect: true,
        options: [
            { id: 'health_improvement', label: '건강증진', icon: <Edit />,
              details: {
                  title: '건강증진 성과 세부사항',
                  fields: [
                      {
                          id: 'healthGoals',
                          label: '건강 개선 목표',
                          type: 'multiSelect',
                          options: ['신체기능 향상', '영양상태 개선', '정신건강 향상', '만성질환 관리']
                      },
                      {
                          id: 'healthMetrics',
                          label: '측정 방법',
                          type: 'multiSelect',
                          options: ['건강검진 결과', '설문조사', '전문가 평가', '자가진단']
                      }
                  ]
              }
            },
            { id: 'social_connection', label: '관계형성', icon: <Edit />,
              details: {
                  title: '관계형성 성과 세부사항',
                  fields: [
                      {
                          id: 'socialGoals',
                          label: '관계 개선 목표',
                          type: 'multiSelect',
                          options: ['사회활동 참여', '이웃 관계 형성', '가족관계 회복', '지역사회 참여']
                      }
                  ]
              }
            },
            { id: 'independence', label: '자립역량', icon: <Edit />,
              details: {
                  title: '자립역량 성과 세부사항',
                  fields: [
                      {
                          id: 'independenceGoals',
                          label: '자립 목표',
                          type: 'multiSelect',
                          options: ['일상생활 관리', '경제적 자립', '사회활동 참여', '자기결정권 향상']
                      }
                  ]
              }
            }
        ],
        commonDetails: {
            title: '성과 목표 공통 세부사항',
            fields: [
                {
                    id: 'goalDetails',
                    label: '구체적인 성과 목표',
                    type: 'textarea',
                    placeholder: '기대하는 성과에 대해 자유롭게 서술해주세요.\n\n예시:\n- 수량적 목표 (참여율, 만족도 등)\n- 질적 목표 (대상자의 변화, 역량 향상 등)\n- 지역사회 영향 및 지속가능성'
                },
                {
                    id: 'measurementMethod',
                    label: '성과 측정 방법',
                    type: 'multiSelect',
                    options: ['설문조사', '인터뷰', '관찰일지', '전문가 평가', '통계자료']
                }
            ]
        }
    }
];

const BusinessPlanForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        step1: { mainSelection: [], detailInfo: {} },
        step2: { mainSelection: [], detailInfo: {} },
        step3: { mainSelection: [], detailInfo: {} },
        step4: { mainSelection: [], detailInfo: {} },
        step5: { mainSelection: [], detailInfo: {} }
    });

    const handleOptionSelect = (option) => {
        setFormData(prev => ({
            ...prev,
            [`step${currentStep + 1}`]: {
                ...prev[`step${currentStep + 1}`],
                mainSelection: steps[currentStep].multiSelect 
                    ? prev[`step${currentStep + 1}`].mainSelection.find(item => item.id === option.id)
                        ? prev[`step${currentStep + 1}`].mainSelection.filter(item => item.id !== option.id)
                        : [...prev[`step${currentStep + 1}`].mainSelection, option]
                    : [option]
            }
        }));
    };

    const handleDetailChange = (field, value) => {
        if (field.type === 'multiSelect') {
            setFormData(prev => {
                // 현재 값이 배열이 아니면 빈 배열로 초기화
                const currentValues = Array.isArray(prev[`step${currentStep + 1}`].detailInfo[field.id]) 
                    ? prev[`step${currentStep + 1}`].detailInfo[field.id] 
                    : [];
                
                let newValues;
                if (currentValues.includes(value)) {
                    // 이미 선택된 값이면 제거
                    newValues = currentValues.filter(item => item !== value);
                } else {
                    // 선택되지 않은 값이면 추가
                    newValues = [...currentValues, value];
                }

                return {
                    ...prev,
                    [`step${currentStep + 1}`]: {
                        ...prev[`step${currentStep + 1}`],
                        detailInfo: {
                            ...prev[`step${currentStep + 1}`].detailInfo,
                            [field.id]: newValues
                        }
                    }
                };
            });
        } else {
            // 기존 단일 값 입력 로직
            setFormData(prev => ({
                ...prev,
                [`step${currentStep + 1}`]: {
                    ...prev[`step${currentStep + 1}`],
                    detailInfo: {
                        ...prev[`step${currentStep + 1}`].detailInfo,
                        [field.id]: value
                    }
                }
            }));
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // 마지막 스텝에서 제출할 때
            try {
                // formData를 깊은 복사하여 전달
                const context = JSON.parse(JSON.stringify(formData));
                
                // replace: true 옵션을 추가하여 히스토리 스택 관리
                navigate('/generate-plan', { 
                    replace: true,
                    state: { context }
                });
            } catch (error) {
                console.error('Navigation error:', error);
                // 에러 처리 로직 추가 가능
            }
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'multiSelect':
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            {field.label}
                        </Typography>
                        <FormGroup>
                            {field.options.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    control={
                                        <Checkbox
                                            checked={
                                                Array.isArray(formData[`step${currentStep + 1}`].detailInfo[field.id]) && 
                                                formData[`step${currentStep + 1}`].detailInfo[field.id]?.includes(option)
                                            }
                                            onChange={() => handleDetailChange(field, option)}
                                        />
                                    }
                                    label={option}
                                    sx={{ 
                                        display: 'block',
                                        my: 0.5,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                );

            case 'text':
            case 'number':
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            {field.label}
                        </Typography>
                        <TextField
                            fullWidth
                            type={field.type}
                            value={formData[`step${currentStep + 1}`].detailInfo[field.id] || ''}
                            onChange={(e) => handleDetailChange(field, e.target.value)}
                            placeholder={field.placeholder}
                            variant="outlined"
                        />
                    </Box>
                );

            case 'select':
                return (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            {field.label}
                        </Typography>
                        {field.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {field.description}
                            </Typography>
                        )}
                        <Select
                            fullWidth
                            value={formData[`step${currentStep + 1}`].detailInfo[field.id] || ''}
                            onChange={(e) => handleDetailChange(field, e.target.value)}
                        >
                            {field.options.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SelectionSummary 
                context={formData}           // 전체 formData 전달
                currentStep={currentStep + 1} // 현재 단계 전달
            />
            
            <Box sx={{ 
                width: '60%',
                p: 4,
                bgcolor: 'white'
            }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" gutterBottom>
                        단계 {currentStep + 1} / {steps.length}
                    </Typography>
                    <LinearProgress 
                        variant="determinate" 
                        value={(currentStep / (steps.length - 1)) * 100} 
                    />
                </Box>

                {steps[currentStep] && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            {steps[currentStep].question}
                        </Typography>
                        
                        <Box sx={{ mt: 2 }}>
                            {steps[currentStep].options.map((option) => (
                                <Button
                                    key={option.id}
                                    startIcon={option.icon}
                                    onClick={() => handleOptionSelect(option)}
                                    variant={formData[`step${currentStep + 1}`].mainSelection.find(item => item.id === option.id) ? "contained" : "outlined"}
                                    sx={{ mr: 1, mb: 1 }}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </Box>

                        {formData[`step${currentStep + 1}`].mainSelection.length > 0 && (
                            <Box sx={{ mt: 3 }}>
                                {formData[`step${currentStep + 1}`].mainSelection.map(option => (
                                    <Box key={option.id} sx={{ mb: 4 }}>
                                        {option.details?.fields.map(field => (
                                            <Box key={field.id} sx={{ mb: 2 }}>
                                                {renderField(field)}
                                            </Box>
                                        ))}
                                    </Box>
                                ))}
                                
                                {steps[currentStep].commonDetails && (
                                    <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
                                        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                                            {steps[currentStep].commonDetails.title}
                                        </Typography>
                                        {steps[currentStep].commonDetails.fields.map(field => (
                                            <Box key={field.id} sx={{ mb: 2 }}>
                                                {renderField(field)}
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        )}

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={handlePrevStep} disabled={currentStep === 0}>
                                이전
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={formData[`step${currentStep + 1}`].mainSelection.length === 0}
                            >
                                {currentStep === steps.length - 1 ? '사업계획서 생성' : '다음'}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default BusinessPlanForm; 