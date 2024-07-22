import { TRadios } from '@/components/forms/RadioGrup';

/* eslint-disable no-underscore-dangle */
export const Segments = [
  'Saúde/bem-star',
  'Casa/construção',
  'Alimentação',
  'Transporte/logística',
  'Tecnologia',
  'Educação',
  'Viagem/turismo',
  'Finanças/investimentos',
  'Pets',
  'Publicidade/propaganda',
  'Industria',
  'Juridico/advocacia',
  'Consultoria/gestão empresarial',
  'Limpeza/higiene',
  'Reciclagem/resíduos',
  'Artesanato',
  'Brinquedos/jogos',
  'Instrumentos musicais',
  'Eventos',
  'Outros',
];

export function _segmentos() {
  const enun: TRadios[] = [];
  let transform = {} as { [key: number]: string };

  Segments.forEach((h, i) => {
    const dt = {
      label: h,
      value: String(i),
    };
    enun.push(dt);
    transform = {
      ...transform,
      [i]: h,
    };
  });

  return { enun, transform };
}
