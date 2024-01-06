import { Helmet } from "react-helmet-async";

interface Props {
  title?: string;
  description?: string;
}

export default function Head({ title = "북북", description }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={
          description
            ? description
            : "북북에서 책 후기를 남기고, 다음에 읽을 책을 추천받아보세요!"
        }
      />
    </Helmet>
  );
}
