import Sidebar from "@/app/components/sidebar";
import { sliderItems } from "@/data/sliderItems";
import { notFound } from "next/navigation";
import FlipViewer from "@/app/components/FlipViewer";

export function generateStaticParams() {
  return sliderItems
    .map((issue) => issue.pdfurl.split("/").pop()?.replace(".pdf", ""))
    .filter((pdf): pdf is string => Boolean(pdf))
    .map((pdf) => ({ pdf }));
}

const Page = ({ params }: { params: { pdf: string } }) => {
  const issue = sliderItems.find((item) =>
    item.pdfurl.endsWith(`/${params.pdf}.pdf`)
  );
  
  if (!issue) notFound();
  
  return (
    <div className="min-h-screen bg-[#EAB58B]">
      <Sidebar color="#000" />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-28 text-center">
        <h1 className="mb-2 text-4xl font-bold text-[#B22F04]">{issue.name}</h1>
        <p className="mb-8 text-lg text-black">Published in {issue.month} {issue.year}</p>
        <FlipViewer issueSlug={params.pdf} pageCount={issue.pageCount} />
      </main>
    </div>
  );
};

export default Page;