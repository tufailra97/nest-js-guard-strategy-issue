export enum AppId {
  CORE = 'CORE',
  INVENTORY = 'INVENTORY',
  APPOINTMENTS = 'APPOINTMENTS'
}

export type Apps = {
  id: AppId;
  permissions: string[];
};
