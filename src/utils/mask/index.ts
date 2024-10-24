/* eslint-disable class-methods-use-this */
export class Mask {
  public cellPhone(value: string) {
    const e = value.replace(/\D/g, '');
    e.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return e;
  }

  public date(value: string) {
    let e = null;

    if (value) {
      e = value.replace(/\D/g, '');
      value.replace(/(\d{2})(\d{2})/, '$1/$2');
    }

    return e;
  }

  formatCPFOrCNPJ(text: string): string {
    const numericValue = text.replace(/\D/g, '');

    if (numericValue.length <= 11) {
      return numericValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4',
      );
    }
    if (numericValue.length === 14) {
      return numericValue.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      );
    }
    return numericValue;
  }

  money(e: string) {
    let value = null;

    if (e) {
      value = e.replace(/\D/g, '');

      value = value.replace(/(\d)(\d{2})$/, '$1,$2');

      value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

      value = `R$ ${value}`;
    }

    return value;
  }

  card(e: string) {
    let value = null;

    if (e) {
      value = e.replace(/\D/g, '');

      value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1.$2.$3.$4');

      value = `${value}`;
    }

    return value;
  }
}
