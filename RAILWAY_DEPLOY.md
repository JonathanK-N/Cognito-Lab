# Guide de Déploiement Railway pour CognitoLab

## 🚂 Déploiement sur Railway

Railway est une plateforme de déploiement moderne qui supporte les monorepos. Ce guide vous explique comment déployer CognitoLab sur Railway.

## 📋 Prérequis

1. Compte Railway (https://railway.app)
2. GitHub repository avec le code
3. Railway CLI (optionnel) : `npm i -g @railway/cli`

## 🚀 Déploiement Rapide

### Option 1 : Via l'Interface Web Railway

1. **Créer un nouveau projet**
   - Aller sur https://railway.app
   - Cliquer sur "New Project"
   - Sélectionner "Deploy from GitHub repo"
   - Choisir votre repository CognitoLab

2. **Configurer PostgreSQL**
   - Dans votre projet Railway, cliquer sur "+ New"
   - Sélectionner "Database" → "PostgreSQL"
   - Railway créera automatiquement une base de données

3. **Déployer l'API**
   - Cliquer sur "+ New" → "GitHub Repo"
   - Sélectionner votre repo
   - Railway détectera automatiquement `apps/api`
   - **Root Directory** : `/apps/api`
   - **Build Command** : `cd ../.. && npm install && cd apps/api && npm run build`
   - **Start Command** : `node dist/index.js`

4. **Configurer les Variables d'Environnement pour l'API**
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-secret-key-change-in-production
   JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
   OPENAI_API_KEY=your-openai-api-key
   CLIENT_URL=https://your-web-app.railway.app
   PORT=4000
   NODE_ENV=production
   ```

5. **Déployer l'Application Web**
   - Cliquer sur "+ New" → "GitHub Repo"
   - Sélectionner votre repo
   - **Root Directory** : `/apps/web`
   - **Build Command** : `cd ../.. && npm install && cd apps/web && npm run build`
   - **Start Command** : `npm run start`

6. **Configurer les Variables d'Environnement pour le Web**
   ```
   NEXT_PUBLIC_API_URL=https://your-api.railway.app/api
   NEXT_PUBLIC_SOCKET_URL=https://your-api.railway.app
   NODE_ENV=production
   PORT=3000
   ```

7. **Exécuter les Migrations**
   - Dans l'onglet "Deployments" de l'API
   - Ouvrir un terminal
   - Exécuter : `npm run db:migrate`

### Option 2 : Via Railway CLI

```bash
# Installer Railway CLI
npm i -g @railway/cli

# Se connecter
railway login

# Initialiser le projet
railway init

# Lier à un projet existant ou créer un nouveau
railway link

# Ajouter PostgreSQL
railway add postgresql

# Déployer l'API
cd apps/api
railway up

# Déployer le Web
cd ../web
railway up
```

## 🔧 Configuration Détaillée

### Structure des Services Railway

Railway détectera automatiquement les services dans votre monorepo. Vous pouvez aussi créer un fichier `railway.json` à la racine pour configurer le build.

### Variables d'Environnement

#### API Service

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `${{Postgres.DATABASE_URL}}` |
| `JWT_SECRET` | Secret pour JWT | Générer avec `openssl rand -base64 32` |
| `JWT_REFRESH_SECRET` | Secret pour refresh tokens | Générer avec `openssl rand -base64 32` |
| `OPENAI_API_KEY` | Clé API OpenAI | `sk-...` |
| `CLIENT_URL` | URL de l'app web | `https://your-web.railway.app` |
| `PORT` | Port du serveur | `4000` |
| `NODE_ENV` | Environnement | `production` |

#### Web Service

| Variable | Description | Exemple |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL de l'API | `https://your-api.railway.app/api` |
| `NEXT_PUBLIC_SOCKET_URL` | URL Socket.IO | `https://your-api.railway.app` |
| `NODE_ENV` | Environnement | `production` |
| `PORT` | Port du serveur | `3000` |

### Migrations de Base de Données

Les migrations doivent être exécutées après le premier déploiement :

```bash
# Via Railway CLI
railway run npm run db:migrate

# Ou via l'interface web
# Terminal → Exécuter : npm run db:migrate
```

### Health Checks

Railway vérifie automatiquement la santé des services :
- **API** : `GET /health`
- **Web** : `GET /`

## 🔐 Sécurité

1. **Générer des secrets forts** :
   ```bash
   openssl rand -base64 32  # Pour JWT_SECRET
   openssl rand -base64 32  # Pour JWT_REFRESH_SECRET
   ```

2. **Ne jamais commiter les secrets** dans Git

3. **Utiliser Railway Variables** pour tous les secrets

4. **Activer HTTPS** (automatique sur Railway)

## 📊 Monitoring

Railway fournit :
- Logs en temps réel
- Métriques de performance
- Alertes en cas d'erreur
- Historique des déploiements

## 🔄 Déploiement Continu

Railway déploie automatiquement à chaque push sur la branche principale si vous avez connecté votre repo GitHub.

Pour déployer manuellement :
```bash
railway up
```

## 🐛 Dépannage

### Erreur de Build

1. Vérifier les logs dans Railway
2. Vérifier que toutes les dépendances sont dans `package.json`
3. Vérifier les versions Node.js (>= 18)

### Erreur de Connexion Base de Données

1. Vérifier que `DATABASE_URL` est correctement configuré
2. Vérifier que PostgreSQL est démarré
3. Vérifier les migrations : `railway run npm run db:migrate`

### Erreur CORS

1. Vérifier que `CLIENT_URL` dans l'API correspond à l'URL du web
2. Vérifier la configuration CORS dans `apps/api/src/index.ts`

### Port déjà utilisé

Railway assigne automatiquement les ports. Utilisez la variable d'environnement `PORT` si nécessaire.

## 📈 Scaling

Railway permet de :
- Augmenter les ressources (CPU, RAM)
- Activer l'auto-scaling
- Configurer des régions spécifiques

## 💰 Coûts

Railway offre :
- Plan gratuit avec $5 de crédit/mois
- Pay-as-you-go pour usage supplémentaire
- PostgreSQL inclus dans le plan

## 🔗 Liens Utiles

- [Documentation Railway](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Exemples Railway](https://github.com/railwayapp/railway-examples)

## ✅ Checklist de Déploiement

- [ ] Compte Railway créé
- [ ] Repository GitHub connecté
- [ ] PostgreSQL créé et configuré
- [ ] API déployée avec variables d'environnement
- [ ] Web déployée avec variables d'environnement
- [ ] Migrations exécutées
- [ ] Health checks passent
- [ ] Tests de connexion API/Web
- [ ] Tests d'authentification
- [ ] Domaines personnalisés configurés (optionnel)

## 🎉 C'est Prêt !

Votre application CognitoLab devrait maintenant être déployée sur Railway. Accédez à vos URLs Railway pour tester.

