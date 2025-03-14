import React from "react";
import { Button } from "@master-universe-almanac/ui";
import Layout from "../components/Layout";

const HomePage: React.FC = () => {
  const handleButtonClick = () => {
    alert("Button clicked!");
  };

  return (
    <Layout>
      <h1>Welcome to the Urantia Book Reader</h1>
      <Button onClick={handleButtonClick} primary>
        Get Started
      </Button>
    </Layout>
  );
};

export default HomePage;
