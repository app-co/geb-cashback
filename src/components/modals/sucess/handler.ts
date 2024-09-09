import { MutableRefObject } from 'react';

import { GlobalErrorModalRef, T } from './types';

export default class SucessHandler {
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

  static message(item: T) {
    this.ref.current?.item(item);
  }
}
