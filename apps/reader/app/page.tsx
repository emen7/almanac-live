import React from "react";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="reader-container" style={{
			maxWidth: "800px",
			margin: "2rem auto",
			padding: "0 1rem",
			fontFamily: "Georgia, serif"
		}}>
			<h1 style={{ textAlign: "center", color: "#1a4c96" }}>Urantia Book Reader</h1>
			<p>Welcome to the Urantia Book Reader application.</p>
			
			<div style={{
				margin: "2rem 0",
				padding: "1.5rem",
				backgroundColor: "white",
				border: "1px solid #e0e0e0",
				borderRadius: "8px",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
			}}>
				<p>
					This reader provides a modern experience for studying the Urantia Book.
					It includes features for customization, annotations, and seamless integration
					with the Master Universe Almanac.
				</p>
				
				<div style={{ marginTop: "1.5rem" }}>
					<h2>Features:</h2>
					<ul>
						<li>Text customization (font size, theme)</li>
						<li>Highlighting and annotations</li>
						<li>Reference system for precise citations</li>
						<li>Integration with Almanac datasets</li>
					</ul>
				</div>
			</div>
			
			<div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
				<Link href="/paper/1" style={{
					display: "inline-block",
					padding: "0.75rem 1.5rem",
					backgroundColor: "#1a4c96",
					color: "white",
					textDecoration: "none",
					borderRadius: "4px",
					fontWeight: "500"
				}}>
					Start Reading: Paper 1
				</Link>
			</div>
		</div>
	);
}
