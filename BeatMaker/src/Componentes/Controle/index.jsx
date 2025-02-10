import "./BeatMaker/style.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as Tone from "tone";
import Kick from "../../songs/Kick.wav";
import Overhead from "../../songs/acoustic-snare-mono-overhead-room-and-top-mic_120bpm.wav";
import Hat from "../../songs/amapiano-closed-hat-bright.wav";
import Stopm from "../../songs/boisterous-stomp-brazilian-kick_2bpm_C.wav";
import Bass from "../../songs/classic-zay-808-bass_C.wav";
import Snare from "../../songs/dior-snare_C_minor.wav";
import Cowbell from "../../songs/low-percussive-brazilian-cowbell-one-shot_C.wav";
import Squeak from "../../songs/processed-perc-squeak-low-3.wav";

function Controle() {
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Estado do timer
    const [bpm, setBpm] = useState(60); // BPM inicial

    //Sons fora do tone.js
    const kick = new Tone.Player(Kick).toDestination();
    const overhead = new Tone.Player(Overhead).toDestination();
    const hat = new Tone.Player(Hat).toDestination();
    const stopm = new Tone.Player(Stopm).toDestination();
    const bass = new Tone.Player(Bass).toDestination();
    const snare = new Tone.Player(Snare).toDestination();
    const cowbell = new Tone.Player(Cowbell).toDestination();
    const squeak = new Tone.Player(Squeak).toDestination();

    // Atualizar o BPM
  const handleBpmChange = (event) => {
    const novoBpm = parseInt(event.target.value, 10);
    if (!isNaN(novoBpm) && novoBpm > 0) {
      setBpm(novoBpm);
    }
  };

  // Para o timer
  const pararTimer = () => {
    Tone.Transport.stop();
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    setIsTimerRunning(false);
  };

    //Função iniciar
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

    return (
        <>
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
                    {/*<button className="Botoes" onClick={maisLinha} disabled={botaoDesabilitado2} id="mais">Adicionar linha</button>
                    <button className="Botoes" onClick={menosLinha} disabled={botaoDesabilitado} id="menos">Retirar linha</button>*/}
                    <Link to="/Tutorial"><button id="ajuda">Precisa de ajuda?</button></Link>
                </div>
            </div>
        </>
    );
}

export default Controle;