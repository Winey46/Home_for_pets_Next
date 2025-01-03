import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Filters from "@/components/Filters";
import { IUser } from "@/utils/interfaces";
import { userEvent } from "@testing-library/user-event";

const user: IUser = {
  data: {
    expires: new Date().toISOString(),
    user: {
      email: "some_email",
      id: "some_id",
      image: {
        imageName: "some_image_name",
        imageLink: "some_image_link",
      },
      name: "some_name",
    },
  },
  status: "authenticated",
};

jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    return { getAll: () => [], get: () => "" };
  },
  useRouter: () => {
    return { replace: () => null };
  },
  usePathname: () => "/animalsList",
}));

jest.mock("next-auth/react", () => ({
  useSession: () => null,
}));

describe("Filters component unit tests", () => {
  test('should have "Filters" text', () => {
    render(<Filters />);

    const text = screen.getByText("Filters", { exact: false });
    expect(text).toBeInTheDocument();
  });

  test('should have list with "Animal type" text', async () => {
    render(<Filters />);

    const filtersText = screen.getByText("Filters", { exact: false });
    await userEvent.click(filtersText);

    const text = screen.getByText("Animal type", { exact: false });
    expect(text).toBeInTheDocument();
  });

  test('should have list of items', async () => {
    render(<Filters/>)

    const filtersText = screen.getByText("Filters", { exact: false });
    await userEvent.click(filtersText);

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })

  // test('should have list of labels', () => {
  //   render(<Filters/>)

  //   const label1 = screen.getByText('Cat')
  //   const label2 = screen.getByText('Dog')
  //   const label3 = screen.getByText('Bird')

  //   expect(label1).toBeInTheDocument()
  //   expect(label2).toBeInTheDocument()
  //   expect(label3).toBeInTheDocument()
  // })

  // test('should have list of inputs', () => {
  //   render(<Filters/>)

  //   const inputs = screen.getAllByRole('checkbox')

  //   expect(inputs).toHaveLength(3)
  // })

  // test('should have two buttons', () => {
  //   render(<Filters/>)

  //   const button1 = screen.getByRole('button',{name: 'Ok'})
  //   const button2 = screen.getByRole('button',{name: 'Reset'})

  //   expect(button1).toBeInTheDocument()
  //   expect(button2).toBeInTheDocument()
  // })
});
