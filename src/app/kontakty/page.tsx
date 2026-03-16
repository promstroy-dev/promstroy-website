import PageHero from "@/components/sections/PageHero";
import InquiryForm from "@/components/ui/InquiryForm";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import { Phone, Send, MapPin, Clock } from "lucide-react";
import { company } from "@/data/company";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с ПромСтрой. Телефон, Telegram, адрес офиса в Самаре.",
};

export default function KontaktyPage() {
  return (
    <>
      <StickyHeader />
      <main>
        <PageHero title="Контакты" />
        <section className="py-20 md:py-32 bg-bg">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="font-heading font-semibold text-text text-2xl mb-6">Оставить заявку</h2>
                <InquiryForm sourcePage="kontakty" />
              </div>

              {/* Contact details */}
              <div>
                <h2 className="font-heading font-semibold text-text text-2xl mb-6">Свяжитесь с нами</h2>
                <div className="flex flex-col gap-6">
                  <a href={`tel:${company.phone}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Телефон</p>
                      <p className="font-semibold text-text group-hover:text-accent transition-colors">{company.phoneDisplay}</p>
                    </div>
                  </a>
                  <a href={`https://t.me/${company.telegram.replace("@", "")}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
                      <Send size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Telegram</p>
                      <p className="font-semibold text-text group-hover:text-accent transition-colors">{company.telegram}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Адрес</p>
                      {/* TODO: replace with real content */}
                      <p className="font-semibold text-text">{company.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Режим работы</p>
                      <p className="font-semibold text-text">Пн–Пт 9:00–18:00</p>
                    </div>
                  </div>
                </div>

                {/* Telegram QR placeholder */}
                <div className="mt-10 p-6 bg-bg-mid/10 border border-border rounded-lg text-center">
                  {/* TODO: replace with real QR asset provided by owner */}
                  <div className="w-32 h-32 bg-bg-mid mx-auto rounded flex items-center justify-center mb-3">
                    <span className="text-text-muted text-xs">QR-код</span>
                  </div>
                  <p className="text-text-muted text-sm">Напишите нам в Telegram</p>
                  <p className="font-semibold text-text">{company.telegram}</p>
                </div>

                {/* Map placeholder */}
                <div className="mt-6 bg-bg-mid rounded-lg overflow-hidden">
                  {/* TODO: replace with real Yandex Maps embed once address is confirmed */}
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-text-muted text-sm">Карта — в процессе подготовки</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
