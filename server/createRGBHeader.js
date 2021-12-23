const args = process.argv
const { getAverageColor } = require('fast-average-color-node');
const fs = require('fs');
const target = require('./seeds/users.json');
const main = async() => {
    const tar = target;
    for (const key in tar) {
        const url = tar[key].profileImageId;
        const targetURL = `../public/images/profiles/${url}.webp`
        const { rgb } = await getAverageColor(targetURL, { mode: 'precision' });
        tar[key].rgb = rgb;
    }
    console.log('tar', tar);
    fs.writeFileSync('users.json', JSON.stringify(tar, null, 2), function (err) {
        console.log('err', err);
      })
}

main()