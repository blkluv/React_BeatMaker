import "./style.css";
import { Link } from "react-router-dom";
import play from '../../assets/Play.png';
import pause from '../../assets/Pause.png';
import cancela from '../../assets/cancelar.png';
import salvar from '../../assets/Save.png';

export default function BeatMaker() {
    return (
        <>
            <main>
                <div id="botoes">
                    <div id="parte1">
                        <label>BeatMaker</label>
                        <button><img src={play} alt="play" className="imagem_botao"/></button>
                        <button><img src={pause} alt="pause" className="imagem_botao"/></button>
                        <button>138 BPM</button>
                    </div>
                    <div>
                        <button><img src={cancela} alt="cancelar" className="imagem_botao"/></button>
                        <button><img src={salvar} alt="salvar" className="imagem_botao"/></button>
                    </div>
                </div>
            </main>
        </>
    )
}