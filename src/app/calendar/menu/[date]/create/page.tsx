import MenuForm from "../../../../../features/calendar/MenuForm";

type PageProps = {
  params: Promise<{ date: string }>;
};

export default async function MenuCreatePage({ params }: PageProps) {
  const resolvedParams = await params;
  const date = resolvedParams.date;

  return <MenuForm date={date} />;
}
