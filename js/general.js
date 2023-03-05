function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function timeToString(time_ms){
    let result = "";
    
    let min = Math.floor((time_ms / 1000) / 60);
    if(min < 10){
        result = `0${min}:`;
    }
    else{
        result = `${min}:`;
    }
    
    let sec = Math.floor((time_ms / 1000) % 60);
    if(sec < 10){
        result += `0${sec}`;
    }
    else{
       result += `${sec}`; 
    }
    return result;
}