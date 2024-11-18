import "./style.css";
import "./script.js";
// import { Link } from "react-router-dom";
// import play from '../../assets/Play.png';
// import pause from '../../assets/Pause.png';
// import cancela from '../../assets/cancelar.png';
// import salvar from '../../assets/Save.png';

export default function BeatMaker() {
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
                            <div id="umTimer" div class="timer"></div>
                            <div id="doisTimer" div class="timer"></div>
                            <div id="tresTimer" div class="timer"></div>
                            <div id="quatroTimer" div class="timer"></div>
                            <div id="cincoTimer" div class="timer"></div>
                            <div id="seisTimer" div class="timer"></div>
                            <div id="seteTimer" div class="timer"></div>
                            <div id="oitoTimer" div class="timer"></div>
                            <div id="noveTimer" div class="timer"></div>
                            <div id="dezTimer" div class="timer"></div>
                            <div id="onzeTimer" div class="timer"></div>
                            <div id="dozeTimer" div class="timer"></div>
                            <div id="trezeTimer" div class="timer"></div>
                            <div id="catorzeTimer" div class="timer"></div>
                            <div id="quinzeTimer" div class="timer"></div>
                            <div id="dezesseisTimer" div class="timer"></div>
                        </div>
                    </div>
                    <div class="linha" id="Linha1">
                        <div id="um" div class="quadrado"></div>
                        <div id="dois" div class="quadrado"></div>
                        <div id="tres" div class="quadrado"></div>
                        <div id="quatro" div class="quadrado"></div>
                        <div id="cinco" div class="quadrado"></div>
                        <div id="seis" div class="quadrado"></div>
                        <div id="sete" div class="quadrado"></div>
                        <div id="oito" div class="quadrado"></div>
                        <div id="nove" div class="quadrado"></div>
                        <div id="dez" div class="quadrado"></div>
                        <div id="onze" div class="quadrado"></div>
                        <div id="doze" div class="quadrado"></div>
                        <div id="treze" div class="quadrado"></div>
                        <div id="catorze" div class="quadrado"></div>
                        <div id="quinze" div class="quadrado"></div>
                        <div id="dezesseis" div class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha2">
                        <div id="um" div class="quadrado"></div>
                        <div id="dois" div class="quadrado"></div>
                        <div id="tres" div class="quadrado"></div>
                        <div id="quatro" div class="quadrado"></div>
                        <div id="cinco" div class="quadrado"></div>
                        <div id="seis" div class="quadrado"></div>
                        <div id="sete" div class="quadrado"></div>
                        <div id="oito" div class="quadrado"></div>
                        <div id="nove" div class="quadrado"></div>
                        <div id="dez" div class="quadrado"></div>
                        <div id="onze" div class="quadrado"></div>
                        <div id="doze" div class="quadrado"></div>
                        <div id="treze" div class="quadrado"></div>
                        <div id="catorze" div class="quadrado"></div>
                        <div id="quinze" div class="quadrado"></div>
                        <div id="dezesseis" div class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha3">
                        <div id="um" div class="quadrado"></div>
                        <div id="dois" div class="quadrado"></div>
                        <div id="tres" div class="quadrado"></div>
                        <div id="quatro" div class="quadrado"></div>
                        <div id="cinco" div class="quadrado"></div>
                        <div id="seis" div class="quadrado"></div>
                        <div id="sete" div class="quadrado"></div>
                        <div id="oito" div class="quadrado"></div>
                        <div id="nove" div class="quadrado"></div>
                        <div id="dez" div class="quadrado"></div>
                        <div id="onze" div class="quadrado"></div>
                        <div id="doze" div class="quadrado"></div>
                        <div id="treze" div class="quadrado"></div>
                        <div id="catorze" div class="quadrado"></div>
                        <div id="quinze" div class="quadrado"></div>
                        <div id="dezesseis" div class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha4">
                        <div id="um" div class="quadrado"></div>
                        <div id="dois" div class="quadrado"></div>
                        <div id="tres" div class="quadrado"></div>
                        <div id="quatro" div class="quadrado"></div>
                        <div id="cinco" div class="quadrado"></div>
                        <div id="seis" div class="quadrado"></div>
                        <div id="sete" div class="quadrado"></div>
                        <div id="oito" div class="quadrado"></div>
                        <div id="nove" div class="quadrado"></div>
                        <div id="dez" div class="quadrado"></div>
                        <div id="onze" div class="quadrado"></div>
                        <div id="doze" div class="quadrado"></div>
                        <div id="treze" div class="quadrado"></div>
                        <div id="catorze" div class="quadrado"></div>
                        <div id="quinze" div class="quadrado"></div>
                        <div id="dezesseis" div class="quadrado"></div>
                    </div>
                    <div class="linha" id="Linha5">
                        <div id="um" div class="quadrado"></div>
                        <div id="dois" div class="quadrado"></div>
                        <div id="tres" div class="quadrado"></div>
                        <div id="quatro" div class="quadrado"></div>
                        <div id="cinco" div class="quadrado"></div>
                        <div id="seis" div class="quadrado"></div>
                        <div id="sete" div class="quadrado"></div>
                        <div id="oito" div class="quadrado"></div>
                        <div id="nove" div class="quadrado"></div>
                        <div id="dez" div class="quadrado"></div>
                        <div id="onze" div class="quadrado"></div>
                        <div id="doze" div class="quadrado"></div>
                        <div id="treze" div class="quadrado"></div>
                        <div id="catorze" div class="quadrado"></div>
                        <div id="quinze" div class="quadrado"></div>
                        <div id="dezesseis" div class="quadrado"></div>
                    </div>
                </div>
            </main>
           
        </>
    )
}