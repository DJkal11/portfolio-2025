import { Scene3D } from './components/Scene3D';
import { TabsContainer } from './components/TabsContainer';
import './App.css';

function App() {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      content: (
        <div>
          <h1>Welcome to My Portfolio</h1>
          <p>I'm a developer passionate about creating amazing experiences.</p>
        </div>
      ),
    },
    {
      id: '3d',
      label: '3D Scene',
      content: ({ activeTab }: { activeTab: string }) => <Scene3D activeTab={activeTab} />,
    },
    {
      id: 'projects',
      label: 'Projects',
      content: (
        <div>
          <h2>My Projects</h2>
          <p>Here are some of my featured projects...</p>
        </div>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      content: (
        <div>
          <h2>Get in Touch</h2>
          <p>Feel free to reach out to me...</p>
        </div>
      ),
    },
  ];

  return <TabsContainer tabs={tabs} />;
}

export default App
