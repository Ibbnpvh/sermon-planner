import { Font } from '@react-pdf/renderer'

Font.register({
  family: 'PlayfairDisplay',
  fonts: [
    { src: '/fonts/PlayfairDisplay-Regular.ttf', fontWeight: 'normal',  fontStyle: 'normal' },
    { src: '/fonts/PlayfairDisplay-Bold.ttf',    fontWeight: 'bold',    fontStyle: 'normal' },
    { src: '/fonts/PlayfairDisplay-Italic.ttf',  fontWeight: 'normal',  fontStyle: 'italic' },
  ],
})

Font.register({
  family: 'Lora',
  fonts: [
    { src: '/fonts/Lora-Regular.ttf', fontWeight: 'normal', fontStyle: 'normal' },
    { src: '/fonts/Lora-Bold.ttf',    fontWeight: 'bold',   fontStyle: 'normal' },
    { src: '/fonts/Lora-Italic.ttf',  fontWeight: 'normal', fontStyle: 'italic' },
  ],
})

// Disable font hyphenation
Font.registerHyphenationCallback(word => [word])
