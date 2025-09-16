"use client";

import { FileText, Edit3, Eye, FolderX, Move, Loader2 } from "lucide-react";

interface ToolInvocation {
  toolCallId: string;
  args: Record<string, any>;
  toolName: string;
  state: "result" | string;
  result?: any;
}

interface ToolInvocationDisplayProps {
  toolInvocation: ToolInvocation;
}

function getFileNameFromPath(path: string): string {
  return path.split("/").pop() || path;
}

function getToolMessage(toolInvocation: ToolInvocation): { message: string; icon: React.ReactNode } {
  const { toolName, args } = toolInvocation;

  switch (toolName) {
    case "str_replace_editor": {
      const command = args.command;
      const fileName = args.path ? getFileNameFromPath(args.path) : "file";

      switch (command) {
        case "create":
          return {
            message: `Creating ${fileName}`,
            icon: <FileText className="w-3 h-3" />
          };
        case "str_replace":
          return {
            message: `Editing ${fileName}`,
            icon: <Edit3 className="w-3 h-3" />
          };
        case "insert":
          return {
            message: `Editing ${fileName}`,
            icon: <Edit3 className="w-3 h-3" />
          };
        case "view":
          return {
            message: `Viewing ${fileName}`,
            icon: <Eye className="w-3 h-3" />
          };
        default:
          return {
            message: `Working on ${fileName}`,
            icon: <FileText className="w-3 h-3" />
          };
      }
    }

    case "file_manager": {
      const command = args.command;
      const fileName = args.path ? getFileNameFromPath(args.path) : "file";
      const newFileName = args.new_path ? getFileNameFromPath(args.new_path) : "";

      switch (command) {
        case "delete":
          return {
            message: `Deleting ${fileName}`,
            icon: <FolderX className="w-3 h-3" />
          };
        case "rename":
          return {
            message: newFileName ? `Moving to ${newFileName}` : `Renaming ${fileName}`,
            icon: <Move className="w-3 h-3" />
          };
        default:
          return {
            message: `Managing ${fileName}`,
            icon: <FileText className="w-3 h-3" />
          };
      }
    }

    default:
      return {
        message: toolName.replace(/_/g, " "),
        icon: <FileText className="w-3 h-3" />
      };
  }
}

export function ToolInvocationDisplay({ toolInvocation }: ToolInvocationDisplayProps) {
  const { message, icon } = getToolMessage(toolInvocation);
  const isCompleted = toolInvocation.state === "result" && toolInvocation.result;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isCompleted ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600 flex-shrink-0" />
      )}

      <div className="flex items-center gap-1.5 text-neutral-700">
        {icon}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}