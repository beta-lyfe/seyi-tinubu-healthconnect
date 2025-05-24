import { Dropdown } from 'flowbite-react'
import { LucideIcon } from 'lucide-react'
import { useState } from 'react'

type DropDownComponentProps = {
  data: string[]
  defaultlabel: string
  showoptions?: boolean
  icon: LucideIcon
}

export function DropDownComponent({
  data,
  defaultlabel,
  icon: Icon,
  showoptions
}: DropDownComponentProps) {
  const [label, setLabel] = useState(
    `${defaultlabel} ${showoptions ? data[0] : ''}`
  )

  return (
    <div className="p-3 bg-gray-100 rounded-xl">
      <Dropdown
        label={label}
        inline
        onDrop={() => console.log('dropped')}
        renderTrigger={() => (
          <div className="flex gap-3 justify-center items-center cursor-pointer">
            <span className="text-sm text-gray-500 text-nowrap">{label}</span>
            <Icon size={13} />
          </div>
        )}
        style={{
          fontSize: 10
        }}
        className="rounded text-sm p-4"
      >
        {data.map((item) => (
          <Dropdown.Item
            onClick={() =>
              setLabel(`${defaultlabel} ${showoptions ? item : ''}`)
            }
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  )
}
