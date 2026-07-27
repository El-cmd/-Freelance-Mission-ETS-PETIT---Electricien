# ETS PETIT - Site vitrine

Site vitrine statique pour un électricien à Hem et dans la métropole lilloise.

## Stack

- React + TypeScript (Vite)
- Tailwind CSS
- shadcn/ui (composants locaux)
- Framer Motion
- Nginx pour le frontend
- API Node.js dédiée au formulaire de contact
- Docker Compose

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Docker

L'application utilise deux services:

- `ets-petit`: Node.js 22 compile Vite, puis Nginx sert les fichiers statiques;
- `contact-api`: API Node.js minimale qui valide les demandes et les transmet par SMTP.

Les deux services s'exécutent sans privilèges, avec un système de fichiers en
lecture seule et un healthcheck.

Copier la configuration d'exemple et renseigner les accès SMTP:

```bash
cp .env.example .env
```

Variables indispensables au formulaire:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`;
- `SMTP_USER`, `SMTP_PASSWORD`;
- `CONTACT_FROM`, `CONTACT_TO`;
- `ALLOWED_ORIGINS=https://ets-petit.fr` en production.

Le formulaire reste volontairement indisponible si la configuration SMTP est
absente. Les secrets ne doivent jamais être ajoutés au dépôt Git.

Construire et démarrer le service:

```bash
docker network inspect proxy >/dev/null 2>&1 || docker network create proxy
docker compose up -d --build
```

Le frontend ne publie aucun port sur l'hôte. Il rejoint le réseau Docker externe
`proxy` et répond sur le port interne `80`, afin que Nginx Proxy Manager puisse
le joindre via `http://ets-petit:80`.

Si l'installation Docker ne contient pas le plugin Buildx ou si Compose échoue
dans son moteur Bake, utiliser:

```bash
docker build --target contact-api -t ets-petit-contact-api:local .
docker build --target frontend -t ets-petit:local .
docker compose up -d --no-build
```

Contrôler son état et consulter les logs:

```bash
docker compose ps
docker compose logs -f ets-petit contact-api
```

Arrêter le service:

```bash
docker compose down
```

En production, Nginx Proxy Manager gère le nom de domaine et le certificat
HTTPS. L'API reste isolée sur un réseau interne et Nginx lui transmet uniquement
les requêtes vers `/api/contact`.

## Structure principale

```txt
src/
  app/
    App/
  pages/
    HomePage/
  components/
    layout/
      Header/
      Footer/
      MobileCallBar/
      Section/
    sections/
      HeroSection/
      ServicesSection/
      ProjectsSection/
      AboutSection/
      ContactSection/
    ui/
  data/
  lib/
  types/
  assets/
    images/
```

## Déploiement automatique

Workflow: `.github/workflows/deploy.yml`

- chaque push sur `main` déclenche le déploiement sur le VPS;
- le workflow peut également être lancé avec `workflow_dispatch`;
- le workflow se connecte en SSH et exécute `/opt/apps/ets-petit/deploy.sh`.

## Personnalisation rapide

Mettre à jour les infos métier dans:

- `src/data/siteContent.ts`

Champs à adapter en priorité:

- téléphone
- email
- URL du site
- zone d'intervention

## SEO

- URLs propres sans fragment `#`;
- titre, description, canonique et Open Graph propres à chaque page;
- pages HTML SEO générées par `scripts/generate-static-pages.mjs`;
- image sociale `public/og-ets-petit.jpg`;
- `public/robots.txt`
- `public/sitemap.xml`
- JSON-LD `Electrician` inclus dans `index.html`
