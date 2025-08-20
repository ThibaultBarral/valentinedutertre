'use client';

import { useEffect, useState } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import ImagePreloader from './ImagePreloader';
import Image from 'next/image';

interface ProjectGalleryProps {
    imagesFolder: string;
    imageNames: string[];
}

export default function ProjectGallery({ imagesFolder, imageNames }: ProjectGalleryProps) {
    const [allImages, setAllImages] = useState<Array<{ src: string; alt: string }>>([]);

    useEffect(() => {
        // Charger toutes les images du dossier
        const loadAllImages = async () => {
            try {
                // Essayer de récupérer la liste complète des images du dossier
                const response = await fetch(`/api/list-images?folder=${imagesFolder}`);
                if (response.ok) {
                    const data = await response.json();
                    setAllImages(data.images);
                } else {
                    // Fallback : utiliser les 3 images connues + essayer de deviner d'autres
                    const fallbackImages = [
                        { src: `/${imagesFolder}/${imageNames[0]}`, alt: `Vue supplémentaire du projet ${imagesFolder}` },
                        { src: `/${imagesFolder}/${imageNames[1]}`, alt: `Vue supplémentaire du projet ${imagesFolder}` },
                        { src: `/${imagesFolder}/${imageNames[2]}`, alt: `Vue supplémentaire du projet ${imagesFolder}` },
                    ];

                    // Essayer d'ajouter d'autres images communes
                    const commonExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
                    const commonPatterns = ['image4', 'image5', 'image6', 'detail', 'overview', 'interior', 'exterior'];

                    commonPatterns.forEach(pattern => {
                        commonExtensions.forEach(ext => {
                            fallbackImages.push({
                                src: `/${imagesFolder}/${pattern}${ext}`,
                                alt: `Vue supplémentaire du projet ${imagesFolder}`
                            });
                        });
                    });

                    setAllImages(fallbackImages);
                }
            } catch {
                console.log('Impossible de charger la liste des images, utilisation du fallback');
                // Utiliser les 3 images connues
                setAllImages([
                    { src: `/${imagesFolder}/${imageNames[0]}`, alt: `Vue supplémentaire du projet ${imagesFolder}` },
                    { src: `/${imagesFolder}/${imageNames[1]}`, alt: `Vue supplémentaire du projet ${imagesFolder}` },
                    { src: `/${imagesFolder}/${imageNames[2]}`, alt: `Vue supplémentaire du projet ${imagesFolder}` },
                ]);
            }
        };

        loadAllImages();
    }, [imagesFolder, imageNames]);

    useEffect(() => {
        // Initialiser Fancybox avec toutes les images
        if (allImages.length > 0) {
            // Attendre que toutes les images soient chargées
            const timer = setTimeout(() => {
                Fancybox.bind('[data-fancybox="gallery"]');

                // Stabilisation Safari après initialisation
                setTimeout(() => {
                    const fancyboxImages = document.querySelectorAll('.fancybox__content img');
                    fancyboxImages.forEach((img: Element) => {
                        if (img instanceof HTMLImageElement) {
                            img.style.transform = 'translateZ(0)';
                            img.style.backfaceVisibility = 'hidden';
                            img.style.webkitBackfaceVisibility = 'hidden';
                            img.style.webkitTransform = 'translateZ(0)';
                        }
                    });
                }, 1500);
            }, 1000); // Attendre 1 seconde pour que les images se chargent

            return () => clearTimeout(timer);
        }

        // Cleanup
        return () => {
            Fancybox.destroy();
        };
    }, [allImages]);

    return (
        <>
            {/* Précharger toutes les images pour améliorer les vignettes */}
            <ImagePreloader images={allImages} />

            {/* Images cachées pour Fancybox - toutes les images du projet */}
            <div className="hidden">
                {allImages.map((image, index) => (
                    <a
                        key={index}
                        data-fancybox="gallery"
                        data-src={image.src}
                        data-caption={image.alt}
                        data-thumb={image.src}
                        href={image.src}
                        style={{
                            // Styles de stabilisation Safari
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            WebkitTransform: 'translateZ(0)',
                        }}
                    >
                        {/* Lien caché pour Fancybox */}
                    </a>
                ))}
            </div>

            {/* Images visibles mais très petites pour que Fancybox puisse générer les vignettes */}
            <div style={{
                position: 'fixed',
                left: '-9999px',
                top: '-9999px',
                width: '200px',
                height: '200px',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: -1,
                // Styles de stabilisation Safari
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'translateZ(0)',
            }}>
                {allImages.map((image, index) => (
                    <Image
                        key={`thumb-${index}`}
                        src={image.src}
                        alt={image.alt}
                        width={50}
                        height={50}
                        className="next-image"
                        style={{
                            objectFit: 'cover',
                            margin: '2px',
                            display: 'inline-block',
                            // Styles de stabilisation Safari
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            WebkitTransform: 'translateZ(0)',
                            WebkitPerspective: '1000px',
                            perspective: '1000px',
                            willChange: 'transform',
                        }}
                    />
                ))}
            </div>
        </>
    );
}
