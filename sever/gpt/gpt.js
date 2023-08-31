const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
// 读取 Excel 文件
const workbook = XLSX.readFile('alidns_record.xlsx');
// 获取第一个工作表
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// 将工作表数据转换为 JSON 对象
const data = XLSX.utils.sheet_to_json(worksheet);
let wrongNum = 0;
// console.log("此次任务长度:", length, "预计完成时间:", length * 3, "分钟\n")
console.time("pTime")
const run = async () => {
    const browser = await puppeteer.launch({headless: true}); // headless设置为true即可运行无头浏览器

    const promise = new Promise(async resolve => {
        for (let i = 0; i < 75; i++) {
            console.log('第' + (i + 1) + '个任务开始\n')
            const page = await browser.newPage();
            await page.goto(''); // 在无头浏览器中打开一个网页
            await page.setViewport({width: 1920, height: 1080}); // 设置浏览器窗口大小

            // 输入问题
            await page.waitForSelector('#el-id-1024-1');
            await page.type('#el-id-1024-1', data[i].Q, {delay: 300});
            console.log('已输入问题\n')

            // 点击提交
            await page.waitForSelector('.InputBox > .el-form >.el-form-item > .el-form-item__content > .flex > .el-button');
            await page.click('.InputBox > .el-form > .el-form-item > .el-form-item__content > .flex > .el-button');
            console.log('已提交问题\n')
            try {
                await page.waitForSelector('.mx-auto > .A', {timeout: 180000})
            } catch (e) {
                console.log('第' + (i + 1) + '个任务超时!\n')
                data[i].A = '任务超时';
                await page.close();
                wrongNum++;
                continue
            }
            // 等待结果 暂时默认3分钟
            const content = await page.$('.mx-auto > .A > .InnerMessage');
            const divElement = await content.$('div');
            const text = await page.evaluate(divElement => divElement.textContent, divElement);
            console.log('第' + (i + 1) + '个任务结束\n')
            data[i].A = text;
            await page.close();
        }
        // 循环结束后，调用 resolve 方法表示异步操作完成
        resolve();
    });
    await promise;
    await browser.close();
}

const main = async () => {
    await run();
    console.log('任务结束\n', '异常任务数量:', wrongNum, '\n')
    console.log('data:\n' + data)
    // 将 JSON 数据转换为工作表对象
    const newWorksheet = XLSX.utils.json_to_sheet(data);

    // 将工作表添加到工作簿对象
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');

    // 将工作簿对象写入 Excel 文件
    XLSX.writeFile(newWorkbook, 'file.xlsx');
    console.log('写入文件成功\n')
    console.timeEnd("pTime")
    //结束脚本
    process.exit(0);
}

main().then()

