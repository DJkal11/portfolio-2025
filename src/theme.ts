// Theme configuration for the portfolio website

// Theme configuration options
export const themes = {
  // Original theme
  neon: {
    colors: {
      primary: '#00fff5',     // Cyan/teal color used throughout the site
      secondary: '#ff1493',   // Pink color used for accents
      tertiary: '#4b0082',    // Indigo color used for accents
      quaternary: '#7f00ff',  // Purple color used for accents
      
      // Background gradient colors
      gradientStart: '#120458',
      gradientMiddle1: '#4b0082',
      gradientMiddle2: '#ff1493',
      gradientEnd: '#00fff5',
      
      // Particle system colors
      particleColors: ['#00fff5', '#ff1493', '#4b0082', '#7f00ff', '#ff3366', '#00ccff'],
      
      // Text colors
      textPrimary: 'rgba(255, 255, 255, 0.9)',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      
      // UI element colors
      cardBackground: 'rgba(0, 0, 0, 0.3)',
      primaryTransparent: 'rgba(0, 255, 245, 0.1)',
      primaryTransparentHover: 'rgba(0, 255, 245, 0.2)',
      primaryBorder: 'rgba(0, 255, 245, 0.3)',
      secondaryTransparent: 'rgba(255, 20, 147, 0.1)',
      secondaryTransparentHover: 'rgba(255, 20, 147, 0.2)',
      secondaryBorder: 'rgba(255, 20, 147, 0.3)',
      tertiaryTransparent: 'rgba(75, 0, 130, 0.3)',
      tertiaryTransparentHover: 'rgba(75, 0, 130, 0.4)',
      tertiaryBorder: 'rgba(147, 112, 219, 0.6)',
      
      // Shadow colors
      primaryShadow: 'rgba(0, 255, 245, 0.5)',
      tertiaryShadow: 'rgba(147, 112, 219, 0.4)',
      tertiaryShadowHover: 'rgba(147, 112, 219, 0.6)',
    },
  },
  
  // Modern dark theme with improved contrast
  modernDark: {
    colors: {
      primary: '#4CC9F0',     // Bright blue with better contrast
      secondary: '#F72585',   // Vibrant pink for accents
      tertiary: '#7209B7',    // Rich purple for accents
      quaternary: '#3A0CA3',  // Deep blue for accents
      
      // Background gradient colors
      gradientStart: '#03071E', // Very dark blue
      gradientMiddle1: '#370617', // Dark burgundy
      gradientMiddle2: '#6A040F', // Dark red
      gradientEnd: '#03071E',  // Very dark blue
      
      // Particle system colors
      particleColors: ['#4CC9F0', '#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4895EF'],
      
      // Text colors
      textPrimary: 'rgba(255, 255, 255, 1)',   // Full white for better readability
      textSecondary: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
      
      // UI element colors
      cardBackground: 'rgba(15, 15, 30, 0.7)', // Darker, more opaque card background
      primaryTransparent: 'rgba(76, 201, 240, 0.15)',
      primaryTransparentHover: 'rgba(76, 201, 240, 0.25)',
      primaryBorder: 'rgba(76, 201, 240, 0.4)',
      secondaryTransparent: 'rgba(247, 37, 133, 0.15)',
      secondaryTransparentHover: 'rgba(247, 37, 133, 0.25)',
      secondaryBorder: 'rgba(247, 37, 133, 0.4)',
      tertiaryTransparent: 'rgba(114, 9, 183, 0.3)',
      tertiaryTransparentHover: 'rgba(114, 9, 183, 0.4)',
      tertiaryBorder: 'rgba(114, 9, 183, 0.5)',
      
      // Shadow colors
      primaryShadow: 'rgba(76, 201, 240, 0.6)',
      tertiaryShadow: 'rgba(114, 9, 183, 0.5)',
      tertiaryShadowHover: 'rgba(114, 9, 183, 0.7)',
    },
  },
  
  // Professional dark blue theme
  professionalDark: {
    colors: {
      primary: '#61DAFB',     // React blue
      secondary: '#FF6B6B',   // Coral red
      tertiary: '#4D5BCE',    // Medium blue
      quaternary: '#5565E8',  // Bright blue
      
      // Background gradient colors
      gradientStart: '#0A192F', // Dark navy
      gradientMiddle1: '#112240', // Medium navy
      gradientMiddle2: '#233554', // Light navy
      gradientEnd: '#0A192F',  // Dark navy
      
      // Particle system colors
      particleColors: ['#61DAFB', '#FF6B6B', '#4D5BCE', '#5565E8', '#64FFDA', '#A8B2D1'],
      
      // Text colors
      textPrimary: '#E6F1FF',   // Very light blue/white
      textSecondary: '#A8B2D1', // Light slate
      
      // UI element colors
      cardBackground: 'rgba(17, 34, 64, 0.7)', // Medium navy, more opaque
      primaryTransparent: 'rgba(97, 218, 251, 0.1)',
      primaryTransparentHover: 'rgba(97, 218, 251, 0.2)',
      primaryBorder: 'rgba(97, 218, 251, 0.3)',
      secondaryTransparent: 'rgba(255, 107, 107, 0.1)',
      secondaryTransparentHover: 'rgba(255, 107, 107, 0.2)',
      secondaryBorder: 'rgba(255, 107, 107, 0.3)',
      tertiaryTransparent: 'rgba(77, 91, 206, 0.2)',
      tertiaryTransparentHover: 'rgba(77, 91, 206, 0.3)',
      tertiaryBorder: 'rgba(77, 91, 206, 0.4)',
      
      // Shadow colors
      primaryShadow: 'rgba(97, 218, 251, 0.4)',
      tertiaryShadow: 'rgba(77, 91, 206, 0.4)',
      tertiaryShadowHover: 'rgba(77, 91, 206, 0.6)',
    },
  },
  
  // High contrast theme optimized for accessibility
  highContrast: {
    colors: {
      primary: '#00E5FF',     // Bright cyan with high contrast against dark backgrounds
      secondary: '#FF4081',   // Bright pink for strong accent
      tertiary: '#651FFF',    // Bright purple for accents
      quaternary: '#2979FF',  // Bright blue for accents
      
      // Background gradient colors - subtle gradient for better text readability
      gradientStart: '#121212', // Very dark gray (almost black)
      gradientMiddle1: '#1A1A2E', // Very dark blue-gray
      gradientMiddle2: '#16213E', // Dark blue-gray
      gradientEnd: '#0D1117',  // GitHub dark theme color
      
      // Particle system colors - more muted to avoid collision with text
      particleColors: ['#006D7A', '#5A1730', '#3A1266', '#1A4B8C', '#3D6E00', '#8B7D00'],
      
      // Text colors - maximum contrast
      textPrimary: '#FFFFFF',   // Pure white for maximum contrast
      textSecondary: '#E0E0E0', // Very light gray
      
      // UI element colors - higher opacity for better contrast
      cardBackground: 'rgba(18, 18, 18, 0.85)', // Very dark, high opacity
      primaryTransparent: 'rgba(0, 229, 255, 0.2)',
      primaryTransparentHover: 'rgba(0, 229, 255, 0.3)',
      primaryBorder: 'rgba(0, 229, 255, 0.5)',
      secondaryTransparent: 'rgba(255, 64, 129, 0.2)',
      secondaryTransparentHover: 'rgba(255, 64, 129, 0.3)',
      secondaryBorder: 'rgba(255, 64, 129, 0.5)',
      tertiaryTransparent: 'rgba(101, 31, 255, 0.2)',
      tertiaryTransparentHover: 'rgba(101, 31, 255, 0.3)',
      tertiaryBorder: 'rgba(101, 31, 255, 0.5)',
      
      // Shadow colors - stronger for better visibility
      primaryShadow: 'rgba(0, 229, 255, 0.7)',
      tertiaryShadow: 'rgba(101, 31, 255, 0.5)',
      tertiaryShadowHover: 'rgba(101, 31, 255, 0.7)',
    },
  },
  
  // Sunset theme with warm colors
  sunset: {
    colors: {
      primary: '#FF9E43',     // Warm orange
      secondary: '#FF5252',   // Coral red
      tertiary: '#B388FF',    // Soft purple
      quaternary: '#FF8A80',  // Light coral
      
      // Background gradient colors - warm sunset gradient
      gradientStart: '#1F1D36', // Dark purple
      gradientMiddle1: '#3F3351', // Medium purple
      gradientMiddle2: '#864879', // Mauve
      gradientEnd: '#E9A6A6',  // Light pink
      
      // Particle system colors - muted warm tones
      particleColors: ['#7D5A50', '#B4846C', '#704F4F', '#A67F8E', '#7D6167', '#5C374C'],
      
      // Text colors - warm white for readability
      textPrimary: '#FFF8EA',   // Warm white
      textSecondary: '#E6D5B8', // Light beige
      
      // UI element colors - warm tones with good opacity
      cardBackground: 'rgba(31, 29, 54, 0.85)', // Dark purple with high opacity
      primaryTransparent: 'rgba(255, 158, 67, 0.2)',
      primaryTransparentHover: 'rgba(255, 158, 67, 0.3)',
      primaryBorder: 'rgba(255, 158, 67, 0.5)',
      secondaryTransparent: 'rgba(255, 82, 82, 0.2)',
      secondaryTransparentHover: 'rgba(255, 82, 82, 0.3)',
      secondaryBorder: 'rgba(255, 82, 82, 0.5)',
      tertiaryTransparent: 'rgba(179, 136, 255, 0.2)',
      tertiaryTransparentHover: 'rgba(179, 136, 255, 0.3)',
      tertiaryBorder: 'rgba(179, 136, 255, 0.5)',
      
      // Shadow colors - warm glows
      primaryShadow: 'rgba(255, 158, 67, 0.6)',
      tertiaryShadow: 'rgba(179, 136, 255, 0.5)',
      tertiaryShadowHover: 'rgba(179, 136, 255, 0.7)',
    },
  },
  
  // Forest theme with natural green tones
  forest: {
    colors: {
      primary: '#4CAF50',     // Vibrant green
      secondary: '#8BC34A',   // Light green
      tertiary: '#009688',    // Teal
      quaternary: '#CDDC39',  // Lime
      
      // Background gradient colors - forest-inspired gradient
      gradientStart: '#1A2F1A', // Very dark green
      gradientMiddle1: '#2D4A2D', // Dark forest green
      gradientMiddle2: '#3E5F3E', // Medium forest green
      gradientEnd: '#1E352F',  // Dark teal
      
      // Particle system colors - natural forest tones
      particleColors: ['#2E5D34', '#4A7856', '#5E8C61', '#8EB897', '#A9C5A0', '#3D5A45'],
      
      // Text colors - soft white for readability
      textPrimary: '#F5F9F6',   // Soft white with slight green tint
      textSecondary: '#D7E6DA', // Light green-white
      
      // UI element colors - forest tones with good opacity
      cardBackground: 'rgba(26, 47, 26, 0.85)', // Dark green with high opacity
      primaryTransparent: 'rgba(76, 175, 80, 0.2)',
      primaryTransparentHover: 'rgba(76, 175, 80, 0.3)',
      primaryBorder: 'rgba(76, 175, 80, 0.5)',
      secondaryTransparent: 'rgba(139, 195, 74, 0.2)',
      secondaryTransparentHover: 'rgba(139, 195, 74, 0.3)',
      secondaryBorder: 'rgba(139, 195, 74, 0.5)',
      tertiaryTransparent: 'rgba(0, 150, 136, 0.2)',
      tertiaryTransparentHover: 'rgba(0, 150, 136, 0.3)',
      tertiaryBorder: 'rgba(0, 150, 136, 0.5)',
      
      // Shadow colors - natural glows
      primaryShadow: 'rgba(76, 175, 80, 0.6)',
      tertiaryShadow: 'rgba(0, 150, 136, 0.5)',
      tertiaryShadowHover: 'rgba(0, 150, 136, 0.7)',
    },
  }
};

// Default theme
let activeTheme: keyof typeof themes = 'highContrast';

// Function to get the current active theme name
export const getActiveTheme = () => activeTheme;

// Function to set a new active theme
export const setActiveTheme = (themeName: keyof typeof themes) => {
  if (themes[themeName]) {
    activeTheme = themeName;
    // Update the theme object
    Object.keys(theme.colors).forEach(key => {
      // Use type-safe approach to access theme colors
      const colorKey = key as keyof typeof theme.colors;
      
      // Access the active theme colors in a type-safe way
      const themeColors = themes[activeTheme].colors;
      
      // Only update if the key exists in both theme objects
      if (colorKey in themeColors) {
        // Use type assertion to ensure type safety
        theme.colors[colorKey] = themeColors[colorKey as keyof typeof themeColors] as any;
      }
    });
    return true;
  }
  return false;
};

// Export the themes object for the theme switcher
export const availableThemes = Object.keys(themes) as Array<keyof typeof themes>;

// The main theme object that will be used throughout the app
export const theme = {
  colors: {...(themes[activeTheme].colors)},
  
  // Typography
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    heading: {
      fontSize: '3rem',
      lineHeight: '1.1',
    },
    subheading: {
      fontSize: '1.5rem',
      lineHeight: '1.3',
    },
    body: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
    },
    small: {
      fontSize: '0.9rem',
      lineHeight: '1.5',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
  },
  
  // Header heights for consistent spacing
  headerHeight: {
    desktop: '8rem',
    mobile: '6rem',
  },
  
  // Borders
  borders: {
    radius: {
      small: '8px',
      medium: '12px',
      large: '20px',
    },
    width: {
      thin: '1px',
      medium: '2px',
      thick: '3px',
    },
  },
  
  // Transitions
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.2s ease',
    slow: 'all 0.5s ease',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  
  // Z-index layers
  zIndex: {
    background: 0,
    content: 10,
    navigation: 100,
    modal: 1000,
  },
  
  // Animations
  animations: {
    gradient: `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `,
    pulse: `
      @keyframes pulse {
        0% { box-shadow: 0 0 15px rgba(147, 112, 219, 0.4); }
        50% { box-shadow: 0 0 25px rgba(147, 112, 219, 0.6); }
        100% { box-shadow: 0 0 15px rgba(147, 112, 219, 0.4); }
      }
    `,
  },
};

// Media query helper functions
export const media = {
  xs: `@media (max-width: ${theme.breakpoints.xs})`,
  sm: `@media (max-width: ${theme.breakpoints.sm})`,
  md: `@media (max-width: ${theme.breakpoints.md})`,
  lg: `@media (max-width: ${theme.breakpoints.lg})`,
  xl: `@media (max-width: ${theme.breakpoints.xl})`,
};

// Helper function to get value from theme
export const getThemeValue = (path: string) => {
  const keys = path.split('.');
  return keys.reduce((obj, key) => obj && obj[key], theme as any);
};