import "./style.css";
import { Link } from "react-router-dom";

function Entrada() {
    
    return (
        <>
            <main id="entrada">
                <Link to='/BeatMaker'><button className="botao-entrada"><h1>Começar</h1></button></Link>
                <Link to='/Tutorial'><button className="botao-entrada"><h1>Tutorial</h1></button></Link>
            </main>
        </>
    );
}

export default Entrada;