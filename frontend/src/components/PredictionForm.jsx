import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Card, CardContent, Grid, TextField, MenuItem, Button,
    Typography, Slider, Checkbox, Box, CircularProgress,
    Stepper, Step, StepLabel, ToggleButton, ToggleButtonGroup,
    Tooltip, IconButton, Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowForward, ArrowBack, InfoOutlined,
    CheckCircleOutline, SettingsAccessibility
} from '@mui/icons-material';

const steps = ['Basic Info', 'Health Vitals', 'Heart Condition'];

const InfoLabel = ({ label, tooltip }) => (
    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
        <Typography fontWeight={500} color="text.primary">{label}</Typography>
        <Tooltip title={tooltip} arrow placement="top">
            <IconButton size="small" sx={{ p: 0.5, color: 'text.secondary' }}>
                <InfoOutlined fontSize="small" />
            </IconButton>
        </Tooltip>
    </Box>
);

const PredictionForm = ({ onSubmit, isLoading }) => {
    const [activeStep, setActiveStep] = useState(0);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            age: 50, sex: 1, cp: 0, trestbps: 120, chol: 200,
            fbs: false, restecg: 0, thalach: 150, exang: 0,
            oldpeak: 0, slope: 1, ca: 0, thal: 2,
            bmi: 25, smoker: 0, famhist: 0
        }
    });

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const onSubmitHandler = (data) => {
        // Format data for API
        const formattedData = {
            ...data,
            fbs: data.fbs ? 1 : 0,
            oldpeak: parseFloat(data.oldpeak),
            sex: parseInt(data.sex),
            cp: parseInt(data.cp),
            exang: parseInt(data.exang),
            slope: parseInt(data.slope),
            ca: parseInt(data.ca),
            thal: parseInt(data.thal),
            smoker: parseInt(data.smoker),
            famhist: parseInt(data.famhist),
            restecg: 0
        };
        onSubmit(formattedData);
    };

    const formContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Alert severity="info" icon={false} sx={{ mb: 2 }}>
                                Please answer the following questions to help us assess your risk profile.
                            </Alert>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoLabel label="How old are you?" tooltip="Age in years" />
                            <Controller
                                name="age"
                                control={control}
                                rules={{ required: 'Age is required', min: { value: 1, message: 'Enter a valid age' } }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        fullWidth
                                        placeholder="e.g. 45"
                                        error={!!errors.age}
                                        helperText={errors.age?.message}
                                        inputProps={{ 'aria-label': 'Age in years' }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoLabel label="Biological Sex" tooltip="Sex assigned at birth is used for risk calibration" />
                            <Controller
                                name="sex"
                                control={control}
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={field.value}
                                        exclusive
                                        onChange={(e, val) => val !== null && field.onChange(val)}
                                        fullWidth
                                    >
                                        <ToggleButton value={1}>Male</ToggleButton>
                                        <ToggleButton value={0}>Female</ToggleButton>
                                    </ToggleButtonGroup>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}><Typography variant="subtitle2" sx={{ mt: 1, mb: 1, color: 'text.secondary' }}>LIFESTYLE FACTORS</Typography></Grid>

                        <Grid item xs={6}>
                            <Controller
                                name="smoker"
                                control={control}
                                render={({ field }) => (
                                    <Box
                                        onClick={() => field.onChange(field.value === 1 ? 0 : 1)}
                                        sx={{
                                            border: '2px solid',
                                            borderColor: field.value === 1 ? 'error.main' : 'divider',
                                            borderRadius: 2, p: 2, cursor: 'pointer',
                                            bgcolor: field.value === 1 ? 'error.lighter' : 'transparent',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Typography fontWeight={600}>Do you smoke?</Typography>
                                        <Typography variant="body2" color={field.value === 1 ? 'error.main' : 'text.secondary'}>
                                            {field.value === 1 ? "Yes" : "No"}
                                        </Typography>
                                    </Box>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="famhist"
                                control={control}
                                render={({ field }) => (
                                    <Box
                                        onClick={() => field.onChange(field.value === 1 ? 0 : 1)}
                                        sx={{
                                            border: '2px solid',
                                            borderColor: field.value === 1 ? 'primary.main' : 'divider',
                                            borderRadius: 2, p: 2, cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Typography fontWeight={600}>Family History?</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {field.value === 1 ? "Yes (Heart Disease)" : "No Known History"}
                                        </Typography>
                                    </Box>
                                )}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <InfoLabel label="Systolic Blood Pressure" tooltip="The top number in your blood pressure reading (mm Hg)" />
                            <Controller
                                name="trestbps"
                                control={control}
                                rules={{ required: 'Systolic BP required' }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        type="number"
                                        fullWidth
                                        placeholder="e.g. 120"
                                        error={!!errors.trestbps}
                                        helperText={errors.trestbps?.message}
                                        inputProps={{ 'aria-label': 'Systolic blood pressure' }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoLabel label="Cholesterol Level" tooltip="Total serum cholesterol in mg/dl" />
                            <Controller
                                name="chol"
                                control={control}
                                rules={{ required: 'Cholesterol level required' }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        type="number"
                                        fullWidth
                                        placeholder="e.g. 190"
                                        error={!!errors.chol}
                                        helperText={errors.chol?.message}
                                        inputProps={{ 'aria-label': 'Cholesterol level' }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InfoLabel label="Body Mass Index (BMI)" tooltip="A measure of body fat based on height and weight" />
                            <Controller name="bmi" control={control} render={({ field }) => (
                                <Box sx={{ px: 1 }}>
                                    <Slider
                                        {...field} min={15} max={45} step={0.5}
                                        valueLabelDisplay="auto"
                                        marks={[{ value: 18.5, label: 'Under' }, { value: 25, label: 'Healthy' }, { value: 30, label: 'Over' }]}
                                    />
                                </Box>
                            )} />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="fbs"
                                control={control}
                                render={({ field }) => (
                                    <Box display="flex" alignItems="center" bgcolor="background.default" p={2} borderRadius={2}>
                                        <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                        <Box>
                                            <Typography fontWeight={600}>Is your Fasting Blood Sugar {'>'} 120 mg/dl?</Typography>
                                            <Typography variant="caption" color="text.secondary">Check this box if your blood sugar levels are typically high.</Typography>
                                        </Box>
                                    </Box>
                                )}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <InfoLabel label="Chest Pain Type" tooltip="Select the description that best matches your symptoms" />
                            <Controller
                                name="cp"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select fullWidth>
                                        <MenuItem value={0}>Typical Angina (Discomfort triggered by exertion)</MenuItem>
                                        <MenuItem value={1}>Atypical Angina (Unusual symptoms)</MenuItem>
                                        <MenuItem value={2}>Non-Anginal Pain (Not heart related)</MenuItem>
                                        <MenuItem value={3}>Asymptomatic (No pain)</MenuItem>
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoLabel label="Max Heart Rate" tooltip="Maximum heart rate achieved during exercise" />
                            <Controller
                                name="thalach"
                                control={control}
                                rules={{ required: 'Max heart rate required' }}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        type="number"
                                        fullWidth
                                        error={!!errors.thalach}
                                        helperText={errors.thalach?.message || 'BPM'}
                                        inputProps={{ 'aria-label': 'Maximum heart rate' }}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoLabel label="Exercise Angina" tooltip="Does exercise cause you chest pain?" />
                            <Controller
                                name="exang"
                                control={control}
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        color="error"
                                        value={field.value}
                                        exclusive
                                        onChange={(e, val) => val !== null && field.onChange(val)}
                                        fullWidth size="small"
                                    >
                                        <ToggleButton value={0}>No</ToggleButton>
                                        <ToggleButton value={1}>Yes</ToggleButton>
                                    </ToggleButtonGroup>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ my: 1, color: 'text.secondary' }}>ADVANCED METRICS (Optional if unknown)</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <InfoLabel label="ST Depression" tooltip="ST depression induced by exercise relative to rest" />
                            <Controller name="oldpeak" control={control} render={({ field }) =>
                                <TextField {...field} type="number" step="0.1" fullWidth placeholder="e.g. 1.0" />
                            } />
                        </Grid>
                        <Grid item xs={6}>
                            <InfoLabel label="ST Slope" tooltip="Slope of the peak exercise ST segment" />
                            <Controller name="slope" control={control} render={({ field }) =>
                                <TextField {...field} select fullWidth>
                                    <MenuItem value={0}>Upsloping</MenuItem>
                                    <MenuItem value={1}>Flat</MenuItem>
                                    <MenuItem value={2}>Downsloping</MenuItem>
                                </TextField>
                            } />
                        </Grid>
                    </Grid>
                );
            default: return null;
        }
    };

    return (
        <Card elevation={0} sx={{ height: '100%', borderRadius: 4, border: '1px solid #F1F5F9', transition: 'box-shadow 0.2s ease-in-out', '&:hover': { boxShadow: '0 8px 20px rgba(0,0,0,0.1)' } }}>
            <Box sx={{ px: 3, pt: 4, pb: 2 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>
            </Box>

            <CardContent sx={{ px: { xs: 2, md: 5 }, py: 2 }}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Box sx={{ minHeight: 380 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ x: 10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {formContent(activeStep)}
                            </motion.div>
                        </AnimatePresence>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: '1px solid #F1F5F9' }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            startIcon={<ArrowBack />}
                            sx={{ color: 'text.secondary' }}
                        >
                            Back
                        </Button>

                        {activeStep === steps.length - 1 ? (
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                disableElevation
                                startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                                sx={{ px: 5, borderRadius: 3 }}
                                aria-busy={isLoading}
                            >
                                {isLoading ? "Analyzing..." : "Get Result"}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                variant="contained"
                                disableElevation
                                endIcon={<ArrowForward />}
                                sx={{ px: 4, borderRadius: 3 }}
                            >
                                Continue
                            </Button>
                        )}
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
};

export default PredictionForm;
