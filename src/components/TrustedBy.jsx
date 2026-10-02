import { motion } from "framer-motion";

const ORGS = [
  "British Telecom",
  "Verizon",
  "HCL Technologies",
  "Shree Infosoft",
  "Information Dynamics",
];

// Plain wordmarks, not logos — avoids unauthorized trademark/logo use.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TrustedBy() {
  return (
    <section style={{ padding: "44px 0" }}>
      <div className="wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          style={{ textAlign: "center" }}
        >
          <motion.span
            variants={itemVariants}
            className="eyebrow"
            style={{ display: "block", marginBottom: "22px" }}
          >
            Trusted expertise across
          </motion.span>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px 44px",
            }}
          >
            {ORGS.map((name) => (
              <motion.span
                key={name}
                variants={itemVariants}
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "color-mix(in srgb, var(--meta) 65%, transparent)",
                }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
