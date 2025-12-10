# ✅ Checklist de Déploiement Railway

## Avant le Déploiement

### Préparation du Code
- [ ] Tous les fichiers sont commités et pushés sur GitHub
- [ ] Les tests passent localement
- [ ] Le build fonctionne localement (`npm run build`)
- [ ] Les variables d'environnement sont documentées

### Configuration Railway
- [ ] Compte Railway créé
- [ ] Projet Railway créé
- [ ] Repository GitHub connecté

## Déploiement de la Base de Données

- [ ] Service PostgreSQL créé dans Railway
- [ ] Variable `DATABASE_URL` notée (sera utilisée pour l'API)

## Déploiement de l'API

- [ ] Service API créé depuis GitHub repo
- [ ] **Root Directory** configuré : `/apps/api`
- [ ] **Build Command** : `cd ../.. && npm install && cd apps/api && npm run build`
- [ ] **Start Command** : `node dist/index.js`
- [ ] Variables d'environnement configurées :
  - [ ] `DATABASE_URL=${{Postgres.DATABASE_URL}}`
  - [ ] `JWT_SECRET` (généré avec `openssl rand -base64 32`)
  - [ ] `JWT_REFRESH_SECRET` (généré avec `openssl rand -base64 32`)
  - [ ] `OPENAI_API_KEY`
  - [ ] `CLIENT_URL` (URL du service web)
  - [ ] `PORT=4000`
  - [ ] `NODE_ENV=production`
- [ ] Build réussi
- [ ] Service démarré
- [ ] Health check passe (`/health`)
- [ ] Migrations exécutées : `railway run npm run db:migrate`

## Déploiement de l'Application Web

- [ ] Service Web créé depuis GitHub repo
- [ ] **Root Directory** configuré : `/apps/web`
- [ ] **Build Command** : `cd ../.. && npm install && cd apps/web && npm run build`
- [ ] **Start Command** : `npm run start`
- [ ] Variables d'environnement configurées :
  - [ ] `NEXT_PUBLIC_API_URL` (URL du service API + `/api`)
  - [ ] `NEXT_PUBLIC_SOCKET_URL` (URL du service API)
  - [ ] `PORT=3000`
  - [ ] `NODE_ENV=production`
- [ ] Build réussi
- [ ] Service démarré
- [ ] Health check passe (`/`)

## Tests Post-Déploiement

### Tests API
- [ ] Health check : `GET /health` retourne 200
- [ ] Inscription : `POST /api/auth/register` fonctionne
- [ ] Connexion : `POST /api/auth/login` fonctionne
- [ ] Routes protégées : Authentification requise

### Tests Web
- [ ] Page d'accueil charge
- [ ] Navigation fonctionne
- [ ] Connexion à l'API fonctionne
- [ ] Socket.IO se connecte

### Tests Intégration
- [ ] Authentification complète (register → login → accès protégé)
- [ ] Création de projet
- [ ] Collaboration temps réel (si testé)

## Configuration Domaine Personnalisé (Optionnel)

- [ ] Domaine configuré pour l'API
- [ ] Domaine configuré pour le Web
- [ ] Certificats SSL générés automatiquement
- [ ] DNS configuré correctement

## Monitoring

- [ ] Logs accessibles dans Railway
- [ ] Métriques de performance visibles
- [ ] Alertes configurées (optionnel)

## Sécurité

- [ ] Tous les secrets sont dans Railway Variables (pas dans le code)
- [ ] HTTPS activé (automatique sur Railway)
- [ ] CORS configuré correctement
- [ ] Rate limiting activé (si nécessaire)

## Documentation

- [ ] URLs de production documentées
- [ ] Variables d'environnement documentées
- [ ] Procédures de rollback documentées

## ✅ Déploiement Terminé

Une fois toutes les cases cochées, votre application CognitoLab est déployée et prête à être utilisée !

### URLs à Noter

- **API** : `https://your-api.railway.app`
- **Web** : `https://your-web.railway.app`
- **PostgreSQL** : Accessible via Railway Dashboard

### Commandes Utiles

```bash
# Voir les logs
railway logs

# Exécuter des commandes
railway run npm run db:migrate

# Ouvrir un shell
railway shell

# Voir les variables d'environnement
railway variables
```

