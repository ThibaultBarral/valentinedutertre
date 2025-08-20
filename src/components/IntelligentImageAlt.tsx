'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface IntelligentImageAltProps {
    src: string;
    fallbackAlt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
}

export default function IntelligentImageAlt({
    src,
    fallbackAlt,
    className = "object-cover",
    fill = false,
    width,
    height,
    priority = false
}: IntelligentImageAltProps) {
    const [intelligentAlt, setIntelligentAlt] = useState<string>(fallbackAlt);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

    useEffect(() => {
        const analyzeImage = async () => {
            if (!src || src.startsWith('data:')) return;

            setIsAnalyzing(true);

            try {
                // En développement local, utiliser le fallback intelligent
                // En production, utiliser Cloudinary si disponible
                if (process.env.NODE_ENV === 'development') {
                    const fileName = src.split('/').pop() || '';
                    const intelligentDescription = generateLocalDescription(fileName);
                    setIntelligentAlt(intelligentDescription);
                } else {
                    // En production, essayer Cloudinary
                    const baseUrl = window.location.origin;
                    const fullImageUrl = `${baseUrl}${src}`;

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
                            setIntelligentAlt(data.description);
                        } else {
                            // Fallback si l'API échoue
                            const fileName = src.split('/').pop() || '';
                            const intelligentDescription = generateLocalDescription(fileName);
                            setIntelligentAlt(intelligentDescription);
                        }
                    } else {
                        // Fallback si l'API échoue
                        const fileName = src.split('/').pop() || '';
                        const intelligentDescription = generateLocalDescription(fileName);
                        setIntelligentAlt(intelligentDescription);
                    }
                }

            } catch (error) {
                console.log('Analyse échouée, utilisation du fallback');
                setIntelligentAlt(fallbackAlt);
            } finally {
                setIsAnalyzing(false);
            }
        };

        analyzeImage();
    }, [src, fallbackAlt]);

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

    const imageProps = {
        src,
        alt: intelligentAlt,
        className,
        priority,
        ...(fill ? { fill: true } : { width, height })
    };

    return (
        <div className="relative w-full h-full">
            <Image {...imageProps} />
            {isAnalyzing && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    IA...
                </div>
            )}
        </div>
    );
}
