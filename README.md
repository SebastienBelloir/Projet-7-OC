# Projet n°7 - Parcours Développeur Web - OpenClassrooms
Créez un réseau social interne d’entreprise pour le groupe Groupomania
Ce projet est réalisé dans le cadre du parcours Développeur Web du site [OpenClassrooms](https://openclassrooms.com/fr/)


# Documentations
[Note de cadrage](https://github.com/SebastienBelloir/Projet-7-OC/blob/dev/docs/Groupomania_Specs_FR_DWJ_VF.pdf)



# Front-end
Pour pouvoir utiliser l'API, vous pouvez cloner ce répertoire Github et y suivre les instructions pour faire tourner le front-end (plus de détails dans la note de cadrage: Dépôt GitHub/Procédure).

# Technologies utilisées
Express
NodeJS
mySql

# Objectifs de la mission
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

# Compétences évaluées
Gérer un stockage de données à l'aide de SQL
Personnaliser le contenu envoyé à un client web
Implémenter un stockage de données sécurisé en utilisant SQL
Authentifier un utilisateur et maintenir sa session

# Serveur de développement local

Pour lancer le serveur de développement :

Côté back: 

```bash
cd Backend
npm install
nodemon server 
```

Côté front:

```bash
cd Frontend
npm install
npm run serve
```

Par défaut le serveur client est accessible en local via le port 8080: http://localhost:8080/
