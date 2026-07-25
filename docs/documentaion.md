Yes. I reviewed both documents:

Current implementation: RAMA_Master_Build_Specification.md
Target vision / strategy: RAMA_Dubai_Real_Estate_Technical_Blueprint.pdf

After comparing them, my conclusion is:

The current MVP is only about 25–30% of the product envisioned in the blueprint.

The good news is that the foundations are solid. The architecture does not need to be rewritten—it needs to evolve from a beautiful property listing application into a decision platform.

Overall Audit

The biggest difference isn't technical.

It's product philosophy.

Current MVP:

Beautiful real estate website.

Blueprint:

Evidence-driven decision operating system.

That is a completely different category.

Instead of competing with Property Finder or Bayut on listings...

RAMA should compete on confidence.

That idea is already present throughout the blueprint (Trust Passport, Decision Record, Life-fit, Evidence Layer, Off-plan Intelligence, etc.).

Current MVP Score
Area	Current	Target
UI Design	9/10	10/10
Property Discovery	8/10	10/10
Search	7/10	10/10
Authentication	9/10	9/10
AI	6/10	10/10
Trust	4/10	10/10
Data Intelligence	3/10	10/10
Decision Workflow	2/10	10/10
Property Detail	6/10	10/10
Advisor Experience	5/10	10/10
Post Purchase	0/10	10/10
Biggest Problem

The MVP is still organized like:

Search

↓

Property

↓

Details

↓

Contact

That is exactly how every portal works.

Instead, RAMA should become:

Goal

↓

Life Brief

↓

Search

↓

Compare

↓

Evidence

↓

Tour

↓

Questions

↓

Decision

↓

Continue

↓

Ownership

That follows the blueprint almost exactly.

New Product Architecture

I would completely reorganize the application.

Instead of pages...

Think in workspaces.

Dashboard

Discover

Compare

Property

Decision Lab

Advisor

Tasks

Documents

Ownership

Notice:

No marketing pages.

No unnecessary landing pages.

Pure web application.

Dashboard

Instead of a hero section...

The user lands inside a workspace.

Imagine Linear.

Imagine Notion.

Imagine Stripe.

Imagine Raycast.

Very little visual noise.

The dashboard becomes

Continue where you left off

Recent searches

Current decision

Saved homes

Recommendations

Advisor

Market updates

Instead of

Big photo

Marketing text

Buttons

Discovery

Current

Search

Grid

Filters

Upgrade

Smart Search

Map

Collections

Life-fit filters

AI suggestions

Saved searches

Recent searches

Commute

School

Investment

Accessibility

Off-plan

Ready

Verified

Evidence %

Risk %

New Information Architecture

Current

Home

Homes

Areas

Insights

AI


Future

Dashboard

Discover

Collections

Map

Decision Lab

Saved

Advisor

Documents

Settings
Property Page

This is where RAMA wins.

The blueprint already hints at it.

I would redesign the entire property page.

Instead of

Photos

Description

Features

Map

Create sections like

Overview

Evidence

Trust Passport

Costs

Timeline

Neighbourhood

Tour

Questions

Documents

Advisor

Property becomes a Workspace

Not a webpage.

Think of a property as a project.

Example

Property

Overview

Evidence

Financial

Timeline

Notes

Documents

Questions

Tour

History


Almost like GitHub Issues.

Everything organized.

Decision Lab

This is missing entirely.

It should become one of RAMA's flagship features.

Compare

A vs B

Commute

Costs

Investment

Schools

Accessibility

View

Noise

Orientation

Heat

Future metro

Rental potential

Unknowns

Instead of comparing specs...

Compare life.

AI

Current MVP

Chatbot

Future

Personal advisor

Decision assistant

Property explainer

Document explainer

Risk analyzer

Negotiation assistant

Question generator

Viewing assistant

Follow-up generator

AI should exist throughout the product—not only in one chat page.

Trust Passport

This is the product's moat.

I would redesign it completely.

Instead of badges...

Create something like:

Property Health

94%

Evidence

██████████

Freshness

████████

Risk

███

Unknown

██

Verified

93 items


Every section expands.

Every item has provenance.

Exactly aligned with the blueprint's Trust Passport vision.

Visual Design (July 2026)

I would avoid the current SaaS trend of excessive glassmorphism.

Instead follow a modern Nordic application aesthetic.

Principles
almost white canvas
generous whitespace
soft elevation
calm typography
restrained colour palette
very subtle gradients
almost invisible borders
rounded 12–16 px
no heavy shadows
no decorative blobs
no neon
no floating glass everywhere
monochrome first
colour only for meaning

Think more:

Linear
Raycast
Arc Browser
Stripe Dashboard
Vercel
Notion Calendar

rather than:

Dribbble
flashy dashboard templates
Nordic Lagom (100%)

The current document mentions Nordic Lagom, but mostly through colours and spacing.

I'd extend it into a complete operating philosophy:

Visual Rhythm

8-point grid

Motion

120–180 ms

No bounce

No exaggerated easing

Density

Maximum

3 hierarchy levels


Never 5–6.

Colour

90% neutral

10% accent

Cards

Only when grouping information.

Not everything should be inside cards.

Typography

Editorial but understated.

High readability.

Large line height.

Very little bold text.

Navigation

Always obvious.

No hidden interactions.

New Design Language

I would introduce a component language specifically for RAMA:

Evidence Components
Evidence Badge
Freshness Indicator
Confidence Meter
Verification Timeline
Provenance Drawer
Financial Components
Cost Waterfall
Monthly Breakdown
Cash Needed
Investment Projection
Fee Timeline
Tour Components
Room Timeline
Measurement Overlay
Defect Marker
Light Simulation
View Compass
Decision Components
Decision Score
Comparison Matrix
Unknown Items
Risk Summary
Recommendation Reasoning
Technical Upgrade

Current architecture is already good (Next.js, Supabase, Tailwind, shadcn, AI, i18n).

I would evolve it with:

Feature-based module architecture instead of page-centric organisation.
Server Components by default with Client Components only where interaction demands it.
TanStack Query for client-side data orchestration.
Background jobs (Supabase Edge Functions) for evidence freshness and indexing.
Vector search for semantic property discovery and AI retrieval.
Event-driven activity and audit logs.
Offline-capable saved properties using IndexedDB.
Progressive streaming for media-heavy property pages.
Virtualized data grids and optimistic updates throughout the workspace.
Recommended Development Roadmap

Phase 1 – UX Foundation

Replace the landing-first experience with an application-first dashboard.
Rebuild navigation around user decisions.
Establish a unified design system based on Nordic Lagom.

Phase 2 – Core Intelligence

Introduce Trust Passport.
Build Decision Lab.
Add evidence and provenance layers.
Expand AI into contextual assistance.

Phase 3 – Immersive Experience

Property workspace redesign.
Inspection-grade tours.
Advanced comparison.
Financial scenario modelling.

Phase 4 – Lifecycle Platform

Documents.
Tasks.
Offers.
Handover.
Ownership.
Maintenance.
Resale workflows.
Final assessment

The technical blueprint is already a strong strategic document, but the current MVP intentionally omits many of the platform's differentiating capabilities (such as Trust Passport, full decision workflows, financial modelling, and lifecycle continuity) in favour of rapid delivery.

I recommend treating the current MVP as Foundation v1 rather than "the product." The next iteration should be a workspace-centric real estate operating system—not another listing portal. If executed well, RAMA would occupy a distinctive position in the Dubai market by focusing on decision quality, evidence transparency, and calm, premium user experience rather than catalogue size.

Excellent. This chapter is arguably the most important in the entire specification.

Most projects document components.

Very few document the system that creates components.

RAMA should.

This chapter defines the DNA of the UI.

# =============================================================================
# CHAPTER 05
# DESIGN SYSTEM FOUNDATION
# =============================================================================

## Purpose

The Design System is the visual and interaction foundation of RAMA Version 2.

Every interface within the application must be built using this system.

No component should introduce new visual language without first extending the design system.

The objective is consistency.

The objective is predictability.

The objective is timeless software.

The design system is not decoration.

The design system is infrastructure.

---

# Design Philosophy

The RAMA interface follows Nordic Lagom.

Lagom means:

Not too little.

Not too much.

Enough.

Every interface should feel calm.

Every interaction should feel intentional.

Every visual element should communicate purpose.

Avoid excess.

Avoid noise.

Avoid decoration.

The interface should disappear so users can focus on making decisions.

---

# Core Design Principles

The design system follows eight principles.

## 1. Purpose Before Decoration

Every element exists to solve a problem.

Nothing is decorative by default.

If an element does not improve understanding, remove it.

---

## 2. Calm Interfaces

Reduce cognitive load.

Increase clarity.

Avoid visual competition.

Whitespace is part of the interface.

Do not attempt to fill every space.

---

## 3. Semantic Design

Colour communicates meaning.

Spacing communicates hierarchy.

Typography communicates importance.

Motion communicates change.

Every visual decision must be intentional.

---

## 4. Consistency

The same interaction should always behave the same way.

Buttons.

Inputs.

Cards.

Dialogs.

Tables.

Navigation.

Everything should feel familiar.

---

## 5. Accessibility First

Accessibility is a design requirement.

Not a testing requirement.

Every component must support:

Keyboard

Screen Reader

Reduced Motion

High Contrast

RTL

Large Touch Targets

---

## 6. Progressive Disclosure

Show only what is necessary.

Reveal additional complexity when users ask for it.

Do not overwhelm users.

---

## 7. Information Density

Dense does not mean crowded.

Minimal does not mean empty.

Aim for balanced information density.

Every screen should communicate efficiently.

---

## 8. Timelessness

Avoid visual trends.

Avoid novelty for its own sake.

The interface should still feel modern five years from now.

---

# Visual Identity

The application should feel like:

Apple

Linear

Notion

Arc Browser

Stripe Dashboard

Aesop

Muji

Nordic Architecture

The interface should not imitate these products.

It should learn from their clarity.

---

# Colour Philosophy

Colour communicates state.

Never decoration.

Never branding.

Every colour has semantic meaning.

Colour categories:

Canvas

Surface

Surface Elevated

Border

Divider

Primary Text

Secondary Text

Muted Text

Interactive

Interactive Hover

Interactive Active

Success

Warning

Danger

Information

Evidence

Unknown

Disabled

Focus

Overlay

Scrim

---

# Colour Rules

Do not use arbitrary colours.

Do not use gradients as primary UI.

Do not use saturated colours for large surfaces.

Reserve accent colours for actions.

Status colours should remain subtle.

The interface should remain readable in grayscale.

---

# Typography Philosophy

Typography creates hierarchy.

Not decoration.

Typography should be quiet.

Readable.

Balanced.

Professional.

Avoid oversized headings.

Avoid dramatic typography.

---

# Typography Scale

Display

Page Title

Section Title

Card Title

Heading

Body Large

Body

Body Small

Caption

Label

Overline

Code

Every component must use this scale.

Never create custom typography.

---

# Font Rules

Maximum:

One display family.

One interface family.

One monospace family.

Support:

English

Arabic

RTL

Consistent line height.

Consistent spacing.

---

# Spacing System

Spacing follows an 8-point grid.

Examples

4

8

12

16

24

32

40

48

64

80

96

128

Never invent spacing values.

Use spacing tokens.

---

# Grid System

Desktop

12 columns

Tablet

8 columns

Mobile

4 columns

Content Width

Constrained.

Reading Width

Optimised for comprehension.

Never allow text to stretch across ultra-wide screens.

---

# Border Radius

Corner radius communicates hierarchy.

Large radius is not luxury.

Use restraint.

Hierarchy:

None

Small

Medium

Large

Extra Large

Full

Do not mix arbitrary radius values.

---

# Shadows

Shadows communicate elevation.

Not decoration.

Levels:

None

Low

Medium

High

Overlay

Avoid dramatic drop shadows.

Prefer subtle separation.

---

# Borders

Borders are preferred over shadows.

Use borders to define structure.

Use shadows only when elevation is required.

---

# Elevation Model

Every component belongs to an elevation level.

Canvas

↓

Surface

↓

Raised Surface

↓

Floating Surface

↓

Overlay

↓

Modal

↓

Toast

Do not invent additional levels.

---

# Motion Philosophy

Motion explains.

Motion never entertains.

Animation exists only to:

Explain hierarchy.

Confirm actions.

Reduce confusion.

Guide attention.

Never animate for decoration.

---

# Motion Tokens

Instant

Fast

Normal

Slow

Extra Slow

Every animation uses predefined durations.

Never create custom timing.

---

# Motion Rules

Avoid bounce.

Avoid elastic movement.

Avoid exaggerated scaling.

Prefer opacity.

Prefer translation.

Prefer subtle transitions.

Respect reduced motion preferences.

---

# Iconography

One icon family.

Consistent stroke.

Consistent optical size.

No emoji.

No mixed illustration styles.

Icons support text.

Icons never replace text.

---

# Illustration

Illustrations are optional.

Use only when they improve understanding.

Empty states.

Education.

Onboarding.

Never use illustrations inside productivity workflows.

---

# Photography

Photography should be authentic.

High quality.

Architectural.

Natural lighting.

Minimal editing.

Never use generic stock photography.

---

# Component Anatomy

Every component defines:

Purpose

Structure

Variants

States

Accessibility

Responsive Behaviour

Motion

Examples

Anti-patterns

Every component should be documented consistently.

---

# Component States

Every interactive component supports:

Default

Hover

Pressed

Focused

Disabled

Loading

Success

Error

Selected

Read Only

Do not invent custom states.

---

# Empty States

Every empty state must:

Explain why it is empty.

Explain what users can do next.

Provide one primary action.

Avoid decorative illustrations unless they aid comprehension.

---

# Loading States

Never display blank screens.

Prefer skeletons over spinners.

Streaming content should reveal progressively.

Users should always understand what is loading.

---

# Error States

Errors should:

Explain what happened.

Explain why.

Explain what users can do next.

Never expose technical errors directly.

---

# Responsive Design

The application is responsive by default.

Desktop first.

Tablet second.

Mobile third.

Every component must define behaviour across all breakpoints.

---

# Dark Mode

Dark mode is a first-class experience.

Not an afterthought.

Do not simply invert colours.

Adjust contrast.

Reduce glare.

Maintain hierarchy.

---

# RTL Support

RTL support is mandatory.

Every component must function correctly in:

LTR

RTL

Avoid assumptions about text direction.

Use logical CSS properties wherever possible.

---

# Accessibility Tokens

Focus Ring

Focus Offset

Minimum Touch Target

Minimum Contrast

Keyboard Navigation

Reduced Motion

High Contrast

These tokens are part of the design system.

---

# Design Tokens

Every visual value must originate from a design token.

Never hardcode:

Colours

Spacing

Typography

Radius

Shadow

Z-index

Opacity

Transitions

Durations

Every component consumes tokens.

No exceptions.

---

# Design System Checklist

Every component must satisfy:

✓ Uses semantic colours

✓ Uses spacing tokens

✓ Uses typography scale

✓ Uses elevation model

✓ Uses motion tokens

✓ Supports accessibility

✓ Supports dark mode

✓ Supports RTL

✓ Responsive

✓ Reusable

✓ Documented

If any requirement fails, the component is incomplete.

# End of Chapter 05
Next Chapter

At this point, I would move directly into Chapter 06 – Application Shell & Global Layout.

This is where the specification stops describing principles and starts defining the actual application structure:

Global shell (App layout)
Sidebar
Top navigation
Command palette
Search
Notification centre
User menu
Breadcrumbs
Workspace layout
Split-view panels
Responsive behaviour
Keyboard shortcuts
Global loading/error handling

This chapter effectively defines the framework that every subsequent workspace (Dashboard, Discover, Property, Decision Lab, etc.) will inherit, ensuring consistency across the entire RAMA Version 2 application.

go ahead

Excellent. This is where the document starts becoming a true build manual instead of an architecture guide.

The Application Shell is the foundation that every workspace inherits. If it is designed well, the rest of the application becomes significantly easier to build and maintain.

# =============================================================================
# CHAPTER 06
# APPLICATION SHELL & GLOBAL LAYOUT
# =============================================================================

## Purpose

The Application Shell is the permanent framework of RAMA.

It provides the structure that every workspace inherits.

Users should never feel like they are navigating between separate pages.

Instead, they should feel like they are working inside one continuous application.

The shell is persistent.

Only the workspace changes.

---

# Primary Objective

Build an application that behaves like professional productivity software.

The shell should feel closer to:

• Linear

• Notion

• Arc Browser

• Stripe Dashboard

• GitHub

than traditional websites.

The shell should remain visible throughout the user journey.

---

# Design Principles

The application shell should:

• remain calm

• remain lightweight

• minimise context switching

• preserve navigation state

• minimise layout shift

• reduce unnecessary page transitions

Users should always know:

Where they are.

What they are doing.

What they can do next.

---

# Global Layout

Desktop

```

┌────────────────────────────────────────────────────────────┐

│ Header │

├──────────────┬─────────────────────────────────────────────┤

│ │ │

│ │ │

│ Sidebar │ Workspace │

│ │ │

│ │ │

├──────────────┴─────────────────────────────────────────────┤

│ Status / Background Processes │

└────────────────────────────────────────────────────────────┘

```

The layout remains consistent across every workspace.

---

# Shell Components

The Application Shell consists of:

Header

Sidebar

Workspace Container

Command Palette

Notification Centre

Search Layer

Global Dialog Manager

Toast Manager

Background Task Manager

Theme Manager

Session Manager

Keyboard Shortcut Manager

These components are global.

Individual features should not duplicate them.

---

# Header

Purpose

Provide global navigation and user context.

Contains

Application Logo

Workspace Title

Breadcrumb

Universal Search

Quick Actions

Notifications

User Menu

The header height remains constant.

Avoid dynamic resizing.

---

# Sidebar

Purpose

Primary navigation.

Collapsed Width

72px

Expanded Width

280px

Contains

Dashboard

Discover

Decision Lab

Properties

Communities

Collections

Documents

Tasks

Portfolio

Settings

Never exceed ten primary navigation items.

---

# Sidebar Behaviour

Desktop

Always visible.

Tablet

Collapsible.

Mobile

Hidden by default.

Accessible through drawer navigation.

---

# Workspace Container

The workspace is where features are rendered.

Responsibilities

Display feature content.

Manage scrolling.

Maintain layout consistency.

Support loading states.

Support split panels.

Support responsive layouts.

---

# Workspace Width

Content Width

Constrained.

Readable.

Ultra-wide monitors should not stretch content unnecessarily.

Use whitespace intentionally.

---

# Global Search

Search is available from every screen.

Keyboard Shortcut

Ctrl + K

or

⌘ + K

Search should return:

Properties

Communities

Buildings

Developers

Documents

Saved Items

Users

Tasks

Recent Activity

Navigation Commands

Search is an application capability.

Not a page.

---

# Command Palette

Purpose

Enable power-user workflows.

Examples

Navigate

Open Property

Create Decision

Upload Document

Search Community

Open Settings

Switch Theme

Open Notifications

The command palette should become the fastest way to navigate RAMA.

---

# Notification Centre

Purpose

Provide actionable updates.

Notification Types

System

Property Updates

AI Insights

Tasks

Document Status

Market Alerts

Viewing Reminders

Financial Updates

Notifications should support:

Read

Unread

Archive

Dismiss

Grouping

Filtering

---

# Global Dialog Manager

Every modal is managed centrally.

Supported Dialogs

Confirmation

Delete

Upload

Share

Authentication

Property Actions

Decision Actions

Error Recovery

Avoid nested dialogs.

---

# Toast System

Purpose

Communicate temporary feedback.

Examples

Saved Successfully

Document Uploaded

AI Summary Ready

Decision Created

Changes Published

Toasts should:

Disappear automatically.

Remain accessible.

Never block interaction.

---

# Background Task Manager

Long-running operations should execute in the background.

Examples

AI Processing

Document Analysis

Media Upload

Report Generation

Property Synchronisation

Show progress without blocking users.

---

# Session Management

The shell is responsible for:

Authentication State

Session Refresh

Idle Timeout

Permission Updates

Profile Refresh

Users should rarely notice session management.

---

# Theme Manager

Support

Light

Dark

High Contrast (future)

Themes should switch instantly.

No page refresh.

---

# Keyboard Shortcuts

The shell owns global shortcuts.

Examples

Ctrl + K

Open Search

G + D

Dashboard

G + P

Properties

G + C

Communities

Esc

Close Dialog

/

Focus Search

?

Open Shortcut Help

Power users should navigate without a mouse whenever possible.

---

# Breadcrumbs

Every workspace displays breadcrumbs.

Example

Dashboard

↓

Discover

↓

Dubai Marina

↓

Marina Gate

↓

Unit 2403

Breadcrumbs should reflect user context.

Not routing structure.

---

# Split View

The shell supports multiple layouts.

Single Panel

Dual Panel

Triple Panel

Example

```

Property List │ Map

```

or

```

Property │ Trust Passport

```

Panels should resize smoothly.

---

# Global Loading

Never display blank pages.

Preferred loading strategy

Skeleton

↓

Progressive Streaming

↓

Content

Avoid blocking the interface.

---

# Global Error Handling

Unexpected failures should:

Explain the problem.

Preserve user work.

Offer recovery.

Provide retry actions.

Never crash the application.

---

# Empty States

Every workspace should support meaningful empty states.

Include:

Explanation

Primary Action

Optional Secondary Action

Avoid decorative content.

---

# Navigation State

Remember:

Sidebar state

Workspace

Scroll position

Filters

Sorting

Split panel size

Search history

Users should return to exactly where they left off.

---

# Responsive Behaviour

Desktop

Persistent sidebar.

Tablet

Collapsible navigation.

Mobile

Bottom navigation + drawer.

No feature should become inaccessible on smaller screens.

---

# Accessibility

The Application Shell must support:

Keyboard navigation.

Logical focus order.

Screen readers.

Reduced motion.

Focus indicators.

ARIA landmarks.

Skip links.

---

# Performance

The shell should load once.

Subsequent navigation should update only workspace content.

Avoid full page reloads.

Avoid unnecessary layout shifts.

---

# Shell Responsibilities

The shell owns:

Navigation

Authentication

Search

Notifications

Dialogs

Themes

Session

Background Tasks

Layout

Global State

Features should never duplicate shell responsibilities.

---

# Acceptance Criteria

The Application Shell is complete when:

✓ Navigation is persistent.

✓ Layout is responsive.

✓ Search works globally.

✓ Command palette is operational.

✓ Notifications are functional.

✓ Session management is stable.

✓ Keyboard shortcuts are implemented.

✓ Accessibility requirements are satisfied.

✓ Performance targets are met.

✓ All workspaces inherit the shell without modification.

# End of Chapter 06
Recommended next chapter

I would now move to Chapter 07 – Navigation & Information Architecture, where we define:

Every workspace in the application
Navigation hierarchy
User journeys
Route structure
URL conventions
Workspace relationships
Access control
Deep linking
Search indexing
Breadcrumb generation
Navigation permissions

This chapter becomes the blueprint for how users move through RAMA before we begin implementing individual workspaces like Dashboard, Discover, and Property Workspace.

go ahead

Excellent. This chapter is where the product truly starts to take shape.

From this point forward, the document stops discussing engineering and begins defining the actual product architecture.

This is arguably one of the most important chapters because a poor Information Architecture cannot be fixed later without massive refactoring.

# =============================================================================
# CHAPTER 07
# NAVIGATION & INFORMATION ARCHITECTURE
# =============================================================================

## Purpose

This chapter defines the complete navigation architecture for RAMA Version 2.

Navigation is not a list of pages.

Navigation represents the mental model of the product.

Users should never think in terms of pages.

Users should think in terms of workspaces.

Every workspace represents a meaningful stage of the property decision journey.

The application should feel like one continuous product.

Not multiple disconnected pages.

---

# Navigation Philosophy

Traditional Property Portal

Home

↓

Search

↓

Property

↓

Agent

↓

Exit

RAMA

Dashboard

↓

Discover

↓

Property Workspace

↓

Decision Lab

↓

Ownership

The journey continues after a property is found.

---

# Product Mental Model

Every user should understand RAMA using five ideas.

Discover

↓

Understand

↓

Compare

↓

Decide

↓

Manage

Everything inside the application belongs to one of these categories.

---

# Navigation Principles

Navigation must be:

Predictable

Consistent

Persistent

Minimal

Context Aware

Searchable

Keyboard Accessible

Responsive

The navigation should never require explanation.

---

# Primary Navigation

Desktop Sidebar

Dashboard

Discover

Properties

Communities

Decision Lab

Collections

Documents

Tasks

Portfolio

Settings

Maximum

10 items

Do not exceed this limit.

---

# Navigation Hierarchy

Level 1

Workspace

Example

Dashboard

Discover

Portfolio

---

Level 2

Feature

Example

Properties

Communities

Collections

---

Level 3

Context

Example

Dubai Marina

Marina Gate

Apartment 2403

---

Level 4

Action

Edit

Compare

Upload

Share

Bookmark

Navigation should never exceed four levels.

---

# Workspace Architecture

The platform is organised into independent workspaces.

Dashboard

↓

Discover

↓

Property Workspace

↓

Decision Lab

↓

Portfolio

↓

Settings

Each workspace owns its own business logic.

Each workspace is independently expandable.

---

# Dashboard Workspace

Purpose

Daily operating centre.

Contains

Recent Activity

Continue Working

Saved Items

Tasks

Recommendations

Market Updates

Notifications

Quick Actions

The Dashboard is the application's home.

---

# Discover Workspace

Purpose

Explore opportunities.

Contains

Universal Search

Communities

Properties

Projects

Developers

Map

Collections

Saved Searches

Recommendations

Discovery is intelligence-driven.

Not catalogue-driven.

---

# Property Workspace

Purpose

Complete understanding of one property.

Contains

Overview

Gallery

Trust Passport

Evidence

Timeline

Financials

Neighbourhood

Questions

Documents

History

Advisor

This is the primary product workspace.

---

# Community Workspace

Purpose

Understand locations.

Contains

Overview

Schools

Transport

Walkability

Investment

Rental Trends

Projects

Lifestyle

Market Trends

Future Developments

Communities are products.

Not filters.

---

# Decision Lab

Purpose

Support high-confidence decisions.

Contains

Comparison

Trade-offs

Notes

Pros & Cons

AI Analysis

Financial Comparison

Commute

Risk Analysis

Decision History

Decision Lab is the platform's core differentiator.

---

# Portfolio Workspace

Purpose

Manage owned properties.

Contains

Properties

Documents

Maintenance

Warranty

Insurance

Tasks

History

Portfolio Analytics

The relationship continues after purchase.

---

# Documents Workspace

Purpose

Manage property documentation.

Contains

Contracts

Floor Plans

Reports

Invoices

Inspection Reports

AI Summaries

Document History

Every document should support search.

---

# Tasks Workspace

Purpose

Track progress.

Contains

Viewings

Follow-ups

Reminders

Deadlines

Offers

Document Requests

Mortgage Tasks

Tasks should integrate throughout the platform.

---

# Settings Workspace

Purpose

Platform configuration.

Contains

Profile

Security

Notifications

Accessibility

Language

Appearance

Connected Accounts

Privacy

Billing (future)

Settings should never contain business workflows.

---

# Route Structure

Routes should mirror workspaces.

Examples

/app/dashboard

/app/discover

/app/property/[id]

/app/community/[id]

/app/decision

/app/documents

/app/tasks

/app/portfolio

/app/settings

URLs should be clean.

Readable.

Stable.

---

# URL Design

Good

/property/marina-gate-unit-2403

/community/dubai-marina

Bad

/property?id=3829&type=unit

Avoid implementation details.

---

# Breadcrumb Strategy

Breadcrumbs represent user context.

Example

Dashboard

↓

Discover

↓

Dubai Marina

↓

Marina Gate

↓

Apartment 2403

Never expose routing internals.

---

# Navigation Persistence

Remember

Sidebar state

Last workspace

Recent searches

Open panels

Sort order

Filters

Split view

Workspace layout

Users should return exactly where they left off.

---

# Context Switching

Moving between workspaces should preserve context.

Example

Property

↓

Decision Lab

The selected property should already be loaded.

Never force unnecessary repetition.

---

# Deep Linking

Every meaningful state should be shareable.

Examples

Filtered search

Saved comparison

Specific document

Decision workspace

Map position

AI insight

Deep links should recreate context.

---

# Search Integration

Universal Search indexes

Properties

Communities

Buildings

Developers

Documents

Tasks

Collections

Users

Commands

Settings

Search is global.

Not workspace-specific.

---

# Permissions

Navigation should respect permissions.

Hidden workspaces

Restricted actions

Read-only modes

Administrative tools

Permissions should affect visibility before interaction.

---

# Mobile Navigation

Bottom Navigation

Dashboard

Discover

Search

Tasks

Profile

Additional workspaces are accessible through the navigation drawer.

Keep the bottom bar focused on the most common actions.

---

# Keyboard Navigation

Support

Tab

Arrow Keys

Escape

Enter

Shortcut Commands

Every primary workspace should have a shortcut.

Example

G D

Dashboard

G P

Properties

G C

Communities

G T

Tasks

G S

Search

---

# Workspace Entry Rules

Every workspace should immediately answer:

Where am I?

What can I do?

What is most important?

What should I do next?

No workspace should begin with decorative content.

---

# Navigation Analytics

Track anonymously:

Workspace usage

Navigation paths

Search usage

Abandoned flows

Command palette usage

Time to destination

Use analytics to improve IA.

Never to manipulate users.

---

# Empty Navigation States

If a workspace has no content:

Explain why.

Suggest the next action.

Provide one primary CTA.

Avoid dead ends.

---

# Information Architecture Principles

Every new feature must answer:

Which workspace owns this?

Does it belong in an existing workflow?

Can an existing system be extended?

Should this be searchable?

Should this appear in navigation?

If ownership is unclear, the feature is not ready for implementation.

---

# Acceptance Criteria

The Information Architecture is complete when:

✓ Every feature belongs to a single workspace.

✓ Navigation remains under ten primary items.

✓ URLs are stable and human-readable.

✓ Breadcrumbs reflect user context.

✓ Search spans the entire platform.

✓ Keyboard navigation is supported.

✓ Mobile navigation remains usable.

✓ Deep linking restores application state.

✓ Permissions are respected.

✓ Every workspace has a clearly defined purpose.

# End of Chapter 07
Before continuing to Chapter 08

This is where I would make one strategic adjustment to the overall specification.

Rather than jumping directly into Dashboard, I would insert one additional chapter:

CHAPTER 08
DOMAIN MODEL & BUSINESS CAPABILITIES

This chapter would define the core business entities before any UI is built. For example:

Property
Community
Building
Developer
User
Collection
Decision
Trust Passport
Evidence
Financial Analysis
Document
Task
Viewing
Portfolio

For each entity, it would describe:

Purpose
Ownership
Relationships
Lifecycle
Business rules
Permissions
Events
AI interactions

By defining the domain model first, every subsequent workspace (Dashboard, Discover, Property Workspace, Decision Lab, etc.) is built on a consistent business vocabulary, reducing duplication and making both the codebase and the documentation much easier to evolve over time.