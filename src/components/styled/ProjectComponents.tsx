import styled from '@emotion/styled';
import { theme } from '../../theme';

// Container for the projects grid
export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm};
  margin-top: 100px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.sm};
  }
`;

// Enhanced version of the existing ProjectCard component's styled elements
export const Card = styled.div`
  background: ${theme.colors.cardBackground};
  border-radius: ${theme.borders.radius.medium};
  padding: ${theme.spacing.md};
  backdrop-filter: blur(10px);
  border: ${theme.borders.width.thin} solid rgba(255, 255, 255, 0.1);
  transition: ${theme.transitions.default};
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

export const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${theme.borders.radius.small};
  margin-bottom: ${theme.spacing.sm};
  border: ${theme.borders.width.thin} solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.h3`
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: ${theme.typography.subheading.fontSize};
`;

export const Description = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.body.fontSize};
  line-height: ${theme.typography.body.lineHeight};
  margin-bottom: ${theme.spacing.sm};
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: ${theme.spacing.sm};
`;

export const TechTag = styled.span`
  background: ${theme.colors.primaryTransparent};
  color: ${theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: ${theme.borders.radius.large};
  font-size: ${theme.typography.small.fontSize};
  border: ${theme.borders.width.thin} solid ${theme.colors.primaryBorder};
`;

export const Links = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const Link = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: ${theme.typography.small.fontSize};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.secondary};
  }
`;