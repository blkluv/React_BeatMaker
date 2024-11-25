import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import * as Tone from "tone";
import Nota from "../../assets/Nota.webp";
import Kick from "../../songs/Kick.wav";
import Overhead from "../../songs/acoustic-snare-mono-overhead-room-and-top-mic_120bpm.wav";
import Hat from "../../songs/amapiano-closed-hat-bright.wav";
import Stopm from "../../songs/boisterous-stomp-brazilian-kick_2bpm_C.wav";
import Bass from "../../songs/classic-zay-808-bass_C.wav";
import Snare from "../../songs/dior-snare_C_minor.wav";
import Cowbell from "../../songs/low-percussive-brazilian-cowbell-one-shot_C.wav";
import Squeak from "../../songs/processed-perc-squeak-low-3.wav";

function App() {

  //Constantes DIVs
const QUADRADOS_POR_LINHA = 16; 
const [TOTAL_LINHAS, setTOTAL_LINHAS] = useState(26);

const NUMERO_DE_QUADRADOS = 16; 

//Sons fora do tone.js
const kick = new Tone.Player(Kick).toDestination();
const overhead = new Tone.Player(Overhead).toDestination();
const hat = new Tone.Player(Hat).toDestination();
const stopm = new Tone.Player(Stopm).toDestination();
const bass = new Tone.Player(Bass).toDestination();
const snare = new Tone.Player(Snare).toDestination();
const cowbell = new Tone.Player(Cowbell).toDestination();
const squeak = new Tone.Player(Squeak).toDestination();

// Cores
const COR_NORMAL = "rgb(52, 52, 52)";
const COR_ESPECIAL = "rgb(83, 81, 81)";
const CORES_LINHAS = [
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B"
];


// Índices dos quadrados especiais
const QUADRADOS_ESPECIAIS = [0, 4, 8, 12, 16, 20, 24];

// Função para calcular o tempo entre as batidas baseado no BPM
const tempoEntreBatidas = (bpm) => (60 / bpm) * 250;

  // Estado dos quadrados

  const [cores, setCores] = useState(() => {
    const inicializarCores = Array(TOTAL_LINHAS)
      .fill(null)
      .map(() => Array(QUADRADOS_POR_LINHA).fill(COR_NORMAL));

    for (let i = 0; i < TOTAL_LINHAS; i++) {
      QUADRADOS_ESPECIAIS.forEach((indice) => {
        inicializarCores[i][indice] = COR_ESPECIAL;
      });
    }

    return inicializarCores;
  });

  const [bpm, setBpm] = useState(60); // BPM inicial

  const [linhaEspecial, setLinhaEspecial] = useState(
    Array(NUMERO_DE_QUADRADOS).fill(COR_NORMAL)
  ); // Linha do timer

  const [isTimerRunning, setIsTimerRunning] = useState(false); // Estado do timer

  const synths = useRef([]); // Sintetizadores individuais para cada linha
  
  const intervalIdRef = useRef(null); // Ref para o ID do intervalo

  // Inicializa sintetizadores para cada linha

  useEffect(() => {
    synths.current = CORES_LINHAS.map(() => new Tone.Synth().toDestination());
    return () => synths.current.forEach((synth) => synth.dispose());
  }, []);

  // Atualizar o BPM
  const handleBpmChange = (event) => {
    const novoBpm = parseInt(event.target.value, 10);
    if (!isNaN(novoBpm) && novoBpm > 0) {
      setBpm(novoBpm);
    }
  };

  // Alternar cores e atualizar som ao vivo
  const handleQuadradoClick = (linhaIndex, quadradoIndex) => {
      setCores((prev) => {
        const updated = prev.map((linha, i) =>
          i === linhaIndex ? [...linha] : linha
        );
        const linhaAtual = updated[linhaIndex];
        const corAtual = linhaAtual[quadradoIndex];
    
        // Alterna a ativação do quadrado
        linhaAtual[quadradoIndex] =
          corAtual === COR_NORMAL || corAtual === COR_ESPECIAL
            ? CORES_LINHAS[linhaIndex] // Ativa o quadrado
            : QUADRADOS_ESPECIAIS.includes(quadradoIndex)
            ? COR_ESPECIAL
            : COR_NORMAL; // Desativa o quadrado
    
        return updated;
      });
    };      
    

  // Inicia o timer e verifica as cores dinamicamente
  const iniciarTimer = () => {
      Tone.Transport.start();
      setIsTimerRunning(true);
    
      const intervalo = tempoEntreBatidas(bpm);
      let index = -1;
    
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    
      intervalIdRef.current = setInterval(() => {
        // Atualiza a linha do timer visualmente
        setLinhaEspecial((prev) => {
          const novaLinha = [...prev];
          novaLinha.fill(COR_NORMAL);
         
          novaLinha[index] = CORES_LINHAS[index % CORES_LINHAS.length];
          
          return novaLinha;
        });
    
        // Verifica e toca as notas correspondentes
        setCores((currentCores) => {

          for (let linhaIndex = 0; linhaIndex < TOTAL_LINHAS; linhaIndex++) {
            
            const corAtual = currentCores[linhaIndex][index];
            const corEsperada = QUADRADOS_ESPECIAIS.includes(index)
              ? COR_ESPECIAL
              : COR_NORMAL;
          
            // Toca a nota apenas se o quadrado estiver ativo
            if (corAtual !== corEsperada && corAtual === CORES_LINHAS[linhaIndex]) {
              
          
                setInputValues((currentInputValues) => {
                    setInputValues2((currentInputValues2) => {
                      const notaAtual = currentInputValues[linhaIndex];
                      const tipoSom = currentInputValues2[linhaIndex];
            
                      if (tipoSom === "Kick") {
                        kick.start();
                      } else if (tipoSom === "Overhead") {
                        overhead.start();
                      } else if (tipoSom === "Hat") {
                        hat.start();
                      } else if (tipoSom === "Stopm") {
                        stopm.start();
                      } else if (tipoSom === "Bass") {
                        bass.start();
                      } else if (tipoSom === "Snare") {
                        snare.start();
                      } else if (tipoSom === "Cowbell") {
                        cowbell.start();
                      } else if (tipoSom === "Squeak") {
                        squeak.start();
                      }
                      else {
                        synths.current[linhaIndex].triggerAttackRelease(notaAtual, "16n");
                      }
            
                      return currentInputValues2; // Retorna o estado inalterado
                    });
            
                    return currentInputValues; // Retorna o estado inalterado
                  }); 
            }
          }
          return currentCores; // Mantém o estado inalterado
        });
    
        index = (index + 1) % NUMERO_DE_QUADRADOS;
      }, intervalo);
    };
    

  // Para o timer
  const pararTimer = () => {
    Tone.Transport.stop();
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    setIsTimerRunning(false);
  };
  
// Controle de visibilidade do input
const [quadradosVisiveis, setQuadradosVisiveis] = useState(Array(TOTAL_LINHAS).fill(false));
const [quadradosVisiveis2, setQuadradosVisiveis2] = useState(Array(TOTAL_LINHAS).fill(false));


const alternarVisibilidade = (linhaIndex) => {
  setQuadradosVisiveis((prevVisiveis) => {
    const newVisibilidade = [...prevVisiveis];
    const estavaVisivel = newVisibilidade[linhaIndex];

    // Alterna o estado de visibilidade do primeiro input
    newVisibilidade[linhaIndex] = !estavaVisivel; 
    return newVisibilidade;
  });

  setQuadradosVisiveis2((prevVisiveis2) => {
    const newVisibilidade2 = [...prevVisiveis2];
    const estavaVisivel = prevVisiveis2[linhaIndex];

    // Apenas alterna o estado do segundo input se estiver no modo "Normal"
    if (inputValues2[linhaIndex] === "Normal") {
      newVisibilidade2[linhaIndex] = !estavaVisivel;
    } else if (!estavaVisivel) {
      // Se o primeiro input foi ativado, mantém o segundo oculto
      newVisibilidade2[linhaIndex] = false;
    }

    return newVisibilidade2;
  });
};




// Estado para armazenar os valores dos selects
const [inputValues, setInputValues] = useState([

  'C3', // oitava
  'D#3', 
  'F3', 
  'F#3',
  'G3',
  'A#3',

  'C4',  // Tonica linha 1
  'D#4',  // Terça Menor Linha 2
  'F4', //quarta justa linha 3
  'F#4',  // trítono "bluenote" linha 4
  'G4',  //quinta justa
  'A#4',   //sexta menor

  'C5', // oitava
  'D#5', 
  'F5', 
  'F#5',
  'G5',
  'A#5',

  'C6', // oitava
  'D#6', 
  'F6', 
  'F#6',
  'G6',
  'A#6',

  'C7',
]);

const [inputValues2, setInputValues2] = useState([
    'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal'
  ]);

// Função que é chamada quando o valor do select é alterado
const handleInputChange = (linhaIndex, value) => {
const newInputValues = [...inputValues];
newInputValues[linhaIndex] = value;
setInputValues(newInputValues);
};


const handleInputChange2 = (linhaIndex, value) => {
  const newInputValues2 = [...inputValues2];
  newInputValues2[linhaIndex] = value;
  setInputValues2(newInputValues2);

  // Atualiza a visibilidade do segundo input com base na seleção
  setQuadradosVisiveis2((prevVisiveis2) => {
    const newVisibilidade2 = [...prevVisiveis2];
    // Mostra o segundo input apenas se "Normal" for selecionado
    newVisibilidade2[linhaIndex] = value === "Normal";
    return newVisibilidade2;
  });

  // Quando "Normal" é selecionado, o primeiro input deve ser visível
  if (value === "Normal") {
    setQuadradosVisiveis((prevVisiveis) => {
      const newVisibilidade = [...prevVisiveis];
      // Garante que o primeiro input esteja visível
      newVisibilidade[linhaIndex] = true;
      return newVisibilidade;
    });
  }
};

const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
const [botaoDesabilitado2, setBotaoDesabilitado2] = useState(false);
useEffect(() => {
  setBotaoDesabilitado2(TOTAL_LINHAS >= 25);
  setBotaoDesabilitado(TOTAL_LINHAS <= 1); // Desabilitar o botão de remoção se tiver apenas 1 linha
}, [TOTAL_LINHAS]); // Monitorando mudanças no TOTAL_LINHAS

// Adicionar linha
const maisLinha = () => {
  setTOTAL_LINHAS((prev) => {
    if (prev < 26) {
      return prev + 1;
    }
    return prev;
  });
};



// Retirar linha
const menosLinha = () => {
  if (TOTAL_LINHAS <= 1) {
    setBotaoDesabilitado(true);  // Desabilitar o botão de remoção de linha se houver apenas uma linha
  } else {
    setTOTAL_LINHAS((prev) => prev - 1);  // Decrementar o número de linhas
    setBotaoDesabilitado2(false);  // Habilitar o botão de adição de linha
  }
};

//Gambiarra das linhas
function retirarLinhas() {
  if (TOTAL_LINHAS == 26) {
    setTOTAL_LINHAS(10);
  }
}
retirarLinhas();

  return (
    <main>
      <div className="card">
        <div className="card-header">
          <div className="input-bpm">
            <label htmlFor="bpm">BPM: </label>
            <input
              id="bpm"
              type="number"
              value={bpm}
              onChange={handleBpmChange}
              min="1"
            />
          </div>
          <div className="timer-control">
            <button className="Botoes" onClick={iniciarTimer} disabled={isTimerRunning}>
              Iniciar
            </button>
            <button className="Botoes" onClick={pararTimer} disabled={!isTimerRunning}>
              Parar
            </button>
            <button className="Botoes" onClick={maisLinha} disabled={botaoDesabilitado2} id="mais">Adicionar linha</button>
            <button className="Botoes" onClick={menosLinha} disabled={botaoDesabilitado} id="menos">Retirar linha</button>
            <Link to="/Tutorial"><button id="ajuda">Precisa de ajuda?</button></Link>
          </div>
        </div>
        <div className="linha-numeros">
          {Array(NUMERO_DE_QUADRADOS)
            .fill(null)
            .map((_, index) => (
              <div className="quadrado-numero" key={index}>
                {index + 1}
              </div>
            ))}
        </div>
        <div className="linha-especial">
          {linhaEspecial.map((cor, index) => (
            <div
              key={index}
              className="quadrado-especial"
              style={{
                backgroundColor: cor,
                width: "40px",
                height: "20px",
                margin: "2px",
                display: "inline-block",
              }}
            />
          ))}
        </div>
        {Array(TOTAL_LINHAS)
    .fill(null)
    .map((_, linhaIndex) => (
      <div
        className="linha"
        key={`linha-${linhaIndex}`}
        id={`Linha${linhaIndex + 1}`}
        style={{ display: "flex", alignItems: "center", gap: "10px" }} // Flex para manter tudo na horizontal
      > 
              {/* Select visível quando ativado */}
              {quadradosVisiveis2[linhaIndex] && (
              <select
                  value={inputValues[linhaIndex]}
                  onChange={(e) => handleInputChange(linhaIndex, e.target.value)}
                  className="input-quadrado2"
                  style={{ marginRight: "10px", display: "block" }} // Adicionando display block para garantir visibilidade
              >
            
              <option value="C3">C3</option>
              <option value="C#3">C#3</option>
              <option value="D3">D3</option>
              <option value="D#3">D#3</option>
              <option value="E3">E3</option>
              <option value="F3">F3</option>
              <option value="F#3">F#3</option>
              <option value="G3">G3</option>
              <option value="G#3">G#3</option>
              <option value="A3">A3</option>
              <option value="A#3">A#3</option>
              <option value="B3">B3</option>

              <option value="C4">C4</option>
              <option value="C#4">C#4</option>
              <option value="D4">D4</option>
              <option value="D#4">D#4</option>
              <option value="E4">E4</option>
              <option value="F4">F4</option>
              <option value="F#4">F#4</option>
              <option value="G4">G4</option>
              <option value="G#4">G#4</option>
              <option value="A4">A4</option>
              <option value="A#4">A#4</option>
              <option value="B4">B4</option>

              <option value="C5">C5</option>
              <option value="C#5">C#5</option>
              <option value="D5">D5</option>
              <option value="D#5">D#5</option>
              <option value="E5">E5</option>
              <option value="F5">F5</option>
              <option value="F#5">F#5</option>
              <option value="G5">G5</option>
              <option value="G#5">G#5</option>
              <option value="A5">A5</option>
              <option value="A#5">A#5</option>
              <option value="B5">B5</option>
              
              <option value="C6">C6</option>
              <option value="C#6">C#6</option>
              <option value="D6">D6</option>
              <option value="D#6">D#6</option>
              <option value="E6">E6</option>
              <option value="F6">F6</option>
              <option value="F#6">F#6</option>
              <option value="G6">G6</option>
              <option value="G#6">G#6</option>
              <option value="A6">A6</option>
              <option value="A#6">A#6</option>
              <option value="B6">B6</option>

              <option value="C7">C7</option>
              <option value="C#7">C#7</option>
              <option value="D7">D7</option>
              <option value="D#7">D#7</option>
              <option value="E7">E7</option>
              <option value="F7">F7</option>
              <option value="F#7">F#7</option>
              <option value="G7">G7</option>
              <option value="G#7">G#7</option>
              <option value="A7">A7</option>
              <option value="A#7">A#7</option>
              <option value="B7">B7</option>

              <option value="C8">C8</option>




              </select>
              )}
      
             {/* Select visível quando ativado */}
             {quadradosVisiveis[linhaIndex] && (
              <select
                  value={inputValues2[linhaIndex]}
                  onChange={(e) => handleInputChange2(linhaIndex, e.target.value)}
                  className="input-quadrado"
                  style={{ marginRight: "10px", display: "block" }} // Adicionando display block para garantir visibilidade
              >
                  <option value="Normal">Normal</option>
                  <option value="Kick">Kick</option>
                  <option value="Overhead">Overhead</option>
                  <option value="Hat">Hat</option>
                  <option value="Stopm">Stopm</option>
                  <option value="Bass">Bass</option>
                  <option value="Snare">Snare</option>
                  <option value="Cowbell">Cowbell</option>
                  <option value="Squeak">Squeak</option>
              </select>
              )}

              {/* Quadrado de nota musical */}
              <div
              className="nota-quadrado"
              onClick={() => alternarVisibilidade(linhaIndex)}
              style={{ marginRight: "7px" }} // Espaço entre nota e o input
              >
              <img src={Nota} alt="nota musical" border-radius={"4px"} height={"40px"} width={"40px"} />
              </div>



        {/* Quadrados existentes */}
        <div className="linha-quadrados">
          {Array(QUADRADOS_POR_LINHA)
            .fill(null)
            .map((_, quadradoIndex) => (
              <div
                key={`quadrado-${linhaIndex}-${quadradoIndex}`}
                className="quadrado"
                style={{
                  backgroundColor: cores[linhaIndex][quadradoIndex],
                }}
                onClick={() => handleQuadradoClick(linhaIndex, quadradoIndex)}
              ></div>
            ))}
        </div>
      </div>
    ))}
      </div>
    </main>
  );
}

export default App;
