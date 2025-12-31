import { motion, useScroll, useTransform } from "motion/react"
import { div } from "motion/react-client"
import { useRef } from "react"

// 1. Define constants so math is exact across CSS and JS
const CARD_WIDTH = 300
const GAP = 40
// How much to shift to center the first card? (Screen Center - Half Card)
// We use CSS calc() for this in the style object below.

export default function AchivementAndActivity() {
    const targetRef = useRef(null)
    
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // 2. Calculate total drift needed
    // To get from Card 1 centered to Card 8 centered, we need to move left by:
    // (Total Cards - 1) * (Card Width + Gap)
    const totalMove = (food.length - 1) * (CARD_WIDTH + GAP)

    // 3. Map Vertical Scroll (0 to 1) to Exact Horizontal Pixels (0 to -TotalMove)
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalMove])

    return (
        <section ref={targetRef} style={scrollTrack}>
            <div style={stickyContainer}>
                <motion.div style={{ ...horizontalRow, x }}>
                    {food.map(([emoji, hueA, hueB], i) => (
                        <Card
                            key={emoji}
                            i={i}
                            total={food.length}
                            scrollYProgress={scrollYProgress}
                            emoji={emoji}
                            hueA={hueA}
                            hueB={hueB}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function Card({ emoji, hueA, hueB, i, total, scrollYProgress }) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    // 1. Determine the "progress point" where THIS card is centered
    // e.g. If 8 cards, cards are at 0.0, 0.14, 0.28 ... 1.0
    const step = 1 / (total - 1)
    const centerPoint = i * step
    
    // 2. Set the focus range. 
    // The buffer (+/- 0.15) determines how "wide" the sweet spot is.
    const buffer = 0.15
    const inputRange = [centerPoint - buffer, centerPoint, centerPoint + buffer]

    // 3. Animate based on whether this card is near the center point
    // Make center card feel more prominent: larger scale, lifted, stronger shadow, higher z-index
    const scale = useTransform(scrollYProgress, inputRange, [0.92, 1.06, 0.92])
    const innerScale = useTransform(scrollYProgress, inputRange, [0.98, 1.03, 0.98])
    const opacity = useTransform(scrollYProgress, inputRange, [0.3, 1, 0.3])
    const y = useTransform(scrollYProgress, inputRange, [20, -10, 20])
    const boxShadow = useTransform(scrollYProgress, inputRange, [
        "0 10px 22px rgba(0,0,0,0.12)",
        "0 30px 60px rgba(0,0,0,0.35)",
        "0 10px 22px rgba(0,0,0,0.12)",
    ])
    const zIdx = useTransform(scrollYProgress, inputRange, [0, 20, 0])

    // Clean blur when in center, heavy blur when outside
    const blur = useTransform(scrollYProgress, inputRange, ["blur(10px)", "blur(0px)", "blur(10px)"])

    return (
        <div>
        <h2 className="text-heading">About Me</h2>
        <motion.div 
            style={{ 
                ...cardContainer, 
                scale,
                y,
                opacity,
                filter: blur,
                boxShadow,
                zIndex: zIdx,
            }}
        >
            <div style={{ ...splash, background, borderRadius: 20 }} />
            <div style={{ ...card, overflow: 'hidden' }}>
                <motion.div style={{ scale: innerScale, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    {emoji}
                </motion.div>
            </div>
        </motion.div>

        </div>
    )
}

const hue = (h) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const scrollTrack = {
    // Taller track = slower scroll = smoother animation
    height: "500vh", 
    position: "relative",
}

const stickyContainer = {
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    perspective: "1000px" // Adds depth if you want 3D effects later
}

const horizontalRow = {
    display: "flex",
    gap: `${GAP}px`, 
    // CRITICAL: This centers the first item when x = 0
    paddingLeft: `calc(50vw - ${CARD_WIDTH / 2}px)`,
    // Ensure the container doesn't collapse
    width: "max-content" 
}

const cardContainer = {
    position: "relative",
    flexShrink: 0, 
    width: `${CARD_WIDTH}px`,
    height: "450px", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transformOrigin: "center center",
}

const splash = {
    position: "absolute",
    top: 34,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card = {
    fontSize: 164,
    width: "300px",
    height: "430px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    zIndex: 1, 
}

/**
 * ==============   Data   ================
 */

const food = [
    [, 340, 10],
    ["😍", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
]