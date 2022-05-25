import { motion } from "framer-motion";
import React from "react";

export default function Footer({ ...props }) {
	return (
		<>
			<footer {...props} className={`p-4 flex flex-col items-center bg-white ${props.className}`}>
				<div className="border-t border-gray-200 max-w-96 mb-4" />
				<p className="text-gray-500 text-center">Designed & Built by Toh Hong Xiang - 2022</p>
			</footer>
		</>
	);
}
