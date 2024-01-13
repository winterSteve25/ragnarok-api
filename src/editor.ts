export interface EditorContext {
	cursorPosition: number;
	cursorLine: number;
	insertMode: boolean;
	currentBuffer: string[];
}
