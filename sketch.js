// Flocking
// Daniel Shiffman
// https://thecodingtrain.com

// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
// https://editor.p5js.org/codingtrain/sketches/ry4XZ8OkN

//boids
const flock = [];

//???????????????????????
var ncage = false; //////// <<<-------
var ncageIMG;
var countFundoNcage = 0;
var fundoAt;

var fundoNcage = [];
var fundo = true;
var nfundos = 3;
//?????????????????????

//sliders
let alignSlider, cohesionSlider, separationSlider;
let marginSliderLeft = 900;
let marginSlidertop = 100;

//flags de efeitos
var highLightControll = false; 
var connectAll = false;
var showBoids = true;
var highLightConections = false;

//Botões de controle
var buttonToggleHighLight;
var buttonConnectAll;
var buttonShowBoids;
var buttonHighLightConections;

function preload(){
  ncageIMG = loadImage('NCage.png');

  fundoNcage[0] = loadImage('fundoNcage1.jpg');
  fundoNcage[1] = loadImage('fundoNcage2.jpg');
  fundoNcage[2] = loadImage('fundoNcage3.jpg');
}

function setup() {

  createCanvas(1100, 600);
  alignSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);
  
  changeNcage();

  alignSlider.position(marginSliderLeft, marginSlidertop + 0)
  cohesionSlider.position(marginSliderLeft, marginSlidertop +100)
  separationSlider.position(marginSliderLeft, marginSlidertop +200)

  for (let i = 0; i < 200; i++) {
    if(i == 199)
      flock.push(new Boid(true));
    else
      flock.push(new Boid(false));
  }

  buttonToggleHighLight = createButton('High Light: OFF');
  buttonToggleHighLight.position(19, 19);
  buttonToggleHighLight.mousePressed(()=>{toggleFunctions('highLight')});
  
  buttonHighLightConections = createButton('High Light interações: ON');
  buttonHighLightConections.position(270, 19);
  buttonHighLightConections.mousePressed(()=>{toggleFunctions('highLightConections')});

  buttonConnectAll = createButton('Conectar Todos: OFF');
  buttonConnectAll.position(19, 570);
  buttonConnectAll.mousePressed(()=>{toggleFunctions('connectAll')});
  
  buttonShowBoids = createButton('Ver Boids: ON');
  buttonShowBoids.position(270, 570);
  buttonShowBoids.mousePressed(()=>{toggleFunctions('showBoids')});

}

function draw() {
  if(ncage && fundo){
    image(fundoAt, 0, 0);
  }
  else if(fundo)
    background(51);
  for (let boid of flock){
    boid.show();
    boid.edges();
    boid.flock(flock);
    boid.update();
  }
  
    
  textSize(25);
  fill(0, 100, 255);
  strokeWeight(3)
  stroke(0,0,0);
  text("Alinhamento", marginSliderLeft, 70);
  text("Coesão", marginSliderLeft, 170);
  text("Separação", marginSliderLeft, 270);
}

function toggleFunctions(effect){
  switch(effect){
    case 'highLight': 
      (highLightControll)? (buttonToggleHighLight.html("High Light: OFF")) : (buttonToggleHighLight.html("High Light: ON"));
      highLightControll = !highLightControll;
    break;
    case 'connectAll':
      (connectAll)? (buttonConnectAll.html("Conectar Todos: OFF")) : (buttonConnectAll.html("Conectar Todos: ON"));
      connectAll = !connectAll;
    break;
    case 'showBoids':
      (showBoids)? (buttonShowBoids.html("Ver Boids: OFF")) : (buttonShowBoids.html("Ver Boids: ON"));
      showBoids = !showBoids;
    break;
    case 'highLightConections':
      (highLightConections)? (buttonHighLightConections.html("High Light interações: OFF")) : (buttonHighLightConections.html("High Light interações: ON"));
      highLightConections = !highLightConections;
    break;
  }
}

function changeNcage(){ 
  fundoAt = fundoNcage[(countFundoNcage ++) % nfundos]
  setTimeout(()=>{changeNcage()}, 4000);
} 