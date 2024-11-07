import React from "react";
import styled from "styled-components";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <MaxWidthContainer className={className}>
      <ContentContainer>{children}</ContentContainer>
    </MaxWidthContainer>
  );
}

const MaxWidthContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
`;
