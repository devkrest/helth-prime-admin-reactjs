import * as React from "react";
import "./styles/index.css";

import { EditorContent } from "@tiptap/react";
import { Content, Editor } from "@tiptap/core";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SectionOne } from "./components/section/one";
import { SectionTwo } from "./components/section/two";
import { SectionThree } from "./components/section/three";
import { SectionFour } from "./components/section/four";
import { SectionFive } from "./components/section/five";
import { LinkBubbleMenu } from "./components/bubble-menu/link-bubble-menu";
import { ImageBubbleMenu } from "./components/bubble-menu/image-bubble-menu";
import {
  useMinimalTiptapEditor,
  UseMinimalTiptapEditorProps,
} from "./hooks/use-minimal-tiptap";
import SectionSix from "./components/section/six";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import AddUpdateBlogDetailsDailog from "../dailog/add-update-blog-details/add-update-blog-details";
import { IBlogModel } from "@/model/blog_model";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate" | "onBlur"> {
  value?: Content;
  onValueChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
  blog?: IBlogModel;
}

const Toolbar = ({
  editor,
  open,
  setOpen,
  htmlContent,
  blog,
}: {
  editor: Editor;
  open: boolean;
  htmlContent: string;
  blog?: IBlogModel;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="border-b border-border p-2">
    <div className="flex w-full  items-center justify-between">
      <div className="flex flex- 1 flex-wrap items-center">
        <SectionOne editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionTwo editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionThree editor={editor} />
        <SectionSix editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionFour editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionFive editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
      </div>
      <Button onClick={() => setOpen(true)} variant={"outline"}>
        Next
      </Button>
    </div>

    <Dialog open={open}>
      <AddUpdateBlogDetailsDailog
        blog={blog}
        onClose={() => {
          setOpen(false);
        }}
        htmlContent={htmlContent}
      />
    </Dialog>
  </div>
);

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(
  (
    { value, blog, onValueChange, className, editorContentClassName, ...props },
    ref
  ) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onValueChange,
      ...props,
    });

    const handleClick = () => {
      if (editor && !editor?.isFocused) {
        editor?.chain().focus().run();
      }
    };

    if (!editor) {
      return null;
    }

    // console.log(editor.getHTML());

    const [open, setOpen] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-[85vh] min-h-64 w-full flex-col rounded-md border border-input shadow-sm focus-within:input",
          className
        )}
      >
        <Toolbar
          blog={blog}
          htmlContent={editor.getHTML()}
          editor={editor}
          open={open}
          setOpen={setOpen}
        />

        <ScrollArea className="h-full grow" onClick={handleClick}>
          <EditorContent
            editor={editor}
            className={cn("minimal-tiptap-editor p-5", editorContentClassName)}
          />
        </ScrollArea>

        <LinkBubbleMenu editor={editor} />
        <ImageBubbleMenu editor={editor} />
      </div>
    );
  }
);

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
