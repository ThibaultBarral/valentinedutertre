export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description1: string;
    description2?: string; // Rendre optionnel avec le point d'interrogation
    imagesFolder: string; // Chemin vers le dossier des images
    imageNames: string[]; // Noms des 3 images dans l'ordre souhaité
    layout?: 'default' | 'alternate'; // Disposition des éléments
}

export const projects: Project[] = [
    {
        id: "atelier-popus",
        title: "L'Atelier Popus",
        subtitle: "POP-UP STORE IMMERSIF",
        description1: "Conçu pour le salon Maison & Objet, L'Atelier Popus réinvente la découverte de Popus Édition à travers une expérience interactive et immersive. Pensé comme un intérieur chaleureux, ce pop-up store plonge les visiteurs dans un univers coloré et artisanal, fidèle à l'esthétique de la marque.",
        description2: "Le parcours mêle scénographie d'un lieu de vie, atelier interactif pour expérimenter les motifs et bornes digitales permettant de personnaliser des articles. Entre références rétro et approche contemporaine, L'Atelier Popus offre une découverte vivante et créative de la marque.",
        imagesFolder: "atelier-popus",
        imageNames: [
            "d61e35_6b12556100cc4165b73018a381ae0f99~mv2.jpeg",
            "d61e35_16d12c16f4e9474e8f9f6cc8aac86b6f~mv2.jpg",
            "d61e35_4bdc94735bb14216aaf335c864cb55f1~mv2.jpeg"
        ],
        layout: 'default' // Utiliser la disposition alternative
    },
    {
        id: "ecrin-particulier",
        title: "L'Écrin Particulier",
        subtitle: "BOUTIQUE-HÔTEL",
        description1: "Niché dans une ancienne église, L’Écrin Particulier réinvente l’élégance de l’hôtel particulier et le raffinement de la maison bourgeoise. Ce lieu d’exception mêle ancien et moderne, offrant une atmosphère unique.",
        description2: "À travers des visuels 3D immersifs, découvrez une entrée majestueuse, une chambre raffinée, une suite boudoir élégante et un jardin d’hiver lumineux, sublimant l’architecture d’origine avec un design harmonieux et intemporel.",
        imagesFolder: "ecrin-particulier",
        imageNames: [
            "d61e35_4f58d2fe113844e4b64deaf5c8b697ba~mv2.jpeg",
            "d61e35_9e23b053acc443c9b4ffe1082a40d3a2~mv2.jpeg",
            "d61e35_8f70e18e9cc74dcd9ffdcb7c41c553f5~mv2.jpeg"
        ],
        layout: 'alternate' // Utiliser la disposition alternative
    },
    {
        id: "salon",
        title: "Salon",
        subtitle: "Stage de 2ème année",
        description1: "Dans le cadre de mon stage de 2ème année, j’ai réalisé des visuels 3D pour l’aménagement d’un salon. Ce projet allie esthétique et confort, en mettant en valeur les matériaux, les textures et la lumière pour créer un espace harmonieux et chaleureux.​",
        imagesFolder: "salon",
        imageNames: [
            "d61e35_43a8ccb8d91544f3971ce7bc9dc0e25f~mv2.jpeg",
            "d61e35_64ab8bd5b76a4be892509928f2769870~mv2.jpeg",
            "d61e35_cf4512769dd04144ae1639c2e6390e54~mv2.jpeg"
        ],
        layout: 'default' // Utiliser la disposition alternative
    },
    {
        id: "salle-de-bain",
        title: "Salle de bain",
        subtitle: "Stage de 2ème année",
        description1: "Dans le cadre de mon stage de 2ème année, j’ai réalisé des visuels 3D pour aménager une salle de bain. J’y ai ajouté du carrelage zellige, qui apporte du cachet à l’espace, tout en créant une ambiance élégante, avec une attention particulière à la lumière et aux matériaux.",
        imagesFolder: "salle-de-bain",
        imageNames: [
            "d61e35_739e829c958140deb16521c62b0a4e98~mv2.png",
            "d61e35_06907a06eb2c496698f0f5254dcd1208~mv2.png",
            "d61e35_09e46632b7664d1a9b886819da19351a~mv2.png"
        ],
        layout: 'alternate' // Utiliser la disposition alternative
    }
];

export function getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
}

export function getAllProjects(): Project[] {
    return projects;
}
