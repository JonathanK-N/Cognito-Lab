# Guide de Configuration CognitoLab

## Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14.0
- (Optionnel) Docker pour PostgreSQL

## Installation

### 1. Cloner le projet

```bash
git clone <repository-url>
cd Cognito-Lab
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données

#### Option A : PostgreSQL local

1. Créer une base de données PostgreSQL :
```sql
CREATE DATABASE cognitolab;
```

2. Configurer les variables d'environnement :
```bash
cd apps/api
cp env.example .env
```

3. Éditer `.env` avec vos paramètres :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/cognitolab"
JWT_SECRET="your-secret-key-change-in-production"
JWT_REFRESH_SECRET="your-refresh-secret-key-change-in-production"
OPENAI_API_KEY="your-openai-api-key"
CLIENT_URL="http://localhost:3000"
PORT=4000
```

#### Option B : Docker

```bash
docker run --name cognitolab-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=cognitolab -p 5432:5432 -d postgres:14
```

### 4. Initialiser la base de données

```bash
cd apps/api
npm run db:generate
npm run db:migrate
```

### 5. Démarrer les services

#### Développement (tous les services)

```bash
# À la racine du projet
npm run dev
```

#### Développement (services individuels)

```bash
# Terminal 1 - API
cd apps/api
npm run dev

# Terminal 2 - Web
cd apps/web
npm run dev
```

## Accès

- **Application Web** : http://localhost:3000
- **API** : http://localhost:4000
- **API Health Check** : http://localhost:4000/health
- **Prisma Studio** : `cd apps/api && npm run db:studio`

## Première utilisation

1. Créer un compte administrateur :
   - Via l'interface web (si disponible)
   - Ou directement en base de données

2. Se connecter avec vos identifiants

3. Commencer à créer des projets !

## Dépannage

### Erreur de connexion à la base de données

- Vérifier que PostgreSQL est démarré
- Vérifier les credentials dans `.env`
- Vérifier que la base de données existe

### Erreur de build

- Supprimer `node_modules` et réinstaller : `rm -rf node_modules && npm install`
- Vérifier les versions Node.js et npm
- Nettoyer les builds : `npm run clean`

### Erreur de port déjà utilisé

- Changer le port dans `.env` (API) ou `next.config.js` (Web)
- Ou arrêter le processus utilisant le port

## Production

Voir `ARCHITECTURE.md` pour les détails de déploiement.

