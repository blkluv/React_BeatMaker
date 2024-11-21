import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import particlesJS from 'particles.js'; // Importando a biblioteca particles.js

function Entrada() {
  useEffect(() => {
    try {
      // Verificando se a função particlesJS está disponível
      if (typeof particlesJS !== 'undefined') {
        console.log('Inicializando partículas...');
        particlesJS('entrada', {
          particles: {
            number: {
              value: 50, // Quantidade de partículas
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#ffffff" // Cor das partículas
            },
            shape: {
              type: "circle", // Forma das partículas
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1
              }
            },
            size: {
              value: 3, // Tamanho das partículas
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.1
              }
            },
            line_linked: {
              enable: true, // Conectar partículas com linhas
              distance: 150,
              color: "#ffffff",
              opacity: 0.5,
              width: 1
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out" // Partículas saindo da tela
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse" // Efeito de repulsão ao passar o mouse
              },
              onclick: {
                enable: true,
                mode: "push" // Efeito de empurrar partículas ao clicar
              }
            }
          }
        });
      } else {
        console.error('particlesJS não foi carregado corretamente!');
      }
    } catch (error) {
      console.error('Erro ao inicializar partículas: ', error);
    }
  }, []);

  return (
    <main id="entrada">
      <Link to='/BeatMaker'>
        <button className="botao-entrada">
          <h1>Começar</h1>
        </button>
      </Link>
      <Link to='/Tutorial'>
        <button className="botao-entrada">
          <h1>Tutorial</h1>
        </button>
      </Link>
    </main>
  );
}

export default Entrada;
