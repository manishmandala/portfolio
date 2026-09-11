import { CaseStudy } from "@/components/case-study";
import { getProjectBySlug } from "@/lib/projects-data";

export const metadata = {
  title: "Hand-Tracking Laser Turret - Manish Mandala",
  description:
    "Hand-Tracking Laser Turret case study: MediaPipe hand tracking on a PC drives an Arduino-controlled pan/tilt laser turret over serial.",
};

export default function LaserTurretPage() {
  return <CaseStudy project={getProjectBySlug("laser-turret")} />;
}
