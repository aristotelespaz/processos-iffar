import React from 'react';
import { Users, Monitor, GitPullRequest, ShieldCheck, Layers, Wifi } from 'lucide-react';
import { institutionalMetrics } from '../../data/metrics';
import { useCampus } from '../../context/CampusContext';

export const MetricsBanner: React.FC = () => {
  const { currentCampus } = useCampus();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-iffar-green" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-blue-600" />;
      case 'GitPullRequest':
        return <GitPullRequest className="w-5 h-5 text-purple-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-600" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-indigo-600" />;
      default:
        return <Users className="w-5 h-5 text-iffar-green" />;
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00823B_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-iffar-green/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Main Hero Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Coordenação de Tecnologia da Informação • {currentCampus.code}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Repositório Digital de Processos de TI & POPs Técnicos
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Central de Procedimentos Operacionais Padrão, modelagem formal em notação <strong>BPMN 2.0 (AS-IS vs. TO-BE)</strong> e tutoriais de autosserviço com QR Code para a comunidade acadêmica do {currentCampus.name}.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-2">
          {institutionalMetrics.quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
            >
              <div className="p-2 w-fit rounded-xl bg-white/15 mb-2.5">
                {getIcon(stat.icon)}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-emerald-300 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-snug">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
