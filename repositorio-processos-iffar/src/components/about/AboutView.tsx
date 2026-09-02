import React from 'react';
import {
  Info,
  GitFork,
  Shield,
  Layers,
  Code2,
  CheckCircle2,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { Badge } from '../common/Badge';

export const AboutView: React.FC = () => {
  const { currentCampus } = useCampus();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-iffar-green text-xs font-semibold">
          <Info className="w-4 h-4" /> Trabalho de Conclusão de Curso (TCC) • CTI IFFar
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Sobre o Repositório Digital de Processos de TI
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          O <strong>Repositório Digital de Processos de TI</strong> é uma plataforma acadêmica e operacional desenvolvida para a <strong>Coordenação de Tecnologia da Informação (CTI) do IFFar Campus Frederico Westphalen</strong>, com o propósito de solucionar gargalos históricos de suporte, padronizar rotinas técnicas e oferecer autosserviço com QR Code para servidores e discentes.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="p-3 bg-emerald-50 text-iffar-green rounded-xl w-fit">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Modelagem BPMN 2.0</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Representação formal dos processos em notação OMG BPMN 2.0, mapeando o estado anterior (<em>AS-IS</em> com gargalos) e o estado proposto (<em>TO-BE</em> otimizado).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Conformidade com a PSI</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Alinhamento estrito à Política de Segurança da Informação do IFFar (Resolução CONSUP nº 042/2018), LGPD e boas práticas de governança do SISP/SGD.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit">
            <GitFork className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Replicabilidade Multi-Campus</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Arquitetura desacoplada (<code className="font-mono text-emerald-700">campus-config.json</code>) que permite que qualquer campus da Rede Federal faça fork e customize sua CTI em minutos.
          </p>
        </div>
      </div>

      {/* TCC Process Highlights */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Os 5 Macroprocessos Modelados no Estudo de Caso
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Badge variant="green" size="sm">POP-CTI-01</Badge>
            <div>
              <strong className="text-slate-900 block text-sm">Atendimento de Chamados e Suporte ao Usuário</strong>
              <p className="text-slate-600 mt-0.5">Canal único 100% GLPI, triagem N1 com rodízio de técnicos no N2 e fechamento após validação do usuário em 48 horas.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Badge variant="green" size="sm">POP-CTI-02</Badge>
            <div>
              <strong className="text-slate-900 block text-sm">Formatação e Preparação de Estações de Trabalho</strong>
              <p className="text-slate-600 mt-0.5">Checklist obrigatório de liberação: Usuário Padrão restrito, Admin CTI no cofre, ingresso no AD `iffar.local` e agente GLPI.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Badge variant="green" size="sm">POP-CTI-03</Badge>
            <div>
              <strong className="text-slate-900 block text-sm">Manutenção Preventiva e Corretiva dos Laboratórios</strong>
              <p className="text-slate-600 mt-0.5">Protocolo de Reserva Técnica Imediata (100% de vagas ativas em aula), proteção contra umidade e cronograma semestral.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Badge variant="green" size="sm">POP-CTI-04</Badge>
            <div>
              <strong className="text-slate-900 block text-sm">Procedimento de Backup e Segurança das Estações</strong>
              <p className="text-slate-600 mt-0.5">Nuvem corporativa primária, expurgo automático de 30 dias no NAS de manutenção e sanitização magnética (*Disk Wipe*).</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Badge variant="green" size="sm">POP-CTI-05</Badge>
            <div>
              <strong className="text-slate-900 block text-sm">Configuração e Suporte à Rede Wi-Fi Estudantes</strong>
              <p className="text-slate-600 mt-0.5">Autosserviço via QR Code, parâmetros WPA2-Enterprise / PEAP / MSCHAPv2 / Domínio Android e atendimento assistido.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Code2 className="w-4 h-4" /> Especificações Técnicas de Engenharia
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Frontend:</span>
            <strong className="text-white">React 18 + Vite + TS</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Estilização:</span>
            <strong className="text-white">Tailwind CSS (Paleta IFFar)</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Notação:</span>
            <strong className="text-white">SVG BPMN 2.0 Interativo</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Exportação:</span>
            <strong className="text-white">CSS @media print A4</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
