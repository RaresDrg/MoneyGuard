import { useNavigate } from "react-router-dom";
import { useIntroScreen } from "../../hooks";
import { IntroScreen, GoogleButton } from "../../components";
import { Section, Logo } from "../../components/common";

type Props = {
  className?: string;
};

const HomePage = ({ className }: Props) => {
  const navigate = useNavigate();
  const { showIntro, onIntroEnd } = useIntroScreen();

  if (showIntro) return <IntroScreen onSceneClose={onIntroEnd} />;

  return (
    <Section className={className}>
      <div>
        <Logo />
        <p className="hero-text">
          Start your saving journey and shape your future. Track every
          transaction, understand your habits, and build financial clarity.
        </p>
        <div className="auth-group">
          <button
            type="button"
            className="cta"
            onClick={() => navigate("/register")}
          >
            Register now
          </button>
          <p className="login-prompt">
            <span>Already have an account ?</span>
            <span onClick={() => navigate("/login")}>Log in</span>
            <span>or</span>
          </p>
          <GoogleButton />
        </div>
      </div>
    </Section>
  );
};

export default HomePage;
