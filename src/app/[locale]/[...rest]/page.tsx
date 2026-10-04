import { redirect } from "next/navigation";

type CatchAllProps = {
  params: Promise<{ locale: string }>;
};

// Unknown paths under a locale (e.g. /en/foo) go back to that locale's home page.
export default async function CatchAllPage({ params }: CatchAllProps) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
