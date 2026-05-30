"use server"

import { eq } from "drizzle-orm"
import { mediaAssets } from "@/lib/cms/db/schema"
import { afterMutation } from "@/lib/cms/admin/revalidate"
import { requireAdminDb } from "@/lib/cms/admin/require-admin"
import { fail, ok, type ActionResult } from "@/lib/cms/admin/types"
import {
  ALLOWED_IMAGE_TYPES,
  createAdminStorageClient,
  MAX_UPLOAD_BYTES,
  STORAGE_BUCKET,
} from "@/lib/supabase/admin"

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

export async function uploadPortfolioImage(
  formData: FormData
): Promise<ActionResult<{ id: string; publicUrl: string }>> {
  try {
    const db = await requireAdminDb()
    const file = formData.get("file")
    const alt = String(formData.get("alt") ?? "")

    if (!(file instanceof File)) return fail("No file provided.")
    if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
      return fail("Only JPEG, PNG, WebP, and GIF images are allowed.")
    }
    if (file.size > MAX_UPLOAD_BYTES) return fail("File must be under 5MB.")

    const ext = file.name.split(".").pop() ?? "jpg"
    const path = `uploads/${Date.now()}-${sanitizeFilename(file.name.replace(/\.[^.]+$/, ""))}.${ext}`

    const supabase = createAdminStorageClient()
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false })

    if (uploadError) {
      return fail(
        uploadError.message.includes("Bucket not found")
          ? `Create a public bucket named "${STORAGE_BUCKET}" in Supabase Storage.`
          : uploadError.message
      )
    }

    const { data: publicData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)

    const [asset] = await db
      .insert(mediaAssets)
      .values({
        storagePath: path,
        publicUrl: publicData.publicUrl,
        alt: alt || null,
        mimeType: file.type,
      })
      .returning()

    await afterMutation()
    return ok({ id: asset.id, publicUrl: asset.publicUrl })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Upload failed")
  }
}

export async function deleteMediaAsset(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id))
    if (!asset) return fail("Asset not found")

    try {
      const supabase = createAdminStorageClient()
      await supabase.storage.from(STORAGE_BUCKET).remove([asset.storagePath])
    } catch {
      // Storage delete is best-effort
    }

    await db.delete(mediaAssets).where(eq(mediaAssets.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}
