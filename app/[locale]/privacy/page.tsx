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
    title: fr ? 'Politique de confidentialité – LogoLoom' : 'Privacy policy – LogoLoom',
    alternates: { canonical: `${siteConfig.url}/${locale}/privacy` },
    description: fr
      ? 'Politique de confidentialité de LogoLoom : aucun compte, documents traités dans votre navigateur, statistiques sans cookie.'
      : 'LogoLoom privacy policy: no account, documents processed in your browser, cookieless analytics.',
    // Useful for visitors, worthless in search results (and EN text is reused for es/de/it/pt)
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!siteConfig.locales.includes(locale as any)) notFound();

  const fr = locale === 'fr';
  const email = siteConfig.contact.email;
  const host = siteConfig.legal.host.name;

  const sections: LegalSection[] = fr
    ? [
        {
          title: 'En résumé',
          body: [
            'LogoLoom ne nécessite aucun compte. Votre logo et le contenu de vos documents sont traités uniquement dans votre navigateur : ils ne sont jamais envoyés ni stockés sur nos serveurs.',
          ],
        },
        {
          title: 'Données stockées sur votre appareil',
          body: [
            'Vos réglages (couleur, modèle, textes, logo) sont enregistrés dans le stockage local de votre navigateur (localStorage) pour que vous les retrouviez à votre prochaine visite. Vous pouvez les effacer à tout moment en vidant les données du site dans votre navigateur.',
          ],
        },
        {
          title: 'Mesure d’audience',
          body: [
            'Nous utilisons GoatCounter, un outil de statistiques respectueux de la vie privée, sans cookie et sans suivi entre sites. Il ne mesure que des données agrégées (pages vues, pays, type d’appareil) et quelques actions anonymes (ex. : téléchargement d’un PDF).',
          ],
        },
        {
          title: 'Hébergement',
          body: [
            `Le site est hébergé par ${host}, qui peut enregistrer des journaux techniques (adresse IP, date, page demandée) pour assurer la sécurité et le bon fonctionnement du service.`,
          ],
        },
        {
          title: 'Abonnement Pro',
          body: [
            'Si vous souscrivez à l’offre Pro, le paiement est traité par Stripe. Nous ne voyons jamais vos données bancaires ; nous recevons uniquement votre email de facturation et le statut de votre abonnement, afin d’activer votre accès Pro.',
          ],
        },
        {
          title: 'Vos droits',
          body: [
            `Conformément au RGPD et à la loi suisse sur la protection des données, vous pouvez demander l’accès, la rectification ou la suppression des données vous concernant en écrivant à ${email}. Vous pouvez aussi déposer une réclamation auprès de la CNIL.`,
          ],
        },
      ]
    : [
        {
          title: 'In short',
          body: [
            'LogoLoom requires no account. Your logo and document content are processed only in your browser: they are never sent to or stored on our servers.',
          ],
        },
        {
          title: 'Data stored on your device',
          body: [
            'Your settings (color, template, texts, logo) are saved in your browser’s local storage (localStorage) so you find them on your next visit. You can delete them at any time by clearing this site’s data in your browser.',
          ],
        },
        {
          title: 'Analytics',
          body: [
            'We use GoatCounter, a privacy-friendly analytics tool with no cookies and no cross-site tracking. It only records aggregated data (page views, country, device type) and a few anonymous actions (e.g. a PDF download).',
          ],
        },
        {
          title: 'Hosting',
          body: [
            `The site is hosted by ${host}, which may keep technical logs (IP address, date, requested page) for security and reliability.`,
          ],
        },
        {
          title: 'Pro subscription',
          body: [
            'If you subscribe to Pro, payment is handled by Stripe. We never see your card details; we only receive your billing email and subscription status to activate your Pro access.',
          ],
        },
        {
          title: 'Your rights',
          body: [
            `Under the GDPR and the Swiss Data Protection Act, you can request access to, correction or deletion of your data by writing to ${email}. You may also lodge a complaint with your data protection authority.`,
          ],
        },
      ];

  return (
    <LegalPage
      lang={locale}
      title={fr ? 'Politique de confidentialité' : 'Privacy policy'}
      updated={fr ? 'Dernière mise à jour : novembre 2026' : 'Last updated: November 2026'}
      backLabel={fr ? 'Retour à l’éditeur' : 'Back to the editor'}
      sections={sections}
    />
  );
}
