export type TType = 'success' | 'error' | 'warning';
export type T = {
  title: string;
  description: string;
  tipo: TType;
};
export type GlobalErrorModalRef = {
  show: () => void;
  hide: () => void;
  item: (obj: T) => void;
};
