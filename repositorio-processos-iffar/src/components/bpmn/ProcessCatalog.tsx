import React, { useState } from 'react';
import { Network, Filter, ArrowRight, FileText } from 'lucide-react';
import { mockProcesses } from '../../data/processes';
import { ProcessDocument } from '../../types/process';
import { BpmnViewer } from './BpmnViewer';
import { BpmnSidebar } from './BpmnSidebar';
import { Badge } from '../common/Badge';

interface ProcessCatalogProps {
  initialProcessCode?: string;
  onOpenPop: (processCode: string) => void;
}

export const ProcessCatalog: React.FC<ProcessCatalogProps> = ({
  initialProcessCode = 'POP-CTI-01',
  onOpenPop,
}) => {
  const [selectedCode, setSelectedCode] = useState<string>(initialProcessCode);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Processos' },
    { id: 'suporte', label: 'Suporte & Chamados' },
    { id: 'infraestrutura', label: 'Infraestrutura' },
    { id: 'laboratorios', label: 'Laboratórios' },
    { id: 'seguranca', label: 'Segurança & Dados' },
    { id: 'redes', label: 'Redes & Wi-Fi' },
  ];

  const filteredProcesses = mockProcesses.filter((p) => {
    if (selectedCategory === 'todos') return true;
    return p.category === selectedCategory;
  });

  const currentProcess: ProcessDocument =
    mockProcesses.find((p) => p.code === selectedCode) || mockProcesses[0];

  return (
    <div className="space-y-8">
      {/* Header with Title and Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-iffar-green uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" /> Módulo 1 • Engenharia de Processos
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Catálogo de Processos & Modelagem BPMN 2.0
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Visualização comparativa entre o Estado Atual (<em>AS-IS</em>) e o Estado Proposto (<em>TO-BE</em>) com rastreamento de raias e gargalos.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-iffar-green text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Process Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {filteredProcesses.map((proc) => {
          const isSelected = proc.code === currentProcess.code;
          return (
            <button
              key={proc.id}
              onClick={() => setSelectedCode(proc.code)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-iffar-green ring-2 ring-iffar-green/20 shadow-md -translate-y-0.5'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant={isSelected ? 'green' : 'slate'} size="sm">
                    {proc.code}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono">v{proc.version}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                  {proc.title}
                </h4>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span className="truncate">{proc.macroProcess.split(' ')[0]}...</span>
                <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-iffar-green' : 'text-slate-300'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Process Details Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="green" size="md">
              {currentProcess.code}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              Macroprocesso: {currentProcess.macroProcess}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Público-Alvo: <strong>{currentProcess.targetAudience}</strong>
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">{currentProcess.title}</h3>
          <p className="text-xs text-slate-600">{currentProcess.subtitle}</p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onOpenPop(currentProcess.code)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Abrir POP Completo</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column BPMN Workspace: Left Diagram Viewer / Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <BpmnViewer processCode={currentProcess.code} bpmn={currentProcess.bpmn} />

          {/* Process Objective and Scope Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
              Objetivos do Processo Modelado
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentProcess.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-iffar-green flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <BpmnSidebar process={currentProcess} onOpenPop={onOpenPop} />
        </div>
      </div>
    </div>
  );
};
