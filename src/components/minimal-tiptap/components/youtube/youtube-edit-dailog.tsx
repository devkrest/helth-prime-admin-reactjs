import type { Editor } from '@tiptap/core'
import { useState } from 'react'
import { ToolbarButton } from '../toolbar-button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Youtube } from 'lucide-react'
import { YoutubeEditBlock } from './youtube-edit-block';

const YoutubeEditDialog = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton isActive={editor.isActive('youtube')} tooltip="Youtube" aria-label="Youtube">
          <Youtube className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Youtube Link</DialogTitle>
        </DialogHeader>
        <YoutubeEditBlock editor={editor} close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export { YoutubeEditDialog }
