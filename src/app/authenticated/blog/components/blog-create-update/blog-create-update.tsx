import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { cn } from "@/lib/utils";
import { IBlogModel } from "@/model/blog_model";
import { api_get_by_id_blog } from "@/network/apis/blog_api";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogCreateUpdate() {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlogModel>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    const res = await api_get_by_id_blog({ id });

    if (res && res.s && res.r) {
      setBlog(res.r);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (id) {
      getData();
    }
  }, []);
  return (
    <div className="mt-20 px-6">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <MinimalTiptapEditor
          throttleDelay={2000}
          className={cn("w-full")}
          editorContentClassName="p-5"
          initialContent={blog ? blog.html : ""}
          output="html"
          placeholder="Markdown shortcuts make it easy to format the text while typing.

To test that, start a new line and type # followed by a space to get a heading. Try #, ##, ###, ####, #####, ###### for different levels.
    
Those conventions are called input rules in Tiptap. Some of them are enabled by default. Try > for blockquotes, *, - or + for bullet lists, or `foobar` to highlight code, ~~tildes~~ to strike text, or ==equal signs== to highlight text.
    
You can overwrite existing input rules or add your own to nodes, marks and extensions.
    
For example, we added the Typography extension here. Try typing (c) to see how it’s converted to a proper © character. You can also try ->, >>, 1/2, !=, or --."
          autofocus={true}
          immediatelyRender={true}
          editable={true}
          injectCSS={true}
          shouldRerenderOnTransaction={false}
          editorClassName="focus:outline-none"
          blog={blog}
        />
      )}
    </div>
  );
}

export default BlogCreateUpdate;
