import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import AnimalDetails from "@/components/AnimalDetails";
import {PostDataInterface} from "@/utils/interfaces";
import {ReactNode} from "react";

const animal: PostDataInterface = {
  animalType: "dog",
  contacts: "755-47-38",
  date: "[16 : 4] 14.07.2024",
  imageLink: "https://firebasestorage.googleapis.com/v0/b/find-pets-d8559.appspot.com/o/images%2F2149131421-3666a562-0e52-43d9-9ce6-2639b2cc3269?alt=media&token=c13c6e04-35e8-4635-a282-587703d7d1e3",
  imageName: "2149131421-3666a562-0e52-43d9-9ce6-2639b2cc3269",
  text: "frehrhterjhrt",
  title: "dog",
}

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: ReactNode) => <p>State works!</p>
}));

describe('AnimalDetails component unit tests', () => {

  test('should have title "dog"', () => {
    render(<AnimalDetails data={animal}/>)

    const title = screen.getByRole('heading', {name: 'dog', level: 2})
    expect(title).toBeInTheDocument()
  })

  test('should have time tag', () => {
    render(<AnimalDetails data={animal}/>)

    const time = screen.getByRole('time', {})
    expect(time).toBeInTheDocument()
  })

  test('should have image', () => {
    render(<AnimalDetails data={animal}/>)

    const image = screen.getByAltText('dog', {})
    expect(image).toBeInTheDocument()
  })

  test('should have text', () => {
    render(<AnimalDetails data={animal}/>)

    const text = screen.getByText("frehrhterjhrt", {exact: true})
    expect(text).toBeInTheDocument()
  })

  test('should have contacts', () => {
    render(<AnimalDetails data={animal}/>)

    const contacts = screen.getByText("755-47-38", {exact: false})
    expect(contacts).toBeInTheDocument()
  })

  test('should have button "Edit" and "Delete"', () => {
    render(<AnimalDetails data={animal}/>)

    const button1 = screen.getByText("Edit", {exact: true})
    const button2 = screen.getByText("Delete", {exact: true})

    expect(button1).toBeInTheDocument()
    expect(button2).toBeInTheDocument()
  })

  test('should render the modal if the button was clicked', async () => {
    render(<AnimalDetails data={animal}/>)

    const button1 = screen.getByText("Edit", {exact: true})
    await userEvent.click(button1)

    const stateWorks = screen.getByText('State works', {exact: false})
    expect(stateWorks).toBeInTheDocument()
  })

  test('should render the modal if the image was clicked', async () => {
    render(<AnimalDetails data={animal}/>)

    const image = screen.getByAltText('dog', {})
    await userEvent.click(image)

    const stateWorks = screen.getByText('State works', {exact: false})
    expect(stateWorks).toBeInTheDocument()
  })
})