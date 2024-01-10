import { EditorContext } from "../editor";

export type KeyModifier = "Ctrl" | "Alt";
export type Key = string | KeyDetailed;

export type EditorContextSetter = (setter: (ctx: EditorContext) => void) => void;
export type MotionDestination = (ctx: Readonly<EditorContext>, capture?: string[]) => [number, number];
export type KeybindCallback = (set: EditorContextSetter, data: Partial<KeybindData>) => void;

export interface Keybind {
    identifier: string;
    trigger: string;
    sequence: string[];
	onTrigger: KeybindCallback;
    description?: string;
}

export interface KeybindData {
	capture: string[],
	motion: MotionDestination,
}

export class MotionKeybind implements Keybind {

	public constructor(
		public identifier: string,
		public trigger: string,
		public captureLength: number,
		public destination: MotionDestination,
		public sequence: string[],
		public description?: string,
	) {
	}

    onTrigger = (set: (setter: (ctx: EditorContext) => void) => void, data: Partial<KeybindData>) => {
		set((ctx) => {
			const dest = this.destination(ctx, data.capture);
			ctx.cursorPosition = dest[0];
			ctx.cursorLine = dest[1]
		});
	};
}

export class ActionKeybind implements Keybind {
	public constructor(
		public identifier: string,
		public description: string,
		public trigger: string,
		public sequence: string[],
		public act: (set: (setter: (ctx: EditorContext) => void) => void, motion?: MotionDestination) => void
	) {
	}

    onTrigger = (set: (setter: (ctx: EditorContext) => void) => void, data: Partial<KeybindData>) => {
		this.act(set, data.motion);
	};
}

export interface KeyDetailed {
    modifier?: Set<KeyModifier>,
    key: string,
}
