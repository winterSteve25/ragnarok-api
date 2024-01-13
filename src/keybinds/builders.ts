import { Key, KeybindCallback, MotionDestination, MotionKeybind } from ".";
import { Keymap, keyToString } from "./keymap";

abstract class BaseKeybindBuilder<T> {
    protected constructor(
		protected identifier: string,
		protected trigger: string,
		protected keymap: Keymap,
		protected sequence: string[],
		protected description?: string,
	) {
    }

	public then(key: Key) {
		this.sequence.push(keyToString(key));
		return this;
	}

	public describe(description: string) {
		this.description = description;
		return this;
	}

	public abstract register(callback: T): void;
}

export class KeybindBuilder extends BaseKeybindBuilder<KeybindCallback> {
    public constructor(identifier: string, trigger: string, keymap: Keymap, sequence: string[], description?: string) {
        super(identifier, trigger, keymap, sequence, description);
    }

	public motion(): MotionKeybindBuilder {
		return new MotionKeybindBuilder(this.identifier, this.trigger, this.keymap, this.sequence, this.description);
	}

    public register(callback: KeybindCallback): void {
		this.keymap.register(this.identifier, {
			identifier: this.identifier,
			trigger: this.trigger,
			sequence: this.sequence,
			description: this.description,
			onTrigger: callback
		});
    }
}

export class MotionKeybindBuilder extends BaseKeybindBuilder<MotionDestination> {

	private captureLength: number;

    public constructor(
		identifier: string,
		trigger: string,
		keymap: Keymap,
		sequence: string[],
		description?: string,
	) {
        super(identifier, trigger, keymap, sequence, description);
		this.captureLength = 0;
    }

	public capture(length: number) {
		this.captureLength = length;
		return this;
	}

	public register(destination: MotionDestination) {
		this.keymap.register(this.identifier, new MotionKeybind(
			this.identifier,
			this.trigger,
			this.captureLength,
			destination,
			this.sequence,
			this.description
		))
	}
}
