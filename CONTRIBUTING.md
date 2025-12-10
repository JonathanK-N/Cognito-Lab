# Guide de Contribution

Merci de votre intérêt pour contribuer à CognitoLab !

## Structure du Projet

CognitoLab utilise un monorepo Turborepo avec :

- **Apps** : Applications principales (web, api, sim-engine, robot-sim)
- **Packages** : Packages partagés réutilisables

## Développement

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Push vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrir une Pull Request

## Standards de Code

- Utiliser TypeScript pour tout le code
- Suivre les conventions ESLint/Prettier
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les APIs publiques

## Tests

```bash
npm run test
```

## Questions ?

Ouvrez une issue pour toute question ou suggestion.

