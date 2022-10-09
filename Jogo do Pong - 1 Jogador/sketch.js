// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 155;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// Variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 155;
let velocidadeYOponente;

let colidiu = false;

// Variáveis do placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Variáveis de sons 
let ponto;
let trilha;
let raquetada;

function preload(){
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  // verificaColisaoRaquete1();
  // verificaColisaoRaquete2();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

// Desenha a bolinha:
function mostraBolinha() {
  fill(255, 255, 0);
  circle(xBolinha, yBolinha, diametro);
}

// Desenha a raquete:
function mostraRaquete(x, y) {
  fill(255);
  rect(x, y, raqueteComprimento, raqueteAltura);
  // rect(x, y, w, h) x = coord x; y = coord y; w = largura; h = altura
}

// Movimenta a Bolinha:
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

// Verifica Colisão da bolinha com a borda:
function verificaColisaoBorda() {
  if (xBolinha < raio || xBolinha + raio > width) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha < raio || yBolinha + raio > height) {
    velocidadeYBolinha *= -1;
  }
}

// // Função colisão da bola com as raquetes (se bater na raquete, volta) - MODELO 1
// function verificaColisaoRaquete1() {
//   if (
//     xBolinha - raio < xRaquete + raqueteComprimento &&
//     yBolinha - raio < yRaquete + raqueteAltura &&
//     yBolinha + raio > yRaquete
//   ) {
//     raquetada.play();
//     velocidadeXBolinha *= -1;
//   }
// }
// function verificaColisaoRaquete2() {
//   if (
//     xBolinha + raio > xRaqueteOponente &&
//     yBolinha + raio < yRaqueteOponente + raqueteAltura &&
//     yBolinha - raio > yRaqueteOponente
//   ) {
//     raquetada.play();
//     velocidadeXBolinha *= -1;
//   }
// }


// // Função colisão da bola com as raquetes (se bater na raquete, volta) - MODELO 2 USANDO A BIBLIOTECA p5.collide v0.7.3
// hit = collideRectCircle(xRect , yRect, rectLargura, rectAltura, circleDiametro);

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiu){
   velocidadeXBolinha *= -1;
      raquetada.play();
  }
}

//Funcao para movimentar a minha raquete
function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    if (yRaquete > 0) {
      // Se a raquete encostar na borda de cima ela volta
      yRaquete -= 10;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (yRaquete < 310) {
      // Se a raquete encostar na borda de baixo ela volta
      yRaquete += 10;
    }
  }
}

// Função para movimentar a raquete do oponente
let xV = 7; // Quanto menor esse número, mais fácil o jogo (mais lenta a raquete)
let rV = [xV+1,xV,xV-1];
function movimentaRaqueteOponente(){
  //faz com que a raquete 2 só se mexa quando a bolinah está na sua mesa e indo em sua direção
  if (xBolinha > 300 && xV > 0){
    //faz com que a raquete se mova de forma realista e com velocidade variável para a bolinha em vez de se teletransportar
    if (yRaqueteOponente != yBolinha){
      if (yRaqueteOponente < yBolinha){
        yRaqueteOponente += random(rV);
      }
      else{
        yRaqueteOponente += random(rV) * -1;
      }
    }
  }
}


// // Fator de erro = 40 (pega no centro da raquete)
// function movimentaRaqueteOponente(){
//   velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
//   yRaqueteOponente += velocidadeYOponente;
// }

function incluiPlacar() {
  fill(255); // Pinta o texto de branco
  textAlign(CENTER); // Alinha o texto do placar no centro
  textSize(24); // Tamanho da fonte
  fill(color(255, 140, 0)); // Cor laranja placar esq
  rect(170, 10, 40, 30);  // Tamanho do placar esq
  fill(255); // Pinta o texto do placarEsq de branco
  text(meusPontos, 190, 33); // Exibe placar no eixoX e eixoY
  fill(color(255, 140, 0)); // Cor laranja placar dir
  rect(390, 10, 40, 30); // Tamanho do placar dir
  fill(255); // Pinta o texto do placarDir de branco
  text(pontosDoOponente, 410, 33); // Exibe placar no eixoX e eixoY
}

function marcaPonto() {
  if (xBolinha + raio >= 600) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha - raio <= 0) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
  if (xBolinha - raio <= 0){
    xBolinha = 30; // Distância do raio da bolinha(15) + largRaquete(10) + espaço entre raquete e parede (5) = 30

  } if (xBolinha + raio >= 600){
      xBolinha = 580;
  }
}