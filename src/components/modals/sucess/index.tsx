/* eslint-disable react/jsx-no-bind */
import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Center } from 'native-base';
import { CheckFat } from 'phosphor-react-native';

import { cor } from '@/styles/cor';

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
    backgroundColor: cor.focus.a,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    letterSpacing: 1.28,
    color: cor.text.black,
    fontSize: 20,
    fontFamily: 'black',
    fontWeight: '900',
  },
  bodyText: {
    marginVertical: 16,
    color: cor.text.black,
    fontSize: 16,
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

export function SucessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = React.useState<{
    title: string;
    description: string;
  }>();

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

  function obj(item: { title: string; description: string }) {
    setIsOpen(true);
    setMessage(item);
  }

  useLayoutEffect(() => {
    GlobalErrorModalHandler.setRef(ref);
  }, []);

  useImperativeHandle(ref, () => ({
    show: showModal,
    hide: closeModal,
    item: h => obj(h),
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
            <CheckFat weight="duotone" size={90} />
          </View>

          <Center>
            <Text style={styles.title}>{message?.title}</Text>
          </Center>

          <Text style={styles.bodyText}>{message?.description}</Text>

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
