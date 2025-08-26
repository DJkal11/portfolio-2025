import styled from '@emotion/styled';
import { theme } from '../../theme';

// Container for the home section content
export const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding-top: ${theme.spacing.sm};
  }
`;

// Main heading for the home section
export const HomeHeading = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.heading.fontSize};
  margin-bottom: ${theme.spacing.sm};
  /* Using theme variables for consistent spacing */
  margin-top: ${theme.spacing.md};
  text-shadow: 0 0 10px ${theme.colors.primaryShadow};
`;

// Bio paragraph
export const BioParagraph = styled.p`
  font-size: ${theme.typography.body.fontSize};
  line-height: ${theme.typography.body.lineHeight};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.md};
`;

// Grid container for the info boxes
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

// Box for technical expertise
export const TechExpertiseBox = styled.div`
  background: ${theme.colors.secondaryTransparent};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borders.radius.small};
  border: ${theme.borders.width.thin} solid ${theme.colors.secondaryBorder};
`;

// Box for what I do section
export const WhatIDoBox = styled.div`
  background: ${theme.colors.primaryTransparent};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borders.radius.small};
  border: ${theme.borders.width.thin} solid ${theme.colors.primaryBorder};
`;

// Heading for the info boxes
export const BoxHeading = styled.h2<{ color?: string }>`
  color: ${props => props.color || theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

// List for skills and activities
export const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${theme.colors.textSecondary};
  text-align: left;
`;

// List item for skills and activities
export const SkillsListItem = styled.li`
  margin-bottom: ${theme.spacing.xs};
`;