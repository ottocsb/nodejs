const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const start_time = Date.now();

async function scrapeDoubanMovies() {
    const url = 'https://movie.douban.com/top250';
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    };

    for (let start = 0; start < 226; start += 25) {
        const params = {start};
        const response = await axios.get(url, {headers, params});
        const $ = cheerio.load(response.data);

        $('.info').each((i, el) => {
            const title = $(el).find('.title').text().trim();
            const rating = $(el).find('.rating_num').text().trim();
            const quote_element = $(el).find('.quote span');
            const quote = quote_element.length ? quote_element.text().trim() : 'N/A';
            console.log(`Title: ${title}\nRating: ${rating}\nQuote: ${quote}\n`);
            const content = `Title: ${title}\nRating: ${rating}\nQuote: ${quote}\n\n`;
            fs.appendFileSync('output.txt', content);

        });
        const end_time = Date.now();
        console.log(`Total time taken: ${(end_time - start_time) / 1000} seconds`);
    }
}

scrapeDoubanMovies();
