let fullPath = "";


let imagePath = `${fullPath}/img`;
let fishImages = [
    "fish-11796.png",
    "fish-11976.png",
    "fish-11977.png",
    "fish-11983.png",
    "fish-11987.png",
    "fish-11992.png",
    "fish-27.png",
    "fish-29.png",
    "octopus-35499.png",

];

let imageList = [];
for(let i = 0 ; i < fishImages.length; i++){
    let image = new Image();
    
//    image.setAttribute("src", "../empty.JPG");
    image.setAttribute("src", `img/${fishImages[i]}`);
    image.style.setProperty("max-width", "100%");
    
//    image.style.setProperty("display", `none`);
    
    imageList[i] = image;
}

