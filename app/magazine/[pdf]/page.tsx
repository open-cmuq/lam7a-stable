import Sidebar from "@/app/components/sidebar";
import { sliderItems } from "@/data/sliderItems";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return sliderItems
    .map((issue) => issue.pdfurl.split("/").pop())
    .filter((pdf): pdf is string => Boolean(pdf))
    .map((pdf) => ({ pdf }));
}

const Page = ({ params }: { params: { pdf: string } }) => {
  const issue = sliderItems.find((item) => item.pdfurl.endsWith(`/${params.pdf}`));
  if (!issue) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#EAB58B]">
      <Sidebar color="#000" />
      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-28 text-center">
        <h1 className="mb-4 text-4xl font-bold text-[#B22F04]">{issue.name}</h1>
        <p className="mb-8 text-lg text-black">Published in {issue.month}</p>
        <a
          href={issue.pdfurl}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-[#B22F04] px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          Open PDF
        </a>
        <iframe
          title={`${issue.name} PDF`}
          src={issue.pdfurl}
          className="mt-10 h-[70vh] w-full rounded-md border border-black/20 bg-white"
        />
      </main>
    </div>
  );
};
export default Page;
