export type FileType = "File" | "Directory" | "Symlink" | "Unknown";
export interface File {
    hidden: boolean;
    filename: string;
    filepath: string;
    filetype: FileType;
}
