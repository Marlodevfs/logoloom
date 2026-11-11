import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { LegalPage, LegalSection } from '@/components/LegalPage';
import { PRO_CONFIG } from '@/lib/stripe-pro';

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
    title: fr ? 'Conditions générales – LogoLoom' : 'Terms of service – LogoLoom',
    alternates: { canonical: `${siteConfig.url}/${locale}/terms` },
    description: fr
      ? 'Conditions générales d’utilisation et de vente de LogoLoom.'
      : 'LogoLoom terms of service and sale.',
    robots: { index: false, follow: true },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!siteConfig.locales.includes(locale as any)) notFound();

  const l = siteConfig.legal;
  const email = siteConfig.contact.email;
  const fr = locale === 'fr';
  const monthly = PRO_CONFIG.priceLabelEur;
  const yearly = PRO_CONFIG.priceLabelYearlyEur;
  const owner = l.publisherName || siteConfig.name;

  const sections: LegalSection[] = fr
    ? [
        {
          title: '1. Qui sommes-nous',
          body: [
            `Le site ${siteConfig.domain} (« LogoLoom ») est exploité par ${owner}${l.publisherStatus ? ` (${l.publisherStatus})` : ''}.`,
            `Contact : ${email}.`,
            'En utilisant le site, vous acceptez les présentes conditions.',
          ],
        },
        {
          title: '2. Le service',
          body: [
            'LogoLoom permet de créer gratuitement des documents PDF (CV, planners, etc.), sans compte. Les documents sont générés dans votre navigateur et ne sont pas envoyés sur nos serveurs.',
            `L’offre Pro est un abonnement à ${monthly} par mois ou ${yearly} par an. Elle retire la mention et le QR code LogoLoom des PDF et met votre nom ou celui de votre entreprise dans les métadonnées du PDF.`,
          ],
        },
        {
          title: '3. Commande et paiement',
          body: [
            'Nos commandes sont traitées par notre revendeur en ligne Paddle.com. Paddle.com est le vendeur officiel (Merchant of Record) de toutes nos commandes : il encaisse le paiement, émet la facture, gère la TVA et traite les demandes liées à la facturation et aux remboursements.',
            'Les prix affichés sont toutes taxes comprises ; la TVA applicable à votre pays est calculée au moment du paiement.',
          ],
        },
        {
          title: '4. Abonnement, renouvellement et résiliation',
          body: [
            'L’abonnement Pro se renouvelle automatiquement à la fin de chaque période (mois ou année), jusqu’à résiliation.',
            `Vous pouvez résilier à tout moment, sans frais, via le lien présent dans l’email de reçu de Paddle ou en écrivant à ${email}. La résiliation prend effet à la fin de la période déjà payée.`,
          ],
        },
        {
          title: '5. Accès Pro',
          body: [
            'L’accès Pro est activé dès la confirmation du paiement, sur le navigateur utilisé pour payer. Sur un autre appareil, vous pouvez le restaurer avec l’email de facturation. L’accès Pro est personnel.',
          ],
        },
        {
          title: '6. Remboursement',
          body: ['Les conditions de remboursement sont décrites dans notre politique de remboursement, accessible en bas de chaque page.'],
        },
        {
          title: '7. Utilisation et propriété',
          body: [
            'Les documents que vous créez avec vos propres contenus vous appartiennent, y compris pour un usage commercial. Les modèles, le code et le design du site restent la propriété de LogoLoom.',
            'Vous vous engagez à ne pas utiliser le service à des fins illégales ni à tenter de contourner l’accès Pro.',
          ],
        },
        {
          title: '8. Responsabilité',
          body: [
            'Le service est fourni « en l’état ». Les modèles sont des mises en page indicatives : vous restez responsable du contenu de vos documents. LogoLoom ne garantit aucun résultat (par exemple l’obtention d’un emploi) et ne peut être tenu responsable des dommages indirects.',
          ],
        },
        {
          title: '9. Modifications',
          body: ['Nous pouvons modifier ces conditions. Les changements importants seront signalés sur le site ; ils ne s’appliquent pas à une période d’abonnement déjà payée.'],
        },
        {
          title: '10. Droit applicable',
          body: [
            `Ces conditions sont soumises au droit français. En cas de problème, contactez-nous d’abord à ${email} : nous cherchons toujours une solution amiable.`,
          ],
        },
      ]
    : [
        {
          title: '1. Who we are',
          body: [
            `${siteConfig.domain} ("LogoLoom") is operated by ${owner}${l.publisherStatus ? ` (${l.publisherStatus})` : ''}.`,
            `Contact: ${email}.`,
            'By using the site, you agree to these terms.',
          ],
        },
        {
          title: '2. The service',
          body: [
            'LogoLoom lets you create PDF documents (CVs, planners, etc.) for free, with no account. Documents are generated in your browser and are not sent to our servers.',
            `Pro is a subscription at ${monthly} per month or ${yearly} per year. It removes the LogoLoom credit and QR code from PDFs and puts your name or business name in the PDF metadata.`,
          ],
        },
        {
          title: '3. Orders and payment',
          body: [
            'Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders: it takes payment, issues invoices, handles VAT and deals with billing and refund enquiries.',
            'Prices shown include taxes; the VAT applicable in your country is calculated at checkout.',
          ],
        },
        {
          title: '4. Subscription, renewal and cancellation',
          body: [
            'Pro renews automatically at the end of each period (month or year) until cancelled.',
            `You can cancel at any time at no cost, using the link in your Paddle receipt email or by writing to ${email}. Cancellation takes effect at the end of the period already paid.`,
          ],
        },
        {
          title: '5. Pro access',
          body: [
            'Pro access is activated as soon as payment is confirmed, in the browser used to pay. On another device, you can restore it with your billing email. Pro access is personal.',
          ],
        },
        {
          title: '6. Refunds',
          body: ['Refund terms are described in our refund policy, linked at the bottom of every page.'],
        },
        {
          title: '7. Use and ownership',
          body: [
            'Documents you create with your own content belong to you, including for commercial use. The templates, code and design of the site remain the property of LogoLoom.',
            'You agree not to use the service for illegal purposes or attempt to bypass Pro access.',
          ],
        },
        {
          title: '8. Liability',
          body: [
            'The service is provided "as is". Templates are layouts provided for convenience: you remain responsible for the content of your documents. LogoLoom guarantees no outcome (such as getting a job) and is not liable for indirect damages.',
          ],
        },
        {
          title: '9. Changes',
          body: ['We may update these terms. Significant changes will be announced on the site; they do not apply to a subscription period already paid.'],
        },
        {
          title: '10. Governing law',
          body: [`These terms are governed by French law. If something goes wrong, contact us first at ${email}: we always look for an amicable solution.`],
        },
      ];

  return (
    <LegalPage
      lang={locale}
      title={fr ? 'Conditions générales' : 'Terms of service'}
      updated={fr ? 'Dernière mise à jour : novembre 2026' : 'Last updated: November 2026'}
      backLabel={fr ? 'Retour à l’éditeur' : 'Back to the editor'}
      sections={sections}
    />
  );
}
