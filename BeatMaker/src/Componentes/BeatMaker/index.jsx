  import React, { useState, useEffect, useRef } from "react";
  import "./style.css";
  import * as Tone from "tone";

  const QUADRADOS_POR_LINHA = 16; // Quantidade de quadrados por linha
  const TOTAL_LINHAS = 5; // Total de linhas
  const NUMERO_DE_QUADRADOS = 16; // Quadrados da linha do timer

  // Cores
  const COR_NORMAL = "rgb(52, 52, 52)";
  const COR_ESPECIAL = "rgb(83, 81, 81)";
  const CORES_LINHAS = ["#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1"];

  // Índices dos quadrados especiais
  const QUADRADOS_ESPECIAIS = [0, 4, 8, 12];

  // Função para calcular o tempo entre as batidas baseado no BPM
  const tempoEntreBatidas = (bpm) => (60 / bpm) * 250;

  function App() {
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

    // Notas associadas a cada linha
    const NOTAS_LINHAS = ["C4", "D4", "E4", "F4", "G4"];

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

        // Alterna a cor e toca o som correspondente
        if (corAtual === COR_NORMAL || corAtual === COR_ESPECIAL) {
          linhaAtual[quadradoIndex] = CORES_LINHAS[linhaIndex];
        } else {
          linhaAtual[quadradoIndex] = QUADRADOS_ESPECIAIS.includes(quadradoIndex)
            ? COR_ESPECIAL
            : COR_NORMAL;
        }

        return updated;
      });
    };

    // Inicia o timer e verifica as cores dinamicamente
    const iniciarTimer = () => {
      Tone.Transport.start();
      setIsTimerRunning(true);

      const intervalo = tempoEntreBatidas(bpm);
      let index = 0;

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }

      intervalIdRef.current = setInterval(() => {
        // Atualiza a linha do timer
        setLinhaEspecial((prev) => {
          const novaLinha = [...prev];
          novaLinha.fill(COR_NORMAL);
          novaLinha[index] = CORES_LINHAS[index % CORES_LINHAS.length];
          return novaLinha;
        });

        // Verifica e toca as notas correspondentes
        for (let linhaIndex = 0; linhaIndex < TOTAL_LINHAS; linhaIndex++) {
          const corAtual = cores[linhaIndex][index];
          const corEsperada = QUADRADOS_ESPECIAIS.includes(index)
            ? COR_ESPECIAL
            : COR_NORMAL;

          if (corAtual !== corEsperada) {
            const nota = NOTAS_LINHAS[linhaIndex];
            synths.current[linhaIndex].triggerAttackRelease(nota, "8n");
          }
        }

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
              <button onClick={iniciarTimer} disabled={isTimerRunning}>
                Iniciar
              </button>
              <button onClick={pararTimer} disabled={!isTimerRunning}>
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
              >
                {Array(QUADRADOS_POR_LINHA)
                  .fill(null)
                  .map((_, quadradoIndex) => (
                    <div
                      key={`quadrado-${linhaIndex}-${quadradoIndex}`}
                      className="quadrado"
                      style={{
                        backgroundColor: cores[linhaIndex][quadradoIndex],
                      }}
                      onClick={() =>
                        handleQuadradoClick(linhaIndex, quadradoIndex)
                      }
                    ></div>
                  ))}
              </div>
            ))}
        </div>
      </main>
    );
  }

  export default App;
