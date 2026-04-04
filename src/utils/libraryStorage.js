const LIBRARY_KEY = 'sermonLibrary'
const ACTIVE_KEY = 'sermon_active'
const SERMON_PREFIX = 'sermon_'
const LEGACY_KEY = 'sermonPlannerData'

// ─── Index (list of sermon summaries) ───────────────────────────────────────

export function loadLibrary() {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveLibrary(sermons) {
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(sermons))
  } catch { /* quota */ }
}

// ─── Active sermon id ────────────────────────────────────────────────────────

export function loadActiveId() {
  try {
    return localStorage.getItem(ACTIVE_KEY) || null
  } catch {
    return null
  }
}

export function saveActiveId(id) {
  try {
    if (id) localStorage.setItem(ACTIVE_KEY, id)
    else localStorage.removeItem(ACTIVE_KEY)
  } catch { /* quota */ }
}

// ─── Per-sermon data ─────────────────────────────────────────────────────────

export function loadSermon(id) {
  try {
    const raw = localStorage.getItem(SERMON_PREFIX + id)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSermon(id, data) {
  try {
    localStorage.setItem(SERMON_PREFIX + id, JSON.stringify(data))
  } catch { /* quota */ }
}

export function deleteSermon(id) {
  try {
    localStorage.removeItem(SERMON_PREFIX + id)
  } catch { /* ignore */ }
}

// ─── Migration from legacy single-sermon format ──────────────────────────────

export function migrateFromLegacy(generateId) {
  const hasLibrary = localStorage.getItem(LIBRARY_KEY) !== null
  if (hasLibrary) return null // already migrated

  const legacyRaw = localStorage.getItem(LEGACY_KEY)
  if (!legacyRaw) return null // nothing to migrate

  try {
    const legacyData = JSON.parse(legacyRaw)
    const id = generateId()
    const title = legacyData?.titleTheme?.sermonTitle || 'Sermão importado'
    const date = legacyData?.preacherInfo?.date || ''
    const now = new Date().toISOString()

    // Save sermon data under new key
    saveSermon(id, legacyData)

    // Create library index
    const entry = { id, title, date, createdAt: now, updatedAt: now }
    saveLibrary([entry])
    saveActiveId(id)

    // Remove legacy key
    try { localStorage.removeItem(LEGACY_KEY) } catch { /* ignore */ }

    return { id, entry }
  } catch {
    return null
  }
}
