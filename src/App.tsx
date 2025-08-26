import { Suspense } from 'react';
import { TabsContainer } from './components/TabsContainer';
import './App.css';
import { ProjectCard } from './components/ProjectCard';
import { lazyLoad } from './utils/lazyLoad';

// Import styled components
import {
  HomeContainer,
  HomeHeading,
  BioParagraph,
  InfoGrid,
  TechExpertiseBox,
  WhatIDoBox,
  BoxHeading,
  SkillsList,
  SkillsListItem
} from './components/styled/HomeComponents';

import { ProjectsGrid } from './components/styled/ProjectComponents';

import {
  ContactContainer,
  ContactHeading,
  ContactLinksGrid,
  LinkedInLink,
  EmailLink,
  ResumeLink,
  ContactIcon,
  ContactFooter
} from './components/styled/ContactComponents';

// Lazy load the 3D scene for better performance
const Scene3DOptimized = lazyLoad(() => import('./components/Scene3DOptimized').then(mod => ({ 
  default: mod.Scene3DOptimized 
})));

function App() {
  // Project data
  const sampleProjects = [
    {
      title: "Weather App",
      description: "A modern weather application that provides real-time weather information with a clean, intuitive interface. Features include current conditions, forecasts, and location-based weather data.",
      imageUrl: "/images/weather.jpg",
      techStack: ["React", "JavaScript", "Weather API", "CSS", "Responsive Design"],
      liveUrl: "https://degree-weather.netlify.app/",
      githubUrl: "https://github.com/DJkal11/New-weather-App"
    },
    {
      title: "Climbing Ant Game",
      description: "An engaging browser-based game where players control an ant climbing upward while avoiding obstacles. Features smooth animations and increasing difficulty levels for an addictive gaming experience.",
      imageUrl: "/images/ant.jpg",
      techStack: ["JavaScript", "HTML5 Canvas", "CSS", "Game Physics", "Animation"],
      liveUrl: "https://climbing-ant.netlify.app/",
      githubUrl: "https://github.com/DJkal11/climbing-ant"
    },
    {
      title: "Audio Visualizer",
      description: "An interactive audio visualization tool that transforms music into stunning visual displays. Users can upload their own audio files and watch as the application creates dynamic, responsive visuals based on the audio frequencies.",
      imageUrl: "/images/audio.jpg",
      techStack: ["JavaScript", "Three.js", "Web Audio API", "Canvas", "HTML5", "CSS3"],
      liveUrl: "https://visual-audio.netlify.app/",
      githubUrl: "https://github.com/DJkal11/Audio-visualiser"
    }
  ];

  // Tab configuration
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      content: (
        <HomeContainer>
          <HomeHeading>
            Frontend Developer & UI/UX Enthusiast
          </HomeHeading>
          
          <BioParagraph>
            Hi, I'm Lucian! I craft engaging digital experiences with clean code and creative design. 
            My passion lies in building intuitive, performant web applications that users love to interact with.
          </BioParagraph>

          <InfoGrid>
            <TechExpertiseBox>
              <BoxHeading color="#ff1493">Technical Expertise</BoxHeading>
              <SkillsList>
                <SkillsListItem>✨ React & Modern JavaScript</SkillsListItem>
                <SkillsListItem>✨ TypeScript & Static Typing</SkillsListItem>
                <SkillsListItem>✨ Responsive & Mobile-First Design</SkillsListItem>
                <SkillsListItem>✨ State Management (Redux, Context)</SkillsListItem>
                <SkillsListItem>✨ Modern CSS & Styled Components</SkillsListItem>
              </SkillsList>
            </TechExpertiseBox>

            <WhatIDoBox>
              <BoxHeading color="#00fff5">What I Do</BoxHeading>
              <SkillsList>
                <SkillsListItem>🚀 Build scalable frontend architectures</SkillsListItem>
                <SkillsListItem>🎨 Create engaging user interfaces</SkillsListItem>
                <SkillsListItem>⚡ Optimize performance & accessibility</SkillsListItem>
                <SkillsListItem>🔄 Implement responsive layouts</SkillsListItem>
                <SkillsListItem>🤝 Collaborate in cross-functional teams</SkillsListItem>
              </SkillsList>
            </WhatIDoBox>
          </InfoGrid>
        </HomeContainer>
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      content: (
        <ProjectsGrid>
          {sampleProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              techStack={project.techStack}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </ProjectsGrid>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      content: (
        <ContactContainer>
          <ContactHeading>Get in Touch</ContactHeading>
          
          <ContactLinksGrid>
            <LinkedInLink
              href="https://www.linkedin.com/in/lucian-kallee-24893519a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#00fff5"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </ContactIcon>
              <span>Connect on LinkedIn</span>
            </LinkedInLink>

            <EmailLink
              href="mailto:luciankallee@gmail.com"
            >
              <ContactIcon
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ff1493"
              >
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
              </ContactIcon>
              <span>Send me an email</span>
            </EmailLink>

            <ResumeLink
              href="/resume.pdf"
              download
            >
              <ContactIcon
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#4b0082"
              >
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </ContactIcon>
              <span>Download Resume</span>
            </ResumeLink>
          </ContactLinksGrid>

          <ContactFooter>
            I'm always interested in hearing about new opportunities and exciting projects.
            Feel free to reach out through any of the channels above!
          </ContactFooter>
        </ContactContainer>
      ),
    },
  ];

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Scene3DOptimized activeTab={tabs[0].id} />
        <TabsContainer tabs={tabs} />
      </Suspense>
    </>
  );
}

export default App;
