import React from 'react';
import {
  Users,
  AlertTriangle,
  Sparkles,
  FileText,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { ProcessDocument } from '../../types/process';
import { Badge } from '../common/Badge';

interface BpmnSidebarProps {
  process: ProcessDocument;
  onOpenPop: (processCode: string) => void;
}

export const BpmnSidebar: React.FC<BpmnSidebarProps> = ({ process, onOpenPop }) => {
  const { bpmn } = process;

  return (
    <div className="space-y-6">
      {/* Action Box: Direct link to POP */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
            Execução Técnica
          </div>
          <p className="text-xs text-emerald-950 font-medium mt-0.5">
            Deseja executar o checklist operacional deste processo?
          </p>
        </div>
        <button
          onClick={() => onOpenPop(process.code)}
          className="px-3.5 py-2 bg-iffar-green hover:bg-iffar-green-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0 transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ver {process.code}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Swimlanes (Raias) Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Raias de Responsabilidade ({bpmn.lanes.length} Atores)
          </h4>
          <Badge variant="blue" size="sm">
            Swimlanes
          </Badge>
        </div>

        <div className="space-y-3">
          {bpmn.lanes.map((lane) => (
            <div
              key={lane.id}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{lane.name}</span>
                <span className="text-[11px] text-slate-500 font-medium">{lane.role}</span>
              </div>
              <ul className="space-y-1 pt-1">
                {lane.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottlenecks Matrix (AS-IS vs TO-BE) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-iffar-red" />
            Matriz de Gargalos & Soluções
          </h4>
          <Badge variant="red" size="sm">
            Diagnóstico
          </Badge>
        </div>

        <div className="space-y-3">
          {bpmn.bottlenecks.map((bot) => (
            <div
              key={bot.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{bot.phase}</span>
                <Badge
                  variant={bot.impact === 'Crítico' ? 'red' : 'amber'}
                  size="sm"
                >
                  {bot.impact}
                </Badge>
              </div>

              {/* AS-IS Problem */}
              <div className="p-2 rounded bg-red-50 text-red-900 border border-red-100 flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[10px] uppercase text-red-700 font-bold">
                    Problema (AS-IS):
                  </strong>
                  <span>{bot.asIsProblem}</span>
                </div>
              </div>

              {/* TO-BE Solution */}
              <div className="p-2 rounded bg-emerald-50 text-emerald-950 border border-emerald-100 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-iffar-green shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[10px] uppercase text-emerald-800 font-bold">
                    Solução Implantada (TO-BE):
                  </strong>
                  <span>{bot.toBeSolution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvements & Gains Summary */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          Ganhos e Melhorias Operacionais
        </h4>
        <ul className="space-y-2">
          {bpmn.improvementsSummary.map((imp, idx) => (
            <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
              <span className="text-iffar-green font-bold shrink-0">✓</span>
              <span>{imp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
