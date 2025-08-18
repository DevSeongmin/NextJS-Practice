import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url =
    "https://onebite-books-server-main-iy745dv0x-seoungminhwangs-projects.vercel.app/book";

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
