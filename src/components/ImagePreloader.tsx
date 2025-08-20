'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
    images: Array<{ src: string; alt: string }>;
}

export default function ImagePreloader({ images }: ImagePreloaderProps) {
    useEffect(() => {
        // Précharger toutes les images pour améliorer les vignettes Fancybox
        const preloadImages = () => {
            images.forEach(image => {
                const img = new Image();
                img.src = image.src;
                img.alt = image.alt;
                // Les images sont automatiquement mises en cache par le navigateur
            });
        };

        if (images.length > 0) {
            preloadImages();
        }
    }, [images]);

    return null; // Ce composant ne rend rien visuellement
}
