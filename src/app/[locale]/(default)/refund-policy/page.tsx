import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/**
 * Refund Policy Page
 * 
 * Purpose: Provide clear refund policy to build trust and meet payment processor requirements
 * This page is essential for Google AdSense approval and handling payment disputes
 */

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "RefundPolicy" });
  
  return {
    title: "Refund Policy - AI Universal Generator",
    description: "Learn about our refund policy, eligibility criteria, and how to request a refund for AI Universal Generator services.",
    alternates: {
      canonical: `https://aigenerator.com/${locale}/refund-policy`,
    },
  };
}

export default async function RefundPolicyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Last Updated: January 20, 2025
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
          <p className="mb-4">
            At AI Universal Generator, we strive to provide the best AI content generation services. 
            We understand that sometimes our service may not meet your expectations, and we offer 
            a fair refund policy to ensure customer satisfaction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 7-Day Money-Back Guarantee</h2>
          <p className="mb-4">
            We offer a 7-day money-back guarantee for all first-time purchases. If you are not 
            satisfied with our service, you can request a full refund within 7 days of your purchase.
          </p>
          <h3 className="text-xl font-semibold mb-3">Eligibility Criteria:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>The request must be made within 7 days of the original purchase date</li>
            <li>You have not used more than 20% of your purchased credits</li>
            <li>This is your first purchase on our platform</li>
            <li>The purchase was made directly through our website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Subscription Refunds</h2>
          <h3 className="text-xl font-semibold mb-3">Monthly Subscriptions:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Refunds are available within 48 hours of renewal if no credits have been used</li>
            <li>No refunds for partially used months</li>
            <li>You can cancel anytime to prevent future charges</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-3">Annual Subscriptions:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Full refund within 14 days if less than 10% of credits have been used</li>
            <li>Pro-rated refund available within 30 days</li>
            <li>No refunds after 30 days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Items</h2>
          <p className="mb-4">The following are not eligible for refunds:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Credits that have been fully or mostly consumed (over 80% usage)</li>
            <li>Purchases made more than 7 days ago (for one-time purchases)</li>
            <li>Custom enterprise plans (governed by separate agreements)</li>
            <li>Add-on features or additional credit purchases</li>
            <li>Accounts that have violated our Terms of Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. How to Request a Refund</h2>
          <p className="mb-4">To request a refund, please follow these steps:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li className="mb-2">
              <strong>Contact Support:</strong> Email us at support@aigenerator.com with your order details
            </li>
            <li className="mb-2">
              <strong>Provide Information:</strong> Include your order number, email address used for purchase, and reason for refund
            </li>
            <li className="mb-2">
              <strong>Wait for Review:</strong> Our team will review your request within 24-48 hours
            </li>
            <li className="mb-2">
              <strong>Refund Processing:</strong> Approved refunds will be processed within 5-7 business days
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Refund Processing Time</h2>
          <p className="mb-4">
            Once your refund is approved, processing times vary by payment method:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
            <li><strong>PayPal:</strong> 3-5 business days</li>
            <li><strong>Stripe:</strong> 5-10 business days</li>
            <li><strong>Cryptocurrency:</strong> Non-refundable</li>
          </ul>
          <p className="mb-4">
            Please note that your bank or payment provider may take additional time to process 
            the refund and credit your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Partial Refunds</h2>
          <p className="mb-4">
            In certain situations, we may offer partial refunds:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>If you've used between 20-50% of your credits, you may receive a 50% refund</li>
            <li>For annual subscriptions canceled within 30 days, pro-rated based on usage</li>
            <li>Technical issues on our end that prevented service usage</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Disputes and Chargebacks</h2>
          <p className="mb-4">
            We encourage customers to contact us directly before initiating a chargeback with 
            their bank or credit card company. Chargebacks harm our business and may result in:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Immediate account suspension</li>
            <li>Loss of all remaining credits</li>
            <li>Inability to make future purchases</li>
            <li>Collection proceedings for disputed amounts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Service Credits</h2>
          <p className="mb-4">
            Instead of a refund, we may offer service credits for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service outages or technical issues</li>
            <li>Quality issues with AI generation</li>
            <li>First-time customer complaints</li>
          </ul>
          <p className="mb-4">
            Service credits do not expire and can be used for any of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
          <p className="mb-4">
            For refund requests or questions about this policy, please contact us:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="mb-2"><strong>Email:</strong> support@aigenerator.com</p>
            <p className="mb-2"><strong>Response Time:</strong> Within 24-48 hours</p>
            <p className="mb-2"><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
            <p><strong>Support Portal:</strong> <a href="/contact" className="text-primary hover:underline">Contact Form</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Policy Changes</h2>
          <p className="mb-4">
            We reserve the right to modify this refund policy at any time. Changes will be 
            effective immediately upon posting to this page. Your continued use of our service 
            after any changes indicates your acceptance of the new policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Legal Rights</h2>
          <p className="mb-4">
            This refund policy does not affect your statutory rights as a consumer. You may 
            have additional rights under your local consumer protection laws.
          </p>
        </section>
      </div>
    </div>
  );
}