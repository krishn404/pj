import { unstable_cache } from "next/cache"
import { getLegacyPortfolioFallback } from "@/lib/cms/fallback/legacy-portfolio"
import { normalizePortfolio } from "@/lib/cms/normalize-portfolio"
import { fetchPortfolioFromDatabase } from "./fetch-portfolio"
import type { PortfolioDTO } from "@/lib/cms/types/portfolio"
import { isDatabaseConfigured } from "@/lib/cms/db"

export const PORTFOLIO_CACHE_TAG = "portfolio"

async function resolvePortfolio(): Promise<PortfolioDTO> {
  let portfolio: PortfolioDTO
  if (isDatabaseConfigured()) {
    const fromDb = await fetchPortfolioFromDatabase()
    portfolio = fromDb ?? getLegacyPortfolioFallback()
  } else {
    portfolio = getLegacyPortfolioFallback()
  }
  return normalizePortfolio(portfolio)
}

const getCachedPortfolio = unstable_cache(resolvePortfolio, ["portfolio-dto-v4"], {
  tags: [PORTFOLIO_CACHE_TAG],
  revalidate: 3600,
})

export async function getPortfolio(): Promise<PortfolioDTO> {
  return getCachedPortfolio()
}
