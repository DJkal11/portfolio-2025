import { ReactNode, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Scene3D } from './Scene3D';

interface Tab {
  id: string;
  label: string;
  content: ReactNode | ((props: { activeTab: string }) => ReactNode);
}

interface TabsContainerProps {
  tabs: Tab[];
}

const TabsWrapper = styled.div<{ isLoading: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(-45deg, #120458, #4b0082, #ff1493, #00fff5);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  opacity: ${props => props.isLoading ? 0 : 1};
  transition: opacity 0.3s ease-in;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: ${props => props.active ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TabContent = styled.div<{ isVisible: boolean }>`
  flex: 1;
  padding: 4rem 2rem;
  overflow: auto;
  color: white;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '20px'});
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  position: relative;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #120458, #4b0082, #ff1493, #00fff5);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const TabsContainer = ({ tabs }: TabsContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleTab, setVisibleTab] = useState<string | null>(tabs[0]?.id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setVisibleTab(null);

    setTimeout(() => {
      setActiveTab(tabId);
      setTimeout(() => {
        setVisibleTab(tabId);
        setIsTransitioning(false);
      }, 300);
    }, 500);
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <TabsWrapper isLoading={isLoading}>
        <Scene3D activeTab={activeTab} />
        <TabButtons>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              disabled={isTransitioning}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabButtons>
        <TabContent isVisible={!isTransitioning && activeTab === visibleTab}>
          {tabs.map((tab) => (
            <div 
              key={tab.id} 
              style={{ 
                display: activeTab === tab.id ? 'block' : 'none',
                position: 'absolute',
                width: '100%',
                left: 0,
                top: 0
              }}
            >
              {typeof tab.content === 'function' ? 
                tab.content({ activeTab }) : 
                tab.content
              }
            </div>
          ))}
        </TabContent>
      </TabsWrapper>
    </>
  );
};