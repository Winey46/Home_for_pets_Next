import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import AnimalsList from "@/components/AnimalsList";
import {PostDataInterface} from "@/utils/interfaces";

const animals: { [key: string]: PostDataInterface; } = {
  ['-O1lKtLwSyl5x2ZSFIUC']: {
    animalType: "cat",
    contacts: "755-47-38",
    date: "[16 : 3] 14.07.2024",
    imageLink: "https://firebasestorage.googleapis.com/v0/b/find-pets-d8559.appspot.com/o/images%2Fkitty-cat-cute-animal-pet-portrait-wallpaper-preview-ead19d77-4b7c-44ef-965e-d1512229df39?alt=media&token=950f611c-7b9d-4fc9-a257-c28298f5eb19",
    imageName: "kitty-cat-cute-animal-pet-portrait-wallpaper-preview-ead19d77-4b7c-44ef-965e-d1512229df39",
    text: "grherher",
    title: "cat",
  }
}

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => {
    return {getAll: jest.fn(() => [])}
  }),
}))

describe('AnimalsList component unit tests', () => {

  test('should renders paragraph "There are no available pets"', () => {
    render(<AnimalsList animals={{}}/>)

    const element = screen.getByText('There are no available pets', {exact: false})
    expect(element).toBeInTheDocument()
  })

  test('should renders the list', () => {
    render(<AnimalsList animals={animals}/>)

    const list = screen.getByRole('list')

    expect(list).toBeInTheDocument()
  })

  test('should renders the list of items', () => {
    render(<AnimalsList animals={animals}/>)

    const item = screen.getByRole('listitem')

    expect(item).toBeInTheDocument()
  })
})