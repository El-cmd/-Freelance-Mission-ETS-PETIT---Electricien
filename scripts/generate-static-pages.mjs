import fs from 'node:fs/promises'
import path from 'node:path'

const siteUrl = 'https://ets-petit.fr'
const distDir = path.resolve('dist')

const pages = [
  {
    path: '/',
    title: 'ETS PETIT | Électricien à Hem et dans la région lilloise',
    description:
      'ETS PETIT intervient à Hem et dans la région lilloise pour le dépannage, la rénovation, les tableaux électriques, la mise en sécurité et l’éclairage.',
  },
  {
    path: '/services',
    title: 'Services électriques à Hem et dans la région lilloise | ETS PETIT',
    description:
      'Installation, rénovation, dépannage, mise aux normes, éclairage, domotique et bornes de recharge à Hem et dans la région lilloise.',
  },
  {
    path: '/projects',
    title: 'Tarifs électricien à Hem et dans la région lilloise | ETS PETIT',
    description:
      'Consultez les tarifs indicatifs ETS PETIT pour le dépannage, les tableaux électriques et les bornes de recharge à Hem et dans la région lilloise.',
  },
  {
    path: '/about',
    title: 'À propos de votre électricien à Hem | ETS PETIT',
    description:
      'Découvrez ETS PETIT, artisan électricien au service des particuliers et professionnels de Hem et de la région lilloise.',
  },
  {
    path: '/contact',
    title: 'Contacter un électricien à Hem | ETS PETIT',
    description:
      'Contactez ETS PETIT pour une intervention électrique ou un devis à Hem et dans la région lilloise.',
  },
  {
    path: '/mentions-legales',
    title: 'Mentions légales | ETS PETIT',
    description: 'Mentions légales du site ETS PETIT, électricien à Hem et dans la région lilloise.',
  },
  {
    path: '/politique-confidentialite',
    title: 'Politique de confidentialité | ETS PETIT',
    description: 'Informations sur le traitement des données personnelles par ETS PETIT.',
  },
  {
    path: '/conditions-utilisation',
    title: 'Conditions d’utilisation | ETS PETIT',
    description: 'Conditions d’utilisation du site ETS PETIT.',
  },
]

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

function renderPage(template, page) {
  const canonicalUrl = `${siteUrl}${page.path}`
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)

  const renderedPage = template
    .replace(/<title data-seo="title">.*?<\/title>/, `<title data-seo="title">${title}</title>`)
    .replace(
      /(<meta data-seo="description" name="description" content=")[^"]*(" \/>)/,
      `$1${description}$2`,
    )
    .replace(
      /(<link data-seo="canonical" rel="canonical" href=")[^"]*(" \/>)/,
      `$1${canonicalUrl}$2`,
    )
    .replace(
      /(<meta data-seo="og-title" property="og:title" content=")[^"]*(" \/>)/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta data-seo="og-description" property="og:description" content=")[^"]*(" \/>)/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta data-seo="og-url" property="og:url" content=")[^"]*(" \/>)/,
      `$1${canonicalUrl}$2`,
    )
    .replace(
      /(<meta data-seo="twitter-title" name="twitter:title" content=")[^"]*(" \/>)/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta data-seo="twitter-description" name="twitter:description" content=")[^"]*(" \/>)/,
      `$1${description}$2`,
    )

  return page.noindex
    ? renderedPage.replace(
        '</head>',
        '    <meta name="robots" content="noindex, nofollow, noarchive" />\n  </head>',
      )
    : renderedPage
}

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')

for (const page of pages) {
  const outputDir = page.path === '/' ? distDir : path.join(distDir, page.path.slice(1))
  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'index.html'), renderPage(template, page))
}

const adminPage = renderPage(template, {
  path: '/admin',
  title: 'Administration des tarifs | ETS PETIT',
  description: 'Espace privé de gestion des tarifs ETS PETIT.',
  noindex: true,
})
await fs.mkdir(path.join(distDir, 'admin'), { recursive: true })
await fs.writeFile(path.join(distDir, 'admin', 'index.html'), adminPage)

const notFoundPage = renderPage(template, {
  path: '/404',
  title: 'Page introuvable | ETS PETIT',
  description: 'La page demandée n’existe pas ou a été déplacée.',
}).replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>')

await fs.writeFile(path.join(distDir, '404.html'), notFoundPage)

console.log(`Pages SEO générées : ${pages.length}`)
