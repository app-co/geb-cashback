type T = {
  title: string;
  description: string;
};
export type GlobalErrorModalRef = {
  show: () => void;
  hide: () => void;
  item: (obj: T) => void;
};
