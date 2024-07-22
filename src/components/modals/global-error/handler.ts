import { MutableRefObject } from 'react';

import { GlobalErrorModalRef } from './types';

export default class GlobalErrorModalHandler {
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

  public setTitle(title: string) {
    this.ref.current?.title = title;
  }
}
