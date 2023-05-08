import { useNavigate } from 'react-router-dom';

const BtnBack = () => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-dark px-5 text-uppercase mt-4"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};

export default BtnBack;
