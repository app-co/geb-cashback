import { APP, BASE_URL, BASE_URL_TST } from '@env';

export const baseURL = APP === 'prd' ? BASE_URL : BASE_URL_TST;
