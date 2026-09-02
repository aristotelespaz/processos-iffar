import React from 'react';
import { Mail, Phone, MapPin, Clock, Shield, ExternalLink, GitFork } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const Footer: React.FC = () => {
  const { currentCampus } = useCampus();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 print:hidden mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Repositório & CTI */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-iffar-green flex items-center justify-center text-white font-bold text-sm">
                IF
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Repositório Digital TI</h4>
                <p className="text-xs text-slate-400">{currentCampus.institution}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma institucional de padronização operacional, modelagem BPMN 2.0 e autosserviço da {currentCampus.ctiName}.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800 text-[11px] text-emerald-400 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Sistemas Operacionais & GLPI Ativos</span>
            </div>
          </div>

          {/* Col 2: Contato CTI */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Atendimento CTI</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{currentCampus.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentCampus.operatingHours}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${currentCampus.ctiEmail}`} className="hover:text-white transition-colors">
                  {currentCampus.ctiEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentCampus.ctiPhone}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Links Úteis & Helpdesk */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Acesso Rápido</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href={currentCampus.glpiHelpdeskUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" /> Abertura de Chamados (GLPI)
                </a>
              </li>
              <li>
                <a
                  href="https://www.iffarroupilha.edu.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" /> Portal Oficial IFFar
                </a>
              </li>
              <li>
                <a
                  href="https://sig.iffarroupilha.edu.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" /> Sistema SIGAA / Suap
                </a>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-amber-400" /> Em conformidade com a PSI & LGPD
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Replicabilidade Multi-Campus */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Replicabilidade</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Desenvolvido com arquitetura desacoplada (<code className="text-emerald-300">campus-config.json</code>). Qualquer campus da Rede Federal pode instanciar sua versão técnica.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block mb-1">Padrão TCC IFFar FW • 2026</span>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <GitFork className="w-3.5 h-3.5" /> Multi-Campus v1.0 Ready
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 {currentCampus.institution} – {currentCampus.name}. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>POPs em conformidade com BPMN 2.0</span>
            <span>•</span>
            <span>Versão para Impressão A4 Ativa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
