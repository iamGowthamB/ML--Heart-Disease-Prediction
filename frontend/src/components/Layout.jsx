import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: '#F8FAFC', // Slate 50
        }}>
            <Navbar />

            {/* Main Content with Top Padding to avoid overlap */}
            <Container maxWidth="xl" sx={{ pt: '100px', mb: 10, flexGrow: 1 }}>
                {children}
            </Container>

            <Footer />
        </Box>
    );
};

export default Layout;
