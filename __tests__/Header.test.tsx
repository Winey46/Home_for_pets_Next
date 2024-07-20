import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import Header from "@/components/Header";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

jest.mock("next/navigation")

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: ReactNode) => <p>State works!</p>
}));

describe('Header component unit tests', () => {

  test('should have image', () => {
    render(<Header/>)

    const image = screen.getByAltText('pets_logo', {})
    expect(image).toBeInTheDocument()
  })

  test('should have "Home for Pets" text', () => {
    render(<Header/>)

    const text = screen.getByText('Home for Pets', {})
    expect(text).toBeInTheDocument()
  })

  test('should have "Add Post+" button', () => {
    render(<Header/>)

    const button = screen.getByText('Add Post', {exact: false})
    expect(button).toBeInTheDocument()
  })

  test('should render the list of links if the logo was clicked', async () => {

    usePathname.mockReturnValue('/')

    render(<Header/>)

    const logo = screen.getByTestId('header-logo', {})
    await userEvent.click(logo)

    const links = screen.getAllByRole('listitem', {})
    expect(links).toHaveLength(3)
  })

  test('should render the modal if the "Add Post" button was clicked', async () => {

    usePathname.mockReturnValue('/')

    render(<Header/>)

    const addPostBtn = screen.getByText('Add Post', {exact: false})
    await userEvent.click(addPostBtn)

    const stateWorksText = screen.getByText('State works', {exact: false})
    expect(stateWorksText).toBeInTheDocument()
  })

  test('should render active class on link "Home"', async () => {

    usePathname.mockReturnValue('/')

    render(<Header/>)

    const logo = screen.getByTestId('header-logo', {})
    await userEvent.click(logo)

    const link = screen.getByText('Home', {exact: true})
    expect(link).toHaveProperty('className', 'text-[#833de7] hover:text-[#fbc43c]')
  })

  test('should render not-active class on link "Home"', async () => {

    usePathname.mockReturnValue('/animalsList')

    render(<Header/>)

    const logo = screen.getByTestId('header-logo', {})
    await userEvent.click(logo)

    const link = screen.getByText('Home', {exact: true})
    expect(link).toHaveProperty('className', 'hover:text-[#fbc43c]')
  })

  test('should render active class on link "Looking for home"', async () => {

    usePathname.mockReturnValue('/animalsList')

    render(<Header/>)

    const logo = screen.getByTestId('header-logo', {})
    await userEvent.click(logo)

    const link = screen.getByText('Looking for home', {exact: true})
    expect(link).toHaveProperty('className', 'text-[#833de7] hover:text-[#fbc43c]')
  })

  test('should render not-active class on link "Looking for home"', async () => {

    usePathname.mockReturnValue('/')

    render(<Header/>)

    const logo = screen.getByTestId('header-logo', {})
    await userEvent.click(logo)

    const link = screen.getByText('Looking for home', {exact: true})
    expect(link).toHaveProperty('className', 'hover:text-[#fbc43c]')
  })

  test('should render active class on link "Information"', async () => {

    usePathname.mockReturnValue('/information')

    render(<Header/>)

    const logo = screen.getByTestId('header-logo', {})
    await userEvent.click(logo)

    const link = screen.getByText('Information', {exact: true})
    expect(link).toHaveProperty('className', 'text-[#833de7] hover:text-[#fbc43c]')
  })

  test('should render not-active class on link "Information"', async () => {

    usePathname.mockReturnValue('/')

    render(<Header/>)

    const logo = screen.getByTestId('header-logo', {})
    await userEvent.click(logo)

    const link = screen.getByText('Information', {exact: true})
    expect(link).toHaveProperty('className', 'hover:text-[#fbc43c]')
  })
})
