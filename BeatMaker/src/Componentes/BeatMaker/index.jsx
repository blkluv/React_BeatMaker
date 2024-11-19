import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import * as Tone from "tone";

const QUADRADOS_POR_LINHA = 16; // Quantidade de quadrados por linha
const TOTAL_LINHAS = 5; // Linhas de quadrados
const NUMERO_DE_QUADRADOS = 16; // Quadrados da linha do timer

// Cores definidas
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
  ); // Linha extra
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Estado para o controle do timer
  const synth = useRef(null); // Armazena o sintetizador único
  const intervalIdRef = useRef(null); // Ref para o ID do intervalo, usado para limpeza
  const timeoutRef = useRef(null); // Ref para controlar o loop do som

  // Inicializa o sintetizador uma vez
  useEffect(() => {
    synth.current = new Tone.Synth().toDestination();
    return () => synth.current.dispose(); // Limpa o sintetizador ao desmontar
  }, []);

  // Função para alterar o BPM a partir do input
  const handleBpmChange = (event) => {
    const novoBpm = parseInt(event.target.value, 10);
    if (!isNaN(novoBpm) && novoBpm > 0) {
      setBpm(novoBpm);
    }
  };

  // Função recursiva para verificar os quadrados e tocar o som
  const verificarLinhaRecursivamente = (linhaIndex, quadradoIndex = 0) => {
    if (!isTimerRunning) return; // Para a execução se o timer não estiver rodando

    if (quadradoIndex === 16) quadradoIndex = 0; // Reinicia a contagem na linha

    const corAtual = cores[linhaIndex][quadradoIndex];
    const corEsperada = QUADRADOS_ESPECIAIS.includes(quadradoIndex)
      ? COR_ESPECIAL
      : COR_NORMAL;

    timeoutRef.current = setTimeout(() => {
      if (!isTimerRunning) return; // Interrompe se o timer foi parado

      verificarLinhaRecursivamente(linhaIndex, quadradoIndex + 1);

      // Toca som apenas se o timer estiver ativo
      if (corAtual !== corEsperada && isTimerRunning) {
        synth.current.triggerAttackRelease("C4", "8n");
      }
    }, tempoEntreBatidas(bpm));
  };

  // Atualizar as cores da linha especial (timer) com base no BPM
  useEffect(() => {
    if (!isTimerRunning) return; // Se o timer não estiver ativo, não faz nada

    const intervalo = tempoEntreBatidas(bpm);
    let index = 0;

    // Limpa o intervalo anterior, se existir
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    // Cria o novo intervalo e armazena seu ID
    intervalIdRef.current = setInterval(() => {
      setLinhaEspecial((prev) => {
        const novaLinha = [...prev];
        novaLinha.fill(COR_NORMAL); // Reseta todos os quadrados
        novaLinha[index] = CORES_LINHAS[index % CORES_LINHAS.length]; // Atualiza a cor no índice atual
        index = (index + 1) % NUMERO_DE_QUADRADOS; // Incrementa o índice
        return novaLinha;
      });
    }, intervalo);

    verificarLinhaRecursivamente(0); // Inicia a verificação da linha 1

    return () => {
      // Limpa o intervalo quando o componente for desmontado ou o timer parar
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [bpm, isTimerRunning]);

  // Função para alternar a cor de qualquer quadrado
  const handleQuadradoClick = (linhaIndex, quadradoIndex) => {
    setCores((prev) => {
      const updated = prev.map((linha, i) =>
        i === linhaIndex ? [...linha] : linha
      );
      const linhaAtual = updated[linhaIndex];
      const corAtual = linhaAtual[quadradoIndex];

      const isEspecial = QUADRADOS_ESPECIAIS.includes(quadradoIndex);
      if (isEspecial) {
        linhaAtual[quadradoIndex] =
          corAtual === COR_ESPECIAL ? CORES_LINHAS[linhaIndex] : COR_ESPECIAL;
      } else {
        linhaAtual[quadradoIndex] =
          corAtual === COR_NORMAL ? CORES_LINHAS[linhaIndex] : COR_NORMAL;
      }

      return updated;
    });
  };

  // Função para iniciar o timer e o som
  const iniciarTimer = () => {
    Tone.Transport.start(); // Inicia o transporte do Tone.js
    setIsTimerRunning(true); // Altera o estado para iniciar o timer
  };

  // Função para parar o timer e o som
  const pararTimer = () => {
    Tone.Transport.stop(); // Garante que o transporte seja parado
    if (synth.current) {
      synth.current.triggerRelease(); // Libera qualquer som tocando
    }
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current); // Limpa o intervalo do timer
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Limpa o timeout do loop do som
    }
    setIsTimerRunning(false); // Altera o estado para parar o timer
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
            <button onClick={iniciarTimer}>
              Iniciar
            </button>
            <button onClick={pararTimer}>
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
