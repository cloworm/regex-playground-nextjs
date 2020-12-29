import { FunctionComponent } from 'react'
import Card from './Card'
import Textarea from './Textarea'

const Match: FunctionComponent = () => {
  return (
    <Card>
      <Textarea label="text" />
      <p className="text-right text-theme_textGray text-sm uppercase font-semibold">matches found</p>
    </Card>
  )
}

export default Match
