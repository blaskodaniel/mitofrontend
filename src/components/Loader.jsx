import { CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <div className="loader">
      Loading. Please wait...
      <CircularProgress />
    </div>
  );
};

export default Loader;
