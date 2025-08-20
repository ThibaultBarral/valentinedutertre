"use client";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <motion.div className='relative h-[calc(100svw-3rem)] m-2 sm:m-4 md:m-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            {/* CV Download Button - Mobile Optimized */}
            <motion.div className="absolute top-4 right-4 sm:top-6 md:top-8 sm:right-6 md:right-8 z-20" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <a
                    href="/d61e35_7f4016f281464b54a743eee064ee9b7b.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/70 hover:bg-black/90 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-white transition-all duration-300 flex items-center gap-2 shadow-lg text-xs sm:text-sm cursor-pointer backdrop-blur-sm"
                >
                    <span className="hidden sm:inline">Obtenir mon CV</span>
                    <span className="sm:hidden">CV</span>
                    <FontAwesomeIcon icon={faFileAlt} className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
            </motion.div>

            {/* Background Image */}
            <Image
                src="/hero-background.jpeg"
                alt="Intérieur design moderne avec canapé jaune et décoration colorée"
                fill
                className="object-cover grayscale"
                priority
            />

            {/* Overlay pour améliorer la lisibilité du texte */}
            <div className="absolute inset-0 bg-black/50 sm:bg-black/45 md:bg-black/40"></div>

            {/* Main Content - Mobile & Tablet Optimized */}
            <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-8 md:px-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                {/* Name - Responsive Typography with iPad optimization */}
                <motion.h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-white mb-4 sm:mb-8 md:mb-6 tracking-wide leading-tight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
                    VALENTINE DUTERTRE
                </motion.h1>

                {/* Title - Responsive Typography with iPad optimization */}
                <motion.p className="text-lg xl:text-2xl text-white mb-8 sm:mb-12 md:mb-16 font-light px-2 sm:px-4 md:px-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
                    Étudiante en 4e année d&apos;architecture d&apos;intérieur
                </motion.p>
            </motion.div>

            {/* About Me Section - Mobile & Tablet Optimized */}
            <motion.div className="z-10 absolute bottom-4 left-4 right-4 sm:bottom-6 md:bottom-8 sm:left-6 md:left-8 sm:right-6 md:right-auto sm:max-w-md md:max-w-lg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="bg-white/25 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-white border border-white/30">
                    <p className="text-xs sm:text-sm md:text-sm font-light leading-relaxed">
                        Étudiante en 4e année d&apos;architecture d&apos;intérieur, je suis passionnée par la conception d&apos;espaces uniques et fonctionnels. Curieuse et toujours à l&apos;écoute, j&apos;accorde une grande attention aux détails et aime apprendre et approfondir de nouvelles connaissances. <br className="hidden sm:block" />Mon objectif est de créer des environnements qui allient esthétique, innovation et bien-être.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
