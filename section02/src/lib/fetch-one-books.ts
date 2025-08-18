import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = `https://onebite-books-server-main-iy745dv0x-seoungminhwangs-projects.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
