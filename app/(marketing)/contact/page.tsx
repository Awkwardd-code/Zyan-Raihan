import { redirect } from "next/navigation";

export default function ContactPage() {
  redirect("/?project=start#contact");
}
