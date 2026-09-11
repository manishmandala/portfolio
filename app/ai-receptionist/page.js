import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "AI Receptionist - Manish Mandala",
  description:
    "AI Receptionist case study: n8n workflows using Claude, Gmail, Supabase, and Telegram to triage email and coordinate transactions for a real estate agent.",
};

export default function AiReceptionistPage() {
  return <CaseStudy project={getProjectBySlug("ai-receptionist")} />;
}
