// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
//https://docs.expo.dev/guides/using-firebase/#configure-metro
config.resolver.sourceExts.push("cjs");

module.exports = config;
