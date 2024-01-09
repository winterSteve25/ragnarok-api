function keyToString(key: Key): string {
    if (typeof key === "string") {
        return key;
    }

    if (key.modifier) {
        const mods = Array.from(key.modifier).map(value => value as string);
        mods.sort();
        mods.push(key.key);
        return mods.join("+");
    }

    return key.key;
}

export type KeyModifier = "Ctrl" | "Alt" | "Shift";
export type Key = string | KeyDetailed;

export interface Keybind {
    readonly name: string;
    readonly description: string;
    trigger: string;
    sequence: Array<string>;
}

export interface KeyDetailed {
    modifier?: Set<KeyModifier>,
    key: string,
}