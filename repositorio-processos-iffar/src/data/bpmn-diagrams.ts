export interface BpmnDiagramData {
  id: string;
  processCode: string;
  type: 'as-is' | 'to-be';
  title: string;
  svgContent: string;
  width: number;
  height: number;
}

// Diagramas SVG BPMN 2.0 vetorizados com alta definição, raias e simbologia padronizada
export const bpmnDiagramsRecord: Record<string, { asIsSvg: string; toBeSvg: string }> = {
  'POP-CTI-01': {
    asIsSvg: `
      <svg viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <defs>
          <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fee2e2"/>
            <stop offset="100%" stop-color="#fca5a5"/>
          </linearGradient>
          <linearGradient id="grad-gray" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
          </linearGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b"/>
          </marker>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626"/>
          </marker>
        </defs>

        <!-- Pool Header -->
        <rect x="20" y="20" width="960" height="480" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="20" y="20" width="40" height="480" rx="8" fill="#dc2626" fill-opacity="0.1" stroke="#dc2626" stroke-width="1.5"/>
        <text x="-260" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#991b1b" letter-spacing="1">PROCESSO AS-IS (ESTADO ATUAL COM GARGALOS)</text>

        <!-- Swimlane 1: Usuário -->
        <line x1="60" y1="180" x2="980" y2="180" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="75" y="50" font-size="13" font-weight="700" fill="#475569">Raia 1: Usuário Solicitante</text>

        <!-- Swimlane 2: Atendente N1 / Bolsista -->
        <line x1="60" y1="340" x2="980" y2="340" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 4"/>
        <text x="75" y="210" font-size="13" font-weight="700" fill="#475569">Raia 2: Nível 1 (Bolsista / Triagem)</text>

        <!-- Swimlane 3: Técnico N2 -->
        <text x="75" y="370" font-size="13" font-weight="700" fill="#475569">Raia 3: Nível 2 (Técnico TI Especialista)</text>

        <!-- Start Event -->
        <circle cx="110" cy="100" r="18" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
        <circle cx="110" cy="100" r="14" fill="#ffffff"/>
        <text x="110" y="135" font-size="11" text-anchor="middle" fill="#334155">Necessidade de TI</text>

        <!-- Flow 1 -->
        <line x1="128" y1="100" x2="175" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)"/>

        <!-- Task 1 (Gargalo WhatsApp/Corredor) -->
        <rect x="180" y="70" width="140" height="60" rx="8" fill="url(#grad-red)" stroke="#dc2626" stroke-width="2"/>
        <text x="250" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Pede socorro via</text>
        <text x="250" y="112" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">WhatsApp / Corredor</text>
        <!-- Alert Badge -->
        <rect x="295" y="60" width="30" height="20" rx="10" fill="#dc2626"/>
        <text x="310" y="74" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">!</text>

        <!-- Flow 2: Para o Técnico Direto (Sem registro) -->
        <path d="M 320 100 L 400 100 L 400 420 L 430 420" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrow-red)"/>
        <text x="360" y="270" font-size="10" fill="#dc2626" font-weight="600" transform="rotate(90 360 270)">Sem registro N1</text>

        <!-- Task 2 (Técnico interrompe trabalho) -->
        <rect x="435" y="390" width="150" height="65" rx="8" fill="url(#grad-red)" stroke="#dc2626" stroke-width="2"/>
        <text x="510" y="415" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Técnico é interrompido</text>
        <text x="510" y="432" font-size="10" text-anchor="middle" fill="#991b1b">e atende sem histórico</text>
        <rect x="560" y="380" width="30" height="20" rx="10" fill="#dc2626"/>
        <text x="575" y="394" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">!</text>

        <!-- Flow 3 -->
        <line x1="585" y1="422" x2="635" y2="422" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

        <!-- Task 3: Resolve no improviso -->
        <rect x="640" y="390" width="130" height="65" rx="8" fill="url(#grad-gray)" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="705" y="418" font-size="11" text-anchor="middle" fill="#334155">Aplica reparo</text>
        <text x="705" y="435" font-size="10" text-anchor="middle" fill="#64748b">sem documentar</text>

        <!-- Flow 4 para o Fim sem validação -->
        <path d="M 770 422 L 820 422 L 820 100 L 870 100" fill="none" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)"/>

        <!-- End Event Inseguro -->
        <circle cx="895" cy="100" r="18" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>
        <text x="895" y="135" font-size="11" text-anchor="middle" fill="#991b1b">Fim (Sem SLA/Feedback)</text>

        <!-- Annotation / Legenda -->
        <rect x="80" y="470" width="350" height="24" rx="4" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
        <text x="90" y="486" font-size="11" fill="#b91c1c">❌ Gargalos Críticos: Sem canal único, sem triagem, sem validação.</text>
      </svg>
    `,
    toBeSvg: `
      <svg viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <defs>
          <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f0fdf4"/>
            <stop offset="100%" stop-color="#bbf7d0"/>
          </linearGradient>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#eff6ff"/>
            <stop offset="100%" stop-color="#bfdbfe"/>
          </linearGradient>
          <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#00823B"/>
          </marker>
        </defs>

        <!-- Pool Header -->
        <rect x="20" y="20" width="960" height="480" rx="8" fill="#ffffff" stroke="#00823B" stroke-width="2"/>
        <rect x="20" y="20" width="40" height="480" rx="8" fill="#00823B" fill-opacity="0.12" stroke="#00823B" stroke-width="1.5"/>
        <text x="-260" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#005c2a" letter-spacing="1">PROCESSO TO-BE (MODELAGEM OTIMIZADA BPMN 2.0)</text>

        <!-- Swimlane 1: Usuário -->
        <line x1="60" y1="180" x2="980" y2="180" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
        <text x="75" y="48" font-size="13" font-weight="700" fill="#005c2a">Raia 1: Usuário Solicitante</text>

        <!-- Swimlane 2: Atendente N1 / Bolsista -->
        <line x1="60" y1="340" x2="980" y2="340" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
        <text x="75" y="205" font-size="13" font-weight="700" fill="#005c2a">Raia 2: Nível 1 - Triagem & Abertura Assistida</text>

        <!-- Swimlane 3: Técnico N2 -->
        <text x="75" y="365" font-size="13" font-weight="700" fill="#005c2a">Raia 3: Nível 2 - Suporte Especializado (Rodízio)</text>

        <!-- Start Event -->
        <circle cx="100" cy="100" r="18" fill="#dcfce7" stroke="#00823B" stroke-width="2.5"/>
        <circle cx="100" cy="100" r="14" fill="#ffffff"/>
        <text x="100" y="132" font-size="11" text-anchor="middle" fill="#1e293b">Demanda de TI</text>

        <!-- Flow 1 -->
        <line x1="118" y1="100" x2="160" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>

        <!-- Gateway 1: Web ou Balcão? -->
        <polygon points="185,80 205,100 185,120 165,100" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="185" y="104" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">X</text>
        <text x="185" y="70" font-size="10" text-anchor="middle" fill="#475569">Canal de Entrada</text>

        <!-- Opção A: GLPI Direto -->
        <line x1="205" y1="100" x2="255" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <text x="230" y="92" font-size="9" fill="#00823B" font-weight="600">Web GLPI</text>
        <rect x="260" y="70" width="130" height="60" rx="8" fill="url(#grad-blue)" stroke="#2563eb" stroke-width="1.5"/>
        <text x="325" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e40af">Abertura no GLPI</text>
        <text x="325" y="112" font-size="10" text-anchor="middle" fill="#3b82f6">com dados do ativo</text>

        <!-- Opção B: Balcão CTI (Abertura Assistida) -->
        <path d="M 185 120 L 185 240 L 255 240" fill="none" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <text x="205" y="190" font-size="9" fill="#00823B" font-weight="600">Presencial</text>
        <rect x="260" y="210" width="130" height="60" rx="8" fill="url(#grad-green)" stroke="#00823B" stroke-width="1.5"/>
        <text x="325" y="235" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Abertura Assistida</text>
        <text x="325" y="252" font-size="10" text-anchor="middle" fill="#007033">Triagem N1 imediata</text>

        <!-- Conexão para Triagem N1 -->
        <path d="M 390 100 L 430 100 L 430 215" fill="none" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <line x1="390" y1="240" x2="430" y2="240" stroke="#00823B" stroke-width="2"/>

        <!-- Gateway 2: N1 resolve? -->
        <polygon points="450,220 470,240 450,260 430,240" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="450" y="244" font-size="12" font-weight="bold" text-anchor="middle" fill="#b45309">X</text>
        <text x="450" y="210" font-size="10" text-anchor="middle" fill="#475569">Resolução N1?</text>

        <!-- N1 Resolve Direto -->
        <path d="M 470 240 L 510 240 L 510 100 L 550 100" fill="none" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <text x="485" y="232" font-size="9" fill="#00823B" font-weight="600">Sim (Simples)</text>

        <!-- N1 Escala N2 (Rodízio) -->
        <path d="M 450 260 L 450 400 L 490 400" fill="none" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <text x="455" y="320" font-size="9" fill="#00823B" font-weight="600">Não (N2)</text>

        <!-- Task N2: Atendimento Especializado com Rodízio -->
        <rect x="495" y="370" width="145" height="60" rx="8" fill="url(#grad-blue)" stroke="#2563eb" stroke-width="1.5"/>
        <text x="567" y="395" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e40af">Atendimento N2</text>
        <text x="567" y="412" font-size="10" text-anchor="middle" fill="#3b82f6">Rodízio balanceado</text>

        <!-- Solução Técnica Registrada -->
        <line x1="640" y1="400" x2="680" y2="400" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <rect x="685" y="370" width="130" height="60" rx="8" fill="url(#grad-green)" stroke="#00823B" stroke-width="1.5"/>
        <text x="750" y="395" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Registra Solução</text>
        <text x="750" y="412" font-size="10" text-anchor="middle" fill="#007033">Base de Conhecimento</text>

        <!-- Validação 48h pelo Usuário -->
        <path d="M 815 400 L 850 400 L 850 135" fill="none" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <path d="M 680 100 L 830 100" fill="none" stroke="#00823B" stroke-width="2"/>

        <rect x="780" y="70" width="135" height="60" rx="8" fill="url(#grad-green)" stroke="#00823B" stroke-width="2"/>
        <text x="847" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Validação em 48h</text>
        <text x="847" y="112" font-size="10" text-anchor="middle" fill="#007033">Aprovação do Usuário</text>

        <!-- End Event -->
        <line x1="915" y1="100" x2="940" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#arrow-green)"/>
        <circle cx="955" cy="100" r="16" fill="#dcfce7" stroke="#00823B" stroke-width="3.5"/>
        <text x="955" y="132" font-size="11" text-anchor="middle" fill="#005c2a">Concluído</text>

        <!-- Badge de Eficiência -->
        <rect x="80" y="468" width="420" height="26" rx="4" fill="#f0fdf4" stroke="#86efac" stroke-width="1"/>
        <text x="90" y="485" font-size="11" fill="#166534" font-weight="600">✅ Ganho TO-BE: SLA &lt; 24h, 100% histórico no GLPI, aprovação do usuário.</text>
      </svg>
    `,
  },
  'POP-CTI-02': {
    asIsSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <defs>
          <linearGradient id="grad-red2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fee2e2"/><stop offset="100%" stop-color="#fca5a5"/>
          </linearGradient>
          <marker id="ar-red2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#dc2626"/>
          </marker>
        </defs>
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="20" y="20" width="40" height="440" rx="8" fill="#dc2626" fill-opacity="0.1" stroke="#dc2626" stroke-width="1.5"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#991b1b">AS-IS: FORMATAÇÃO HETEROGÊNEA E VULNERÁVEL</text>

        <circle cx="100" cy="100" r="18" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="100" y="135" font-size="11" text-anchor="middle" fill="#334155">Início</text>
        <line x1="118" y1="100" x2="160" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#ar-red2)"/>

        <rect x="165" y="70" width="150" height="60" rx="8" fill="url(#grad-red2)" stroke="#dc2626" stroke-width="2"/>
        <text x="240" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Instalação Manual</text>
        <text x="240" y="112" font-size="10" text-anchor="middle" fill="#991b1b">Sem imagem padrão</text>

        <line x1="315" y1="100" x2="365" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#ar-red2)"/>

        <rect x="370" y="70" width="165" height="60" rx="8" fill="url(#grad-red2)" stroke="#dc2626" stroke-width="2"/>
        <text x="452" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Conta Admin Local</text>
        <text x="452" y="112" font-size="10" text-anchor="middle" fill="#991b1b">Entregue ao usuário (PSI ❌)</text>

        <line x1="535" y1="100" x2="585" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#ar-red2)"/>

        <rect x="590" y="70" width="160" height="60" rx="8" fill="url(#grad-red2)" stroke="#dc2626" stroke-width="2"/>
        <text x="670" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Sem Agente GLPI</text>
        <text x="670" y="112" font-size="10" text-anchor="middle" fill="#991b1b">Inventário desatualizado</text>

        <line x1="750" y1="100" x2="800" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#ar-red2)"/>

        <circle cx="820" cy="100" r="18" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>
        <text x="820" y="135" font-size="11" text-anchor="middle" fill="#991b1b">Entrega sem termo</text>

        <rect x="80" y="420" width="400" height="24" rx="4" fill="#fef2f2" stroke="#fca5a5"/>
        <text x="90" y="436" font-size="11" fill="#b91c1c">❌ Gargalos: Vulnerabilidade de admin, tempo excessivo (4h), falta de controle.</text>
      </svg>
    `,
    toBeSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <defs>
          <linearGradient id="grad-grn2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f0fdf4"/><stop offset="100%" stop-color="#bbf7d0"/>
          </linearGradient>
          <marker id="ar-grn2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#00823B"/>
          </marker>
        </defs>
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#00823B" stroke-width="2"/>
        <rect x="20" y="20" width="40" height="440" rx="8" fill="#00823B" fill-opacity="0.12" stroke="#00823B" stroke-width="1.5"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#005c2a">TO-BE: IMAGEM PADRÃO E CHECKLIST DE LIBERAÇÃO</text>

        <circle cx="90" cy="100" r="16" fill="#dcfce7" stroke="#00823B" stroke-width="2.5"/>
        <line x1="106" y1="100" x2="140" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#ar-grn2)"/>

        <rect x="145" y="70" width="130" height="60" rx="8" fill="url(#grad-grn2)" stroke="#00823B" stroke-width="1.5"/>
        <text x="210" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Imagem Homologada</text>
        <text x="210" y="112" font-size="10" text-anchor="middle" fill="#007033">PXE / WIM em 25 min</text>

        <line x1="275" y1="100" x2="310" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#ar-grn2)"/>

        <rect x="315" y="70" width="140" height="60" rx="8" fill="url(#grad-grn2)" stroke="#00823B" stroke-width="1.5"/>
        <text x="385" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Ingresso no Domínio</text>
        <text x="385" y="112" font-size="10" text-anchor="middle" fill="#007033">AD iffar.local + GPOs</text>

        <line x1="455" y1="100" x2="490" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#ar-grn2)"/>

        <rect x="495" y="70" width="140" height="60" rx="8" fill="url(#grad-grn2)" stroke="#00823B" stroke-width="1.5"/>
        <text x="565" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Perfil Restrito PSI</text>
        <text x="565" y="112" font-size="10" text-anchor="middle" fill="#007033">Admin no Cofre CTI</text>

        <line x1="635" y1="100" x2="670" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#ar-grn2)"/>

        <rect x="675" y="70" width="140" height="60" rx="8" fill="url(#grad-grn2)" stroke="#00823B" stroke-width="1.5"/>
        <text x="745" y="95" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">GLPI Agent + Base</text>
        <text x="745" y="112" font-size="10" text-anchor="middle" fill="#007033">Inventário forçado</text>

        <line x1="815" y1="100" x2="850" y2="100" stroke="#00823B" stroke-width="2" marker-end="url(#ar-grn2)"/>

        <circle cx="875" cy="100" r="16" fill="#dcfce7" stroke="#00823B" stroke-width="3"/>
        <text x="875" y="132" font-size="11" text-anchor="middle" fill="#005c2a">Termo Assinado</text>

        <rect x="80" y="420" width="460" height="24" rx="4" fill="#f0fdf4" stroke="#86efac"/>
        <text x="90" y="436" font-size="11" fill="#166534" font-weight="600">✅ Ganho TO-BE: Tempo cai para 1h15, segurança total com LAPS e inventário 100%.</text>
      </svg>
    `,
  },
  'POP-CTI-03': {
    asIsSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#991b1b">AS-IS: MANUTENÇÃO REATIVA E VAGAS OCIOSAS</text>
        <circle cx="100" cy="120" r="18" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="100" y="155" font-size="11" text-anchor="middle">Máquina Falha em Aula</text>
        <line x1="118" y1="120" x2="190" y2="120" stroke="#dc2626" stroke-width="2"/>
        <rect x="195" y="90" width="160" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="275" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Aluno Sem Máquina</text>
        <text x="275" y="132" font-size="10" text-anchor="middle" fill="#991b1b">Prejuízo pedagógico (❌)</text>
        <line x1="355" y1="120" x2="430" y2="120" stroke="#dc2626" stroke-width="2"/>
        <rect x="435" y="90" width="170" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="520" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Manutenção no Local</text>
        <text x="520" y="132" font-size="10" text-anchor="middle" fill="#991b1b">Barulho e atraso na aula</text>
      </svg>
    `,
    toBeSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#00823B" stroke-width="2"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#005c2a">TO-BE: RESERVA TÉCNICA E 100% DE DISPONIBILIDADE</text>
        <circle cx="100" cy="120" r="16" fill="#dcfce7" stroke="#00823B" stroke-width="2.5"/>
        <text x="100" y="150" font-size="11" text-anchor="middle">Falha Detectada</text>
        <line x1="116" y1="120" x2="175" y2="120" stroke="#00823B" stroke-width="2"/>
        <rect x="180" y="90" width="180" height="60" rx="8" fill="#dcfce7" stroke="#00823B" stroke-width="2"/>
        <text x="270" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Acionamento da Reserva</text>
        <text x="270" y="132" font-size="10" text-anchor="middle" fill="#007033">Swap em &lt; 10 min (100% Ativo)</text>
        <line x1="360" y1="120" x2="420" y2="120" stroke="#00823B" stroke-width="2"/>
        <rect x="425" y="90" width="170" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="510" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e40af">Manutenção na CTI</text>
        <text x="510" y="132" font-size="10" text-anchor="middle" fill="#3b82f6">Desoxidação e Testes</text>
      </svg>
    `,
  },
  'POP-CTI-04': {
    asIsSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#991b1b">AS-IS: BACKUPS DISPERSOS E RISCO LGPD</text>
        <rect x="180" y="90" width="180" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="270" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Arquivos em Pendrives</text>
        <text x="270" y="132" font-size="10" text-anchor="middle" fill="#991b1b">Sem criptografia ou nuvem</text>
        <rect x="420" y="90" width="190" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="515" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">HDs descartados</text>
        <text x="515" y="132" font-size="10" text-anchor="middle" fill="#991b1b">sem sanitização prévia</text>
      </svg>
    `,
    toBeSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#00823B" stroke-width="2"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#005c2a">TO-BE: NUVEM, EXPURGO 30D E DISK WIPE</text>
        <rect x="150" y="90" width="170" height="60" rx="8" fill="#dcfce7" stroke="#00823B" stroke-width="2"/>
        <text x="235" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Nuvem Google Workspace</text>
        <text x="235" y="132" font-size="10" text-anchor="middle" fill="#007033">Drive Institucional</text>
        <rect x="360" y="90" width="180" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="450" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e40af">NAS Temporário CTI</text>
        <text x="450" y="132" font-size="10" text-anchor="middle" fill="#3b82f6">Expurgo Automático 30d</text>
        <rect x="580" y="90" width="180" height="60" rx="8" fill="#dcfce7" stroke="#00823B" stroke-width="2"/>
        <text x="670" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Protocolo Disk Wipe</text>
        <text x="670" y="132" font-size="10" text-anchor="middle" fill="#007033">DoD 3-Passes / NIST 800-88</text>
      </svg>
    `,
  },
  'POP-CTI-05': {
    asIsSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#991b1b">AS-IS: FILA PRESENCIAL E MANUSEIO DE SMARTPHONES</text>
        <rect x="180" y="90" width="180" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="270" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Fila Gigante no Balcão</text>
        <text x="270" y="132" font-size="10" text-anchor="middle" fill="#991b1b">Início do semestre letivo</text>
        <rect x="410" y="90" width="190" height="60" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <text x="505" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#991b1b">Técnico digita no celular</text>
        <text x="505" y="132" font-size="10" text-anchor="middle" fill="#991b1b">Risco de responsabilidade civil</text>
      </svg>
    `,
    toBeSvg: `
      <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto font-sans">
        <rect x="20" y="20" width="960" height="440" rx="8" fill="#ffffff" stroke="#00823B" stroke-width="2"/>
        <text x="-240" y="46" transform="rotate(-90)" font-size="14" font-weight="bold" fill="#005c2a">TO-BE: AUTOSSERVIÇO VIA QR CODE E SUPORTE ASSISTIDO</text>
        <rect x="150" y="90" width="180" height="60" rx="8" fill="#dcfce7" stroke="#00823B" stroke-width="2"/>
        <text x="240" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">Totens com QR Code</text>
        <text x="240" y="132" font-size="10" text-anchor="middle" fill="#007033">Guia mobile autônomo</text>
        <rect x="370" y="90" width="180" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="460" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#1e40af">Atendimento Assistido</text>
        <text x="460" y="132" font-size="10" text-anchor="middle" fill="#3b82f6">Orientação verbal sem tocar</text>
        <rect x="590" y="90" width="170" height="60" rx="8" fill="#dcfce7" stroke="#00823B" stroke-width="2"/>
        <text x="675" y="115" font-size="11" font-weight="bold" text-anchor="middle" fill="#005c2a">RADIUS 802.1X</text>
        <text x="675" y="132" font-size="10" text-anchor="middle" fill="#007033">Autenticação WPA2-Enterprise</text>
      </svg>
    `,
  },
};
