import React, { useState } from 'react';
import { AlertCircle, Copy, Check, ShieldCheck } from 'lucide-react';
import { SensitiveParameter } from '../../types/tutorial';

interface SensitiveAlertProps {
  parameters: SensitiveParameter[];
  title?: string;
  notice?: string;
}

export const SensitiveAlert: React.FC<SensitiveAlertProps> = ({
  parameters,
  title = 'Parâmetros Críticos de Configuração',
  notice,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-sm sm:text-base text-amber-950">{title}</h4>
          {notice && (
            <p className="text-xs text-amber-900 leading-relaxed font-medium">{notice}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {parameters.map((param) => {
          const isCopied = copiedKey === param.label;
          return (
            <div
              key={param.label}
              className="bg-white/95 p-3.5 rounded-xl border border-amber-200/90 shadow-2xs space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  {param.label}
                </span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {param.value}
                  </span>
                  {param.copyable && (
                    <button
                      onClick={() => copyToClipboard(param.value, param.label)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors shrink-0 cursor-pointer"
                      title={`Copiar ${param.label}`}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight pt-1">
                {param.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
