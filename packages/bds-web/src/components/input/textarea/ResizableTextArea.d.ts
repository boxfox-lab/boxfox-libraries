import React, { ComponentProps } from "react";
declare type Props = ComponentProps<"textarea"> & {
    autoresize?: boolean;
};
export declare const ResizableTextArea: React.ForwardRefExoticComponent<Pick<Props, "key" | "autoresize" | keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>> & React.RefAttributes<HTMLTextAreaElement>>;
export {};
