import React, { useState } from 'react';
import {
  Search,
  Network,
  FileText,
  Smartphone,
  Info,
  Building2,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { Badge } from '../common/Badge';

export type NavPage = 'home' | 'bpmn' | 'pops' | 'self-service' | 'about';

interface HeaderProps {
  activePage: NavPage;
  onNavigate: (page: NavPage, extraData?: string) => void;
  onOpenSearch: () => void;
  onOpenCampusModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
  onOpenCampusModal,
}) => {
  const { currentCampus } = useCampus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as NavPage, label: 'Início / Hub', icon: <Network className="w-4 h-4" /> },
    { id: 'bpmn' as NavPage, label: 'Catálogo BPMN 2.0', icon: <Network className="w-4 h-4" />, badge: '5 Processos' },
    { id: 'pops' as NavPage, label: 'POPs Técnicos', icon: <FileText className="w-4 h-4" />, badge: 'Checklists' },
    { id: 'self-service' as NavPage, label: 'Autosserviço (QR Code)', icon: <Smartphone className="w-4 h-4" />, badge: 'Wi-Fi / GLPI' },
    { id: 'about' as NavPage, label: 'Sobre o Repositório', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm print:hidden">
      {/* Top Gov Bar */}
      <div className="bg-iffar-green text-white text-[11px] font-medium py-1 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide uppercase">Ministério da Educação</span>
          <span className="text-white/40">•</span>
          <span className="opacity-90">Instituto Federal Farroupilha</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-emerald-100">
          <a
            href={currentCampus.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            Portal IFFar <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={currentCampus.glpiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 transition-colors font-semibold text-white bg-white/10 px-2 py-0.5 rounded"
          >
            GLPI Helpdesk <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Campus Brand */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Visual Icon Badge resembling IFFar emblem */}
            <div className="w-11 h-11 rounded-xl bg-iffar-green flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
              <div className="grid grid-cols-2 gap-1 p-1.5">
                <span className="w-2.5 h-2.5 bg-iffar-red rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-white rounded-sm"></span>
                <span className="w-2.5 h-2.5 bg-white rounded-sm"></span>
                <span className="w-2.5 h-2.5 bg-white rounded-sm"></span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-iffar-green transition-colors">
                  Repositório de Processos TI
                </span>
                <Badge variant="green" size="sm" className="hidden lg:inline-flex">
                  CTI 2.0
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span>{currentCampus.ctiName}</span>
                <span>•</span>
                <span className="text-iffar-green font-semibold">{currentCampus.name}</span>
              </div>
            </div>
          </div>

          {/* Center/Right Controls: Search Bar & Campus Selector */}
          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-100/90 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 rounded-xl text-xs font-medium border border-slate-200/60 transition-all group cursor-pointer w-44 md:w-56"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-iffar-green transition-colors shrink-0" />
              <span className="truncate text-left">Buscar POP, BPMN, Wi-Fi...</span>
              <kbd className="hidden md:inline-block ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-white text-slate-600 rounded border border-slate-200 shadow-2xs">
                Ctrl+K
              </kbd>
            </button>

            {/* Campus Selector Trigger */}
            <button
              onClick={onOpenCampusModal}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-iffar-green/40 shadow-2xs transition-all cursor-pointer"
              title="Trocar Campus do IFFar"
            >
              <Building2 className="w-4 h-4 text-iffar-green" />
              <div className="text-left">
                <div className="text-[10px] uppercase text-slate-400 leading-none">Unidade</div>
                <div className="truncate max-w-[130px] font-bold text-slate-800 leading-tight">
                  {currentCampus.shortName} - {currentCampus.name.replace('Campus ', '')}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-600 hover:text-slate-900 md:hidden rounded-xl hover:bg-slate-100"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 border-t border-slate-100 py-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-iffar-green/10 text-iffar-green font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] rounded-md ${
                      isActive
                        ? 'bg-iffar-green text-white font-medium'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fade-in">
          <div className="py-2 border-b border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCampusModal();
              }}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-800"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-iffar-green" />
                <span>Campus Selecionado: <strong>{currentCampus.name}</strong></span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-iffar-green text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={currentCampus.glpiHelpdeskUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-iffar-green text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Abrir Chamado GLPI <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
