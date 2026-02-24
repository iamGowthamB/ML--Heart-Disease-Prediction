import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import MedicalIllustration from '../assets/react.svg'; // placeholder, replace with medical graphic if available

const Hero = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" fontWeight={800} gutterBottom sx={{ color: '#0F172A' }}>
            Heart Disease Risk Assessment System
        </Typography>
        <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 680, mx: 'auto', mb: 4, lineHeight: 1.5 }}
        >
            Estimate the probability of coronary artery disease based on clinical metrics and vitals. This tool is intended
            for educational use and is not a replacement for professional medical evaluation.
        </Typography>
        <Box component="img" src={MedicalIllustration} alt="" aria-hidden="true" sx={{ width: 220, opacity: 0.6 }} />
    </Box>
);

export default Hero;
