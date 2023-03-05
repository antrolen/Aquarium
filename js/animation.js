function getFishList() {
    return document.querySelector('.container');
}



function getExampleFish() {

    result = document.createElement("div");
    result.className = "box-fish";

    return result;
}

function getTimerTextField() {
    return document.querySelector(".timer").firstElementChild;
}

function getFishCounterTextField() {
    return document.querySelector(".fishcounter").firstElementChild;
}



let fishList = getFishList();


function getMaxWidth(box) {
    return fishList.clientWidth - box.clientWidth;
}

function getMaxHeight(box) {
    return fishList.clientHeight - box.clientHeight - 10;
}



// ===============

class Box {
    constructor(div, isStopped) {
        this.box = div;

        this.direct_rd = 0;
        this.timerId;
        this.setStyle();
    }

    setStyle() {
        let l = random(0, getMaxWidth(this.box));
        let t = random(0, getMaxHeight(this.box));

        this.setPosition(l, t);

    }

    setPosition(X_px, Y_px) {
        this.box.style.setProperty("left", `${X_px}px`);
        this.box.style.setProperty("top", `${Y_px}px`);
    }

    setTransitionProperty(pos_rate_ms = 0, trans_rate_ms = 0) {
        const timingFuncPos = "ease";
        const timingFuncTrans = "linear";
        this.box.style.setProperty("transition",
            `left ${pos_rate_ms}ms ${timingFuncPos} 0ms,
            top ${pos_rate_ms}ms ${timingFuncPos} 0ms,
            transform ${trans_rate_ms}ms ${timingFuncTrans} 0ms`);
    }

    setTransformProperty(Oz_rad, Oy_rad = 0) {
        this.box.style.setProperty("transform",
            `rotateY(${Oy_rad}rad)
                rotateZ(${Oz_rad}rad) `);
    }


    move(dur_ms, isStopped) {

        if (isStopped) {
            this.timerId = setTimeout(() => {
                this.move(dur_ms, isStopped);
            }, dur_ms);
            return;
        }

        this.timerId = setTimeout(() => {

            let dT_ms = random(500, 2000);
            let dTtarnsform_ms = 300;

            this.direct_rd = random(0, 2 * Math.PI);
            let R = random(50, 300);

            let dX = R * Math.cos(this.direct_rd);
            let dY = R * Math.sin(this.direct_rd);

            let X0 = parseInt(this.box.style.left, 10);
            let Y0 = parseInt(this.box.style.top, 10);

            let Xmax = getMaxWidth(this.box);
            let Ymax = getMaxHeight(this.box);

            if (X0 + dX > Xmax) {
                dX = Xmax - X0;
            } else if (X0 + dX < 0) {
                dX = -X0;
            }
            if (Y0 + dY > Ymax) {
                dY = Ymax - Y0;
            } else if (Y0 + dY < 0) {
                dY = -Y0;
            }
            this.direct_rd = Math.atan2(dY, dX);

            if (-Math.PI / 2 < this.direct_rd && this.direct_rd < Math.PI / 2) {
                this.setTransformProperty(this.direct_rd);

            } else if (-Math.PI / 2 > this.direct_rd) {
                this.setTransformProperty(-Math.PI - this.direct_rd, Math.PI);

            } else if (this.direct_rd > Math.PI / 2) {
                this.setTransformProperty(Math.PI - this.direct_rd, Math.PI);

            } else {
                this.setTransformProperty(random(0, 1));
            }

            this.setPosition(X0 + dX, Y0 + dY);
            this.setTransitionProperty(dT_ms, dTtarnsform_ms);

            this.move(dT_ms + dTtarnsform_ms, isStopped);

        }, dur_ms);
    }

    stop() {
        clearTimeout(this.timerId);
    }

}

// ***********************************************
// Параметры игры
// ***********************************************
let fishCounter = 0;
let fishes = [];
let timerDuration_ms = 0;


function multiplyFishes(number = 1, isStopped) {
    let docFrag = document.createDocumentFragment();
    let examlpeFish = getExampleFish();

    for (let i = 0; i < number; i++) {
        let newFishElem = examlpeFish.cloneNode(true);
        let imgElem = imageList[random(0, imageList.length - 1)].cloneNode(true);
        fishes[i] = new Box(newFishElem, isStopped);

        imgElem.onload = () => {
            fishes[i].move(10, isStopped);
        }

        newFishElem.appendChild(imgElem);
        docFrag.appendChild(newFishElem);

    }
    fishCounter = number;
    fishList.appendChild(docFrag);

}

function onFishClick(event) {
    let target;
    if (event.target.parentElement.className == "box-fish") {
        event.target.parentElement.remove();
        fishCounter--;
        getFishCounterTextField().innerText = fishCounter;
    } 
}

function startTimer() {
    let timeStart = Date.now();
    let timeCounterId = setInterval(() => {
        let dT = Date.now() - timeStart;

        if (fishCounter && dT < timerDuration_ms) {
            getTimerTextField().innerText = timeToString(timerDuration_ms - dT);
        } else {
            clearInterval(timeCounterId);
            fishList.removeEventListener("click", onFishClick);

            if (!fishCounter) {
                alert("Игра завершена. \nВы ВЫИГРАЛИ!");

            } else {
                alert("Игра завершена. \nВы ПРОИГРАЛИ!");
            }
        }

    }, 500);
    return timeCounterId;
}

// ***********************************************
// Запуск игры
// ***********************************************
function startGame() {
    fishCounter = +prompt("Сколько рыбок в аквариуме");
    if (fishCounter == 0 || !(fishCounter === fishCounter)) {
        alert("Игра отменена");
        return;
    }

    let counter_s = +prompt("Введите желаемое время игры (в секундах).\n" + 
                            "За это время нужно будет кликнуть всех рыбок");
    if (counter_s == 0 || !(counter_s === counter_s)) {
        alert("Игра отменена");
        return;
    }
    let canceled = false;
    // Создаем рыбок
    multiplyFishes(fishCounter, canceled);
    getFishCounterTextField().innerText = fishCounter;

    // Запускаем таймер
    timerDuration_ms = counter_s * 1000;
    getTimerTextField().innerText = timeToString(timerDuration_ms);
    fishList.addEventListener("click", onFishClick);
    startTimer();

}

startGame();
