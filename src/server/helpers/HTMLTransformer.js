import path from 'path'
import fs from 'fs'

export default ({ content = '', preloadState = '', title = '' }) =>
  new Promise((resolve, reject) => {
    const indexFile = path.resolve(__dirname, '../../../dist/publicIndex.html')

    fs.readFile(indexFile, 'utf8', (err, data) =>
      err
        ? reject(err)
        : resolve(data
          .replace('data-content', content)
          .replace('data-title', title)
          .replace('data-preloadState', JSON.stringify(preloadState))
        )
    )
  })