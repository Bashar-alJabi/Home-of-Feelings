/* 
    Safelist for Tailwind:
    bg-yellow-400 bg-yellow-500 hover:bg-yellow-500
    bg-blue-400 bg-blue-500 hover:bg-blue-500
    bg-red-400 bg-red-500 hover:bg-red-500
    bg-purple-400 bg-purple-500 hover:bg-purple-500
    bg-pink-400 bg-pink-500 hover:bg-pink-500
    bg-green-400 bg-green-500 hover:bg-green-500
    bg-stone-400 bg-stone-500 hover:bg-stone-500
    bg-gray-400 bg-gray-500 hover:bg-gray-500
    bg-indigo-400 bg-indigo-500 hover:bg-indigo-500
    bg-violet-400 bg-violet-500 hover:bg-violet-500
    bg-rose-400 bg-rose-500 hover:bg-rose-500
    text-white text-gray-800
*/
import { motion } from "framer-motion";
import { Howl } from "howler";
import { useEffect, useState } from "react";
import DynamicBackground from "../Background/DynamicBackground";
import TalkingHead from "../TalkingHead/TalkingHead";
import emotionsData from "./emotions.json";

export default function Home() {
	const [currentEmotion, setCurrentEmotion] = useState(null);
	const [currentPhrase, setCurrentPhrase] = useState(
		"How are you feeling today?"
	);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [sound, setSound] = useState(null);
	const [clickPhrase, setClickPhrase] = useState(null);
	const [volume, setVolume] = useState(0.5);
	// const [isSpeechSupported, setIsSpeechSupported] = useState(true);
	const [isResponsiveVoiceReady, setIsResponsiveVoiceReady] = useState(false);
	const [selectedVoice, setSelectedVoice] = useState("UK English Female");
	const [isVoiceSelectorOpen, setIsVoiceSelectorOpen] = useState(false);
	const [updateCounter, setUpdateCounter] = useState(0);

	// Check speech synthesis support on component mount
	// useEffect(() => {
	// 	// Check speech synthesis support on component mount
	// 	const checkSpeechSupport = async () => {
	// 		if (!window.speechSynthesis) {
	// 			setIsSpeechSupported(false);
	// 			return;
	// 		}
	// 		// Some browsers need a small delay to load voices
	// 		const voices = await new Promise((resolve) => {
	// 			const voices = window.speechSynthesis.getVoices();
	// 			if (voices.length) {
	// 				resolve(voices);
	// 			} else {
	// 				window.speechSynthesis.onvoiceschanged = () => {
	// 					resolve(window.speechSynthesis.getVoices());
	// 				};
	// 			}
	// 		});
	// 		setIsSpeechSupported(voices.length > 0);
	// 	};

	// 	checkSpeechSupport();
	// }, []);

	// Check ResponsiveVoice support
	useEffect(() => {
		const checkVoiceSupport = () => {
			if (window.responsiveVoice && window.responsiveVoice.voiceSupport()) {
				window.responsiveVoice.init();
				setIsResponsiveVoiceReady(true);
			} else {
				const retryTimeout = setTimeout(checkVoiceSupport, 100);
				return () => clearTimeout(retryTimeout);
			}
		};

		checkVoiceSupport();
	}, []);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (window.responsiveVoice) {
				window.responsiveVoice.cancel();
			}
			if (sound) {
				sound.stop();
				setSound(null);
			}
		};
	}, []);

	// Get a random phrase from the emotion
	useEffect(() => {
		if (currentEmotion) {
			// Stop any currently playing sound first
			if (sound) {
				sound.stop();
				setSound(null);
			}

			const emotion = emotionsData.emotions.find(
				(e) => e.name.toLowerCase() === currentEmotion
			);
			if (emotion?.phrases) {
				const randomIndex = Math.floor(
					Math.random() * emotion.phrases.length
				);
				const randomPhrase = emotion.phrases[randomIndex];
				setCurrentPhrase(randomPhrase);

				if (isResponsiveVoiceReady) {
					speak(randomPhrase, () => {
						playRandomSong(currentEmotion);
					});
				} else {
					setTimeout(() => {
						playRandomSong(currentEmotion);
					}, 3000);
				}
			}
		} else {
			const defaultPhrase = "How are you feeling today?";
			setCurrentPhrase(defaultPhrase);
			if (isResponsiveVoiceReady) {
				speak(defaultPhrase);
			}
			// Stop any playing sound when returning to default state
			if (sound) {
				sound.stop();
				setSound(null);
			}
		}

		// Cleanup
		return () => {
			if (window.speechSynthesis) {
				window.speechSynthesis.cancel();
			}
			if (sound) {
				sound.stop();
				setSound(null);
			}
		};
	}, [currentEmotion, updateCounter]);

	// Fun phrases
	const funPhrases = [
		"Boop! You found my nose!",
		"Hey, that tickles!",
		"*giggles* Stop that!",
		"Oh hi there!",
		"Want to hear a secret?",
		"You're pretty good at clicking!",
		"Peek-a-boo!",
		"*wiggle wiggle*",
		"High five! ✋",
		"You seem fun!",
		"Did someone order a smile? 😊",
		"Whoopsie daisy!",
		"That's my ticklish spot! 😆",
		"Do it again, do it again!",
		"Weeeee!",
		"*does a little dance* 💃",
		"We should hang out more often!",
		"You're my new best friend!",
		"Having a good day?",
		"You're awesome! ⭐",
		"Virtual hug! 🤗",
		"Beep boop boop!",
		"Plot twist: I'm ticklish!",
		"Did you hear that? Me giggling!",
		"Ooh, that's new!",
		"Sparkles everywhere! ✨",
		"*happy robot noises* 🤖",
		"You light up my day!",
		"Keep spreading joy!",
		"Your smile is contagious!",
		"You're doing great!",
		"Thanks for being you!",
		"Got any good jokes?",
		"Wanna see a magic trick?",
		"Did you know you're amazing?",
		"Can we be friends?",
		"Ready for an adventure?",
		"Let's start a dance party! 💃🕺",
		"You've discovered my secret hideout!",
		"I'm running out of clever things to say... just kidding!",
		"Watch this... *does backflip* (virtually)",
		"Knock knock! Who's there? Me! 😄",
		"I'm powered by smiles and good vibes!",
		"Is this thing on? *taps microphone*",
		"You must be a professional head-clicker!",
		"I sense positive energy from you! ✨",
		"Let's make today extraordinary!",
		"You're brighter than a supernova! ⭐",
		"Together we can move mountains! 🏔️",
		"You make the world a better place!",
	];

	// Handle head click
	const handleHeadClick = () => {
		const randomPhrase =
			funPhrases[Math.floor(Math.random() * funPhrases.length)];
		setClickPhrase(randomPhrase);
		// Clear the phrase after 3 seconds
		speak(randomPhrase, () => {
			setClickPhrase(null);
		});
	};

	// Initialize speech synthesis
	const speak = (text, onSpeechEnd) => {
		if (!isResponsiveVoiceReady) {
			console.warn('ResponsiveVoice not ready yet');
			if (onSpeechEnd) onSpeechEnd();
			return;
		}

		window.responsiveVoice.cancel();
		setIsSpeaking(true);
		
		window.responsiveVoice.speak(text, selectedVoice, {
			pitch: 1,
			rate: 1,
			volume: volume,
			onend: () => {
				setIsSpeaking(false);
				if (onSpeechEnd) onSpeechEnd();
			},
			onerror: (error) => {
				console.error("Speech error:", error);
				setIsSpeaking(false);
				if (onSpeechEnd) onSpeechEnd();
			},
		});
	};

	// Get available voices
	const getAvailableVoices = () => {
		if (window.responsiveVoice) {
			return window.responsiveVoice.getVoices();
		}
		return [];
	};

	// Play a random song based on the emotion
	const playRandomSong = (emotion) => {
		// Stop current sound if playing
		if (sound) {
			sound.stop();
			setSound(null);
		}

		const emotionD = emotionsData.emotions.find(
			(e) => e.name.toLowerCase() === emotion
		);
		if (emotionD?.songs) {
			const randomSong =
				emotionD.songs[
					Math.floor(Math.random() * emotionD.songs.length)
				];
			// Create new Howl instance
			const newSound = new Howl({
				src: [randomSong],
				volume: volume,
				loop: true,
				html5: true,
				onend: () => {
					// Cleanup when song ends
					setSound(null);
				},
				onplayerror: () => {
					// console.error("Error playing sound");
					// Try to recover from play error
					newSound.once("unlock", () => {
						newSound.play();
					});
				},
			});
			setSound(newSound);
			newSound.play();
		}
	};

	// Volume control
	const handleVolumeChange = (e) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (sound) {
			sound.volume(newVolume);
		}
	};

	return (
		<>
			<DynamicBackground emotion={currentEmotion} />
			{/* Clear thoughts button */}
			{currentEmotion && (
				<motion.button
					className="fixed top-24 right-8 group"
					onClick={() => setCurrentEmotion(null)}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.5 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<div className="relative">
						{/* Main thought bubble */}
						<motion.div
							className="bg-stone-100 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
							animate={{
								rotate: [0, -10, 10, -10, 0],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<span className="text-xl">💭</span>
						</motion.div>
						{/* Small bubbles */}
						<motion.div
							className="absolute -bottom-1 -right-1 bg-stone-100 rounded-full w-4 h-4"
							animate={{
								scale: [1, 0.8, 1],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute -bottom-3 -right-2 bg-stone-100 rounded-full w-2 h-2"
							animate={{
								scale: [1, 0.7, 1],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 0.2,
							}}
						/>
						{/* Tooltip */}
						<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -left-20 top-12 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
							Clear thoughts
						</div>
					</div>
				</motion.button>
			)}
			{/* Volume control */}
			{sound && (
				<motion.div
					className="fixed bottom-8 left-8 group bg-white/90 p-2 rounded-lg shadow-lg"
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className="flex items-center gap-2">
						<span className="text-xl">
							{volume === 0
								? "🔇"
								: volume < 0.3
								? "🔈"
								: volume < 0.7
								? "🔉"
								: "🔊"}
						</span>
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volume}
							onChange={handleVolumeChange}
							className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
					{/* Tooltip */}
					<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity left-0 top-14 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
						Volume control
					</div>
				</motion.div>
			)}
			{/* Main content */}
			<motion.main
				className="flex flex-col items-center justify-center px-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className="relative w-full">
					{/* Click phrase bubble */}
					{clickPhrase && (
						<motion.div
							className="absolute md:left-1/2 -top-16 mb-4 w-fit"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							key={clickPhrase}
						>
							<div className="px-6 py-3 bg-white rounded-xl shadow-lg relative whitespace-wrap">
								<p className="text-gray-800 text-lg font-medium relative">
									{clickPhrase}
								</p>
							</div>
						</motion.div>
					)}
					{/* Talking head */}
					<TalkingHead
						emotion={currentEmotion}
						isSpeaking={isSpeaking}
						onHeadClick={handleHeadClick}
					/>
					{/* Phrase */}
					<motion.div
						className="mt-4 px-6 py-3 bg-white rounded-xl shadow-lg relative w-fit m-auto"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						key={currentPhrase}
					>
						<div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
							<div className="w-4 h-4 bg-white rotate-45" />
						</div>
						<p className="text-gray-800 text-lg font-medium relative">
							{currentPhrase}
						</p>
					</motion.div>
				</div>
				{/* Title */}
				<motion.h1
					className="text-5xl font-bold text-gray-800 my-8 font-dancing"
					initial={{ scale: 0.5 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 200 }}
				>
					Click me when you're feeling...
				</motion.h1>
				{/* Buttons */}
				<motion.div
					className="flex gap-6 flex-wrap justify-center text-xl px-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					{emotionsData.emotions.map((emotion) => (
						<motion.div
							key={emotion.id}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => {
								if (currentEmotion === emotion.name.toLowerCase()) {
									setUpdateCounter(prev => prev + 1);
								} else {
									setCurrentEmotion(emotion.name.toLowerCase());
								}
							}}
						>
							<button
								className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors
									${emotion.bgColor} 
									${emotion.hoverBgColor} 
									${emotion.textColor}`}
							>
								{emotion.name} {emotion.emoji}
							</button>
						</motion.div>
					))}
				</motion.div>
			</motion.main>
			{/* Speech support warning */}
			{/* {!isSpeechSupported && (
				<motion.div
					className="fixed bottom-24 right-0 transform bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-[90%] group"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-yellow-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<p className="text-sm text-yellow-700">
								Voice synthesis is not available on your device.
								Text will be displayed instead.
							</p>
						</div>
						<button
							onClick={(e) =>
								(e.target.closest(".group").style.display =
									"none")
							}
							className="ml-4 text-yellow-400 hover:text-yellow-500 focus:outline-none"
						>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</motion.div>
			)} */}
			{/* Voice selector */}
			<motion.div
				className="fixed bottom-8 right-8"
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
			>
				<div className="relative">
					<div className="flex items-center bg-white/90 p-2 rounded-lg shadow-lg">
						<select
							value={selectedVoice}
							onChange={(e) => setSelectedVoice(e.target.value)}
							className={`${
								isVoiceSelectorOpen
									? "w-auto opacity-100"
									: "w-0 opacity-0"
							} transition-all duration-300 bg-transparent border-none outline-none cursor-pointer text-gray-700 text-sm overflow-hidden`}
						>
							{getAvailableVoices().map((voice) => (
								<option key={voice.name} value={voice.name}>
									{voice.name}
								</option>
							))}
						</select>
						<div className="relative group">
							<button
								onClick={() =>
									setIsVoiceSelectorOpen(!isVoiceSelectorOpen)
								}
								className="text-xl hover:scale-110 transition-transform"
							>
								{isVoiceSelectorOpen ? "📎" : "🎙️"}
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}
