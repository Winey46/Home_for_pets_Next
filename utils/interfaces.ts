import React from "react";

export interface InputInterface {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  error?: string | null;
  textarea?: boolean;
  className?: string;
  defaultValue?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextareaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface PostDataInterface {
  id?: string;
  animalType: string;
  title: string;
  text: string;
  date: string;
  contacts: string;
  imageLink?: string | null;
  imageName?: string | null;
}

export interface PostPreviewInterface {
  animalType: string;
  id: string;
  title: string;
  imageLink?: string | null;
}