import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-books";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  return {
    paths: ["1", "2", "3", "4", "5"].map((id) => ({
      params: { id },
    })),
    fallback: true,
    // false : 404
    // blocking : SSR 방식
    // true : SSR 방식 + 데이터가 없는 폴백 상태의 페이지 부터 반환
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>로딩 중...</div>;
  }

  if (!book) {
    return <div>책 정보를 불러오는 데 실패했습니다.</div>;
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}> {subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
