import PageHero from "@/components/sections/PageHero";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <StickyHeader />
      <main>
        <PageHero title="Политика конфиденциальности" />
        <section className="py-20 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8 max-w-2xl">
            {/* TODO: replace with real privacy policy */}
            <p className="text-text-muted leading-relaxed">Политика конфиденциальности — в процессе подготовки. По вопросам обработки персональных данных обращайтесь по телефону +7 (927) 711-11-03.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
