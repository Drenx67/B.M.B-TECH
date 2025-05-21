const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK09mcS9kcmwxYzNaTVBuc3NxV3UwZExDdFNHeEVmU25aZExLRUlvNnVHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFRpa1lLWlBQTTg1L2o3dEh3YXlkSTRJcm5teGNteGNZNzRZbjFEbkptVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRmtaOWcxTlJVcEVmS1JaZENnYXR2ZGZyWjFwMmxwTS9xeHd4dTNTRzBNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwRFBOajVOdWtDeTM5OHE1aVpoRno0OFZPcFRjVTJYaXZiTFRrcVBIV0dVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndPS0NqSWNlZ2FmbjVHeUdmMkdsK1lQdXNoK3Z1dmJCSVhaMUU3TkJvbUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRmMVVWZTVoTzVGczVEY2ZUaEx4S29kdDJEakl1OFJ5ZURwSXVZM0pOakE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZiV1d2em92ZmhNOE1DSEx2b2hUL2pYaTRZci9qQWlqd2pFMlc2b1VXOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1FBUTBHVkFZNzA4VGhYRUM4dmd5K0k4cFF2ZHFsaDlGalB1U3ZCem4yUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRGb1d1TnRtN3Vhc0tvTndmZk5GZmxVWFlYR2dEZFFwUEErVEdxNk5aTFpHbkl5aFFmejVzZEEwYk1YejhCQlZ0SGUzMG4vQjJ6NHB5U09SbFpkckNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg1LCJhZHZTZWNyZXRLZXkiOiJnaTV1UWpFVmJ5UVhBZDlScTRBR1Q4bU13MlRIVGlVSDA0TUdiMk1lck5VPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDQTY0OUUzQ0ZGMjlCMDJGQjBDOTUzNEE5NEVDRjA1MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODM3NDE0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTA3ODE3OTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzQ5MDNCOTQxMEUxNThDNEZBOUQwQkJFOEFGMjZBNjMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzgzNzQxNX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzEwNzgxNzk1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkUyMTMwQ0IyNTM0ODdFM0EwMDE5NUJGQ0I4RTZBQjk5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4Mzc0MjV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlRFRVo0SjVYIiwibWUiOnsiaWQiOiIyNjM3MTA3ODE3OTU6MTlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI1OTQ5MDE5NjAxNzMyMDoxOUBsaWQiLCJuYW1lIjoi8J2Qt/CdkLXwnZGM4pyvIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLM2t0SkFFRU5mRHQ4RUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0MnlIcmo1QkdGTjhFRzg1WEtLYm9sRHJKQTFQdC9IZE9IK2srT1Znd0NVPSIsImFjY291bnRTaWduYXR1cmUiOiJhbGw0SGI0bEtDYW1BdkFrMkk5dVlQQlh1RmEwMFExcDFlSlJUN0dTVHNsSU9BQnp1QXVra2w0VlZqVXg5cGNSQUltSllXVnhnU2hCcGpTekovOUtCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYUpzWlpSRWdCdVZWSjQvbkJKTmpGSTl4R2IvaXB0WGxZczJDU1hWNGJQQmtlbDlJMEJEVXNCOCs4ckxJUGRPUWhCcEVSb2JnM2Zkc0VwMW8rR3N5Qmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTA3ODE3OTU6MTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmRzaDY0K1FSaFRmQkJ2T1Z5aW02SlE2eVFOVDdmeDNUaC9wUGpsWU1BbCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3ODM3NDEyLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQS9EIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐵𝑌✯",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝐷𝐵𝑌✯",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

