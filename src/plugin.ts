export interface RagnarokPlugin { 
	onLoad(): Promise<void>;
}

export interface PluginPath {
	git?: string,
	branch?: string,
	path?: string,
	enabled?: boolean,
}
