const fs = require('fs');
const prompt = require('prompt-sync')();
let data = JSON.parse(fs.readFileSync('intents.json'));
let debug = false
var spawn = require('child_process').spawn
const path = require('path');
const schedule = require('node-schedule');
var ws = require('windows-shortcuts');
const lib = require("./actions.js")
//

function action(input){
    for(let tag of input.tags){
        if(tag.action){
            switch(tag.tag){
                case'music':
                console.log(input.msg.split(tag.call)[1])
                break;
                case'remind':
                
                console.log(input.time);
                break;
                case'open':
                lib.open(input, tag)
                break;
            }
        }
    }
    }
// 
function assignTags(input, data){
    for(let intent of data.intents){
        for(let pattern of intent.patterns){
        for(let word of input.msg.split(' ')){
            if(word==pattern){
                //input[intent.tag] = intent.priority;
                tag = intent.tag
                pri = intent.priority
                input.tags.push({"tag":intent['tag'],"priority":intent['priority'],"action":intent['action'],"call":word})
            }
        }
    }
    }
    }
//
while(true){
var date = new Date().toString();
let input = {'msg':'', 'pred':{"positivity":0}, "tags":[], "time":{"hour":date.split(" ")[4].split(":")[0],"min":date.split(" ")[4].split(":")[1],"sec":date.split(" ")[4].split(":")[2]}}
input.msg = prompt().toLowerCase();
if(input.msg.split("")[0]=='.'){
    switch(input.msg.split(" ")[0]){
        case'.debug':
        console.log("--debug mode--")
        debug = !debug;
        break;
        case'.view':
            console.log(data)
        break;
        case'.add':

        if(typeof(data.pred[input.msg.split(" ")[1]])!='undefined'&& typeof(data.pred[input.msg.split(" ")[1]][input.msg.split(" ")[2]])!='undefined'){
        data.pred[input.msg.split(" ")[1]][input.msg.split(" ")[2]].push(input.msg.split(" ")[3])
        fs.writeFileSync('intents.json', JSON.stringify(data));
        console.log("added:)")
        }else{
            if(typeof(data.pred[input.msg.split(" ")[1]])=='undefined'){
                data.pred[input.msg.split(" ")[1]] = {"pos":[],"neg":[]}
                //console.log(data)
                if(typeof(data.pred[input.msg.split(" ")[1]])!='undefined'&& typeof(data.pred[input.msg.split(" ")[1]][input.msg.split(" ")[2]])!='undefined'){
                    data.pred[input.msg.split(" ")[1]][input.msg.split(" ")[2]].push(input.msg.split(" ")[3])
                fs.writeFileSync('intents.json', JSON.stringify(data));
                console.log('added new category!! my knowledge grows;)')
                } else {
                    fs.writeFileSync('intents.json', JSON.stringify(data));
                console.log('added new category!! my knowledge grows;) (minor error w/ 3rd(?) phrase, still added)')
                }
            } else {
            console.log("error:(    (most likley typoed the 3rd(?) phrase, should've been either pos or neg")
            }
        }
        break;
        case'.remove':
        if(input.msg.split(" ").length == 2){
            if(typeof(data.pred[input.msg.split(" ")[1]])=='undefined'){
                console.log("predition list not found")
            } else {
                delete data.pred[input.msg.split(" ")[1]]
                fs.writeFileSync('intents.json', JSON.stringify(data));
            }
        } else if(input.msg.split(" ") == 3){
            if(typeof(data.pred[input.msg.split(" ")[1]])=='undefined'){
                console.log("predition list not found")
            } else if(typeof(data.pred[input.msg.split(" ")[1]][input.msg.split(" ")[2]])=='undefined'){
                console.log("value in prediction table not found")
            } else {
                delete data.pred[input.msg.split(" ")[1]][input.msg.split(" ")[2]]
                fs.writeFileSync('intents.json', JSON.stringify(data));
            } 
        } else {
            console.log("error:( too many or little paramaters")
        }
        break;
    }
} else {
//judges input
for(let word of input.msg.split(' ')){
    //console.log(word)
    for(let phrase of data.pred.positivity.pos){
        if(phrase == word){
            input.pred.positivity += 1
        }
    }
    for(let phrase of data.pred.positivity.neg){
        if(phrase == word){
            input.pred.positivity -= 1
        }
    }
}
//adding tags
assignTags(input, data)

//adding tags
//handling actions
let spl = input.msg.split("and")
for(let m of spl){
input.msg = m
action(input)
}


//handling actions
if(debug){
    console.log(input)
}

if(input.msg == 'bye'){
    break
}

//
}

}//must be at end
//console.log(intents);

//
