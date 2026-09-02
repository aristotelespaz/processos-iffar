import React from 'react';
import {
  GraduationCap,
  Wrench,
  Wifi,
  Cloud,
  Headphones,
  GitPullRequest,
  FileCheck2,
  Printer,
  Shield,
  ArrowRight,
  QrCode,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { NavPage } from '../layout/Header';

interface AudienceHubProps {
  onNavigate: (page: NavPage, extraData?: string) => void;
  onOpenPosterModal?: (processCode: string) => void;
}

export const AudienceHub: React.FC<AudienceHubProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto space-y-1.5">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Portais de Acesso por Perfil de Usuário
        </h2>
        <p className="text-sm text-slate-600">
          Selecione seu perfil para acessar tutoriais de autosserviço ou a documentação técnica de engenharia de processos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PÚBLICO A: COMUNIDADE ACADÊMICA */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Público A: Comunidade Acadêmica
                </h3>
                <p className="text-xs text-slate-500">
                  Estudantes, Servidores Docentes e TAEs
                </p>
              </div>
            </div>
            <Badge variant="blue" size="sm">
              Autosserviço & Tutoriais
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1: Wi-Fi Estudantes */}
            <Card
              hoverable
              onClick={() => onNavigate('self-service', 'wifi-estudantes')}
              className="p-5 border-blue-100 hover:border-blue-300 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-iffar-green flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <Badge variant="green" size="sm">
                    <QrCode className="w-3 h-3 mr-1" /> QR Code
                  </Badge>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                    Wi-Fi Estudantes
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Guia de conexão rápida para Android 11+, iOS e Windows com parâmetros WPA2-Enterprise.
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Ver Tutorial Passo a Passo</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            {/* Card 2: Backup em Nuvem */}
            <Card
              hoverable
              onClick={() => onNavigate('self-service', 'backup-nuvem-corporativa')}
              className="p-5 border-blue-100 hover:border-blue-300 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <Badge variant="blue" size="sm">
                    Segurança
                  </Badge>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                    Backup em Nuvem IFFar
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Como sincronizar seus arquivos no Google Workspace institucional e prevenir perda de dados.
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Guia de Sincronização</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            {/* Card 3: Abertura GLPI */}
            <Card
              hoverable
              onClick={() => onNavigate('self-service', 'abertura-chamados-glpi')}
              className="p-5 border-blue-100 hover:border-blue-300 group flex flex-col justify-between sm:col-span-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                        Como Abrir Chamados no GLPI
                      </h4>
                      <Badge variant="amber" size="sm">Canal Único</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Aprenda a solicitar manutenção, anexar evidências, acompanhar o atendimento da CTI e validar a resolução em 48h.
                    </p>
                  </div>
                </div>
                <div className="p-1 text-blue-600 group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* PÚBLICO B: EQUIPE CTI / SUPORTE TÉCNICO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-iffar-green flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Público B: Equipe CTI / Suporte Técnico
                </h3>
                <p className="text-xs text-slate-500">
                  Técnicos, Bolsistas N1, Administradores e Coordenação
                </p>
              </div>
            </div>
            <Badge variant="green" size="sm">
              Engenharia de Processos
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1: Modelagem BPMN 2.0 */}
            <Card
              hoverable
              onClick={() => onNavigate('bpmn')}
              className="p-5 border-emerald-100 hover:border-emerald-300 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GitPullRequest className="w-5 h-5" />
                  </div>
                  <Badge variant="purple" size="sm">
                    AS-IS vs TO-BE
                  </Badge>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-iffar-green transition-colors">
                    Catálogo BPMN 2.0
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Diagramas interativos com zoom/pan, raias de responsabilidade e matriz de gargalos.
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-iffar-green group-hover:translate-x-1 transition-transform">
                <span>Explorar Modelagens</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            {/* Card 2: POPs Técnicos com Checklists */}
            <Card
              hoverable
              onClick={() => onNavigate('pops')}
              className="p-5 border-emerald-100 hover:border-emerald-300 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-iffar-green flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <Badge variant="green" size="sm">
                    5 POPs Oficiais
                  </Badge>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-iffar-green transition-colors">
                    POPs com Checklists
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Procedimentos operacionais com caixas de seleção interativas para auditoria de liberação.
                  </p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-iffar-green group-hover:translate-x-1 transition-transform">
                <span>Acessar POPs</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>

            {/* Card 3: Conformidade PSI & Impressão de Cartazes */}
            <Card
              hoverable
              onClick={() => onNavigate('pops', 'POP-CTI-05')}
              className="p-5 border-emerald-100 hover:border-emerald-300 group flex flex-col justify-between sm:col-span-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-iffar-green transition-colors">
                        Cartazes Murais & Exportação PDF A4
                      </h4>
                      <Badge variant="slate" size="sm">Pronto para Impressão</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Geração de cartazes com QR Codes para fixação em laboratórios e murais com visualização limpa sem menus.
                    </p>
                  </div>
                </div>
                <div className="p-1 text-iffar-green group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Trust & Quality Banner */}
      <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-iffar-green shrink-0" />
          <div>
            <span className="font-bold text-slate-900 block text-sm">
              Garantia de Qualidade & Conformidade com a PSI do IFFar
            </span>
            <span>
              Todos os procedimentos seguem a Resolução CONSUP nº 042/2018, LGPD e boas práticas ITIL/SISP.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-700 font-semibold shrink-0">
          <CheckCircle2 className="w-4 h-4 text-iffar-green" />
          <span>Processos Homologados 2026</span>
        </div>
      </div>
    </div>
  );
};
