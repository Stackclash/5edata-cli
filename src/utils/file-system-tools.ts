import fs from 'node:fs'
import path from 'node:path'

export const writeFile = (filePath: string, data: string): void => {
  if (!fs.existsSync(path.dirname(filePath))) {
    const dir = path.dirname(filePath)
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, data, 'utf8')
}
