import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {describe} from "node:test";
import MainPageNavigation from "@/components/MainPageNavigation";

describe('MainPageNavigation component unit tests', () => {
  test('should have button "About"', () => {
    render(<MainPageNavigation/>)

    const button = screen.getByRole('button', {name: 'About'})
    expect(button).toBeInTheDocument()
  })

  test('should have button "Contacts"', () => {
    render(<MainPageNavigation/>)

    const button = screen.getByRole('button', {name: 'Contacts'})
    expect(button).toBeInTheDocument()
  })
})