import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Showreel } from "@/components/showreel"
import { Work } from "@/components/work"
import { Experimental } from "@/components/experimental"
import { Services } from "@/components/services"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Showreel />
      <Work />
      <Experimental />
      <Services />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
