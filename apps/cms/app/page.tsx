import React from "react";

export default function CMSHomePage() {
	return (
		<div style={{
			maxWidth: "800px",
			margin: "2rem auto",
			padding: "0 1rem",
			fontFamily: "Georgia, serif"
		}}>
			<h1 style={{ textAlign: "center", color: "#1a4c96" }}>Master Universe Almanac CMS</h1>
			<p style={{ textAlign: "center" }}>Content Management System for the Master Universe Almanac</p>
			
			<div style={{
				margin: "2rem 0",
				padding: "1.5rem",
				backgroundColor: "white",
				border: "1px solid #e0e0e0",
				borderRadius: "8px",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
			}}>
				<h2>Admin Login</h2>
				<p>This area is restricted to authorized content creators.</p>
				
				<div style={{ marginTop: "20px" }}>
					<input 
						type="text" 
						placeholder="Username"
						style={{
							width: "100%",
							padding: "10px",
							marginBottom: "10px",
							border: "1px solid #ddd",
							borderRadius: "4px"
						}}
					/>
					<input 
						type="password" 
						placeholder="Password"
						style={{
							width: "100%",
							padding: "10px",
							marginBottom: "20px",
							border: "1px solid #ddd",
							borderRadius: "4px"
						}}
					/>
					<button style={{
						padding: "10px 20px",
						backgroundColor: "#1a4c96",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer"
					}}>
						Login
					</button>
				</div>
			</div>
			
			<div style={{ marginTop: "2rem" }}>
				<h2>CMS Features:</h2>
				<ul>
					<li>Dataset Card Creation</li>
					<li>Content Organization</li>
					<li>Navigation Management</li>
					<li>Publishing Workflow</li>
				</ul>
			</div>
		</div>
	);
}
