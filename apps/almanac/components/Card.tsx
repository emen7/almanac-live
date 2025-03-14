import React from "react";
import styled from "styled-components";
import Link from "next/link";

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  margin: 0 0 1rem 0;
`;

const CardContent = styled.div`
  font-size: 1rem;
`;

const CardLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ShareButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

interface CardProps {
  title: string;
  content: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ title, content, link }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: content,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
      {link && (
        <Link href={link} passHref>
          <CardLink>Read more</CardLink>
        </Link>
      )}
      <ShareButton onClick={handleShare}>Share</ShareButton>
    </CardContainer>
  );
};

export default Card;
