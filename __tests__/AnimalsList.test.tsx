import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import AnimalsList from "@/components/AnimalsList";
import { IPostData, IUser } from "@/utils/interfaces";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const animals: IPostData[] = [
  {
    _id: "some_animal_id",
    animalType: "cat",
    contacts: "755-47-38",
    date: "[16 : 3] 14.07.2024",
    image: {
      imageLink:
        "https://firebasestorage.googleapis.com/v0/b/find-pets-d8559.appspot.com/o/images%2Fkitty-cat-cute-animal-pet-portrait-wallpaper-preview-ead19d77-4b7c-44ef-965e-d1512229df39?alt=media&token=950f611c-7b9d-4fc9-a257-c28298f5eb19",
      imageName:
        "kitty-cat-cute-animal-pet-portrait-wallpaper-preview-ead19d77-4b7c-44ef-965e-d1512229df39",
    },
    text: "grherher",
    title: "cat",
  },
];

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
  useSession: () => user,
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("AnimalsList component unit tests", () => {
  test('should renders paragraph "There are no available pets"', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<AnimalsList />);

    const element = screen.getByText("There are no available pets", {
      exact: false,
    });
    expect(element).toBeInTheDocument();
  });

  test("should renders the list", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: animals,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<AnimalsList />);

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
  });

  test("should renders the list of items", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: animals,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    render(<AnimalsList />);

    await waitFor(() => {
      const item = screen.getByRole("listitem");

      expect(item).toBeInTheDocument();
    });
  });
});
