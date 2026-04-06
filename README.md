# UGO — Test Full Stack

## Evolutions apportées

- Organisation des dossiers et configuration des imports avec `@/`
- Création du composant `Label`
- Amélioration du composant `Button` avec un système de variants

**Pensez à faire un `docker compose down` avant de rebuild**

 - `docker compose down`
 - `docker compose up --build`

## Présentation

Application permettant de visualiser une liste de clients ainsi que leurs commandes associées.

Le projet est composé de :

- une API backend
- une application frontend

---

## Stack technique

- **Backend** : FastAPI + SQLAlchemy + PostgreSQL
- **Frontend** : Vite + React + TypeScript
- **Infrastructure** : Docker

---

## Choix de conception

- une API pour la gestion des données
- un frontend pour l’affichage

Côté frontend, utilisation des composants simples, lisibles et faciles à maintenir.

Utilisation de TypeScript, pour utiliser des types simples afin de privilégier un code simple et la rapidité pour le développement.

L'utilisation des types generics TypeScript peuvent être utiles dans des cas avancés, comme l’abstraction ou la création de hooks réutilisables.
Dans ce projet, je les ai utilisés lorsque c’était nécessaire, sans complexifier inutilement le code.

---

## Backend

Utilisation de FastApi :

- une bonne lisibilité du code
- une documentation automatique via Swagger
- une structure claire pour les endpoints

---

## Structure du backend

- `models` : définition des entités (`Customer`, `Order`)
- `schemas` : validation et sérialisation des données
- `routes` : définition des endpoints API
- `services` : logique métier (notamment l’import des données CSV)
---

## Gestion des données
Utilisation de la bibliothèque Pandas pour nettoyer les fichiers CSV (`customers` et `purchases`)

Les relations entre les entités:
- un client peut avoir plusieurs commandes
- une commande est liée à un seul client

Un mapping civilité :
- `1 → mme`
- `2 → m`

---



## Fonctionnement

L’API expose les endpoints suivants :

- `GET /customers` : liste des clients
- `GET /customers/{id}/orders` : liste des commandes d’un client

Le frontend consomme ces endpoints pour afficher :

- une page listant les clients
- une page listant les commandes d’un client

Un total des commandes est calculé et affiché sur la page -Orders-*.

---

## Installation

### Configuration

Copier le fichier `.env.example` en `.env`, puis renseigner les variables nécessaires.
---

### Lancement avec Docker

```bash
docker compose up --build
```

Pour lancer les services en arrière-plan :

```bash
docker compose up -d --build
```

---

### Accès aux services

- Frontend : http://localhost:5173/customers
- API (Swagger) : http://localhost:8000/docs
- pgAdmin : http://localhost:8080/login?next=/

---

## Import des données CSV

```bash
docker exec -it ugo_api bash
python -m app.scripts.import_data
```
---

## Tests Front 

Un test a été ajouté sur le composant `CustomersPage`.
```bash
npm run test
```
---

## 💻 Installation locale

```bash
python3 -m venv .myEnv
source .myEnv/bin/activate
pip install -r requirements.txt
```

---

## Améliorations possibles
- Amélioration des variables d'ENV pour la gestion de la database et docker
- ajout de pagination sur les listes
- amélioration de la gestion des erreurs
  - Front:
    - Messages trop techniques, 
    - La gestion des différents cas d’erreur
    - Amélioration de l’expérience utilisateur (loading states, etc...)
- ajout de tests supplémentaires
- mise en place d’une authentification
- optimisation des performances côté frontend
  - Ajouter du cache (React Query)
  - Pas de refetch inutile
- validation plus stricte des données CSV
  - CSV mal formaté
  - champ manquant
- ajout de tests unitaires backend
- optimisation des requêtes
  - prendre les champs que nous avons besoins dans le select
- une meilleure gestion des erreurs et des logs
- une CI/CD
- une sécurisation des endpoints

---

## Remarques

Dans le CSV, j’ai remarqué que certains champs étaient nuls. Je les ai conservés pour les tests, mais dans un contexte de production, il aurait fallu déterminer s’il s’agissait d’une erreur d’importation du CSV.

Au niveau des devises, nous avons du USD et de l’euro dans le CSV. J’ai fait le choix d’afficher un message d’erreur.
Plusieurs solutions sont possibles :
   - Convertir les montants en euros via une API de taux de change
   - Calculer les sommes séparément en EUR et en USD, et afficher deux totaux distincts avec une explication



