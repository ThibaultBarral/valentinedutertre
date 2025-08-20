import { NextRequest, NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/cloudinary';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
    try {
        // Validation du corps de la requête
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            console.error('Error parsing request body:', parseError);
            return NextResponse.json({
                error: 'Invalid JSON in request body',
                source: 'fallback',
                description: "Image capturant l'atmosphère et l'esthétique du projet"
            }, { status: 400 });
        }

        const { imageUrl } = body;

        if (!imageUrl) {
            return NextResponse.json({
                error: 'Image URL is required',
                source: 'fallback',
                description: "Image capturant l'atmosphère et l'esthétique du projet"
            }, { status: 400 });
        }

        // Si c'est une URL locale (commence par /), lire le fichier depuis public
        let imageBuffer: Buffer | undefined;
        if (imageUrl.startsWith('/')) {
            try {
                // Construire le chemin vers le dossier public
                const publicPath = join(process.cwd(), 'public');
                const imagePath = join(publicPath, imageUrl);

                // Lire le fichier image
                imageBuffer = await readFile(imagePath);
            } catch (fileError) {
                console.error('Error reading local image file:', fileError);
                // En cas d'erreur de lecture, utiliser le fallback
                return NextResponse.json({
                    description: "Image capturant l'atmosphère et l'esthétique du projet",
                    source: 'fallback',
                    error: 'Local file read failed, using fallback description'
                }, { status: 200 });
            }
        }

        // Analyser l'image avec Cloudinary
        const analysis = await analyzeImage(imageUrl, imageBuffer);

        return NextResponse.json({
            description: analysis.description,
            tags: analysis.tags,
            colors: analysis.colors,
            objects: analysis.objects,
            confidence: analysis.confidence,
            source: 'cloudinary-ai'
        });

    } catch (error) {
        console.error('Error analyzing image:', error);

        // En cas d'erreur, retourner une description de fallback
        return NextResponse.json({
            description: "Image capturant l'atmosphère et l'esthétique du projet",
            source: 'fallback',
            error: 'Analysis failed, using fallback description'
        }, { status: 200 }); // Status 200 pour ne pas casser l'interface
    }
}
