import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { MonitorHeart } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: 'white',
                color: 'text.primary',
                borderBottom: '1px solid',
                borderColor: '#E2E8F0',
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: 70, px: { xs: 2, md: 0 } }}>
                    {/* Branding */}
                    <Box display="flex" alignItems="center" sx={{ mr: 4 }}>
                        <MonitorHeart fontSize="large" sx={{ color: theme.palette.primary.main }} />
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ ml: 1, lineHeight: 1.1, letterSpacing: '-0.5px', color: '#0F172A' }}
                        >
                            Heart Disease Risk Assessment System
                        </Typography>
                    </Box>

                    {/* Spacer */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Navigation Links */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Button color="inherit" sx={{ fontWeight: 500 }}>Home</Button>
                        <Button color="inherit" sx={{ fontWeight: 500 }}>About</Button>
                        <Button color="inherit" sx={{ fontWeight: 500 }}>Contact</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
