const headerTitle = document.getElementById('headerTitle')

export function initHeader() {
  const saved = localStorage.getItem('headerTitle')
  if (saved) headerTitle.textContent = saved

  headerTitle.addEventListener('click', () => {
    headerTitle.contentEditable = true
    headerTitle.classList.add('editing')
    headerTitle.focus()
  })

  headerTitle.addEventListener('blur', save)
  headerTitle.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      headerTitle.blur()
    }
  })
}

function save() {
  headerTitle.contentEditable = false
  headerTitle.classList.remove('editing')

  const text = headerTitle.textContent.trim() || 'Списък Мазе - София'
  headerTitle.textContent = text
  localStorage.setItem('headerTitle', text)
}
