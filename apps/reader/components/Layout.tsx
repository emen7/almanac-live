import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Layout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
