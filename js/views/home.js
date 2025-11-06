import { html } from '../templates.js';

export async function HomeView() {
  return html`
    <section>
      <h2>Painel de Reservas</h2>
      <p>
        Este sistema acadêmico simula o painel de reservas de uma hospedagem,
        permitindo cadastrar, listar e gerenciar reservas de forma simples.
      </p>

      <div class="card">
        <h3>Funcionalidades principais</h3>
        <ul>
          <li>SPA com navegação por hash (Início, Reservas, Sobre)</li>
          <li>Formulário de reservas com validação e mensagens de erro</li>
          <li>Verificação de consistência entre datas de check-in e check-out</li>
          <li>Persistência das reservas usando localStorage</li>
          <li>Integração com Alpine.js para componente reativo</li>
        </ul>
      </div>
    </section>
  `;
}
