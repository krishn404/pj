import { runSeed } from "@/lib/cms/seed/run-seed"

runSeed().catch((error) => {
  console.error("Seed failed:", error)
  process.exit(1)
})
