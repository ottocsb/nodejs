const puppeteer = require('puppeteer');

(async function () {
    const browser = await puppeteer.launch({headless: false}); // headless设置为true即可运行无头浏览器
    const page = await browser.newPage();
    await page.goto('https://easylearn.baidu.com/edu-page/tiangong/composition?locSign=5853905881110847301'); // 在无头浏览器中打开一个网页
    await page.setViewport({width: 1920, height: 1080}); // 设置浏览器窗口大小
    await page.waitForSelector('.composition-content');
    const elements = await page.evaluate(() => {
        const targetElement = document.querySelector('.composition-content');
        return targetElement.innerHTML
    });
    console.log("元素节点：\n", elements);

    const content = await page.$('.composition-content');
    const text = await page.evaluate(divElement => divElement.textContent, content);
    console.log("纯文本：\n", text)
})();



