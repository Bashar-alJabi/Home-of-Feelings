import { motion } from "framer-motion";
import React from "react";

// Expressions for the talking head
const expressions = {
	default: {
		mouth: "M15,40 Q30,40 45,40",
		eyes: "#000",
		eyeShape: "circle",
		eyebrows: "M15,15 L25,15 M35,15 L45,15",
	},
	happy: {
		mouth: "M15,35 Q30,45 45,35",
		eyes: "#000",
		eyeShape: "circle",
		eyebrows: "M15,15 Q20,13 25,15 M35,15 Q40,13 45,15",
		blush: true,
	},
	sad: {
		mouth: "M15,45 Q30,35 45,45",
		eyes: "#000",
		eyeShape: "circle",
		eyebrows: "M15,13 Q20,15 25,13 M35,13 Q40,15 45,13",
		tears: true,
	},
	angry: {
		mouth: "M15,40 Q30,35 45,40",
		eyes: "#ff4444",
		eyeShape: "triangle",
		eyebrows: "M15,12 L25,18 M45,12 L35,18",
		steam: true,
	},
	anxious: {
		mouth: "M15,40 Q30,40 45,40",
		eyes: "#000",
		eyeShape: "oval",
		eyebrows: "M15,13 Q20,15 25,13 M35,13 Q40,15 45,13",
		sweat: true,
		shake: true,
	},
	excited: {
		mouth: "M15,35 Q30,45 45,35",
		eyes: "⭐",
		eyeShape: "star",
		eyebrows: "M15,15 Q20,12 25,15 M35,15 Q40,12 45,15",
		sparkles: true,
	},
	bored: {
		mouth: "M15,40 L45,40",
		eyes: "#000",
		eyeShape: "halfClosed",
		eyebrows: "M15,15 L25,15 M35,15 L45,15",
	},
	tired: {
		mouth: "M15,40 Q30,40 45,40",
		eyes: "#000",
		eyeShape: "sleepy",
		eyebrows: "M15,15 L25,15 M35,15 L45,15",
		zzz: true,
	},
	lonely: {
		mouth: "M20,42 Q30,38 40,42",
		eyes: "#4477ff",
		eyeShape: "teardrop",
		eyebrows: "M15,13 Q20,15 25,10 M35,10 Q40,15 45,13",
	},
	overwhelmed: {
		mouth: "M15,42 Q30,45 45,42",
		eyes: "#000",
		eyeShape: "spiral",
		eyebrows: "M15,12 Q20,10 25,12 M35,12 Q40,10 45,12",
		sweat: true,
	},
	loved: {
		mouth: "M15,35 Q30,45 45,35",
		eyes: "❤️",
		eyeShape: "heart",
		eyebrows: "M15,15 Q20,12 25,15 M35,15 Q40,12 45,15",
		floatingHearts: true,
	},
};

const TalkingHead = ({ emotion, isSpeaking, onHeadClick }) => {
	const expression = emotion ? expressions[emotion] : expressions.default;

	const {
		mouth,
		eyes,
		eyeShape,
		eyebrows,
		sweat,
		tears,
		steam,
		shake,
		sparkles,
		glow,
		zzz,
		floatingHearts,
		blush,
	} = expression;

	const renderEyes = () => {
		switch (eyeShape) {
			case "closed":
				return (
					<>
						<path
							d="M17,20 Q20,18 23,20"
							fill="none"
							stroke="#000"
							strokeWidth="2.5"
						/>
						<path
							d="M37,20 Q40,18 43,20"
							fill="none"
							stroke="#000"
							strokeWidth="2.5"
						/>
					</>
				);
			case "sleepy":
				return (
					<>
						<path
							d="M17,20 Q20,22 23,20"
							fill="none"
							stroke="#000"
							strokeWidth="2.5"
						/>
						<path
							d="M37,20 Q40,22 43,20"
							fill="none"
							stroke="#000"
							strokeWidth="2.5"
						/>
					</>
				);
			case "star":
			case "sparkle":
				return (
					<>
						<text x="13" y="25" fontSize="10">
							{eyes}
						</text>
						<text x="33" y="25" fontSize="10">
							{eyes}
						</text>
					</>
				);
			case "heart":
				return (
					<>
						<text x="13" y="25" fontSize="10">
							{eyes}
						</text>
						<text x="33" y="25" fontSize="10">
							{eyes}
						</text>
					</>
				);
			case "spiral":
				return (
					<>
						<path
							d="M23,20 L17,17 L23,20 L17,23"
							fill="none" 
							stroke={eyes}
							strokeWidth="2"
						/>
						<path
							d="M37,20 L43,17 L37,20 L43,23"
							fill="none"
							stroke={eyes}
							strokeWidth="2"
						/>
					</>
				);
			case "teardrop":
				return (
					<>
						{/* Left eye */}
						<ellipse
							cx="20"
							cy="20"
							rx="4"
							ry="4"
							fill="#000"
							stroke="white"
							strokeWidth="1"
						/>
						<circle cx="21.5" cy="18.5" r="2" fill="white" />

						{/* Right eye */}
						<ellipse
							cx="40"
							cy="20"
							rx="4"
							ry="4"
							fill="#000"
							stroke="white"
							strokeWidth="1"
						/>
						<circle cx="41.5" cy="18.5" r="2" fill="white" />
					</>
				);
			case "triangle":
				return (
					<>
						<path d="M17,18 L20,22 L23,18 Z" fill={eyes} />
						<path d="M37,18 L40,22 L43,18 Z" fill={eyes} />
					</>
				);
			case "circle":
				return (
					<>
						<circle cx="20" cy="20" r="3" fill={eyes} />
						<circle cx="40" cy="20" r="3" fill={eyes} />
					</>
				);
			case "oval":
				return (
					<>
						<ellipse cx="20" cy="20" rx="3" ry="4" fill={eyes} />
						<ellipse cx="40" cy="20" rx="3" ry="4" fill={eyes} />
					</>
				);
			case "halfClosed":
				return (
					<>
						<path
							d="M17,20 L23,20"
							fill="none"
							stroke="#000"
							strokeWidth="2.5"
						/>
						<path
							d="M37,20 L43,20"
							fill="none"
							stroke="#000"
							strokeWidth="2.5"
						/>
					</>
				);
			default:
				return (
					<>
						<circle cx="20" cy="20" r="3" fill={eyes}>
							<animate
								attributeName="r"
								values="2.5;3;2.5"
								dur="2s"
								repeatCount="indefinite"
							/>
						</circle>
						<circle cx="40" cy="20" r="3" fill={eyes}>
							<animate
								attributeName="r"
								values="2.5;3;2.5"
								dur="2s"
								repeatCount="indefinite"
							/>
						</circle>
					</>
				);
		}
	};

	const renderMouth = () => {
		// Default mouth path as fallback
		const defaultMouthPath = "M15,40 Q30,40 45,40";
		const currentMouth = mouth || defaultMouthPath;

		if (isSpeaking) {
			const mouthStates = [
				currentMouth,
				"M15,40 Q30,45 45,40",  // open mouth
				currentMouth,
				"M15,40 Q30,35 45,40",  // slightly closed
			];

			return (
				<motion.path
					d={currentMouth}
					fill="none"
					stroke="#000"
					strokeWidth="2.5"
					initial={{ d: currentMouth }}
					animate={{ 
						d: mouthStates
					}}
					transition={{
						duration: 0.5,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "easeInOut"
					}}
				/>
			);
		}

		return (
			<motion.path
				d={currentMouth}
				fill="none"
				stroke="#000"
				strokeWidth="2.5"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
			/>
		);
	};

	return (
		<div className="flex items-center justify-center">
			<motion.svg
				width="120"
				height="120"
				viewBox="0 0 60 60"
				onClick={onHeadClick}
				className="cursor-pointer"
				initial={{ scale: 1 }}
				animate={
					shake
						? {
								scale: [1, 1.05, 1],
								x: [-2, 2, -2],
								y: [-1, 1, -1],
						  }
						: {
								scale: [1, 1.05, 1],
						  }
				}
				transition={{ duration: 0.5, repeat: Infinity }}
			>
				{/* Glow effect */}
				{glow && (
					<>
						<defs>
							<filter id="glow">
								<feGaussianBlur
									stdDeviation="2"
									result="coloredBlur"
								/>
								<feMerge>
									<feMergeNode in="coloredBlur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>
						<circle
							cx="30"
							cy="30"
							r="29"
							fill="rgba(255, 255, 100, 0.3)"
							filter="url(#glow)"
						/>
					</>
				)}

				{/* Face Circle */}
				<circle
					cx="30"
					cy="30"
					r="28"
					fill="#FFC857"
					stroke="#000"
					strokeWidth="2.5"
				/>

				{/* Blush */}
				{blush && (
					<>
						<circle
							cx="15"
							cy="32"
							r="4"
							fill="rgba(255,182,193,0.6)"
						/>
						<circle
							cx="45"
							cy="32"
							r="4"
							fill="rgba(255,182,193,0.6)"
						/>
					</>
				)}

				{/* Eyes */}
				{renderEyes()}

				{/* Eyebrows */}
				{eyebrows && (
					<path
						d={eyebrows}
						fill="none"
						stroke="#000"
						strokeWidth="2.5"
					/>
				)}

				{/* Effects */}
				{sweat && (
					<motion.path
						d="M45,15 Q47,18 45,21"
						fill="none"
						stroke="#4477ff"
						strokeWidth="2.5"
						initial={{ opacity: 0, y: -2 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, repeat: Infinity }}
					/>
				)}

				{steam && (
					<>
						<motion.path
							d="M10,10 Q13,7 16,10 Q19,13 22,10"
							fill="none"
							stroke="#666"
							strokeWidth="2"
							initial={{ opacity: 0, y: 0 }}
							animate={{ opacity: 1, y: -5 }}
							transition={{ duration: 1, repeat: Infinity }}
						/>
						<motion.path
							d="M40,8 Q43,5 46,8 Q49,11 52,8"
							fill="none"
							stroke="#666"
							strokeWidth="2"
							initial={{ opacity: 0, y: 0 }}
							animate={{ opacity: 1, y: -5 }}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: 0.5,
							}}
						/>
					</>
				)}

				{/* Mouth */}
				{renderMouth()}

				{/* Floating hearts */}
				{floatingHearts && (
					<>
						<motion.text
							x="10"
							y="10"
							fontSize="8"
							initial={{ opacity: 0, y: 0 }}
							animate={{ opacity: [0, 1, 0], y: -10 }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							💗
						</motion.text>
						<motion.text
							x="45"
							y="15"
							fontSize="8"
							initial={{ opacity: 0, y: 0 }}
							animate={{ opacity: [0, 1, 0], y: -10 }}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: 0.7,
							}}
						>
							💖
						</motion.text>
					</>
				)}

				{/* Sparkles */}
				{sparkles && (
					<>
						<motion.text
							x="8"
							y="15"
							fontSize="8"
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							✨
						</motion.text>
						<motion.text
							x="45"
							y="15"
							fontSize="8"
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								delay: 0.5,
							}}
						>
							✨
						</motion.text>
					</>
				)}

				{/* Tears */}
				{tears && (
					<>
						<motion.path
							d="M20,25 C20,25 18,30 20,35"
							stroke="#4477ff"
							strokeWidth="2"
							fill="#4477ff"
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: [0, 1, 0], y: 15 }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<motion.path
							d="M40,25 C40,25 42,30 40,35"
							stroke="#4477ff"
							strokeWidth="2"
							fill="#4477ff"
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: [0, 1, 0], y: 15 }}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: 0.5,
							}}
						/>
					</>
				)}

				{/* ZZZ for tired */}
				{zzz && (
					<>
						<motion.text
							x="45"
							y="15"
							fontSize="8"
							initial={{ opacity: 0, x: -5, y: 5 }}
							animate={{ opacity: [0, 1, 0], x: 5, y: -5 }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							💤
						</motion.text>
						<motion.text
							x="50"
							y="10"
							fontSize="6"
							initial={{ opacity: 0, x: -5, y: 5 }}
							animate={{ opacity: [0, 1, 0], x: 5, y: -5 }}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: 0.6,
							}}
						>
							💤
						</motion.text>
					</>
				)}
			</motion.svg>
		</div>
	);
};

export default TalkingHead;
