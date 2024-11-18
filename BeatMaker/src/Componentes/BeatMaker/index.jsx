import "./style.css";
// import "./script.js";
// import { Link } from "react-router-dom";
// import play from '../../assets/Play.png';
// import pause from '../../assets/Pause.png';
// import cancela from '../../assets/cancelar.png';
// import salvar from '../../assets/Save.png';

export default function BeatMaker() {
    const log = () => {const linhas = document.querySelectorAll('.linha');
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
    }
    
    return (
        
        <>
            <main>
                <div>
                    <form action method="post">
                        <label for="bpm">BPM</label>
                        <input type="number" name="bpm" id="bpm" min="1" max="200"></input>
                    </form>
                    <button id="botao">clique aqui</button>
                </div>
                <div class="card" >
                    <div id="metronomo">
                        <div id="numeros">
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>5</p>
                            <p>6</p>
                            <p>7</p>
                            <p>8</p>
                            <p>9</p>
                            <p>10</p>
                            <p>11</p>
                            <p>12</p>
                            <p>13</p>
                            <p>14</p>
                            <p>15</p>
                            <p>16</p>
                        </div>
                        <div class="linha" id="linhaTimer">
                            <div id="umTimer" class="timer"></div>
                            <div id="doisTimer" class="timer"></div>
                            <div id="tresTimer" class="timer"></div>
                            <div id="quatroTimer" class="timer"></div>
                            <div id="cincoTimer" class="timer"></div>
                            <div id="seisTimer" class="timer"></div>
                            <div id="seteTimer" class="timer"></div>
                            <div id="oitoTimer" class="timer"></div>
                            <div id="noveTimer" class="timer"></div>
                            <div id="dezTimer" class="timer"></div>
                            <div id="onzeTimer" class="timer"></div>
                            <div id="dozeTimer" class="timer"></div>
                            <div id="trezeTimer" class="timer"></div>
                            <div id="catorzeTimer" class="timer"></div>
                            <div id="quinzeTimer" class="timer"></div>
                            <div id="dezesseisTimer" class="timer"></div>
                        </div>
                    </div>
                    <div class="linha" id="Linha1">
                        <div id="um" class="quadrado"></div>
                        <div id="dois" class="quadrado"></div>
                        <div id="tres" class="quadrado"></div>
                        <div id="quatro" class="quadrado"></div>
                        <div id="cinco" class="quadrado"></div>
                        <div id="seis" class="quadrado"></div>
                        <div id="sete" class="quadrado"></div>
                        <div id="oito" class="quadrado"></div>
                        <div id="nove" class="quadrado"></div>
                        <div id="dez" class="quadrado"></div>
                        <div id="onze" class="quadrado"></div>
                        <div id="doze" class="quadrado"></div>
                        <div id="treze" class="quadrado"></div>
                        <div id="catorze" class="quadrado"></div>
                        <div id="quinze" class="quadrado"></div>
                        <div id="dezesseis" class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha2">
                        <div id="um" class="quadrado"></div>
                        <div id="dois" class="quadrado"></div>
                        <div id="tres" class="quadrado"></div>
                        <div id="quatro" class="quadrado"></div>
                        <div id="cinco" class="quadrado"></div>
                        <div id="seis" class="quadrado"></div>
                        <div id="sete" class="quadrado"></div>
                        <div id="oito" class="quadrado"></div>
                        <div id="nove" class="quadrado"></div>
                        <div id="dez" class="quadrado"></div>
                        <div id="onze" class="quadrado"></div>
                        <div id="doze" class="quadrado"></div>
                        <div id="treze" class="quadrado"></div>
                        <div id="catorze" class="quadrado"></div>
                        <div id="quinze" class="quadrado"></div>
                        <div id="dezesseis" class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha3">
                        <div id="um" class="quadrado"></div>
                        <div id="dois" class="quadrado"></div>
                        <div id="tres" class="quadrado"></div>
                        <div id="quatro" class="quadrado"></div>
                        <div id="cinco" class="quadrado"></div>
                        <div id="seis" class="quadrado"></div>
                        <div id="sete" class="quadrado"></div>
                        <div id="oito" class="quadrado"></div>
                        <div id="nove" class="quadrado"></div>
                        <div id="dez" class="quadrado"></div>
                        <div id="onze" class="quadrado"></div>
                        <div id="doze" class="quadrado"></div>
                        <div id="treze" class="quadrado"></div>
                        <div id="catorze" class="quadrado"></div>
                        <div id="quinze" class="quadrado"></div>
                        <div id="dezesseis" class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha4">
                        <div id="um" class="quadrado"></div>
                        <div id="dois" class="quadrado"></div>
                        <div id="tres" class="quadrado"></div>
                        <div id="quatro" class="quadrado"></div>
                        <div id="cinco" class="quadrado"></div>
                        <div id="seis" class="quadrado"></div>
                        <div id="sete" class="quadrado"></div>
                        <div id="oito" class="quadrado"></div>
                        <div id="nove" class="quadrado"></div>
                        <div id="dez" class="quadrado"></div>
                        <div id="onze" class="quadrado"></div>
                        <div id="doze" class="quadrado"></div>
                        <div id="treze" class="quadrado"></div>
                        <div id="catorze" class="quadrado"></div>
                        <div id="quinze" class="quadrado"></div>
                        <div id="dezesseis" class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha5">
                        <div id="um" class="quadrado"></div>
                        <div id="dois" class="quadrado"></div>
                        <div id="tres" class="quadrado"></div>
                        <div id="quatro" class="quadrado"></div>
                        <div id="cinco" class="quadrado"></div>
                        <div id="seis" class="quadrado"></div>
                        <div id="sete" class="quadrado"></div>
                        <div id="oito" class="quadrado"></div>
                        <div id="nove" class="quadrado"></div>
                        <div id="dez" class="quadrado"></div>
                        <div id="onze" class="quadrado"></div>
                        <div id="doze" class="quadrado"></div>
                        <div id="treze" class="quadrado"></div>
                        <div id="catorze" class="quadrado"></div>
                        <div id="quinze" class="quadrado"></div>
                        <div id="dezesseis" class="quadrado"></div>
                    </div>
                </div>
            </main>            
        </>
    )
}