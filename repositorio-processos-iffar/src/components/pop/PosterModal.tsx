import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, X, Wifi, Shield, CheckCircle2, Building2 } from 'lucide-react';
import { ProcessDocument } from '../../types/process';
import { useCampus } from '../../context/CampusContext';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  process: ProcessDocument;
}

export const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose, process }) => {
  const { currentCampus } = useCampus();
  const posterRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Determine dynamic target URL for QR Code
  const baseUrl = window.location.origin;
  const targetUrl = `${baseUrl}/#tutorial-${process.code.toLowerCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8 print:my-0 print:shadow-none print:max-w-none print:w-full">
        {/* Top Controls (Hidden on Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">Gerador de Cartaz Mural com QR Code</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-iffar-green hover:bg-iffar-green-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Cartaz A4</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Poster Canvas */}
        <div
          ref={posterRef}
          className="p-8 sm:p-12 bg-white text-slate-900 flex flex-col items-center justify-between text-center space-y-6 border-8 border-iffar-green/80 min-h-[750px] print:border-4 print:p-8"
        >
          {/* Institutional Header */}
          <div className="w-full border-b-2 border-slate-200 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-iffar-green flex items-center justify-center text-white font-bold text-xl shadow">
                IF
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">
                  Instituto Federal Farroupilha
                </h4>
                <p className="text-xs text-iffar-green font-bold">{currentCampus.name}</p>
                <p className="text-[11px] text-slate-500">{currentCampus.ctiName}</p>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-slate-400">
              <span className="font-bold text-slate-800 block">{process.code}</span>
              <span>Versão {process.version}</span>
            </div>
          </div>

          {/* Poster Title */}
          <div className="space-y-2 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-iffar-green font-bold text-xs uppercase tracking-wider">
              <Wifi className="w-3.5 h-3.5" /> Acesso & Autosserviço CTI
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {process.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {process.subtitle}
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-6 bg-white rounded-3xl border-4 border-slate-900 shadow-lg flex flex-col items-center space-y-3">
            <QRCodeSVG
              value={targetUrl}
              size={210}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300823B'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E",
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
              Aponte a câmera do celular
            </span>
          </div>

          {/* Quick Technical Instructions */}
          <div className="w-full bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-iffar-green" />
              Parâmetros Rápidos de Conexão:
            </h5>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Nome da Rede (SSID):</span>
                <strong className="text-slate-900 font-mono text-sm">{currentCampus.wifiSSID}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Domínio (Android 11+):</span>
                <strong className="text-emerald-700 font-mono text-sm">{currentCampus.wifiDomain}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Usuário / Identidade:</span>
                <span className="text-slate-800 font-semibold">Sua Matrícula IFFar</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Senha:</span>
                <span className="text-slate-800 font-semibold">Sua Senha do SIGAA / Suap</span>
              </div>
            </div>
          </div>

          {/* Footer Assistance Notice */}
          <div className="w-full pt-4 border-t border-slate-200 flex items-center justify-between text-left text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-iffar-green shrink-0" />
              <span>Dúvidas? Visite o balcão da CTI para <strong>Atendimento Assistido</strong>.</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Conforme PSI IFFar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
