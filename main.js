// Selecionando os elementos HTML
const divisao = document.querySelector(".divisao");
const apagaEnter = document.querySelector("#apagar-e-enter");
const primeiraLinha = document.querySelector("#primeira-linha");
const segundaLinha = document.querySelector("#segunda-linha");
const terceiraLinha = document.querySelector("#terceira-linha");

// Definindo as teclas
const tecladoPrimeiraLinha = ['Q', 'W', 'E', 'R', 'T', 'Y', 'I', 'O', 'P'];
const tecladoSegundaLinha = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const tecladoTerceiraLinha = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

// Definindo as variáveis do jogo
const linha = 6;
const coluna = 5;
let linhaAtual = 0;
let colunaAtual = 0;

// Definindo o array de palavras
let palavras = ['SENAI', 'NOITE', 'MILHO', 'LETRA', 'MOUSE'];

// Seleciona uma palavra aleatória dentro do array palavras e guarda na variável palavra
let palavra = palavras[Math.floor(Math.random() * palavras.length)];

let palavraMapa = {};
for (let i = 0; i < palavra.length; i++) {
    // Separa as letras da palavra
    palavraMapa[i] = palavra[i]; // Correção: atribui a letra da palavra à posição i no mapa
}
const tentativas = [];

// Criando a grade de caixas de texto
for (let linhaIndex = 0; linhaIndex < linha; linhaIndex++) {
    // Vai montar as linhas
    tentativas[linhaIndex] = new Array(coluna); // Cria um novo array com número total de colunas
    const divisaoLinha = document.createElement('div'); // Cria uma nova div
    divisaoLinha.setAttribute('id', 'linha' + linhaIndex); // Define o atributo ID
    divisaoLinha.setAttribute('class', 'div-linha');
    for (let colunaIndex = 0; colunaIndex < coluna; colunaIndex++) {
        // Vai montar as colunas
        const divisaoColuna = document.createElement('div');
        divisaoColuna.setAttribute('id', 'linha' + linhaIndex + 'coluna' + colunaIndex);
        let classColuna;
        if (linhaIndex === 0) {
            classColuna = 'div-coluna digitando';
        } else {
            classColuna = 'div-coluna desativado';
        }
        divisaoColuna.setAttribute('class', classColuna);
        divisaoLinha.appendChild(divisaoColuna); // Correção: uso de appendChild em vez de append
        tentativas[linhaIndex][colunaIndex] = ''; // A tentativa começa vazia
    }
    divisao.appendChild(divisaoLinha); // Correção: appendChild em vez de append
}

const checkTentativa = () => {
    const tentativa = tentativas[linhaAtual].join(''); // Cria um objeto a partir do array 'tentativas' usando o método join
    if (tentativa.length !== coluna) { // Correção: verificar o comprimento da tentativa
        return;
    }
    let atColuna = document.querySelectorAll('.digitando');
    for (let i = 0; i < coluna; i++) {
        const letra = tentativa[i]; // Correção: seleciona a letra correspondente à coluna atual
        if (palavraMapa[i] === undefined) {
            // Verifica se a letra atual não existe no palavraMap
            atColuna[i].classList.add('errado');
        } else {
            if (palavraMapa[i] === letra) {
                atColuna[i].classList.add('certo');
            } else {
                atColuna[i].classList.add('deslocada');
            }
        }
    }
    if (tentativa === palavra) {
        window.alert('Parabéns, você conseguiu!');
    } else {
        if (linhaAtual === linha - 1) {
            // Verifica se todas as linhas já foram
            window.alert('Errou!');
        } else {
            proximaLinha();
        }
    }
};

const proximaLinha = () => {
    let digColuna = document.querySelectorAll('.digitando');
    // Seleciona todos os elementos com a classe digitando
    for (let i = 0; i < digColuna.length; i++) { // Correção: Adicione ".length" para percorrer o array
        digColuna[i].classList.remove('digitando');
        digColuna[i].classList.add('desativado');
    }
    linhaAtual++;
    colunaAtual = 0; // linhaAtual++ para ir para a próxima linha e a coluna volta a ser a primeira caixinha da linha

    const linhaAtualElemento = document.querySelector('#linha' + linhaAtual);
    let atColuna = linhaAtualElemento.querySelectorAll('.div-coluna');
    for (let i = 0; i < atColuna.length; i++) { // Correção: Adicione ".length" para percorrer o array
        atColuna[i].classList.remove('desativado');
        atColuna[i].classList.add('digitando');
    }
};

// Vai pegar as teclas digitadas --- key é uma palavra para keyboard, as teclas do teclado
const tecladoOnClick = key => {
    if (colunaAtual === coluna) {
        // Verifica se acabou as colunas
        return;
    }
    const divAtual = document.querySelector('#linha' + linhaAtual + 'coluna' + colunaAtual);
    divAtual.textContent = key; // O conteúdo do texto será igual a tecla digitada
    tentativas[linhaAtual][colunaAtual] = key;
    colunaAtual++;
};

const criarLinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key => {
        // Vai ler todas as teclas
        let botaoElemento = document.createElement('button'); // Vai criar os botões
        botaoElemento.textContent = key;
        botaoElemento.setAttribute('id', key);
        botaoElemento.addEventListener('click', () => tecladoOnClick(key));
        linhaTeclado.appendChild(botaoElemento); // Correção: use "appendChild" em vez de "append"
    });
};

criarLinhaTeclado(tecladoPrimeiraLinha, primeiraLinha);
criarLinhaTeclado(tecladoSegundaLinha, segundaLinha);
criarLinhaTeclado(tecladoTerceiraLinha, terceiraLinha);

const backspace = () => {
    if (colunaAtual === 0) {
        return;
    }
    colunaAtual--;
    tentativas[linhaAtual][colunaAtual] = ''; // O quadrado volta a ficar vazio
    const div = document.querySelector('#linha' + linhaAtual + 'coluna' + colunaAtual);
    div.textContent = ''; // Correção: limpe o conteúdo da div
};

// Criar o botão de apagar e enter
const backspaceBotao = document.createElement('button');
backspaceBotao.textContent = '<x';
backspaceBotao.addEventListener('click', backspace); // Adicione um ouvinte de evento para o botão de apagar
apagaEnter.appendChild(backspaceBotao); // Correção: use "appendChild" em vez de "append"

const enterBotao = document.createElement('button');
enterBotao.addEventListener('click', checkTentativa);
enterBotao.textContent = 'ENTER';
apagaEnter.appendChild(enterBotao); // Correção: use "appendChild" em vez de "append"

document.onkeydown = function (event) {
    event = event || window.event; // Correção: corrija o nome da variável "event" e "window.event"
    if (event.key === 'Enter') {
        checkTentativa();
    } else if (event.key === 'Backspace') {
        backspace();
    } else {
        tecladoOnClick(event.key.toUpperCase()); // Correção: converta a tecla para maiúsculas
    }
};