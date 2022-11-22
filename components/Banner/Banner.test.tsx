import { render, screen } from '@testing-library/react'
import Banner from './Banner'


describe('Home', () => {
  it('renders a heading',  () => {
    render(<Banner />)

    const heading =  screen.getByText(/Click me/i)

     expect(heading).toBeInTheDocument()
  })
})
