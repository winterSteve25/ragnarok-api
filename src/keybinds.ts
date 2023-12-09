export type KeybindCallback = (captures: Array<string>) => {};
export type KeyModifier = "Ctrl" | "Super" | "Alt" | "Shift" | "None" | "Any";
export type Key = string | KeyDetailed;

export class Keybind {
	trigger: Key;
	sequence: Array<Key>;
	captureLength: number;
	callback: KeybindCallback;

	private constructor(trigger: Key) {
		this.trigger = trigger;
		this.sequence = [];
		this.captureLength = 0;
	}

	public static by(trigger: Key): Keybind {
		return new Keybind(trigger);
	}

	public then(key: Key): Keybind {
		this.sequence.push(key);
		return this;
	}

	public capture(length: number): Keybind {
		this.captureLength = length;
		return this;
	}

	public callBack(callback: KeybindCallback): Keybind {
		this.callback = callback;
		return this;
	}
}

export interface KeyDetailed {
	modifier?: KeyModifier,
	key: string,
}
