'use client';

import { useEffect, useState } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import ImagePreloader from './ImagePreloader';

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
            } catch (error) {
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
                zIndex: -1
            }}>
                {allImages.map((image, index) => (
                    <img
                        key={`thumb-${index}`}
                        src={image.src}
                        alt={image.alt}
                        width="50"
                        height="50"
                        style={{
                            objectFit: 'cover',
                            margin: '2px',
                            display: 'inline-block'
                        }}
                    />
                ))}
            </div>
        </>
    );
}
