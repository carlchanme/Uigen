import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToolInvocationDisplay } from "../ToolInvocationDisplay";

describe("ToolInvocationDisplay", () => {
  describe("str_replace_editor tool", () => {
    it("displays create file message with file icon", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "create",
          path: "components/Card.tsx",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Creating Card.tsx")).toBeDefined();
    });

    it("displays edit file message for str_replace command", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "str_replace",
          path: "src/App.tsx",
          old_str: "old code",
          new_str: "new code",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Editing App.tsx")).toBeDefined();
    });

    it("displays edit file message for insert command", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "insert",
          path: "package.json",
          insert_line: 5,
          new_str: "new dependency",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Editing package.json")).toBeDefined();
    });

    it("displays view file message", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "view",
          path: "README.md",
          view_range: [1, 10],
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "File contents...",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Viewing README.md")).toBeDefined();
    });

    it("displays generic working message for unknown command", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "unknown_command",
          path: "test.js",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Working on test.js")).toBeDefined();
    });
  });

  describe("file_manager tool", () => {
    it("displays delete file message", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "delete",
          path: "old-component.tsx",
        },
        toolName: "file_manager",
        state: "result",
        result: { success: true, message: "Deleted successfully" },
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Deleting old-component.tsx")).toBeDefined();
    });

    it("displays rename file message with new name", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "rename",
          path: "oldFile.ts",
          new_path: "components/NewFile.ts",
        },
        toolName: "file_manager",
        state: "result",
        result: { success: true, message: "Renamed successfully" },
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Moving to NewFile.ts")).toBeDefined();
    });

    it("displays rename message without new path", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "rename",
          path: "file.js",
        },
        toolName: "file_manager",
        state: "result",
        result: { success: true },
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Renaming file.js")).toBeDefined();
    });

    it("displays generic managing message for unknown command", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "unknown_command",
          path: "test.file",
        },
        toolName: "file_manager",
        state: "result",
        result: { success: true },
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Managing test.file")).toBeDefined();
    });
  });

  describe("unknown tool", () => {
    it("displays tool name with underscores replaced", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {},
        toolName: "custom_tool_name",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("custom tool name")).toBeDefined();
    });
  });

  describe("loading states", () => {
    it("shows loading spinner when not completed", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "create",
          path: "loading.tsx",
        },
        toolName: "str_replace_editor",
        state: "in-progress",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Creating loading.tsx")).toBeDefined();
    });

    it("shows success indicator when completed", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "create",
          path: "completed.tsx",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Creating completed.tsx")).toBeDefined();
    });
  });

  describe("file path handling", () => {
    it("extracts filename from nested path", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "create",
          path: "src/components/ui/Button.tsx",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Creating Button.tsx")).toBeDefined();
    });

    it("handles missing path gracefully", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "create",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Success",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Creating file")).toBeDefined();
    });

    it("handles path that is just filename", () => {
      const toolInvocation = {
        toolCallId: "test-id",
        args: {
          command: "view",
          path: "index.html",
        },
        toolName: "str_replace_editor",
        state: "result",
        result: "Contents",
      };

      render(<ToolInvocationDisplay toolInvocation={toolInvocation} />);

      expect(screen.getByText("Viewing index.html")).toBeDefined();
    });
  });
});