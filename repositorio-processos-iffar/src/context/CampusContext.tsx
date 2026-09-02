import React, { createContext, useContext, useState, useEffect } from 'react';
import { CampusConfig, MultiCampusSettings } from '../types/config';
import campusConfigData from '../config/campus-config.json';

interface CampusContextType {
  currentCampus: CampusConfig;
  allCampuses: CampusConfig[];
  selectCampus: (campusId: string) => void;
  config: MultiCampusSettings;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const settings = campusConfigData as MultiCampusSettings;
  const [selectedId, setSelectedId] = useState<string>(() => {
    const saved = localStorage.getItem('iffar_selected_campus');
    return saved || settings.defaultCampusId;
  });

  const currentCampus = settings.campuses.find((c) => c.id === selectedId) || settings.campuses[0];

  const selectCampus = (campusId: string) => {
    setSelectedId(campusId);
    localStorage.setItem('iffar_selected_campus', campusId);
  };

  useEffect(() => {
    document.title = `Repositório Digital de Processos TI | ${currentCampus.name} - IFFar`;
  }, [currentCampus]);

  return (
    <CampusContext.Provider
      value={{
        currentCampus,
        allCampuses: settings.campuses,
        selectCampus,
        config: settings,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = (): CampusContextType => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus deve ser utilizado dentro de um CampusProvider');
  }
  return context;
};
