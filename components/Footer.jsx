import React from "react";

export default function Footer() {
	return (
		<footer className="px-8 mt-8">
			<hr />
			<div className="p-4">
                <ul className="grid grid-cols-1 grid-flow-col">
                    <li><a href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/" target="_blank" rel="noopener noreferrer" className="hover:underline">Toh Hong Xiang</a></li>
                    <li><a href="https://github.com/tohhongxiang123" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</a></li>
                </ul>
            </div>
		</footer>
	);
}
