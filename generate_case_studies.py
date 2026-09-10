# -*- coding: utf-8 -*-
import html

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Manish Mandala</title>
<meta name="description" content="{description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="style.css">
</head>
<body>

<!-- ============ NAV ============ -->
<header class="site-header">
  <nav class="nav container">
    <a href="index.html#home" class="logo">Manish Mandala</a>

    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <ul class="nav-links" id="navLinks">
      <li><a href="index.html#about">About</a></li>
      <li><a href="index.html#skills">Skills</a></li>
      <li><a href="index.html#projects">Projects</a></li>
      <li><a href="index.html#also-built">Also Built</a></li>
      <li><a href="index.html#now">Now</a></li>
      <li><a href="index.html#contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
"""

TAIL = """
</main>

<footer class="site-footer">
  <p>&copy; <span id="year"></span> Manish Mandala. Built with HTML &amp; CSS.</p>
</footer>

<script src="script.js"></script>
</body>
</html>
"""


def render_meta_bar(status, timeframe, role, context, sheet):
    return f"""    <div class="case-meta-bar">
      <div class="case-meta-item">
        <span class="case-meta-label">STATUS</span>
        <span class="case-status">{status}</span>
      </div>
      <div class="case-meta-item">
        <span class="case-meta-label">TIMEFRAME</span>
        <span class="case-meta-value">{timeframe}</span>
      </div>
      <div class="case-meta-item">
        <span class="case-meta-label">ROLE</span>
        <span class="case-meta-value">{role}</span>
      </div>
      <div class="case-meta-item">
        <span class="case-meta-label">CONTEXT</span>
        <span class="case-meta-value">{context}</span>
      </div>
      <div class="case-meta-item">
        <span class="case-meta-label">SHEET</span>
        <span class="case-meta-value">{sheet}</span>
      </div>
    </div>
"""


def render_section(label, paragraphs=None, bullets=None):
    out = f'      <div class="case-section">\n        <div class="case-label">{label}</div>\n'
    if paragraphs:
        for p in paragraphs:
            out += f"        <p>{p}</p>\n"
    if bullets:
        out += "        <ul>\n"
        for b in bullets:
            out += f"          <li>{b}</li>\n"
        out += "        </ul>\n"
    out += "      </div>\n"
    return out


def render_build(media_html, caption):
    return f"""      <div class="case-sidebar-block case-build">
        {media_html}
        <p class="case-build-caption">{caption}</p>
      </div>
"""


def render_tools(tools):
    items = "\n".join(f"          <li>{t}</li>" for t in tools)
    return f"""      <div class="case-sidebar-block">
        <div class="case-label">TOOLS &amp; TECH</div>
        <ul class="case-tools">
{items}
        </ul>
      </div>
"""


def render_page(slug, title, subtitle, description, meta, sections, sidebar_extra_first, tools,
                 build_media, build_caption, github_url, prev_slug, prev_title, next_slug, next_title):
    body = HEAD.format(title=title, description=description)
    body += f"""  <!-- ============ CASE HEADER ============ -->
  <section class="case-header container">
    <p class="case-eyebrow"><a href="index.html#projects">PROJECTS</a> / {title.upper()}</p>
    <h1>{title}</h1>
    <p>{subtitle}</p>
{render_meta_bar(*meta)}
  </section>

  <!-- ============ CASE BODY ============ -->
  <section class="case-body container">
    <div class="case-main">
"""
    for label, paragraphs, bullets in sections:
        body += render_section(label, paragraphs, bullets)

    body += f"""      <div class="case-section">
        <a href="{github_url}" target="_blank" rel="noopener" class="btn btn-primary">View Source on GitHub &rarr;</a>
      </div>
    </div>
    <div class="case-sidebar">
{render_tools(tools)}
{render_build(build_media, build_caption)}
    </div>
  </section>

  <!-- ============ CASE NAV ============ -->
  <div class="case-nav container">
    <a href="{prev_slug}">&larr; {prev_title}</a>
    <a href="index.html#projects">All Projects</a>
    <a href="{next_slug}">{next_title} &rarr;</a>
  </div>
"""
    body += TAIL
    with open(slug, "w", encoding="utf-8") as f:
        f.write(body)
    print("wrote", slug)


# ============================================================
# AI RECEPTIONIST
# ============================================================
render_page(
    slug="ai-receptionist.html",
    title="AI Receptionist",
    subtitle="An AI-powered virtual receptionist for a real estate agent's inbox and client relationships, built as seven n8n workflows.",
    description="AI Receptionist case study: n8n workflows using Claude, Gmail, Supabase, and Telegram to triage email and coordinate transactions for a real estate agent.",
    meta=("COMPLETED", "Fall 2026", "Solo", "Client project", "01 / 05"),
    sections=[
        ("MY ROLE", [
            "Designed and built the entire automation system solo for a real estate agent client &mdash; architected all seven n8n workflows, wrote every Claude prompt, and wired up the Gmail, Supabase, and Telegram integrations end to end.",
        ], None),
        ("PROBLEM / GOAL", [
            "Real estate agents run their whole pipeline through one inbox &mdash; new leads, active transactions, vendors, and past clients all mixed together, with slow replies costing real deals.",
            "Goal: an AI system that triages, drafts, and reminds, without ever sending anything the agent hasn't personally reviewed.",
        ], None),
        ("APPROACH &amp; KEY DECISIONS", None, [
            "Classify every inbound email into one of five categories with Claude, then auto-label it in Gmail.",
            "Draft replies in the agent's actual voice &mdash; explicit, strict prompt rules (no em dashes, no &ldquo;I hope this finds you well&rdquo;, contractions required) instead of generic AI-sounding copy.",
            "Never auto-send: every AI-drafted reply lands in Gmail Drafts for the agent to review first.",
            "Separate Health Check and Error Trigger workflows so a silent failure gets caught in minutes on Telegram, not discovered days later.",
            "Redacted all personal contact info (chat IDs, real email addresses) before publishing, since this represents a real client's business.",
        ]),
        ("OUTCOME", [
            "Seven production n8n workflows covering inbox triage, client nurture, transaction coordination, and a Telegram-based assistant &mdash; in active use handling a real agent's day-to-day email load.",
        ], None),
    ],
    sidebar_extra_first=None,
    tools=["n8n", "Claude", "Gmail API", "Supabase", "Telegram"],
    build_media='<img src="assets/ai-receptionist/inbox-classifier.png" alt="AI Receptionist inbox classifier workflow diagram">',
    build_caption="Fig. 1. The Inbox Classifier workflow &mdash; the busiest of the seven.",
    github_url="https://github.com/manishmandala/ai-receptionist",
    prev_slug="combination-lock.html", prev_title="Combination Lock",
    next_slug="laser-turret.html", next_title="Laser Turret",
)

# ============================================================
# LASER TURRET
# ============================================================
render_page(
    slug="laser-turret.html",
    title="Hand-Tracking Laser Turret",
    subtitle="A pan/tilt laser turret that follows your hand in real time, built from a webcam, two servos, and an Arduino.",
    description="Hand-Tracking Laser Turret case study: MediaPipe hand tracking on a PC drives an Arduino-controlled pan/tilt laser turret over serial.",
    meta=("COMPLETED", "Summer 2026", "Solo", "Personal project", "02 / 05"),
    sections=[
        ("MY ROLE", [
            "Designed, wired, and programmed the entire turret solo &mdash; both the Arduino firmware and the PC-side computer vision pipeline.",
        ], None),
        ("PROBLEM / GOAL", [
            "Wanted a laser turret that tracks a hand in real time without expensive off-the-shelf tracking hardware &mdash; just a webcam, two servos, and an Arduino.",
        ], None),
        ("APPROACH &amp; KEY DECISIONS", None, [
            "MediaPipe Hands on the PC tracks wrist position, mapped to pan/tilt angles through a real calibration step instead of a rough frame-edge guess.",
            "Adaptive smoothing: fast response to big movements, stable and smooth on small ones, instead of one fixed smoothing constant that's wrong for both cases.",
            "Hard pan/tilt limits enforced on the Arduino itself, not just the PC side, so a software bug can't physically crash the rig into itself.",
            "Serial-loss failsafe: if the PC stops sending commands for 500ms (crash, unplugged cable), the laser force-shuts-off automatically.",
        ]),
        ("OUTCOME", [
            "A working, calibrated hand-tracking turret with hardware-verified safety failsafes. Full build documented with wiring photos, a Bill of Materials, and a testing/calibration video.",
        ], None),
    ],
    sidebar_extra_first=None,
    tools=["Arduino / C++", "Python", "OpenCV", "MediaPipe"],
    build_media='<video src="assets/laser/testing-and-calibration.mp4" controls muted loop playsinline preload="metadata"></video>',
    build_caption="Fig. 1. Testing and calibration walkthrough.",
    github_url="https://github.com/manishmandala/hand-tracking-laser-turret",
    prev_slug="ai-receptionist.html", prev_title="AI Receptionist",
    next_slug="basketball-analyzer.html", next_title="Basketball Shot Analyzer",
)

# ============================================================
# BASKETBALL SHOT ANALYZER
# ============================================================
render_page(
    slug="basketball-analyzer.html",
    title="Basketball Shot Analyzer",
    subtitle="Real-time basketball shooting form analysis from a webcam feed, scoring five components of form live on screen.",
    description="Basketball Shot Analyzer case study: MediaPipe pose estimation scores elbow angle, knee bend, stance, and release position in real time.",
    meta=("COMPLETED", "Summer 2026", "Solo", "Personal project", "03 / 05"),
    sections=[
        ("MY ROLE", [
            "Built the full pose-estimation pipeline and scoring logic solo, from landmark extraction to the live on-screen feedback overlay.",
        ], None),
        ("PROBLEM / GOAL", [
            "Wanted real-time, quantified feedback on shooting form &mdash; elbow angle, knee bend, stance, release &mdash; instead of just eyeballing form on video after the fact.",
        ], None),
        ("APPROACH &amp; KEY DECISIONS", None, [
            "MediaPipe Pose extracts body landmarks every frame; five geometric checks each get a pass/fail threshold grounded in basic shooting-form biomechanics.",
            "Real end-to-end FPS measurement, not a guess &mdash; a warm-up period is excluded so the reported number reflects steady-state performance.",
            "Found and fixed a real bug: the on-screen score box was hardcoded to a fixed width too narrow for its own text, so it clipped off the frame edge on some resolutions. Now sized dynamically from the actual rendered text.",
        ]),
        ("OUTCOME", [
            "A live webcam tool that scores shooting form 0&ndash;100 in real time, with demo footage showing actual scored reps.",
        ], None),
    ],
    sidebar_extra_first=None,
    tools=["Python", "OpenCV", "MediaPipe", "Pose Estimation"],
    build_media='<video src="assets/basketball/demo-2.mp4" controls muted loop playsinline preload="metadata"></video>',
    build_caption="Fig. 1. Live scoring during an actual shooting session.",
    github_url="https://github.com/manishmandala/basketball-shot-analyzer",
    prev_slug="laser-turret.html", prev_title="Laser Turret",
    next_slug="multi-blade-knife.html", next_title="Multi-Blade Knife",
)

# ============================================================
# MULTI-BLADE KNIFE
# ============================================================
render_page(
    slug="multi-blade-knife.html",
    title="Multi-Blade Knife",
    subtitle="A kitchen tool that turns one cutting motion into four slices, taken from user research through a verified 3D-printed prototype.",
    description="Multi-Blade Knife case study: user research, Pugh matrix concept selection, prototype iteration, and verification testing for Ohio State's First Year Engineering program.",
    meta=("COMPLETED", "Spring 2026", "Team member &middot; 4-person team", "ENGR 1182 &middot; Ohio State", "04 / 05"),
    sections=[
        ("MY ROLE", [
            "Contributed to design, prototyping, and verification testing as part of Team J's four-person build, from concept selection through the final verification scorecard.",
        ], None),
        ("PROBLEM / GOAL", [
            "User interviews with working professionals balancing jobs and family found the same pain point over and over: repetitive food-prep tasks like cutting vegetables, described as tiring, time-consuming, and mentally draining after work.",
            "Goal: cut prep time and physical effort without adding cost or complexity to a simple kitchen tool.",
        ], None),
        ("APPROACH &amp; KEY DECISIONS", None, [
            "Ranked user needs with a pairwise comparison, then brainstormed broadly and scored concepts with a Pugh matrix &mdash; the multi-blade knife won on time savings and manufacturability.",
            "Modeled the design in OnShape as separate, assembled components (blades, handle, locking pin) rather than one solid body, matching how it would actually be manufactured.",
            "Built a low-fidelity mock-up (skewers and a cardboard tube) before committing to CAD, to nail down blade spacing and feel early and cheaply.",
            "Iterated the 3D-printed prototype after testing surfaced real problems &mdash; blade movement under force, an uncomfortable handle, food catching between blades &mdash; reinforcing the assembly and reshaping the handle in response.",
            "Verified the final prototype against six concrete requirements (spacing, slice consistency, time efficiency, comfort, cleaning time, structural stability) with a real test scorecard, not just a demo.",
        ]),
        ("OUTCOME", [
            "A verified prototype that cut cutting time by 30% (against a 25&ndash;40% target) with 7% slice-thickness variation, passing all six verification requirements. Main remaining weak point: blade sharpness, since the prototype's blades were 3D-printed PLA rather than the aluminum the production design calls for.",
        ], None),
    ],
    sidebar_extra_first=None,
    tools=["OnShape", "3D Printing (PLA)", "Pugh Matrix", "User Interviews", "Verification Testing"],
    build_media='<img src="assets/multi-blade-knife-result.jpg" alt="Multi-blade knife 3D-printed prototype">',
    build_caption="Fig. 1. Final 3D-printed prototype, four blades in a single handle.",
    github_url="https://github.com/manishmandala/multi-blade-knife",
    prev_slug="basketball-analyzer.html", prev_title="Basketball Shot Analyzer",
    next_slug="combination-lock.html", next_title="Combination Lock",
)

# ============================================================
# COMBINATION LOCK
# ============================================================
render_page(
    slug="combination-lock.html",
    title="Combination Lock Mechanism",
    subtitle="A mechanical combination lock modeled in OnShape: rotors, deadbolt, and dial assembled into a full technical drawing packet.",
    description="Combination Lock case study: exploded assembly, full bill of materials, and detail drawings for a mechanical combination lock, Ohio State ENGR 1182.",
    meta=("COMPLETED", "Spring 2026", "Individually authored drawings", "ENGR 1182 &middot; Ohio State", "05 / 05"),
    sections=[
        ("MY ROLE", [
            "Authored the complete drawing packet for Team G10's lock: the full assembly, an exploded view with a 16-part bill of materials, and detail drawings for the custom-designed parts (rotors, connector piece, dial).",
        ], None),
        ("PROBLEM / GOAL", [
            "Design a mechanical combination lock where three notched rotors only align to release a deadbolt when the correct combination is dialed in.",
        ], None),
        ("APPROACH &amp; KEY DECISIONS", None, [
            "Built the 16-part assembly from individually modeled components rather than one solid body, matching how it would actually be manufactured and assembled.",
            "Designed a tri-lobed connector piece to transmit rotation from the dial into the rotor stack &mdash; a small custom part that had to mate precisely with both.",
            "Documented the one provided part (the deadbolt subassembly) alongside the custom-designed parts, so the BOM honestly reflects what was designed versus supplied.",
        ]),
        ("OUTCOME", [
            "A complete, manufacturable technical drawing packet &mdash; full assembly, 16-part exploded BOM, and part-level detail drawings. The OnShape source file is no longer accessible, but the finished documentation survives.",
        ], None),
    ],
    sidebar_extra_first=None,
    tools=["OnShape", "Assembly Mates", "Exploded-View Drafting", "BOM Documentation"],
    build_media='<img src="assets/lock-assembly-render.png" alt="Combination lock assembly render, transparent housing showing the rotor stack">',
    build_caption="Fig. 1. Assembly render, transparent housing showing the rotor stack.",
    github_url="https://github.com/manishmandala/combination-lock",
    prev_slug="multi-blade-knife.html", prev_title="Multi-Blade Knife",
    next_slug="ai-receptionist.html", next_title="AI Receptionist",
)
