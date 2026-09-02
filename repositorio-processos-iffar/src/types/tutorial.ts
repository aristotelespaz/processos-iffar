import { ProcessCode } from './process';

export type OperatingSystemId = 'android' | 'ios' | 'windows' | 'linux' | 'macos';

export interface SensitiveParameter {
  label: string;
  value: string;
  description: string;
  isSensitive?: boolean;
  copyable?: boolean;
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  fieldValue?: string;
  fieldLabel?: string;
  warning?: string;
  tip?: string;
  illustrationType?: 'wifi-setup' | 'cloud-backup' | 'glpi-ticket' | 'network-cert';
}

export interface OsTutorialGuide {
  osId: OperatingSystemId;
  osName: string;
  osIcon: string;
  badgeText?: string;
  description: string;
  steps: TutorialStep[];
  troubleshooting: { issue: string; resolution: string }[];
}

export interface SelfServiceTutorial {
  id: string;
  slug: string;
  title: string;
  category: 'Rede e Conectividade' | 'Armazenamento e Backup' | 'Suporte e Chamados' | 'Acesso a Sistemas';
  shortDescription: string;
  fullDescription: string;
  badge: string;
  targetAudience: 'Estudantes e Servidores' | 'Apenas Discentes' | 'Apenas Servidores';
  estimatedTime: string;
  relatedPopCode: ProcessCode;
  sensitiveParameters: SensitiveParameter[];
  guides: OsTutorialGuide[];
  faqs: { question: string; answer: string }[];
  importantNotice: string;
}
