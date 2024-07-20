import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import Navigation from "@/components/Navigation";
import {usePathname} from "next/navigation";

jest.mock("next/navigation")

describe('Navigation component unit tests', () => {

  test('should have 2 list items', () => {

    usePathname.mockReturnValue('/animalsList')

    render(<Navigation/>)

    const items = screen.getAllByRole('listitem',{})
    expect(items).toHaveLength(2)
  })

  test('should render "Animals" link with active class', () => {

    usePathname.mockReturnValue('/animalsList')

    render(<Navigation/>)

    const link = screen.getByText('Animals',{exact: true})
    expect(link).toBeInTheDocument()
    expect(link).toHaveProperty('className', 'text-[#833de7] hover:text-[#fbc43c]')

    const linkHome = screen.getByText('Home',{exact: true})
    expect(linkHome).toBeInTheDocument()
    expect(linkHome).toHaveProperty('className', 'hover:text-[#fbc43c]')
  })

  test('should have 3 list items', () => {

    usePathname.mockReturnValue('/animalsList/-O1lHXu7rjg3n-gDbh5w')

    render(<Navigation/>)

    const items = screen.getAllByRole('listitem',{})
    expect(items).toHaveLength(3)
  })

  test('should render "Animal Details" link with active class', () => {

    usePathname.mockReturnValue('/animalsList/-O1lHXu7rjg3n-gDbh5w')

    render(<Navigation/>)

    const link = screen.getByText('Animal Details',{exact: true})
    expect(link).toBeInTheDocument()
    expect(link).toHaveProperty('className', 'text-[#833de7] hover:text-[#fbc43c] hover:cursor-pointer')

    const linkAnimals = screen.getByText('Animals',{exact: true})
    expect(linkAnimals).toBeInTheDocument()
    expect(linkAnimals).toHaveProperty('className', 'hover:text-[#fbc43c]')

    const linkHome = screen.getByText('Home',{exact: true})
    expect(linkHome).toBeInTheDocument()
    expect(linkHome).toHaveProperty('className', 'hover:text-[#fbc43c]')
  })

  test('should have 2 list items', () => {

    usePathname.mockReturnValue('/information')

    render(<Navigation/>)

    const items = screen.getAllByRole('listitem',{})
    expect(items).toHaveLength(2)
  })

  test('should render "Information" link with active class', () => {

    usePathname.mockReturnValue('/information')

    render(<Navigation/>)

    const link = screen.getByText('Information',{exact: true})
    expect(link).toBeInTheDocument()
    expect(link).toHaveProperty('className', 'text-[#833de7] hover:text-[#fbc43c]')

    const linkHome = screen.getByText('Home',{exact: true})
    expect(linkHome).toBeInTheDocument()
    expect(linkHome).toHaveProperty('className', 'hover:text-[#fbc43c]')
  })
})