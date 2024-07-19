import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import AnimalCart from "@/components/AnimalCart";

const to = '/animalsList/-O1lKtLwSyl5x2ZSFIUC'
const imgSrc = 'https://firebasestorage.googleapis.com/v0/b/find-pets-d8559.appspot.com/o/images%2Fkitty-cat-cute-animal-pet-portrait-wallpaper-preview-ead19d77-4b7c-44ef-965e-d1512229df39?alt=media&token=950f611c-7b9d-4fc9-a257-c28298f5eb19'

describe('AnimalCart component unit tests', () => {

  test('should render the link', () => {
    render(<AnimalCart to={to} imgSrc={imgSrc} title='cat'/>)

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })

  test('should render the image', () => {
    render(<AnimalCart to={to} imgSrc={imgSrc} title='cat'/>)

    const image = screen.getByAltText('animal_image')
    expect(image).toBeInTheDocument()
  })

  test('should not render the title', async () => {
    render(<AnimalCart to={to} imgSrc={imgSrc} title='cat'/>)

    const text = screen.queryByText('cat')
    expect(text).toBeNull()
  })

  test('should render the title when hover link', async () => {
    render(<AnimalCart to={to} imgSrc={imgSrc} title='cat'/>)

    const link = screen.getByRole('link')
    await userEvent.hover(link)

    const text = screen.getByText('cat')
    expect(text).toBeInTheDocument()
  })
})