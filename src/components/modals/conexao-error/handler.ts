import { MutableRefObject } from 'react';

import { ConectionErrordModalRef } from './types';

export default class ConectionErrorModalHandler {
  static ref: MutableRefObject<ConectionErrordModalRef | undefined>;

  static setRef(ref: MutableRefObject<ConectionErrordModalRef | undefined>) {
    this.ref = ref;
  }

  static showModal() {
    this.ref.current?.show();
  }

  static hideModal() {
    this.ref.current?.hide();
  }
}
