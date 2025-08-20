'use client';

import { useEffect } from 'react';

interface IntelligentAltUpdaterProps {
    imageElement: HTMLImageElement | null;
    fallbackAlt: string;
    imagePath: string;
}

export default function IntelligentAltUpdater({
    imageElement,
    fallbackAlt,
    imagePath
}: IntelligentAltUpdaterProps) {
    useEffect(() => {
        if (!imageElement) return;

        const updateAltIntelligently = async () => {
            try {
                // En développement local, utiliser le fallback intelligent
                if (process.env.NODE_ENV === 'development') {
                    const fileName = imagePath.split('/').pop() || '';
                    const intelligentDescription = generateLocalDescription(fileName);
                    imageElement.alt = intelligentDescription;
                } else {
                    // En production, essayer Cloudinary
                    const baseUrl = window.location.origin;
                    const fullImageUrl = `${baseUrl}${imagePath}`;

                    const response = await fetch('/api/analyze-image', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ imageUrl: fullImageUrl }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.description) {
                            imageElement.alt = data.description;
                        } else {
                            // Fallback si l'API échoue
                            const fileName = imagePath.split('/').pop() || '';
                            const intelligentDescription = generateLocalDescription(fileName);
                            imageElement.alt = intelligentDescription;
                        }
                    } else {
                        // Fallback si l'API échoue
                        const fileName = imagePath.split('/').pop() || '';
                        const intelligentDescription = generateLocalDescription(fileName);
                        imageElement.alt = intelligentDescription;
                    }
                }
            } catch (error) {
                console.log('Mise à jour alt échouée, utilisation du fallback');
                imageElement.alt = fallbackAlt;
            }
        };

        // Attendre que l'image soit chargée
        if (imageElement.complete) {
            updateAltIntelligently();
        } else {
            imageElement.addEventListener('load', updateAltIntelligently);
            return () => imageElement.removeEventListener('load', updateAltIntelligently);
        }
    }, [imageElement, fallbackAlt, imagePath]);

    // Fonction d'analyse locale basée sur le nom du fichier
    const generateLocalDescription = (fileName: string): string => {
        const name = fileName.toLowerCase();

        // Détecter les patterns dans le nom du fichier
        if (name.includes('arche') || name.includes('entrée') || name.includes('door')) {
            return "Entrée élégante avec arche architecturale distinctive et éclairage d'accent";
        }

        if (name.includes('intérieur') || name.includes('canapé') || name.includes('déco') || name.includes('furniture')) {
            return "Intérieur chaleureux avec mobilier contemporain et décoration soignée";
        }

        if (name.includes('vue') || name.includes('ensemble') || name.includes('panorama') || name.includes('overview')) {
            return "Vue d'ensemble panoramique de l'espace et de son ambiance";
        }

        if (name.includes('détail') || name.includes('close') || name.includes('detail')) {
            return "Détail finement travaillé et attentionné du projet";
        }

        if (name.includes('lumière') || name.includes('éclairage') || name.includes('light')) {
            return "Mise en lumière artistique et atmosphérique de l'espace";
        }

        // Description générique intelligente basée sur le contexte
        return "Image capturant l'essence et l'atmosphère unique du projet avec une composition soignée";
    };

    return null; // Ce composant ne rend rien visuellement
}
