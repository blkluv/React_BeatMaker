import "./BeatMaker/style.css";
import React, { useState, useEffect, useRef } from "react";

function Linhas() {

    return (
        <>
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
        </>
    )
}

export default Linhas;