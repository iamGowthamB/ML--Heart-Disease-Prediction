import React, { useRef } from 'react';
import { Paper, Box, Typography, Button, Grid, Divider, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack, Print, Download, CheckCircle, ErrorOutline, WarningAmber } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResultCard = ({ result, patientData, onReset }) => {
    const reportRef = useRef(null);

    if (!result) return null;

    const isHighRisk = result.risk_level === 'High';
    const percentage = (result.probability * 100).toFixed(1);
    const color = isHighRisk ? '#EF4444' : '#10B981';
    const bgColor = isHighRisk ? '#FEF2F2' : '#EFFDF5';

    const generatePDF = async () => {
        const element = reportRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`HeartDiseaseRisk_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (err) {
            console.error("PDF Generation failed", err);
        }
    };

    // Smart Clinical Observations
    const observations = [];
    if (patientData) {
        if (patientData.chol > 200) observations.push({ label: "High Cholesterol", val: `${patientData.chol} mg/dl`, severity: "warning" });
        if (patientData.trestbps > 130) observations.push({ label: "Elevated BP", val: `${patientData.trestbps} mm Hg`, severity: "warning" });
        if (patientData.fbs === 1) observations.push({ label: "High Fasting Sugar", val: "> 120 mg/dl", severity: "error" });
        if (patientData.age > 60) observations.push({ label: "Age Risk Factor", val: `${patientData.age} yrs`, severity: "info" });
        if (patientData.oldpeak > 1.5) observations.push({ label: "Significant ST Depression", val: `${patientData.oldpeak}`, severity: "error" });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
                <Button startIcon={<ArrowBack />} onClick={onReset} sx={{ color: 'text.secondary' }}>Back to Assessment</Button>
                <Box>
                    <Button variant="outlined" startIcon={<Download />} onClick={generatePDF}>Download PDF</Button>
                </Box>
            </Box>

            <Paper
                ref={reportRef}
                elevation={3}
                sx={{
                    borderRadius: 0,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 0,
                    position: 'relative' // For PDF capture
                }}
            >
                {/* Header */}
                <Box sx={{ p: 5, bgcolor: bgColor, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box
                        sx={{
                            width: 90, height: 90,
                            borderRadius: '50%', bgcolor: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}
                    >
                        {isHighRisk
                            ? <ErrorOutline sx={{ fontSize: 50, color: '#DC2626' }} />
                            : <CheckCircle sx={{ fontSize: 50, color: '#059669' }} />
                        }
                    </Box>
                    <Box flexGrow={1}>
                        <Typography variant="overline" color="text.secondary" fontWeight={700} letterSpacing={1.2}>
                            CLINICAL DECISION SUPPORT SYSTEM
                        </Typography>
                        <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ my: 0.5 }}>
                            {isHighRisk ? "High Risk Detected" : "Low Risk Profile"}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Patient ID: HD-{Math.floor(Math.random() * 100000)} • Date: {new Date().toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Chip
                        label="CONFIDENTIAL"
                        variant="outlined"
                        size="small"
                        sx={{ color: 'text.disabled', borderColor: 'divider', letterSpacing: 1 }}
                    />
                </Box>

                {/* Content */}
                <Box sx={{ p: 5 }}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={7}>

                            <Box mb={4}>
                                <Typography variant="h6" gutterBottom fontWeight={700}>Primary Analysis</Typography>
                                <Box sx={{ p: 3, bgcolor: '#FAFAFA', borderRadius: 2, borderLeft: '4px solid', borderColor: color }}>
                                    <Typography paragraph color="text.primary" sx={{ mb: 1, fontWeight: 500 }}>
                                        Model Confidence: {percentage}%
                                    </Typography>
                                    {/* risk meter */}
                                    <Box sx={{ mt: 1, mb: 2 }}>
                                        <Box sx={{ position: 'relative', height: 10, bgcolor: '#E5E7EB', borderRadius: 5, overflow: 'hidden' }}>
                                            <Box
                                                component={motion.div}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1.2 }}
                                                sx={{ height: '100%', bgcolor: color }}
                                            />
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {isHighRisk
                                            ? "The automated analysis indicates a high probability of coronary artery disease. Several key biomarkers exceed standard clinical thresholds."
                                            : "The automated analysis indicates a low probability of coronary artery disease. Patient biomarkers are largely within normal physiological ranges."
                                        }
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography variant="h6" gutterBottom fontWeight={700}>Clinical Observations</Typography>
                            {observations.length > 0 ? (
                                <TableContainer component={Paper} elevation={0} variant="outlined">
                                    <Table size="small">
                                        <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                                            <TableRow>
                                                <TableCell>Marker</TableCell>
                                                <TableCell>Value</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {observations.map((obs, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell component="th" scope="row">{obs.label}</TableCell>
                                                    <TableCell>{obs.val}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            icon={<WarningAmber style={{ fontSize: 16 }} />}
                                                            label="Attention"
                                                            size="small"
                                                            color={obs.severity}
                                                            variant="outlined"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                    No specific anomalies detected in the provided vitals.
                                </Typography>
                            )}

                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Box sx={{ p: 0 }}>
                                <Typography variant="h6" gutterBottom fontWeight={700}>Patient Vitals</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Grid container spacing={2}>
                                    {patientData && Object.entries({
                                        'Age': `${patientData.age} yrs`,
                                        'Weight': 'N/A', // Placeholder
                                        'Start BMI': patientData.bmi,
                                        'BP': `${patientData.trestbps} / 80`
                                    }).map(([key, val]) => (
                                        <Grid item xs={6} key={key}>
                                            <Typography variant="caption" color="text.secondary" display="block">{key}</Typography>
                                            <Typography variant="body1" fontWeight={600}>{val}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box mt={4} p={3} bgcolor="#FFFBEB" borderRadius={2} border="1px solid #FEF3C7">
                                    <Typography variant="subtitle2" fontWeight={700} color="#B45309" gutterBottom>
                                        AI DISCLAIMER
                                    </Typography>
                                    <Typography variant="caption" color="#92400E" sx={{ lineHeight: 1.4, display: 'block' }}>
                                        This report is generated by a Machine Learning model (Random Forest) and is intended for research/screening aid only. It does not replace professional medical diagnosis.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="text.disabled">
                            Generated by Heart Disease Risk Assessment System • {new Date().toISOString()}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                            Page 1 of 1
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default ResultCard;
