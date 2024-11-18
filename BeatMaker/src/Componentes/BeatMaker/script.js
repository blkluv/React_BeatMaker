const linhas = document.querySelectorAll('.linha');
const timers =document.querySelectorAll('.timer');
const quadrados =document.querySelectorAll('.quadrado');
const botao = document.querySelector('#botao');
const ValorBpm = document.querySelector('#bpm');




// Função que realiza a mudança de cor
function iniciarTroca() {
    const bpmValue = parseInt(ValorBpm.value);
    if (!bpmValue || bpmValue < 1 || bpmValue > 200) {
        alert("Insira um BPM válido entre 1 e 200.");
        return;
    }

    const tempo = (( 60 / bpmValue ) * 1000) / 4; // Tempo em milissegundos
    let index = 0; // Começa no primeiro timer

    function trocaCor() {
        // Restaura o timer anterior, se existir
        if (index > 0) {
            timers[index - 1].style.backgroundColor = 'rgb(52, 52, 52)' ;
        } else {
            // Se for o primeiro, restaura o último no loop
            timers[timers.length - 1].style.backgroundColor = 'rgb(52, 52, 52)' ;
        }

        // Muda a cor do timer atual para vermelho
        timers[index].style.backgroundColor = '#FBFF00';

        // Incrementa o índice e reinicia no primeiro caso atinja o final
        index = (index + 1) % timers.length;

        // Chama a função novamente após o tempo definido
        setTimeout(trocaCor, tempo);
    }

    // Inicia a troca de cor
    trocaCor();
}

// Adiciona evento ao botão
botao.addEventListener('click', iniciarTroca);



// Função para alternar a cor ao clicar
function mudarCorNoClique(event) {
    const linha = event.target.closest('.linha'); // Encontra a linha onde o quadrado está
    const quadrado = event.target;

    // Checa a cor atual do quadrado
    const corOriginal = 'rgb(52, 52, 52)';
    const corOriginal2 = 'rgb(83, 81, 81)';
    const corAtual = window.getComputedStyle(quadrado).backgroundColor;
    let novaCor = '';

    // Lógica para os quadrados especiais (um, cinco, nove, treze)
    const quadradosEspeciais = ['um', 'cinco', 'nove', 'treze'];
    
    // Verifica se o quadrado é especial
    if (quadradosEspeciais.includes(quadrado.id)) {
        // Define a cor com base na linha
        if (linha.id === 'Linha1') {
            novaCor = '#34AD9D'; // Verde
        } else if (linha.id === 'Linha2') {
            novaCor = '#C18E3B'; // Laranja
        } else if (linha.id === 'Linha3') {
            novaCor = '#0C60A4'; // Azul
        } else if (linha.id === 'Linha4') {
            novaCor = '#318B58'; // Verde escuro
        } else if (linha.id === 'Linha5') {
            novaCor = '#8F30A1'; // Roxo
        }

        // Se o quadrado já tiver a cor da linha, retorna à corOriginal2
        if (corAtual != corOriginal2) {
            novaCor = corOriginal2; // Volta à cor original2
        }

    } else {
       
        if (corAtual === corOriginal) {
            // Define uma nova cor para cada linha
            if (linha.id === 'Linha1') {
                novaCor = '#34AD9D'; // Verde
            } else if (linha.id === 'Linha2') {
                novaCor = '#C18E3B'; // Laranja
            } else if (linha.id === 'Linha3') {
                novaCor = '#0C60A4'; // Azul
            } else if (linha.id === 'Linha4') {
                novaCor = '#318B58'; // Verde escuro
            } else if (linha.id === 'Linha5') {
                novaCor = '#8F30A1'; // Roxo
            }
        } else {
            novaCor = corOriginal; // Retorna à cor original
        }
    }

    // Aplica a nova cor
    quadrado.style.backgroundColor = novaCor;
}

// click nos quadrado
quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', mudarCorNoClique);
});
