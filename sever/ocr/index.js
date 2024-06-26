const axios = require('axios');
const fs = require('fs');

let url = 'http://hwr.api.pkushare.com:1689/v1/'

let imgPath = './test2.jpg'

//读取图片
function readImage(path) {
    return fs.readFileSync(path
    ).toString('base64');
}

let imageData = readImage(imgPath);

axios.post(url, {
    data: imageData,
    lang: 'ch',
}).then(res => {
    fs.writeFileSync('./res.json', JSON.stringify(res.data));
}).catch(err => {
    console.error(err);
});
