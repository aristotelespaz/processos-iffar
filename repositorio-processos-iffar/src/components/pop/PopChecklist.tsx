import React, { useState, useEffect } from 'react';
import { CheckSquare, RotateCcw, ShieldCheck, AlertCircle } from 'lucide-react';
import { ChecklistItem } from '../../types/process';
import { Badge } from '../common/Badge';

interface PopChecklistProps {
  processCode: string;
  items: ChecklistItem[];
}

export const PopChecklist: React.FC<PopChecklistProps> = ({ processCode, items }) => {
  const storageKey = `iffar_checklist_${processCode}`;

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setCheckedIds(saved ? JSON.parse(saved) : {});
    } catch {
      setCheckedIds({});
    }
  }, [processCode, storageKey]);

  const toggleItem = (id: string) => {
    const next = { ...checkedIds, [id]: !checkedIds[id] };
    setCheckedIds(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const handleReset = () => {
    if (window.confirm('Deseja realmente limpar todas as marcações deste checklist?')) {
      setCheckedIds({});
      localStorage.removeItem(storageKey);
    }
  };

  const completedCount = items.filter((item) => checkedIds[item.id]).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllDone = totalCount > 0 && completedCount === totalCount;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-iffar-green" />
              Checklist Interativo de Liberação e Execução
            </h4>
            <Badge variant={isAllDone ? 'green' : 'blue'} size="sm">
              {completedCount}/{totalCount} Itens Concluídos
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Marque as etapas conforme executa o procedimento na bancada ou no atendimento. O progresso é salvo no navegador.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer self-start sm:self-auto print:hidden"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-1.5 print:hidden">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-600">Conformidade Operacional:</span>
          <span className={isAllDone ? 'text-iffar-green font-bold' : 'text-slate-700'}>
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isAllDone ? 'bg-iffar-green' : 'bg-emerald-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const isChecked = !!checkedIds[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-400/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              {/* Checkbox Icon */}
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isChecked
                    ? 'bg-iffar-green border-iffar-green text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isChecked && <span className="text-xs font-bold">✓</span>}
              </div>

              {/* Content */}
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-slate-400 font-bold">#{idx + 1}</span>
                  {item.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  )}
                  <span
                    className={`text-sm font-bold ${
                      isChecked ? 'text-slate-800 line-through opacity-80' : 'text-slate-900'
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.critical && (
                    <Badge variant="red" size="sm" className="ml-auto">
                      <AlertCircle className="w-3 h-3 mr-1" /> Crítico PSI
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                {item.helpText && (
                  <div className="mt-1.5 p-2 rounded-lg bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-1.5">
                    <span className="font-bold">Dica CTI:</span>
                    <span>{item.helpText}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isAllDone && (
        <div className="p-4 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-iffar-green shrink-0" />
          <div className="text-xs">
            <strong className="block font-bold text-sm">
              Procedimento Homologado com Sucesso!
            </strong>
            <span>
              Todos os itens de conformidade e segurança da PSI foram validados para este procedimento.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
