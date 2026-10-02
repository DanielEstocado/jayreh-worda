import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomButton, CustomHeader } from "@/components";
import ConventionsCard from "./components/ConventionsCard";
import FileStructureCard from "./components/FileStructureCard";
import SpacingScaleCard from "./components/SpacingScaleCard";
import StackCard from "./components/StackCard";
import TypeScaleCard from "./components/TypeScaleCard";

// Documents this template's own folder structure, stack, and conventions, each section its own card driven by constant.ts so it stays data-driven.
export default function AboutScreen() {
  const navigate = useNavigate();

  // Sends the user back to the home screen.
  const handleNavigateToHome = () => navigate("/");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomHeader
        action={
          <CustomButton
            variant="ghost"
            size="md"
            className="subtitle rounded-full"
            onClick={handleNavigateToHome}
          >
            <ChevronLeft size={16} />
            Go Back
          </CustomButton>
        }
      />

      <div className="mx-auto max-w-7xl px-lg py-xl">
        <div className="grid w-full grid-cols-1 gap-lg lg:grid-cols-2">
          <div className="flex flex-col gap-lg">
            <div>
              <span className="subtitle mb-sm inline-block rounded-full bg-primary/10 px-4 py-1 text-caption font-semibold text-primary">
                Template Guide
              </span>
              <h1 className="title text-h1 text-balance">
                How this app is built
              </h1>
              <p className="subtitle mt-md max-w-lg text-body-lg text-muted-foreground">
                A walkthrough of the folder structure, conventions, and stack
                that make this template a reliable starting point.
              </p>
            </div>

            <StackCard />
            <ConventionsCard />
          </div>

          <FileStructureCard />
        </div>

        <div className="mt-lg grid grid-cols-1 gap-lg lg:grid-cols-2">
          <TypeScaleCard />
          <SpacingScaleCard />
        </div>
      </div>
    </main>
  );
}
