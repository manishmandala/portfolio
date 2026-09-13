// Central structured data for all project case studies. Shared by the
// homepage Projects grid (components/project-card.jsx) and the individual
// case-study routes (app/<slug>/page.js via components/case-study.jsx).

export const projects = [
  {
    slug: "laser-turret",
    number: "01",
    entry: "01 / 08",
    title: "Hand-Tracking Laser Turret",
    shortTitle: "Laser Turret",
    category: "orange",
    featured: true,
    cardDescription:
      "A pan/tilt laser turret that follows your hand in real time - MediaPipe hand tracking, Arduino servo control, hard safety limits, and a serial-loss failsafe.",
    cardTags: ["Arduino / C++", "Python", "OpenCV", "MediaPipe"],
    media: { type: "image", src: "/assets/laser/wiring-3.jpg", alt: "Full turret rig wiring overview" },
    watermark: "crosshair",
    subtitle:
      "A pan/tilt laser turret that follows your hand in real time, built from a webcam, two servos, and an Arduino.",
    description:
      "Hand-Tracking Laser Turret case study: MediaPipe hand tracking on a PC drives an Arduino-controlled pan/tilt laser turret over serial.",
    status: "WORK IN PROGRESS",
    statusInProgress: true,
    timeframe: "Summer 2026",
    role: "Solo",
    context: "Personal project",
    whatIDid:
      "Designed, wired, and programmed the entire turret solo - both the Arduino firmware and the PC-side computer vision pipeline.",
    theProblem:
      "Wanted a laser turret that tracks a hand in real time without expensive off-the-shelf tracking hardware - just a webcam, two servos, and an Arduino.",
    keyDecisions: [
      "MediaPipe Hands on the PC tracks wrist position, mapped to pan/tilt angles through a real calibration step instead of a rough frame-edge guess.",
      "Adaptive smoothing: fast response to big movements, stable and smooth on small ones, instead of one fixed smoothing constant that's wrong for both cases.",
      "Hard pan/tilt limits enforced on the Arduino itself, not just the PC side, so a software bug can't physically crash the rig into itself.",
      "Serial-loss failsafe: if the PC stops sending commands for 500ms (crash, unplugged cable), the laser force-shuts-off automatically.",
      "CAD'd and 3D-printed a custom L-shaped bracket to physically mount the tilt servo on top of the pan servo's horn - the mechanical link that lets pan rotation carry the tilt assembly and laser around with it.",
    ],
    result:
      "A working, calibrated hand-tracking turret with hardware-verified safety failsafes. Full build documented with wiring photos, a Bill of Materials, and a testing/calibration video.",
    nextSteps: [
      "Smooth out the tracking further - still some jitter/lag under fast hand motion that better filtering should help.",
      "Explore tracking a head instead of a hand, using MediaPipe's face mesh or pose landmarks in place of hand tracking - same pan/tilt/serial pipeline underneath, different landmark source.",
    ],
    builtWith: ["Arduino / C++", "Python", "OpenCV", "MediaPipe"],
    githubUrl: "https://github.com/manishmandala/hand-tracking-laser-turret",
    buildMedia: [
      { type: "video", src: "/assets/laser/testing-and-calibration.mp4", caption: "Fig. 1. Testing and calibration walkthrough." },
      { type: "image", src: "/assets/laser/wiring-1.jpg", alt: "Turret wiring, breadboard and servos", caption: "Fig. 2. Turret wiring, breadboard and servos." },
      { type: "image", src: "/assets/laser/wiring-2.jpg", alt: "Turret wiring, close up", caption: "Fig. 3. Turret wiring, close up." },
      { type: "image", src: "/assets/laser/wiring-3.jpg", alt: "Full turret rig wiring overview", caption: "Fig. 4. Full turret rig wiring overview." },
      { type: "image", src: "/assets/laser/soldering.jpg", alt: "Soldering the turret's connections", caption: "Fig. 5. Soldering the turret's connections." },
    ],
    prevSlug: "new-project",
    prevTitle: "New Project",
    nextSlug: "ai-receptionist",
    nextTitle: "AI Receptionist",
  },
  {
    slug: "ai-receptionist",
    number: "02",
    entry: "02 / 08",
    title: "AI Receptionist",
    shortTitle: "Estate Agent",
    category: "violet",
    featured: false,
    cardDescription:
      "An AI virtual receptionist for a real estate agent's inbox and client relationships, built as n8n workflows on Claude, Gmail, and Supabase.",
    cardTags: ["n8n", "Claude", "Gmail API", "Supabase"],
    media: { type: "image", src: "/assets/ai-receptionist/inbox-classifier.png", alt: "AI Receptionist inbox classifier workflow diagram" },
    mediaFit: "contain",
    subtitle:
      "An AI-powered virtual receptionist for a real estate agent's inbox and client relationships, built as seven n8n workflows.",
    description:
      "AI Receptionist case study: n8n workflows using Claude, Gmail, Supabase, and Telegram to triage email and coordinate transactions for a real estate agent.",
    status: "COMPLETE - FOR NOW",
    statusInProgress: false,
    timeframe: "Fall 2026",
    role: "Solo",
    context: "Client project",
    whatIDid:
      "Designed and built the entire automation system solo for a real estate agent client - architected all seven n8n workflows, wrote every Claude prompt, and wired up the Gmail, Supabase, and Telegram integrations end to end.",
    theProblem: [
      "Real estate agents run their whole pipeline through one inbox - new leads, active transactions, vendors, and past clients all mixed together, with slow replies costing real deals.",
      "Goal: an AI system that triages, drafts, and reminds, without ever sending anything the agent hasn't personally reviewed.",
    ],
    keyDecisions: [
      "Classify every inbound email into one of five categories with Claude, then auto-label it in Gmail.",
      <>Draft replies in the agent&rsquo;s actual voice - explicit, strict prompt rules (no em dashes, no &ldquo;I hope this finds you well&rdquo;, contractions required) instead of generic AI-sounding copy.</>,
      "Never auto-send: every AI-drafted reply lands in Gmail Drafts for the agent to review first.",
      "Separate Health Check and Error Trigger workflows so a silent failure gets caught in minutes on Telegram, not discovered days later.",
      "Redacted all personal contact info (chat IDs, real email addresses) before publishing, since this represents a real client's business.",
    ],
    result:
      "Seven production n8n workflows covering inbox triage, client nurture, transaction coordination, and a Telegram-based assistant - in active use handling a real agent's day-to-day email load.",
    builtWith: ["n8n", "Claude", "Gmail API", "Supabase", "Telegram"],
    githubUrl: "https://github.com/manishmandala/ai-receptionist",
    buildMedia: [
      { type: "image", src: "/assets/ai-receptionist/workflows/Inbox_Classifier.png", alt: "Inbox Classifier n8n workflow", caption: "Fig. 1. Inbox Classifier - the busiest of the seven." },
      { type: "image", src: "/assets/ai-receptionist/workflows/Contact_Nurture.png", alt: "Contact Nurture n8n workflow", caption: "Fig. 2. Contact Nurture." },
      { type: "image", src: "/assets/ai-receptionist/workflows/Transaction_Coordination.png", alt: "Transaction Coordination n8n workflow", caption: "Fig. 3. Transaction Coordination." },
      { type: "image", src: "/assets/ai-receptionist/workflows/Telegram_Brain.png", alt: "Telegram Brain n8n workflow", caption: "Fig. 4. Telegram Brain." },
      { type: "image", src: "/assets/ai-receptionist/workflows/Daily_Inbox_Digest.png", alt: "Daily Inbox Digest n8n workflow", caption: "Fig. 5. Daily Inbox Digest." },
      { type: "image", src: "/assets/ai-receptionist/workflows/Health_Check.png", alt: "Health Check n8n workflow", caption: "Fig. 6. Health Check." },
      { type: "image", src: "/assets/ai-receptionist/workflows/Error_Trigger.png", alt: "Error Trigger n8n workflow", caption: "Fig. 7. Error Trigger." },
    ],
    prevSlug: "laser-turret",
    prevTitle: "Laser Turret",
    nextSlug: "multi-blade-knife",
    nextTitle: "Multi-Blade Knife",
  },
  {
    slug: "multi-blade-knife",
    number: "03",
    entry: "03 / 08",
    title: "Multi-Blade Knife",
    shortTitle: "Multi-Blade Knife",
    category: "red",
    featured: false,
    cardDescription:
      "A kitchen tool that turns one cutting motion into four slices - user research through a verified 3D-printed prototype.",
    cardTags: ["OnShape", "3D Printing", "Pugh Matrix"],
    media: { type: "image", src: "/assets/multi-blade-knife-result.jpg", alt: "Multi-blade knife 3D-printed prototype" },
    subtitle:
      "A kitchen tool that turns one cutting motion into four slices, taken from user research through a verified 3D-printed prototype.",
    description:
      "Multi-Blade Knife case study: user research, Pugh matrix concept selection, prototype iteration, and verification testing for Ohio State's First Year Engineering program.",
    status: "COMPLETE - FOR NOW",
    statusInProgress: false,
    timeframe: "Spring 2026",
    role: "Team member · 4-person team",
    context: "ENGR 1182 · Ohio State",
    whatIDid:
      "Contributed to design, prototyping, and verification testing as part of Team J's four-person build, from concept selection through the final verification scorecard.",
    theProblem: [
      "User interviews with working professionals balancing jobs and family found the same pain point over and over: repetitive food-prep tasks like cutting vegetables, described as tiring, time-consuming, and mentally draining after work.",
      "Goal: cut prep time and physical effort without adding cost or complexity to a simple kitchen tool.",
    ],
    keyDecisions: [
      "Ranked user needs with a pairwise comparison, then brainstormed broadly and scored concepts with a Pugh matrix - the multi-blade knife won on time savings and manufacturability.",
      "Modeled the design in OnShape as separate, assembled components (blades, handle, locking pin) rather than one solid body, matching how it would actually be manufactured.",
      "Built a low-fidelity mock-up (skewers and a cardboard tube) before committing to CAD, to nail down blade spacing and feel early and cheaply.",
      "Iterated the 3D-printed prototype after testing surfaced real problems - blade movement under force, an uncomfortable handle, food catching between blades - reinforcing the assembly and reshaping the handle in response.",
      "Verified the final prototype against six concrete requirements (spacing, slice consistency, time efficiency, comfort, cleaning time, structural stability) with a real test scorecard, not just a demo.",
    ],
    result:
      "A verified prototype that cut cutting time by 30% (against a 25–40% target) with 7% slice-thickness variation, passing all six verification requirements. Main remaining weak point: blade sharpness, since the prototype's blades were 3D-printed PLA rather than the aluminum the production design calls for.",
    builtWith: ["OnShape", "3D Printing (PLA)", "Pugh Matrix", "User Interviews", "Verification Testing"],
    githubUrl: "https://github.com/manishmandala/multi-blade-knife",
    buildMedia: [
      { type: "image", src: "/assets/multi-blade-knife-result.jpg", alt: "Multi-blade knife 3D-printed prototype", caption: "Fig. 1. Final 3D-printed prototype, four blades in a single handle." },
      { type: "image", src: "/assets/multi-blade-knife-cad-model.png", alt: "Multi-blade knife concept sketches", caption: "Fig. 2. Concept sketches." },
      { type: "image", src: "/assets/multi-blade-knife-prototype.jpg", alt: "Multi-blade knife low-fidelity mock-up", caption: "Fig. 3. Low-fidelity mock-up (skewers and a cardboard tube)." },
    ],
    prevSlug: "ai-receptionist",
    prevTitle: "AI Receptionist",
    nextSlug: "basketball-analyzer",
    nextTitle: "Basketball Shot Analyzer",
  },
  {
    slug: "basketball-analyzer",
    number: "04",
    entry: "04 / 08",
    title: "Basketball Shot Analyzer",
    shortTitle: "Basketball Shot Analyzer",
    category: "blue",
    featured: false,
    cardDescription:
      "Real-time shooting form analysis from a webcam feed, scoring elbow, knee, stance, and release live with pose estimation.",
    cardTags: ["Python", "MediaPipe"],
    media: { type: "video", src: "/assets/basketball/demo-2.mp4" },
    subtitle:
      "Real-time basketball shooting form analysis from a webcam feed, scoring five components of form live on screen.",
    description:
      "Basketball Shot Analyzer case study: MediaPipe pose estimation scores elbow angle, knee bend, stance, and release position in real time.",
    status: "WORK IN PROGRESS",
    statusInProgress: true,
    timeframe: "Summer 2026",
    role: "Solo",
    context: "Personal project",
    whatIDid:
      "Built the full pose-estimation pipeline and scoring logic solo, from landmark extraction to the live on-screen feedback overlay.",
    theProblem:
      "Wanted real-time, quantified feedback on shooting form - elbow angle, knee bend, stance, release - instead of just eyeballing form on video after the fact.",
    keyDecisions: [
      "MediaPipe Pose extracts body landmarks every frame; five geometric checks each get a pass/fail threshold grounded in basic shooting-form biomechanics.",
      "Real end-to-end FPS measurement, not a guess - a warm-up period is excluded so the reported number reflects steady-state performance.",
      "Found and fixed a real bug: the on-screen score box was hardcoded to a fixed width too narrow for its own text, so it clipped off the frame edge on some resolutions. Now sized dynamically from the actual rendered text.",
    ],
    result:
      "A live webcam tool that scores shooting form 0–100 in real time, with demo footage showing actual scored reps.",
    nextSteps: [
      "Improve accuracy and smoothness of the form metrics - reduce frame-to-frame noise so the score doesn't flicker on borderline reps.",
      "Support a stationary tripod setup that watches a full shooting session hands-free: automatically count shot attempts, track make/miss, and build a per-session summary, including shooting hotspots and form feedback trends across the whole session.",
    ],
    builtWith: ["Python", "OpenCV", "MediaPipe", "Pose Estimation"],
    githubUrl: "https://github.com/manishmandala/basketball-shot-analyzer",
    buildMedia: [
      { type: "video", src: "/assets/basketball/demo-2.mp4", caption: "Fig. 1. Live scoring during an actual shooting session." },
    ],
    prevSlug: "multi-blade-knife",
    prevTitle: "Multi-Blade Knife",
    nextSlug: "internship-agent",
    nextTitle: "Internship Intelligence Agent",
  },
  {
    slug: "combination-lock",
    number: "05",
    entry: "06 / 08",
    title: "Combination Lock Mechanism",
    shortTitle: "Combination Lock",
    category: "yellow",
    featured: false,
    cardDescription:
      "A working mechanical combination lock modeled in OnShape - rotor mechanism, exploded assembly, full BOM.",
    cardTags: ["OnShape", "Assembly Mates"],
    media: { type: "image", src: "/assets/lock-assembly-render.png", alt: "Combination lock assembly render" },
    mediaFit: "contain",
    watermark: "osu",
    subtitle:
      "A mechanical combination lock modeled in OnShape: rotors, deadbolt, and dial assembled into a full technical drawing packet.",
    description:
      "Combination Lock case study: exploded assembly, full bill of materials, and detail drawings for a mechanical combination lock, Ohio State ENGR 1182.",
    status: "COMPLETE - FOR NOW",
    statusInProgress: false,
    timeframe: "Spring 2026",
    role: "Individually authored drawings",
    context: "ENGR 1182 · Ohio State",
    whatIDid:
      "Authored the complete drawing packet for Team G10's lock: the full assembly, an exploded view with a 16-part bill of materials, and detail drawings for the custom-designed parts (rotors, connector piece, dial).",
    theProblem:
      "Design a mechanical combination lock where three notched rotors only align to release a deadbolt when the correct combination is dialed in.",
    keyDecisions: [
      "Built the 16-part assembly from individually modeled components rather than one solid body, matching how it would actually be manufactured and assembled.",
      "Designed a tri-lobed connector piece to transmit rotation from the dial into the rotor stack - a small custom part that had to mate precisely with both.",
      "Documented the one provided part (the deadbolt subassembly) alongside the custom-designed parts, so the BOM honestly reflects what was designed versus supplied.",
    ],
    result:
      "A complete, manufacturable technical drawing packet - full assembly, 16-part exploded BOM, and part-level detail drawings. The OnShape source file is no longer accessible, but the finished documentation survives.",
    builtWith: ["OnShape", "Assembly Mates", "Exploded-View Drafting", "BOM Documentation"],
    githubUrl: "https://github.com/manishmandala/combination-lock",
    buildMedia: [
      { type: "image", src: "/assets/lock-assembly-render.png", alt: "Combination lock assembly render, transparent housing showing the rotor stack", caption: "Fig. 1. Assembly render, transparent housing showing the rotor stack." },
      { type: "image", src: "/assets/lock-exploded-bom.png", alt: "Combination lock exploded assembly and bill of materials", caption: "Fig. 2. Exploded assembly, 16 parts, one bill of materials." },
      { type: "image", src: "/assets/lock-full-assembly.png", alt: "Combination lock full assembly drawing", caption: "Fig. 3. Full assembly drawing." },
      { type: "image", src: "/assets/lock-deadbolt-subassembly.png", alt: "Combination lock deadbolt subassembly drawing", caption: "Fig. 4. Deadbolt subassembly." },
      { type: "image", src: "/assets/lock-connector-piece.png", alt: "Combination lock connector piece drawing", caption: "Fig. 5. Connector piece." },
      { type: "image", src: "/assets/lock-dial.png", alt: "Combination lock dial drawing", caption: "Fig. 6. Dial." },
    ],
    prevSlug: "internship-agent",
    prevTitle: "Internship Intelligence Agent",
    nextSlug: "quant-finance-scripts",
    nextTitle: "Quant Finance Scripts",
  },
  {
    slug: "internship-agent",
    number: "06",
    entry: "05 / 08",
    title: "Internship Intelligence Agent",
    shortTitle: "Internship Agent",
    category: "magenta",
    featured: false,
    cardDescription:
      "Collects and scores internship postings from public company career APIs in a local Streamlit dashboard.",
    cardTags: ["Python", "Streamlit"],
    media: { type: "image", src: "/assets/internship-agent-dashboard.png", alt: "Internship Intelligence Agent dashboard" },
    mediaFit: "contain",
    subtitle:
      "Collects internship postings from public company career APIs, scores each one for fit, and presents everything in a local Streamlit dashboard.",
    description:
      "Internship Intelligence Agent case study: collects and scores internship postings from public company career APIs, presented in a Streamlit dashboard.",
    status: "COMPLETE - FOR NOW",
    statusInProgress: false,
    timeframe: "Summer 2026",
    role: "Solo",
    context: "Personal project",
    whatIDid:
      "Built the whole pipeline solo: the API collectors, the parsing and scoring logic, the SQLite database, and the Streamlit dashboard.",
    theProblem: [
      "Mechanical engineering, PM, consulting, and robotics/AI internship postings are scattered across dozens of company career sites, each with its own layout. Manually checking them all, every day, doesn't scale.",
      "Goal: pull postings from the public JSON APIs career sites already use to render their own listings, score each one for fit, and surface everything in one place.",
    ],
    keyDecisions: [
      "Polls public, structured, unauthenticated JSON APIs (Greenhouse, Lever, Ashby, Workday, Amazon) instead of scraping rendered HTML or bypassing logins - no CAPTCHAs, no rate-limit abuse.",
      "Rule-based fit scoring (weighted keyword matching plus eligibility/location logic), not an ML or LLM judgment - a transparent starting point for triage, not a black box.",
      "Companies without a discoverable public API (SuccessFactors, iCIMS, Phenom, bespoke portals) are recorded as unsupported and skipped, not faked.",
      "Found and fixed a real bug in the scoring pipeline: a dead ternary in the skill-matching code always fell back to scanning the entire posting instead of just the qualifications section, silently padding scores with irrelevant keyword matches.",
      "Found and fixed a second bug: the shared retry/backoff logic only covered GET requests, so the Workday collector (the only one using POST) had zero protection against transient failures.",
    ],
    result:
      "A working local dashboard with 122 real scored postings from companies like Anduril, Boeing, Amazon, and Applied Intuition, filterable by fit score, company, industry, and role category, with per-posting score explanations.",
    builtWith: ["Python", "Streamlit", "SQLite", "REST APIs"],
    githubUrl: "https://github.com/manishmandala/internship-intelligence-agent",
    buildMedia: [
      { type: "image", src: "/assets/internship-agent-dashboard.png", alt: "Internship Intelligence Agent Streamlit dashboard", caption: "Fig. 1. The dashboard with 122 real scored postings." },
    ],
    prevSlug: "basketball-analyzer",
    prevTitle: "Basketball Shot Analyzer",
    nextSlug: "combination-lock",
    nextTitle: "Combination Lock",
  },
  {
    slug: "quant-finance-scripts",
    number: "07",
    entry: "07 / 08",
    title: "Quant Finance Scripts",
    shortTitle: "Quant Finance Scripts",
    category: "green",
    featured: false,
    solidCard: true,
    cardDescription:
      "Portfolio theory scripts for a finance club - Monte Carlo efficient frontier and return/volatility/correlation analysis. Interactive charts inside, tickers are swappable.",
    cardTags: ["Python", "yfinance"],
    media: { type: "sparkline" },
    subtitle:
      "Two scripts exploring portfolio theory with real market data, written for a finance/investing club.",
    description:
      "Quant Finance Scripts case study: Monte Carlo efficient frontier / max Sharpe ratio simulation, and return/volatility/correlation analysis, for a finance club.",
    status: "COMPLETE - FOR NOW",
    statusInProgress: false,
    timeframe: "2026",
    role: "Solo",
    context: "Finance club",
    whatIDid:
      "Wrote both scripts solo for a finance/investing club, pulling real historical data instead of working from theory alone.",
    theProblem:
      "Portfolio theory (efficient frontier, Sharpe ratio, diversification) is usually taught with toy numbers. Wanted to see what it actually looks like against real market data for real stocks.",
    keyDecisions: [
      <><strong>Project2.py:</strong> simulates 10,000 random portfolios across five stocks, computing annualized return, volatility, and Sharpe ratio for each, then plots the efficient frontier and highlights the max-Sharpe portfolio.</>,
      <><strong>RiskTester.py:</strong> pulls historical prices for a set of tickers, computes annualized expected return and volatility, and plots a correlation heatmap to see how diversified a set of holdings actually is.</>,
      "Found and fixed a real bug in Project2.py: yfinance always returns columns sorted alphabetically regardless of input order, but the script combined that labeled data with raw positional numpy arrays for portfolio weights - silently mislabeling 3 of the 5 tickers' optimal weights in the final printout. Verified the bug empirically before fixing it.",
    ],
    result:
      "Two working scripts that produce real efficient-frontier and correlation analysis from live market data - and one confirmed, fixed correctness bug in the headline output of the portfolio optimizer.",
    builtWith: ["Python", "yfinance", "NumPy / pandas", "Matplotlib / Seaborn"],
    githubUrl: "https://github.com/manishmandala/quant-finance-scripts",
    buildMedia: [],
    prevSlug: "combination-lock",
    prevTitle: "Combination Lock",
    nextSlug: "new-project",
    nextTitle: "New Project",
  },
];

// The 8th case-study route. Deliberately vague/anonymized teaser page - not
// listed in the homepage Projects grid, only linked from the WIP badge, the
// Now section, and the case-study prev/next chain.
export const newProject = {
  slug: "new-project",
  entry: "08 / 08",
  title: "New Project",
  description: "A new project by Manish Mandala - write-up coming once it's built.",
  subtitle: "Something new is in the works. Full write-up lands once it's built.",
  status: "IN PROGRESS",
  statusInProgress: true,
  timeframe: "TBD",
  role: "Team member",
  context: "Group project",
  statusUpdate: [
    "Still in progress - nothing to show yet. Once it's done, this page gets the same treatment as everything else: role, problem/goal, approach and key decisions, and outcome.",
    "Check back soon.",
  ],
  hints: [
    "Symmetric four-point airframe",
    "4x brushless actuators, counter-rotating pairs",
    "4x solid-state power switches, 40A each",
    "Fixed-pitch lift surfaces, sub-9-inch",
    "Inertial + satellite positioning stack",
    "Sub-GHz long-range control uplink",
    "3S high-discharge power cell",
  ],
  prevSlug: "quant-finance-scripts",
  prevTitle: "Quant Finance Scripts",
  nextSlug: "laser-turret",
  nextTitle: "Laser Turret",
};

export function getProjectBySlug(slug) {
  if (slug === "new-project") return newProject;
  return projects.find((p) => p.slug === slug);
}

// Homepage grid order (matches the original bento layout: 01 feature, then
// 02-07 in a 2-column grid). Same array as `projects` (already in this order).
export const homepageProjects = projects;
