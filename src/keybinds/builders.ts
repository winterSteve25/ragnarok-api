import { Key, KeybindCallback, DestProvider, MotionKeybind, ActionCallback, ActionKeybind, CapturePredicate } from ".";
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

	public action(): ActionKeybindBuilder {
		return new ActionKeybindBuilder(this.identifier, this.trigger, this.keymap, this.sequence, this.description);
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

export class MotionKeybindBuilder extends BaseKeybindBuilder<DestProvider> {

	private canFinish?: CapturePredicate;

    public constructor(
		identifier: string,
		trigger: string,
		keymap: Keymap,
		sequence: string[],
		description?: string,
	) {
        super(identifier, trigger, keymap, sequence, description);
    }

	public capture(canFinish: CapturePredicate) {
		this.canFinish = canFinish;
		return this;
	}

	public register(destination: DestProvider) {
		this.keymap.register(this.identifier, new MotionKeybind(
			this.identifier,
			this.trigger,
			destination,
			this.sequence,
			this.canFinish,
			this.description
		))
	}
}

export class ActionKeybindBuilder extends BaseKeybindBuilder<ActionCallback> {

    public constructor(
		identifier: string,
		trigger: string,
		keymap: Keymap,
		sequence: string[],
		description?: string,
	) {
        super(identifier, trigger, keymap, sequence, description);
    }

    public register(callback: ActionCallback): void {
		this.keymap.register(this.identifier, new ActionKeybind(
			this.identifier,
			this.trigger,
			callback,
			this.sequence,
			this.description,
		));
    }
}
