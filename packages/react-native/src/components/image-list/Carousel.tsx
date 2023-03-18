import React from "react";
import { FlatList, FlatListProps } from "react-native";
import { layout } from "../../constants";

interface ICarousel<T> extends FlatListProps<T> {
  gap?: number;
  offset?: number;
  pageWidth?: number;
}

export function Carousel<T>({
  pageWidth = layout.window.width,
  gap = 0,
  offset = 0,
  ...rest
}: ICarousel<T>) {
  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      decelerationRate="fast"
      horizontal
      pagingEnabled
      snapToInterval={pageWidth + gap}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      {...rest}
    />
  );
}
