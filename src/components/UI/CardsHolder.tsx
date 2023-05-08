import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CardsHolder: React.FC<Props> = (props) => {
  return (
    <div className="container-fluid pt-4 overflow-auto  rounded-4 mt-4 bg-light">
      <div className="d-flex flex-row flex-nowrap">{props.children}</div>
    </div>
  );
};

export default CardsHolder;
