//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//variáveis da raquete

let xRaquete = 5;
let yRaquete = 150;

//variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//velocidade da bolinha
let velocidadeXBolinha = 4;
let velocidadeYBolinha = 4;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente =0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  trilha.loop();
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinhas();
  movimentoBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoMinhaRaquete();
  //verificacolisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPontos();
  
  
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;     
  
}

function verificaColisaoRaquete(x, y){
  colidiu = 
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}


function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  } 
  
}
    
 
  
function movimentoMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){   
      yRaquete -= 10;
    }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}  

  
function mostraRaquete(x,y){
  rect(x,y, raqueteComprimento,raqueteAltura);
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
      xBolinha - raio < 0) {
      velocidadeXBolinha *= -1;
      }
  if (yBolinha + raio > height ||
      yBolinha - raio < 0) {
      velocidadeYBolinha *= -1;
  }
}
  
function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha; 
  
}
  
function mostraBolinhas(){
  circle(xBolinha,yBolinha,diametro);
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,105,180));
  rect(150,10,40,20);
  fill(255);  
  text(meusPontos, 170, 26);
  fill(color(255,105,180));
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente, 470,26);
}
  
function marcaPontos(){
  if(xBolinha > 590){
    meusPontos += 1;    
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}


