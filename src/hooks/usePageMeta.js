import { useEffect } from 'react'

/**
 * Sets the document title and meta description for the current page.
 * Helps with SEO for SPA pages.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content')
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc)
      }
    }
  }, [title, description])
}
