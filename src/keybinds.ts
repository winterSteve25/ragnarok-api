export type KeybindCallback = (captures: Array<string>) => void;
export type KeyModifier = "Ctrl" | "Super" | "Alt" | "Shift" | "None" | "Any";
export type Key = string | KeyDetailed;

export class Keybind {

	public readonly name: string;
	public trigger: Key;
	public sequence: Array<Key>;
	public captureLength: number;
	public callback: KeybindCallback;

	private constructor(name: string, trigger: Key, sequence: Array<Key>, captureLength: number, callback: KeybindCallback) {
		this.name = name;
		this.trigger = trigger;
		this.sequence = sequence;
		this.captureLength = captureLength;
		this.callback = callback;
	}

	public static by(name: string, trigger: Key): Keybind {
		return new Keybind(name, trigger, [], 0, (_captures: Array<string>) => {});
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

export class Keymap {
	public map: Map<string, Keybind>;
	public triggers: Map<Key, Array<string>>;

	public constructor() {
		this.map = new Map<string, Keybind>();
		this.triggers = new Map<string, Array<string>>();
	}

	/**
	* @param identifier identifier for the keybind. Must be unique. will cause function to throw an Error if a keybind with the same identifier already exists.
	* @param keybind The keybind itself
	*/
	public register(identifier: string, keybind: Keybind) {
		if (this.map.has(identifier)) {
			throw new Error(`Conflicting key identifier: ${identifier}`);
		}

		if (!this.triggers.has(keybind.trigger)) {
			this.triggers.set(keybind.trigger, []);
		}

		this.triggers.get(keybind.trigger)!.push(identifier);
		this.map.set(identifier, keybind);

		return undefined;
	}
}
