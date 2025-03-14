import React from "react";
import Card from "../../components/Card";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Master Universe Almanac</h1>
      <Card
        title="Sample Card"
        content="This is a sample card content."
        link="/reader/paper/1/section/1/paragraph/1"
      />
    </div>
  );
}
