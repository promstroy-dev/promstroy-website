import PageHero from "@/components/sections/PageHero";
import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import { company } from "@/data/company";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика обработки персональных данных ПромСтрой",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyHeader />
      <main className="flex-1">
        <PageHero title="Политика конфиденциальности" />
        <section className="py-20 bg-bg">
          <div className="max-w-2xl mx-auto px-4 md:px-8 prose-style">

            <h2 className="font-heading font-semibold text-text text-xl mb-4">
              1. Общие положения
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Настоящая политика конфиденциальности определяет порядок обработки и защиты
              персональных данных, которые ПромСтрой (далее — Оператор) получает от
              пользователей при использовании сайта.
            </p>

            <h2 className="font-heading font-semibold text-text text-xl mb-4">
              2. Какие данные мы собираем
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              При заполнении формы обратной связи мы собираем: имя, номер телефона и текст
              сообщения. Эти данные используются исключительно для обработки вашего запроса
              и обратной связи.
            </p>

            <h2 className="font-heading font-semibold text-text text-xl mb-4">
              3. Цели обработки
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Персональные данные обрабатываются с целью: ответа на обращения пользователей,
              консультации по услугам компании, заключения и исполнения договоров.
            </p>

            <h2 className="font-heading font-semibold text-text text-xl mb-4">
              4. Передача данных третьим лицам
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Персональные данные не передаются третьим лицам без согласия субъекта данных,
              за исключением случаев, предусмотренных законодательством Российской Федерации.
            </p>

            <h2 className="font-heading font-semibold text-text text-xl mb-4">
              5. Защита данных
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Оператор принимает необходимые организационные и технические меры для защиты
              персональных данных от несанкционированного доступа, изменения, раскрытия
              или уничтожения.
            </p>

            <h2 className="font-heading font-semibold text-text text-xl mb-4">
              6. Контакты
            </h2>
            <p className="text-text-muted leading-relaxed mb-2">
              По вопросам обработки персональных данных обращайтесь:
            </p>
            <ul className="text-text-muted leading-relaxed mb-6 flex flex-col gap-1">
              <li>Телефон: <a href={`tel:${company.phone}`} className="text-accent hover:underline">{company.phoneDisplay}</a></li>
              {company.email && <li>Email: <a href={`mailto:${company.email}`} className="text-accent hover:underline">{company.email}</a></li>}
              {company.address && <li>Адрес: {company.address}</li>}
            </ul>

            <p className="text-text-muted text-sm mt-10" style={{ borderTop: "1px solid #D0C4B0", paddingTop: "1.5rem" }}>
              Политика может обновляться. Актуальная версия всегда доступна на этой странице.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
