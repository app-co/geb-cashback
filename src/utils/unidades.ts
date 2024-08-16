/* eslint-disable no-underscore-dangle */
export function _hourToMinutis(valor: string) {
  const [hour, min] = valor.split(':').map(Number);

  const minuti = hour * 60 + min;

  return minuti;
}

export function convertNumberToCurrency(v: number) {
  const amount = v;
  const valor = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return valor;
}

export function _currencyToNumber(v: string): number {
  let value = v.replace(/\D/g, '');
  value = value.length <= 2 ? value : (Number(value) / 100).toString();

  return Number(value);
}

export function _toCurrency(v: number) {
  const amount = v;
  const valor = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return valor;
}
