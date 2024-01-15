import { EditorContext } from "../editor";

export type KeyModifier = "Ctrl" | "Alt";
export type Key = string | KeyDetailed;

export type ActionCallback = (set: (setter: (ctx: EditorContext) => void) => void, motion: MotionRange) => void;
export type KeybindCallback = (set: EditorContextSetter, data: Partial<KeybindData>) => void;
export type CapturePredicate = (cap: string[], last: string) => boolean;
export type DestProvider = (ctx: Readonly<EditorContext>, capture?: string[]) => [number, number];
export type EditorContextSetter = (setter: (ctx: EditorContext) => void) => void;

export interface MotionRange {
	start: [number, number];
	end: [number, number];
};

export interface Keybind {
    identifier: string;
    trigger: string;
    sequence: string[];
	onTrigger: KeybindCallback;
    description?: string;
}

export interface KeybindData {
	capture: string[];
	range: MotionRange;
	motionMultiplier: number;
}

export class MotionKeybind implements Keybind {

	public constructor(
		public identifier: string,
		public trigger: string,
		public destination: DestProvider,
		public sequence: string[],
		public finishCapture?: CapturePredicate,
		public description?: string,
	) {
	}

    onTrigger = (set: (setter: (ctx: EditorContext) => void) => void, data: Partial<KeybindData>) => {
		set((ctx) => {
			const dest = this.destination(ctx, data.capture);
			ctx.cursorPosition = dest[0];
			ctx.cursorLine = dest[1];
		});
	};
}

export class ActionKeybind implements Keybind {
	public constructor(
		public identifier: string,
		public trigger: string,
		public act: ActionCallback,
		public sequence: string[],
		public description?: string,
	) {
	}

    onTrigger = (set: (setter: (ctx: EditorContext) => void) => void, data: Partial<KeybindData>) => {
		this.act(set, data.range);
	};
}

export interface KeyDetailed {
    modifier?: Set<KeyModifier>,
    key: string,
}
