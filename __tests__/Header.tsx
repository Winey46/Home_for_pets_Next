import '@testing-library/jest-dom';
import {getByRole, getByText, render, screen} from "@testing-library/react";
import {describe} from "node:test";
import {userEvent} from "@testing-library/user-event";
import Header from "@/components/Header";

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

  test('should render "Main" link if the logo was clicked', () => {
    render(<Header/>)

    const logo = screen.getByText('Home for Pets', {exact: false})
    userEvent.click(logo)

    const link = screen.getByRole('link', {name: 'Main'})
    expect(link).toBeInTheDocument()
  })

})