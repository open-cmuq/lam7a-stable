import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import PhotoWall from "../components/PhotoWall";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos from Lam7a launches and around the CMU-Q campus.",
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="wrap gallery">
        <h1 className="page-title">Photos</h1>
        <p className="block__lede">
          From launches and around campus. Pick a photo to see it larger.
        </p>
        <PhotoWall />
      </main>
      <SiteFooter />
    </>
  );
}
