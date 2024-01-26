import { PieceTreeBase } from "vscode-piece-tree";
import { File } from "..";

export interface EditorContext {
	cursorPosition: number;
	cursorLine: number;
	insertMode: boolean;
	currentBuffer: PieceTreeBase | null;
	currentFile: File | null;
}
