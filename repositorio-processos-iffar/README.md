# Repositório Digital de Processos de TI – IFFar Campus Frederico Westphalen

Aplicação web completa, moderna, responsiva e pronta para produção desenvolvida para a **Coordenação de Tecnologia da Informação (CTI)** do **Instituto Federal Farroupilha (IFFar) - Campus Frederico Westphalen**.

O sistema centraliza os Procedimentos Operacionais Padrão (POPs), diagramas de processos em notação **BPMN 2.0 (AS-IS vs. TO-BE)** e a **Central de Autosserviço via QR Code** para discentes e servidores, contando com arquitetura desacoplada e replicável para outros campi da Rede Farroupilha.

---

## 🚀 Como Executar a Aplicação

### Opção 1: Execução Imediata (Sem Dependências / Standalone)
Para visualizar e interagir com o sistema imediatamente em qualquer navegador (Edge, Chrome, Firefox):
1. Dê um duplo clique no arquivo [`standalone.html`](./standalone.html) ou abra-o no seu navegador.
2. A aplicação carregará toda a interface React, diagramas BPMN, checklists e gerador de cartazes.

### Opção 2: Execução com Node.js / Vite (Desenvolvimento e Produção)
```bash
# 1. Navegue até a pasta do projeto
cd repositorio-processos-iffar

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Para gerar o build de produção
npm run build
```

---

## 🏛️ Estrutura dos 5 Macroprocessos Modelados (TCC CTI)

1. **`POP-CTI-01` - Atendimento de Chamados e Suporte ao Usuário:**
   - Canal único obrigatório 100% via GLPI.
   - Atendimento presencial assistido no balcão para inclusão digital.
   - Triagem no Nível 1 (bolsistas) e rodízio balanceado no Nível 2 (técnicos/analistas).
   - Encerramento condicionado à validação de 48h pelo próprio usuário.

2. **`POP-CTI-02` - Formatação e Preparação de Estações de Trabalho:**
   - Implantação de imagem homologada via PXE/WIM em menos de 75 minutos.
   - Separação rigorosa de privilégios: Usuário Padrão restrito no Active Directory (`iffar.local`) e senha de Administrador local no cofre LAPS da CTI.
   - Baseline de softwares corporativos e inventário forçado com o GLPI Agent.

3. **`POP-CTI-03` - Manutenção Preventiva e Corretiva dos Laboratórios de Informática:**
   - **Protocolo de Reserva Técnica Imediata:** swap de gabinetes completos em até 10 minutos, garantindo **100% de vagas ativas** para os estudantes nas aulas práticas.
   - Mitigação de umidade e rotina semestral de preventiva nos recessos acadêmicos.

4. **`POP-CTI-04` - Procedimento de Backup e Segurança das Estações de Trabalho:**
   - Nuvem institucional corporativa (Google Workspace / Drive IFFar) como repositório primário.
   - Storage NAS restrito de manutenção temporária com expurgo automático estrito de 30 dias.
   - Protocolo de sanitização magnética (*Disk Wipe / DoD 5220.22-M / NIST SP 800-88*) com laudo para descarte seguro.

5. **`POP-CTI-05` - Configuração e Suporte à Rede Wi-Fi Estudantes:**
   - Autosserviço via cartazes murais com QR Code dinâmico.
   - Configuração do padrão corporativo WPA2-Enterprise / PEAP / MSCHAPv2 e campo obrigatório "Domínio" no Android 11+ (`iffarroupilha.edu.br`).
   - Diretriz de atendimento presencial assistido (sem manuseio de smartphones de terceiros pelos servidores).

---

## 🛠️ Recursos e Tecnologias

- **Frontend:** React 18, TypeScript, Tailwind CSS v3 (Paleta Institucional `#00823B` e `#E30613`).
- **Diagramas BPMN 2.0:** Visualizador SVG com suporte a zoom in/out, pan, tela cheia e alternador comparativo *AS-IS* (gargalos) vs. *TO-BE* (otimizado).
- **Checklist Interativo:** Caixas de seleção com cálculo de conformidade e persistência no `localStorage`.
- **Gerador de Cartazes:** Cartaz mural formatado com QR Code dinâmico (`qrcode.react`) pronto para afixação e impressão A4 (`@media print`).
- **Busca Global Instantânea (`Ctrl+K`):** Pesquisa instantânea por POPs, termos da PSI, tutoriais e parâmetros de rede.
- **Replicabilidade Multi-Campus:** Arquivo desacoplado [`src/config/campus-config.json`](./src/config/campus-config.json) permitindo que outros campi da Rede Federal façam fork e utilizem a plataforma imediatamente.

---

## 📂 Estrutura de Pastas

```text
repositorio-processos-iffar/
├── standalone.html          # Versão executável em 1 clique
├── index.html               # Entrada Vite
├── package.json             # Dependências e scripts
├── tailwind.config.js       # Paleta e temas IFFar
├── src/
│   ├── main.tsx             # Ponto de entrada React
│   ├── App.tsx              # Componente principal e rotas
│   ├── index.css            # Estilos globais e @media print
│   ├── types/               # Definições TypeScript
│   ├── config/              # campus-config.json (Multi-Campus)
│   ├── context/             # CampusContext.tsx
│   ├── data/                # Mocks completos dos 5 processos e tutoriais
│   └── components/
│       ├── layout/          # Header institucional e Footer
│       ├── home/            # Banner de métricas e Hub de públicos
│       ├── bpmn/            # Visualizador SVG BPMN 2.0 e matriz de gargalos
│       ├── pop/             # POP formal, Checklist e Gerador de Cartaz
│       ├── self-service/    # Guias mobile e alertas de parâmetros sensíveis
│       └── campus/          # Seletor de campus dinâmico
```
