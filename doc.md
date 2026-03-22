# Documentation football-data.org - API Quickstart

## Quickstart / [API Reference](https://docs.football-data.org)

---

## Overview
Le 20 mai 2022, la **v4** a été publiée pour l'usage public. Toute la documentation de référence a été révisée et peut être consultée ici : [docs.football-data.org](https://docs.football-data.org).

> **Note :** Bien que la v2 reste disponible jusqu'à nouvel ordre, il est fortement encouragé de migrer vers la v4. C'est un changement qui en vaut la peine.

---

## Available Resources
Consultez tous les points de terminaison (endpoints) disponibles ci-dessous. Vous pouvez également importer cette [collection Postman](https://www.getpostman.com/collections/f3449621c47b66b53725) pour tester les appels.

| (Sub)Resource | Action | URI | Filters |
| :--- | :--- | :--- | :--- |
| **Area** | Lister une zone spécifique | `/v4/areas/{id}` | - |
| **Areas** | Lister toutes les zones disponibles | [/v4/areas/](http://api.football-data.org/v4/areas) | - |
| **Competition** | Lister une compétition spécifique | `/v4/competitions/{id}` | - |
| **Competitions** | Lister toutes les compétitions | [/v4/competitions/](http://api.football-data.org/v4/competitions/) | `areas={AREAS}` |
| **Standings** | Classement d'une compétition | `/v4/competitions/{id}/standings` | `matchday`, `season`, `date` |
| **Matches (Comp)** | Matchs d'une compétition | `/v4/competitions/{id}/matches` | `dateFrom`, `dateTo`, `stage`, `status`, `matchday`, `group`, `season` |
| **Teams (Comp)** | Équipes d'une compétition | `/v4/competitions/{id}/teams` | `season` |
| **Scorers** | Meilleurs buteurs d'une compétition | `/v4/competitions/{id}/scorers` | `limit`, `season` |
| **Team** | Détails d'une équipe | `/v4/teams/{id}` | - |
| **Teams** | Lister les équipes | `/v4/teams/` | `limit`, `offset` |
| **Match (Team)** | Matchs d'une équipe spécifique | `/v4/teams/{id}/matches/` | `dateFrom`, `dateTo`, `season`, `competitions`, `status`, `venue`, `limit` |
| **Match** | Détails d'un match spécifique | `/v4/matches/{id}` | - |
| **Matches (All)** | Matchs sur plusieurs compétitions | `/v4/matches` | `competitions`, `ids`, `dateFrom`, `dateTo`, `status` |
| **Head2Head** | Historique des confrontations | `/v4/matches/{id}/head2head` | `limit`, `dateFrom`, `dateTo`, `competitions` |
| **Person** | Détails d'une personne (joueur) | `/v4/persons/{id}` | - |
| **Matches (Person)**| Matchs d'une personne | `/v4/persons/{id}/matches` | `dateFrom`, `dateTo`, `status`, `competitions`, `limit`, `offset` |

---

## Filters and Data Types

| Filter | Type | Description / Possible values |
| :--- | :--- | :--- |
| **id** | Integer | L'ID d'une ressource. |
| **ids** | Integer | Liste d'IDs séparés par des virgules. |
| **matchday** | Integer | Numéro de la journée de championnat. |
| **season** | String | Année de début de saison (ex: 2021). |
| **status** | Enum | `SCHEDULED`, `LIVE`, `IN_PLAY`, `PAUSED`, `FINISHED`, `POSTPONED`, `SUSPENDED`, `CANCELLED` |
| **venue** | Enum | Définit le type de lieu : `HOME`, `AWAY`. |
| **date / dateFrom / dateTo** | String | Format `yyyy-MM-dd` (ex: 2018-06-22). |
| **stage** | Enum | `FINAL`, `GROUP_STAGE`, `REGULAR_SEASON`, etc. |
| **plan** | String | `TIER_ONE`, `TIER_TWO`, `TIER_THREE`, `TIER_FOUR`. |
| **limit** | Integer | Limite le nombre de résultats (défaut: 10). |
| **offset** | Integer | Nombre d'enregistrements à ignorer pour la pagination. |

---

## Example Requests

* **Matchs du jour (compétitions souscrites) :**
    ```bash
    [https://api.football-data.org/v4/matches](https://api.football-data.org/v4/matches)
    ```
* **Tous les matchs de la Champions League :**
    ```bash
    [https://api.football-data.org/v4/competitions/CL/matches](https://api.football-data.org/v4/competitions/CL/matches)
    ```
* **Matchs à venir pour le Real Madrid :**
    ```bash
    [https://api.football-data.org/v4/teams/86/matches?status=SCHEDULED](https://api.football-data.org/v4/teams/86/matches?status=SCHEDULED)
    ```
* **Matchs où Gigi Buffon était dans l'effectif :**
    ```bash
    [https://api.football-data.org/v4/persons/2019/matches?status=FINISHED](https://api.football-data.org/v4/persons/2019/matches?status=FINISHED)
    ```
* **Calendrier de la Premier League (Journée 11) :**
    ```bash
    [https://api.football-data.org/v4/competitions/PL/matches?matchday=11](https://api.football-data.org/v4/competitions/PL/matches?matchday=11)
    ```
* **Classement de l'Eredivisie :**
    ```bash
    [https://api.football-data.org/v4/competitions/DED/standings](https://api.football-data.org/v4/competitions/DED/standings)
    ```
* **Top 10 des buteurs en Serie A italienne :**
    ```bash
    [https://api.football-data.org/v4/competitions/SA/scorers](https://api.football-data.org/v4/competitions/SA/scorers)
    ```

---

**Questions?**
Contactez par email : [daniel@football-data.org](mailto:daniel@football-data.org)

[football-data.org](http://football-data.org), Copyright © 2014-2026
