import { getCloudinaryVideo } from "../../utils";
import { Section } from "../../components/common";

type Props = {
  className?: string;
};

const NotFoundPage = ({ className }: Props) => {
  const { src, poster } = getCloudinaryVideo("not-found");

  return (
    <Section
      className={className}
      backgrounds={{ m: "none", t: "none", d: "none" }}
    >
      <div>
        <video autoPlay muted loop preload="auto" poster={poster} playsInline>
          <source src={src} type="video/mp4" />
        </video>
        <h1>Page not found</h1>
        <span className="status">404</span>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
      </div>
    </Section>
  );
};

export default NotFoundPage;
