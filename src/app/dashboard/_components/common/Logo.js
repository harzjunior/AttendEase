import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={"/logo.svg"} height={200} width={75} alt="logo" priority />
    </Link>
  );
};

export default Logo;
