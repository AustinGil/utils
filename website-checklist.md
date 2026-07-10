# The Website Specification — Checklist

Every spec item, grouped by category. Copy into an issue or a note and tick as you go.

Source: https://specification.website/checklist/ · Licensed CC BY 4.0

## Foundations

The HTML, head, and document basics every page needs.

- [ ] [The HTML doctype](https://specification.website/spec/foundations/doctype/) — Required
  Every HTML document must start with \<!doctype html\> as its first line. This opts the browser into standards mode; without it, you get quirks mode and broken layout.
- [ ] [The lang attribute on \<html\>](https://specification.website/spec/foundations/html-lang/) — Required
  Set a valid BCP 47 language tag on the \<html\> element so screen readers, translators, search engines, and browsers know what language the page is in.
- [ ] [\<meta charset\>](https://specification.website/spec/foundations/meta-charset/) — Required
  Declare UTF-8 as the document character encoding in the first 1024 bytes of the HTML, so browsers parse text correctly before they hit any non-ASCII content.
- [ ] [\<meta viewport\>](https://specification.website/spec/foundations/meta-viewport/) — Required
  Tell mobile browsers to render the page at the device's actual width instead of pretending to be a 980-pixel desktop. One line, and never disable user scaling.
- [ ] [The \<title\> element](https://specification.website/spec/foundations/title/) — Required
  Every HTML document must have exactly one non-empty \<title\> element inside \<head\>. It names the page for browsers, search engines, screen readers, social previews, and AI agents. It is not the same thing as the page's \<h1\>.
- [ ] [\<meta name="description"\>](https://specification.website/spec/foundations/meta-description/) — Recommended
  A short, unique summary of the page used by search engines and social platforms as a snippet. Google may rewrite it, but a good one is rewritten less often.
- [ ] [Canonical URL (rel="canonical")](https://specification.website/spec/foundations/canonical-url/) — Recommended
  Declare the preferred URL for a page so search engines and crawlers consolidate ranking signals on one address, even when several URLs serve the same content.
- [ ] [Favicons and app icons](https://specification.website/spec/foundations/favicons/) — Recommended
  Ship an SVG favicon, an ICO fallback at /favicon.ico, an apple-touch-icon, and a maskable PWA icon. Five files cover every browser and home-screen surface.
- [ ] [\<meta name="theme-color"\>](https://specification.website/spec/foundations/theme-color/) — Recommended
  Tints the browser chrome and OS surfaces to match your brand. Use the media attribute to ship one colour for light mode and another for dark mode.
- [ ] [\<meta name="color-scheme"\>](https://specification.website/spec/foundations/color-scheme/) — Recommended
  Tells the browser which colour schemes your page is designed for. Prevents the white flash that dark-mode users see before your CSS loads, and lets the browser style scrollbars, form controls, and the page background to match.
- [ ] [Open Graph protocol](https://specification.website/spec/foundations/open-graph/) — Recommended
  Open Graph tags control how pages look when shared on social platforms and chat apps. Set og:title, og:description, og:image, og:url, and og:type on every page.
- [ ] [Feed discovery with rel="alternate"](https://specification.website/spec/foundations/feed-discovery/) — Recommended
  If your site publishes a feed — RSS, Atom, or JSON Feed — announce it in \<head\> with \<link rel="alternate"\>. Feed readers, agents, and browsers discover it without guessing the URL.
- [ ] [Feed content hygiene](https://specification.website/spec/foundations/feed-hygiene/) — Recommended
  If you publish a feed, ship it well-formed. Identify the feed inside itself with atom:link rel="self", give every item a stable guid, declare an update cadence with the Syndication module, and validate before deploy.
- [ ] [Popover API](https://specification.website/spec/foundations/popover-api/) — Recommended
  Replace ARIA-puzzled JavaScript modals, menus, and tooltips with a native top-layer primitive that the browser opens, closes, and accessibility-wires for you.
- [ ] [CSS anchor positioning](https://specification.website/spec/foundations/anchor-positioning/) — Recommended
  Tether tooltips, menus, and popovers to the element that triggers them with pure CSS — no JavaScript positioning library, and it works across overflow and stacking boundaries.
- [ ] [Balanced text wrapping](https://specification.website/spec/foundations/text-wrap/) — Recommended
  Let the browser break headings and body copy intelligently with text-wrap: balance and pretty — no orphaned words, no manual line breaks, no layout shift.
- [ ] [CSS container queries](https://specification.website/spec/foundations/container-queries/) — Recommended
  Style a component by the space it is actually given with container-type and @container — responsive design that follows the container, not the viewport — and test a container's own custom properties with style queries.
- [ ] [Invoker commands](https://specification.website/spec/foundations/invoker-commands/) — Optional
  Wire a button to open a popover, close a dialog, or run a custom action declaratively with command and commandfor — no click handler, no ARIA plumbing.

## SEO

Search visibility — robots.txt, sitemaps, canonicals, structured data.

- [ ] [robots.txt](https://specification.website/spec/seo/robots-txt/) — Recommended
  A plain-text file at the site root that tells crawlers which paths they may or may not fetch. Standardised in RFC 9309 and supported by every major search engine.
- [ ] [XML sitemaps](https://specification.website/spec/seo/xml-sitemaps/) — Recommended
  An XML file listing the canonical URLs of a site, with optional metadata about when each was last changed. The fastest way to tell a search engine what exists.
- [ ] [Sitemap index files](https://specification.website/spec/seo/sitemap-index/) — Recommended
  A sitemap of sitemaps. Used when a site has more than 50,000 URLs or wants to split sitemaps by content type for cleaner reporting.
- [ ] [Image and video sitemap extensions](https://specification.website/spec/seo/image-sitemaps/) — Optional
  Optional XML extensions that add image and video metadata to sitemap entries. Useful when media is loaded by JavaScript or hosted on a CDN that crawlers cannot reach by following links.
- [ ] [URL structure](https://specification.website/spec/seo/url-structure/) — Recommended
  URLs are the most stable identifier on the web. Keep them lowercase, hyphenated, descriptive, and shallow. Treat them as a public API for your content.
- [ ] [Redirects (301/302/308)](https://specification.website/spec/seo/redirects/) — Required
  HTTP redirects send a client from one URL to another. Use 301 or 308 for permanent moves, 302 or 307 for temporary ones, and never chain more than necessary.
- [ ] [Server-side rendering](https://specification.website/spec/seo/server-side-rendering/) — Recommended
  Crawlers, social scrapers, and AI agents index the HTML your server returns. Render your primary content and metadata server-side — via SSR, static generation, or prerendering — so it is in the initial response, not assembled later by client-side JavaScript.
- [ ] [Soft 404s](https://specification.website/spec/seo/soft-404/) — Avoid
  A page that looks like a 'not found' message to a user but returns 200 OK to a crawler. Search engines treat soft 404s as a quality problem and often refuse to index them.
- [ ] [Meta robots and X-Robots-Tag](https://specification.website/spec/seo/meta-robots/) — Required
  Every page must have an explicit, correct indexing policy — either implicit (default index, follow) on public pages, or an explicit noindex / X-Robots-Tag on staging, admin, thin, or private content. Get this wrong and you either disappear from search or expose what you didn't mean to.
- [ ] [Heading hierarchy](https://specification.website/spec/seo/heading-hierarchy/) — Required
  Headings describe the sections of a page. They must form a nested outline, never be used for visual styling alone, and never skip levels.
- [ ] [Internal linking](https://specification.website/spec/seo/internal-linking/) — Recommended
  Links from one page on a site to another. The strongest signal you control for telling crawlers and AI agents what a page is about and how important it is.
- [ ] [Structured data (JSON-LD)](https://specification.website/spec/seo/structured-data/) — Recommended
  Machine-readable annotations that describe the content of a page using the schema.org vocabulary. JSON-LD is the format search engines and AI agents expect.
- [ ] [Breadcrumbs](https://specification.website/spec/seo/breadcrumbs/) — Recommended
  A short trail showing the page's position in the site hierarchy. Visible in the UI for users, marked up as BreadcrumbList JSON-LD for search engines.
- [ ] [IndexNow](https://specification.website/spec/seo/indexnow/) — Optional
  An open protocol for telling participating search engines that a URL has changed. One HTTP request pushes Bing, Yandex, Naver, and Seznam to recrawl — Google does not participate.

## Accessibility

WCAG-aligned rules so people of all abilities can use the site.

- [ ] [Colour contrast](https://specification.website/spec/accessibility/color-contrast/) — Required
  Text and meaningful non-text elements must have enough contrast against their background so people with low vision and people in harsh light can read them.
- [ ] [Automatic contrasting colour](https://specification.website/spec/accessibility/contrast-color/) — Optional
  Let the browser pick a legible black or white foreground for a dynamic background with the CSS contrast-color() function, instead of hard-coding colour pairs or computing luminance in JavaScript.
- [ ] [Forced colours mode](https://specification.website/spec/accessibility/forced-colors/) — Recommended
  Respect forced colours mode (Windows High Contrast and similar). The `forced-colors` media feature lets you repair UI the user's palette would otherwise flatten — without overriding their choice.
- [ ] [Image alt text](https://specification.website/spec/accessibility/image-alt-text/) — Required
  Every \<img\> element must have an alt attribute. The value describes the image's purpose to screen readers, search engines, and anyone whose image fails to load.
- [ ] [Form labels](https://specification.website/spec/accessibility/form-labels/) — Required
  Every form control needs a programmatically associated label. A placeholder is not a label, and an unlabelled input is unusable for screen-reader and voice-control users.
- [ ] [Keyboard navigation](https://specification.website/spec/accessibility/keyboard-navigation/) — Required
  Every interactive element on the page must be reachable and operable with a keyboard alone, in a logical order, with no traps that hold focus.
- [ ] [Visible focus indicators](https://specification.website/spec/accessibility/focus-indicators/) — Required
  Whenever a control receives keyboard focus, the page must show a clear, high-contrast indicator. Removing focus outlines without a replacement is a top accessibility failure.
- [ ] [Skip links](https://specification.website/spec/accessibility/skip-links/) — Required
  A 'skip to main content' link as the first focusable element lets keyboard and screen-reader users jump past repeated navigation on every page.
- [ ] [The inert attribute](https://specification.website/spec/accessibility/inert-attribute/) — Recommended
  When an overlay is open, the content behind it should be unreachable — not just dimmed. The inert attribute removes a subtree from tab order and the accessibility tree at once, replacing fragile focus-trap JavaScript.
- [ ] [Semantic HTML and landmarks](https://specification.website/spec/accessibility/semantic-html/) — Required
  Use the right HTML element for the job. Landmarks like \<header\>, \<nav\>, \<main\>, and \<footer\> let assistive technologies announce structure and skip between regions.
- [ ] [ARIA — first rule of ARIA](https://specification.website/spec/accessibility/aria-usage/) — Recommended
  ARIA can make custom widgets accessible, but the first rule of ARIA is don't use ARIA. Reach for a native HTML element first; add ARIA only when nothing native fits.
- [ ] [Descriptive link text](https://specification.website/spec/accessibility/link-text/) — Required
  Every link's text must describe where it goes. 'Click here' and 'read more' fail screen-reader users who scan a page by jumping from link to link.
- [ ] [Empty links and buttons](https://specification.website/spec/accessibility/empty-links-buttons/) — Avoid
  A link or button with no accessible name is invisible to screen readers and unreachable for voice control. Icon-only controls without a label are the usual culprit.
- [ ] [Accessible form errors](https://specification.website/spec/accessibility/form-errors/) — Required
  When a form submission fails, errors must be identified in text, associated with the input that caused them, and announced to assistive technology.
- [ ] [Accessible authentication](https://specification.website/spec/accessibility/accessible-authentication/) — Recommended
  Let people log in without solving a puzzle, transcribing a code, or memorising anything. Don't block password managers, allow paste, and offer a method that needs no cognitive function test.
- [ ] [Redundant entry](https://specification.website/spec/accessibility/redundant-entry/) — Recommended
  Don't make people re-type information they already gave you in the same process. Auto-populate it, or let them pick it from what they entered a step ago.
- [ ] [Document and parts language](https://specification.website/spec/accessibility/document-language/) — Required
  Set the page's primary language on \<html lang\> and mark any inline content in a different language with its own lang attribute, so screen readers pronounce it correctly.
- [ ] [Reduced motion](https://specification.website/spec/accessibility/reduced-motion/) — Required
  Respect the user's `prefers-reduced-motion` setting. Decorative animation, parallax, and autoplay can trigger vestibular distress, migraines, and seizures.
- [ ] [Accessibility overlays](https://specification.website/spec/accessibility/accessibility-overlays/) — Avoid
  Third-party JavaScript widgets that claim to make a site WCAG-compliant at runtime. They do not work, often harm screen-reader users, and attract lawsuits.
- [ ] [Captions and transcripts](https://specification.website/spec/accessibility/captions-and-transcripts/) — Required
  Video needs synchronised captions, audio-only content needs a transcript, and visuals that carry meaning need audio description. Auto-captions alone are not enough.
- [ ] [Accessible data tables](https://specification.website/spec/accessibility/data-tables/) — Required
  Tabular data must use real \<table\> markup with a caption, header cells, and scope attributes so screen readers can announce row and column relationships.
- [ ] [Touch target size](https://specification.website/spec/accessibility/touch-target-size/) — Required
  Interactive controls must be large enough to tap or click reliably. WCAG 2.2 sets a 24×24 CSS px minimum, with 44×44 CSS px as the enhanced target.
- [ ] [Hidden until found](https://specification.website/spec/accessibility/hidden-until-found/) — Recommended
  Use hidden="until-found" for collapsible content so that browser find-in-page, assistive tech, and search engines can still reach the text and auto-expand it.
- [ ] [Mobile-friendly form inputs](https://specification.website/spec/accessibility/mobile-form-inputs/) — Recommended
  On a phone, the right input type, inputmode, and enterkeyhint summon the correct on-screen keyboard and a useful Enter key. Keep input text at 16px or larger so iOS Safari doesn't zoom on focus.
- [ ] [Native interactive elements](https://specification.website/spec/accessibility/native-interactive-elements/) — Recommended
  Prefer native HTML interactive elements — \<button\>, \<a\>, \<details\>/\<summary\>, \<dialog\> — over divs with click handlers. You get keyboard support, focus management, and assistive-tech semantics for free.
- [ ] [CSS state and relational selectors](https://specification.website/spec/accessibility/css-state-selectors/) — Recommended
  Use `:has()` together with `:user-invalid`, `:user-valid`, `:placeholder-shown` and `:focus-within` to express form and component state in CSS, removing the JavaScript class-toggling pattern and the race conditions it brings.

## Security

Headers, transport, and policies that keep visitors safe.

- [ ] [HTTPS and TLS](https://specification.website/spec/security/https-tls/) — Required
  Serve every page over HTTPS using TLS 1.2 or 1.3, redirect plain HTTP to HTTPS, and disable obsolete SSL and early TLS versions on every host you control.
- [ ] [HSTS (Strict-Transport-Security)](https://specification.website/spec/security/hsts/) — Required
  HSTS tells browsers to only ever use HTTPS for your domain. Send max-age with includeSubDomains — but skip the preload list, which its own operator now discourages.
- [ ] [Mixed content and upgrade-insecure-requests](https://specification.website/spec/security/mixed-content/) — Recommended
  An HTTPS page that loads any subresource over HTTP is mixed content. Serve every subresource over HTTPS, and send the upgrade-insecure-requests CSP directive as a safety net.
- [ ] [Content Security Policy (CSP)](https://specification.website/spec/security/content-security-policy/) — Recommended
  A CSP tells browsers which sources of script, style, image, and frame content to trust. A good policy stops most XSS and data-exfiltration attacks dead.
- [ ] [Reporting API (Reporting-Endpoints)](https://specification.website/spec/security/reporting-endpoints/) — Recommended
  A response header that names HTTP endpoints to which the browser POSTs structured violation reports — CSP and COOP breaches, permissions-policy violations, deprecations, interventions, and crashes — so you learn what is breaking in the field.
- [ ] [/.well-known/security.txt](https://specification.website/spec/security/security-txt/) — Recommended
  A standard text file at /.well-known/security.txt tells security researchers how to report vulnerabilities. It is cheap to publish and dramatically lowers the bar for responsible disclosure.
- [ ] [X-Content-Type-Options: nosniff](https://specification.website/spec/security/x-content-type-options/) — Required
  The nosniff header stops browsers from guessing a response's content type. It blocks a class of attacks where a benign-looking file is interpreted as script or stylesheet.
- [ ] [Clickjacking protection (frame-ancestors / X-Frame-Options)](https://specification.website/spec/security/frame-ancestors/) — Required
  Tell browsers who is allowed to embed your pages in an iframe. Use CSP frame-ancestors. X-Frame-Options is the legacy fallback.
- [ ] [Cross-origin isolation (COOP / COEP / CORP)](https://specification.website/spec/security/cross-origin-isolation/) — Recommended
  Three response headers — Cross-Origin-Opener-Policy, Cross-Origin-Embedder-Policy, and Cross-Origin-Resource-Policy — that sever risky cross-window and cross-origin links and defend against side-channel leaks.
- [ ] [Referrer-Policy](https://specification.website/spec/security/referrer-policy/) — Recommended
  Referrer-Policy controls how much URL information your site leaks when users follow a link or load a subresource. strict-origin-when-cross-origin is the sensible default.
- [ ] [Permissions-Policy](https://specification.website/spec/security/permissions-policy/) — Recommended
  Permissions-Policy lets you turn off powerful browser features — camera, microphone, geolocation, payment, USB — for your own pages and for any iframes you embed.
- [ ] [Subresource Integrity (SRI)](https://specification.website/spec/security/subresource-integrity/) — Recommended
  SRI adds a cryptographic hash to every third-party script and stylesheet so the browser refuses to run modified files. Essential for any external JS or CSS you depend on.
- [ ] [Digest Fields (Content-Digest and Repr-Digest)](https://specification.website/spec/security/digest-fields/) — Optional
  RFC 9530 lets a server publish a cryptographic hash of what it sent, so a client can detect corruption in transit. Worth shipping on APIs, file downloads, and machine-readable endpoints; browsers ignore it.
- [ ] [Trusted Types](https://specification.website/spec/security/trusted-types/) — Recommended
  Trusted Types make the browser reject plain strings at DOM injection sinks like innerHTML, demanding a vetted typed value instead. Switched on with two CSP directives, it neutralises a whole class of DOM-based XSS.
- [ ] [Cookie attributes — Secure, HttpOnly, SameSite](https://specification.website/spec/security/cookie-attributes/) — Required
  Every cookie should be Secure, HttpOnly where possible, and have an explicit SameSite. Use __Host- and __Secure- prefixes for session cookies.
- [ ] [Clear-Site-Data](https://specification.website/spec/security/clear-site-data/) — Optional
  Clear-Site-Data lets a response tell the browser to wipe cookies, storage, and caches for your origin. Send it on logout so a shared device keeps nothing behind.
- [ ] [DNS CAA records](https://specification.website/spec/security/caa-records/) — Recommended
  A CAA record tells certificate authorities which of them are allowed to issue certificates for your domain. Cheap to add, blocks a class of mis-issuance attacks.
- [ ] [DNSSEC](https://specification.website/spec/security/dnssec/) — Optional
  DNSSEC cryptographically signs DNS records so resolvers can verify they have not been tampered with. Strong defence in depth, but only with full registrar and registry support.

## Well-Known URIs

Standard, agreed-upon paths under /.well-known/.

- [ ] [Well-known URIs](https://specification.website/spec/well-known/well-known-overview/) — Recommended
  The /.well-known/ path prefix is a standardised place to publish site-level metadata. RFC 8615 defines it; IANA keeps the registry of allowed names.
- [ ] [/.well-known/change-password](https://specification.website/spec/well-known/change-password/) — Optional
  A standard redirect endpoint that points password managers and users at your real change-password page. Only applicable if the site has user accounts — sites without logins have nothing to point at and should not implement it.
- [ ] [/.well-known/webauthn](https://specification.website/spec/well-known/webauthn/) — Optional
  A JSON document at /.well-known/webauthn lists the origins allowed to use passkeys scoped to a single Relying Party ID. It enables WebAuthn Related Origin Requests — one passkey shared across several domains you own. Only applicable if the site uses passkeys across more than one origin.
- [ ] [/.well-known/openid-configuration](https://specification.website/spec/well-known/openid-configuration/) — Optional
  A JSON discovery document that describes an OpenID Connect provider's endpoints and capabilities. Only required if you are an OIDC identity provider.
- [ ] [/.well-known/oauth-authorization-server](https://specification.website/spec/well-known/oauth-authorization-server/) — Optional
  A JSON metadata document describing a plain OAuth 2.0 authorisation server's endpoints and capabilities. The non-OIDC sibling of openid-configuration; only needed if you run an authorisation server.
- [ ] [/.well-known/oauth-protected-resource](https://specification.website/spec/well-known/oauth-protected-resource/) — Optional
  A JSON metadata document that tells clients which authorisation server issues the tokens an OAuth-protected API accepts, and how to present them. Only needed if you expose an OAuth-protected resource.
- [ ] [/.well-known/api-catalog](https://specification.website/spec/well-known/api-catalog/) — Recommended
  RFC 9727 publishes a machine-readable index of the APIs and resources a host exposes. Served as a Linkset (RFC 9264) JSON document, discoverable via the api-catalog link relation.
- [ ] [/.well-known/webfinger](https://specification.website/spec/well-known/webfinger/) — Optional
  WebFinger (RFC 7033) resolves an account identifier such as acct:user@example.com to a set of links. The Fediverse uses it to discover ActivityPub actors.
- [ ] [/.well-known/apple-app-site-association](https://specification.website/spec/well-known/apple-app-site-association/) — Optional
  A JSON file that tells iOS, iPadOS and macOS which Apple apps may handle which URLs on your domain. Required for Universal Links and several other Apple features.
- [ ] [/.well-known/assetlinks.json](https://specification.website/spec/well-known/assetlinks-json/) — Optional
  Android's Digital Asset Links file proves that an Android app and a web domain are owned by the same entity. It powers App Links and Smart Lock for Passwords.
- [ ] [/.well-known/nodeinfo](https://specification.website/spec/well-known/nodeinfo/) — Optional
  A discovery URI for federated platforms. It returns links to NodeInfo documents that describe the software, version and basic statistics of a server.
- [ ] [/.well-known/traffic-advice](https://specification.website/spec/well-known/traffic-advice/) — Optional
  A JSON file that tells private prefetch proxies — most notably Chrome's — whether to send prefetch traffic to your origin, and at what fraction. Optional opt-out / throttle mechanism, provisionally registered with IANA.

## Agent Readiness

Things that make a site legible to AI agents and crawlers.

- [ ] [Agent readiness](https://specification.website/spec/agent-readiness/agent-readiness-overview/) — Recommended
  Agent readiness is the set of choices that make a site legible to AI agents and LLMs: stable URLs, structured data, clean semantics, robots controls, and machine-readable endpoints.
- [ ] [/llms.txt](https://specification.website/spec/agent-readiness/llms-txt/) — Recommended
  A proposed markdown file at the site root that gives LLMs a curated index of your most important content. Emerging convention, not a ratified standard.
- [ ] [/llms-full.txt](https://specification.website/spec/agent-readiness/llms-full-txt/) — Optional
  An extended companion to /llms.txt that concatenates the full markdown content of your key pages into a single file. Useful for small sites, costly for large ones.
- [ ] [Per-page Markdown source endpoints](https://specification.website/spec/agent-readiness/markdown-source-endpoints/) — Recommended
  Expose every documentation page's raw Markdown source at a predictable URL — via a .md suffix on the canonical URL, content negotiation, or both. Agents pull source instead of parsing HTML.
- [ ] [robots.txt for AI crawlers](https://specification.website/spec/agent-readiness/robots-for-ai-crawlers/) — Recommended
  Major AI vendors publish named user-agents for their crawlers. Setting an explicit allow or disallow per agent is the clearest way to control how your content is used.
- [ ] [Content Signals in robots.txt](https://specification.website/spec/agent-readiness/content-signals/) — Optional
  Add Content-Signal directives to robots.txt to declare whether AI crawlers may search, ingest, or train on your content. An emerging IETF AI Preferences / IAB Tech Lab proposal that some validators already check.
- [ ] [Web Bot Auth — verifiable bot identity](https://specification.website/spec/agent-readiness/web-bot-auth/) — Optional
  Web Bot Auth lets a bot prove who it is by signing each HTTP request with a key it controls. Sites can then allow or block specific bots without IP allow-lists, user-agent strings, or guesswork. Built on RFC 9421 HTTP Message Signatures.
- [ ] [Stable URLs](https://specification.website/spec/agent-readiness/stable-urls/) — Required
  URLs are public contracts. Once published, they should keep working. Breaking them invalidates citations, bookmarks, links, and agent caches — and is almost always avoidable.
- [ ] [Structured data for agents](https://specification.website/spec/agent-readiness/structured-data-for-agents/) — Recommended
  JSON-LD with schema.org types gives agents typed facts about your page. It is the same markup search engines use, and agents lean on it just as heavily.
- [ ] [Machine-readable formats](https://specification.website/spec/agent-readiness/machine-readable-formats/) — Recommended
  Offer JSON, RSS, or plain markdown endpoints alongside HTML where it makes sense. Agents and feed readers prefer typed data over scraped HTML.
- [ ] [HTTP Link headers for discovery](https://specification.website/spec/agent-readiness/link-headers/) — Recommended
  Use the HTTP Link header to advertise machine-readable resources — llms.txt, sitemap, api-catalog, RSS — directly in the response. Agents that never parse your HTML can still find what they need.
- [ ] [MCP and tool discovery](https://specification.website/spec/agent-readiness/mcp-and-tool-discovery/) — Optional
  The Model Context Protocol is an emerging way for sites to expose queryable tools to agents over JSON-RPC. Relevant whenever your content has structure worth filtering — even for a static reference site like this one.
- [ ] [A2A agent cards](https://specification.website/spec/agent-readiness/a2a-agent-cards/) — Optional
  The Agent-to-Agent (A2A) protocol lets an autonomous agent find another autonomous agent and call it over JSON-RPC. Discovery hinges on a single well-known file: `/.well-known/agent-card.json`. Relevant whenever your service exposes agentic behaviour another agent might want to delegate to.
- [ ] [Agent Skills discovery](https://specification.website/spec/agent-readiness/agent-skills-discovery/) — Recommended
  A well-known URI that lists Agent Skills — short, scoped instructions an AI agent can load to work better with your site. Emerging convention via a Cloudflare-led RFC; still draft, still cheap to ship.
- [ ] [DNS for AI Discovery (DNS-AID)](https://specification.website/spec/agent-readiness/dns-aid/) — Optional
  Publish SVCB/HTTPS records under _agents.example.com so agents can discover your services from DNS, before any HTTP round-trip. Pair with DNSSEC so the answer is authenticated.
- [ ] [Agentic Resource Discovery (ARD)](https://specification.website/spec/agent-readiness/agentic-resource-discovery/) — Optional
  Publish an AI Catalog at /.well-known/ai-catalog.json listing the agent capabilities your domain offers — MCP servers, A2A agents — so registries and agents can find and trust them from one fetch.
- [ ] [NLWeb — conversational interface discovery](https://specification.website/spec/agent-readiness/nlweb/) — Optional
  NLWeb is an emerging convention for exposing a site as a conversational AI endpoint. A site advertises an `/ask`-style endpoint via a `rel="nlweb"` link and serves an MCP-compatible JSON-RPC interface that agents can query in natural language.
- [ ] [WebMCP — browser-native tools for agents](https://specification.website/spec/agent-readiness/webmcp/) — Optional
  WebMCP lets a page register tools that an in-browser AI agent can call directly, using a `navigator.modelContext` JavaScript API. It turns a site into an agent surface without server-side MCP plumbing.
- [ ] [Open Knowledge Format (OKF) bundle](https://specification.website/spec/agent-readiness/okf-bundle/) — Optional
  Publish your whole knowledge base as an Open Knowledge Format bundle — a tree of Markdown concept files with typed front matter — so an agent can ingest the entire corpus in one fetch instead of scraping page by page.
- [ ] [Schemamap — discoverable JSON-LD endpoints per resource](https://specification.website/spec/agent-readiness/schemamap/) — Optional
  A convention this site proposes — no external standard exists yet. `/schemamap.xml` indexes one JSON-LD endpoint per resource so agents fetch the structured-data graph directly instead of extracting it from HTML.

## Performance

Core Web Vitals, caching, images, fonts, network behaviour.

- [ ] [Core Web Vitals (LCP, INP, CLS)](https://specification.website/spec/performance/core-web-vitals/) — Required
  Core Web Vitals measure loading, responsiveness, and visual stability. Hit LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1 at the 75th percentile of real users.
- [ ] [Image optimisation](https://specification.website/spec/performance/image-optimization/) — Required
  Serve images in modern formats (WebP, AVIF), at the right size for the viewport, with explicit dimensions. Images are the largest payload on most pages.
- [ ] [Lazy loading images, iframes, and video](https://specification.website/spec/performance/lazy-loading/) — Recommended
  Native lazy loading defers off-screen images, iframes, and (recently) video until the user scrolls near them. Use loading="lazy" — but never on the LCP element.
- [ ] [Preload, prefetch, preconnect](https://specification.website/spec/performance/preload-prefetch-preconnect/) — Recommended
  Resource hints let you tell the browser what is coming. Preload the LCP image and critical fonts, preconnect to third-party origins, prefetch the next navigation.
- [ ] [103 Early Hints](https://specification.website/spec/performance/early-hints/) — Optional
  An informational HTTP response that carries Link headers — preload, preconnect — to the browser before the final response is ready, putting server think-time to work.
- [ ] [Cache-Control headers](https://specification.website/spec/performance/cache-control/) — Required
  Cache-Control tells browsers and CDNs how long to keep a response. Use immutable + max-age=31536000 for fingerprinted assets and short or no-cache for HTML.
- [ ] [Conditional requests (ETag, Last-Modified, 304)](https://specification.website/spec/performance/conditional-requests/) — Recommended
  Send a validator — ETag or Last-Modified — on every cacheable response, and honour If-None-Match / If-Modified-Since so unchanged resources return an empty 304 instead of the full body.
- [ ] [No-Vary-Search response header](https://specification.website/spec/performance/no-vary-search/) — Recommended
  The `No-Vary-Search` response header tells browsers and caches that some URL query parameters (tracking, UTM, sort order) do not change the response. The cached entry for the canonical URL is reused for variants — fewer fetches, better prefetch hits, less duplicate work.
- [ ] [Compression (gzip, brotli, zstd)](https://specification.website/spec/performance/compression/) — Required
  Compress text responses with brotli where supported, gzip everywhere else. zstd is emerging. Don't compress already-compressed media.
- [ ] [Web font loading](https://specification.website/spec/performance/font-loading/) — Recommended
  Self-host WOFF2 fonts, subset them, set font-display: swap so text is readable while the font loads, and preload the critical face only when it styles above-the-fold content.
- [ ] [Critical CSS and render-blocking resources](https://specification.website/spec/performance/critical-css/) — Recommended
  Inline the CSS needed for above-the-fold content and defer the rest. Render-blocking resources in \<head\> are the single biggest cause of slow first paint.
- [ ] [Script loading — defer, async, module](https://specification.website/spec/performance/script-loading/) — Recommended
  Choose the right script-loading attribute for every \<script\>: defer for app code, async for independent third-party, type=module for modern code. Bare \<script\> in \<head\> is always wrong.
- [ ] [HTTP/2 and HTTP/3](https://specification.website/spec/performance/http3/) — Recommended
  Serve over HTTP/2 at minimum and HTTP/3 where you can. Multiplexing eliminates head-of-line blocking; QUIC removes TCP handshake delays.
- [ ] [HTTP/1.1 workarounds: sharding, sprites, and bundling](https://specification.website/spec/performance/http1-workarounds/) — Avoid
  Domain sharding and image sprites were workarounds for HTTP/1.1's connection limit; under HTTP/2 and HTTP/3 they hurt — drop them. Bundling is the nuanced one: stop concatenating to cut requests, start doing it to cut bytes.
- [ ] [Speculation Rules](https://specification.website/spec/performance/speculation-rules/) — Recommended
  Tell the browser which links to prefetch or prerender before the user clicks. Done well, navigations feel instant; done carelessly, you burn bandwidth on pages nobody visits.
- [ ] [Resource hints overview](https://specification.website/spec/performance/resource-hints/) — Recommended
  Five resource hints — dns-prefetch, preconnect, preload, modulepreload, prefetch — cover every stage of the request lifecycle. Pick the right one for the job.
- [ ] [View Transitions](https://specification.website/spec/performance/view-transitions/) — Optional
  Animate between states (same-document) or between pages (cross-document) with a single CSS opt-in. Replaces ad-hoc SPA animation libraries with a platform primitive.
- [ ] [Back/forward cache (BFCache)](https://specification.website/spec/performance/bfcache/) — Recommended
  Keep pages BFCache-eligible so back/forward navigation restores them instantly from memory, with no reload, no hydration, and no repaint.
- [ ] [Visibility-aware rendering](https://specification.website/spec/performance/visibility-aware-rendering/) — Optional
  Use `content-visibility` with `contain-intrinsic-size` to skip layout and paint for off-screen content, and Intersection Observer to drive lazy behaviour, instead of scroll and resize listeners.
- [ ] [CSS containment](https://specification.website/spec/performance/css-containment/) — Optional
  Use `contain: layout paint style` (or the `contain: content` shorthand) to tell the browser that an element's internals cannot affect the rest of the page, so reflow and repaint stay isolated to that subtree.
- [ ] [Scroll-driven animations](https://specification.website/spec/performance/scroll-driven-animations/) — Optional
  Drive CSS animations from scroll position or element visibility with `scroll-timeline` and `view-timeline`, replacing JS scroll-listener libraries with compositor-thread animation.
- [ ] [Scrollbar gutter](https://specification.website/spec/performance/scrollbar-gutter/) — Recommended
  Use scrollbar-gutter: stable to reserve scrollbar space and stop horizontal layout shift between pages or states that overflow vs. don't.
- [ ] [Dynamic viewport units (dvh, svh, lvh)](https://specification.website/spec/performance/dynamic-viewport-units/) — Recommended
  On mobile, 100vh is taller than the screen because it ignores the browser's collapsing toolbar. Use dvh, svh, and lvh to size full-height elements to the viewport that is actually visible.
- [ ] [Compression Dictionary Transport](https://specification.website/spec/performance/compression-dictionary-transport/) — Optional
  Use a previously served response, or a dedicated dictionary, as a Brotli/Zstandard dictionary so updated assets compress to a fraction of their size. Pure progressive enhancement over ordinary compression.
- [ ] [Server-Timing header](https://specification.website/spec/performance/server-timing/) — Optional
  Server-Timing surfaces backend metrics — database time, cache hits, edge processing — in browser DevTools and to RUM via the PerformanceServerTiming API. Send it when you measure server-side latency, and keep the values free of sensitive infrastructure detail.

## Privacy

Consent, signals, and respecting visitor choice.

- [ ] [Privacy policy](https://specification.website/spec/privacy/privacy-policy/) — Required
  A privacy policy tells visitors what personal data you collect, why, on what legal basis, who you share it with, how long you keep it, and what rights they have.
- [ ] [Cookie consent](https://specification.website/spec/privacy/cookie-consent/) — Required
  In the EU and UK, non-essential cookies and similar storage require freely given, informed, specific, and unambiguous opt-in consent before they are set.
- [ ] [Global Privacy Control (GPC)](https://specification.website/spec/privacy/global-privacy-control/) — Recommended
  Global Privacy Control is a browser-level signal that tells websites the user opts out of the sale or sharing of their personal data. California and Colorado require sites to honour it.
- [ ] [Third-party scripts and privacy](https://specification.website/spec/privacy/third-party-scripts/) — Recommended
  Every script loaded from another domain can read cookies, see the URL, and exfiltrate data from your page. Audit them, justify them, and lock them down.
- [ ] [Storage Access API](https://specification.website/spec/privacy/storage-access-api/) — Optional
  As browsers partition and block third-party cookies, embedded cross-site content uses the Storage Access API to request its own cookies behind a user gesture — instead of asking visitors to switch off tracking protection.
- [ ] [Privacy-respecting analytics](https://specification.website/spec/privacy/analytics-privacy/) — Recommended
  You can measure traffic without surveilling visitors. Aggregate, cookieless, EU-hosted analytics tools answer most product questions without the consent and transfer problems of ad-tech analytics.
- [ ] [Data minimisation](https://specification.website/spec/privacy/data-minimization/) — Recommended
  Collect only the personal data you actually need for a specific purpose, keep it only as long as you need it, and redact it from anywhere it leaks unnecessarily.

## Resilience

Graceful failure — error pages, offline, redirects.

- [ ] [Custom error pages (404, 500)](https://specification.website/spec/resilience/error-pages/) — Required
  Custom error pages must return the correct HTTP status code, explain what went wrong in plain language, and offer the user a way forward without leaking implementation details.
- [ ] [Maintenance pages and 503](https://specification.website/spec/resilience/maintenance-pages/) — Recommended
  When the site is intentionally offline, return HTTP 503 with a Retry-After header and a page that tells users what is happening and when to come back.
- [ ] [Graceful degradation when JavaScript fails](https://specification.website/spec/resilience/graceful-degradation/) — Recommended
  Core content and primary navigation should keep working when JavaScript fails to load or throws — treat client-side scripts as an enhancement, not the delivery mechanism.
- [ ] [Offline support and service workers](https://specification.website/spec/resilience/offline-support/) — Optional
  A service worker can serve a cached offline fallback page when the network fails, keeping the site usable on flaky connections and turning hard failures into graceful ones.
- [ ] [Web app manifest](https://specification.website/spec/resilience/pwa-manifest/) — Recommended
  A web app manifest is a small JSON file that tells browsers how the site should appear when installed — its name, icons, start URL, theme colour, and display mode.
- [ ] [Monitoring and uptime](https://specification.website/spec/resilience/monitoring-uptime/) — Recommended
  Monitor the site from outside your own infrastructure, combine synthetic checks with real user data, and run a status page on a separate host so it stays up when the site does not.
- [ ] [Deprecation and Sunset](https://specification.website/spec/resilience/deprecation-and-sunset/) — Optional
  When you retire an endpoint, announce it in machine-readable form: the Deprecation and Sunset response headers tell clients it is going away, when, and where to go next — so integrations migrate before anything breaks.

## Internationalisation

Language, locale, direction, and translated content.

- [ ] [International URL structure](https://specification.website/spec/i18n/international-url-structure/) — Recommended
  Pick a single URL pattern for multilingual or multi-regional content — country-code top-level domain, subdomain, or subdirectory — and stick with it. Optionally localise the slugs too.
- [ ] [hreflang for language and regional URLs](https://specification.website/spec/i18n/hreflang/) — Recommended
  hreflang tells search engines which language or regional version of a page to show to which user. It uses BCP 47 codes and must be reciprocal across all alternates.
- [ ] [Localised page metadata](https://specification.website/spec/i18n/localised-metadata/) — Recommended
  Translate every visible string in the head and in structured data — title, meta description, Open Graph fields, JSON-LD names and descriptions, image alt text — not just the body. A localised body with English metadata is a half-translation.
- [ ] [hreflang in XML sitemaps](https://specification.website/spec/i18n/sitemap-hreflang/) — Optional
  Declare language and regional alternates inside the XML sitemap with xhtml:link instead of in the HTML head. Easier to maintain at scale and keeps localisation metadata separate from content.
- [ ] [Avoid automatic IP-based language redirects](https://specification.website/spec/i18n/avoid-auto-geo-redirects/) — Avoid
  Automatically redirecting visitors to a locale based on IP geolocation or Accept-Language is an anti-pattern. It traps users in the wrong language, breaks search crawlers, and breaks shared links. Let users choose.
- [ ] [lang attribute on inline content](https://specification.website/spec/i18n/lang-attribute/) — Required
  Mark passages, phrases, and inline elements that differ from the document language with a lang attribute. WCAG 3.1.2 requires it so assistive tech can switch pronunciation.
- [ ] [translate attribute for untranslatable content](https://specification.website/spec/i18n/translate-attribute/) — Optional
  The translate attribute marks content that automatic translation systems must leave alone — brand names, code, and identifiers. Use translate="no" so Google Translate and the browser's built-in translation don't mangle terms that have no localised form.
- [ ] [Language switcher](https://specification.website/spec/i18n/language-switcher/) — Recommended
  List each locale in its own language ('Deutsch', '日本語', 'العربية') and mark it with the right lang attribute. Don't use flags — flags are countries, not languages.
- [ ] [RTL and bidirectional text](https://specification.website/spec/i18n/rtl-support/) — Recommended
  Sites that serve Arabic, Hebrew, Persian, or Urdu must set dir="rtl" and use CSS logical properties so layouts mirror correctly without hard-coded left and right.
- [ ] [Writing modes and CJK line breaking](https://specification.website/spec/i18n/writing-modes/) — Optional
  Vertical text (Japanese, Traditional Chinese, Mongolian) needs CSS writing-mode. Chinese, Japanese, Korean, and Thai also need explicit line-break and word-break rules so wrapping respects script-specific conventions.
- [ ] [Locale-aware content](https://specification.website/spec/i18n/locale-content/) — Recommended
  Dates, numbers, currency, and units should be formatted in the user's locale. Use Intl APIs in the browser and the same locale data server-side so output matches expectations.
- [ ] [Plural rules and grammatical number](https://specification.website/spec/i18n/plural-rules/) — Recommended
  Most languages don't pluralise like English. Use CLDR plural categories — zero, one, two, few, many, other — via Intl.PluralRules instead of hard-coded 'item' vs 'items' logic.
- [ ] [Internationalised Domain Names (IDN)](https://specification.website/spec/i18n/idn-support/) — Optional
  IDNs let domain names contain non-ASCII characters. They are encoded as Punycode on the wire and rendered as Unicode in the browser, subject to anti-spoofing rules.

