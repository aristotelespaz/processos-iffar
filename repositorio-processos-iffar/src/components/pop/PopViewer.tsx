import React, { useState } from 'react';
import {
  FileText,
  Printer,
  QrCode,
  Shield,
  Clock,
  UserCheck,
  CheckCircle,
  Network,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import { mockProcesses } from '../../data/processes';
import { ProcessDocument } from '../../types/process';
import { PopChecklist } from './PopChecklist';
import { PopTable } from './PopTable';
import { PosterModal } from './PosterModal';
import { Badge } from '../common/Badge';
import { useCampus } from '../../context/CampusContext';

interface PopViewerProps {
  initialProcessCode?: string;
  onNavigateToBpmn: (processCode: string) => void;
}

export const PopViewer: React.FC<PopViewerProps> = ({
  initialProcessCode = 'POP-CTI-01',
  onNavigateToBpmn,
}) => {
  const { currentCampus } = useCampus();
  const [selectedCode, setSelectedCode] = useState<string>(initialProcessCode);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState<boolean>(false);

  const currentProcess: ProcessDocument =
    mockProcesses.find((p) => p.code === selectedCode) || mockProcesses[0];

  const handlePrintPop = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Poster Modal */}
      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
        process={currentProcess}
      />

      {/* Top Header & POP Selector Bar (Hidden on Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-iffar-green uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" /> Módulo 2 • Procedimentos Operacionais Padrão
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Visualizador Oficial de POPs Técnicos
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Manuais técnicos com checklists de liberação em tempo de execução e conformidade com a PSI do IFFar.
          </p>
        </div>

        {/* Action Buttons: Print PDF & Poster */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsPosterModalOpen(true)}
            className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-emerald-600" />
            <span>Gerar Cartaz Mural</span>
          </button>
          <button
            onClick={handlePrintPop}
            className="px-4 py-2.5 bg-iffar-green hover:bg-iffar-green-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir POP (PDF A4)</span>
          </button>
        </div>
      </div>

      {/* Process Tabs Navigation (Hidden on Print) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 print:hidden">
        {mockProcesses.map((proc) => {
          const isSelected = proc.code === currentProcess.code;
          return (
            <button
              key={proc.id}
              onClick={() => setSelectedCode(proc.code)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-iffar-green text-white border-iffar-green shadow-md font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={isSelected ? 'text-emerald-100' : 'text-slate-400'}>
                  {proc.code}
                </span>
                <span className="text-[10px] font-mono opacity-80">v{proc.version}</span>
              </div>
              <div className="text-xs truncate">{proc.title}</div>
            </button>
          );
        })}
      </div>

      {/* OFFICIAL FORMAL POP DOCUMENT CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Document Formal Header (Print Layout Standard) */}
        <div className="border-2 border-slate-300 rounded-xl overflow-hidden print:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-300 bg-slate-50/70 p-4 items-center">
            {/* Institution Brand */}
            <div className="md:col-span-1 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-iffar-green flex items-center justify-center text-white font-bold text-base shrink-0">
                IF
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase text-slate-900 leading-tight">
                  {currentCampus.institution}
                </h4>
                <p className="text-[11px] text-iffar-green font-bold">{currentCampus.name}</p>
                <p className="text-[10px] text-slate-500">{currentCampus.ctiName}</p>
              </div>
            </div>

            {/* Document Title Center */}
            <div className="md:col-span-2 text-center py-2 md:py-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                Procedimento Operacional Padrão
              </span>
              <h1 className="text-base sm:text-lg font-black text-slate-900 uppercase">
                {currentProcess.title}
              </h1>
              <span className="text-xs font-semibold text-iffar-green">
                Macroprocesso: {currentProcess.macroProcess}
              </span>
            </div>

            {/* Control Codes & Dates */}
            <div className="md:col-span-1 text-right text-xs space-y-1 text-slate-600 font-mono">
              <div>
                <span className="text-slate-400">Código:</span> <strong>{currentProcess.code}</strong>
              </div>
              <div>
                <span className="text-slate-400">Versão:</span> <strong>{currentProcess.version}</strong>
              </div>
              <div>
                <span className="text-slate-400">Vigência:</span> {currentProcess.effectiveDate}
              </div>
              <div>
                <span className="text-slate-400">Revisão:</span> {currentProcess.nextReviewDate}
              </div>
            </div>
          </div>

          {/* Responsibilities Matrix Sub-Header */}
          <div className="border-t border-slate-300 bg-white p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Elaboração:</span>
              <span className="font-semibold">{currentProcess.responsibles.preparedBy}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Revisão Técnica:</span>
              <span className="font-semibold">{currentProcess.responsibles.reviewedBy}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Aprovação:</span>
              <span className="font-semibold">{currentProcess.responsibles.approvedBy}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Executores:</span>
              <span className="font-semibold">N1: {currentProcess.responsibles.n1Execution} • N2: {currentProcess.responsibles.n2Execution}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Summary & Objectives */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded bg-emerald-100 text-iffar-green font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
              Sumário Executivo e Objetivos
            </h3>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {currentProcess.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {currentProcess.objectives.map((obj, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200"
              >
                <CheckCircle className="w-4 h-4 text-iffar-green shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Application Field & Prerequisites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded bg-emerald-100 text-iffar-green font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                Campo de Aplicação
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
              {currentProcess.applicationField}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded bg-emerald-100 text-iffar-green font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                Pré-Requisitos Operacionais
              </h3>
            </div>
            <ul className="space-y-2 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
              {currentProcess.prerequisites.map((pre, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-iffar-green font-bold">•</span>
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Interactive Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-emerald-100 text-iffar-green font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
                Checklist Operacional de Liberação & Execução
              </h3>
            </div>
          </div>

          <PopChecklist processCode={currentProcess.code} items={currentProcess.checklist} />
        </div>

        {/* Section 4: Technical Parameters Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded bg-emerald-100 text-iffar-green font-bold text-xs flex items-center justify-center">
              5
            </span>
            <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
              Parâmetros Técnicos & Diretrizes Normativas
            </h3>
          </div>

          <PopTable parameters={currentProcess.parameters} />
        </div>

        {/* Section 5: Security & PSI Rules */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded bg-red-100 text-iffar-red font-bold text-xs flex items-center justify-center">
              6
            </span>
            <h3 className="font-bold text-base text-slate-900 uppercase tracking-wide">
              Regras de Segurança da Informação (PSI / LGPD)
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-red-50/60 border border-red-200/80 space-y-2.5">
            {currentProcess.securityNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-red-950">
                <AlertTriangle className="w-4 h-4 text-iffar-red shrink-0 mt-0.5" />
                <span className="leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Normative References & Related POPs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Referências Normativas
            </span>
            <ul className="text-xs text-slate-600 space-y-1">
              {currentProcess.normativeReferences.map((ref, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-slate-400">•</span>
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-blue-600" />
              POPs Relacionados & Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentProcess.relatedProcesses.map((rel) => (
                <button
                  key={rel}
                  onClick={() => setSelectedCode(rel)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  {rel}
                </button>
              ))}
              <button
                onClick={() => onNavigateToBpmn(currentProcess.code)}
                className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-iffar-green rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Network className="w-3 h-3" /> Ver Modelagem BPMN
              </button>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {currentProcess.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Official Signatures Section (Standard for Print & Auditing) */}
        <div className="pt-10 border-t-2 border-slate-300 grid grid-cols-3 gap-6 text-center text-xs text-slate-700">
          <div className="border-t border-slate-400 pt-2 space-y-1">
            <span className="font-bold block">{currentProcess.responsibles.preparedBy}</span>
            <span className="text-[10px] text-slate-500">Equipe de Elaboração</span>
          </div>
          <div className="border-t border-slate-400 pt-2 space-y-1">
            <span className="font-bold block">{currentProcess.responsibles.reviewedBy}</span>
            <span className="text-[10px] text-slate-500">Revisão Técnica</span>
          </div>
          <div className="border-t border-slate-400 pt-2 space-y-1">
            <span className="font-bold block">{currentProcess.responsibles.approvedBy}</span>
            <span className="text-[10px] text-slate-500">Coordenação CTI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
