import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import InformationPage from "@/app/information/page";
import {information} from "@/utils/texts";

describe('Information component unit tests', () => {

  test('should have information text', () => {
    render(<InformationPage/>)

    const text = screen.getByText('Lorem ipsum', {exact: false})
    expect(text).toBeInTheDocument()
  })
})