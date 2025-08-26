import React, { useState } from 'react';
import styled from '@emotion/styled';
import { availableThemes, getActiveTheme, setActiveTheme, theme, themes } from '../theme';

interface ThemeSwitcherProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

interface ThemeButtonProps {
  isActive: boolean;
  themeName: string;
}

const getThemeColor = (themeName: string) => {
  switch (themeName) {
    case 'neon':
      return '#00fff5';
    case 'highContrast':
      return '#00E5FF';
    case 'sunset':
      return '#FF9E43';
    case 'forest':
      return '#4CAF50';
    default:
      return '#00fff5';
  }
};

const getThemeGradient = (themeName: string) => {
  switch (themeName) {
    case 'neon':
      return 'linear-gradient(135deg, #0a0514 0%, #1a1033 50%, #312244 100%)';
    case 'highContrast':
      return 'linear-gradient(135deg, #121212 0%, #1A1A2E 50%, #16213E 100%)';
    case 'sunset':
      return 'linear-gradient(135deg, #1F1D36 0%, #3F3351 50%, #864879 100%)';
    case 'forest':
      return 'linear-gradient(135deg, #1A2F1A 0%, #2D4A2D 50%, #3E5F3E 100%)';
    default:
      return 'linear-gradient(135deg, #0a0514 0%, #1a1033 50%, #312244 100%)';
  }
};

const ThemeButton = styled.button<ThemeButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)'};
  color: ${props => props.isActive ? theme.colors.textPrimary : theme.colors.textSecondary};
  border: 1px solid ${props => props.isActive ? theme.colors.primaryBorder : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  text-transform: capitalize;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: ${props => props.isActive ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 6px 8px;
    font-size: 0.7rem;
  }
`;

const ThemeColorIndicator = styled.div<{ themeName: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => getThemeGradient(props.themeName)};
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => getThemeColor(props.themeName)};
    box-shadow: 0 0 4px ${props => getThemeColor(props.themeName)};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 12px;
    height: 12px;
    
    &::after {
      width: 4px;
      height: 4px;
    }
  }
`;

const SwitcherContainer = styled.div<{ position: ThemeSwitcherProps['position'] }>`
  position: fixed;
  z-index: ${theme.zIndex.navigation + 1};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  ${(props) => {
    switch(props.position) {
      case 'top-right':
        return `
          top: calc(${theme.headerHeight.desktop} + 16px);
          right: 16px;
          @media (max-width: ${theme.breakpoints.md}) {
            top: calc(${theme.headerHeight.mobile} + 16px);
            right: 8px;
          }
        `;
      case 'top-left':
        return `
          top: calc(${theme.headerHeight.desktop} + 16px);
          left: 16px;
          @media (max-width: ${theme.breakpoints.md}) {
            top: calc(${theme.headerHeight.mobile} + 16px);
            left: 8px;
          }
        `;
      case 'bottom-right':
        return `
          bottom: 16px;
          right: 16px;
          @media (max-width: ${theme.breakpoints.md}) {
            bottom: 8px;
            right: 8px;
          }
        `;
      case 'bottom-left':
      default:
        return `
          bottom: 16px;
          left: 16px;
          @media (max-width: ${theme.breakpoints.md}) {
            bottom: 8px;
            left: 8px;
          }
        `;
    }
  }}
`;

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ position = 'bottom-right' }) => {
  const [currentTheme, setCurrentTheme] = useState<string>(getActiveTheme());
  
  const handleThemeChange = (themeName: string) => {
    // Check if the theme name is valid
    if (availableThemes.includes(themeName as any) && setActiveTheme(themeName as keyof typeof themes)) {
      setCurrentTheme(themeName);
      // Force a re-render of styled components
      document.body.style.transition = 'all 0.5s ease';
      
      // Apply theme colors to CSS variables for immediate effect
      const themeColors = themes[themeName as keyof typeof themes].colors;
      
      // Apply all theme colors to CSS variables for immediate effect
      Object.entries(themeColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value.toString());
      });
      
      // Set background gradient based on the selected theme
      document.body.style.background = `linear-gradient(135deg, 
        ${themeColors.gradientStart} 0%, 
        ${themeColors.gradientMiddle1} 30%, 
        ${themeColors.gradientMiddle2} 70%, 
        ${themeColors.gradientEnd} 100%)`;
      
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'gradient 15s ease infinite';
      
      // Force layout recalculation with a longer timeout
      document.body.style.padding = '0.001px';
      
      // Apply a CSS class to force repaints of all themed elements
      document.body.classList.add('theme-changing');
      
      setTimeout(() => {
        document.body.style.padding = '0';
        document.body.classList.remove('theme-changing');
        
        // Force browser to repaint by triggering a resize event
        window.dispatchEvent(new Event('resize'));
        
        // Additional force repaint by accessing offsetHeight
        document.body.offsetHeight;
      }, 150); // Increased timeout for better effect
    }
  };
  
  return (
    <SwitcherContainer position={position}>
      {availableThemes.map((themeName) => (
        <ThemeButton 
          key={themeName}
          themeName={themeName}
          isActive={currentTheme === themeName}
          onClick={() => handleThemeChange(themeName)}
        >
          <ThemeColorIndicator themeName={themeName} />
          {themeName.replace(/([A-Z])/g, ' $1').toLowerCase()}
        </ThemeButton>
      ))}
    </SwitcherContainer>
  );
};

export { ThemeSwitcher };