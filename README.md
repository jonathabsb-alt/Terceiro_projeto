#  Painel de Reservas – Hospedagem

Sistema acadêmico desenvolvido para simular o **painel de reservas** de uma hospedagem (hotel ou pousada), utilizando JavaScript moderno e arquitetura de **Single Page Application (SPA)**.

---

##  Tecnologias Utilizadas

- **HTML5** – Estrutura semântica
- **CSS3 (Pico.css)** – Estilo leve e responsivo
- **JavaScript (ES6+)** – Lógica e manipulação do DOM
- **Alpine.js** – Framework reativo para widgets interativos
- **LocalStorage API** – Armazenamento persistente no navegador

---

##  Estrutura de Pastas

painel-reservas/
├── index.html
├── css/
│ └── style.css
├── js/
│ ├── main.js
│ ├── router.js
│ ├── templates.js
│ ├── utils.js
│ ├── store.js
│ ├── components/
│ │ └── FormValidator.js
│ └── views/
│ ├── home.js
│ ├── reservas.js
│ └── about.js
└── imagens/
└── logo_painel_reservas.png


---

##  Funcionalidades

-  **Navegação SPA** – Transição entre páginas sem recarregar o navegador  
-  **Cadastro de reservas** – Formulário validado com campos obrigatórios  
-  **Controle de datas** – Verificação de consistência entre check-in e check-out  
-  **Armazenamento local** – Todas as reservas são salvas no `localStorage`  
-  **Gestão de status** – Alterar entre *ativa* e *concluída*  
-  **Exclusão de reservas** – Remoção dinâmica via DOM e persistência atualizada  
-  **Componente reativo (Alpine.js)** – Simulação da taxa de ocupação da hospedagem  
-  **Design limpo e responsivo** – Baseado no framework [Pico.css](https://picocss.com)

---

---

##  Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/painel-reservas.git
