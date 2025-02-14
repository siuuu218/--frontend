import React, { useState } from 'react';
import { 
    Paper, 
    InputBase, 
    IconButton, 
    Box,
    CircularProgress
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const InputWrapper = styled(Paper)(({ theme }) => ({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    margin: '20px auto',
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    borderRadius: '12px'
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    flex: 1,
    '& .MuiInputBase-input': {
        padding: '10px 12px',
    }
}));

const QueryInput = ({ onSubmit, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && !isLoading) {
            onSubmit(query);
            setQuery('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <InputWrapper>
                <StyledInput
                    placeholder="사업계획서에 대해 궁금한 점을 물어보세요..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                />
                <IconButton 
                    type="submit" 
                    disabled={!query.trim() || isLoading}
                    sx={{ 
                        p: '10px',
                        color: query.trim() ? 'primary.main' : 'grey.400',
                        '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                    }}
                >
                    {isLoading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Send />
                    )}
                </IconButton>
            </InputWrapper>
        </Box>
    );
};

export default QueryInput; 