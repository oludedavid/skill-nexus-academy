import Link from "next/link";

export default function Logo({
  className,
  logoName,
}: {
  className: string;
  logoName: string;
}) {
  return (
    <Link href={"/"} className={`${className}`}>
      {logoName}
    </Link>
  );
}
