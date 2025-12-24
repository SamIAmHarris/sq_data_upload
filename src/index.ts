import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
// @ts-ignore
import { Database } from './database/types'

const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
)

type ItemType = Database['public']['Enums']['item_type'] // 'business' | 'resource' | 'event'

type Seed = {
    typeName: string
    item_type: ItemType
    cross_category?: boolean
    tags: { name: string; cross_category?: boolean }[]
}

export const SEED: Seed[] = [
    {
        typeName: 'Restaurant',
        item_type: 'business',
        tags: [{ name: 'Takeout' }, { name: 'Outdoor Seating' }],
    },
    {
        typeName: 'Conference',
        item_type: 'event',
        tags: [{ name: 'In-person' }, { name: 'Virtual' }],
    },
]

async function seed() {
    // 1) Insert all types
    const typeRows: Database['public']['Tables']['types']['Insert'][] = SEED.map((t) => ({
        name: t.typeName,
        item_type: t.item_type,
        cross_category: t.cross_category ?? false,
    }))

    const { data: insertedTypes, error: typeErr } = await supabase
        .from('types')
        .insert(typeRows)
        .select('id,name,item_type')

    if (typeErr) throw typeErr
    if (!insertedTypes?.length) throw new Error('No types returned from insert')

    // Build lookup (item_type + name) -> id
    const typeIdByNameType = new Map<string, number>()
    for (const r of insertedTypes) {
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
                cross_category: tag.cross_category ?? false,
                parent_type: typeId, // ✅ FK to types.id
            })
        }
    }

    const { data: insertedTags, error: tagErr } = await supabase
        .from('tags')
        .insert(tagRows)
        .select('id,name,item_type,parent_type')

    if (tagErr) throw tagErr

    console.log(`Seeded ${insertedTypes.length} types and ${insertedTags?.length ?? 0} tags`)
}

seed().catch((e) => {
    console.error('Seed failed:', e)
    process.exitCode = 1
})
