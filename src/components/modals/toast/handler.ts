import { MutableRefObject } from 'react';

import { T } from '../sucess/types';
import { GlobalErrorModalRef } from './types';

export default class Toast {
  static ref: MutableRefObject<GlobalErrorModalRef | undefined>;

  static setRef(ref: MutableRefObject<GlobalErrorModalRef | undefined>) {
    this.ref = ref;
  }

  static showModal() {
    this.ref.current?.show();
  }

  static hideModal() {
    this.ref.current?.hide();
  }

  static show(item: T) {
    this.ref.current?.item(item);
  }
}
