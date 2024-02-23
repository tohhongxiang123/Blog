import { motion } from 'framer-motion';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Layout from '../components/Layout';
import NotePreview from '../components/NotePreview';
import PostPreview from '../components/PostPreview';
import {
	getFileContent,
	getFilesInDirectory,
	recursivelyGetFilesInDirectory
} from '../utils/mdxUtils';

const heroVariants = {
	show: {
		transition: {
			delayChildren: 1,
			staggerChildren: 0.1
		}
	}
};

const heroItemVariants = {
	hidden: { opacity: 0, x: -50 },
	show: { opacity: 1, x: 0 }
};

const aboutMeVariants = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};

const aboutMeItemVariants = {
	hidden: { opacity: 0, x: -20 },
	show: { opacity: 1, x: 0 }
};

const experienceVariants = {
	show: {
		transition: {
			staggerChildren: 0.15
		}
	}
};

const experienceItemVariants = {
	hidden: { opacity: 0, x: -20 },
	show: { opacity: 1, x: 0 }
};

const projectVariants = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};

const projectItemVariants = {
	hidden: { opacity: 0, x: -20 },
	show: { opacity: 1, x: 0 }
};

const contactMeVariants = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};

const fadeInVariants = {
	show: {
		transition: {
			staggerChildren: 0.1
		}
	}
};

const fadeInItemVariants = {
	hidden: { opacity: 0, x: -20 },
	show: { opacity: 1, x: 0 }
};

const contactMeItemVariants = {
	hidden: { opacity: 0, x: -20 },
	show: { opacity: 1, x: 0 }
};

const ParticlesBg = dynamic(() => import('particles-bg'), { ssr: false });

export default function Index({
	posts = [],
	notes = []
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Layout
			title="Home"
			description="Personal portfolio, blog and note-keeping page for Toh Hong Xiang"
		>
			<motion.section
				id="home"
				variants={heroVariants}
				initial="hidden"
				animate="show"
				className="flex items-center justify-around flex-col gap-8 h-screen w-full px-8 py-32"
			>
				<div className="flex flex-col max-w-3xl">
					<motion.h1
						variants={heroItemVariants}
						className="text-6xl sm:text-8xl font-bold tracking-tight mb-4"
					>
						TOH HONG XIANG
					</motion.h1>
					<motion.p
						variants={heroItemVariants}
						className="text-xl sm:text-3xl font-bold tracking-wide text-gray-600 mb-8"
					>
						Web Developer | Data Scientist
					</motion.p>
					<motion.p
						variants={heroItemVariants}
						className="text-lg sm:text-xl font-normal tracking-normal text-gray-600 mb-12"
					>
						I'm a software developer who enjoys building seamless
						and intuitive user experiences
					</motion.p>
					<div className="flex flex-wrap justify-center sm:justify-start gap-4">
						<a href="#about">
							<motion.button
								variants={heroItemVariants}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								type="button"
								className="shadow-sm text-blue-400 hover:text-white font-semibold tracking-loose border-2 border-blue-400 hover:border-blue-500 hover:bg-blue-500 py-2 px-6 rounded-md w-48"
							>
								Learn More
							</motion.button>
						</a>
						<a
							href="https://portfolio-mu-rosy-74.vercel.app/"
							target="_blank"
							rel="noreferrer noopener"
						>
							<motion.button
								variants={heroItemVariants}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								type="button"
								className="shadow-sm text-white font-semibold tracking-loose bg-blue-400 hover:bg-blue-500 py-2 px-6 rounded-md w-48"
							>
								My Portfolio
							</motion.button>
						</a>
					</div>
				</div>
				<ParticlesBg type="cobweb" num={50} color="#AFAFAF" bg={true} />
			</motion.section>
			<motion.section
				id="about"
				variants={aboutMeVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ amount: 0.25, once: true }}
				className="flex flex-col items-center relative p-16 mb-32"
			>
				<div className="flex flex-col max-w-3xl">
					<motion.h1
						variants={aboutMeItemVariants}
						className="text-3xl text-gray-500 font-light tracking-wide mb-8"
					>
						ABOUT ME
					</motion.h1>
					<motion.p
						variants={aboutMeItemVariants}
						className="font-medium text-lg text-gray-600 mb-4"
					>
						My journey into web development started in 2014, when I
						found out how to "Inspect Element" and change websites.
						Now, I build fully-fledged responsive applications for
						people to use.
					</motion.p>
					<motion.p
						variants={aboutMeItemVariants}
						className="font-medium text-lg text-gray-600 mb-4"
					>
						I love using React (with NextJS) and Typescript, and I
						also love doing data visualisations and machine
						learning. Building beautiful interactive experiences is
						extremely satisfying for me.
					</motion.p>
				</div>
				<ul className="flex flex-wrap gap-8 justify-center mt-16">
					<motion.li variants={aboutMeItemVariants}>
						<svg
							width={64}
							height={64}
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>React</title>
							<path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
						</svg>
					</motion.li>
					<motion.li variants={aboutMeItemVariants}>
						<svg
							width={64}
							height={64}
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Next.js</title>
							<path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z" />
						</svg>
					</motion.li>
					<motion.li variants={aboutMeItemVariants}>
						<svg
							width={64}
							height={64}
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Tailwind CSS</title>
							<path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.137,13.382,8.976,12,6.001,12z" />
						</svg>
					</motion.li>
					<motion.li variants={aboutMeItemVariants}>
						<svg
							width={64}
							height={64}
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>TypeScript</title>
							<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
						</svg>
					</motion.li>
					<motion.li variants={aboutMeItemVariants}>
						<svg
							width={64}
							height={64}
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Python</title>
							<path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
						</svg>
					</motion.li>
				</ul>
			</motion.section>
			<motion.section id="experience" className="p-16 mb-32">
				<div className="flex items-start flex-col gap-8 w-full mx-auto max-w-3xl">
					<motion.h1
						initial={{ opacity: 0, x: '-100px' }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ amount: 0.25, once: true }}
						className="text-3xl text-gray-500 font-light tracking-wide mb-8"
					>
						EXPERIENCE
					</motion.h1>
					<ul className="flex flex-col gap-y-8">
						<motion.li
							variants={experienceVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ amount: 0.25, once: true }}
						>
							<motion.h2
								variants={experienceItemVariants}
								className="font-semibold text-2xl"
							>
								Marketplace Intelligence Engineer - Shopee
								Private Limited
							</motion.h2>
							<motion.p
								variants={experienceItemVariants}
								className="font-medium text-lg text-gray-600 mb-4"
							>
								May 2022 - December 2022
							</motion.p>
							<ul className="list-disc list-inside flex flex-col gap-y-2">
								<motion.li variants={experienceItemVariants}>
									Collaborated with multiple teams to enhance
									deployment monitoring capabilities by
									creating a Grafana board specifically
									tailored for canary deployments, which
									provided real-time insights and
									visualizations to facilitate quick and
									informed decision-making during deployment.
								</motion.li>
								<motion.li variants={experienceItemVariants}>
									Contributed significantly to improve A/B
									testing workflows with comprehensive
									dashboard visualizations to accelerate
									business decisions
								</motion.li>
								<motion.li variants={experienceItemVariants}>
									Enhanced codebase by applying clean
									architecture principles, ensuring system
									maintainability, robustness and performance.
								</motion.li>
								<motion.li>
									Acquired expertise in scaling applications
									for millions of users, utilizing concurrency
									and multithreading in Golang.
								</motion.li>
								<motion.li variants={experienceItemVariants}>
									Took advantage of “clean architecture” to
									produce reusable, testable and robust code
								</motion.li>
								<motion.li variants={experienceItemVariants}>
									Reduce technical debt through consistent
									refactoring
								</motion.li>
							</ul>
						</motion.li>
						<motion.li
							variants={experienceVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ amount: 0.25, once: true }}
						>
							<motion.h2
								variants={experienceItemVariants}
								className="font-semibold text-2xl"
							>
								Software Developer - Industrial Electronics
								Private Limited
							</motion.h2>
							<motion.p
								variants={experienceItemVariants}
								className="font-medium text-lg text-gray-600 mb-4"
							>
								December 2019 - July 2020
							</motion.p>
							<ul className="list-disc list-inside flex flex-col gap-y-2">
								<motion.li variants={experienceItemVariants}>
									Engineered and implemented innovative
									features for a ReactJS and GraphQL
									e-commerce application, optimizing warehouse
									stock tracking and trading functionalities.
								</motion.li>
								<motion.li variants={experienceItemVariants}>
									Pioneered a streamlined workflow for content
									writers by developing a user-friendly
									drag-and-drop template builder in ReactJS.
								</motion.li>
								<motion.li variants={experienceItemVariants}>
									Delivered an exceptional user experience
									through the implementation of a
									results-driven UI using Material Design,
									consistently achieving project milestones
									ahead of schedule.
								</motion.li>
								<motion.li variants={experienceItemVariants}>
									Demonstrated proactive initiative by
									identifying and addressing potential bugs
									early in the development process,
									consistently engaging in code refactoring to
									mitigate technical debt.
								</motion.li>
							</ul>
						</motion.li>
					</ul>
				</div>
			</motion.section>
			<motion.section
				id="projects"
				className="flex items-center flex-col gap-8 minh-screen w-full p-8 mb-32"
			>
				<div className="flex items-start flex-col gap-8 w-full mx-auto max-w-3xl">
					<motion.h1
						initial={{ opacity: 0, x: '-100px' }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ amount: 0.25, once: true }}
						className="text-3xl text-gray-500 font-light tracking-wide mb-8"
					>
						PROJECTS
					</motion.h1>
					<ul className="flex flex-col gap-y-8">
						<motion.li
							variants={projectVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ amount: 0.25, once: true }}
						>
							<div>
								<motion.img
									variants={projectItemVariants}
									src="project_screenshots/nextjs_directus.jpg"
									className="mb-4"
								/>
								<motion.h2
									variants={projectItemVariants}
									className="font-semibold text-2xl mb-4"
								>
									NextJS Directus E-Commerce Website
								</motion.h2>
								<motion.p
									variants={projectItemVariants}
									className="font-medium text-lg text-gray-600 mb-4"
								>
									A fully-featured E-Commerce Website built
									with NextJS and Directus as a CMS
								</motion.p>
								<ul className="list-disc list-inside flex flex-col gap-y-2 mb-4">
									<motion.li variants={projectItemVariants}>
										Directus as a CMS to allow vendors to
										add/delete/edit products from their
										store
									</motion.li>
									<motion.li variants={projectItemVariants}>
										Snipcart integration with Stripe for
										payments and shopping cart management
									</motion.li>
								</ul>
								<div className="flex mb-4 gap-x-4">
									<motion.a
										variants={projectItemVariants}
										href="https://github.com/tohhongxiang123/directus-nextjs"
										target="_blank"
										rel="noopener noreferrer"
									>
										<motion.img
											whileHover={{
												scale: 1.03,
												rotate: 3
											}}
											whileTap={{ scale: 0.97 }}
											width={32}
											height={32}
											src="code.svg"
										/>
									</motion.a>
								</div>
							</div>
						</motion.li>
						<motion.li
							variants={projectVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ amount: 0.25, once: true }}
						>
							<div>
								<motion.img
									variants={projectItemVariants}
									src="project_screenshots/gallereddit.jpg"
									className="mb-4"
								/>
								<motion.h2
									variants={projectItemVariants}
									className="font-semibold text-2xl mb-4"
								>
									Gallereddit
								</motion.h2>
								<motion.p
									variants={projectItemVariants}
									className="font-medium text-lg text-gray-600 mb-4"
								>
									A small gallery Single Page Application
									working with Reddit's API
								</motion.p>
								<ul className="list-disc list-inside flex flex-col gap-y-2 mb-4">
									<motion.li variants={projectItemVariants}>
										Uses OAuth2 to access Reddit's API to
										allow users to login, upvote, save posts
									</motion.li>
									<motion.li variants={projectItemVariants}>
										Able to view all posts containing images
										pulled from Reddit's API (Hosted image
										albums are pulled from Imgur's API as
										well)
									</motion.li>
									<motion.li variants={projectItemVariants}>
										Able to filter posts based on subreddit
									</motion.li>
								</ul>
								<div className="flex mb-4 gap-x-4">
									<motion.a
										variants={projectItemVariants}
										href="https://github.com/tohhongxiang123/Gallereddit"
										target="_blank"
										rel="noopener noreferrer"
									>
										<motion.img
											whileHover={{
												scale: 1.03,
												rotate: 3
											}}
											whileTap={{ scale: 0.97 }}
											width={32}
											height={32}
											src="code.svg"
										/>
									</motion.a>
								</div>
							</div>
						</motion.li>
						<motion.li
							variants={projectVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ amount: 0.25, once: true }}
						>
							<div>
								<motion.img
									variants={projectItemVariants}
									src="project_screenshots/haze.jpg"
									className="mb-4"
								/>
								<motion.h2
									variants={projectItemVariants}
									className="font-semibold text-2xl mb-4"
								>
									Haze Monitoring Website
								</motion.h2>
								<motion.p
									variants={projectItemVariants}
									className="font-medium text-lg text-gray-600 mb-4"
								>
									Web Application to monitor PSI levels and
									other air quality readings in Singapore
								</motion.p>
								<ul className="list-disc list-inside flex flex-col gap-y-2 mb-4">
									<motion.li variants={projectItemVariants}>
										Real-time data from Singapore's PSI API
										provided under the Singapore Open Data
										License
									</motion.li>
									<motion.li variants={projectItemVariants}>
										Data visualised with ChartJS and
										Bootstrap
									</motion.li>
								</ul>
								<div className="flex mb-4 gap-x-4">
									<motion.a
										variants={projectItemVariants}
										href="https://github.com/tohhongxiang123/Haze-monitor"
										target="_blank"
										rel="noopener noreferrer"
									>
										<motion.img
											whileHover={{
												scale: 1.03,
												rotate: 3
											}}
											whileTap={{ scale: 0.97 }}
											width={32}
											height={32}
											src="code.svg"
										/>
									</motion.a>
								</div>
							</div>
						</motion.li>
					</ul>
				</div>
				<div>
					<Link href="/about">
						<motion.button
							variants={projectItemVariants}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							type="button"
							className="shadow-sm text-white font-semibold tracking-loose bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-md w-48"
						>
							View All Projects
						</motion.button>
					</Link>
				</div>
			</motion.section>
			<motion.section
				id="blog"
				variants={fadeInVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ amount: 0.25, once: true }}
				className="flex items-start flex-col gap-8 w-full mx-auto max-w-3xl mb-32 p-8"
			>
				<motion.h1
					initial={{ opacity: 0, x: '-100px' }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ amount: 0.25, once: true }}
					className="text-3xl text-gray-500 font-light tracking-wide mb-8"
				>
					STUFF I WRITE
				</motion.h1>
				<ul className="flex flex-col gap-y-8">
					<motion.li
						variants={fadeInVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ amount: 0.25, once: true }}
					>
						<motion.h2
							variants={fadeInItemVariants}
							className="font-semibold text-2xl mb-8"
						>
							Recent Blog Posts
						</motion.h2>
						<ul className="flex flex-col gap-2 mb-4">
							{posts.length > 0 ? (
								posts.map((post) => (
									<motion.li
										variants={fadeInItemVariants}
										key={post.filePath}
										className="mb-4"
									>
										<PostPreview {...post} />
									</motion.li>
								))
							) : (
								<motion.li variants={fadeInItemVariants}>
									No posts
								</motion.li>
							)}
						</ul>
						<Link href="/posts">
							<p className="cursor-pointer hover:underline text-right font-medium">
								...View All Posts
							</p>
						</Link>
					</motion.li>
					<motion.li
						variants={fadeInVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ amount: 0.25, once: true }}
					>
						<motion.h2
							variants={fadeInItemVariants}
							className="font-semibold text-2xl mb-8"
						>
							Recent Notes
						</motion.h2>
						<ul className="flex flex-col gap-y-2 mb-4">
							{notes.length > 0 ? (
								notes.map((note) => (
									<motion.li
										variants={fadeInItemVariants}
										key={note.filePath}
										className="mb-4"
									>
										<NotePreview {...note} />
									</motion.li>
								))
							) : (
								<motion.li variants={fadeInItemVariants}>
									No notes
								</motion.li>
							)}
						</ul>
						<Link href="/notes">
							<p className="cursor-pointer hover:underline text-right font-medium">
								...View All Notes
							</p>
						</Link>
					</motion.li>
				</ul>
			</motion.section>
			<motion.section
				id="contact"
				variants={contactMeVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ amount: 0.25, once: true }}
				className="flex items-center flex-col gap-8 w-full p-8 pb-32"
			>
				<div className="flex items-center flex-col gap-8 w-full mx-auto max-w-3xl">
					<motion.h1
						variants={contactMeItemVariants}
						className="text-3xl text-gray-800 font-semibold tracking-wide mb-4"
					>
						CONTACT ME
					</motion.h1>
					<motion.p variants={contactMeItemVariants}>
						I'm currently looking for a job. Feel free to contact
						me!
					</motion.p>
					<a href="mailto:tohhongxiang@gmail.com">
						<motion.button
							variants={heroItemVariants}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}
							type="button"
							className="shadow-sm text-blue-400 hover:text-white font-semibold tracking-loose border-2 border-blue-400 hover:border-blue-500 hover:bg-blue-500 py-2 px-6 rounded-md w-48"
						>
							Say Hello!
						</motion.button>
					</a>
				</div>
			</motion.section>
			<div className="absolute">
				<motion.ul className="flex md:flex-col justify-center gap-4 md:p-8 md:fixed md:bottom-0 md:items-start">
					<motion.li
						whileHover={{ scale: 1.05, opacity: 1 }}
						className="opacity-70 first-letter:cursor-pointer"
					>
						<motion.a
							href="https://github.com/tohhongxiang123"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg
								width={32}
								height={32}
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>GitHub</title>
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
						</motion.a>
					</motion.li>
					<motion.li
						whileHover={{ scale: 1.05, opacity: 1 }}
						className="opacity-70 first-letter:cursor-pointer"
					>
						<motion.a
							href="https://www.linkedin.com/in/toh-hong-xiang-31551118b/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<svg
								width={32}
								height={32}
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>LinkedIn</title>
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</motion.a>
					</motion.li>
				</motion.ul>
			</div>
		</Layout>
	);
}

export function getStaticProps() {
	const MAX_POSTS = 5;
	const posts = getFilesInDirectory(process.env.POSTS_PATH)
		.map((filePath) => {
			const { content, data } = getFileContent(filePath);

			return {
				content,
				data,
				filePath
			};
		})
		.slice(0, MAX_POSTS);

	const notes = recursivelyGetFilesInDirectory(process.env.NOTES_PATH)
		.map((filePath) => {
			const { content, data } = getFileContent(filePath);

			return {
				content,
				data,
				filePath
			};
		})
		.sort((noteA, noteB) =>
			new Date(noteA.data.date).getTime() -
				new Date(noteB.data.date).getTime() >
			0
				? -1
				: 1
		)
		.slice(0, MAX_POSTS);

	return { props: { posts, notes } };
}
