// Configuration globale du site
export const siteConfig = {
    // Désactiver l'API d'analyse d'images pour éviter les appels répétés
    disableImageAnalysis: false,

    // Optimisations Safari
    safariOptimizations: {
        enabled: true,
        hardwareAcceleration: true,
        backfaceVisibility: true,
        perspective: true,
    },

    // Configuration des images
    images: {
        quality: 85,
        placeholder: 'blur',
        loading: 'lazy' as const,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },

    // Configuration Fancybox
    fancybox: {
        transitionEffect: 'fade',
        transitionDuration: 300,
        dragToClose: false,
    },
};

// Fonction utilitaire pour vérifier si une fonctionnalité est activée
export const isFeatureEnabled = (feature: keyof typeof siteConfig) => {
    return siteConfig[feature] !== false;
};
