/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from 'react';

interface ModalContextProps {
  title: string;
  description: string;
  show: boolean;
  onClosed: () => void;
  showModal: (title: string, description: string, onClosed: () => void) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function GlobalErrorModalProvider(children: React.ReactNode) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [onClosed, setOnClosed] = useState<() => void>(() => { });

  const showModal = (
    title: string,
    description: string,
    onClosed: () => void,
  ) => {
    setTitle(title);
    setDescription(description);
    setOnClosed(() => onClosed);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
    onClosed();
  };

  return (
    <ModalContext.Provider
      value={{ title, description, show, onClosed, showModal, hideModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
