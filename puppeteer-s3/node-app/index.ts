import S3 from './aws-s3'
import Screenshot from './screenshot'
import * as sharp from 'sharp'

const urlList = {
  'apple': 'https://www.apple.com/jp/',
  'bitbucket': 'https://bitbucket.org/',
  'error': 'https://error.error/',
  'example': 'https://example.com/',
  'github': 'https://github.com/',
  'google': 'https://www.google.com/',
  'hacker_news': 'https://news.ycombinator.com/',
  'yahoo': 'https://www.yahoo.co.jp/',
}

const errors = {}

;(async () => {
  const ss = new Screenshot()
  const s3 = new S3()
  await ss.init()

  const printAndUp = async (url: string, filePath: string) => {
    const picBuffer = await ss.printScreen(url)
    const resBuffer = await sharp(picBuffer).resize(320, 240).toBuffer()
    const res = await s3.putImage(resBuffer, filePath)
    return res
  }

  const chunks = chunkArray(Object.keys(urlList), 3)
  for (const chunk of chunks) {
    await Promise.all(chunk.map(async label => {
      const url = urlList[label]
      try {
        const res = await printAndUp(url, `test_dir/${label}.png`)
        res['url'] = url
        console.log(res)
      } catch (err) {
        errors[label] = err
        console.error(`Error!: ${url}`)
      }
    }))
  }

  console.log(errors)
  await ss.close()
})()

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const arrayLength = array.length
  let tempArray: T[][] = []
  for (let i = 0; i < arrayLength; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    tempArray.push(chunk)
  }
  return tempArray
}
