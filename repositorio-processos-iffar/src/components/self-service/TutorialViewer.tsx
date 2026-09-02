import React, { useState } from 'react';
import {
  Smartphone,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  ShieldAlert,
  ArrowLeft,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { SelfServiceTutorial, OperatingSystemId } from '../../types/tutorial';
import { SensitiveAlert } from './SensitiveAlert';
import { Badge } from '../common/Badge';
import { useCampus } from '../../context/CampusContext';

interface TutorialViewerProps {
  tutorial: SelfServiceTutorial;
  onBackToCatalog: () => void;
  onOpenPop: (processCode: string) => void;
}

export const TutorialViewer: React.FC<TutorialViewerProps> = ({
  tutorial,
  onBackToCatalog,
  onOpenPop,
}) => {
  const { currentCampus } = useCampus();
  const [activeOs, setActiveOs] = useState<OperatingSystemId>(tutorial.guides[0]?.osId || 'android');
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const currentGuide =
    tutorial.guides.find((g) => g.osId === activeOs) || tutorial.guides[0];

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Back button & Category */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Central de Autosserviço</span>
        </button>
        <Badge variant="blue" size="sm">
          {tutorial.category}
        </Badge>
      </div>

      {/* Tutorial Header Card (Mobile-First) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
          <Badge variant="green" size="sm">
            {tutorial.badge}
          </Badge>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {tutorial.estimatedTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> {tutorial.targetAudience}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {tutorial.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          {tutorial.fullDescription}
        </p>

        {/* Action Link to POP */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
          <span className="text-slate-500">
            Regulado pelo Procedimento Operacional <strong>{tutorial.relatedPopCode}</strong>
          </span>
          <button
            onClick={() => onOpenPop(tutorial.relatedPopCode)}
            className="text-iffar-green hover:underline font-bold cursor-pointer"
          >
            Ver POP Técnico →
          </button>
        </div>
      </div>

      {/* Sensitive Parameters Box (Dominio, WPA2, etc.) */}
      {tutorial.sensitiveParameters.length > 0 && (
        <SensitiveAlert
          parameters={tutorial.sensitiveParameters}
          notice={tutorial.importantNotice}
        />
      )}

      {/* OS Selector Tabs (Android, iOS, Windows) */}
      {tutorial.guides.length > 1 && (
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Selecione o Sistema Operacional do seu Aparelho:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {tutorial.guides.map((guide) => {
              const isSelected = guide.osId === activeOs;
              return (
                <button
                  key={guide.osId}
                  onClick={() => {
                    setActiveOs(guide.osId);
                    setCompletedSteps({});
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-iffar-green text-white border-iffar-green shadow-md -translate-y-0.5'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {guide.osId === 'windows' ? (
                        <Laptop className="w-5 h-5" />
                      ) : (
                        <Smartphone className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs">{guide.osName.split('(')[0]}</div>
                      <div
                        className={`text-[10px] ${
                          isSelected ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                      >
                        {guide.badgeText || 'Passo a Passo'}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Guide Steps Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900">{currentGuide.osName}</h3>
          <p className="text-xs text-slate-500 mt-1">{currentGuide.description}</p>
        </div>

        {/* Step-by-Step List */}
        <div className="space-y-4">
          {currentGuide.steps.map((step) => {
            const isCompleted = !!completedSteps[step.stepNumber];
            return (
              <div
                key={step.stepNumber}
                className={`p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-slate-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Badge / Check */}
                  <button
                    onClick={() => toggleStepCompleted(step.stepNumber)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-iffar-green text-white shadow-sm'
                        : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-iffar-green'
                    }`}
                    title="Marcar passo como concluído"
                  >
                    {isCompleted ? '✓' : step.stepNumber}
                  </button>

                  {/* Step Description & Field highlight */}
                  <div className="space-y-2 flex-1">
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Highlighted Value Box (if any) */}
                    {step.fieldValue && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 inline-block text-xs">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">
                          {step.fieldLabel || 'Valor a preencher'}:
                        </span>
                        <code className="text-emerald-700 font-mono font-bold text-sm">
                          {step.fieldValue}
                        </code>
                      </div>
                    )}

                    {/* Step Warning */}
                    {step.warning && (
                      <div className="p-3 bg-red-50 text-red-900 border border-red-200 rounded-xl text-xs flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-iffar-red shrink-0 mt-0.5" />
                        <span>{step.warning}</span>
                      </div>
                    )}

                    {/* Step Tip */}
                    {step.tip && (
                      <div className="p-3 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Troubleshooting (Problemas Comuns) */}
        {currentGuide.troubleshooting && currentGuide.troubleshooting.length > 0 && (
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Problemas Frequentes & Como Resolver
            </h4>
            <div className="space-y-2.5">
              {currentGuide.troubleshooting.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 text-xs space-y-1"
                >
                  <strong className="text-amber-950 block font-bold">{item.issue}</strong>
                  <p className="text-amber-900 leading-relaxed">{item.resolution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FAQs Accordion */}
      {tutorial.faqs && tutorial.faqs.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Perguntas Frequentes (FAQ)
          </h3>
          <div className="space-y-2">
            {tutorial.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTI Assisted Support Callout */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-base text-emerald-300">
            Ainda precisa de ajuda presencial?
          </h4>
          <p className="text-xs text-slate-300">
            Visite a CTI do {currentCampus.name} para <strong>Atendimento Assistido</strong>. Nossos técnicos guiarão você passo a passo.
          </p>
        </div>
        <a
          href={currentCampus.glpiHelpdeskUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-iffar-green hover:bg-iffar-green-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shrink-0 shadow transition-colors"
        >
          <span>Abrir Chamado GLPI</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
