import { FunctionComponent } from 'react'

import Card from './Card'
import Input from './Input'

const Pattern: FunctionComponent = () => {
  return (
    <Card>
      <div className="flex flex-col lg:flex-row space-x-2">
        <div className="w-9/12">
          <Input label="pattern" />
        </div>
        <div className="">
          <Input label="flags" />
        </div>
      </div>
    </Card>
  )
}

export default Pattern
