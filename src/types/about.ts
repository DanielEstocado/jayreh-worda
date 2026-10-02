// One file or folder in the About page's project tree.
export type FileNode = {
  name: string;
  type: "file" | "folder";
  description: string;
  children?: FileNode[];
};
