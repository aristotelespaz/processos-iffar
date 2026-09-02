import React from 'react';
import { Sliders, Copy, Check } from 'lucide-react';
import { TechnicalParameter } from '../../types/process';

interface PopTableProps {
  parameters: TechnicalParameter[];
}

export const PopTable: React.FC<PopTableProps> = ({ parameters }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (val: string, idx: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-600" />
          Tabela de Parâmetros Técnicos & Regras de Negócio
        </h4>
        <span className="text-xs text-slate-400 font-mono">
          {parameters.length} parâmetros definidos
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Parâmetro / Requisito</th>
              <th className="px-4 py-3">Valor Homologado</th>
              <th className="px-4 py-3">Escopo de Aplicação</th>
              <th className="px-4 py-3">Observações Técnicas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {parameters.map((param, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">
                  {param.parameter}
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-iffar-green bg-emerald-50/30">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate max-w-[240px]">{param.value}</span>
                    <button
                      onClick={() => handleCopy(param.value, idx)}
                      className="p-1 hover:bg-white rounded text-slate-400 hover:text-slate-700 transition-colors shrink-0 print:hidden cursor-pointer"
                      title="Copiar valor"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                    {param.scope}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-[11px] leading-relaxed">
                  {param.notes || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
