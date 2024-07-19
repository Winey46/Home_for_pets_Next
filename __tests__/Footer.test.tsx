import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import Footer from "@/components/Footer";

describe('Footer component unit tests', () => {
  test('should have image with alt text "pets_logo"', () => {
    render(<Footer/>)

    const image = screen.getByAltText('pets_logo')
    expect(image).toBeInTheDocument()
  })

  test('should have text "Home for Pets"', () => {
    render(<Footer/>)

    const text = screen.getByText('Home for Pets')
    expect(text).toBeInTheDocument()
  })

  test('should have text "2024 Creative Web Production"', () => {
    render(<Footer/>)

    const text = screen.getByText('2024 Creative Web Production', {exact: false})
    expect(text).toBeInTheDocument()
  })

  test('should have text "Home for Pets. All rights reserved."', () => {
    render(<Footer/>)

    const text = screen.getByText('Home for Pets. All rights reserved.', {exact: false})
    expect(text).toBeInTheDocument()
  })

  test('should have link "home4pets46@gmail.com"', () => {
    render(<Footer/>)

    const link = screen.getByRole('link',{name: 'home4pets46@gmail.com'})
    expect(link).toBeInTheDocument()
  })

})