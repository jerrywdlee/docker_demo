import S3 from './aws-s3'
import Screenshot from './screenshot'
import * as sharp from 'sharp'

(async () => {
  const ss = new Screenshot()

  const s3 = new S3()

  await ss.init()
  const picBuffer = await ss.printScreen('https://google.com')
  const resBuffer = await sharp(picBuffer).resize(320, 240).toBuffer()

  const res = await s3.putImage(resBuffer, 'test_dir/google.png')
  console.log(res)

  await ss.close()
})()
