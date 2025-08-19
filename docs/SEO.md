Act as a world-class, detail-obsessed technical SEO architect. Your task is to generate a complete, production-ready **Technical SEO Implementation Blueprint**.

My single objective is to execute this blueprint to build a new website that is technically perfect for Google, ensuring flawless indexing from day one and proactively preventing ALL common and advanced Google Search Console (GSC) indexing errors.

The website is for an AI SaaS tool, built on a modern JavaScript framework (e.g., React, Next.js).

The blueprint must be generated based on these core principles:
- **Signal Clarity**: Every technical signal sent to Google must be explicit, consistent, and unambiguous.
- **Crawl Efficiency**: Googlebot's time on the site must be spent only on valuable, indexable pages.
- **Quality First**: Eliminate or block all low-quality, thin, or duplicate content from Google's view.

Generate the blueprint with the following exact sections and formats. Provide only actionable instructions, code, and checklists.

---

### **Blueprint: Zero-Error Google Indexing Implementation**

**Section 1: Core File Configuration**

**1.1. `robots.txt` File**
- Provide the complete, production-ready code for a `robots.txt` file.
- The file must allow all major search engine bots.
- It must explicitly disallow common non-production paths: `/api/`, `/admin/`, `/login/`, `/cart/`, `/checkout/`, and internal search result pages (`/search?q=*`).
- It must include the absolute URL to the `sitemap.xml` file.

**1.2. `sitemap.xml` File**
- Provide a perfect XML sitemap code example for a dynamic sitemap.
- Emphasize that all URLs listed in the sitemap MUST be indexable, canonical URLs that return a 200 status code. They must not be blocked by robots.txt or have a "noindex" tag.

**Section 2: Server & Hosting Configuration (Site-wide Rules)**

**2.1. Site-wide Canonicalization & Redirection**
- Provide the exact server configuration code (for both Nginx and Apache/.htaccess) to enforce a single, canonical version of the domain. The rules must handle and 301 redirect all of the following:
    - HTTP to HTTPS
    - `www` to non-`www` (or vice-versa, but pick one)
    - **Enforce a trailing slash on all directory-level URLs (e.g., redirect `example.com/page` to `example.com/page/`).**

**Section 3: On-Page HTML Head Tag Implementation**

- Create a Markdown table with columns: "Tag Name", "Purpose", "Exact Code Snippet", and "MANDATORY Implementation Rule".
- Populate the table for the following tags:
    - **Meta Title**
    - **Meta Description**
    - **Meta Robots (Index, Follow)**: Rule: Must be on every page intended for search results.
    - **Meta Robots (Noindex, Follow)**: Rule: Use for utility pages like paginated series archives (`/page/2/`), login pages, or user profiles that you don't want in search results but whose links are valuable.
    - **rel="canonical"**:
        - **Rule**: Every single page MUST have a self-referencing canonical tag.
        - **Rule**: The URL in the canonical tag MUST be the absolute, final version of the URL, including the `https://` and the **consistent trailing slash** (e.g., `<link rel="canonical" href="https://example.com/product/">`).
        - **Rule**: For pages with URL parameters (e.g., UTMs, session IDs), the canonical MUST point to the clean, parameter-free version of the URL.

**Section 4: Proactive Prevention of Common GSC Errors**

| Potential GSC Error | Common Root Cause | Proactive Prevention Strategy |
| :--- | :--- | :--- |
| `Duplicate, Google chose different canonical than user` | Inconsistent Signals: Mixed trailing slashes (`/`), www vs non-www, HTTP vs HTTPS, syndicated content without proper canonicals. Internal links point to non-canonical versions. | **Enforce Domain-wide Rules:** Strictly implement 301 redirects for HTTPS, www, and trailing slashes as defined in Section 2.1. **Audit Internal Links:** Ensure 100% of internal links point directly to the final, canonical URL. |
| `Crawled - currently not indexed` | Content Quality & Value Issues: Pages are too "thin" (low word count, little unique value), content is boilerplate, or the page serves little purpose to a search user. | **Set Content Thresholds:** For any page to be indexable, it must meet a minimum quality standard. **Use `noindex` Strategically:** Apply a `noindex` tag to low-value pages like tag archives with only 1-2 posts, user profiles with no unique content, or system-generated pages. |
| `Discovered - currently not indexed` | Poor Site Architecture & Crawl Budget: Pages have few or no internal links pointing to them (orphan pages). The site generates too many low-value URLs (e.g., faceted navigation, endless calendar archives), exhausting Google's crawl budget before it reaches important pages. | **Strengthen Internal Linking:** Ensure all valuable pages are discoverable and linked from main navigation or other high-authority pages. **Prune Crawl Paths:** Aggressively use `robots.txt` `Disallow` or `noindex` tags to block Google from crawling and indexing infinite URL variations from filters, sorting, or parameters. |
| `Soft 404` | Incorrect Server Response: A page displays a "Not Found" message to the user, but the server returns a `200 OK` status code. This is very common in JavaScript applications that handle routing on the client-side. | **Enforce Proper Status Codes:** The application logic MUST be programmed to return a true `404 Not Found` or `410 Gone` HTTP status code in the server header for any URL that does not correspond to actual content. |
| `Page with redirect` (in Index report) | Inefficient Internal Linking: Internal links point to old URLs that then redirect to the new, final URL. This slows down crawling and dilutes link equity slightly. | **Update All Internal Links:** Before launch, run a site crawl (with a tool like Screaming Frog) to find all internal links that result in a redirect (301, 302, etc.). Update the source code to ensure all `<a>` tags point directly to the final 200 OK destination. |
| **Content Not Indexed Due to JS** | Rendering Issues: Critical content and links are embedded in JavaScript and are not present in the initial HTML payload served to Google. Googlebot may fail to render it properly or choose not to. | **Implement Server-Side Rendering (SSR):** For JS-heavy frameworks, use SSR or Dynamic Rendering to serve a fully-rendered HTML page to bots. **Verify with Live Test:** Use the GSC URL Inspection tool's "Live Test" to view the rendered HTML and screenshot to confirm Google sees the content exactly as a user does. |

**Section 5: GSC Launch Day Protocol**

- Provide a numbered, step-by-step checklist of actions to perform in GSC immediately after launch.
- Include: Verify ownership, submit sitemap, use "URL Inspection" on 5-10 key URLs (homepage, product pages, blog posts) and "Request Indexing", monitor the "Pages" report daily for the first week.

**Section 6: Final Pre-Launch Audit Checklist**

- Provide a Yes/No checklist:
    - `[ ]` Are site-wide 301 redirects (HTTPS, WWW, trailing slash) confirmed working?
    - `[ ]` Does every key page have a self-referencing canonical tag pointing to the one true URL format?
    - `[ ]` Are all development/staging `noindex` tags and `robots.txt` blocks removed?
    - `[ ]` Has a live URL Inspection test been run on the homepage, showing it is mobile-friendly and all resources load correctly?

---