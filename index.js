
const discord = require("discord.js");
const ytdl = require("ytdl-core");
const config = require("./config.json")
const client = new discord.Client();



const list = [`Sou Bot Oficial da GabiCode`, `Vamos escutar lofi?`]

let i=0;


    client.login(config.token)



client.on('ready', async() =>{


    
   let intervalo = null



  let  Oline = ytdl(config.url)


  let  gabriel = null
    
    console.log(`Bot ${client.user.username} pronta`)
    
    setInterval(() => client.user.setActivity({
        name: `${list[i++ % list.length]}`,
        type: "STREAMING",
        url: 'https://www.twitch.tv/gabiwewe'
    }), 7000);
    
    client.user.setStatus('idle');

    channel = client.channels.cache.get(config.channelId) || await client.channels.fetch(config.channelId);
    gabriel = client.voice.createBroadcast();
    Oline.on('error', console.error);
    gabriel.play(Oline);
   if(!intervalo){
    intervalo = setInterval( async function() {
           try {
               channel.leave()
               Oline = ytdl(config.url);
               gabriel = client.voice.createBroadcast();
               Oline.on('error', console.error);
               gabriel.play(Oline)

               const connection = await channel.join()
               connection.play(gabriel);
               console.log("Bot conectado na database/canal");

           } catch (gb) {return channel.leave()} 
       }, 1200000)
   }
   try {

    const connection =  await channel.join()
    connection.play(gabriel);

   } catch (error){
     console.error(error);
     channel.leave()
   }


   setInterval(async function() {
       if (!client.voice.connections.size) {
           console.log("desconectado com sucesso!")
           if (!channel) return;
           try {
            Oline = ytdl(config.url)
            gabriel = client.voice.createBroadcast();
               Oline.on('error', console.error);
               gabriel.play(Oline);
   
               const connection = await channel.join();
               connection.play(gabriel);
               console.log("Conectado!")
           } catch (error) {
               console.error(error);
               channel.leave()
           }
       }
   }, 500);
 
});

client.on('message', async message => {
    if(message.channel.type == 'dm') {
        return message.author.send(`${message.author}, Por favor não me mande mensagens no meu privado!`).catch(err => console.log());
    }
})

client.on('message', message =>{
    if(message.channel.type == 'dm') {
         return false;
    }

    if(!message.content.toLocaleLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}`)) return
   
    const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
const command = args.shift().toLowerCase();

try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args);
    } catch (err) {
const messageErro = new discord.MessageEmbed()
.setColor('RED')
.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
.setTitle('Achei Um Erro!')
.setDescription(`❌ ${message.author} Esse comando "${command}" não existe!`)
.setTimestamp()
.addField(`😺 Achou algum erro?`, `[Click aqui!](https://discord.gg/Vy2A5RYKsY)`)
.setURL("https://www.youtube.com/channel/UCQ-dBcavpZ1Wj2OZdo9JU1w")
.setThumbnail(message.guild.iconURL({dynamic: true}))
.setFooter(`${message.guild.name} - Alguns direitos reservados ®`, message.guild.iconURL({dynamic: true}))

message.channel.send(messageErro)

        console.error('Erro:' + err)
    }
})

