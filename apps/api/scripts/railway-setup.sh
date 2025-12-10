#!/bin/bash
# Script de configuration Railway pour l'API

echo "🚀 Configuration Railway pour l'API CognitoLab..."

# Vérifier que DATABASE_URL est défini
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERREUR: DATABASE_URL n'est pas défini"
  exit 1
fi

# Générer le client Prisma
echo "📦 Génération du client Prisma..."
npm run db:generate

# Exécuter les migrations
echo "🔄 Exécution des migrations..."
npm run db:migrate

echo "✅ Configuration terminée !"

