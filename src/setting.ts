import { Key, Keybind } from "./keybinds";
import { PluginPath } from "./plugin";

export interface ISetting {
	plugins: Array<PluginPath>;
	keymaps: Map<Key, Array<Keybind>>;
	showHiddenFiles: boolean;
}

export class Setting implements ISetting {
    plugins: Array<PluginPath>;
    keymaps: Map<Key, Array<Keybind>>;
    showHiddenFiles: boolean;

	public static from(setting: ISetting): Setting {
		return <Setting> setting;
	}

	public addKeybind(keybind: Keybind) {
		if (!this.keymaps.has(keybind.trigger)) {
			this.keymaps.set(keybind.trigger, []);
		}

		this.keymaps.get(keybind.trigger)!.push(keybind);
	}
}
