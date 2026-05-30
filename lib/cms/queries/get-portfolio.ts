import { unstable_cache } from "next/cache"
import { getLegacyPortfolioFallback } from "@/lib/cms/fallback/legacy-portfolio"
import { normalizePortfolio } from "@/lib/cms/normalize-portfolio"
import { fetchPortfolioFromDatabase } from "./fetch-portfolio"
import type { PortfolioDTO } from "@/lib/cms/types/portfolio"
import { isDatabaseConfigured } from "@/lib/cms/db"

export const PORTFOLIO_CACHE_TAG = "portfolio"

const DEFAULT_PORTFOLIO_FETCH_TIMEOUT_MS = 8000

function getPortfolioFetchTimeoutMs(): number {
  const raw = process.env.CMS_DATABASE_TIMEOUT_MS
  if (!raw) return DEFAULT_PORTFOLIO_FETCH_TIMEOUT_MS

  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_PORTFOLIO_FETCH_TIMEOUT_MS
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`CMS database query timed out after ${timeoutMs}ms`)),
          timeoutMs
        )
      }),
    ])
  } finally {
    if (timer) {
      clearTimeout(timer)
    }
  }
}

async function resolvePortfolio(): Promise<PortfolioDTO> {
  let portfolio: PortfolioDTO
  if (isDatabaseConfigured()) {
    try {
      const fromDb = await withTimeout(
        fetchPortfolioFromDatabase(),
        getPortfolioFetchTimeoutMs()
      )
      portfolio = fromDb ?? getLegacyPortfolioFallback()
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.warn(
        `Falling back to legacy portfolio content because the CMS database could not be reached: ${message}`
      )
      portfolio = getLegacyPortfolioFallback()
    }
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
