import About from '@/components/About';
import Agenda from '@/components/Agenda';
import Clinic from '@/components/Clinic';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Location from '@/components/Location';
import Motion from '@/components/Motion';
import Prevention from '@/components/Prevention';
import Services from '@/components/Services';
import Surgeries from '@/components/Surgeries';
import WhatsAppFab from '@/components/WhatsAppFab';
import { address, faq, schedule, site } from '@/data/site';

const DAY_URI = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Physician', 'MedicalBusiness'],
      name: site.name,
      medicalSpecialty: 'Ophthalmology',
      url: site.url,
      image: `${site.url}/images/sylvia-retrato-1280.webp`,
      telephone: `+${site.whatsappNumber}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${address.street}, ${address.building}`,
        addressLocality: 'Vitória',
        addressRegion: 'ES',
        addressCountry: 'BR',
      },
      openingHoursSpecification: schedule.flatMap((d) =>
        d.slots.map((s) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${DAY_URI[d.day]}`,
          opens: `${String(Math.floor(s.from / 60)).padStart(2, '0')}:${String(s.from % 60).padStart(2, '0')}`,
          closes: `${String(Math.floor(s.to / 60)).padStart(2, '0')}:${String(s.to % 60).padStart(2, '0')}`,
        })),
      ),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

/**
 * A ordem responde ao paciente: quem é e onde → por que cuidar → o que ela faz → as cirurgias →
 * quem é a médica → como é o consultório → quando atende → como chegar →
 * dúvidas → agendar.
 */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Prevention />
        <Services />
        <Surgeries />
        <About />
        <Clinic />
        <Agenda />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
      <Motion />
    </>
  );
}
