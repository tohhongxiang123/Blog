import React from "react";

export default function WaveContainer({
	children,
	fill = "#00aaff",
    top = true,
    bottom = true,
	...props
}) {
	return (
		<div {...props}>
			{top && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill={fill}
					fillOpacity="1"
					d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
				></path>
			</svg>}
			<div style={{ backgroundColor: fill }}>{children}</div>
			{bottom && <svg style={{ zIndex: 1 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill={fill}
					fillOpacity="1"
					d="M0,160L48,149.3C96,139,192,117,288,117.3C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
				></path>
			</svg>}
		</div>
	);
}
