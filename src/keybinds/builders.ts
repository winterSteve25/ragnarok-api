import {Keymap} from "./keymap";
import {build} from "vite";

class BaseKeybindBuilder {
    protected readonly identifier: string;
    protected readonly keymap: Keymap;

    protected constructor(identifier: string, keymap: Keymap) {
        this.identifier = identifier;
        this.keymap = keymap;
    }
}

export class KeybindBuilder extends BaseKeybindBuilder {
    public constructor(identifier: string, keymap: Keymap) {
        super(identifier, keymap);
    }
}

export class CaptureKeybindBuilder {
}