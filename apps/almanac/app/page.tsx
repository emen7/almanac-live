import React from "react";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="almanac-container" style={{
			maxWidth: "1200px",
			margin: "2rem auto",
			padding: "0 1rem",
			fontFamily: "Georgia, serif"
		}}>
			<h1 style={{ textAlign: "center", color: "#1a4c96" }}>Master Universe Almanac</h1>
			<p style={{ textAlign: "center" }}>A specialized reference resource for students of the Urantia Book.</p>
			
			<div style={{
				margin: "2rem 0",
				padding: "1.5rem",
				backgroundColor: "white",
				border: "1px solid #e0e0e0",
				borderRadius: "8px",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
			}}>
				<h2>Featured Datasets</h2>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
					{/* Sample card using inline styles instead of styled-components */}
					<div style={{
						border: "1px solid #e0e0e0",
						borderRadius: "8px",
						padding: "16px",
						backgroundColor: "white",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
					}}>
						<h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "#1a4c96" }}>Cosmic Family Tree</h3>
						<p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "16px" }}>
							A comprehensive hierarchy of universe personalities and their relationships.
						</p>
						<Link href="/dataset/cosmic-family" style={{
							display: "inline-block",
							padding: "8px 16px",
							backgroundColor: "#1a4c96",
							color: "white",
							textDecoration: "none",
							borderRadius: "4px",
							fontSize: "0.9rem"
						}}>
							View Details
						</Link>
					</div>
					
					{/* Second sample card */}
					<div style={{
						border: "1px solid #e0e0e0",
						borderRadius: "8px",
						padding: "16px",
						backgroundColor: "white",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
					}}>
						<h3 style={{ fontSize: "1.25rem", marginBottom: "8px", color: "#1a4c96" }}>Universe Ages Timeline</h3>
						<p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "16px" }}>
							Chronological overview of the seven universe ages and their defining characteristics.
						</p>
						<Link href="/dataset/universe-ages" style={{
							display: "inline-block",
							padding: "8px 16px",
							backgroundColor: "#1a4c96",
							color: "white",
							textDecoration: "none",
							borderRadius: "4px",
							fontSize: "0.9rem"
						}}>
							View Details
						</Link>
					</div>
				</div>
			</div>
			
			<div style={{ marginTop: "2rem", textAlign: "center" }}>
				<Link href="http://localhost:3001" style={{
					display: "inline-block",
					padding: "0.75rem 1.5rem",
					backgroundColor: "#1a4c96",
					color: "white",
					textDecoration: "none",
					borderRadius: "4px",
					fontWeight: "500"
				}}>
					Open Urantia Book Reader
				</Link>
			</div>
		</div>
	);
}
