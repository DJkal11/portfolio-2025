import { ReactNode, useState } from 'react';
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

const TabsWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

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

const TabContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow: auto;
  color: white;
`;

export const TabsContainer = ({ tabs }: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <TabsWrapper>
      <Scene3D activeTab={activeTab} />
      <TabButtons>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabButtons>
      <TabContent>
        {tabs.map((tab) => (
          <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none' }}>
            {typeof tab.content === 'function' ? (
              tab.content({ activeTab })
            ) : (
              tab.content
            )}
          </div>
        ))}
      </TabContent>
    </TabsWrapper>
  );
};