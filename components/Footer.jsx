import React from "react";

export default function Footer({ ...props }) {
	return (
		<footer {...props} className={`px-8 bg-white ${props.className}`}>
			<hr />
			<div className="p-4">
                <ul className="grid grid-cols-1 grid-flow-row sm:grid-flow-col justify-items-end sm:justify-items-start">
                    <li><a href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/" target="_blank" rel="noopener noreferrer" className="hover:underline"><strong>Toh Hong Xiang</strong></a></li>
                    <li><a href="https://github.com/tohhongxiang123" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</a></li>
                </ul>
            </div>
		</footer>
	);
}
