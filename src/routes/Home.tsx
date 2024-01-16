import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Head from "components/Head";
import Loader from "components/Loader";
import ReviewItem from "components/ReviewItem";
import useGetReviews from "hooks/useGetReviews";
import { RootState } from "store";

export default function Home() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const token = useSelector((state: RootState) => state.auth.token);
  const { reviews, isLoading } = useGetReviews({
    token,
    sort,
  });

  return (
    <div className="wrapper">
      <Head />
      {isLoading && <Loader />}
      {token ? (
        <>
          {reviews.length === 0 && !isLoading ? (
            <div className="guide">
              <span>아직 작성한 후기가 없어요.</span>
            </div>
          ) : (
            <div className="list-wrapper">
              <div className="list">
                {reviews.map((review, i) => (
                  <ReviewItem review={review} key={i} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="guide">
          <span>로그인 후, 나만의 책 후기를 남겨보세요!</span>
        </div>
      )}
    </div>
  );
}
