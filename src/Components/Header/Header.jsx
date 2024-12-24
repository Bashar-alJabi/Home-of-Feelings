import { motion } from "motion/react";

export default function Header() {
	return (
		<motion.header
			className="flex justify-between items-center p-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<div className="flex items-center gap-2">
				<motion.h1
					className="text-4xl font-bold text-gray-800 font-dancing"
					whileHover={{ scale: 1.03 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					Where your feelings find a home
				</motion.h1>
				<motion.span
					className="text-2xl text-red-500"
					animate={{
						scale: [1, 1.2, 1, 1.2, 1, 1],
					}}
					whileHover={{
						scale: [1, 1.2, 1, 1.2, 1],
						transition: {
							duration: 1,
							repeat: Infinity,
							repeatDelay: 0,
							times: [0, 0.2, 0.4, 0.6, 0.8, 1],
						},
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatDelay: 1,
						times: [0, 0.2, 0.4, 0.6, 0.8, 1],
					}}
				>
					♥️
				</motion.span>
			</div>
		</motion.header>
	);
}
