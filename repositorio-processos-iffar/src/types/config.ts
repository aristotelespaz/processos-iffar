export interface CampusConfig {
  id: string;
  name: string;
  shortName: string;
  institution: string;
  code: string;
  ctiName: string;
  ctiEmail: string;
  ctiPhone: string;
  glpiUrl: string;
  glpiHelpdeskUrl: string;
  location: string;
  operatingHours: string;
  wifiSSID: string;
  wifiDomain: string;
  wifiAuthMethod: string;
  activeDirectoryDomain: string;
  nasStoragePath: string;
  portalUrl: string;
  logoUrl?: string;
}

export interface MultiCampusSettings {
  defaultCampusId: string;
  version: string;
  lastUpdated: string;
  campuses: CampusConfig[];
}
