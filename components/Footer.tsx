import { Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <div className="mt-auto text-center text-md">
      <Link rel="noreferrer" href="email:contact@grams.io" target="_blank">
        contact@grams.io
      </Link>{" "}
      | &nbsp;
      <a
        rel="noreferrer"
        href="https://github.com/ammario/grams.io"
        target="_blank"
      >
        View Source
      </a>
    </div>
  );
};

export default Footer;
