import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary (à configurer avec vos credentials)
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface ImageAnalysis {
    description: string;
    tags: string[];
    colors: string[];
    objects: string[];
    confidence: number;
}

interface CloudinaryAnalysis {
    face_count?: number;
    object_detection?: Array<{ name: string; confidence: number }>;
}

interface CloudinaryUploadResult {
    analysis?: CloudinaryAnalysis;
    tags?: string[];
    colors?: Array<[string, number]>;
    public_id: string;
}

export async function analyzeImage(imageUrl: string): Promise<ImageAnalysis> {
    try {
        // Upload temporaire de l'image pour l'analyse
        const uploadResult: CloudinaryUploadResult = await cloudinary.uploader.upload(imageUrl, {
            resource_type: 'image',
            analysis: true,
            categorization: 'google_tagging',
            auto_tagging: 0.6,
        });

        // Extraire les informations d'analyse
        const analysis = uploadResult.analysis || {};
        const tags = uploadResult.tags || [];
        const colors = uploadResult.colors || [];

        // Générer une description intelligente
        const description = generateDescription(analysis, tags, colors);

        // Nettoyer l'image temporaire
        await cloudinary.uploader.destroy(uploadResult.public_id);

        return {
            description,
            tags: tags.slice(0, 10), // Limiter à 10 tags
            colors: colors.slice(0, 5).map(color => color[0]), // Extraire juste les noms de couleurs
            objects: extractObjects(analysis),
            confidence: calculateConfidence(analysis),
        };

    } catch (error) {
        console.error('Cloudinary analysis failed:', error);

        // Fallback : analyse basée sur le nom du fichier
        return fallbackAnalysis(imageUrl);
    }
}

function generateDescription(analysis: CloudinaryAnalysis, tags: string[], colors: string[]): string {
    const dominantColors = colors.slice(0, 3);
    const mainTags = tags.slice(0, 5);

    let description = "Image ";

    if (mainTags.length > 0) {
        description += `présentant ${mainTags.join(', ')}`;
    }

    if (dominantColors.length > 0) {
        description += ` dans des tons ${dominantColors.join(', ')}`;
    }

    if (analysis.face_count && analysis.face_count > 0) {
        description += ` avec ${analysis.face_count} personne${analysis.face_count > 1 ? 's' : ''}`;
    }

    description += ", capturant l'atmosphère et l'esthétique du projet.";

    return description;
}

function extractObjects(analysis: CloudinaryAnalysis): string[] {
    const objects: string[] = [];

    if (analysis.object_detection) {
        analysis.object_detection.forEach((obj) => {
            if (obj.confidence > 0.7) {
                objects.push(obj.name);
            }
        });
    }

    return objects;
}

function calculateConfidence(analysis: CloudinaryAnalysis): number {
    let confidence = 0.5; // Base

    if (analysis.face_count !== undefined) confidence += 0.1;
    if (analysis.object_detection) confidence += 0.2;

    return Math.min(confidence, 1.0);
}

function fallbackAnalysis(imageUrl: string): ImageAnalysis {
    const fileName = imageUrl.split('/').pop() || '';
    const name = fileName.toLowerCase();

    let description = "Image capturant l'essence du projet";
    let tags: string[] = [];

    if (name.includes('arche') || name.includes('entrée')) {
        description = "Entrée architecturale distinctive avec arche élégante";
        tags = ['architecture', 'entrée', 'arche', 'design'];
    } else if (name.includes('intérieur') || name.includes('canapé')) {
        description = "Intérieur chaleureux avec mobilier et décoration soignés";
        tags = ['intérieur', 'mobilier', 'décoration', 'ambiance'];
    } else if (name.includes('vue') || name.includes('ensemble')) {
        description = "Vue d'ensemble panoramique de l'espace";
        tags = ['panorama', 'vue', 'espace', 'perspective'];
    }

    return {
        description,
        tags,
        colors: ['neutre', 'chaud', 'moderne'],
        objects: ['espace', 'décoration'],
        confidence: 0.6,
    };
}
