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
    title: fr ? 'Conditions générales de vente – LogoLoom' : 'Terms of sale – LogoLoom',
    alternates: { canonical: `${siteConfig.url}/${locale}/terms` },
    description: fr
      ? 'Conditions générales de vente de LogoLoom : offres, prix, paiement, résiliation et remboursement.'
      : 'LogoLoom terms of sale: plans, prices, payment, cancellation and refunds.',
    robots: { index: false, follow: true },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!siteConfig.locales.includes(locale as any)) notFound();

  const l = siteConfig.legal;
  const email = siteConfig.contact.email;
  const fr = locale === 'fr';
  const price = PRO_CONFIG.priceLabelEur;

  const sections: LegalSection[] = fr
    ? [
        {
          title: '1. Objet',
          body: [
            `Les présentes conditions générales de vente (CGV) s’appliquent à tout achat effectué sur le site ${siteConfig.domain}.`,
            l.publisherName && `Le vendeur est ${l.publisherName}${l.publisherStatus ? ` (${l.publisherStatus})` : ''}.`,
            `Contact : ${email}.`,
          ],
        },
        {
          title: '2. Offres',
          body: [
            'LogoLoom propose gratuitement la création de documents PDF (CV, planners, etc.), sans compte et sans abonnement.',
            `L’offre Pro est un abonnement mensuel à ${price} par mois. Elle retire la mention et le QR code LogoLoom des PDF et met le nom de votre entreprise dans les métadonnées du PDF.`,
            'Certains produits peuvent être proposés en paiement unique (sans abonnement). Leur contenu et leur prix sont indiqués sur leur page avant l’achat.',
          ],
        },
        {
          title: '3. Prix',
          body: [
            'Les prix sont indiqués en euros, toutes taxes comprises. Le prix applicable est celui affiché au moment de la commande.',
            l.vatMention,
          ],
        },
        {
          title: '4. Paiement',
          body: [
            'Le paiement se fait par carte bancaire via Stripe, prestataire de paiement sécurisé. LogoLoom n’a jamais accès à vos données bancaires.',
            'L’abonnement Pro est prélevé automatiquement chaque mois à la date anniversaire de la souscription.',
          ],
        },
        {
          title: '5. Accès au service',
          body: [
            'L’accès Pro ou le produit acheté est activé dès la confirmation du paiement. Vous pouvez restaurer votre accès Pro avec votre email de facturation.',
          ],
        },
        {
          title: '6. Durée et résiliation',
          body: [
            `L’abonnement Pro est sans engagement. Vous pouvez le résilier à tout moment en écrivant à ${email}. La résiliation prend effet à la fin de la période mensuelle déjà payée ; aucun nouveau prélèvement n’est effectué.`,
          ],
        },
        {
          title: '7. Rétractation et remboursement',
          body: [
            `Pour tout premier achat (premier mois d’abonnement Pro ou produit en paiement unique), vous pouvez demander un remboursement intégral dans les 14 jours suivant le paiement, sans avoir à vous justifier, en écrivant à ${email}.`,
            'Au-delà de ce délai, les périodes d’abonnement déjà commencées ne sont pas remboursées, mais vous pouvez résilier à tout moment pour éviter le prélèvement suivant.',
            'Le remboursement est effectué sur le moyen de paiement utilisé, sous 14 jours après votre demande.',
          ],
        },
        {
          title: '8. Responsabilité',
          body: [
            'Les modèles sont des mises en page fournies à titre indicatif. Vous restez responsable du contenu de vos documents et de leur adéquation à votre usage. LogoLoom ne peut garantir un résultat (par exemple l’obtention d’un emploi).',
          ],
        },
        {
          title: '9. Données personnelles',
          body: [
            'Le traitement de vos données est décrit dans notre politique de confidentialité, accessible en bas de chaque page.',
          ],
        },
        {
          title: '10. Litiges',
          body: [
            `En cas de problème, contactez-nous d’abord à ${email} : nous cherchons toujours une solution amiable.`,
            l.mediator &&
              `Conformément au Code de la consommation, vous pouvez recourir gratuitement au médiateur de la consommation : ${l.mediator}.`,
            'Les présentes CGV sont soumises au droit français.',
          ],
        },
      ]
    : [
        {
          title: '1. Scope',
          body: [
            `These terms of sale apply to any purchase made on ${siteConfig.domain}.`,
            l.publisherName && `The seller is ${l.publisherName}${l.publisherStatus ? ` (${l.publisherStatus})` : ''}.`,
            `Contact: ${email}.`,
          ],
        },
        {
          title: '2. Plans',
          body: [
            'LogoLoom lets you create PDF documents (CVs, planners, etc.) for free, with no account and no subscription.',
            `Pro is a monthly subscription at ${price} per month. It removes the LogoLoom credit and QR code from PDFs and puts your business name in the PDF metadata.`,
            'Some products may be sold as a one-time payment (no subscription). Their content and price are shown on their page before purchase.',
          ],
        },
        {
          title: '3. Prices',
          body: ['Prices are shown in euros, all taxes included. The applicable price is the one displayed when you order.', l.vatMention],
        },
        {
          title: '4. Payment',
          body: [
            'Payment is made by card through Stripe, a secure payment provider. LogoLoom never has access to your card details.',
            'The Pro subscription is charged automatically every month on the anniversary of your subscription date.',
          ],
        },
        {
          title: '5. Access',
          body: ['Pro access or the purchased product is activated as soon as payment is confirmed. You can restore Pro access with your billing email.'],
        },
        {
          title: '6. Term and cancellation',
          body: [
            `Pro has no commitment. You can cancel at any time by writing to ${email}. Cancellation takes effect at the end of the month already paid; no further charge is made.`,
          ],
        },
        {
          title: '7. Withdrawal and refunds',
          body: [
            `For any first purchase (first month of Pro or a one-time product), you can request a full refund within 14 days of payment, with no reason needed, by writing to ${email}.`,
            'After that period, subscription months already started are not refunded, but you can cancel at any time to avoid the next charge.',
            'Refunds are made to the original payment method within 14 days of your request.',
          ],
        },
        {
          title: '8. Liability',
          body: [
            'Templates are layouts provided for convenience. You remain responsible for the content of your documents and for checking they suit your use. LogoLoom cannot guarantee any outcome (such as getting a job).',
          ],
        },
        {
          title: '9. Personal data',
          body: ['How we process your data is described in our privacy policy, linked at the bottom of every page.'],
        },
        {
          title: '10. Disputes',
          body: [
            `If something goes wrong, contact us first at ${email}: we always look for an amicable solution.`,
            l.mediator && `You may refer the matter free of charge to the consumer mediator: ${l.mediator}.`,
            'These terms are governed by French law.',
          ],
        },
      ];

  return (
    <LegalPage
      lang={locale}
      title={fr ? 'Conditions générales de vente' : 'Terms of sale'}
      updated={fr ? 'Dernière mise à jour : novembre 2026' : 'Last updated: November 2026'}
      backLabel={fr ? 'Retour à l’éditeur' : 'Back to the editor'}
      sections={sections}
    />
  );
}
