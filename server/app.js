const request = require('request');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cherrio = require('cheerio');
const log = fs.createWriteStream('error.log');

const handleResponse = (res, status, data) => {
    res.json({
        meta: {
            code: status
        },
        data
    });
};

const getReceipesByKeyword = (res, keyword) => {
    const recipes = [];

    request(`https://www.xiachufang.com/search/?keyword=${ encodeURI(keyword) }&cat=1001`, function(err, result, body) {
        if (err) {
            log.write(err);
            return;
        }
        const $ = cherrio.load(body);
        $('.normal-recipe-list .list li .recipe').each(function(i, elem) {
            const name = $(this).find('.name a').text().trim();
            const id =  $(this).find('.name a').attr('href').match(/(\d+)/g)[0];
            const imageUrl = $(this).find('.cover img').attr('data-src');
            if (imageUrl) {
                const originUrl = imageUrl.split('?')[0]
                // const imagesDir = path.resolve(__dirname, 'images');
                // if (!fs.existsSync(imagesDir)) {
                //     fs.mkdirSync(imagesDir);
                // }
                recipes.push({ name, id, image: originUrl });
                // request.get(originUrl).pipe(fs.createWriteStream(`./images/${id}.jpg`));
            }
        });

        handleResponse(res, 200, recipes);
    });
};

app.get('/overcook/recipes/search', (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        handleResponse(res, 200, []);
    } else {
        getReceipesByKeyword(res, keyword);
    }
});

/**
 * 菜谱数据结构
 * @param {title}: String 标题
 * @param {image}: String 图片
 * @param {desc}: String 菜单概述
 * @param {ings}: Array 用料
 * @param {steps}: Array 步骤
 * @param {tip}: String 小贴士
 */
app.get('/overcook/recipe/:id', (req, res) => {
    const { id } = req.params;
    request(`https://www.xiachufang.com/recipe/${id}/`, (err, result, body) => {
        if (err) {
            log.write(err);
            handleResponse(res, 400, null);
            return;
        }
        const $ = cherrio.load(body);
        const title = $('.page-title').text().trim();
        const image = $('.recipe-show>.cover>img').attr('src');
        const desc = $('.desc').text().trim().replace('<br>', '\n');

        const ings = [];
        $('.ings td').each(function(i, elem) {
            const name = $(this).find('.name').text().trim() || $(this).find('.name a').text().trim();
            const unit = $(this).find('.unit').text().trim();
            ings.push({ name, unit });
        });

        const steps = [];
        $('.steps .container').each(function(i, elem) {
            const text = $(this).text().trim().replace('<br>', '');
            const imgSrc = $(this).find('img').attr('src');
            steps.push({ text, imgSrc });
        });

        const tip = $('.tip').text().trim().replace('<br>', '\n');
        handleResponse(res, 200, { title, image, desc, steps, tip });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}!`);
});
