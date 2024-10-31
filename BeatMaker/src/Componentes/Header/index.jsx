import "./style.css";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>

                {/* Titulo do BeatMaker*/}
                <div className='titulo'>
                    <Link to="/">
                        <h1>
                            <span>BEAT</span>
                            <span>MAKER</span>
                        </h1>
                    </Link>
                </div>

                
            </header>
        </>
    )
}