import { FC } from "react";
import Image from "next/image";

const loading: FC = () => {
  return (
    <div className="flex justify-center">
      <Image
        src="/spinner.svg"
        alt="Loading spinner"
        width={100}
        height={100}
      />
    </div>
  );
};

export default loading;
