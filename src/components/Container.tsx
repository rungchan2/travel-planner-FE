import React from "react";
import styled from "styled-components";

export default function Container({ children }: { children: React.ReactNode }) {
  return <MaxWidthContainer>{children}</MaxWidthContainer>;
}

const MaxWidthContainer = styled.div`
  max-width: var(--max-width);
`;
