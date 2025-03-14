import React from "react";
import Card from "../components/Card";

const AlmanacHomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Master Universe Almanac</h1>
      <Card
        title="Sample Card"
        content="This is a sample card content."
        link="/reader/paper/1/section/1/paragraph/1"
      />
    </div>
  );
};

export default AlmanacHomePage;
