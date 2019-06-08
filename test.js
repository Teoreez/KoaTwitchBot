const mm = require('music-metadata');
const util = require('util')
 
mm.parseFile('./www/videos/owo1.mp4', {native: true})
  .then( metadata => {
    //console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    let durationdata = metadata.format.duration
    console.log(durationdata);
  })
  .catch( err => {
    console.error(err.message);
  });