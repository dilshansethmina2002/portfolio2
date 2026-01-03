import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

const CARD_WIDTH = 340
const GAP = 48

export default function AchievementsAndActivities() {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    })

    const totalMove =
        (items.length - 1) * (CARD_WIDTH + GAP)

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -totalMove]
    )

    return (
        <section ref={sectionRef} style={track}>
            <div style={sticky}>
                <motion.div style={{ ...row, x }}>
                    {items.map((item, i) => (
                        <AchievementCard
                            key={item.title}
                            item={item}
                            index={i}
                            total={items.length}
                            progress={scrollYProgress}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

/* ================= CARD ================= */

function AchievementCard({ item, index, total, progress }) {
    const step = 1 / (total - 1)
    const center = index * step
    const range = [center - 0.18, center, center + 0.18]

    const scale = useTransform(progress, range, [0.9, 1.08, 0.9], { clamp: true })
    const y = useTransform(progress, range, [30, -12, 30], { clamp: true })
    const opacity = useTransform(progress, range, [0.35, 1, 0.35], { clamp: true })
    const blur = useTransform(progress, range, ["blur(8px)", "blur(0px)", "blur(8px)"])
    const shadow = useTransform(progress, range, [
        "0 10px 30px rgba(0,0,0,0.15)",
        "0 35px 70px rgba(0,0,0,0.35)",
        "0 10px 30px rgba(0,0,0,0.15)",
    ])

    return (
        <motion.article
            style={{
                ...card,
                scale,
                y,
                opacity,
                filter: blur,
                boxShadow: shadow,
            }}
        >
            <span style={badge}>{item.type}</span>

            <h3 style={title}>{item.title}</h3>

            <p style={desc}>{item.description}</p>

            <div style={footer}>
                <span>{item.year}</span>
                <span style={dot}>•</span>
                <span>{item.org}</span>
            </div>
        </motion.article>
    )
}

/* ================= STYLES ================= */

const track = {
    height: "500vh",
    position: "relative",
}

const sticky = {
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
}

const row = {
    display: "flex",
    gap: `${GAP}px`,
    paddingLeft: `calc(50vw - ${CARD_WIDTH / 2}px)`,
    width: "max-content",
}

const card = {
    width: `${CARD_WIDTH}px`,
    height: "420px",
    background: "linear-gradient(180deg, #ffffff, #f3f3f3)",
    borderRadius: "22px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}

const badge = {
    alignSelf: "flex-start",
    padding: "6px 14px",
    borderRadius: "999px",
    background: "#111",
    color: "#fff",
    fontSize: "12px",
    letterSpacing: "0.5px",
}

const title = {
    fontSize: "24px",
    fontWeight: 600,
    marginTop: "16px",
}

const desc = {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#555",
    flexGrow: 1,
    marginTop: "12px",
}

const footer = {
    fontSize: "13px",
    color: "#777",
    display: "flex",
    alignItems: "center",
}

const dot = {
    margin: "0 8px",
}

/* ================= DATA ================= */

const items = [
    {
        title: "Software Engineering Undergraduate",
        description:
            "Completed core modules in OOP, Data Structures, Software Engineering, and Web Development.",
        year: "2021 – Present",
        org: "University of Sri Jayewardenepura",
        type: "Education",
    },
    {
        title: "Hackathon Finalist",
        description:
            "Built a full-stack solution under 24 hours with real-world problem constraints.",
        year: "2024",
        org: "ICTS Society",
        type: "Achievement",
    },
    {
        title: "Zero Waste Club Member",
        description:
            "Actively involved in sustainability projects and awareness programs.",
        year: "2023",
        org: "USJ",
        type: "Activity",
    },
    {
        title: "YouTube Content Creator",
        description:
            "Created tech-focused content covering development, tools, and learning paths.",
        year: "2024",
        org: "YouTube",
        type: "Activity",
    },
]
