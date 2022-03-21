const fs = require('fs');
const prompt = require('prompt-sync')();
let data = JSON.parse(fs.readFileSync('intents.json'));
let debug = false
var spawn = require('child_process').spawn
var exec = require('child_process').exec,child;
const path = require('path');
const schedule = require('node-schedule');
var ws = require('windows-shortcuts');
function open(input, tag){
let programs = JSON.parse(fs.readFileSync('Applications/alias.json'));
            if(input.msg.split(tag.call).length == 1){return}
            if(input.msg.split(tag.call)[1].includes(".com") || input.msg.split(tag.call)[1].includes(".org") || input.msg.split(tag.call)[1].includes(".net") || input.msg.split(tag.call)[1].includes("https")) {exec('"Applications/opera".lnk ' +input.msg.split(tag.call)[1]);  return}
            if(fs.existsSync("Applications/"+input.msg.split(tag.call)[1].split(" ")[1]+'.lnk') || input.msg.split(tag.call)[1].split(" ")[1] in programs || input.msg.split(tag.call)[1].split(" ")[1]+'.lnk' in programs){
            if(fs.existsSync("Applications/"+input.msg.split(tag.call)[1].split(" ")[1]+'.lnk') ){
            spawn(path.resolve('Applications', input.msg.split(tag.call)[1].split(" ")[1]+'.lnk'),  { shell: true })
            } else if (input.msg.split(tag.call)[1].split(" ")[1] in programs){
                spawn(path.resolve('Applications', programs[input.msg.split(tag.call)[1].split(" ")[1]]+'.lnk'),  { shell: true })   
            } else if (input.msg.split(tag.call)[1].split(" ")[1]+'.lnk' in programs){
                spawn(path.resolve('Applications', programs[input.msg.split(tag.call)[1].split(" ")[1]+'.lnk']+'.lnk'),  { shell: true })  
            }

            console.log("found and opening ;)")
            } else {
                console.log("not found\nwould one of these be what youre looking for?")
                fs.readdirSync('Applications').forEach(file => {
                    if(file.split(".")[1] == "lnk"){
                    console.log(file);
                    }
                  });
                  let inp = prompt().toLowerCase();
                  if(inp == "yes" ){
                      console.log("which one would you like to set " + input.msg.split(tag.call)[1].split(" ")[1] + " to open?")
                      while(true){
                    inp = prompt().toLowerCase();
                    if(fs.existsSync("Applications/"+inp+'.lnk') || fs.existsSync("Applications/"+inp)){
                        programs[input.msg.split(tag.call)[1].split(" ")[1]] = inp
                        fs.writeFileSync('Applications/alias.json', JSON.stringify(programs));
                        console.log("added!")
                        break
                      } else {
                        console.log("please check spelling and try again <3")
                      }
                    }
                  } else if (inp == "no"){
                    console.log("please give me the path to the program!")
                    inp = prompt().toLowerCase();
                    
                    ws.create("Applications/"+input.msg.split(tag.call)[1].split(" ")[1]+".lnk", inp);
                    console.log("created! " +inp+ " will open on "+input.msg.split(tag.call)[1].split(" ")[1]+ " now!:)")
                  } else if (fs.existsSync("Applications/"+inp+'.lnk')  || fs.existsSync("Applications/"+inp)){
                    programs[input.msg.split(tag.call)[1].split(" ")[1]] = inp
                    fs.writeFileSync('Applications/alias.json', JSON.stringify(programs));
                    console.log("added!")
    }}
}
module.exports = { open };
        