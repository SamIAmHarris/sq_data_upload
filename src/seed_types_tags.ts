import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
// @ts-ignore
import { Database } from './database/types'
import {
    SeedType, EVENT_SEED_TYPES_TAGS, BUSINESS_SEED_TYPES_AND_TAGS, RESOURCE_SEED_TYPES_AND_TAGS,
} from "./seeds.js";

const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
)

const SEED: SeedType[] = [...EVENT_SEED_TYPES_TAGS, ...BUSINESS_SEED_TYPES_AND_TAGS, ...RESOURCE_SEED_TYPES_AND_TAGS]

async function seed() {
    // 1) Insert all types
    const typeRows: Database['public']['Tables']['types']['Insert'][] = SEED.map((t) => ({
        id: t.id,
        name: t.typeName,
        item_type: t.item_type
    }))

    const { data: upsertedTypes, error: typeErr } = await supabase
        .from('types')
        .upsert(typeRows)
        .select('id,name,item_type')

    if (typeErr) throw typeErr
    if (!upsertedTypes?.length) throw new Error('No types returned from insert')

    // 2) Build all tag rows with parent_type FK
    const tagRows: Database['public']['Tables']['tags']['Insert'][] = []
    for (const t of SEED) {
        for (const tag of t.tags) {
            tagRows.push({
                id: tag.id,
                name: tag.name,
                item_type: t.item_type,
                parent_type: t.id,
            })
        }
    }

    const { data: upsertedTags, error: tagErr } = await supabase
        .from('tags')
        .upsert(tagRows)
        .select('id,name,item_type,parent_type')

    if (tagErr) throw tagErr

    console.log(`Seeded ${upsertedTypes.length} types and ${upsertedTags?.length ?? 0} tags`)
}

seed().catch((e) => {
    console.error('Seed failed:', e)
    process.exitCode = 1
})
