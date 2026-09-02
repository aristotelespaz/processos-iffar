import React, { useState } from 'react';
import { Smartphone, Wifi, Cloud, Headphones, QrCode, ArrowRight, Sparkles } from 'lucide-react';
import { mockTutorials } from '../../data/tutorials';
import { SelfServiceTutorial } from '../../types/tutorial';
import { TutorialViewer } from './TutorialViewer';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface SelfServiceHubProps {
  initialTutorialId?: string;
  onOpenPop: (processCode: string) => void;
}

export const SelfServiceHub: React.FC<SelfServiceHubProps> = ({
  initialTutorialId,
  onOpenPop,
}) => {
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(
    initialTutorialId || null
  );

  const activeTutorial: SelfServiceTutorial | undefined = mockTutorials.find(
    (t) => t.id === selectedTutorialId || t.slug === selectedTutorialId
  );

  if (activeTutorial) {
    return (
      <TutorialViewer
        tutorial={activeTutorial}
        onBackToCatalog={() => setSelectedTutorialId(null)}
        onOpenPop={onOpenPop}
      />
    );
  }

  const getTutorialIcon = (id: string) => {
    switch (id) {
      case 'tut-wifi':
        return <Wifi className="w-6 h-6 text-iffar-green" />;
      case 'tut-backup':
        return <Cloud className="w-6 h-6 text-blue-600" />;
      case 'tut-glpi':
        return <Headphones className="w-6 h-6 text-amber-600" />;
      default:
        return <Smartphone className="w-6 h-6 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
            <QrCode className="w-3.5 h-3.5" /> Portal de Autosserviço • Acesso via Smartphone
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Central de Guias Rápidos & Tutoriais Mobile
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Aprenda a conectar seus dispositivos, configurar o Wi-Fi com segurança e abrir chamados sem precisar enfrentar filas no início do semestre.
          </p>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockTutorials.map((tut) => (
          <Card
            key={tut.id}
            hoverable
            onClick={() => setSelectedTutorialId(tut.id)}
            className="p-6 border-slate-200 hover:border-iffar-green/60 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-50 group-hover:bg-emerald-50 rounded-2xl transition-colors">
                  {getTutorialIcon(tut.id)}
                </div>
                <Badge variant="green" size="sm">
                  {tut.badge}
                </Badge>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {tut.category}
                </span>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-iffar-green transition-colors mt-0.5">
                  {tut.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {tut.shortDescription}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-iffar-green group-hover:translate-x-1 transition-transform">
              <span>Acessar Guia Mobile</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        ))}
      </div>

      {/* Assisted Support Box */}
      <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <strong className="block text-slate-900 font-bold text-sm">
              Diretriz Institucional de Atendimento Assistido
            </strong>
            <span>
              Para proteção à privacidade e integridade patrimonial, os servidores de TI não manuseiam dispositivos particulares de alunos, orientando o próprio usuário a realizar os passos.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
