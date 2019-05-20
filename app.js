require('dotenv').config();

const serve = require('koa-static');
const _ = require('koa-route');
const Koa = require('koa');
const TwitchBot = require('twitch-bot')
const koaapp = new Koa();
const soundFolder = './misc/sounds';
const videoFolder = './misc/videos';
const fs = require('fs');
const { getCoins, coinsOperator, userOperator} = require('./database');

//reading files
const listfiles = fs.readdirSync(soundFolder);
console.log(listfiles);
function command (com) {
    input = com.replace(/\W/, "");
    if (listfiles.includes(input + ".mp3")) {
        return true;
        
    }
}
const listvideos = fs.readdirSync(videoFolder);
console.log(listvideos);
function videocommand (com) {
    input = com.replace(/\W/, "");
    if (listvideos.includes(input + ".mp4")) {
        return true;
    }
}
//empty vars
var sound = "";
var video = "";

// bot data
const Bot = new TwitchBot({
    username: process.env.USERNAME,
    oauth: process.env.OAUTH,
    channels: [process.env.TWITCH_CHANNEL]
  })

//bot things
Bot.on('join', channel => {
    console.log(`Joined channel: ${channel}`)
})
  
Bot.on('error', err => {
    console.log(err)
})
  
Bot.on('message', chatter => {
    if(chatter.message === '!list') {
      Bot.say('Sound: '+ listfiles.toString().replace(/.mp3/gi, "") + ' Video: ' + listvideos.toString().replace(/.mp4/gi, "") + ` PogChamp`)
    }
    
})

Bot.on('message', chatter => {
    if(chatter.message === '!coins') {
        Bot.say(chatter.display_name + ' ваш баланс составляет: ' + getCoins(chatter.display_name) + ' PogChamp')
    }
})

//scanbot
Bot.on('message', chatter => {
    if(command(chatter.message)){
        if(coinsOperator(chatter.display_name)) {
            sound = chatter.message.replace(/\W/, "");
            //console.log("coins spend: " + chatter.display_name);
        }
        
    } else if (videocommand(chatter.message)) {
        if(coinsOperator(chatter.display_name)) {
            video = chatter.message.replace(/\W/, "");
            //console.log("coins spend: " + chatter.display_name);
        }
        
    } else {
        userOperator(chatter.display_name);
    };
})



const content = {
    soundalert: (ctx) => {
        ctx.body = "/sounds/" + sound + ".mp3";
    },
    videoalert: (ctx) => {
        ctx.body = "/videos/" + video + ".mp4";
    },
    refreshaudio: (ctx) => {
        ctx.body = "refresh",
        sound = "";
    },
    refreshvideo: (ctx) => {
      ctx.body = "refreshvideo"
      video = "";
    }
};

koaapp.use(serve('misc'));

koaapp.use(_.get('/soundalert', content.soundalert));
koaapp.use(_.get('/videoalert', content.videoalert));
koaapp.use(_.get('/refreshaudio', content.refreshaudio));
koaapp.use(_.get('/refreshvideo', content.refreshvideo));

koaapp.listen(3000);

console.log('listening on port 3000');

