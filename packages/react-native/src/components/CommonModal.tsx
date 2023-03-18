import React, { ReactNode } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useColors } from "../hooks";
import styled from "styled-components/native";

interface Props {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function CommonModal({ open, onClose, children }: Props) {
  const colors = useColors();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
      //@ts-ignore
      style={
        Platform.OS === "web"
          ? { position: "fixed", width: "100%", height: "100%", zIndex: 30 }
          : {}
      }
    >
      <CenteredView activeOpacity={1} onPressOut={onClose}>
        <TouchableWithoutFeedback
          style={styles.modalView}
          onPress={() => console.log("without-feedback")}
        >
          <View
            style={[styles.modalView, { backgroundColor: colors.background }]}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      </CenteredView>
    </Modal>
  );
}

const CenteredView = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
