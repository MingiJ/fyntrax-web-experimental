import { IBrand } from "./types";
import Image from "next/image";

const Brand = ({ horizontal }: IBrand) => {
  return (
    <div
      className={`flex gap-2 `}
    >
      <Image
        src="/fyntrax-logo.svg"
        alt="Fyntrax Logo"
        height={18}
        width={22.5}
      />

      <p className="font-bold text-base font-serif">Fyntrax</p>
    </div>
  );
};

export default Brand;
