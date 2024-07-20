import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import Heading from "@/components/Heading";

describe('Heading component unit tests', () => {
  test('should have "We are searching pets service." text', () => {
    render(<Heading/>)

    const title = screen.getByRole('heading', {name: 'We are searching pets service.', level: 1})
    expect(title).toBeInTheDocument()
  })

  test('should have "Find a pet" text', () => {
    render(<Heading/>)

    const link = screen.getByRole('link', {name: 'Find a pet'})
    expect(link).toBeInTheDocument()
  })

  test('should have "More information" text', () => {
    render(<Heading/>)

    const link = screen.getByRole('link', {name: 'More information'})
    expect(link).toBeInTheDocument()
  })

  test('should have image', () => {
    render(<Heading/>)

    const image = screen.getByAltText('Dog_image')
    expect(image).toBeInTheDocument()
  })
})
