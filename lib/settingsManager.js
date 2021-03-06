'use strict'

const fs = require('fs');
const colors = require('./consolecolors.js');

const DEFAULTSETTINGS = {
   prefix: '!',
   superusers: [],
   blacklist: [],
   permissions: {
      permCap: 100,
      permLevels: {},
   },
   commands: {
      parentCommand: {
         acknowledge_invalid: false,
      }
   }
};

class SettingsManager {

   constructor() {
      let settingsfile;

      try {
         settingsfile = fs.readFileSync('settings.json');
      } catch (ignored) {
         console.log(colors.format(colors.fg.yellow), 'Settings.json file does not exist. Creating one using default settings.');
         
         fs.writeFileSync('settings.json', JSON.stringify(DEFAULTSETTINGS));

         console.log(colors.format(colors.fg.green), 'File creation successful!');

         settingsfile = fs.readFileSync('settings.json');
      }

      this.settings = JSON.parse(settingsfile);
      this.settings['version'] = process.env.npm_package_version;
   }

   getGlobal() {
      return this.settings;
   }

   setGlobal(newSettings) {
      this.settings = newSettings;
   }

   getCmd(cmd) {
      return this.settings.commands[cmd];
   }

   setCmd(cmd, value) {
      this.settings.commands[cmd] = value;
   }

   get(key) {
      return this.settings[key];
   }

   set(key, value) {
      this.settings[key] = value;
   }

   writeToFile() {
      fs.writeFile('settings.json', JSON.stringify(this.settings), err => {
         if (err) {
            console.log(colors.format(colors.fg.red), '[CRITICAL] There was a problem saving settings to file');
         }
      });
   }

   save() {
      this.writeToFile();
   }
}

module.exports = SettingsManager;