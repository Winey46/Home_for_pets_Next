import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import NewPost from "@/components/NewPost";
import {PostDataInterface} from "@/utils/interfaces";

const animal: PostDataInterface = {
  id: '-O1lHXu7rjg3n-gDbh5w',
  animalType: "dog",
  contacts: "755-47-38",
  date: "[16 : 4] 14.07.2024",
  imageLink: "https://firebasestorage.googleapis.com/v0/b/find-pets-d8559.appspot.com/o/images%2F2149131421-3666a562-0e52-43d9-9ce6-2639b2cc3269?alt=media&token=c13c6e04-35e8-4635-a282-587703d7d1e3",
  imageName: "2149131421-3666a562-0e52-43d9-9ce6-2639b2cc3269",
  text: "frehrhterjhrt",
  title: "dog",
}

describe('NewPost component unit tests', () => {

  test('should have title', () => {
    render(<NewPost/>)

    const title = screen.getByText('New Post', {exact: false})
    expect(title).toBeInTheDocument()
  })

  test('should have 3 inputs', () => {
    render(<NewPost/>)

    const input1 = screen.getByPlaceholderText('Enter type of your animal', {exact: false})
    expect(input1).toBeInTheDocument()

    const input2 = screen.getByPlaceholderText('Enter your title', {exact: false})
    expect(input2).toBeInTheDocument()

    const input3 = screen.getByPlaceholderText('Enter your contacts', {exact: false})
    expect(input3).toBeInTheDocument()
  })

  test('should have text area', () => {
    render(<NewPost/>)

    const textArea = screen.getByPlaceholderText('Enter your message', {exact: false})
    expect(textArea).toBeInTheDocument()
  })

  test('should have input with type - "file"', () => {
    render(<NewPost/>)

    const inputFile = screen.getByPlaceholderText('Choose an image', {exact: false})
    expect(inputFile).toBeInTheDocument()
  })

  test('should have 5 labels', () => {
    render(<NewPost/>)

    const label1 = screen.getByText('Animal Type', {exact: false})
    expect(label1).toBeInTheDocument()

    const label2 = screen.getByText('Title', {exact: false})
    expect(label2).toBeInTheDocument()

    const label3 = screen.getByText('Text', {exact: false})
    expect(label3).toBeInTheDocument()

    const label4 = screen.getByText('Contacts', {exact: false})
    expect(label4).toBeInTheDocument()

    const label5 = screen.getByText('Choose an image', {exact: false})
    expect(label5).toBeInTheDocument()
  })

  test('should have button "Save" and "Cancel"', () => {
    render(<NewPost/>)

    const button1 = screen.getByText('Save', {exact: false})
    expect(button1).toBeInTheDocument()

    const button2 = screen.getByText('Cancel', {exact: false})
    expect(button2).toBeInTheDocument()
  })

  test('should have title "Edit Post"', () => {
    render(<NewPost postData={animal}/>)

    const title = screen.getByText('Edit Post', {exact: false})
    expect(title).toBeInTheDocument()
  })

  test('should have input values', () => {
    render(<NewPost postData={animal}/>)

    const input12 = screen.getAllByDisplayValue('dog', {exact: false})
    expect(input12).toHaveLength(2)

    const input3 = screen.getByDisplayValue('frehrhterjhrt', {exact: false})
    expect(input3).toBeInTheDocument()

    const input4 = screen.getByDisplayValue('755-47-38', {exact: false})
    expect(input4).toBeInTheDocument()
  })

  test('should have image', () => {
    render(<NewPost postData={animal}/>)

    const image = screen.getByAltText('animal_image', {exact: false})
    expect(image).toBeInTheDocument()
  })
})