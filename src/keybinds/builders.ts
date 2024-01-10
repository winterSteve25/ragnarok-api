import { EditorContext } from "../editor";
import {Keymap} from "./keymap";

class BaseKeybindBuilder {
    protected readonly identifier: string;
    protected readonly keymap: Keymap;

    protected constructor(identifier: string, keymap: Keymap) {
        this.identifier = identifier;
        this.keymap = keymap;
    }
}

export class KeybindBuilder extends BaseKeybindBuilder {

    private description: string;
	private onTrigger: (context: EditorContext, capture: string[]) => void;
    private trigger: string;
    private sequence: Array<string>;
	private captureLength: number;

    public constructor(identifier: string, keymap: Keymap) {
        super(identifier, keymap);
    }

	public register() {
		this.keymap.register(this.identifier, {
			identifier: this.identifier,
			description: this.description,
			onTrigger: this.onTrigger,
			trigger: this.trigger,
			sequence: this.sequence,
			captureLength: this.captureLength
		});
	}

}
