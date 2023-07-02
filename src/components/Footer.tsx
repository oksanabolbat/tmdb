const Footer = () => {
  return (
    <footer className="opacity-50 fs-6 container my-2 ">
      <div className="row text-start">
        <div className="col">
          It is open-sourced on{' '}
          <a href="https://github.com/oksanabolbat/tmdb">GitHub</a> and hosted
          on <a href="https://www.netlify.com/"> Netlify</a>
        </div>
        <div className="col text-end">
          Created by Oksana Bolbat, 2023 <br />
          Contact me on{' '}
          <a href="https://www.linkedin.com/in/oksana-bolbat-496787138/">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
