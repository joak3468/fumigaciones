import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Clients />
        <Services />
        <Process />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
