import * as React from 'react'
import type { Editor } from '@tiptap/core'
import { CaretDownIcon, CheckIcon } from '@radix-ui/react-icons'
import { ToolbarButton } from '../toolbar-button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useTheme from '../../hooks/use-theme'
import { CaseSensitive } from 'lucide-react'

interface ColorItem {
  cssVar: string
  label: string
  darkLabel?: string
}

interface ColorPalette {
  label: string
  colors: ColorItem[]
  inverse: string
}

const COLORS: ColorPalette[] = [
  {
    label: 'Palette 1',
    inverse: 'hsl(var(--background))',
    colors: [
      { cssVar: 'hsl(var(--foreground))', label: 'Default' },
      { cssVar: 'var(--mt-accent-bold-blue)', label: 'Bold blue' },
      { cssVar: 'var(--mt-accent-bold-teal)', label: 'Bold teal' },
      { cssVar: 'var(--mt-accent-bold-green)', label: 'Bold green' },
      { cssVar: 'var(--mt-accent-bold-orange)', label: 'Bold orange' },
      { cssVar: 'var(--mt-accent-bold-red)', label: 'Bold red' },
      { cssVar: 'var(--mt-accent-bold-purple)', label: 'Bold purple' }
    ]
  },
  {
    label: 'Palette 2',
    inverse: 'hsl(var(--background))',
    colors: [
      { cssVar: 'var(--mt-accent-gray)', label: 'Gray' },
      { cssVar: 'var(--mt-accent-blue)', label: 'Blue' },
      { cssVar: 'var(--mt-accent-teal)', label: 'Teal' },
      { cssVar: 'var(--mt-accent-green)', label: 'Green' },
      { cssVar: 'var(--mt-accent-orange)', label: 'Orange' },
      { cssVar: 'var(--mt-accent-red)', label: 'Red' },
      { cssVar: 'var(--mt-accent-purple)', label: 'Purple' }
    ]
  },
  {
    label: 'Palette 3',
    inverse: 'hsl(var(--foreground))',
    colors: [
      { cssVar: 'hsl(var(--background))', label: 'White', darkLabel: 'White' },
      { cssVar: 'var(--mt-accent-blue-subtler)', label: 'Blue subtle' },
      { cssVar: 'var(--mt-accent-teal-subtler)', label: 'Teal subtle' },
      { cssVar: 'var(--mt-accent-green-subtler)', label: 'Green subtle' },
      { cssVar: 'var(--mt-accent-yellow-subtler)', label: 'Yellow subtle' },
      { cssVar: 'var(--mt-accent-red-subtler)', label: 'Red subtle' },
      { cssVar: 'var(--mt-accent-purple-subtler)', label: 'Purple subtle' }
    ]
  }
]

const ColorButton: React.FC<{
  color: ColorItem
  isSelected: boolean
  inverse: string
  onClick: (value: string) => void
}> = ({ color, isSelected, inverse, onClick }) => {
  const isDarkMode = useTheme()

  const label = React.useMemo(
    () => (isDarkMode && color.darkLabel ? color.darkLabel : color.label),
    [isDarkMode, color]
  )

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem
            className="relative size-7 rounded-md p-0 border"
            value={color.cssVar}
            aria-label={label}
            style={{ backgroundColor: color.cssVar }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              onClick(color.cssVar)
            }}
          >
            {isSelected && <CheckIcon className="absolute inset-0 m-auto size-6" style={{ color: inverse }} />}
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const ColorPicker: React.FC<{
  palette: ColorPalette
  selectedColor: string
  inverse: string
  onColorChange: (value: string) => void
}> = ({ palette, selectedColor, inverse, onColorChange }) => (
  <ToggleGroup type="single" value={selectedColor} onValueChange={onColorChange} className="gap-1.5">
    {palette.colors.map((color, index) => (
      <ColorButton
        key={index}
        inverse={inverse}
        color={color}
        isSelected={selectedColor === color.cssVar}
        onClick={onColorChange}
      />
    ))}
  </ToggleGroup>
)

export const SectionThree: React.FC<{ editor: Editor }> = ({ editor }) => {
  const color = editor.getAttributes('textStyle')?.color || 'hsl(var(--foreground))'
  const [selectedColor, setSelectedColor] = React.useState(color)

  React.useEffect(() => {
    setSelectedColor(color)
  }, [color])

  const handleColorChange = (value: string) => {
    setSelectedColor(value)
    editor.chain().setColor(value).run()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton tooltip="Text color" aria-label="Text color" className="w-12">
          <CaseSensitive/>
          <CaretDownIcon className="size-5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full" onCloseAutoFocus={event => event.preventDefault()}>
        <div className="space-y-1.5">
          {COLORS.map((palette, index) => (
            <ColorPicker
              key={index}
              palette={palette}
              inverse={palette.inverse}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SectionThree
