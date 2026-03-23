from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path("/Users/danielcastillo/Mediageekzquotes")
OUTPUT = ROOT / "output" / "pdf" / "threadlink-pricing-report-2026-03-23.pdf"


BRAND = {
    "navy": colors.HexColor("#0F172A"),
    "indigo": colors.HexColor("#4338CA"),
    "indigo_soft": colors.HexColor("#E0E7FF"),
    "orange": colors.HexColor("#F97316"),
    "orange_soft": colors.HexColor("#FFEDD5"),
    "slate": colors.HexColor("#334155"),
    "muted": colors.HexColor("#64748B"),
    "border": colors.HexColor("#CBD5E1"),
    "bg": colors.HexColor("#F8FAFC"),
    "green": colors.HexColor("#166534"),
    "green_soft": colors.HexColor("#DCFCE7"),
    "red": colors.HexColor("#991B1B"),
    "red_soft": colors.HexColor("#FEE2E2"),
}


CURRENT_DATE = "March 23, 2026"


def money(value):
    return f"${value:,.0f}"


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="ReportTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=34,
            textColor=BRAND["navy"],
            alignment=TA_LEFT,
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ReportSubtitle",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=12,
            leading=18,
            textColor=BRAND["slate"],
            spaceAfter=18,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Kicker",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=BRAND["orange"],
            spaceAfter=6,
            tracking=1.2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=BRAND["navy"],
            spaceBefore=4,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionLead",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=17,
            textColor=BRAND["slate"],
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=15,
            textColor=BRAND["slate"],
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyBold",
            parent=styles["Body"],
            fontName="Helvetica-Bold",
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12,
            textColor=BRAND["muted"],
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Callout",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=17,
            textColor=BRAND["navy"],
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CenterSmall",
            parent=styles["Small"],
            alignment=TA_CENTER,
        )
    )
    return styles


STYLES = build_styles()


def p(text, style="Body"):
    return Paragraph(text, STYLES[style])


def bullets(items, left_indent=16):
    return ListFlowable(
        [
            ListItem(p(item, "Body"), leftIndent=0)
            for item in items
        ],
        bulletType="bullet",
        leftIndent=left_indent,
        bulletColor=BRAND["indigo"],
        bulletFontName="Helvetica-Bold",
        bulletFontSize=9,
    )


def card(title, body, fill, stroke, title_color=None):
    title_color = title_color or BRAND["navy"]
    table = Table(
        [
            [Paragraph(title, ParagraphStyle(
                "CardTitle",
                parent=STYLES["BodyBold"],
                fontSize=10,
                textColor=title_color,
                leading=13,
                spaceAfter=4,
            ))],
            [p(body, "Body")],
        ],
        colWidths=[6.7 * inch],
        splitByRow=0,
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 1, stroke),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return table


def small_stat_row(stats):
    rows = [[p(label, "Small"), p(value, "BodyBold")] for label, value in stats]
    table = Table(rows, colWidths=[2.2 * inch, 1.2 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 1, BRAND["border"]),
                ("INNERGRID", (0, 0), (-1, -1), 0.6, BRAND["border"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def comparison_table(data, widths, header_fill=BRAND["navy"]):
    header_style = ParagraphStyle(
        "TableHeader",
        parent=STYLES["Small"],
        fontName="Helvetica-Bold",
        fontSize=8.6,
        leading=10.5,
        textColor=colors.white,
    )
    body_style = ParagraphStyle(
        "TableBody",
        parent=STYLES["Small"],
        fontName="Helvetica",
        fontSize=8.2,
        leading=10.6,
        textColor=BRAND["slate"],
    )

    cooked = []
    for row_index, row in enumerate(data):
        cooked_row = []
        for cell in row:
            text = str(cell).replace("\n", "<br/>")
            cooked_row.append(Paragraph(text, header_style if row_index == 0 else body_style))
        cooked.append(cooked_row)

    table = Table(cooked, colWidths=widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), header_fill),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BRAND["bg"]]),
                ("BOX", (0, 0), (-1, -1), 0.8, BRAND["border"]),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, BRAND["border"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def draw_header_footer(canvas, doc):
    page = canvas.getPageNumber()
    if page == 1:
        return
    canvas.saveState()
    width, height = letter
    canvas.setStrokeColor(BRAND["border"])
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, height - 0.55 * inch, width - doc.rightMargin, height - 0.55 * inch)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(BRAND["navy"])
    canvas.drawString(doc.leftMargin, height - 0.42 * inch, "ThreadLink Video Pricing Report")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(BRAND["muted"])
    canvas.drawRightString(width - doc.rightMargin, height - 0.42 * inch, f"Prepared {CURRENT_DATE}")
    canvas.line(doc.leftMargin, 0.6 * inch, width - doc.rightMargin, 0.6 * inch)
    canvas.drawString(doc.leftMargin, 0.42 * inch, "MediaGeekz internal pricing analysis")
    canvas.drawRightString(width - doc.rightMargin, 0.42 * inch, f"Page {page}")
    canvas.restoreState()


def build_story():
    story = []

    story.append(Spacer(1, 0.55 * inch))
    story.append(p("MEDIAGEEKZ PRICING REPORT", "Kicker"))
    story.append(p("ThreadLink proposal pricing analysis", "ReportTitle"))
    story.append(
        p(
            "A detailed internal report on what MediaGeekz should charge for the ThreadLink concept and what a single benchmark-grade agency brand film should command in the Florida market.",
            "ReportSubtitle",
        )
    )

    cover_stats = Table(
        [
            [
                small_stat_row(
                    [
                        ("Prepared for", "MediaGeekz leadership"),
                        ("Market", "Florida / Orlando"),
                        ("Report date", CURRENT_DATE),
                    ]
                ),
                small_stat_row(
                    [
                        ("Current proposal anchor", money(7500)),
                        ("Recommended ThreadLink range", money(11500) + " - " + money(15500)),
                        ("Single-film recommended range", money(8500) + " - " + money(10500)),
                    ]
                ),
            ]
        ],
        colWidths=[3.35 * inch, 3.35 * inch],
    )
    cover_stats.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(cover_stats)
    story.append(Spacer(1, 0.25 * inch))
    story.append(
        card(
            "Bottom line",
            "The current ThreadLink Professional package at $7,500 is under-anchored for the scope shown on the proposal page. The page prices a small campaign, not one simple promo. If MediaGeekz wants to price like a top-tier Florida production company, the recommended anchor for the full ThreadLink package is in the low-to-mid teens, with a cleaner recommended ladder at $11,500 and $15,500.",
            BRAND["orange_soft"],
            BRAND["orange"],
            title_color=BRAND["orange"],
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(
        p(
            "This report was built from the local ThreadLink proposal page, MediaGeekz public positioning on mediageekz.com, internal rate-card minimums stored in the repo, and current public pricing anchors from comparable Florida production businesses and national brand-film guides.",
            "Small",
        )
    )
    story.append(PageBreak())

    story.append(p("1. Executive summary", "SectionTitle"))
    story.append(
        p(
            "The ThreadLink project is scoped like a compact campaign day with layered deliverables. The proposal includes two separate 60-90 second hero films, two extended web cuts, 6-8 social clips, BTS coverage, dual-camera production, lighting, sound design, and revision rounds. That is materially different from quoting one brand film with a few cutdowns.",
            "SectionLead",
        )
    )
    story.append(
        bullets(
            [
                "If the question is what MediaGeekz should charge for one benchmark-grade 60-90 second agency brand film, the right market-facing range is roughly $8,500-$10,500, with a hard floor around $6,500-$7,500 only for a leaner build.",
                "If the question is what MediaGeekz should charge for the actual ThreadLink scope now shown on the page, the recommended anchor is $11,500-$12,500, with a premium tier at $15,000-$16,500.",
                "The current page anchor of $7,500 is soft relative to the deliverables and also soft relative to MediaGeekz's own internal minimum pricing logic.",
                "The cleanest package ladder is a Signature tier at $11,500 and a Premier tier at $15,500. If you need a lower entry point, strip scope rather than discount the campaign day.",
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        card(
            "Why this matters",
            "Pricing is not only a margin decision. It is also a market-positioning decision. MediaGeekz publicly presents itself as an Orlando-based cinematic production company built for commercials, brand films, ads, and platform-native cutdowns. If you say you are top 3 in your market, the proposal has to behave like it.",
            BRAND["indigo_soft"],
            BRAND["indigo"],
            title_color=BRAND["indigo"],
        )
    )
    story.append(Spacer(1, 0.2 * inch))
    story.append(p("Report map", "BodyBold"))
    story.append(
        bullets(
            [
                "Scope reviewed from the local ThreadLink proposal page",
                "Current proposal pricing snapshot",
                "MediaGeekz public brand positioning",
                "Florida and national market pricing anchors",
                "Internal rate-card reconstruction from the repo",
                "Recommended pricing for one video and for the full ThreadLink scope",
                "Sales guardrails and suggested package framing",
            ]
        )
    )
    story.append(PageBreak())

    story.append(p("2. Scope reviewed from the ThreadLink proposal page", "SectionTitle"))
    story.append(
        p(
            "The most important pricing mistake here would be treating the page like a single-video quote. The local proposal page clearly describes two separate narrative films plus a full set of supporting assets. That expands the production burden and the post-production burden at the same time.",
            "SectionLead",
        )
    )
    story.append(p("What the local page explicitly includes", "BodyBold"))
    story.append(
        bullets(
            [
                "A benchmark/reference video section that sets a premium agency-film standard. The local page states that the production value being matched is the benchmark, but with more real human connection.",
                "Two hero deliverables: an Agency Brand Film and a Local Area Film, both in the 60-90 second range.",
                "Two extended cuts in the 2-3 minute range for web and YouTube placement.",
                "6-8 vertical social clips optimized for Reels, TikTok, and LinkedIn.",
                "BTS photography and in the higher tier a BTS video reel.",
                "Dual-camera production, professional audio, a lighting package, and outdoor lighting crew assistance.",
                "Two revision rounds in the recommended tier and three in the premium tier.",
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        comparison_table(
            [
                ["Proposal element", "Evidence from local files", "Why it changes pricing"],
                ["Reference-quality benchmark", "app/thread/page.js lines 945-964", "Sets the expectation at a polished agency-film level rather than a basic talking-head promo."],
                ["Deliverables list", "app/thread/page.js lines 1675-1680", "Two hero films plus extended cuts and social versions means post-production multiplies quickly."],
                ["Current package pricing", "app/thread/page.js lines 1775-1817", "Current packages are $7,500 and $11,500, but the lower tier reads below the true scope."],
                ["Team / production kit", "app/thread/page.js lines 1704-1745 and 1842-1843", "The page promises cinema-grade gear, matched color science, audio, and lighting in every tier."],
            ],
            [1.8 * inch, 1.8 * inch, 3.2 * inch],
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(
        card(
            "Practical read",
            "This is a campaign-day quote wearing the clothes of a two-video package. That is why the lower anchor feels cheap. The page is not merely selling deliverable count; it is selling production value, concept development, and a multi-output content system from one shoot day.",
            BRAND["bg"],
            BRAND["border"],
        )
    )
    story.append(PageBreak())

    story.append(p("3. Current pricing snapshot and why the lower tier is soft", "SectionTitle"))
    story.append(
        p(
            "The current local page shows a Professional package at $7,500 and a Premier package at $11,500. The lower tier still includes the two hero films, 8 social clips, extended cuts, BTS photography, and a full-day dual-camera shoot. That is the problem. It is not low because the number itself is impossible; it is low because the scope attached to it is too heavy.",
            "SectionLead",
        )
    )

    story.append(
        comparison_table(
            [
                ["Current tier", "Published price on local page", "What is included", "Pricing read"],
                ["Professional", "$7,500", "Two videos, 8 social clips, extended cuts, BTS photos, full-day dual-cam, custom sound design, two revision rounds", "Under-anchored for a top-tier positioning story"],
                ["Premier", "$11,500", "Adds creative director, licensed music, premium graphics, 12+ clips, pro BTS, raw archive, faster turnaround, three revision rounds", "Reasonable as a mid-high anchor, but no longer feels premium if the lower tier is too full"],
            ],
            [1.1 * inch, 1.1 * inch, 3.3 * inch, 1.6 * inch],
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(p("Why the $7,500 anchor creates tension", "BodyBold"))
    story.append(
        bullets(
            [
                "It invites the client to mentally value two hero films plus supporting assets at a single low package price.",
                "It compresses the difference between a lean one-film project and a larger campaign-style engagement.",
                "It makes the $11,500 premium package feel like an add-on bundle instead of the true full-creative-production tier.",
                "It undercuts the premium signal established by the benchmark video, production kit section, and MediaGeekz public brand language.",
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        card(
            "Recommended correction",
            "If you want a lower-priced option, reduce scope. Do not keep both hero films, extended cuts, and a social package inside the entry tier. A lower anchor should be a single brand film with limited cutdowns, not the full ThreadLink campaign day.",
            BRAND["red_soft"],
            BRAND["red"],
            title_color=BRAND["red"],
        )
    )
    story.append(PageBreak())

    story.append(p("4. MediaGeekz public positioning and market anchors", "SectionTitle"))
    story.append(
        p(
            "The public site matters because it sets the promise your proposal must support. As of March 23, 2026, mediageekz.com positions the company as Orlando-based cinematic production for commercials, brand content, real estate, events, and high-volume platform-native vertical edits.",
            "SectionLead",
        )
    )
    story.append(p("What the public site is saying", "BodyBold"))
    story.append(
        bullets(
            [
                "The homepage headline centers bold, cinematic content for brands, realtors, and events.",
                "The packages section shows a Starter Spot, a Brand Film, and a custom Campaign Day, which tells clients that MediaGeekz can scale from one hero asset to a larger ad/social package.",
                "The site describes the work as performance-ready and platform-native, which justifies higher pricing when multiple outputs are included.",
                "The team and process language reads premium and organized, not bargain or commodity-level.",
            ]
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(p("External pricing anchors used for this report", "BodyBold"))
    story.append(
        comparison_table(
            [
                ["Source", "Pricing signal", "Use in this report"],
                ["Go Bold Studio, Orlando", "Full-service production starts at $10k. Turnkey bundle is $2,500 / 10 hrs but is primarily studio + DP support.", "Useful Orlando anchor showing that fully managed commercial work can begin in the five figures."],
                ["Bison Films", "2 videos + 25 photos at $6,050. 4 videos + 50 photos at $9,400.", "Useful lower-market comparison. Good evidence that multiple branded deliverables quickly move beyond a simple one-video quote."],
                ["Regal Fierce Media guide", "Brand story / culture film planning range of $15k-$60k+.", "Useful national high-end benchmark for premium brand-film work and campaign logic."],
                ["Digital Motion Studios, West Palm", "Commercials around $800-$1,800+ and corporate videos $1,200-$5,000+.", "Useful contrast. These ranges reflect lighter-scope work and should not dictate top-tier positioning."],
            ],
            [1.55 * inch, 1.9 * inch, 3.35 * inch],
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        card(
            "Market conclusion",
            "The market data does not support staying at $7,500 for the full ThreadLink package if MediaGeekz wants to present as a top-tier Florida shop. It supports moving into the low-to-mid teens for this scope, while still leaving room above that for heavier brand-film or campaign engagements.",
            BRAND["green_soft"],
            BRAND["green"],
            title_color=BRAND["green"],
        )
    )
    story.append(PageBreak())

    story.append(p("5. Internal rate-card reconstruction from the repo", "SectionTitle"))
    story.append(
        p(
            "The strongest pricing evidence is inside the repo itself. The internal sales config literally says: aggressive pricing minimums - do not underquote. Using those minimums, the current ThreadLink entry tier already starts to look low even before we assign full value to the extended cuts.",
            "SectionLead",
        )
    )
    story.append(
        comparison_table(
            [
                ["Internal line item", "Minimum", "Default", "Why it matters"],
                ["Lead cinematographer - full day", money(1500), money(1800), "Premium-looking coverage starts with a real DP day rate."],
                ["Camera operator B - full day", money(1000), money(1200), "A true second angle has labor value, not just gear value."],
                ["Producer / director", money(1200), money(1500), "Creative direction, talent management, and shot management are billable."],
                ["Audio technician", money(600), money(800), "Dedicated sound is part of the promise on the ThreadLink page."],
                ["Commercial / promo edit", money(2000), money(3000), "Each hero film needs serious post labor."],
                ["Short-form social batch of 4", money(800), money(1200), "Eight clips naturally model as two short-form batches."],
                ["BTS photo coverage", money(400), money(900), "The local page includes BTS in every tier."],
                ["Corporate brand profile edit", money(2500), money(3500), "A proxy for the 2-3 minute extended web cuts if billed at full value."],
            ],
            [2.2 * inch, 0.8 * inch, 0.8 * inch, 2.9 * inch],
        )
    )
    story.append(Spacer(1, 0.18 * inch))
    story.append(p("Conservative modeled floor", "BodyBold"))
    story.append(
        bullets(
            [
                "Crew minimums: $4,300 for lead DP, second operator, producer, and audio tech.",
                "Two hero-film edits at minimums: $4,000.",
                "Eight social clips modeled as two short-form batches at minimums: $1,600.",
                "BTS coverage at minimums: $400.",
                "Total conservative floor before assigning separate value to extended cuts: about $10,300.",
            ]
        )
    )
    story.append(
        p(
            "That $10,300 figure is intentionally conservative. It does not assign distinct pricing to the extended 2-3 minute web cuts, and it keeps BTS at the cheapest internal option. Once you begin valuing those extras more realistically, the true package value moves higher.",
            "Body",
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        card(
            "Internal pricing verdict",
            "On your own repo logic, the current Professional package reads below the natural floor for the scope being promised. The Premier package is closer to the true weight of the project, but it should be the recommended middle or base full-scope tier, not the only way to escape the underpriced anchor.",
            BRAND["orange_soft"],
            BRAND["orange"],
            title_color=BRAND["orange"],
        )
    )
    story.append(p("6. What should one video like this cost?", "SectionTitle"))
    story.append(
        p(
            "If the user-facing question is simply what to charge for one benchmark-grade agency brand film with this level of care, here is the cleanest answer. This section isolates a single 60-90 second hero film instead of the full ThreadLink campaign package.",
            "SectionLead",
        )
    )
    story.append(
        comparison_table(
            [
                ["Scenario", "Range", "What it assumes"],
                ["Lean floor", "$6,500 - $7,500", "One shoot day, one hero film, lighter crew, basic cutdowns only, no oversized motion-graphics load."],
                ["Recommended market-facing range", "$8,500 - $10,500", "One polished 60-90 second hero film with real production value, strategic pre-production, solid sound design, and a few useful versions."],
                ["Premium single-film build", "$11,500 - $13,500", "Heavier creative direction, more polished graphics, licensed music, faster turnaround, and tighter art direction."],
            ],
            [1.65 * inch, 1.45 * inch, 3.6 * inch],
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(p("Why this range makes sense", "BodyBold"))
    story.append(
        bullets(
            [
                "It respects the benchmark look and feel the ThreadLink page references.",
                "It is consistent with how MediaGeekz presents its Brand Film and Campaign Day logic on the public site.",
                "It keeps the entry brand-film number clearly above lower-market talking-head or simple corporate video pricing.",
                "It still leaves room for larger campaigns, multi-day productions, and ad-system deliverables above it.",
            ]
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        card(
            "Direct answer for sales calls",
            "If someone asks, 'What would a video like this cost?' the best sharp answer is: for one premium 60-90 second brand film in this style, MediaGeekz should generally be around $8,500 to $10,500, with lighter versions starting lower and heavier creative builds moving higher.",
            BRAND["indigo_soft"],
            BRAND["indigo"],
            title_color=BRAND["indigo"],
        )
    )
    story.append(PageBreak())

    story.append(p("7. Recommended pricing for the actual ThreadLink package", "SectionTitle"))
    story.append(
        p(
            "The actual ThreadLink page is not a single-film quote. It is a two-film campaign package. That means the recommendation has to account for production complexity and post-production multiplication at the same time.",
            "SectionLead",
        )
    )
    story.append(
        comparison_table(
            [
                ["Package framing", "Price", "Use case", "Comment"],
                ["Absolute floor", "$9,500", "Only if you need a softer close", "Still feels tight for the scope. Use sparingly."],
                ["Recommended signature tier", "$11,500 - $12,500", "Best full-scope recommendation", "Strong fit for the ThreadLink deliverables as currently described."],
                ["Premium tier", "$15,000 - $16,500", "Full creative production with polish and speed", "This is the right lane if you want the proposal to feel top-tier and hard to compare on price alone."],
            ],
            [1.55 * inch, 1.15 * inch, 1.65 * inch, 2.55 * inch],
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(p("Recommended replacement package ladder", "BodyBold"))
    story.append(
        comparison_table(
            [
                ["Recommended tier", "Suggested price", "Suggested scope"],
                ["Signature", "$11,500", "Two hero films, 6-8 social clips, BTS photos, standard sound design, selective text overlays, two revision rounds, standard delivery."],
                ["Premier", "$15,500", "Everything in Signature plus heavier creative direction, licensed music, premium motion graphics, 12+ clips, pro BTS, raw archive, faster turnaround, three revision rounds."],
            ],
            [1.35 * inch, 1.2 * inch, 4.4 * inch],
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(p("If you want to preserve a lower option", "BodyBold"))
    story.append(
        bullets(
            [
                "Make the lower tier a single hero film only.",
                "Limit social cutdowns to 3-4 clips.",
                "Remove the second film and extended cuts from the entry package.",
                "Keep raw footage archive, licensed music, and premium graphics out of the low tier.",
                "Do not discount the full ThreadLink package down to the single-film price band.",
            ]
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        card(
            "Most defensible recommendation",
            "For the full ThreadLink page as written, the cleanest move is to raise the recommended package from $7,500 to $11,500 and raise the premium package from $11,500 to about $15,500. That preserves a professional ladder and better matches the work being promised.",
            BRAND["green_soft"],
            BRAND["green"],
            title_color=BRAND["green"],
        )
    )
    story.append(p("8. Sales guardrails and negotiation rules", "SectionTitle"))
    story.append(
        p(
            "The goal is not only to raise the number. The goal is to make the number harder to attack. The cleanest way to do that is to package scope clearly, keep add-ons visible, and avoid mixing premium production promises into the lowest tier.",
            "SectionLead",
        )
    )
    story.append(p("Guardrails to keep margin intact", "BodyBold"))
    story.append(
        bullets(
            [
                "Separate lower-tier and full-scope tiers by deliverable count, not by vague labels only.",
                "Price extra locations, permits, travel, talent, and significant rescheduling separately.",
                "Keep raw footage archive as a paid add-on or premium inclusion only.",
                "Define revision rounds tightly. Structural changes after approval should trigger additional fees.",
                "Call out that remote team capture coordination and public-location logistics can add complexity.",
                "If the client pushes price down, reduce scope first. Do not quietly absorb deliverables.",
            ]
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(p("Suggested positioning language", "BodyBold"))
    story.append(
        bullets(
            [
                "Frame the project as a campaign-day production with multiple launch-ready assets, not just two videos.",
                "Emphasize that one shoot is creating website hero content, short-form social content, and longer-form evergreen assets at the same time.",
                "Tie pricing to the system of deliverables and brand positioning impact rather than only minutes of finished runtime.",
            ]
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        card(
            "Simple close-ready script",
            "For a project like this, we are not pricing one video. We are pricing a premium campaign day that produces two hero films and a launch set of supporting assets. If we need to come down, we can trim scope, but we should not cut the price while leaving the whole deliverable stack intact.",
            BRAND["bg"],
            BRAND["border"],
        )
    )
    story.append(PageBreak())

    story.append(p("9. Source appendix", "SectionTitle"))
    story.append(
        p(
            "All pricing conclusions in this report were built from the following sources as reviewed on March 23, 2026. Web pricing should always be rechecked before using it externally because public rate pages can change.",
            "SectionLead",
        )
    )
    sources = [
        "Local ThreadLink proposal page: /Users/danielcastillo/Mediageekzquotes/app/thread/page.js. Key sections used: lines 945-964, 1675-1680, 1757-1817, 1842-1843.",
        "MediaGeekz public site: https://mediageekz.com/. Key items used: homepage positioning, packages section, and Orlando location language.",
        "Go Bold Studio rates: https://www.goboldstudio.com/rates",
        "Bison Films pricing: https://www.bisonfilms.com/pricing",
        "Regal Fierce Media guide: https://www.regalfiercemedia.com/video-production-cost/",
        "Digital Motion Studios pricing: https://www.digitalmotionstudios.com/pricing/",
        "Internal sales config: /Users/danielcastillo/Mediageekzquotes/lib/salesConfig.js",
    ]
    story.append(bullets(sources))
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        p(
            "Prepared internally for MediaGeekz. This report is a pricing strategy document, not a legal or accounting document. Final proposals should still reflect confirmed scope, logistics, dates, permit needs, travel, talent requirements, and revision expectations.",
            "Small",
        )
    )
    return story


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.85 * inch,
        bottomMargin=0.8 * inch,
        title="ThreadLink Pricing Report",
        author="OpenAI Codex for MediaGeekz",
        subject="ThreadLink proposal pricing analysis",
    )
    story = build_story()
    doc.build(story, onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
