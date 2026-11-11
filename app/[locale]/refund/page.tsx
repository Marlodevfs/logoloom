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
    title: fr ? 'Politique de remboursement – LogoLoom' : 'Refund policy – LogoLoom',
    alternates: { canonical: `${siteConfig.url}/${locale}/refund` },
    description: fr
      ? 'Politique de remboursement de LogoLoom : remboursement intégral sous 14 jours.'
      : 'LogoLoom refund policy: full refund within 14 days.',
    robots: { index: false, follow: true },
  };
}

export default async function RefundPage({ params }: Props) {
  const { locale } = await params;
  if (!siteConfig.locales.includes(locale as any)) notFound();

  const email = siteConfig.contact.email;
  const fr = locale === 'fr';

  const sections: LegalSection[] = fr
    ? [
        {
          title: 'Remboursement sous 14 jours',
          body: [
            'Si l’offre Pro ne vous convient pas, vous pouvez demander un remboursement intégral dans les 14 jours suivant votre premier paiement, sans avoir à vous justifier.',
            'Cela vaut aussi pour le premier paiement d’un abonnement annuel.',
          ],
        },
        {
          title: 'Après 14 jours',
          body: [
            'Les périodes déjà commencées ne sont pas remboursées. Vous pouvez résilier à tout moment pour qu’aucun nouveau paiement ne soit prélevé ; votre accès Pro reste actif jusqu’à la fin de la période payée.',
            'En cas de double paiement ou d’erreur de facturation, nous remboursons toujours, quel que soit le délai.',
          ],
        },
        {
          title: 'Comment demander un remboursement',
          body: [
            `Écrivez-nous à ${email} avec l’email utilisé pour payer, ou contactez directement Paddle via paddle.net (lien présent dans votre reçu).`,
            'Les remboursements sont traités par Paddle, notre revendeur officiel, sur le moyen de paiement utilisé. Le délai d’apparition sur votre compte dépend de votre banque (généralement 5 à 10 jours ouvrés).',
          ],
        },
      ]
    : [
        {
          title: '14-day refund',
          body: [
            'If Pro is not right for you, you can request a full refund within 14 days of your first payment, no questions asked.',
            'This also applies to the first payment of a yearly subscription.',
          ],
        },
        {
          title: 'After 14 days',
          body: [
            'Periods already started are not refunded. You can cancel at any time so that no further payment is taken; Pro stays active until the end of the paid period.',
            'Duplicate charges or billing errors are always refunded, whatever the delay.',
          ],
        },
        {
          title: 'How to request a refund',
          body: [
            `Email ${email} with the address you used to pay, or contact Paddle directly via paddle.net (linked in your receipt).`,
            'Refunds are processed by Paddle, our reseller, to the original payment method. How long it takes to appear depends on your bank (usually 5 to 10 business days).',
          ],
        },
      ];

  return (
    <LegalPage
      lang={locale}
      title={fr ? 'Politique de remboursement' : 'Refund policy'}
      updated={fr ? 'Dernière mise à jour : novembre 2026' : 'Last updated: November 2026'}
      backLabel={fr ? 'Retour à l’éditeur' : 'Back to the editor'}
      sections={sections}
    />
  );
}
