let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
     {rate:1.2});
}

function alterarLimite(Limitenovo) {
    numeroLimite = parseInt(Limitenovo, 10);
    reiniciarJogo();
}

function trocarImagem(tag){
    let imagem = document.getElementById('imagem_jogo');
    if(tag === 'inicio'){
        imagem.src = './img/inicio.png';
    }else if (tag === 'errou'){
        imagem.src ='./img/errou.png';
    }else if  (tag === 'acertou'){
        imagem.src = './img/acertou.png';
    }
}   

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do numero secreto');
    exibirTextoNaTela('p','Escolha um número entre:');

}

exibirMensagemInicial()

function verificarChute(){
    let chuteUsuario = document.querySelector('.container__input[type="number"]');
    let chute = chuteUsuario.value;
    let rangeSelector = document.getElementById('escolha');
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';

    if (chute === '') {
        alert('Por favor, insira um número para chutar.');
        chuteUsuario.focus();
        return;
    }

    rangeSelector.disabled = true;
    
    if ( chute == numeroSecreto){

        chuteUsuario.classList.add("input-certo");
        chuteUsuario.classList.remove("input-errado");

        exibirTextoNaTela('h1', 'acertou');
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`; 
        exibirTextoNaTela('p', mensagemTentativas);
        trocarImagem('acertou');
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        chuteUsuario.classList.add("input-certo");
        chuteUsuario.classList.remove("input-errado");

       if(chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número é menor');
       }else {    
        exibirTextoNaTela('p', 'O número é maior');
       }

       trocarImagem('errou');
    }

    tentativas++;
    limparCampo();
    chuteUsuario.focus();
}

function gerarNumeroAleatorio(){
   let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if (quantidadeDeElementosNaLista = numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo(){
    chuteUsuario = document.querySelector('input');
    chuteUsuario.value = '';
}

function select() {
    let rangeSelector = document.getElementById('escolha');
    rangeSelector.disabled = false;
}

function corInput() {
    let chuteInput = document.querySelector('.container__input[type="number"]');
    chuteInput.classList.remove("input-certo", "input-errado");
}

function reiniciarJogo(){
    select();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    trocarImagem('inicio');
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
