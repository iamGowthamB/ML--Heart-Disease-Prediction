import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Fade, Typography, Grid, CircularProgress } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import { analyzeHeartRisk } from './api';

function App() {
  const [result, setResult] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async (data) => {
    setLoading(true);
    setPatientData(data); // Store input data for the report
    try {
      await new Promise(r => setTimeout(r, 1500)); // Simulate processing
      const response = await analyzeHeartRisk(data);
      setResult(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setPatientData(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="60vh" gap={2}>
            <CircularProgress size={60} color="primary" />
            <Typography variant="h5" color="secondary" gutterBottom fontWeight={600}>
              Analyzing Clinical Metrics...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Processing Random Forest Classification Model
            </Typography>
          </Box>
        ) : !result ? (
          <Fade in={!result}>
            <>
              <Hero />
              <Grid container spacing={6}>
                <Grid item xs={12} md={7} lg={8}>
                  <PredictionForm onSubmit={handleAnalysis} isLoading={loading} />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                  {/* Side panel: tips, graphic, or company info */}
                  <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: '0 4px 10px -2px rgba(0,0,0,0.1)' }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>How to Use</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      - Provide accurate patient demographics and vitals.<br />
                      - Click <strong>Get Result</strong> to see risk score.<br />
                      - Download a PDF report or reset to enter new data.
                    </Typography>
                    <Box component="img" src={MedicalIllustration} alt="Illustration" sx={{ width: '100%', mt: 2 }} />
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2, textAlign: 'center' }}>
                      &copy; 2026 Heart Disease Risk Assessment System
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          </Fade>
        ) : (
          <ResultCard result={result} patientData={patientData} onReset={handleReset} />
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
