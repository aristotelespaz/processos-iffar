export type ProcessCode = 'POP-CTI-01' | 'POP-CTI-02' | 'POP-CTI-03' | 'POP-CTI-04' | 'POP-CTI-05';

export type ProcessCategory = 'suporte' | 'infraestrutura' | 'seguranca' | 'redes' | 'laboratorios';

export interface Swimlane {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  color: string;
}

export interface BottleneckItem {
  id: string;
  phase: string;
  asIsProblem: string;
  impact: 'Alto' | 'Médio' | 'Crítico';
  toBeSolution: string;
  gainDescription: string;
}

export interface ChecklistItem {
  id: string;
  category?: string;
  label: string;
  description: string;
  critical?: boolean;
  helpText?: string;
}

export interface TechnicalParameter {
  parameter: string;
  value: string;
  scope: string;
  notes?: string;
}

export interface BpmnStep {
  id: string;
  name: string;
  type: 'start' | 'task' | 'userTask' | 'serviceTask' | 'gateway' | 'end';
  lane: string;
  description: string;
  isBottleneckInAsIs?: boolean;
  bottleneckReason?: string;
  isImprovementInToBe?: boolean;
  improvementGain?: string;
}

export interface BpmnModel {
  title: string;
  asIsDescription: string;
  toBeDescription: string;
  lanes: Swimlane[];
  bottlenecks: BottleneckItem[];
  improvementsSummary: string[];
  asIsDiagram: string; // SVG markup or structure
  toBeDiagram: string; // SVG markup or structure
  asIsImage?: string; // Caminho ou data URL da imagem oficial AS-IS (Bizagi)
  toBeImage?: string; // Caminho ou data URL da imagem oficial TO-BE (Bizagi)
  keyMetrics: {
    asIsLeadTime: string;
    toBeLeadTime: string;
    reductionPercent: string;
    slaCompliance: string;
  };
}

export interface ProcessDocument {
  id: string;
  code: ProcessCode;
  macroProcess: string;
  title: string;
  subtitle: string;
  category: ProcessCategory;
  version: string;
  effectiveDate: string;
  lastReviewDate: string;
  nextReviewDate: string;
  targetAudience: 'Ambos' | 'Comunidade Acadêmica' | 'Equipe CTI';
  responsibles: {
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    n1Execution: string;
    n2Execution: string;
  };
  summary: string;
  objectives: string[];
  applicationField: string;
  prerequisites: string[];
  normativeReferences: string[];
  bpmn: BpmnModel;
  checklist: ChecklistItem[];
  parameters: TechnicalParameter[];
  securityNotes: string[];
  relatedProcesses: string[];
  tags: string[];
}
