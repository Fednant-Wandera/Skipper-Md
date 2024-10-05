const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkpBYSszSkx3WkN6RWhQWVc4TmsyOXp1WjZmUHpqTVZJMmZYZ2h6Y0VrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVG5XTU5Va2VBYW55dHZIWTdsV24xRGh3amEyMDdzUWE2N1JGdGFaV2pVMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRWIwOWd2MjltbWtDc0JEU0E5VWZWcW01dTZVcEQ3ajFiTU9Dc3hWdTFrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQVBwUnNNMGNheGt5RnFpMjJCWEJmUUwzN2hjaHp5OU8xdm50Y2R3T2w4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1GZENQU1hTb09hcytVcVBXZUdlT0ZrK0NqckdFby9YWjNHMnBFSVpURTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imc0clJuNFludkd4VmhPdHpybkVRclJnNGQ5OWFkcVZ4cW9GZE0wYjg0ajA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUo0dWtVTEVZZ0Z3MjkycTZaNCt3QUt1MkVYTTNKQjNGL3FEREsxVnkyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRklwdHA3TVo2NWpxSncySnZwWjIzQ2N4dlZSVmRzU1E5WE5GL0hxem1BWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktLR200T3ZsL3grNDZrS3YvZXNJYm1oOXpwNVFhaEpvZVM1MUl4K2padXVSWG9rYlU4NTdtbkF2UTAzdWVrYkR3clpVRTJXbkU4bzNhQnFWU1lKbmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MSwiYWR2U2VjcmV0S2V5IjoieG5zellLTDgzeVBRTzdmMXBib3lFSW5GcVNINm5oeXdXTDk3dDZ6Y1BQaz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiRHdSLU1pbkVRdWFYZEJnRmY5QW5VQSIsInBob25lSWQiOiI4MDUyNTg2OS1lYzA0LTQ1ZjktODk4Yi0zMDM0NWI2MzE4NWIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHU3ejgyTVhLOW1ObHIzMzNCbXpOclk0QlBrPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImszakM5eTVZMWp1aktZdjlYTndreWZBUm1HUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJYUzZQVFg3VyIsIm1lIjp7ImlkIjoiMjU0Nzk1NjUwODYzOjE0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkZlZGR5IFdhbmRlcmEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pxMW5yTUNFS0dHZzdnR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjQ2dmoxVkdJaE5sVmV0Ti9tY2REaTlUTUNuUDA2QmhGVlFPeGFUSXNXVjg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkJsdXVSTHQrUTFWV2dxZGkwb3RSTWZmTldGbC96YW9iWVBNbzlPZjhraWRQYmUxMlV4UFVDbDFhOSt1NkJSL3RGY0NtQXZITERqbGtGQXlGYURVMEJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJuanJPV05pamdPY1hHOGdwV1FEQVI4UDRjNmJBSXAxc1pFaitkMWhHTWFnWlRtTjREd05xTGJJS2hhN1dkK05hb1Fvb3k3d0JWTzFaQTNQL1JWOURoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5NTY1MDg2MzoxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlT3I0OVZSaUlUWlZYclRmNW5IUTR2VXpBcHo5T2dZUlZVRHNXa3lMRmxmIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4MTAzMjE0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlpMCJ9',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "Feddy",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254795650863",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Feddy',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '2' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
