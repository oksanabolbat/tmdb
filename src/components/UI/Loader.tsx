import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="mx-auto mt-5">
      <InfinitySpin width="200" color="grey" />
    </div>
  );
};

export default Loader;
