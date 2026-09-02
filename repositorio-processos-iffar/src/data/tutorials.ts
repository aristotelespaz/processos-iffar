import { SelfServiceTutorial } from '../types/tutorial';

export const mockTutorials: SelfServiceTutorial[] = [
  {
    id: 'tut-wifi',
    slug: 'wifi-estudantes',
    title: 'Como Conectar à Rede Wi-Fi Estudantes (IFFar_Estudantes)',
    category: 'Rede e Conectividade',
    shortDescription: 'Guia passo a passo para conectar smartphones Android, iPhone (iOS), notebooks Windows e Linux à rede sem fio institucional com segurança WPA2-Enterprise.',
    fullDescription: 'A rede IFFar_Estudantes utiliza autenticação corporativa segura (802.1X / WPA2-Enterprise). Para conectar, você deve utilizar sua matrícula e senha cadastrada nos sistemas acadêmicos.',
    badge: 'Mais Acessado',
    targetAudience: 'Estudantes e Servidores',
    estimatedTime: '2 minutos',
    relatedPopCode: 'POP-CTI-05',
    importantNotice: 'Atenção usuários de Android 11 ou superior: o campo "Domínio" é OBRIGATÓRIO e deve ser preenchido exatamente como "iffarroupilha.edu.br". Sem ele, a conexão falhará!',
    sensitiveParameters: [
      {
        label: 'Nome da Rede (SSID)',
        value: 'IFFar_Estudantes',
        description: 'Selecione esta rede na sua lista de redes Wi-Fi disponíveis.',
        copyable: true,
      },
      {
        label: 'Domínio (Android 11+)',
        value: 'iffarroupilha.edu.br',
        description: 'Campo obrigatório em versões recentes do Android.',
        isSensitive: true,
        copyable: true,
      },
      {
        label: 'Método EAP',
        value: 'PEAP',
        description: 'Tipo de encapsulamento corporativo.',
        copyable: true,
      },
      {
        label: 'Autenticação de Fase 2',
        value: 'MSCHAPv2',
        description: 'Protocolo de autenticação de senha.',
        copyable: true,
      },
      {
        label: 'Certificado de CA',
        value: 'Não validar (ou Usar certificados do sistema)',
        description: 'Selecione "Não validar" ou "Certificados do sistema" no menu suspenso.',
      },
      {
        label: 'Identidade (Usuário)',
        value: 'Sua Matrícula IFFar',
        description: 'Digite apenas os números da sua matrícula (ex: 2024100123).',
      },
      {
        label: 'Senha',
        value: 'Sua Senha Acadêmica',
        description: 'A mesma senha que você utiliza para acessar o SIGAA / Suap.',
        isSensitive: true,
      },
    ],
    guides: [
      {
        osId: 'android',
        osName: 'Android (Versões 11, 12, 13, 14 e 15)',
        osIcon: 'Smartphone',
        badgeText: 'Mais Comum',
        description: 'Configuração detalhada para dispositivos Samsung, Motorola, Xiaomi, etc., com Android 11 ou superior.',
        steps: [
          {
            stepNumber: 1,
            title: 'Acesse as Configurações de Wi-Fi',
            description: 'Abra as Configurações do seu aparelho, toque em "Conexões" ou "Rede e Internet" e selecione "Wi-Fi".',
            tip: 'Verifique se o Wi-Fi do aparelho está ativado.',
          },
          {
            stepNumber: 2,
            title: 'Selecione a Rede "IFFar_Estudantes"',
            description: 'Localize e toque sobre o nome da rede "IFFar_Estudantes" na lista de redes disponíveis.',
            fieldLabel: 'Rede Selecionada',
            fieldValue: 'IFFar_Estudantes',
          },
          {
            stepNumber: 3,
            title: 'Defina o Método EAP e Certificado CA',
            description: 'No formulário que abrir, mantenha o "Método EAP" como PEAP e na opção "Certificado de CA" selecione "Não validar" (ou "Usar certificados do sistema").',
            fieldLabel: 'Certificado CA',
            fieldValue: 'Não validar (ou Usar certificados do sistema)',
            warning: 'Nunca selecione "Solicitar certificado" a menos que você tenha um instalado.',
          },
          {
            stepNumber: 4,
            title: 'Preencha o Campo DOMÍNIO (Crítico!)',
            description: 'Role a tela até encontrar o campo "Domínio" e digite: iffarroupilha.edu.br',
            fieldLabel: 'Domínio Obrigatório',
            fieldValue: 'iffarroupilha.edu.br',
            warning: 'A falta deste preenchimento é o motivo número 1 de falhas de conexão!',
          },
          {
            stepNumber: 5,
            title: 'Configure a Autenticação de Fase 2',
            description: 'Selecione MSCHAPv2 no campo "Autenticação de fase 2" (se disponível). Deixe o campo "Identidade anônima" em branco.',
            fieldLabel: 'Fase 2',
            fieldValue: 'MSCHAPv2',
          },
          {
            stepNumber: 6,
            title: 'Insira sua Identidade e Senha',
            description: 'No campo "Identidade", digite o número da sua matrícula. No campo "Senha", digite sua senha de acesso institucional.',
            fieldLabel: 'Identidade',
            fieldValue: 'Sua Matrícula (apenas números)',
          },
          {
            stepNumber: 7,
            title: 'Toque em "Conectar"',
            description: 'Aguarde alguns segundos até que a mensagem "Conectado" seja exibida abaixo do nome da rede.',
            tip: 'Pronto! Seu smartphone já está com acesso à internet em alta velocidade.',
          },
        ],
        troubleshooting: [
          {
            issue: 'Aparece a mensagem "Erro de autenticação" ou "Falha ao conectar".',
            resolution: 'Verifique se digitou a matrícula e senha corretamente. Se trocou de senha recentemente no SIGAA, digite a nova senha. Confira se o campo Domínio foi digitado sem espaços extras.',
          },
          {
            issue: 'O botão "Conectar" fica cinza e desabilitado.',
            resolution: 'Geralmente acontece se o campo "Domínio" (iffarroupilha.edu.br) ou "Identidade" não foi preenchido.',
          },
        ],
      },
      {
        osId: 'ios',
        osName: 'iPhone e iPad (Apple iOS / iPadOS)',
        osIcon: 'Apple',
        badgeText: 'Configuração Rápida',
        description: 'Passo a passo simplificado para dispositivos Apple iOS.',
        steps: [
          {
            stepNumber: 1,
            title: 'Abra os Ajustes de Wi-Fi',
            description: 'Vá em Ajustes > Wi-Fi e aguarde a lista de redes carregar.',
          },
          {
            stepNumber: 2,
            title: 'Selecione "IFFar_Estudantes"',
            description: 'Toque na rede "IFFar_Estudantes". Uma tela solicitando credenciais será aberta.',
          },
          {
            stepNumber: 3,
            title: 'Digite Usuário e Senha',
            description: 'No campo "Nome de Usuário", digite o número da sua matrícula. No campo "Senha", digite sua senha institucional.',
            fieldLabel: 'Nome de Usuário',
            fieldValue: 'Sua Matrícula',
          },
          {
            stepNumber: 4,
            title: 'Confiar no Certificado',
            description: 'Ao tocar em "Conectar", o iOS exibirá uma tela de Certificado de Segurança do IFFar. Toque no canto superior direito em "Confiar" (Trust).',
            warning: 'Você deve tocar em "Confiar" para que a conexão seja autenticada com sucesso.',
          },
          {
            stepNumber: 5,
            title: 'Conexão Estabelecida',
            description: 'Um ícone de tique azul aparecerá ao lado do nome da rede indicando sucesso.',
          },
        ],
        troubleshooting: [
          {
            issue: 'Não apareceu a opção "Confiar no Certificado".',
            resolution: 'Toque no ícone de "i" azul ao lado de IFFar_Estudantes, toque em "Esquecer esta rede" e tente conectar novamente.',
          },
        ],
      },
      {
        osId: 'windows',
        osName: 'Notebooks Windows (10 e 11)',
        osIcon: 'Laptop',
        description: 'Guia para conexão em computadores portáteis com sistema operacional Windows.',
        steps: [
          {
            stepNumber: 1,
            title: 'Abra o menu de redes na barra de tarefas',
            description: 'Clique no ícone de rede/globo no canto inferior direito próximo ao relógio.',
          },
          {
            stepNumber: 2,
            title: 'Clique em "IFFar_Estudantes" e "Conectar"',
            description: 'Marque a opção "Conectar automaticamente" e clique em "Conectar".',
          },
          {
            stepNumber: 3,
            title: 'Insira suas credenciais',
            description: 'Digite seu número de matrícula no primeiro campo e sua senha no segundo campo.',
          },
          {
            stepNumber: 4,
            title: 'Confirme o aviso de segurança do Windows',
            description: 'Se o Windows perguntar se deseja continuar se conectando ao servidor do IFFar, clique em "Conectar".',
          },
        ],
        troubleshooting: [
          {
            issue: 'Windows informa "Não é possível conectar a esta rede".',
            resolution: 'Vá em Configurações > Rede e Internet > Wi-Fi > Gerenciar redes conhecidas, selecione IFFar_Estudantes, clique em "Remover" e tente novamente.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Posso conectar mais de um aparelho simultaneamente?',
        answer: 'Sim, você pode conectar seu smartphone e notebook com as mesmas credenciais da sua matrícula.',
      },
      {
        question: 'O que fazer se esqueci minha senha da rede?',
        answer: 'Acesse o portal do SIGAA/Suap no computador ou pelo 4G e utilize a opção "Esqueci minha senha" para redefini-la.',
      },
      {
        question: 'A rede Wi-Fi possui bloqueio de sites?',
        answer: 'Sim, em conformidade com a Política de Segurança da Informação (PSI), sites de conteúdo inadequado, pirataria e jogos de azar são bloqueados pelo firewall institucional.',
      },
    ],
  },
  {
    id: 'tut-backup',
    slug: 'backup-nuvem-corporativa',
    title: 'Guia de Backup em Nuvem Corporativa e Segurança de Dados',
    category: 'Armazenamento e Backup',
    shortDescription: 'Como manter seus arquivos de aula, projetos e documentos do setor sempre seguros e sincronizados no Google Workspace / Drive Institucional.',
    fullDescription: 'O IFFar fornece contas corporativas com armazenamento em nuvem de alta capacidade. Aprenda a configurar a sincronização contínua para nunca perder seus trabalhos ou documentos do setor.',
    badge: 'Recomendado pela PSI',
    targetAudience: 'Estudantes e Servidores',
    estimatedTime: '5 minutos',
    relatedPopCode: 'POP-CTI-04',
    importantNotice: 'A CTI não se responsabiliza por arquivos salvos apenas no disco local da máquina ou pendrives. Mantenha sempre cópia na Nuvem Institucional!',
    sensitiveParameters: [
      {
        label: 'Repositório de Nuvem',
        value: 'Google Drive Institucional (@iffarroupilha.edu.br)',
        description: 'Acesso via navegador ou aplicativo desktop.',
      },
      {
        label: 'Link de Acesso Web',
        value: 'https://drive.google.com',
        description: 'Faça login com seu e-mail institucional completo.',
        copyable: true,
      },
      {
        label: 'Retenção de Arquivos em Manutenção',
        value: '30 dias corridos no NAS temporário',
        description: 'Prazo limite após o qual a CTI realiza o expurgo automático dos arquivos temporários de suporte.',
      },
    ],
    guides: [
      {
        osId: 'windows',
        osName: 'Windows - Google Drive para Desktop',
        osIcon: 'Cloud',
        badgeText: 'Sincronização Automática',
        description: 'Configure o aplicativo para espelhar suas pastas "Documentos" e "Área de Trabalho" em tempo real.',
        steps: [
          {
            stepNumber: 1,
            title: 'Faça login na sua conta institucional',
            description: 'Abra seu navegador e acesse drive.google.com logando com seu e-mail @iffarroupilha.edu.br ou @aluno.iffar.edu.br.',
          },
          {
            stepNumber: 2,
            title: 'Baixe o Google Drive para Desktop',
            description: 'Clique no ícone de engrenagem no Drive web e selecione "Fazer o download do Drive para computador" (ou solicite instalação à CTI via GLPI).',
          },
          {
            stepNumber: 3,
            title: 'Selecione as pastas para backup contínuo',
            description: 'Nas preferências do aplicativo, adicione as pastas "Documentos" e "Projetos". Todo arquivo salvo nelas será enviado para a nuvem automaticamente.',
          },
          {
            stepNumber: 4,
            title: 'Acesse seus arquivos de qualquer lugar',
            description: 'Seu computador formatado ou seu celular terá acesso imediato a todas as versões de seus documentos.',
          },
        ],
        troubleshooting: [
          {
            issue: 'O ícone do Drive está com uma exclamação ou não sincroniza.',
            resolution: 'Verifique se sua conta foi deslogada por expiração de senha. Clique no ícone do Drive perto do relógio e faça login novamente.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Quanto tempo meus arquivos ficam guardados no computador após a manutenção da CTI?',
        answer: 'A CTI mantém cópia temporária no Storage NAS pelo prazo estrito de 30 dias para segurança. Após 30 dias, os dados são excluídos definitivamente por rotina automática.',
      },
      {
        question: 'Posso guardar fotos e vídeos pessoais no Drive institucional?',
        answer: 'A PSI do IFFar determina que a conta institucional deve ser utilizada prioritariamente para fins acadêmicos, de pesquisa, extensão e administrativos.',
      },
    ],
  },
  {
    id: 'tut-glpi',
    slug: 'abertura-chamados-glpi',
    title: 'Como Abrir e Acompanhar Chamados de TI no GLPI',
    category: 'Suporte e Chamados',
    shortDescription: 'Passo a passo para registrar solicitações de manutenção, conserto de computadores, instalação de programas e apoio a eventos.',
    fullDescription: 'O GLPI é o canal único e obrigatório de atendimento da Coordenação de TI. Todas as demandas passam por registro formal para garantir prazos de SLA e transparência.',
    badge: 'Canal Oficial',
    targetAudience: 'Estudantes e Servidores',
    estimatedTime: '3 minutos',
    relatedPopCode: 'POP-CTI-01',
    importantNotice: 'Não envie pedidos de suporte por WhatsApp particular ou e-mail individual de técnicos. O atendimento só inicia após a emissão do número de chamado no GLPI!',
    sensitiveParameters: [
      {
        label: 'Endereço do Portal GLPI',
        value: 'https://glpi.iffarroupilha.edu.br',
        description: 'Portal de Helpdesk Oficial do IFFar.',
        copyable: true,
      },
      {
        label: 'Prazo Médio de Triagem (N1)',
        value: 'Até 2 horas úteis',
        description: 'Tempo para a equipe analisar e categorizar o chamado.',
      },
      {
        label: 'Prazo para Validação pelo Usuário',
        value: '48 horas corridas',
        description: 'Período após a resolução para você aprovar ou solicitar correções.',
      },
    ],
    guides: [
      {
        osId: 'windows',
        osName: 'Portal Web GLPI (Qualquer Navegador)',
        osIcon: 'Globe',
        badgeText: 'Navegador Web',
        description: 'Guia de abertura de chamado pelo computador ou smartphone.',
        steps: [
          {
            stepNumber: 1,
            title: 'Acesse o GLPI Institucional',
            description: 'Digite https://glpi.iffarroupilha.edu.br na barra de endereços.',
            fieldLabel: 'URL GLPI',
            fieldValue: 'https://glpi.iffarroupilha.edu.br',
          },
          {
            stepNumber: 2,
            title: 'Faça Login com suas Credenciais',
            description: 'Insira seu login e senha do SIG / Domínio Institucional.',
          },
          {
            stepNumber: 3,
            title: 'Clique em "Criar um Chamado"',
            description: 'Selecione o tipo de ocorrência (Incidente se algo quebrou/parou de funcionar, ou Requisição se deseja um novo serviço/programa).',
          },
          {
            stepNumber: 4,
            title: 'Descreva a Solicitação com Detalhes',
            description: 'Informe o Bloco, Sala, Número de Patrimônio do Computador e uma descrição clara do que está ocorrendo.',
            tip: 'Se possível, anexe uma foto ou print da mensagem de erro.',
          },
          {
            stepNumber: 5,
            title: 'Acompanhe por E-mail e Valide em 48h',
            description: 'A cada movimentação do técnico você receberá um e-mail. Quando finalizado, você tem 48h para testar e aprovar a solução.',
          },
        ],
        troubleshooting: [
          {
            issue: 'Não consigo logar no GLPI.',
            resolution: 'Dirija-se ao balcão da CTI para uma abertura assistida ou redefina sua senha no SIGAA.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'O que é a Abertura Assistida no Balcão da CTI?',
        answer: 'Se você estiver sem acesso ao sistema ou tiver dúvidas, pode ir até a CTI e o atendente de triagem abrirá o chamado junto com você na hora.',
      },
      {
        question: 'O que acontece se eu não responder à validação em 48h?',
        answer: 'O sistema considera que o problema foi solucionado com sucesso e encerra o chamado automaticamente.',
      },
    ],
  },
];
