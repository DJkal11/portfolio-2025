// React is imported automatically with JSX in modern React
import styled from '@emotion/styled';

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const Card = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 255, 245, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h3`
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 245, 0.1);
  color: #00fff5;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(0, 255, 245, 0.3);
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
`;

const Link = styled.a`
  color: #00fff5;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff1493;
  }
`;

export const ProjectCard = ({
  title,
  description,
  imageUrl,
  techStack,
  liveUrl,
  githubUrl,
}: ProjectProps) => {
  const handleCardClick = () => {
    if (liveUrl) {
      window.open(liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card onClick={handleCardClick} style={{ cursor: liveUrl ? 'pointer' : 'default' }}>
      <ProjectImage src={imageUrl} alt={title} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <TechStack>
        {techStack.map((tech, index) => (
          <TechTag key={index}>{tech}</TechTag>
        ))}
      </TechStack>
      <Links onClick={(e) => e.stopPropagation()}>
        {liveUrl && (
          <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
            🌐 Live Demo
          </Link>
        )}
        {githubUrl && (
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            💻 GitHub
          </Link>
        )}
      </Links>
    </Card>
  );
};