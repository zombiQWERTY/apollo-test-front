import styled from 'styled-components'
import { Card } from 'react-bootstrap'

export const CustomCard = styled(Card)`
  width: ${props => (props.size === 'full' ? '100%' : '50%')};
  max-width: ${props => (props.size === 'full' ? '100%' : '650px')};
  @media (max-width: 670px) {
    width: 100%;
  }
`
