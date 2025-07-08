import { ref, watch, onMounted } from 'vue'

/**
 * usePagination
 * @param initialHtml optional: string or string[] that will be rendered initially
 */
export function usePagination(initialHtml: string | string[] = '') {
  /* refs */
  const wrapperRef = ref<HTMLElement | null>(null)
  const pageHeight = ref<number>(1000)

  /* internal state */
  let busy = false
  let pageNo = 1

  /* helper: create a new page element */
  function makePage(): HTMLDivElement {
    const p = document.createElement('div')
    p.className =
      'page bg-white border border-gray-300 shadow-lg box-border relative ' +
      'overflow-hidden w-[794px] max-w-[calc(100%-40px)] px-[80px] py-[96px]'
    p.contentEditable = 'true'
    p.dataset.page = String(pageNo++)
    // set fixed height 
    p.style.height = pageHeight.value + 'px'
    return p
  }

  /* split content into pages */
  function paginate() {
    if (!wrapperRef.value) return

    // save current caret / selection
    const sel = getSelection()
    const keep = sel?.rangeCount ? sel.getRangeAt(0).cloneRange() : null

    busy = true
    pageNo = 1
    const host = wrapperRef.value

    // gather existing nodes
    const stash = document.createDocumentFragment()
    host.querySelectorAll('.page').forEach(pg => {
      while (pg.firstChild) stash.appendChild(pg.firstChild)
    })
    host.textContent = ''

    // create first page
    let page = makePage()
    host.appendChild(page)

    // loop over nodes and fill pages until full
    Array.from(stash.childNodes).forEach(node => {
      page.appendChild(node)
      if (page.scrollHeight > pageHeight.value) {
        page.removeChild(node)
        page = makePage()
        page.appendChild(node)
        host.appendChild(page)
      } 
    })

    busy = false

    // restore caret & focus 
    if (keep && sel) {
      sel.removeAllRanges()
      sel.addRange(keep)
      const editable = keep.startContainer
        .parentElement?.closest('[contenteditable]') as HTMLElement | null
      editable?.focus({ preventScroll: true })
    }
  }

  onMounted(() => {
    if (!wrapperRef.value) return

    // first page + initial content
    const first = makePage()
    wrapperRef.value.appendChild(first)
    if (initialHtml) {
      const html = Array.isArray(initialHtml) ? initialHtml.join('') : initialHtml
      first.innerHTML = html
    } else {
      first.innerHTML = '<h2>Start typing…</h2><p><br></p>'
    }

    paginate()

    // listen to user input and re-paginate when necessary
    wrapperRef.value.addEventListener('input', e => {
      if (busy) return
      // only recheck the page currently being edited
      const page = (e.target as HTMLElement).closest('.page') as HTMLElement | null
      if (page && page.scrollHeight > pageHeight.value) paginate()
    })
  })

  // re-paginate if pageHeight is changed 
  watch(pageHeight, paginate)

  return {
    wrapperRef,
    pageHeight,
    setPageHeight: (h: number) => (pageHeight.value = h)
  }
}
