import Head from "next/head";
import { Inter } from "next/font/google";
import { PostCard, PostWidget } from "../components";
import { getPosts } from "@/services";

const inter = Inter({ subsets: ["latin"] });

// const posts = [
//   { title: "Next.Js", excerpt: "Learn Next.js Pages Routing" },
//   { title: "Next.Js", excerpt: "Learn Next.js App Routing" },
// ];

export default function Home({ posts }) {
  return (
    <main className={`container mx-auto px-10 mb-8 ${inter.className}`}>
      <Head>
        <title>Blog Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <FeaturedPosts /> */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}