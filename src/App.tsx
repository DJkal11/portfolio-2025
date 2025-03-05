import { TabsContainer } from './components/TabsContainer';
import './App.css';
import { ProjectCard } from './components/ProjectCard';

function App() {
  const sampleProjects = [
    {
      title: "Weather App",
      description: "A modern weather application that provides real-time weather information with a clean, intuitive interface. Features include current conditions, forecasts, and location-based weather data.",
      imageUrl: "https://picsum.photos/600/400?random=1",
      techStack: ["React", "JavaScript", "Weather API", "CSS", "Responsive Design"],
      liveUrl: "https://degree-weather.netlify.app/",
      githubUrl: "https://github.com/DJkal11/New-weather-App"
    },
    {
      title: "Climbing Ant Game",
      description: "An engaging browser-based game where players control an ant climbing upward while avoiding obstacles. Features smooth animations and increasing difficulty levels for an addictive gaming experience.",
      imageUrl: "https://picsum.photos/600/400?random=2",
      techStack: ["JavaScript", "HTML5 Canvas", "CSS", "Game Physics", "Animation"],
      liveUrl: "https://climbing-ant.netlify.app/",
      githubUrl: "https://github.com/DJkal11/climbing-ant"
    },
    {
      title: "Audio Visualizer",
      description: "An interactive audio visualization tool that transforms music into stunning visual displays. Users can upload their own audio files and watch as the application creates dynamic, responsive visuals based on the audio frequencies.",
      imageUrl: "https://picsum.photos/600/400?random=3",
      techStack: ["JavaScript", "Three.js", "Web Audio API", "Canvas", "HTML5", "CSS3"],
      liveUrl: "https://visual-audio.netlify.app/",
      githubUrl: "https://github.com/DJkal11/Audio-visualiser"
    }
  ];

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      content: (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem',
          marginTop: '50px'
          // background: 'rgba(0, 0, 0, 0.3)',
          // borderRadius: '12px',
          // backdropFilter: 'blur(10px)',
          // border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{ 
            color: '#00fff5',
            fontSize: '3rem',
            marginBottom: '1rem',
            textShadow: '0 0 10px rgba(0, 255, 245, 0.5)'
          }}>
            Frontend Developer & UI/UX Enthusiast
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem'
          }}>
            Hi, I'm Lucian! I craft engaging digital experiences with clean code and creative design. 
            My passion lies in building intuitive, performant web applications that users love to interact with.
          </p>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 20, 147, 0.1)',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 20, 147, 0.3)'
            }}>
              <h2 style={{ color: '#ff1493', marginBottom: '1rem' }}>Technical Expertise</h2>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>✨ React & Modern JavaScript</li>
                <li style={{ marginBottom: '0.5rem' }}>✨ TypeScript & Static Typing</li>
                <li style={{ marginBottom: '0.5rem' }}>✨ Responsive & Mobile-First Design</li>
                <li style={{ marginBottom: '0.5rem' }}>✨ State Management (Redux, Context)</li>
                <li style={{ marginBottom: '0.5rem' }}>✨ Modern CSS & Styled Components</li>
              </ul>
            </div>

            <div style={{
              background: 'rgba(0, 255, 245, 0.1)',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid rgba(0, 255, 245, 0.3)'
            }}>
              <h2 style={{ color: '#00fff5', marginBottom: '1rem' }}>What I Do</h2>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>🚀 Build scalable frontend architectures</li>
                <li style={{ marginBottom: '0.5rem' }}>🎨 Create engaging user interfaces</li>
                <li style={{ marginBottom: '0.5rem' }}>⚡ Optimize performance & accessibility</li>
                <li style={{ marginBottom: '0.5rem' }}>🔄 Implement responsive layouts</li>
                <li style={{ marginBottom: '0.5rem' }}>🤝 Collaborate in cross-functional teams</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      content: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          padding: '1rem',
          marginTop: '100px'
        }}>
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
        </div>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      content: (
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: '100px'
        }}>
          <h2 style={{ color: '#00fff5', marginBottom: '2rem', textAlign: 'center' }}>Get in Touch</h2>
          
          <div style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            marginBottom: '3rem'
          }}>
            <a
              href="https://www.linkedin.com/in/lucian-kallee-24893519a/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(0, 255, 245, 0.1)',
                border: '1px solid rgba(0, 255, 245, 0.3)',
                borderRadius: '8px',
                color: '#00fff5',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 245, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 245, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#00fff5"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>Connect on LinkedIn</span>
            </a>

            <a
              href="mailto:luciankallee@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 20, 147, 0.1)',
                border: '1px solid rgba(255, 20, 147, 0.3)',
                borderRadius: '8px',
                color: '#ff1493',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 20, 147, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 20, 147, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ff1493"
              >
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
              </svg>
              <span>Send me an email</span>
            </a>

            <a
              href="/resume.pdf"
              download
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.2rem',
                background: 'rgba(75, 0, 130, 0.3)',
                border: '2px solid rgba(147, 112, 219, 0.6)',
                borderRadius: '12px',
                color: '#9370db',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 15px rgba(147, 112, 219, 0.4)',
                animation: 'pulse 2s infinite'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(75, 0, 130, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(147, 112, 219, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(75, 0, 130, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(147, 112, 219, 0.4)';
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#4b0082"
              >
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span>Download Resume</span>
            </a>
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)' }}>
            I'm always interested in hearing about new opportunities and exciting projects.
            Feel free to reach out through any of the channels above!
          </p>
        </div>
      ),
    },
  ];

  return <TabsContainer tabs={tabs} />;
}

export default App;
