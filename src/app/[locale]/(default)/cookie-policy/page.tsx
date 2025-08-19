import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/**
 * Cookie Policy Page
 * 
 * Purpose: Comply with GDPR/CCPA requirements and build user trust
 * Essential for Google AdSense approval and legal compliance
 */

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "CookiePolicy" });
  
  return {
    title: "Cookie Policy - AI Universal Generator",
    description: "Learn how AI Universal Generator uses cookies and similar technologies to improve your experience and provide our services.",
    alternates: {
      canonical: `https://aigenerator.com/${locale}/cookie-policy`,
    },
  };
}

export default async function CookiePolicyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Last Updated: January 20, 2025
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            AI Universal Generator ("we", "our", or "us") uses cookies and similar tracking 
            technologies on our website aigenerator.com. This Cookie Policy explains what 
            cookies are, how we use them, and your choices regarding cookies.
          </p>
          <p className="mb-4">
            By using our website, you consent to our use of cookies in accordance with this 
            Cookie Policy. If you do not agree to our use of cookies, please disable them 
            using the instructions provided in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your device (computer, tablet, or 
            mobile phone) when you visit a website. They are widely used to make websites work 
            more efficiently and provide information to website owners.
          </p>
          <p className="mb-4">
            Cookies can be "persistent" or "session" cookies:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Persistent cookies:</strong> Remain on your device after you close your browser</li>
            <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
          <p className="mb-4">We use cookies for the following purposes:</p>
          
          <h3 className="text-xl font-semibold mb-3">3.1 Essential Cookies</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function properly. They enable basic 
            functions like page navigation and access to secure areas.
          </p>
          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Cookie Name</th>
                <th className="text-left p-2">Purpose</th>
                <th className="text-left p-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">sessionId</td>
                <td className="p-2">Maintains user session</td>
                <td className="p-2">Session</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">auth-token</td>
                <td className="p-2">Authentication</td>
                <td className="p-2">7 days</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">csrf-token</td>
                <td className="p-2">Security</td>
                <td className="p-2">Session</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-3">3.2 Performance Cookies</h3>
          <p className="mb-4">
            These cookies collect information about how visitors use our website, helping us 
            improve its performance.
          </p>
          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Cookie Name</th>
                <th className="text-left p-2">Provider</th>
                <th className="text-left p-2">Purpose</th>
                <th className="text-left p-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">_ga</td>
                <td className="p-2">Google Analytics</td>
                <td className="p-2">Tracks unique visitors</td>
                <td className="p-2">2 years</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">_gid</td>
                <td className="p-2">Google Analytics</td>
                <td className="p-2">Tracks daily visitors</td>
                <td className="p-2">24 hours</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-3">3.3 Functionality Cookies</h3>
          <p className="mb-4">
            These cookies enable enhanced functionality and personalization, such as remembering 
            your preferences.
          </p>
          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Cookie Name</th>
                <th className="text-left p-2">Purpose</th>
                <th className="text-left p-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">language</td>
                <td className="p-2">Language preference</td>
                <td className="p-2">1 year</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">theme</td>
                <td className="p-2">Dark/light mode</td>
                <td className="p-2">1 year</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">free-usage</td>
                <td className="p-2">Track free trial usage</td>
                <td className="p-2">24 hours</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-3">3.4 Marketing Cookies</h3>
          <p className="mb-4">
            These cookies track your online activity to help advertisers deliver more relevant 
            advertising or limit how many times you see an ad.
          </p>
          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Cookie Name</th>
                <th className="text-left p-2">Provider</th>
                <th className="text-left p-2">Purpose</th>
                <th className="text-left p-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">fbp</td>
                <td className="p-2">Facebook</td>
                <td className="p-2">Facebook advertising</td>
                <td className="p-2">90 days</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">utm_*</td>
                <td className="p-2">Internal</td>
                <td className="p-2">Campaign tracking</td>
                <td className="p-2">30 days</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
          <p className="mb-4">
            We use services from third parties that may set cookies on your device:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            <li><strong>Stripe:</strong> For payment processing</li>
            <li><strong>Intercom:</strong> For customer support chat</li>
            <li><strong>Facebook Pixel:</strong> For advertising and remarketing</li>
          </ul>
          <p className="mb-4">
            These third parties have their own privacy policies addressing how they use such 
            information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Cookie Choices</h2>
          <p className="mb-4">You have several options for managing cookies:</p>
          
          <h3 className="text-xl font-semibold mb-3">5.1 Browser Settings</h3>
          <p className="mb-4">
            Most web browsers allow you to control cookies through their settings:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener">Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies" className="text-primary hover:underline" target="_blank" rel="noopener">Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" className="text-primary hover:underline" target="_blank" rel="noopener">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/help/17442" className="text-primary hover:underline" target="_blank" rel="noopener">Edge</a></li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">5.2 Cookie Consent Tool</h3>
          <p className="mb-4">
            When you first visit our website, you'll see a cookie consent banner that allows you to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Accept all cookies</li>
            <li>Reject non-essential cookies</li>
            <li>Customize your cookie preferences</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">5.3 Opt-Out Links</h3>
          <p className="mb-4">You can opt out of specific third-party cookies:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener">Google Analytics Opt-Out</a></li>
            <li><a href="https://www.facebook.com/help/568137493302217" className="text-primary hover:underline" target="_blank" rel="noopener">Facebook Opt-Out</a></li>
            <li><a href="http://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener">Digital Advertising Alliance Opt-Out</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Impact of Disabling Cookies</h2>
          <p className="mb-4">
            Please note that if you disable cookies, some features of our website may not 
            function properly:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>You may not be able to log in to your account</li>
            <li>Your preferences may not be remembered</li>
            <li>Some interactive features may not work</li>
            <li>You may see less relevant advertisements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Do Not Track Signals</h2>
          <p className="mb-4">
            Some browsers have a "Do Not Track" feature that lets you tell websites that you 
            do not want your online activities tracked. Currently, our website does not respond 
            to Do Not Track signals, but you can still manage cookies using the methods described 
            above.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p className="mb-4">
            Our website is not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If you are under 13, please do 
            not use our website or provide any information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
          <p className="mb-4">
            Cookies may store information that is transferred internationally. By using our 
            website, you consent to the transfer of information via cookies to countries that 
            may have different data protection laws than your country.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time. We will notify you of any 
            changes by posting the new Cookie Policy on this page and updating the "Last Updated" 
            date. Your continued use of our website after any changes indicates your acceptance 
            of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
          <p className="mb-4">
            If you have questions about our Cookie Policy or how we use cookies, please contact us:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="mb-2"><strong>Email:</strong> privacy@aigenerator.com</p>
            <p className="mb-2"><strong>Support:</strong> support@aigenerator.com</p>
            <p className="mb-2"><strong>Address:</strong> AI Universal Generator, Privacy Department</p>
            <p><strong>Contact Form:</strong> <a href="/contact" className="text-primary hover:underline">Contact Us</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. More Information</h2>
          <p className="mb-4">
            For more information about cookies and how to manage them, visit:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://www.allaboutcookies.org/" className="text-primary hover:underline" target="_blank" rel="noopener">All About Cookies</a></li>
            <li><a href="https://www.youronlinechoices.eu/" className="text-primary hover:underline" target="_blank" rel="noopener">Your Online Choices (EU)</a></li>
            <li><a href="https://www.networkadvertising.org/" className="text-primary hover:underline" target="_blank" rel="noopener">Network Advertising Initiative</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}