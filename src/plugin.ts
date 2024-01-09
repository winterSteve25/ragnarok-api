import { Keymap } from "./keybinds/bindTypes";
import { Command } from "./commands";

export interface RagnarokPlugin { 
	onLoad(): Promise<void>;
	onUnload(): Promise<void>;
	registerKeybinds(keymap: Keymap): Promise<void>;
	registerCommands(): Promise<Command[]>;
}

export interface PluginPath {
	git?: string,
	branch?: string,
	path?: string,
	enabled?: boolean,
}
