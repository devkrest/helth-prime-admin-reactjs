import type { Editor } from '@tiptap/core'
import React, {  useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface YoutubeEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor
  close: () => void
}

const YoutubeEditBlock = ({ editor, className, close, ...props }: YoutubeEditBlockProps) => {
  const [link, setLink] = useState<string>('')
  const [height, setHeight] = useState<string>('390')
  const [width, setWidth] = useState<string>('640')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editor.commands.setYoutubeVideo({
      src: link,
      width: Math.max(320, parseInt(width, 10)) || 640,
      height: Math.max(180, parseInt(height, 10)) || 480
    })
    close()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn('space-y-6', className)} {...props}>
        <div>
          <Label>Attach an youtube link</Label>
          <div className="flex">
            <Input
              type="url"
              required
              placeholder="https://example.com"
              value={link}
              className="grow"
              onChange={e => setLink(e.target.value)}
            />
          </div>
          <div className="flex gap-x-3 mt-2 mb-6">
            <div className='w-full'>
              <Label>Height</Label>
              <Input
                type="number"
                required
                placeholder="390"
                value={height}
                className="grow"
                onChange={e => setHeight(e.target.value)}
              />
            </div>
            <div className='w-full'>
              <Label>Width</Label>
              <Input
                type="number"
                required
                placeholder="480"
                value={width}
                className="grow"
                onChange={e => setWidth(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="hover:bg-primary hover:opacity-80">
            Submit
          </Button>
        </div>
      </div>
    </form>
  )
}

export { YoutubeEditBlock }
