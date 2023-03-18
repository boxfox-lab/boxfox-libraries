import React, { useCallback, useMemo } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { TrashIcon } from "react-native-heroicons/outline";
import styled from "styled-components/native";
import { layout } from "../../constants";
import { useColors } from "../../hooks";
import { Carousel } from "./Carousel";
import { AddImageSection } from "./ImageSection";

interface Props {
  value: string[];
  onChange?: (value: string[]) => void;
  useCameraSheet?: (handler: (url: string) => void) => () => void;
  style?: ViewStyle;
}

export function ImageList({
  value: images,
  onChange,
  useCameraSheet,
  style,
}: Props) {
  const remove = useCallback(
    (url) => {
      onChange?.((images ?? []).filter((i) => i !== url));
    },
    [onChange, images]
  );

  const value = useMemo(
    () => (onChange ? [...images, undefined] : [...images]),
    [images]
  );

  const selectPhoto = useCameraSheet?.((uri) => onChange?.([...images, uri]));

  const colors = useColors();

  const renderItem = useCallback(
    ({ item }: { item: string | undefined }) => (
      <View style={{ width: layout.window.width, height: "100%" }}>
        {item ? (
          <View style={{ height: "100%" }}>
            {onChange && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  position: "absolute",
                  right: 18,
                  top: 18,
                  padding: 10,
                  zIndex: 10,
                  borderRadius: 30,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
                onPress={() => remove(item)}
              >
                <TrashIcon size={20} color={colors.white} />
              </TouchableOpacity>
            )}
            <ImageView source={{ uri: item }} />
          </View>
        ) : (
          <AddImageSection onPress={selectPhoto} />
        )}
      </View>
    ),
    []
  );

  return (
    <Container style={style}>
      <Carousel
        keyExtractor={(item, idx) => String(item) + idx}
        data={value}
        renderItem={renderItem}
        pageWidth={layout.window.width}
        contentContainerStyle={{ height: "100%" }}
        style={{ height: "100%" }}
      />
    </Container>
  );
}

const Container = styled.View`
  height: ${layout.window.width}px;
`;

const ImageView = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;
