const discord = require("discord.js");
const ytdl = require("ytdl-core")
const config = require("../config.json")

exports.run = async(client, message, args) =>{
    message.delete().catch(err => console.log("Erro bobo!"))
     
if(!message.member.hasPermission('ADMINISTRATOR')){

     let embed = new discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setTitle(`Solicitação Negada!`)
     .setDescription(`${message.author}, Você não tem permissão para esse comando!`)
     .setThumbnail(message.guild.iconURL({dynamic: true}))
     .setTimestamp()
     .setColor("PURPLE")
     .setURL('https://www.youtube.com/channel/UCQ-dBcavpZ1Wj2OZdo9JU1w')
     .setFooter(`${message.guild.name} - Alguns direitos reservados ®`, message.guild.iconURL({dynamic: true}))

    return message.channel.send(embed).then(msg => {
        setTimeout(() => msg.delete(), 5000)
    });
} else {

    
    let channel2 = client.channels.cache.get(args[0])

    if(!channel2){
        return message.reply(`Esse canal não existe amigo(a)!`)
    } else if(channel2.type !== "voice"){
        return message.reply(`Esse canal não é de voz!`)
    } else{
        message.reply(`Ok! Fui movida com sucesso`)
        channel2.join()

        let broadcast = null,
         stream = ytdl(config.url);

        broadcast = client.voice.createBroadcast();
    broadcast.play(stream);

    const connection = await channel2.join()
    connection.play(broadcast)
  
    }
}
}