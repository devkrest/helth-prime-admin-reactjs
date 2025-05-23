import * as React from 'react'
import type { Editor } from '@tiptap/core'
import { cn } from '@/lib/utils'
import { DotsHorizontalIcon, FontBoldIcon, FontItalicIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ToolbarButton } from '../toolbar-button'
import { ShortcutKey } from '../shortcut-key'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react'

interface FormatAction {
  label: string
  icon?: React.ReactNode
  action: (editor: Editor) => void
  isActive: (editor: Editor) => boolean
  canExecute: (editor: Editor) => boolean
  shortcut?: string[]
}

const formatActions: FormatAction[] = [
  {
    label: 'Bold',
    icon: <FontBoldIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleBold().run(),
    isActive: editor => editor.isActive('bold'),
    canExecute: editor => editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock')
  },
  {
    label: 'Italic',
    icon: <FontItalicIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleItalic().run(),
    isActive: editor => editor.isActive('italic'),
    canExecute: editor => editor.can().chain().focus().toggleItalic().run() && !editor.isActive('codeBlock')
  },
  {
    label: 'Left',
    icon: <AlignLeft className="size-5" />,
    action: editor => editor.chain().focus().setTextAlign('left').run(),
    isActive: editor => editor.isActive({ textAlign: 'left' }),
    canExecute: editor =>
      editor.can().chain().focus().setTextAlign('left').run() && !editor.isActive({ textAlign: 'left' })
  },
  {
    label: 'Center',
    icon: <AlignCenter className="size-5" />,
    action: editor => editor.chain().focus().setTextAlign('center').run(),
    isActive: editor => editor.isActive({ textAlign: 'center' }),
    canExecute: editor =>
      editor.can().chain().focus().setTextAlign('center').run() && !editor.isActive({ textAlign: 'center' })
  },
  {
    label: 'Right',
    icon: <AlignRight className="size-5" />,
    action: editor => editor.chain().focus().setTextAlign('right').run(),
    isActive: editor => editor.isActive({ textAlign: 'right' }),
    canExecute: editor =>
      editor.can().chain().focus().setTextAlign('right').run() && !editor.isActive({ textAlign: 'right' })
  },
  {
    label: 'Justify',
    icon: <AlignJustify className="size-5" />,
    action: editor => editor.chain().focus().setTextAlign('justify').run(),
    isActive: editor => editor.isActive({ textAlign: 'justify' }),
    canExecute: editor =>
      editor.can().chain().focus().setTextAlign('justify').run() && !editor.isActive({ textAlign: 'right' })
  },
  {
    label: 'Strikethrough',
    action: editor => editor.chain().focus().toggleStrike().run(),
    isActive: editor => editor.isActive('strike'),
    canExecute: editor => editor.can().chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
    shortcut: ['mod', 'shift', 'S']
  },
  {
    label: 'Code',
    action: editor => editor.chain().focus().toggleCode().run(),
    isActive: editor => editor.isActive('code'),
    canExecute: editor => editor.can().chain().focus().toggleCode().run() && !editor.isActive('codeBlock'),
    shortcut: ['mod', 'E']
  },
  {
    label: 'Clear formatting',
    action: editor => editor.chain().focus().unsetAllMarks().run(),
    isActive: () => false,
    canExecute: editor => editor.can().chain().focus().unsetAllMarks().run() && !editor.isActive('codeBlock')
  }
]

export const SectionTwo = ({ editor }: { editor: Editor }) => {
  const mainActions = formatActions.slice(0, 6)
  const dropdownActions = formatActions.slice(6)

  const renderToolbarButton = (action: FormatAction) => (
    <ToolbarButton
      key={action.label}
      onClick={() => action.action(editor)}
      // disabled={!action.canExecute(editor)}
      // isActive={action.isActive(editor)}
      tooltip={action.label}
      aria-label={action.label}
    >
      {action.icon}
    </ToolbarButton>
  )

  const renderDropdownMenuItem = (action: FormatAction) => (
    <DropdownMenuItem
      key={action.label}
      onClick={() => action.action(editor)}
      disabled={!action.canExecute(editor)}
      className={cn('flex flex-row items-center justify-between gap-4', { 'bg-accent': action.isActive(editor) })}
      aria-label={action.label}
    >
      <span className="grow">{action.label}</span>
      {action.shortcut && <ShortcutKey keys={action.shortcut} />}
    </DropdownMenuItem>
  )

  return (
    <>
      {mainActions.map(renderToolbarButton)}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ml-2">
          <ToolbarButton
            // isActive={dropdownActions.some(action => action.isActive(editor))}
            tooltip="More formatting"
            aria-label="More formatting"
          >
            <DotsHorizontalIcon className="size-5" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full" onCloseAutoFocus={event => event.preventDefault()}>
          {dropdownActions.map(renderDropdownMenuItem)}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default SectionTwo
