import { html } from '../templates.js';

export async function AboutView() {
  return html`
    <section>
      <h2>Sobre o sistema</h2>
      <p>
        Este painel simula o controle de reservas de uma hospedagem,
        utilizando SPA, manipulação do DOM, eventos, templates JavaScript,
        validação de formulários, armazenamento local (localStorage) e
        integração com um framework reativo (Alpine.js).
      </p>

      <div class="card" x-data="{ ocupacao: 65 }">
        <h3>Widget com Alpine.js</h3>
        <p>Exemplo simples de componente reativo para taxa de ocupação.</p>
        <p>Taxa de ocupação: <strong x-text="ocupacao + '%'"></strong></p>
        <button @click="ocupacao = (ocupacao + 5) % 105">
          Simular aumento
        </button>
      </div>
    </section>
  `;
}
