export function exportSermonJSON(state) {
  const data = JSON.stringify({ version: 1, sermon: state }, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const title = state.titleTheme?.sermonTitle?.trim() || 'sermao'
  const slug = title.replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, '').trim().replace(/\s+/g, '-').toLowerCase()
  const date = state.preacherInfo?.date || 'sem-data'
  a.href = url
  a.download = `${slug}-${date}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importSermonJSON(onImport) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        if (parsed?.version === 1 && parsed?.sermon) {
          onImport(parsed.sermon)
        } else {
          alert('Arquivo JSON inválido ou incompatível.')
        }
      } catch {
        alert('Não foi possível ler o arquivo. Verifique se é um JSON válido.')
      }
    }
    reader.readAsText(file)
  }
  input.click()
}
