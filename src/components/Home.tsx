import ReviewItem from "./ReviewItem";

export default function Home() {
  return (
    <div className="wrapper">
      {/* <div className="guide">
        <span>로그인 후, 나만의 책 후기를 남겨보세요!</span>
      </div> */}
      <div className="list-wrapper">
        <div className="list">
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
          <ReviewItem score={3} />
        </div>
      </div>
    </div>
  );
}
