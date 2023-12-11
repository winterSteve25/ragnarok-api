import { Keymap } from "./keybinds";

export interface RagnarokPlugin { 
	onLoad(): Promise<void>;
	onUnload(): Promise<void>;
	registerKeybinds(keymap: Keymap): Promise<void>;
}

export interface PluginPath {
	git?: string,
	branch?: string,
	path?: string,
	enabled?: boolean,
}
