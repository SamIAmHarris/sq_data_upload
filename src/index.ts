import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
// @ts-ignore
import { Database } from './database/types'
import {
    Seed, EVENT_SEED_TYPES_TAGS, BUSINESS_SEED_TYPES_AND_TAGS, RESOURCE_SEED_TYPES_AND_TAGS,
    EVENT_CROSS_CATEGORY_SEED, BUSINESS_CROSS_CATEGORY_SEED, RESOURCE_CROSS_CATEGORY_SEED
} from "./seeds.js";

const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
)

const SEED: Seed[] = [...EVENT_SEED_TYPES_TAGS, ...EVENT_CROSS_CATEGORY_SEED, ...BUSINESS_SEED_TYPES_AND_TAGS, ...BUSINESS_CROSS_CATEGORY_SEED, ...RESOURCE_SEED_TYPES_AND_TAGS, ...RESOURCE_CROSS_CATEGORY_SEED]

async function seed() {
    // 1) Insert all types
    const typeRows: Database['public']['Tables']['types']['Insert'][] = SEED.map((t) => ({
        name: t.typeName,
        item_type: t.item_type,
        cross_category: t.cross_category ?? false,
    }))

    const { data: upsertedTypes, error: typeErr } = await supabase
        .from('types')
        .upsert(typeRows, { onConflict: 'item_type,name' })
        .select('id,name,item_type')

    if (typeErr) throw typeErr
    if (!upsertedTypes?.length) throw new Error('No types returned from insert')

    // Build lookup (item_type + name) -> id
    const typeIdByNameType = new Map<string, number>()
    for (const r of upsertedTypes) {
        typeIdByNameType.set(`${r.item_type}::${r.name}`, Number(r.id))
    }

    // 2) Build all tag rows with parent_type FK
    const tagRows: Database['public']['Tables']['tags']['Insert'][] = []
    for (const t of SEED) {
        const typeId = typeIdByNameType.get(`${t.item_type}::${t.typeName}`)
        if (!typeId) throw new Error(`Missing type id for ${t.item_type}/${t.typeName}`)

        for (const tag of t.tags) {
            tagRows.push({
                name: tag.name,
                item_type: t.item_type,
                cross_category:  tag.cross_category ?? false,
                parent_type: typeId,
            })
        }
    }

    const { data: upsertedTags, error: tagErr } = await supabase
        .from('tags')
        .upsert(tagRows, { onConflict: 'parent_type,item_type,name' })
        .select('id,name,item_type,parent_type')

    if (tagErr) throw tagErr

    console.log(`Seeded ${upsertedTypes.length} types and ${upsertedTags?.length ?? 0} tags`)
}

seed().catch((e) => {
    console.error('Seed failed:', e)
    process.exitCode = 1
})
