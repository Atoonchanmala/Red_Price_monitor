import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AppChakraProvider = ({ children }: Props) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

export default AppChakraProvider
