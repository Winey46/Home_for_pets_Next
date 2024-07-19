import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import Header from "@/components/Header";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => '/'),
}))

describe('Header component unit tests', () => {

  test('should have image', () => {
    render(<Header/>)

    const image = screen.getByAltText('pets_logo')
    expect(image).toBeInTheDocument()
  })

  test('should have "Home for Pets" text', () => {
    render(<Header/>)

    const text = screen.getByText('Home for Pets')
    expect(text).toBeInTheDocument()
  })

  test('should have "Add Post+" button', () => {
    render(<Header/>)

    const button = screen.getByText('Add Post', {exact: false})
    expect(button).toBeInTheDocument()
  })

  test('should render the list of links if the logo was clicked', async () => {
    render(<Header/>)

    const logo = screen.getByTestId('header-logo')
    await userEvent.click(logo)

    screen.debug()

    const links = screen.getAllByRole('listitem')
    expect(links).toHaveLength(3)
  })

  // test('should render dialog if the button was clicked', async () => {
  //   render(<Header/>)
  //
  //   const button = screen.getByText('Add Post', {exact: false})
  //   await userEvent.click(button)
  //
  //   screen.debug()
  // })

})