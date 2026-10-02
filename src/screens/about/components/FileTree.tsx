import type { FileNode } from "@/types/about";

type FileTreeProps = {
  nodes: FileNode[];
  depth?: number;
};

// Recursively renders a file/folder tree with its description, indenting one level per nesting depth.
export default function FileTree({ nodes, depth = 0.5 }: FileTreeProps) {
  return (
    <div style={{ paddingLeft: depth * 16 }}>
      {nodes.map((node) => (
        <div key={node.name}>
          <div className="flex flex-col py-2 gap-2">
            <span className="font-mono text-sm text-primary shrink-0 font-bold">
              {node.name}
            </span>
            <span className="text-xs" style={{ paddingLeft: depth * 16 }}>
              {node.description}
            </span>
          </div>

          {node.children && (
            <FileTree nodes={node.children} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}
