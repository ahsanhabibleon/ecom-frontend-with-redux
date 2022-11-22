import { render, screen } from '@testing-library/react'
import MainLayout from './MainLayout'

test('Component renders correctly', () => {
  render(<MainLayout />)
  const elem = screen.getByTestId('gulu')
  expect(elem).toBeInTheDocument()
})
