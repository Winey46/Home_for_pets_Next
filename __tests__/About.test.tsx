import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import About from '../components/About';
import {describe} from "node:test";
import {about} from "../utils/texts";

describe('About component unit tests', () => {
  test('should have our mission text', () => {
    render(<About/>)

    const ourMission = screen.getByRole('heading', {name: 'Our Mission', level: 2})
    expect(ourMission).toBeInTheDocument()
  })

  test('should have about text', () => {
    render(<About/>)

    const ourMissionText = screen.getByText(about, {exact: true})
    expect(ourMissionText).toBeInTheDocument()
  });
})
