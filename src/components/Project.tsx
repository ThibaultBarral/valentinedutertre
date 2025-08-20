'use client';

import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';
import ProjectGallery from './ProjectGallery';

interface ProjectProps {
    id: string;
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    imagesFolder: string; // Chemin vers le dossier des images
    imageNames: string[]; // Noms des 3 images dans l'ordre souhaité
    layout?: 'default' | 'alternate'; // Disposition des éléments
}

export default function Project({
    title,
    subtitle,
    description1,
    description2,
    imagesFolder,
    imageNames,
    layout = 'default'
}: ProjectProps) {
    // Construction dynamique des chemins d'images
    const imagePaths = useMemo(() => ({
        image1: `/${imagesFolder}/${imageNames[0]}`,
        image2: `/${imagesFolder}/${imageNames[1]}`,
        image3: `/${imagesFolder}/${imageNames[2]}`,
    }), [imagesFolder, imageNames]);

    // États pour les descriptions dynamiques des images
    const [dynamicAlts, setDynamicAlts] = useState({
        image1: `Vue du projet ${imagesFolder}`,
        image2: `Vue du projet ${imagesFolder}`,
        image3: `Vue du projet ${imagesFolder}`
    });

    // Générer les descriptions dynamiques pour les 3 images principales
    useEffect(() => {
        const generateDynamicAlts = async () => {
            try {
                // Appeler l'API pour analyser les 3 images principales
                const promises = imageNames.slice(0, 3).map(async (imageName, index) => {
                    const imagePath = `/${imagesFolder}/${imageName}`;

                    try {
                        const response = await fetch('/api/analyze-image', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ imageUrl: imagePath }),
                        });

                        if (response.ok) {
                            const data = await response.json();
                            return { index, alt: data.description };
                        }
                    } catch (error) {
                        console.log(`Erreur analyse image ${index + 1}:`, error);
                    }

                    // Fallback basé sur le nom du fichier
                    const fileName = imageName.toLowerCase();
                    let fallbackAlt = `Vue du projet ${imagesFolder}`;

                    if (fileName.includes('arche') || fileName.includes('entrée')) {
                        fallbackAlt = `Entrée architecturale distinctive du projet ${imagesFolder}`;
                    } else if (fileName.includes('intérieur') || fileName.includes('canapé')) {
                        fallbackAlt = `Intérieur chaleureux du projet ${imagesFolder}`;
                    } else if (fileName.includes('vue') || fileName.includes('ensemble')) {
                        fallbackAlt = `Vue d'ensemble du projet ${imagesFolder}`;
                    }

                    return { index, alt: fallbackAlt };
                });

                const results = await Promise.all(promises);
                const newAlts = { ...dynamicAlts };

                results.forEach(result => {
                    if (result.index === 0) newAlts.image1 = result.alt;
                    if (result.index === 1) newAlts.image2 = result.alt;
                    if (result.index === 2) newAlts.image3 = result.alt;
                });

                setDynamicAlts(newAlts);
            } catch (error) {
                console.log('Erreur génération alts dynamiques:', error);
            }
        };

        generateDynamicAlts();
    }, [imagesFolder, imageNames, dynamicAlts]);

    // Composant Image avec zoom et overlay - Mobile Optimized
    const ImageWithOverlay = ({ src, alt, className, fancyboxSrc, fancyboxCaption }: {
        src: string;
        alt: string;
        className: string;
        fancyboxSrc: string;
        fancyboxCaption: string;
    }) => (
        <div
            className={`relative overflow-hidden cursor-pointer group ${className}`}
            data-fancybox="gallery"
            data-src={fancyboxSrc}
            data-caption={fancyboxCaption}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Overlay pour améliorer la visibilité */}
            <div className="absolute inset-0 bg-black/10"></div>
            {/* Icône de zoom - Mobile Optimized */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 sm:bg-white/80 rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
            </div>
        </div>
    );

    // Composant de contenu textuel - Mobile Optimized
    const TextContent = ({ isAlternate = false }: { isAlternate?: boolean }) => (
        <div className={`flex flex-col justify-center p-4 sm:p-6 lg:p-8 xl:p-12 max-w-full lg:max-w-xl xl:max-w-2xl ${isAlternate ? 'lg:ml-32 xl:ml-64' : ''}`}>
            {/* Titre principal - Responsive Typography */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-2 sm:mb-3 leading-tight">
                {title}
            </h2>

            {/* Sous-titre - Responsive Typography */}
            <p className="text-xs sm:text-sm lg:text-base font-medium mb-4 sm:mb-6 tracking-wider uppercase">
                {subtitle}
            </p>

            {/* Description - Responsive Typography */}
            <div className="text-xs sm:text-xs lg:text-sm text-gray-600 mb-4 leading-relaxed font-light">
                <p className="mb-2 sm:mb-3">
                    {description1}
                </p>
                <p>
                    {description2}
                </p>
            </div>
        </div>
    );

    if (layout === 'alternate') {
        // Disposition alternative : image2, image1, text, image3 - Mobile Optimized
        return (
            <section className="py-4 sm:py-6 px-2 sm:px-6">
                {/* Layout Mobile : 3 images puis texte */}
                <div className="lg:hidden space-y-4">
                    {/* Image 1 */}
                    <ImageWithOverlay
                        src={imagePaths.image1}
                        alt={dynamicAlts.image1}
                        className="h-[300px] w-full"
                        fancyboxSrc={imagePaths.image1}
                        fancyboxCaption={dynamicAlts.image1}
                    />

                    {/* Image 2 */}
                    <ImageWithOverlay
                        src={imagePaths.image2}
                        alt={dynamicAlts.image2}
                        className="h-[300px] w-full"
                        fancyboxSrc={imagePaths.image2}
                        fancyboxCaption={dynamicAlts.image2}
                    />

                    {/* Image 3 */}
                    <ImageWithOverlay
                        src={imagePaths.image3}
                        alt={dynamicAlts.image3}
                        className="h-[300px] w-full"
                        fancyboxSrc={imagePaths.image3}
                        fancyboxCaption={dynamicAlts.image3}
                    />

                    {/* Contenu textuel */}
                    <TextContent isAlternate={false} />
                </div>

                {/* Layout Desktop : disposition alternative originale */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_auto] gap-6">
                    {/* Image 2 - Prend le reste de l'espace */}
                    <ImageWithOverlay
                        src={imagePaths.image2}
                        alt={dynamicAlts.image2}
                        className="h-[450px] w-full"
                        fancyboxSrc={imagePaths.image2}
                        fancyboxCaption={dynamicAlts.image2}
                    />

                    {/* Image 1 - Carré */}
                    <ImageWithOverlay
                        src={imagePaths.image1}
                        alt={dynamicAlts.image1}
                        className="h-[450px] w-[500px]"
                        fancyboxSrc={imagePaths.image1}
                        fancyboxCaption={dynamicAlts.image1}
                    />

                    {/* Contenu textuel */}
                    <TextContent isAlternate={true} />

                    {/* Image 3 - Troisième carré */}
                    <ImageWithOverlay
                        src={imagePaths.image3}
                        alt={dynamicAlts.image3}
                        className="h-[450px] w-[500px]"
                        fancyboxSrc={imagePaths.image3}
                        fancyboxCaption={dynamicAlts.image3}
                    />
                </div>

                {/* Galerie Fancybox cachée */}
                <ProjectGallery
                    imagesFolder={imagesFolder}
                    imageNames={imageNames}
                />
            </section>
        );
    }

    // Disposition par défaut : image1, image2, image3, text - Mobile Optimized
    return (
        <section className="py-4 sm:py-6 px-2 sm:px-6">
            {/* Layout Mobile : 3 images puis texte */}
            <div className="lg:hidden space-y-4">
                {/* Image 1 */}
                <ImageWithOverlay
                    src={imagePaths.image1}
                    alt={dynamicAlts.image1}
                    className="h-[300px] w-full"
                    fancyboxSrc={imagePaths.image1}
                    fancyboxCaption={dynamicAlts.image1}
                />

                {/* Image 2 */}
                <ImageWithOverlay
                    src={imagePaths.image2}
                    alt={dynamicAlts.image2}
                    className="h-[300px] w-full"
                    fancyboxSrc={imagePaths.image2}
                    fancyboxCaption={dynamicAlts.image2}
                />

                {/* Image 3 */}
                <ImageWithOverlay
                    src={imagePaths.image3}
                    alt={dynamicAlts.image3}
                    className="h-[300px] w-full"
                    fancyboxSrc={imagePaths.image3}
                    fancyboxCaption={dynamicAlts.image3}
                />

                {/* Contenu textuel */}
                <TextContent isAlternate={false} />
            </div>

            {/* Layout Desktop : grille complexe originale */}
            <div className="hidden lg:grid lg:grid-cols-[auto_1fr] gap-6">
                {/* Image 1 - Carré */}
                <ImageWithOverlay
                    src={imagePaths.image1}
                    alt={dynamicAlts.image1}
                    className="h-[450px] w-[500px]"
                    fancyboxSrc={imagePaths.image1}
                    fancyboxCaption={dynamicAlts.image1}
                />

                {/* Image 2 - Prend le reste de l'espace */}
                <ImageWithOverlay
                    src={imagePaths.image2}
                    alt={dynamicAlts.image2}
                    className="h-[450px] w-full"
                    fancyboxSrc={imagePaths.image2}
                    fancyboxCaption={dynamicAlts.image2}
                />

                {/* Image 3 - Troisième carré */}
                <ImageWithOverlay
                    src={imagePaths.image3}
                    alt={dynamicAlts.image3}
                    className="h-[450px] w-[500px]"
                    fancyboxSrc={imagePaths.image3}
                    fancyboxCaption={dynamicAlts.image3}
                />

                {/* Contenu textuel - Titre, sous-titre et description */}
                <TextContent isAlternate={false} />
            </div>

            {/* Galerie Fancybox cachée */}
            <ProjectGallery
                imagesFolder={imagesFolder}
                imageNames={imageNames}
            />
        </section>
    );
}
