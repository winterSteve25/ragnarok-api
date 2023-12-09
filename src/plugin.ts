export interface RagnarokPlugin { 
	onLoad(): Promise<void>;
}
