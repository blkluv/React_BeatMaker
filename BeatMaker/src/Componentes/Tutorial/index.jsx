import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import * as Tone from "tone";
import Seta from "../../assets/Arrow down.png";
import Nota from "../../assets/Nota.webp";
import Kick from "../../songs/Kick.wav";
import Overhead from "../../songs/acoustic-snare-mono-overhead-room-and-top-mic_120bpm.wav";
import Hat from "../../songs/amapiano-closed-hat-bright.wav";
import Stopm from "../../songs/boisterous-stomp-brazilian-kick_2bpm_C.wav";
import Bass from "../../songs/classic-zay-808-bass_C.wav";
import Snare from "../../songs/dior-snare_C_minor.wav";
import Cowbell from "../../songs/low-percussive-brazilian-cowbell-one-shot_C.wav";
import Squeak from "../../songs/processed-perc-squeak-low-3.wav";

//Constantes DIVs
const QUADRADOS_POR_LINHA = 16; 
const TOTAL_LINHAS = 1; 
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
const CORES_LINHAS = ["#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",
  "#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1",


];

// Índices dos quadrados especiais
const QUADRADOS_ESPECIAIS = [0, 4, 8, 12, 16, 20, 24];

// Função para calcular o tempo entre as batidas baseado no BPM
const tempoEntreBatidas = (bpm) => (60 / bpm) * 250;

function Tutorial() {

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

const alternarVisibilidade = (linhaIndex) => {
  setQuadradosVisiveis((prev) => {
    const newVisibilidade = [...prev];
    newVisibilidade[linhaIndex] = !newVisibilidade[linhaIndex];
    return newVisibilidade;
  });
};




// Estado para armazenar os valores dos selects
const [inputValues, setInputValues] = useState([
  'C4',  // Para a linha 1
  'D#4',  // Para a linha 2
  'F4',
  'F#4',  // Para a linha 3
  'G4',  // Para a linha 4 (vazio como padrão)
  'A#4',   // Para a linha 5 (vazio como padrão)
  'C5'
]);

const [inputValues2, setInputValues2] = useState([
    'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal'
  ]);

// Função que é chamada quando o valor do select é alterado
const handleInputChange = (linhaIndex, value) => {
const newInputValues = [...inputValues];
newInputValues[linhaIndex] = value;
setInputValues(newInputValues);
};

const handleInputChange2 = (linhaIndex, value) => {
    const newInputValues = [...inputValues2];
    newInputValues[linhaIndex] = value;
    setInputValues2(newInputValues);
    };

    //Tutorial

        const [step, setStep] = useState(0); // Estado para rastrear o passo atual
    
        const nextStep = () => {
            setStep((prevStep) => prevStep + 1); // Avança para o próximo passo
        };
    

  return (
    <main id="tuto">
      <div className="card" id="card">
      <div className="tutorial">
                    {step === 0 && (
                        <div className="passos">
                            <h2>Bem-Vindo ao Tutorial</h2>
                            <button className="botao-tutorial" onClick={nextStep}>
                                Continuar
                            </button>
                        </div>
                    )}
                    {step === 1 && (
                        <div className="passos" id="passo1">
                            <h4>Aqui é onde você irá configurar o BPM</h4>
                            <button className="botao-tutorial" onClick={nextStep}>
                                Continuar
                            </button>
                            <img src={Seta} alt="Seta indicando próximo passo" height="30px" />
                        </div>
                    )}
                    {step === 2 && (
                        <div className="passos" id="passo2">
                            <h4>Aqui é onde começa a tocar</h4>
                            <button className="botao-tutorial" onClick={nextStep}>
                                Continuar
                            </button>
                            <img src={Seta} alt="Seta indicando próximo passo" height="30px" />
                        </div>
                    )}
                    {step === 3 && (
                        <div className="passos" id="passo3">
                        <h4>Aqui é onde para de tocar</h4>
                        <button className="botao-tutorial" onClick={nextStep}>
                            Continuar
                        </button>
                        <img src={Seta} alt="Seta indicando próximo passo" height="30px" />
                    </div>
                    )}
                    {step === 4 && (
                        <div className="passos" id="passo4">
                        <h4>Aqui é onde você escolhe as notas e/ou o instrumento</h4>
                        <button className="botao-tutorial" onClick={nextStep}>
                            Continuar
                        </button>
                        <img src={Seta} alt="Seta indicando próximo passo" height="30px" />
                    </div>
                    )}
                    {step === 5 && (
                        <div className="passos" id="passo5">
                        <img src={Seta} alt="Seta indicando próximo passo" height="30px" />
                        <h4>Aqui é onde você escolhe quando irá tocar o som</h4>
                        <h4>Basta apertar no quadrado que queira</h4>
                        <button className="botao-tutorial" onClick={nextStep}>
                            Continuar
                        </button>
                    </div>
                    )}
                    {step > 5 && (
                        <div className="passos">
                            <h4>Tutorial Concluído</h4>
                            <Link to="/BeatMaker"><button className="botao-tutorial">
                                Começar
                            </button></Link>
                    </div>
                    )}
                </div>
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
             {quadradosVisiveis[linhaIndex] && (
              <select
                  value={inputValues2[linhaIndex]}
                  onChange={(e) => handleInputChange2(linhaIndex, e.target.value)}
                  className="input-quadrado2"
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

              {/* Select visível quando ativado */}
              {quadradosVisiveis[linhaIndex] && (
              <select
                  value={inputValues[linhaIndex]}
                  onChange={(e) => handleInputChange(linhaIndex, e.target.value)}
                  className="input-quadrado"
                  style={{ marginRight: "10px", display: "block" }} // Adicionando display block para garantir visibilidade
              >
            
                  <option value="C4">C</option>
                  <option value="C#4">C#</option>
                  <option value="D4">D</option>
                  <option value="D#4">D#</option>
                  <option value="E4">E</option>
                  <option value="F4">F</option>
                  <option value="F#4">F#</option>
                  <option value="G4">G</option>
                  <option value="G#4">G#</option>
                  <option value="A4">A</option>
                  <option value="A#4">A#</option>
                  <option value="B4">B</option>
                  <option value="C5">C oitava</option>
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

export default Tutorial;
