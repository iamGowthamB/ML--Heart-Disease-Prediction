import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => (
    <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: '1px solid #E2E8F0', bgcolor: 'white' }}>
        <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                © 2026 Heart Disease Risk Assessment System
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                This tool is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </Typography>
        </Container>
    </Box>
);

export default Footer;
