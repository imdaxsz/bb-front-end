import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { GoArrowUp } from "react-icons/go";

const THROTTLE_WAIT = 300;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * @description 스크롤 위치에 따라 버튼의 렌더링 여부를 설정
   */
  const handleIsVisible = useMemo(
    () =>
      throttle(() => {
        const { scrollY, innerHeight } = window;
        setIsVisible(scrollY > innerHeight);
      }, THROTTLE_WAIT),
    [],
  );

  /**
   * @description 버튼 클릭 시 15ms마다 step만큼 스크롤 이동
   */
  const onClick = () => {
    const scrollStep = -window.scrollY / 20;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        return;
      }
      clearInterval(scrollInterval);
    }, 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleIsVisible);
    return () => {
      window.removeEventListener("scroll", handleIsVisible);
    };
  }, [handleIsVisible]);

  return (
    <>
      {isVisible && (
        <button className="scroll-btn" name="최상단이동" onClick={onClick}>
          <GoArrowUp size={25} />
        </button>
      )}
    </>
  );
}
