import styled from '@emotion/styled';
import { theme } from '../../theme';

// Container for the contact section
export const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.md};
  background: ${theme.colors.cardBackground};
  border-radius: ${theme.borders.radius.medium};
  backdrop-filter: blur(10px);
  border: ${theme.borders.width.thin} solid rgba(255, 255, 255, 0.1);
  margin-top: 100px;
`;

// Heading for the contact section
export const ContactHeading = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

// Grid for contact links
export const ContactLinksGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.md};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-bottom: ${theme.spacing.lg};
`;

// Base link style
const BaseContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borders.radius.small};
  text-decoration: none;
  transition: ${theme.transitions.default};
`;

// LinkedIn link
export const LinkedInLink = styled(BaseContactLink)`
  background: ${theme.colors.primaryTransparent};
  border: ${theme.borders.width.thin} solid ${theme.colors.primaryBorder};
  color: ${theme.colors.primary};
  
  &:hover {
    background: ${theme.colors.primaryTransparentHover};
    transform: translateY(-2px);
  }
`;

// Email link
export const EmailLink = styled(BaseContactLink)`
  background: ${theme.colors.secondaryTransparent};
  border: ${theme.borders.width.thin} solid ${theme.colors.secondaryBorder};
  color: ${theme.colors.secondary};
  
  &:hover {
    background: ${theme.colors.secondaryTransparentHover};
    transform: translateY(-2px);
  }
`;

// Resume download link
export const ResumeLink = styled(BaseContactLink)`
  background: ${theme.colors.tertiaryTransparent};
  border: ${theme.borders.width.medium} solid ${theme.colors.tertiaryBorder};
  color: #9370db;
  padding: 1.2rem;
  border-radius: ${theme.borders.radius.medium};
  box-shadow: 0 0 15px ${theme.colors.tertiaryShadow};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { box-shadow: 0 0 15px ${theme.colors.tertiaryShadow}; }
    50% { box-shadow: 0 0 25px ${theme.colors.tertiaryShadowHover}; }
    100% { box-shadow: 0 0 15px ${theme.colors.tertiaryShadow}; }
  }
  
  &:hover {
    background: ${theme.colors.tertiaryTransparentHover};
    transform: translateY(-2px);
    box-shadow: 0 0 25px ${theme.colors.tertiaryShadowHover};
  }
`;

// SVG icon for contact links
export const ContactIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

// Footer text
export const ContactFooter = styled.p`
  text-align: center;
  color: ${theme.colors.textSecondary};
`;