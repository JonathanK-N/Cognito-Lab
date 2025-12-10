# Architecture CognitoLab

## Vue d'ensemble

CognitoLab est une plateforme complète d'apprentissage électronique et robotique construite avec un monorepo Turborepo.

## Structure du Monorepo

```
cognitolab/
├── apps/
│   ├── web/              # Application Next.js principale
│   ├── api/              # API Express + Prisma + PostgreSQL
│   ├── sim-engine/       # Moteur de simulation WebAssembly
│   └── robot-sim/        # Simulateur robotique standalone
├── packages/
│   ├── ui/               # Design System
│   ├── common/           # Utilitaires et types partagés
│   ├── components-svg/   # Composants SVG électroniques
│   ├── eda-pro/          # Éditeurs EDA (schémas + PCB)
│   ├── circuit-editor/   # Simulateur de circuits
│   ├── microcontroller-sim/ # Simulateur microcontrôleurs
│   ├── robotics/         # Moteur robotique
│   ├── lms/              # Système de gestion de cours
│   └── ai-assistant/     # Assistants IA
└── package.json          # Configuration Turborepo
```

## Flux de Données

### Authentification
1. Utilisateur se connecte → API `/api/auth/login`
2. API génère JWT + Refresh Token
3. Client stocke les tokens
4. Requêtes suivantes incluent le token dans le header

### Collaboration Temps Réel
1. Client se connecte via Socket.IO
2. Rejoint un projet via `join-project`
3. Événements broadcastés à tous les collaborateurs
4. Changements sauvegardés dans la base de données

### Simulation
1. Utilisateur crée/modifie un circuit
2. Changements envoyés au store Zustand
3. Simulateur calcule tensions/courants
4. Résultats affichés en temps réel

## Technologies

### Frontend
- **Next.js 14** : Framework React avec App Router
- **React 18** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling
- **Konva** : Canvas 2D pour éditeurs
- **Three.js** : Rendu 3D
- **Zustand** : Gestion d'état
- **React Query** : Gestion des données serveur

### Backend
- **Express** : Framework Node.js
- **Prisma** : ORM
- **PostgreSQL** : Base de données
- **Socket.IO** : WebSocket pour collaboration
- **JWT** : Authentification
- **OpenAI API** : Intelligence artificielle

### Simulation
- **Wokwi** : Simulation microcontrôleurs (iframe)
- **Renode** : Simulation embarquée (WebAssembly)
- **SPICE-like** : Simulation circuits (WASM interne)

## Patterns Architecturaux

### Monorepo
- Packages partagés réutilisables
- Builds parallèles avec Turborepo
- Gestion de dépendances centralisée

### Design System
- Composants réutilisables dans `@cognitolab/ui`
- Thèmes clair/sombre
- Responsive design

### State Management
- Zustand pour état local
- React Query pour état serveur
- Socket.IO pour état temps réel

## Sécurité

- JWT avec expiration courte (15 min)
- Refresh tokens avec expiration longue (7 jours)
- Validation des entrées avec Zod
- CORS configuré
- Helmet pour headers sécurisés

## Performance

- Code splitting automatique (Next.js)
- Lazy loading des composants lourds
- Cache avec React Query
- WebAssembly pour simulations intensives

## Déploiement

### Production
- Next.js → Vercel/Netlify
- API → Railway/Heroku/AWS
- PostgreSQL → Supabase/Neon/AWS RDS
- CDN pour assets statiques

### CI/CD
- GitHub Actions
- Tests automatiques
- Builds sur chaque PR
- Déploiement automatique sur merge

