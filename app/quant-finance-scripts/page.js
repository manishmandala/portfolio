import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "Quant Finance Scripts - Manish Mandala",
  description:
    "Quant Finance Scripts case study: Monte Carlo efficient frontier / max Sharpe ratio simulation, and return/volatility/correlation analysis, for a finance club.",
};

export default function QuantFinanceScriptsPage() {
  return <CaseStudy project={getProjectBySlug("quant-finance-scripts")} />;
}
