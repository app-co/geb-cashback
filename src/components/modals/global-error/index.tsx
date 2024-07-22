/* eslint-disable react/jsx-no-bind */
import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import GlobalErrorModalHandler from './handler';
import { GlobalErrorModalRef } from './types';

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: 24,
    width: '75%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    letterSpacing: 1.28,
    color: '#434343',
    fontSize: 16,
    fontWeight: '700',
  },
  bodyText: {
    marginVertical: 16,
    color: '#7b7b7b',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export function GlobalErrorModal() {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<GlobalErrorModalRef>();

  function handleConfirm() {
    ref.current?.hide();
  }

  function showModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useLayoutEffect(() => {
    GlobalErrorModalHandler.setRef(ref);
  }, []);

  useImperativeHandle(ref, () => ({
    show: showModal,
    hide: closeModal,
    title: ref.current?.title,
  }));

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isOpen}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBody}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>{ref.current?.title}</Text>
          </View>

          <Text style={styles.bodyText}>
            Tente se conectar novamete mais tarde ou em algum lugar com
            internet.
          </Text>

          <TouchableOpacity
            onPress={handleConfirm}
            style={[
              styles.button,
              {
                backgroundColor: '#302525',
              },
            ]}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
