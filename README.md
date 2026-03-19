# ETS PETIT - Site vitrine (V1)

Site statique one-page pour un électricien à Roubaix.

## Stack

- React + TypeScript (Vite)
- Tailwind CSS
- shadcn/ui (composants locaux)
- Framer Motion
- Déploiement GitHub Pages

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

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

## Déploiement GitHub Pages

Workflow: `.github/workflows/deploy.yml`

- Push sur `main` déclenche build + déploiement
- La base Vite est gérée automatiquement en CI via `GITHUB_REPOSITORY`

## Personnalisation rapide

Mettre à jour les infos métier dans:

- `src/data/siteContent.ts`

Champs à adapter en priorité:

- téléphone
- email
- URL du site
- zone d'intervention

## SEO statique

- `index.html` (title, meta description, OG)
- `public/robots.txt`
- `public/sitemap.xml`
- JSON-LD LocalBusiness injecté depuis `src/lib/seo.ts`
