import ReviewItem from "../components/ReviewItem";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loading from "../components/Loading";
import useGetReviews from "../hooks/useGetReviews";

export default function Home({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const token = useSelector((state: RootState) => state.auth.token);
  const { reviews, getUserReviews, loading, setLoading } = useGetReviews();

  useEffect(() => {
    if (!token) setLoading(false);
    else getUserReviews(sort, token);
  }, [getUserReviews, setLoading, sort, token]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>북북 - 홈</title>
      </Helmet>
      {loading && <Loading />}
      {isAuthenticated ? (
        <>
          {reviews.length === 0 && !loading ? (
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
