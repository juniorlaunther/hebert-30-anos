export interface Guest {
  id?: string;
  name: string;
  confirmed: boolean;
  confirmedAt?: string;
  message?: string;
}

export type ViewState = 'invitation' | 'attire' | 'admin' | 'gift';
