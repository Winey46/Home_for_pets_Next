import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import Filters from "@/components/Filters";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => '/animalsList'),
}))

describe('Filters component unit tests', () => {

  test('should have list with "Animal type" text', () => {
    render(<Filters/>)

    const text = screen.getByText('Animal type', {exact: false})
    expect(text).toBeInTheDocument()
  })

  test('should have list of items', () => {
    render(<Filters/>)

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })

  test('should have list of labels', () => {
    render(<Filters/>)

    const label1 = screen.getByText('Cat')
    const label2 = screen.getByText('Dog')
    const label3 = screen.getByText('Bird')

    expect(label1).toBeInTheDocument()
    expect(label2).toBeInTheDocument()
    expect(label3).toBeInTheDocument()
  })

  test('should have list of inputs', () => {
    render(<Filters/>)

    const inputs = screen.getAllByRole('checkbox')

    expect(inputs).toHaveLength(3)
  })

  test('should have two buttons', () => {
    render(<Filters/>)

    const button1 = screen.getByRole('button',{name: 'Ok'})
    const button2 = screen.getByRole('button',{name: 'Reset'})

    expect(button1).toBeInTheDocument()
    expect(button2).toBeInTheDocument()
  })
})