import { NextRequest, NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder');

        if (!folder) {
            return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
        }

        // Chemin vers le dossier public
        const publicPath = join(process.cwd(), 'public', folder);

        try {
            // Lire le contenu du dossier
            const files = await readdir(publicPath);

            // Filtrer les fichiers d'images
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
            const imageFiles = files.filter(file =>
                imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
            );

            // Créer les objets d'images avec des descriptions intelligentes
            const images = imageFiles.map(file => {
                const fileName = file.toLowerCase();
                let alt = "Image du projet";

                // Générer des descriptions intelligentes basées sur le nom du fichier
                if (fileName.includes('arche') || fileName.includes('entrée') || fileName.includes('door')) {
                    alt = "Entrée élégante avec arche architecturale distinctive";
                } else if (fileName.includes('intérieur') || fileName.includes('canapé') || fileName.includes('déco')) {
                    alt = "Intérieur chaleureux avec mobilier et décoration";
                } else if (fileName.includes('vue') || fileName.includes('ensemble') || fileName.includes('panorama')) {
                    alt = "Vue d'ensemble panoramique de l'espace";
                } else if (fileName.includes('détail') || fileName.includes('close')) {
                    alt = "Détail finement travaillé du projet";
                } else if (fileName.includes('lumière') || fileName.includes('éclairage')) {
                    alt = "Mise en lumière artistique et atmosphérique";
                } else {
                    alt = `Vue supplémentaire du projet ${folder}`;
                }

                return {
                    src: `/${folder}/${file}`,
                    alt: alt
                };
            });

            return NextResponse.json({
                images,
                total: images.length,
                folder: folder
            });

        } catch (error) {
            // Si le dossier n'existe pas ou n'est pas accessible
            console.log(`Dossier ${folder} non accessible:`, error);
            return NextResponse.json({
                images: [],
                total: 0,
                folder: folder,
                error: 'Folder not accessible'
            }, { status: 404 });
        }

    } catch (error) {
        console.error('Error listing images:', error);
        return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
    }
}
