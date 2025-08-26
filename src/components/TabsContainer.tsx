import React, { useState, useEffect, useCallback, memo } from 'react';
import styled from '@emotion/styled';
import { lazyLoad } from '../utils/lazyLoad';
import { theme } from '../theme';

// Lazy load the 3D scene for better performance
const Scene3D = lazyLoad(() => import('./Scene3DOptimized').then(mod => ({ 
  default: mod.Scene3DOptimized 
})));

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsContainerProps {
  tabs: Tab[];
}

const TabsWrapper = styled.div<{ isLoading: boolean }>`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(45deg, ${theme.colors.gradientStart}, ${theme.colors.gradientMiddle1}, ${theme.colors.gradientMiddle2}, ${theme.colors.gradientEnd});
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  overflow-x: hidden;
  overflow-y: auto; /* Allow vertical scrolling */
  opacity: ${props => props.isLoading ? 0 : 1};
  transition: opacity 0.3s ease-in;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y; /* Allow vertical touch scrolling */
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding-bottom: 80px;
    height: -webkit-fill-available;
  }
`;

const TabButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.navigation};
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xs};
    padding: ${theme.spacing.sm};
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  background: ${props => props.active ? 'rgba(0, 255, 245, 0.2)' : 'rgba(0, 0, 0, 0.3)'};
  color: ${props => props.active ? theme.colors.textPrimary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: ${props => props.active ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'};
  -webkit-tap-highlight-color: transparent;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: 0.9rem;
  }

  &:hover {
    background: rgba(0, 255, 245, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 255, 245, 0.5);
  }
`;

const TabContent = styled.div<{ isVisible: boolean }>`
  flex: 1;
  /* Adjust padding to account for fixed header using theme variables */
  padding-top: calc(${theme.headerHeight.desktop} + ${theme.spacing.xl});
  padding-bottom: 4rem;
  padding-left: ${theme.spacing.lg};
  padding-right: ${theme.spacing.lg};
  color: ${theme.colors.textPrimary};
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: opacity 0.3s ease-in-out, 
              transform 0.3s ease-in-out;
  position: relative;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  min-height: calc(100vh - ${theme.headerHeight.desktop} - ${theme.spacing.xl});
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${theme.breakpoints.md}) {
    padding-top: calc(${theme.headerHeight.mobile} + ${theme.spacing.lg});
    padding-bottom: ${theme.spacing.lg};
    padding-left: ${theme.spacing.md};
    padding-right: ${theme.spacing.md};
    min-height: calc(100vh - ${theme.headerHeight.mobile} - ${theme.spacing.lg});
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, ${theme.colors.gradientStart}, ${theme.colors.gradientMiddle1}, ${theme.colors.gradientMiddle2}, ${theme.colors.gradientEnd});
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${theme.zIndex.modal};
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 3px solid ${theme.colors.primaryTransparent};
    border-radius: 50%;
    border-top-color: ${theme.colors.primary};
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Memoized tab button component to prevent unnecessary re-renders
const MemoizedTabButton = memo(({ 
  tab, 
  isActive, 
  onClick, 
  disabled 
}: { 
  tab: Tab; 
  isActive: boolean; 
  onClick: () => void;
  disabled: boolean;
}) => (
  <TabButton
    active={isActive}
    onClick={onClick}
    disabled={disabled}
  >
    {tab.label}
  </TabButton>
));

// Memoized tab content to prevent unnecessary re-renders
const MemoizedTabContent = memo(({ 
  tab, 
  isVisible
}: { 
  tab: Tab; 
  isVisible: boolean;
}) => (
  <div 
    style={{ 
      display: isVisible ? 'block' : 'none',
      position: 'absolute',
      width: '100%',
      left: 0,
      top: 0
    }}
  >
    {tab.content}
  </div>
));

export const TabsContainer = ({ tabs }: TabsContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleTab, setVisibleTab] = useState<string | null>(tabs[0]?.id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    if (tabId === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setVisibleTab(null);

    setTimeout(() => {
      setActiveTab(tabId);
      setTimeout(() => {
        setVisibleTab(tabId);
        setIsTransitioning(false);
      }, 200);
    }, 300);
  }, [activeTab, isTransitioning]);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <TabsWrapper isLoading={isLoading}>
        <Scene3D activeTab={activeTab} />
        <TabButtons>
          {tabs.map((tab) => (
            <MemoizedTabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              disabled={isTransitioning}
            />
          ))}
        </TabButtons>
        <TabContent isVisible={!isTransitioning && activeTab === visibleTab}>
          {tabs.map((tab) => (
            <MemoizedTabContent
              key={tab.id}
              tab={tab}
              isVisible={activeTab === tab.id}
            />
          ))}
        </TabContent>
      </TabsWrapper>
    </>
  );
};