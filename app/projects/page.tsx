import { ProjectsGallery, type Project } from "@/components/layout/projects-gallery";

const projects: Project[] = [
  {
    id: "finance-portal",
    title: "Client Portal for Financial Services",
    image: "/IMG_8906.JPG",
    summary:
      "Secure client portal with custom dashboards and document management for a financial services firm.",
    href: "#",
  },
  {
    id: "reco-engine",
    title: "E‑commerce Recommendation Engine",
    image: "/vite.svg",

    summary:
      "Intelligent product recommendation engine built for an e‑commerce platform.",
    href: "#",
  },
  {
    id: "healthcare",
    title: "Healthcare Management System",
    image: "/IMG_8906.JPG",
    summary:
      "Comprehensive patient management system designed for a network of clinics.",
    href: "#",
  },
  {
    id: "fitness-app",
    title: "Cross‑platform Fitness App",
    image: "/IMG_8906.JPG",
    summary:
      "Fitness application with personalized workout plans, nutrition tracking, and social features.",
    href: "#",
  },
];

export default function ProjectsPage() {
  return <ProjectsGallery projects={projects} />;
}

