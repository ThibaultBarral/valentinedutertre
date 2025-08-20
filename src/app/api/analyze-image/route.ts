import { NextRequest, NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
        }

        // Analyser l'image avec Cloudinary
        const analysis = await analyzeImage(imageUrl);

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
