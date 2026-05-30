import { revalidatePortfolio } from "@/lib/cms/revalidate"

export async function afterMutation() {
  revalidatePortfolio()
}
