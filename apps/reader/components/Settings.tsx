import React, { useState } from "react";
import styled from "styled-components";

const SettingsContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: white;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Settings: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("light");

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
    document.documentElement.style.fontSize = `${e.target.value}px`;
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <SettingsContainer>
      <div>
        <label>Font Size: </label>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={handleFontSizeChange}
        />
      </div>
      <div>
        <button onClick={handleThemeToggle}>
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </SettingsContainer>
  );
};

export default Settings;
