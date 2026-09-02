export interface InstitutionalMetrics {
  totalUsers: number;
  totalUsersLabel: string;
  totalComputers: number;
  totalComputersLabel: string;
  macroProcessesCount: number;
  activeLaboratories: number;
  activeLaboratoriesLabel: string;
  avgSlaReduction: string;
  monthlyTicketsCount: number;
  wifiAccessPoints: number;
  quickStats: {
    label: string;
    value: string;
    description: string;
    icon: string;
  }[];
}

export const institutionalMetrics: InstitutionalMetrics = {
  totalUsers: 1310,
  totalUsersLabel: '1.310 Usuários Atendidos',
  totalComputers: 400,
  totalComputersLabel: '~400 Estações Gerenciadas',
  macroProcessesCount: 5,
  activeLaboratories: 7,
  activeLaboratoriesLabel: '7 Laboratórios de Informática',
  avgSlaReduction: '65%',
  monthlyTicketsCount: 380,
  wifiAccessPoints: 48,
  quickStats: [
    {
      label: 'Usuários Ativos',
      value: '1.310+',
      description: 'Discentes, docentes, técnicos e terceirizados no campus',
      icon: 'Users',
    },
    {
      label: 'Parque de Máquinas',
      value: '~400',
      description: 'Estações administrativas e em laboratórios acadêmicos',
      icon: 'Monitor',
    },
    {
      label: 'Macroprocessos TI',
      value: '5 POPs',
      description: 'Modelados em BPMN 2.0 (AS-IS e TO-BE)',
      icon: 'GitPullRequest',
    },
    {
      label: 'Disponibilidade de Labs',
      value: '100%',
      description: 'Garantida via Protocolo de Reserva Técnica Imediata',
      icon: 'ShieldCheck',
    },
    {
      label: 'Chamados Centralizados',
      value: '100% GLPI',
      description: 'Canal único formal com eliminação de perda de solicitações',
      icon: 'Layers',
    },
    {
      label: 'Autosserviço Wi-Fi',
      value: 'QR Code',
      description: 'Acesso autônomo sem retenção de dispositivos pela CTI',
      icon: 'Wifi',
    },
  ],
};
