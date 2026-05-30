import { revalidateTag } from "next/cache"
import { PORTFOLIO_CACHE_TAG } from "./queries/get-portfolio"

export function revalidatePortfolio() {
  revalidateTag(PORTFOLIO_CACHE_TAG)
}
