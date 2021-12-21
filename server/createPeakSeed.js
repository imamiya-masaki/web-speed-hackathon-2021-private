const args = process.argv
const _ = require('lodash');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const AudioContext = require('web-audio-api').AudioContext
const fs = require('fs');
const sounds = [
    {
      "id": "56570f22-2db4-458c-981d-558021d2f648",
      "title": "Adventures of Flying Jack",
      "artist": "Dessie Riffe"
    },
    {
      "id": "5352a4a1-6a47-445d-874d-6e08f811c4f4",
      "title": "Bavarian Seascape",
      "artist": "Nyla Eriksson"
    },
    {
      "id": "10b3358c-945f-428e-a7f1-1558f675ef3d",
      "title": "Be Jammin",
      "artist": "Mariah Decicco"
    },
    {
      "id": "2174b434-fe47-4c6a-9f30-de4d4e4c7554",
      "title": "BeBop for Joey",
      "artist": "Ashely Matsuo"
    },
    {
      "id": "8bb8891c-40c1-4536-8eee-2ecdac298931",
      "title": "Big Eyes",
      "artist": "Jone Adam"
    },
    {
      "id": "5a93be41-caab-4eec-9ac1-8b57c24ccbe2",
      "title": "Coy Koi",
      "artist": "Minnie Sweeny"
    },
    {
      "id": "8ed91156-d15e-4a6a-87cc-87f2e8905fa3",
      "title": "Hillbilly Swing",
      "artist": "Nan Lykes"
    },
    {
      "id": "42232f2b-b7b2-46f8-a3de-1eefbfbbd8c2",
      "title": "Hold on a Sec",
      "artist": "Alexa Hillard"
    },
    {
      "id": "49a3663a-1e66-4e22-83b8-3c43f181a254",
      "title": "Marked",
      "artist": "Earlene Apicella"
    },
    {
      "id": "2abadebb-6fae-4db0-9dba-d3063d9cc2e1",
      "title": "New Hero in Town",
      "artist": "Henrietta Almeida"
    },
    {
      "id": "5d0cd8a0-805a-4fb8-940a-53d2dee9c87e",
      "title": "Study and Relax",
      "artist": "Gigi Mohan"
    },
    {
      "id": "4ce92862-3d2d-47a4-975d-4b293173cec4",
      "title": "Stunted Adventure",
      "artist": "Rod Zepp"
    },
    {
      "id": "28604fdc-0adb-40b0-bd67-ed39d61f007d",
      "title": "Sunny Rasta",
      "artist": "Altagracia Babst"
    },
    {
      "id": "05333292-5786-4a1f-9046-6b4863da3286",
      "title": "Wakka Wakka",
      "artist": "Sonia Okafor"
    },
    {
      "id": "93b848fe-24c8-4597-a515-463a910f6ceb",
      "title": "Putin's Lullaby",
      "artist": "Reanna Mascorro"
    }
  ];
  const main = async () => {
    const output = [];
    const outputSound = [];
    for (let i = 0; i < sounds.length; i++) {
      const sound = sounds[i];
      const outputObj = {};
      const url = `http://localhost:8080/sounds/${sound.id}.mp3`
      const audioCtx = new AudioContext();
      // console.log('fetch', fetch)
      const res = await fetch(url)
      const data = await res.arrayBuffer();
      // console.log('data', data)
      const soundData = data;
      await new Promise((resolve, reject) => {
          audioCtx.decodeAudioData(soundData.slice(0), resolve, reject);
        }).then(buffer => {
          const get = getPeaks(buffer.getChannelData(0), buffer.getChannelData(1))
          const max = get.maxO; 
          const peaks = [];
          for (let j = 0; j < get.peaksO.length; j++) {
            const peak = get.peaksO[j];
            peaks.push(peak)
            output.push({soundId: sound.id, ratio: peak/max, index: j})
          }
          outputSound.push(sound)
        })
    }
    fs.writeFileSync('soundPeak.json', JSON.stringify(output, null, 2), function (err) {
      console.log('err', err);
    })
    fs.writeFileSync('sounds.json', JSON.stringify(outputSound, null, 2), function (err) {
      console.log('err', err);
    })
  }

  const getPeaks = (left, right) => {
    const leftData = _.map(left, Math.abs);
    // 右の音声データの絶対値を取る
    const rightData = _.map(right, Math.abs);
  
    // 左右の音声データの平均を取る
    const normalized = _.map(_.zip(leftData, rightData), _.mean);
    // 100 個の chunk に分ける
    const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
    // chunk ごとに平均を取る
    const peaksO = _.map(chunks, _.mean);
    // chunk の平均の中から最大値を取る
    const maxO = _.max(peaksO);
    // console.log('{value: {maxO, peaksO}}', {value: {maxO, peaksO}})
    return {maxO, peaksO}
  }

  function getSoundPath(soundId) {
    return `/sounds/${soundId}.mp3`;
  }
  

  // function fetchBinary(url) {
  //   const result = await $.ajax({
  //     async: false,
  //     dataType: 'binary',
  //     method: 'GET',
  //     responseType: 'arraybuffer',
  //     url,
  //   });
  //   return result;
  // }

  main()