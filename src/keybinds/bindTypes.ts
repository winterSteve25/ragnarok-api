import { EditorContext } from "../editor";

export type KeyModifier = "Ctrl" | "Alt" | "Shift";
export type Key = string | KeyDetailed;

export interface Keybind {
    readonly identifier: string;
    readonly description: string;
	readonly onTrigger: (context: EditorContext, capture: string[]) => void;
    trigger: string;
    sequence: Array<string>;
	captureLength: number;
}

export interface KeyDetailed {
    modifier?: Set<KeyModifier>,
    key: string,
}
