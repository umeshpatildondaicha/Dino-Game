var dino = document.getElementById("dino");
var cactus = document.getElementById("cactus");
var timer = document.getElementById("timer");
var dinoJumpImgSrc = "./assets/jump.gif"; 
var dinoJ = "./assets/person1.gif"; 
let realTime = "00:00:00";
let timeInSec = 0;
let highTime = JSON.parse(localStorage.getItem("time"));

var storedTime = localStorage.getItem("highTime");
var highTimeObj = JSON.parse(storedTime);
var highTimeString = (highTimeObj && highTimeObj.time) ? highTimeObj.time : "00:00:00";
document.getElementById("hm").innerText = highTimeString;
// highTime =  highTime==null?"00:00:00":highTime.time;




// function parseTimeString(timeString) {
//   if (!timeString) {
//     return null; // or handle the case however you prefer
//   }
//   let [hours, minutes, seconds] = timeString.split(":");
//   return new Date(0, 0, 0, hours, minutes, seconds);
// }

var timer_interval;

function start_time() {
  if (timer_interval) {
    clearInterval(timer_interval);
  }

  timer_interval = setInterval(function () {
    timeInSec += 1;
    convertSecondsToTime();
  }, 10);
}

function convertSecondsToTime() {
  given_seconds = timeInSec;

  dateObj = new Date(given_seconds * 10);
  minutes = dateObj.getUTCMinutes();
  seconds = dateObj.getSeconds();
  miliSeconds = dateObj.getMilliseconds();

  timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0") +
    ":" +
    (miliSeconds / 10).toString().padStart(2, "0");

  timer.textContent = timeString;
}

function reset_time() {
  clearInterval(timer_interval);
  timeInSec = 0;
  timer.textContent = "00:00:00";
}

function jump() {
  if (dino.classList != "jump") {
    dino.setAttribute("src", dinoJumpImgSrc);
    dino.classList.add("jump");
    setTimeout(function () {
        dino.setAttribute("src", dinoJ);
    }, 900);
    
  }
  setTimeout(function () {
    dino.classList.remove("jump");
  }, 600);

}

document.addEventListener("keyup", function () {
  jump();
});

let live = setInterval(function () {
  let topDino = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let rightCactus = parseInt(
    window.getComputedStyle(cactus).getPropertyValue("right")
  );

  if (rightCactus > 505 && rightCactus < 540 && topDino > -85) {
    reset_time();
  
    var timeString1 = "00:01:66";
    var timeString2 = "00:02:77";
  
    // Convert time strings to Date objects
    var time1 = new Date("1970-01-01T" + timeString1 + "Z");
    var time2 = new Date("1970-01-01T" + timeString2 + "Z");
  
    highTime = JSON.parse(localStorage.getItem("highTime"));
    if (highTime) {
      highTime = new Date("1970-01-01T" + highTime.time + "Z");
  
      // Compare the time values
      if (highTime > time1) {
        localStorage.setItem("highTime", JSON.stringify({ time: timeString1 }));
      } else if (highTime > time2) {
        localStorage.setItem("highTime", JSON.stringify({ time: timeString2 }));
      }
    }
  
    var currentTime = new Date("1970-01-01T" + timeString + "Z");
  
    if (!highTime || currentTime > highTime) {
      localStorage.setItem("highTime", JSON.stringify({ time: timeString }));
    }
  
    alert("Game Over " + "\n" + "Your time: " + `${timeString}`);
    document.body.classList.add("preload");
  }
  
}, 10);
document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    document.body.classList.remove("preload");
    start_time();
  }
});

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);         

if (isMobile) {
  
if(window.innerHeight > window.innerWidth){
    alert("Please Rotate Your Phone");
}
  
  document.addEventListener('touchstart', function () {
      jump();
  });
  
  document.addEventListener('touchstart', event => {
      if (event) {
          document.body.classList.remove('preload');
          start_time()
      }
  })
  
};