import { motion } from "framer-motion";
import React from "react";

// Background styles for different emotions
const backgroundStyles = {
	default: {
		background: "linear-gradient(120deg, #e0e0e0 0%, #ffffff 100%)",
		particles: "✧",
		particleCount: 5,
	},
	happy: {
		background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
		particles: "⭐",
		particleCount: 15,
	},
	sad: {
		background: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
		particles: "💧",
		particleCount: 10,
	},
	angry: {
		background: "linear-gradient(120deg, #ff6b6b 0%, #ff4545 100%)",
		particles: "💢",
		particleCount: 8,
	},
	anxious: {
		background: "linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)",
		particles: "💫",
		particleCount: 20,
	},
	excited: {
		background: "linear-gradient(120deg, #f472b6 0%, #ec4899 100%)",
		particles: "✨",
		particleCount: 25,
	},
	bored: {
		background: "linear-gradient(120deg, #d4d4d4 0%, #898989 100%)",
		particles: "💭",
		particleCount: 5,
	},
	tired: {
		background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
		particles: "💤",
		particleCount: 8,
	},
	lonely: {
		background: "linear-gradient(120deg, #6a85b6 0%, #bac8e0 100%)",
		particles: "🌙",
		particleCount: 12,
	},
	overwhelmed: {
		background: "linear-gradient(120deg, #b721ff 0%, #21d4fd 100%)",
		particles: "😵",
		particleCount: 30,
	},
	loved: {
		background: "linear-gradient(120deg, #ff758c 0%, #ff7eb3 100%)",
		particles: "💖",
		particleCount: 20,
	},
};

export default function DynamicBackground({ emotion }) {
	const style = emotion ? backgroundStyles[emotion] : backgroundStyles.default;

	const particles = Array.from({ length: style.particleCount }, (_, i) => (
		<motion.div
			key={i}
			className="absolute text-2xl pointer-events-none"
			initial={{
				opacity: 0,
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
			}}
			animate={{
				opacity: [0, 1, 0],
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
			}}
			transition={{
				duration: Math.random() * 5 + 3,
				repeat: Infinity,
				repeatType: "loop",
				delay: Math.random() * 2,
			}}
		>
			{style.particles}
		</motion.div>
	));

	return (
		<motion.div
			className="fixed inset-0 -z-10"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
			style={{ background: style.background }}
		>
			{particles}
		</motion.div>
	);
}
