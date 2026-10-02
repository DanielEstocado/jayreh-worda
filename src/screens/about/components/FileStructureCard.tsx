import { FILE_STRUCTURE } from "../constant";
import AboutCard from "./AboutCard";
import FileTree from "./FileTree";

// The folder layout as a tree, each file or folder with a line on what lives there.
export default function FileStructureCard() {
  return (
    <AboutCard title="File structure">
      <div className="mt-sm">
        <FileTree nodes={FILE_STRUCTURE} />
      </div>
    </AboutCard>
  );
}
