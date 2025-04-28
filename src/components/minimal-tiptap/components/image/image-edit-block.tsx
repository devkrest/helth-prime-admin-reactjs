import type { Editor } from "@tiptap/core";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import { api_blog_upload_file } from "@/network/apis/blog_api";
import { URLs } from "@/network/apis.endpoints";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface ImageEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor;
  close: () => void;
}

const ImageEditBlock = ({
  editor,
  className,
  close,
  ...props
}: ImageEditBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleLink = () => {
    editor.chain().focus().setImage({ src: link, alt: alt }).run();
    close();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsLoading(true);
    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      toast("Please wait for a few seconds.");
      const compressedFile = await imageCompression(files[0], options);
      //console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      const f = new FormData();
      f.append("file", compressedFile, compressedFile.name);
      const d = await api_blog_upload_file(f);
      if (d && d.s && d.r) {
        editor
          .chain()
          .focus()
          .setImage({ alt: alt, src: `${URLs.mediaBaseUrl}blog-media/${d.r}` })
          .run();
      }
      // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }

    // const reader = new FileReader()
    // reader.onload = e => {
    //   const src = e.target?.result as string
    //   editor.chain().setImage({ src }).focus().run()
    // }

    // reader.readAsDataURL(files[0])

    close();
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLink();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("space-y-4", className)} {...props}>
        <div className="space-y-1">
          <Label>
            Alt Text <span className="text-primary">(For SEO)</span> <span className="text-xs text-muted-foreground">Please write this text first and then upload image.</span>
          </Label>
          <Input
            type="text"
            required
            placeholder="Cozmo Health"
            value={alt}
            className="grow"
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>
      
        <div className="space-y-1">
          <Label>Attach an image link</Label>
          <div className="flex">
            <Input
              type="url"
              required
              placeholder="https://example.com"
              value={link}
              className="grow"
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              type="submit"
              className="ml-2 inline-block hover:bg-primary hover:opacity-80"
            >
              Submit
            </Button>
          </div>
        </div>
        <Button
          className="w-full hover:bg-primary hover:opacity-80"
          onClick={handleClick}
        >
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            "Upload from your computer"
          )}
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          multiple
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </form>
  );
};

export { ImageEditBlock };
