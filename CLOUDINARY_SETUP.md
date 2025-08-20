# Configuration Cloudinary pour l'Analyse d'Images Intelligente

## 🚀 Installation

1. **Créer un compte Cloudinary** : https://cloudinary.com/
2. **Installer les dépendances** : `npm install cloudinary`

## ⚙️ Configuration

Créez un fichier `.env.local` à la racine du projet :

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🔑 Obtenir vos Credentials

1. Connectez-vous à votre dashboard Cloudinary
2. Allez dans "Settings" > "Access Keys"
3. Copiez vos credentials

## ✨ Fonctionnalités

- **Analyse automatique** des images
- **Génération intelligente** des descriptions
- **Détection d'objets** et de personnes
- **Analyse des couleurs** dominantes
- **Tags automatiques** avec Google Vision API
- **Fallback intelligent** en cas d'erreur

## 🎯 Utilisation

Le composant `IntelligentImageAlt` utilise automatiquement :
- L'API Cloudinary pour l'analyse
- Un système de fallback intelligent
- Des descriptions contextuelles

## 💡 Exemple d'Analyse

```typescript
// Input: Image d'une entrée avec arche
// Output: "Image présentant architecture, entrée, arche dans des tons neutre, chaud, moderne, capturant l'atmosphère et l'esthétique du projet."
```

## 🔒 Sécurité

- Les images sont analysées temporairement puis supprimées
- Aucune image n'est stockée sur Cloudinary
- Utilisation sécurisée des API keys
