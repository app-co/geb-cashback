import { MutableRefObject } from 'react';

import { GlobalErrorModalRef } from './types';

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

  static message(item: { title: string; description: string }) {
    this.ref.current?.item(item);
  }
}
