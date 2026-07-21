import Image from "next/image";

type BrandLogoProps = {
  variant?: "en" | "cn";
  className?: string;
};

export function BrandLogo({ variant = "en", className = "" }: BrandLogoProps) {
  const src = variant === "cn" ? "/origin-vector-logo-cn.webp" : "/origin-vector-logo-en.webp";
  const alt = variant === "cn" ? "Origin Vector 原点向量 logo" : "Origin Vector logo";

  return <Image src={src} alt={alt} className={className} width={512} height={512} priority={variant === "cn"} unoptimized />;
}
