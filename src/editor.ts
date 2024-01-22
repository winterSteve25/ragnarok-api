import { File } from "..";

export interface EditorContext {
	cursorPosition: number;
	cursorLine: number;
	insertMode: boolean;
	currentBuffer: string[] | null;
	currentFile: File | null;
}
