---
name: botanical-future-health
description: 'Use when designing, writing, reviewing, or updating the Arhaya Products storefront around botanical wellness, plant-based living, future health, natural solutions, sustainability, and quality of life. Covers product storytelling, visual direction, UX copy, and frontend implementation.'
argument-hint: '[page, product, or storefront task]'
user-invocable: true
---

# Botanical Future Health

## Purpose

Create a grounded, premium botanical storefront for Arhaya Products. The experience should connect plant-based products with a healthier future and better quality of life while respecting evidence, user trust, accessibility, and the existing Vite + React + TypeScript codebase.

Use nature as a source of practical solutions and hopeful direction, not as a promise that every human problem can be solved by a product. The brand voice is clear, warm, intelligent, and optimistic.

## When to Use

- Build or revise Arhaya storefront pages, components, product cards, or product details.
- Write product descriptions, headlines, calls to action, FAQs, or educational content about botanical products.
- Review visual design for a plant-based, future-health, or natural-solutions direction.
- Improve responsive UX, accessibility, content hierarchy, or conversion flow in this storefront.
- Add botanical product data or supplied product imagery.

## Workflow

1. **Identify the surface**
   - Locate the page, component, data model, or style token that owns the requested behavior.
   - Reuse existing React, Tailwind, routing, Zustand, Lucide, and product-data patterns.
   - Keep the change focused; do not introduce a new design system for a local task.

2. **Clarify the promise**
   - Define the user benefit in concrete terms: what the product is, who it is for, how it fits daily life, and what makes it responsibly sourced or formulated.
   - Frame the larger mission as a direction: healthier routines, resilient communities, respect for ecosystems, and better choices for future generations.
   - Replace absolute claims such as “solves all problems,” “cures,” “guarantees,” or “reverses aging” with specific, supportable, aspirational language.
   - Never invent ingredients, origins, certifications, clinical evidence, dosage, safety claims, or environmental statistics. Ask for source material or leave a clearly marked content gap.

3. **Shape the experience**
   - Make the actual product or shopping task visible early; avoid turning the storefront into a generic sustainability landing page.
   - Use a calm editorial hierarchy: concise benefit-led headings, scannable supporting copy, clear price and availability, and direct actions.
   - Balance nature with evidence and usability. Botanical imagery, textures, and color may establish atmosphere, but product photography must still show the actual item clearly.
   - Use repeated product items as cards only where framing helps comparison. Keep page sections spacious and unboxed.
   - Use familiar icons from the existing icon library for cart, navigation, information, and actions, with accessible labels or tooltips.

4. **Apply the visual direction**
   - Favor a living palette with leafy greens, mineral neutrals, warm botanical accents, and restrained contrast. Avoid default purple gradients and an undifferentiated beige wash.
   - Prefer expressive display typography paired with a highly legible text face, while respecting fonts already available in the project and avoiding unnecessary external font dependencies.
   - Use subtle organic structure such as fine botanical linework, paper grain, plant shadows, or restrained gradients. Do not use decorative blobs or visual noise behind key content.
   - Add only purposeful motion: gentle page-load reveals, product-image transitions, and state feedback. Respect `prefers-reduced-motion`.

5. **Write trustworthy copy**
   - Use a voice that is human, sensory, informed, and future-facing without sounding mystical or alarmist.
   - Prefer: “plant-led,” “thoughtfully made,” “supports a considered routine,” “rooted in nature,” “designed for everyday wellbeing,” and “a more resilient future.”
   - Qualify wellness language when evidence is limited: “may support,” “traditionally used for,” or “part of a balanced routine.”
   - Keep calls to action concrete: “Shop botanical essentials,” “Explore ingredients,” “Build your routine,” or “View product details.”
   - Do not imply that botanical products replace professional medical advice or treatment. Add appropriate disclaimers when a page discusses health outcomes.

6. **Implement safely**
   - Preserve public APIs, routes, cart behavior, product types, and existing responsive breakpoints unless the request requires a change.
   - Keep images performant and meaningful: use the supplied asset when available, provide useful `alt` text, and avoid decorative imagery competing with product information.
   - Ensure text fits at mobile and desktop widths, controls have stable dimensions, keyboard focus is visible, and color contrast is sufficient.
   - Keep forms, checkout, cart, quantity controls, and WhatsApp/contact actions functional after visual changes.

7. **Verify the result**
   - Run the narrowest relevant check first, then `npm run build` when frontend code or types changed.
   - Check the affected route at mobile and desktop widths when UI behavior is involved.
   - Confirm no unsupported claims or placeholder copy remain in the changed surface.
   - Confirm product names, prices, images, cart actions, navigation, and empty/loading/error states still behave correctly.

## Content Guardrails

- Nature is a partner and source of practical insight, not a guarantee.
- Wellness positioning must not become medical diagnosis, treatment, prevention, or cure language.
- Sustainability claims require specifics or careful qualification; do not use “zero impact,” “100% sustainable,” or similar absolutes without verified evidence.
- Future-generation messaging should lead to an actionable present-day choice, not fear, guilt, or catastrophe framing.
- Keep the customer’s agency intact: explain choices and benefits rather than implying moral failure for not buying.

## Completion Criteria

A task is complete when the affected experience is visually consistent with a premium botanical brand, communicates a specific and credible customer benefit, keeps future-health ambition visible but grounded, works responsively, preserves existing shopping behavior, and passes the relevant build or focused validation check.
