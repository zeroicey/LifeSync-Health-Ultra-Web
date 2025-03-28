import { Props } from "@/types/setting";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function ContactPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <div>Hello, this is Contact Page</div>;
}
