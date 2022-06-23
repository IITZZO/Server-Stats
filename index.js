
//=========== Strings ==========
const Discord = require("discord.js");  
const client = new Discord.Client();
const {ch_Member_id , ch_bot_id , Guild_id , status_id , catg_m_id , token} = require("./config.json");


//=========== Function =========
function AliveVoice() {
    const targetguild = client.guilds.cache.get(`${Guild_id}`)
    const voiceChannels = targetguild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;

    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    client.channels.cache.get(`${catg_m_id}`).setName(`Voice Count - ` + count)
    
};

function memberstates() {
    let guild = client.guilds.cache.get(`${Guild_id}`);
    client.channels.cache.get(`${status_id}`).setName(`🟢 ${guild.members.cache.filter(m => m.presence?.status == `online`).size} 🔴 ${guild.members.cache.filter(m => m.presence?.status == `dnd`).size} 🌙 ${guild.members.cache.filter(m => m.presence?.status == `idle`).size}  ⚫ ${guild.members.cache.filter(m => m.presence.status == `offline` || !m.presence).size}`);
    
};



//========== Clients ===========
client.on("ready", () =>{

    console.log("Client Success Loged In : " + client.user.tag )
    let guild = client.guilds.cache.get(`${Guild_id}`)

    client.user.setPresence({
        status : "dnd",
        activity : {
            name : `Made By - 𝐄𝐥𝐞𝐜𝐓𝐫𝐨𝐍 ᴮˡᵃᶜᵏ ᴿᵒˢᵉ#0001`,
            type : "COMPETING"
        }
    })
    setInterval(() => {
        memberstates()
        AliveVoice()
    }, 120000)

});

client.on("guildMemberAdd", (member) =>{
    let guild = client.guilds.cache.get(`${Guild_id}`)
    client.channels.cache.get(`${ch_Member_id}`).setName(`👥 Total User - ` + guild.memberCount)
    client.channels.cache.get(`${ch_bot_id}`).setName(`🤖 Bots - ` + guild.members.cache.filter(member => !member.user.bot).size)
});

client.on("guildMemberRemove", (member) =>{
    let guild = client.guilds.cache.get(`${Guild_id}`)
    client.channels.cache.get(`${ch_Member_id}`).setName(`👥 Total User - ` + guild.memberCount)
    client.channels.cache.get(`${ch_bot_id}`).setName(`🤖 Bots - ` + guild.members.cache.filter(member => !member.user.bot).size)
});



//========== Client Log In ========

client.login(`${token}`)
