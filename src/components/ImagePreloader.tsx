'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImagePreloaderProps {
    images: Array<{ src: string; alt: string }>;
}

export default function ImagePreloader({ images }: ImagePreloaderProps) {
    useEffect(() => {
        // Précharger toutes les images avec une gestion optimisée pour Safari
        const preloadImages = async () => {
            const imagePromises = images.map((image) => {
                return new Promise<void>((resolve) => {
                    const img = new window.Image();

                    // Styles de stabilisation Safari
                    img.style.transform = 'translateZ(0)';
                    img.style.backfaceVisibility = 'hidden';
                    img.style.webkitBackfaceVisibility = 'hidden';
                    img.style.webkitTransform = 'translateZ(0)';

                    img.onload = () => {
                        // Force la stabilisation après chargement
                        img.style.transform = 'translateZ(0)';
                        img.style.backfaceVisibility = 'hidden';
                        img.style.webkitBackfaceVisibility = 'hidden';
                        img.style.webkitTransform = 'translateZ(0)';
                        resolve();
                    };

                    img.onerror = () => {
                        // Gestion d'erreur silencieuse
                        resolve();
                    };

                    // Définir la source pour déclencher le chargement
                    img.src = image.src;
                });
            });

            // Attendre que toutes les images soient chargées
            await Promise.all(imagePromises);

            // Stabilisation finale pour Safari
            setTimeout(() => {
                const allImages = document.querySelectorAll('img');
                allImages.forEach((img) => {
                    img.style.transform = 'translateZ(0)';
                    img.style.backfaceVisibility = 'hidden';
                    img.style.webkitBackfaceVisibility = 'hidden';
                    img.style.webkitTransform = 'translateZ(0)';
                });
            }, 100);
        };

        preloadImages();
    }, [images]);

    return (
        <>
            {/* Images cachées pour préchargement - optimisées Safari */}
            <div
                className="hidden"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                    // Styles de stabilisation Safari
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translateZ(0)',
                }}
            >
                {images.map((image, index) => (
                    <Image
                        key={`preload-${index}`}
                        src={image.src}
                        alt={image.alt}
                        width={1}
                        height={1}
                        className="next-image"
                        style={{
                            // Styles de stabilisation Safari
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            WebkitTransform: 'translateZ(0)',
                            WebkitPerspective: '1000px',
                            perspective: '1000px',
                            willChange: 'transform',
                            // Taille minimale pour éviter les problèmes de rendu
                            minWidth: '1px',
                            minHeight: '1px',
                            maxWidth: '1px',
                            maxHeight: '1px',
                        }}
                    />
                ))}
            </div>
        </>
    );
}
