export interface TimerValue {
  days: string;
  hours: string;
  mi: string;
  sec: string;
}

export interface ErrorData {
  name: boolean;
  email: boolean;
  phone: boolean;
  company: boolean;
}

export enum Package {
  Basic = 'Basic Pack',
  Pro = 'Pro Pack',
  Ultimate = 'Ultimate Pack',
}
