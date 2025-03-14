import React from "react";
// Temporarily comment out styled-components until it's properly installed
// import styled from "styled-components";
import Link from "next/link";

// Use regular CSS classes instead of styled-components
// const CardContainer = styled.div`...`

const Card = ({ title, description, link }) => {
  return (
    <div className="card-container">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      {link && (
        <Link href={link} className="card-link">
          View Details
        </Link>
      )}
    </div>
  );
};

export default Card;
