let maze;
let solving = false;
//--
let aImg
let bImg
let cImg
let Vstartgame = false
let level = 1 ;

function setup() {
  // createCanvas(windowWidth - 20, windowHeight - 20);
  createCanvas(1280, 720).parent("cgame"); // đưa canvas vào khung
  frameRate(30);
  maze = new Maze(
    0,
    0,
    1280,
    650,
    level,

  );
  // let level =
  console.log(maze); 
  maze.generate();
}
// new p5(setup,"cgame")

function draw() {
  console.log("MG - function draw() {");
  if (!solving && !maze.gerenateMoves()) {
    maze.drawWin()
    console.log('DONE');
    noLoop();
  } else if (solving) {
    if (!maze.findPath()) { // false
      console.log("findPath");
      console.log('Solved');
      noLoop();
    }
    console.log("loop++++++++++++++++");
  }
}
// ex1 - click mouse để chạy - chạy từng bước
// dùng bàn phím nhập phím chọn hướng đi, chạy đến ngã rẽ hoặc từng bước

function skipgame() {
  console.log("MG - function mouseClicked() {");
  if (!solving) {
    solving = true;
    console.log("startFindPath---------------------------------------");
    maze.startFindPath();
    frameRate(90);
    // noLoop();
    loop()
  }
  // solving = false;
}

function keyPressed() {
  let vct = int(0)  // 0w 1d 2s 3a
  // console.log("keypressed ");
  if(Vstartgame== true){
    if (key === 'a') {
      vct = 3
      // loop();
    } else if(key==='w'){
      vct = 0
    } else if(key==='d'){
      vct = 1
    } else if(key==='s'){
      vct = 2
    }
    maze.playerPath(vct);
    frameRate(1)
    noLoop()
  } 
}

// my

function preload(){
  aImg=  loadImage('Among-Us-red.png')
  bImg=  loadImage('Among-Us-emergency.jpg')
  cImg=  loadImage('Among-Us-summon.jpg')
}

function resetlevel(x){
  level = x
  console.log(level);
}
function resetgame(){
  Vstartgame = false
  solving = false
  setup()
  draw()
}
function startgame(){
  Vstartgame = true
}