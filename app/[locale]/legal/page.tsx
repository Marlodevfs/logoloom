import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { LegalPage, LegalSection } from '@/components/LegalPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === 'fr';
  return {
    title: fr ? 'Mentions légales – LogoLoom' : 'Legal notice – LogoLoom',
    alternates: { canonical: `${siteConfig.url}/${locale}/legal` },
    description: fr
      ? 'Mentions légales du site LogoLoom : éditeur, hébergement, propriété intellectuelle.'
      : 'Legal notice for LogoLoom: publisher, hosting and intellectual property.',
    // Useful for visitors, worthless in search results (and EN text is reused for es/de/it/pt)
    robots: { index: false, follow: true },
  };
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;
  if (!siteConfig.locales.includes(locale as any)) notFound();

  const l = siteConfig.legal;
  const fr = locale === 'fr';

  const sections: LegalSection[] = fr
    ? [
        {
          title: 'Éditeur du site',
          body: [
            l.publisherName && `Le site ${siteConfig.domain} est édité par ${l.publisherName}.`,
            l.publisherStatus,
            l.publisherAddress && `Adresse : ${l.publisherAddress}`,
            `Contact : ${siteConfig.contact.email}`,
            l.publicationDirector && `Directeur de la publication : ${l.publicationDirector}`,
          ],
        },
        {
          title: 'Hébergement',
          body: [`${l.host.name}, ${l.host.address} (${l.host.url}).`],
        },
        {
          title: 'Propriété intellectuelle',
          body: [
            'La structure du site, les modèles de documents, les textes et les éléments graphiques de LogoLoom sont protégés. Les documents que vous générez avec vos propres contenus (logo, textes) vous appartiennent et peuvent être utilisés librement, y compris à des fins commerciales.',
          ],
        },
        {
          title: 'Responsabilité',
          body: [
            'Les modèles de devis et de factures sont des mises en page fournies à titre indicatif. Ils ne constituent pas un conseil juridique ou fiscal : il vous appartient de vérifier que vos documents respectent les obligations légales applicables à votre activité (mentions obligatoires, TVA, etc.).',
          ],
        },
      ]
    : [
        {
          title: 'Publisher',
          body: [
            l.publisherName && `The website ${siteConfig.domain} is published by ${l.publisherName}.`,
            l.publisherStatus,
            l.publisherAddress && `Address: ${l.publisherAddress}`,
            `Contact: ${siteConfig.contact.email}`,
            l.publicationDirector && `Publication director: ${l.publicationDirector}`,
          ],
        },
        {
          title: 'Hosting',
          body: [`${l.host.name}, ${l.host.address} (${l.host.url}).`],
        },
        {
          title: 'Intellectual property',
          body: [
            'The website structure, document templates, texts and graphics of LogoLoom are protected. Documents you generate with your own content (logo, texts) belong to you and may be used freely, including commercially.',
          ],
        },
        {
          title: 'Liability',
          body: [
            'Quote and invoice templates are layouts provided for convenience. They do not constitute legal or tax advice: you are responsible for making sure your documents meet the legal requirements that apply to your business (mandatory mentions, VAT, etc.).',
          ],
        },
      ];

  return (
    <LegalPage
      lang={locale}
      title={fr ? 'Mentions légales' : 'Legal notice'}
      updated={fr ? 'Dernière mise à jour : novembre 2026' : 'Last updated: November 2026'}
      backLabel={fr ? 'Retour à l’éditeur' : 'Back to the editor'}
      sections={sections}
    />
  );
}
