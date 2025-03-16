"use client";

import React from "react";
import styled from "styled-components";

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 1rem;
`;

const StyledButton = styled.button`
	background-color: #007bff;
	color: white;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 0.25rem;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		background-color: #0056b3;
	}
`;

export default function HomePage() {
	const handleButtonClick = () => {
		alert("Button clicked!");
	};

	return (
		<Container>
			<h1>Welcome to the Urantia Book Reader</h1>
			<p>A modern reading experience for the Urantia Book.</p>
			<StyledButton onClick={handleButtonClick}>
				Get Started
			</StyledButton>
		</Container>
	);
}
