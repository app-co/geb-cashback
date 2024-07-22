/* eslint-disable default-param-last */
import { _toNumber, convertNumberToCurrency } from '@/utils/unidades';

export function installments(
  value: string,
): { label: string; value: string }[] {
  const v = _toNumber(value);
  const array = Array.from({ length: 12 }, (h, i) => i);

  const parce = array.map((h, i) => {
    return {
      value: String(i + 1),
      label: `${i + 1}x de ${convertNumberToCurrency(v / (i + 1))}`,
    };
  });

  return parce;
}
