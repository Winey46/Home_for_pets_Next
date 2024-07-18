import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {describe} from "node:test";
import Contacts from "@/components/Contacts";

describe('Contacts component unit tests', () => {
  test('should have "Our Contacts:" text', () => {
    render(<Contacts/>)

    const title = screen.getByRole('heading', {name: 'Our Contacts:', level: 2})
    expect(title).toBeInTheDocument()
  })

  test('should have link "E-mail: home4pets46@gmail.com"', () => {
    render(<Contacts/>)

    const link = screen.getByRole('link', {name: 'E-mail: home4pets46@gmail.com'})
    expect(link).toBeInTheDocument()
  })

  test('should have "phone: 955-484-586" text', () => {
    render(<Contacts/>)

    const text = screen.getByText('phone: 955-484-586')
    expect(text).toBeInTheDocument()
  })

  test('should have "address: Lorem ipsum street 46" text', () => {
    render(<Contacts/>)

    const text = screen.getByText('address: Lorem ipsum street 46')
    expect(text).toBeInTheDocument()
  })
})