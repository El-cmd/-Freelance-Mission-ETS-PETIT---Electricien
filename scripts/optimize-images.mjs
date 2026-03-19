import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const sourceDir = path.join(root, 'assets')
const outDir = path.join(root, 'src/assets/images')

const picks = [
  'AF1QipM638xh9hL-eUtsRhFAps_ng5lJv_xqPtoe_rWR=w244-h175-n-k-no-nu.jpg',
  'AF1QipM9FKTFcLCmJ4uLExTPBTXIaI0LbHZ-kyK1TU48=w244-h306-n-k-no-nu.jpg',
  'AF1QipMCJ1hdL9qAZTkLM1TbzGN6BgUiyufDrfWqrWvY=w244-h408-n-k-no-nu.jpg',
  'AF1QipMOMpR8e1MO7YzW7on6uWEzV4xBNTDekRkJMML3=w244-h408-n-k-no-nu.jpg',
  'AF1QipNAEzHrdrtUb1g21jNZNWvpuVJft02P-soy-emU=w244-h306-n-k-no-nu.jpg',
  'AF1QipNIsw6vcHqvIQKADprqDQmTYDjmn7d8zSuKTTNS=w244-h408-n-k-no-nu.jpg',
  'AF1QipO3rJA7ThfmNvrerGpaqkbtU2bB7q-j8wzOSlcP=w244-h408-n-k-no-nu.jpg',
  'AF1QipOQeXOhoGO7pWTy5ve0AjU5UC49PN_pABDuYdAI=w244-h306-n-k-no-nu.jpg',
  'AF1QipPASbqpAvv3oJukXukOKpbDFYqPPhKc7H08kMcw=w244-h408-n-k-no-nu.jpg',
  'AF1QipPBStSFrtw7XT0Nw3fSka4qRj4FDsHsKiDH_rpY=w244-h408-n-k-no-nu.jpg',
  'AF1QipPiumluOkez5XaUF0Fzexs2EDIyMqLtOnxbElSF=w244-h306-n-k-no-nu.jpg',
  'AF1QipPrKQfBA3-roYxQB8wAvr6cO7f4RaUN0Gt9Kqf4=w244-h408-n-k-no-nu.jpg'
]

await fs.mkdir(outDir, { recursive: true })

for (let i = 0; i < picks.length; i++) {
  const input = path.join(sourceDir, picks[i])
  const output = path.join(outDir, `project-${String(i + 1).padStart(2, '0')}.webp`)

  await sharp(input)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 74, effort: 5 })
    .toFile(output)
}

await sharp(path.join(sourceDir, 'logo.png'))
  .trim()
  .resize({ width: 420, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'src/assets/logo.png'))

console.log('Optimisation terminée : 12 images + logo')
