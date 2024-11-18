import React, { useState, useEffect } from "react";
import "./style.css";

const QUADRADOS_POR_LINHA = 16;
const TOTAL_LINHAS = 5;

// Cores definidas
const COR_NORMAL = "rgb(52, 52, 52)";
const COR_ESPECIAL = "rgb(83, 81, 81)";
const CORES_LINHAS = ["#34AD9D", "#C18E3B", "#0C60A4", "#318B58", "#8F30A1"];
const QUADRADOS_ESPECIAIS = [0, 4, 8, 12]; // Índices dos quadrados especiais
const QUADRADOS_NORMAIS = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15]; // Índices dos quadrados normais

function App() {
  const [cores, setCores] = useState(() => {
    // Inicializa todos os quadrados com a cor normal
    const inicializarCores = Array(TOTAL_LINHAS).fill(null).map(() => 
      Array(QUADRADOS_POR_LINHA).fill(COR_NORMAL)  // Inicializa todos os quadrados com COR_NORMAL
    );

    // ajusta os quadrados especiais com a COR_ESPECIAL nas linhas 1 a 5
    for (let i = 0; i < TOTAL_LINHAS; i++) {
      QUADRADOS_ESPECIAIS.forEach((indice) => {
        inicializarCores[i][indice] = COR_ESPECIAL;
      });
    }

    return inicializarCores;
  });

  // Função para alternar cor ao clicar
  const handleQuadradoClick = (linhaIndex, quadradoIndex) => {
    setCores((prev) => {
      const updated = prev.map((linha, i) =>
        i === linhaIndex ? [...linha] : linha
      );
      const linhaAtual = updated[linhaIndex];
      const corAtual = linhaAtual[quadradoIndex];

      // Verifica se o quadrado é especial
      const isEspecial = QUADRADOS_ESPECIAIS.includes(quadradoIndex);
      if (isEspecial) {
        // Quadrado especial alterna entre COR_ESPECIAL e a cor da linha
        linhaAtual[quadradoIndex] = corAtual === COR_ESPECIAL
          ? CORES_LINHAS[linhaIndex]
          : COR_ESPECIAL;
      } else {
        // Quadrado normal alterna entre COR_NORMAL e a cor da linha
        linhaAtual[quadradoIndex] = corAtual === COR_NORMAL
          ? CORES_LINHAS[linhaIndex]
          : COR_NORMAL;
      }

      return updated;
    });
  };

  return (
    <main>
      <div className="card">
        {/* Renderiza as linhas e quadrados */}
        {Array(TOTAL_LINHAS)
          .fill(null)
          .map((_, linhaIndex) => (
            <div className="linha" key={`linha-${linhaIndex}`} id={`Linha${linhaIndex + 1}`}>
              {Array(QUADRADOS_POR_LINHA)
                .fill(null)
                .map((_, quadradoIndex) => (
                  <div
                    key={`quadrado-${linhaIndex}-${quadradoIndex}`}
                    className="quadrado"
                    style={{
                      backgroundColor: cores[linhaIndex][quadradoIndex]
                    }}
                    onClick={() => handleQuadradoClick(linhaIndex, quadradoIndex)}
                  ></div>
                ))}
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
