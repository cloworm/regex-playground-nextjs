import { atom } from 'recoil'

interface RegEx {
  pattern: string
  flags: string
}

const regexState = atom<RegEx>({
  key: 'regexState',
  default: {
    pattern: '',
    flags: ''
  }
})

export default regexState
