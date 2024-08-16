/* eslint-disable default-param-last */
import { _currencyToNumber, convertNumberToCurrency } from '@/utils/unidades';

export function installments(
  value: string,
): { label: string; value: string }[] {
  const v = _currencyToNumber(value);
  const array = Array.from({ length: 12 }, (h, i) => {
    let valor = v;

    if (i <= 3) {
      valor = v;
    }

    if (i > 3 && i <= 7) {
      valor += v * 0.02;
    }

    if (i > 7) {
      valor += v * 0.04;
    }
    return {
      value: String(i + 1),
      label: `${i + 1}x de ${convertNumberToCurrency(valor / (i + 1))}`,
    };
  });

  return array;
}
