import React from 'react';
import { Building2, Check, MapPin, Mail, Phone, ExternalLink, Wifi, HardDrive, Shield } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useCampus } from '../../context/CampusContext';
import { Badge } from '../common/Badge';

interface CampusSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusSelector: React.FC<CampusSelectorProps> = ({ isOpen, onClose }) => {
  const { currentCampus, allCampuses, selectCampus } = useCampus();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Seletor de Unidade / Campus IFFar"
      subtitle="O repositório é desacoplado e personaliza parâmetros de TI para cada unidade do Instituto"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Campuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {allCampuses.map((campus) => {
            const isSelected = campus.id === currentCampus.id;
            return (
              <div
                key={campus.id}
                onClick={() => {
                  selectCampus(campus.id);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/70 border-iffar-green ring-2 ring-iffar-green/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {campus.code}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-iffar-green text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{campus.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{campus.location}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <Badge variant={isSelected ? 'green' : 'slate'} size="sm">
                    {isSelected ? 'Ativo no Momento' : 'Selecionar'}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Campus Parameters Card */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-iffar-green" />
              Parâmetros Locais da CTI – {currentCampus.name}
            </h4>
            <span className="text-[11px] text-slate-500">Configuração Desacoplada (campus-config.json)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block text-[10px]">Endereço / Localização:</span>
                <span className="text-slate-800 font-medium">{currentCampus.location}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block text-[10px]">E-mail Oficial CTI:</span>
                <span className="text-slate-800 font-medium">{currentCampus.ctiEmail}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Wifi className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block text-[10px]">SSID & Domínio Wi-Fi:</span>
                <span className="text-slate-800 font-medium">
                  {currentCampus.wifiSSID} • <code className="text-emerald-700 font-mono">{currentCampus.wifiDomain}</code>
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <HardDrive className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block text-[10px]">Storage NAS de Manutenção:</span>
                <code className="text-slate-800 text-[11px] font-mono block truncate">
                  {currentCampus.nasStoragePath}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info about replication */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Módulo pronto para replicação em toda a Rede Farroupilha.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-iffar-green hover:bg-iffar-green-700 text-white rounded-lg font-medium cursor-pointer"
          >
            Confirmar e Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};
