import * as puppeteer from 'puppeteer'

const puppeteerOption = {
  // for Docker
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ],
  defaultViewport: {
    width: 1024,
    height: 768,
    isLandscape: true,
  },
}

export default class Screenshot {
  public opt: puppeteer.LaunchOptions
  public browser: puppeteer.Browser
  public pages: puppeteer.Page[]

  constructor() {
    this.opt = { ...puppeteerOption }
    if (process.env['CHROME_BIN']) {
      // for Docker
      this.opt.executablePath = process.env['CHROME_BIN']
    }
  }

  public async init() {
    this.browser = await puppeteer.launch(this.opt)
  }

  public async printScreen(url, options = {}) {
    const page = await this.browser.newPage()
    await page.goto(url)
    const picBuffer = await page.screenshot({ ...options })
    await page.close()
    return picBuffer
  }

  public async close() {
    await this.browser.close()
  }
}
