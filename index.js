const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Europe/Oslo', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1219187451487322133')
    .setType('STREAMING')
    .setURL('https://www.youtube.com/watch?v=AjWfY7SnMBI') //Must be a youtube video link 
    .setState('W E L C O M E')
    .setName('8kflixy')
    .setDetails(`gg/frieza [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://qph.cf2.quoracdn.net/main-qimg-ff60160d5a80bd25f7387f8072481969') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('MIGHT BE AFK') //Text when you hover the Large image
    .setAssetsSmallImage('https://media3.giphy.com/media/l4ua3fJyY3dnLWYBwc/giphy.gif?cid=6c09b952kld0oaw72ttoc0wat57odqc8jgd2hqibszc1uib5&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('FIRE') //Text when you hover the Small image
    .addButton('Discord Server', 'https://discord.gg/frieza')
    .addButton('My Links', 'https://linktr.ee/flixy.ae');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `gg/frieza [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
