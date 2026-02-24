import { createTheme, alpha } from '@mui/material/styles';

const primaryColor = '#0EA5E9'; // Modern Sky Blue
const secondaryColor = '#6366F1'; // Indigo
const successColor = '#10B981'; // Emerald
const errorColor = '#EF4444'; // Red

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: alpha(primaryColor, 0.1),
      nav: '#ffffff',
    },
    secondary: {
      main: secondaryColor,
    },
    success: {
      main: successColor,
      light: '#D1FAE5',
    },
    error: {
      main: errorColor,
      light: '#FEE2E2',
    },
    background: {
      default: '#F8FAFC', // Slate 50
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B', // Slate 800
      secondary: '#64748B', // Slate 500
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#0F172A',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      color: '#334155',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      borderRadius: '8px',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#F8FAFC',
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: primaryColor,
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 0 4px ${alpha(primaryColor, 0.1)}`,
            },
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#E2E8F0',
          '&.Mui-active': {
            color: primaryColor,
          },
          '&.Mui-completed': {
            color: successColor,
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: primaryColor,
          '& .MuiSlider-thumb': {
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: '0 0 0 8px ' + alpha(primaryColor, 0.16),
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 5,
          backgroundColor: '#E5E7EB',
        },
        barColorPrimary: {
          backgroundColor: primaryColor,
          transition: 'width 1s ease-in-out',
        },
        barColorSecondary: {
          backgroundColor: errorColor,
          transition: 'width 1s ease-in-out',
        },
      },
    },
  },
});

export default theme;
