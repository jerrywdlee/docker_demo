import * as AWS from 'aws-sdk'

const awsLoginParams = {
  accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
  secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  region: process.env['AWS_REGION'],
}

export default class S3 extends AWS.S3 {
  constructor() {
    AWS.config.update(awsLoginParams)
    super()
  }

  public async putImage(buffer: Buffer, filePath: string, options = {}) {
    const params = {
      Bucket: process.env['AWS_BUCKET_NAME'],
      Key: filePath,
      Body: buffer,
      ContentType: 'image/png',
      ACL: 'public-read',
      ...options,
    }
    return new Promise((resolve, reject) => {
      this.putObject(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
