import MenuForm from "../../../../../../features/calendar/components/Common/MenuForm";

export default function MenuCreatePage({ params }: { params: { date: string } }) {
  return <MenuForm date={params.date} />;
}
