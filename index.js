const { 
    Client, 
    GatewayIntentBits, 
    PermissionFlagsBits, 
    EmbedBuilder, 
    REST, 
    Routes, 
    SlashCommandBuilder 
} = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');

// File lưu cấu hình auto role để không bị mất khi bot restart
const CONFIG_FILE = path.join(__dirname, 'autorole.json');

// Hàm đọc cấu hình
function getConfig() {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            const data = fs.readFileSync(CONFIG_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Lỗi đọc file cấu hình:', error);
    }
    return {};
}

// Hàm lưu cấu hình
function saveConfig(data) {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Lỗi ghi file cấu hình:', error);
    }
}

// Khởi tạo Express server để giữ bot JangJii sống 24/7 trên Render[span_0](start_span)[span_0](end_span)
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot JangJii Role đang hoạt động ổn định!');
});

app.listen(PORT, () => {
    console.log(`Server web đang chạy trên cổng ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers, // Bắt buộc bật để chạy Auto Role
    ],
});

// ================= CẤU HÌNH CHO BOT JANGJII =================
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || 'ĐIỀN_TOKEN_BOT_2_VÀO_ĐÂY';[span_1](start_span)[span_1](end_span)
const CLIENT_ID = process.env.CLIENT_ID || 'ĐIỀN_CLIENT_ID_CỦA_BOT_VÀO_ĐÂY';[span_2](start_span)[span_2](end_span)
const OWNER_ID = process.env.OWNER_ID || 'ĐIỀN_ID_DISCORD_CỦA_BẠN_VÀO_ĐÂY';[span_3](start_span)[span_3](end_span)
// =============================================================

// Nhóm 1: 12 role game ban đầu[span_4](start_span)[span_4](end_span)
const roleConfig1 = [
    { emoji: '9_ygame_lienquan', emojiId: '1553138867127975986', roleId: '1553120963435044884', text: '<:9_ygame_lienquan:1553138867127975986> <@&1553120963435044884>' },
    { emoji: '9_ygame_tft', emojiId: '1553138907212677140', roleId: '1553121311713140786', text: '<:9_ygame_tft:1553138907212677140> <@&1553121311713140786>' },
    { emoji: 'Minecraft', emojiId: '1553139630516347034', roleId: '1553121044057817130', text: '<:Minecraft:1553139630516347034> <@&1553121044057817130>' },
    { emoji: 'amongus', emojiId: '1553317362843779113', roleId: '1553121507373351074', text: '<:amongus:1553317362843779113> <@&1553121507373351074>' },
    { emoji: 'cs2', emojiId: '1553316893861875785', roleId: '1553121125867716729', text: '<:cs2:1553316893861875785> <@&1553121125867716729>' },
    { emoji: 'freefire', emojiId: '1553316932114194522', roleId: '1553121167336800287', text: '<:freefire:1553316932114194522> <@&1553121167336800287>' },
    { emoji: 'lienminh', emojiId: '1553139604893474906', roleId: '1553121085656932466', text: '<:lienminh:1553139604893474906> <@&1553121085656932466>' },
    { emoji: 'ple', emojiId: '1553316967543349332', roleId: '1553121599291400293', text: '<:ple:1553316967543349332> <@&1553121599291400293>' },
    { emoji: 'roblox', emojiId: '1553139536408748034', roleId: '1553121240330535002', text: '<:roblox:1553139536408748034> <@&1553121240330535002>' },
    { emoji: 'steam91', emojiId: '1553139045150761040', roleId: '1553121280365035611', text: '<:steam91:1553139045150761040> <@&1553121280365035611>' },
    { emoji: '9_ygame_gta5', emojiId: '1553771929238904913', roleId: '1553768841270530048', text: '<:9_ygame_gta5:1553771929238904913> <@&1553768841270530048>' },
    { emoji: 'KannaWhat', emojiId: '1553774065624424568', roleId: '1553773720181416107', text: '<:KannaWhat:1553774065624424568> <@&1553773720181416107>' }
];

// Nhóm 2: 3 role đặc biệt[span_5](start_span)[span_5](end_span)
const roleConfig2 = [
    { emoji: 'abowblue2', emojiId: '1553325325293719562', roleId: '1553122069733187695', text: '<a:abowblue2:1553325325293719562> <@&1553122069733187695>' },
    { emoji: 'abowpink94', emojiId: '1553325355337785435', roleId: '1553122100691079208', text: '<a:abowpink94:1553325355337785435> <@&1553122100691079208>' },
    { emoji: 'lgbtqheart', emojiId: '1553326497849151498', roleId: '1553122149391273984', text: '<a:lgbtqheart:1553326497849151498> <@&1553122149391273984>' }
];

// Đăng ký các lệnh Slash Command (bao gồm cả lệnh cấu hình auto role)
const commands = [
    new SlashCommandBuilder()
        .setName('reaction')
        .setDescription('Gửi bảng 12 role game ban đầu'),
    
    new SlashCommandBuilder()
        .setName('reaction2')
        .setDescription('Gửi bảng 3 role đặc biệt'),

    new SlashCommandBuilder()
        .setName('autorole')
        .setDescription('Cài đặt role tự động gán cho thành viên mới khi vào server')
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('Chọn role muốn auto cấp')
                .setRequired(true)
        )
].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`[Bot JangJii] Đã đăng nhập: ${client.user.tag}!`);[span_6](start_span)[span_6](end_span)
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('Đã cập nhật tất cả lệnh thành công (có /autorole)!');[span_7](start_span)[span_7](end_span)
    } catch (error) {
        console.error(error);
    }
});

// ================= TÍNH NĂNG AUTO ROLE TỰ ĐỘNG =================
client.on('guildMemberAdd', async (member) => {
    try {
        const config = getConfig();
        const autoRoleId = config[member.guild.id]; // Lấy ID role cấu hình riêng theo từng server
        
        if (!autoRoleId) return;

        const role = member.guild.roles.cache.get(autoRoleId);
        if (role) {
            await member.roles.add(role);
            console.log(`[AutoRole] Đã cấp role ${role.name} cho thành viên mới: ${member.user.tag}`);
        }
    } catch (error) {
        console.error('Lỗi khi cấp auto role:', error);
    }
});
// ==============================================================

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const isOwner = interaction.user.id === OWNER_ID;
    const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);

    if (!isOwner && !isAdmin) {
        return interaction.reply({ content: '❌ Bạn không có quyền sử dụng lệnh này!', ephemeral: true });[span_8](start_span)[span_8](end_span)
    }

    // Lệnh cài đặt Auto Role
    if (commandName === 'autorole') {
        const targetRole = interaction.options.getRole('role');
        const config = getConfig();
        
        config[interaction.guild.id] = targetRole.id;
        saveConfig(config);

        return interaction.reply({ 
            content: `✅ Đã thiết lập thành công **${targetRole.name}** làm Auto Role cho server này!`, 
            ephemeral: true 
        });
    }

    if (commandName === 'reaction') {
        await interaction.deferReply({ ephemeral: true });
        let desc = 'Thả cảm xúc vào các icon bên dưới để nhận hoặc hủy role game tương ứng:\n\n';
        roleConfig1.forEach(i => desc += `${i.text}\n`);
        const embed = new EmbedBuilder().setColor('#FF4500').setTitle('🎮 Chọn Role Game Mà Bạn Muốn ').setDescription(desc);
        const sentMsg = await interaction.channel.send({ embeds: [embed] });
        for (const i of roleConfig1) {
            await sentMsg.react(`${i.emoji}:${i.emojiId}`).catch(() => {});
        }
        await interaction.editReply({ content: '✅ Đã tạo bảng reaction thành công!' });[span_9](start_span)[span_9](end_span)
    }

    if (commandName === 'reaction2') {
        await interaction.deferReply({ ephemeral: true });
        let desc = 'Thả cảm xúc vào các icon bên dưới để nhận hoặc hủy các vai trò đặc biệt:\n\n';
        roleConfig2.forEach(i => desc += `${i.text}\n`);
        const embed = new EmbedBuilder().setColor('#00FFFF').setTitle('✨Chọn Giới Tính Của Bạn✨').setDescription(desc);
        const sentMsg = await interaction.channel.send({ embeds: [embed] });
        for (const i of roleConfig2) {
            await sentMsg.react(`${i.emoji}:${i.emojiId}`).catch(() => {});
        }
        await interaction.editReply({ content: '✅ Đã tạo bảng reaction 2 thành công!' });[span_10](start_span)[span_10](end_span)
    }
});

// Xử lý thêm role khi thả reaction[span_11](start_span)[span_11](end_span)
client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch().catch(() => {});

    const emojiId = reaction.emoji.id;
    const allConfigs = [...roleConfig1, ...roleConfig2];
    const found = allConfigs.find(item => item.emojiId === emojiId);

    if (!found) return;

    const guild = reaction.message.guild;
    if (!guild) return;

    try {
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(found.roleId);
        if (role && !member.roles.cache.has(role.id)) {
            await member.roles.add(role);
        }
    } catch (error) {
        console.error(error);
    }
});

// Xử lý gỡ role khi bỏ reaction[span_12](start_span)[span_12](end_span)
client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch().catch(() => {});

    const emojiId = reaction.emoji.id;
    const allConfigs = [...roleConfig1, ...roleConfig2];
    const found = allConfigs.find(item => item.emojiId === emojiId);

    if (!found) return;

    const guild = reaction.message.guild;
    if (!guild) return;

    try {
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(found.roleId);
        if (role && member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
        }
    } catch (error) {
        console.error(error);
    }
});

client.login(DISCORD_TOKEN);
