import React, { useState, useMemo } from 'react';
import { Search, FileText, Network, Smartphone, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { mockProcesses } from '../../data/processes';
import { mockTutorials } from '../../data/tutorials';
import { Badge } from '../common/Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProcess: (processCode: string, view: 'bpmn' | 'pop') => void;
  onSelectTutorial: (tutorialId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProcess,
  onSelectTutorial,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { processes: [], tutorials: [] };

    const matchedProcesses = mockProcesses.filter((p) => {
      const inCode = p.code.toLowerCase().includes(q);
      const inTitle = p.title.toLowerCase().includes(q);
      const inSubtitle = p.subtitle.toLowerCase().includes(q);
      const inSummary = p.summary.toLowerCase().includes(q);
      const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const inChecklist = p.checklist.some((c) => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
      const inParams = p.parameters.some((param) => param.parameter.toLowerCase().includes(q) || param.value.toLowerCase().includes(q));
      return inCode || inTitle || inSubtitle || inSummary || inTags || inChecklist || inParams;
    });

    const matchedTutorials = mockTutorials.filter((tut) => {
      const inTitle = tut.title.toLowerCase().includes(q);
      const inDesc = tut.shortDescription.toLowerCase().includes(q) || tut.fullDescription.toLowerCase().includes(q);
      const inParams = tut.sensitiveParameters.some((param) => param.label.toLowerCase().includes(q) || param.value.toLowerCase().includes(q));
      return inTitle || inDesc || inParams;
    });

    return { processes: matchedProcesses, tutorials: matchedTutorials };
  }, [query]);

  const totalResults = searchResults.processes.length + searchResults.tutorials.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Busca Rápida no Repositório"
      subtitle="Pesquise por termos técnicos, códigos de POP, tutoriais ou parâmetros de rede"
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: GLPI, Wi-Fi, Android 11, Domínio, Backup, Formatação, Reserva Técnica..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:bg-white focus:border-iffar-green focus:ring-2 focus:ring-iffar-green/20 outline-none transition-all"
          />
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Termos Frequentes:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Wi-Fi Estudantes',
                'GLPI Chamados',
                'POP-CTI-02',
                'Domínio iffarroupilha.edu.br',
                'Reserva Técnica',
                'Disk Wipe',
                'WPA2-Enterprise',
                'Active Directory',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            <div className="text-xs font-medium text-slate-500">
              Encontrados {totalResults} resultado(s) para "{query}":
            </div>

            {totalResults === 0 && (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm">Nenhum procedimento ou tutorial encontrado com esse termo.</p>
                <p className="text-xs mt-1 text-slate-400">Tente buscar por palavras-chave como "Wi-Fi", "GLPI", "Backup" ou códigos como "POP-01".</p>
              </div>
            )}

            {/* Processes Results */}
            {searchResults.processes.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-iffar-green" />
                  Procedimentos Operacionais (POPs & BPMN)
                </div>
                {searchResults.processes.map((proc) => (
                  <div
                    key={proc.id}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="green" size="sm">
                          {proc.code}
                        </Badge>
                        <span className="font-bold text-slate-900 text-sm">{proc.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{proc.summary}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onSelectProcess(proc.code, 'bpmn');
                          onClose();
                        }}
                        className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Network className="w-3.5 h-3.5 text-emerald-600" /> BPMN
                      </button>
                      <button
                        onClick={() => {
                          onSelectProcess(proc.code, 'pop');
                          onClose();
                        }}
                        className="px-2.5 py-1.5 bg-iffar-green hover:bg-iffar-green-700 text-white text-xs font-medium rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" /> Ver POP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tutorials Results */}
            {searchResults.tutorials.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                  Tutoriais de Autosserviço (Mobile / QR Code)
                </div>
                {searchResults.tutorials.map((tut) => (
                  <div
                    key={tut.id}
                    onClick={() => {
                      onSelectTutorial(tut.id);
                      onClose();
                    }}
                    className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="blue" size="sm">
                          {tut.category}
                        </Badge>
                        <span className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                          {tut.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{tut.shortDescription}</p>
                    </div>
                    <div className="text-blue-600 shrink-0 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
