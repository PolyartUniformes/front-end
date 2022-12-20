import Header from "../layouts/header";
import Updates from "../modules/home/components/updates";

export function Home() {
  return (
    <div>
      <main className="nav">
        <Header />
        <Updates />
      </main>
    </div>
  );
}
