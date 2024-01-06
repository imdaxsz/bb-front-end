import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import BookItem from "components/BookItem";
import Head from "components/Head";
import Loading from "components/Loading";
import useMyBookList from "hooks/useMyBookList";
import { RootState } from "store";

export default function MyBookList({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");

  const {
    filteredBooks,
    getUserMyBookList,
    getSortedUserMyList,
    loading,
    setLoading,
  } = useMyBookList();

  useEffect(() => {
    if (!token) setLoading(false);
    else getUserMyBookList();
  }, [getUserMyBookList, setLoading, token]);

  useEffect(() => {
    if (token) getSortedUserMyList(sort);
  }, [getSortedUserMyList, sort, token]);

  return (
    <div className="wrapper">
      <Head title="관심도서 | 북북" />
      {loading && <Loading />}
      {isAuthenticated ? (
        <>
          {filteredBooks.length === 0 && !loading ? (
            <div className="guide">
              <span>관심 도서가 없어요.</span>
            </div>
          ) : (
            <div className="list-wrapper">
              <div className="list">
                {filteredBooks.map((book, i) => (
                  <BookItem book={book} key={i} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="guide">
          <span>로그인 후, 관심 도서를 추가해보세요!</span>
        </div>
      )}
    </div>
  );
}
