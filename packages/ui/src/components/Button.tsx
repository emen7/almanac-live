import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick, primary = false }) => {
  return (
    <StyledButton onClick={onClick} primary={primary}>
      {children}
    </StyledButton>
  );
};

export default Button;
