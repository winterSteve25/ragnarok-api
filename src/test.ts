import { Keymap, Command } from "..";
import {RagnarokPlugin} from "./plugin";

export class TestPlugin implements RagnarokPlugin {
    onLoad(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    onUnload(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async registerKeybinds(keymap: Keymap): Promise<void> {
        keymap.create("")
            .capture()
            .length()
            .build();
    }
    
    async registerCommands(): Promise<Command[]> {
        return [];
    }
}