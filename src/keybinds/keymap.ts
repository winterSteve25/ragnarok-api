import {Key, Keybind} from "./bindTypes";

export class Keymap {
    private map: Map<string, Keybind>;
    private triggers: Map<string, Array<string>>;

    public constructor() {
        this.map = new Map<string, Keybind>();
        this.triggers = new Map<string, Array<string>>();
    }

    public create(identifier: string) {
        return new KeybindBuilder(this, identifier);
    }

    public register(identifier: string, keybind: Keybind) {
        if (this.map.has(identifier)) {
            throw new Error(`Conflicting key identifier: ${identifier}`);
        }

        const strKey = keyToString(keybind.trigger);

        if (!this.triggers.has(strKey)) {
            this.triggers.set(strKey, []);
        }

        this.triggers.get(strKey)!.push(identifier);
        this.map.set(identifier, keybind);
    }

    /**
     * @param trigger The trigger key
     * @return Returns undefined when no keybinds are triggered by the given key. <br/>
     * Returns a KeybindQuery if keybind(s) are triggered by the given key. The query can be updated.
     */
    public get(trigger: Key): KeybindQuery | undefined {
        const keys = this.triggers.get(keyToString(trigger));
        if (!keys || keys.length === 0) {
            return undefined;
        }

        const query: Keybind[] = [];

        for (const key of keys) {
            query.push(this.map.get(key));
        }

        return new KeybindQuery(query);
    }

    /**
     * @param id The identifier
     * @summary Get a keybind by its identifier
     */
    public getById(id: string): Keybind | undefined {
        return this.map.get(id);
    }
}

export class KeybindQuery {

    private index: number;

    public constructor(private inner: Array<Keybind>) {
        this.index = 0;
    }

    /**
     * @param input The next input key
     * @summary filters all matching keybind for those that match the next character in the sequence
     */
    public update(input: Key) {
        this.inner = this.inner.filter((keybind) => keybind.sequence[this.index] === keyToString(input));
        this.index++;
    }

    /**
     * @return Returns undefined if there are more than one matching keybinds left, returns the keybind left when there is only 1 matching left.
     */
    public conclude(): Keybind | undefined {
        if (this.inner.length === 1) {
            return this.inner[0];
        }

        return undefined;
    }
}
