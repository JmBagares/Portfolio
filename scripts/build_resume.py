"""Build the web developer resume. Requires reportlab (pip install reportlab)."""

from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Jan-Manuel-Bagares-Web-Developer-Resume.pdf"
ASSET = ROOT / "src" / "assets" / "Jan Manuel Bagares Web Developer Resume.pdf"
INK = colors.HexColor("#192832")
ACCENT = colors.HexColor("#236879")
MUTED = colors.HexColor("#4b5961")

STYLES = {
    "name": ParagraphStyle("Name", fontName="Helvetica-Bold", fontSize=20, leading=23, alignment=TA_CENTER, textColor=INK),
    "role": ParagraphStyle("Role", fontName="Helvetica-Bold", fontSize=11, leading=15, alignment=TA_CENTER, textColor=ACCENT),
    "contact": ParagraphStyle("Contact", fontName="Helvetica", fontSize=9.3, leading=13, alignment=TA_CENTER, textColor=INK),
    "section": ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=10.3, leading=14, spaceBefore=10, spaceAfter=4, textColor=ACCENT),
    "title": ParagraphStyle("Title", fontName="Helvetica-Bold", fontSize=10.2, leading=13.5, textColor=INK),
    "meta": ParagraphStyle("Meta", fontName="Helvetica", fontSize=9, leading=12, spaceAfter=4, textColor=MUTED),
    "body": ParagraphStyle("Body", fontName="Helvetica", fontSize=10, leading=13.5, textColor=INK),
    "bullet": ParagraphStyle("Bullet", fontName="Helvetica", fontSize=10, leading=13.5, leftIndent=10, firstLineIndent=-8, spaceAfter=3, textColor=INK),
}


def paragraph(text, style="body"):
    return Paragraph(text, STYLES[style])


def link(label, url):
    return f'<a href="{url}" color="#236879"><u>{label}</u></a>'


def section(story, title):
    story.extend([
        paragraph(title, "section"),
        HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd4d9")),
        Spacer(1, 5),
    ])


def entry(story, title, meta, bullets):
    story.append(KeepTogether([
        paragraph(title, "title"),
        paragraph(meta, "meta"),
        *[paragraph(f"&#8226; {text}", "bullet") for text in bullets],
        Spacer(1, 4),
    ]))


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    story = [
        paragraph("JAN MANUEL M. BAGARES", "name"),
        Spacer(1, 3),
        paragraph("Junior Frontend Developer | React &amp; TypeScript", "role"),
        paragraph("Las Pi&#241;as City, Philippines | 0995 712 8062", "contact"),
        paragraph(" | ".join([
            link("jmbagares52@gmail.com", "mailto:jmbagares52@gmail.com"),
            link("Portfolio", "https://jmbagares.com/"),
            link("GitHub", "https://github.com/JmBagares"),
            link("LinkedIn", "https://www.linkedin.com/in/jan-manuel-bagares-977760337/"),
        ]), "contact"),
    ]

    section(story, "PROFESSIONAL SUMMARY")
    story.append(paragraph(
        "Computer Science graduate building responsive web interfaces with React, JavaScript, and TypeScript. "
        "Experience includes form validation, REST API integration, two company websites deployed during an IT "
        "internship, and a React Native thesis application using Supabase and PostgreSQL. Seeking junior frontend "
        "or web development opportunities."
    ))

    section(story, "PROJECTS")
    entry(story, "PetSOS Landing Page | Solo Frontend Project", "React, TypeScript, Tailwind CSS, Framer Motion, GSAP | "
          + link("Live website", "https://pet-sos.vercel.app/") + " | "
          + link("Source code", "https://github.com/JmBagares/Landing-Page-PetSOS"), [
        "Built a responsive product website explaining the PetSOS application through reusable React sections and clear calls to action.",
        "Implemented desktop and mobile layouts, animated entrances, hover feedback, and interactive background effects.",
    ])
    entry(story, "CvSU Enrollment System | Frontend Developer, Team Project", "React, JavaScript, Bootstrap, CSS, Axios | "
          + link("Case study", "https://jmbagares.com/case-study-enrollment.html") + " | "
          + link("Source code", "https://github.com/JmBagares/Enrollment-System"), [
        "Developed responsive enrollment screens, client-side form validation, and visible input feedback.",
        "Integrated backend requests with Axios and coordinated request and response behavior with the team's backend developers.",
    ])
    entry(story, "PetSOS | Mobile Developer, Four-Person Thesis Team (2025 - 2026)", "React Native, Expo, TypeScript, Supabase, PostgreSQL | "
          + link("Case study", "https://jmbagares.com/case-study-petsos.html") + " | "
          + link("Source code", "https://github.com/JmBagares/petsos-prototype"), [
        "Developed mobile interfaces and application logic for incident reporting, volunteer coordination, geolocation, and mapping; integrated authentication and real-time data updates.",
        "The team application received 4.64/5 in an ISO/IEC 25010-based software quality evaluation involving 50 respondents.",
    ])

    section(story, "EXPERIENCE")
    entry(story, "IT Intern | Magnaval Services", "July 2025 - August 2025 | Las Pi&#241;as City, Philippines | "
          + link("Magnaval Services", "https://magnavalservices.com") + " | "
          + link("Warduz Petshop", "https://warduzpetshop.com"), [
        "Built and deployed two responsive company websites using WordPress, cPanel, and custom domain configuration.",
        "Organized service and product content, supported client requests, and prepared technical documentation.",
        "Provided hardware and software troubleshooting and assisted with networking, CCTV, and biometric access installations.",
    ])

    section(story, "TECHNICAL SKILLS")
    for row in [
        "<b>Frontend:</b> React, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap, responsive design",
        "<b>Integration &amp; Data:</b> REST API integration, Axios, Supabase, PostgreSQL, SQL, authentication",
        "<b>Tools:</b> Git, GitHub, Vite, WordPress, cPanel, Framer Motion",
        "<b>Mobile:</b> React Native, Expo, push notifications, geolocation",
    ]:
        story.append(paragraph(row))

    section(story, "EDUCATION")
    story.append(paragraph("Bachelor of Science in Computer Science | 2022 - 2026", "title"))
    story.append(paragraph("Cavite State University - Bacoor Campus | Graduated September 17, 2026", "meta"))

    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, rightMargin=38, leftMargin=38, topMargin=30, bottomMargin=28,
        title="Jan Manuel Bagares - Frontend Developer Resume", author="Jan Manuel Bagares",
    )
    doc.build(story)
    copyfile(OUTPUT, ASSET)
    print(f"Created {OUTPUT}")
    print(f"Portfolio asset {ASSET}")


if __name__ == "__main__":
    build()
