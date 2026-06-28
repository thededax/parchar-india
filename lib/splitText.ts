/**
 * Custom SplitText utility — free alternative to GSAP Club SplitText.
 * Splits text content into individual characters and/or words wrapped in spans.
 */

export interface SplitResult {
  chars: HTMLSpanElement[]
  words: HTMLSpanElement[]
  revert: () => void
}

export function splitTextIntoChars(element: HTMLElement): SplitResult {
  const originalHTML = element.innerHTML
  const text = element.textContent || ''
  const words: HTMLSpanElement[] = []
  const chars: HTMLSpanElement[] = []

  element.innerHTML = ''
  element.style.display = 'inline'

  const textWords = text.split(/\s+/).filter(Boolean)

  textWords.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span')
    wordSpan.className = 'split-word'
    wordSpan.style.display = 'inline-block'
    wordSpan.style.whiteSpace = 'nowrap'
    words.push(wordSpan)

    for (const char of word) {
      const charSpan = document.createElement('span')
      charSpan.className = 'split-char'
      charSpan.textContent = char
      charSpan.style.display = 'inline-block'
      chars.push(charSpan)
      wordSpan.appendChild(charSpan)
    }

    element.appendChild(wordSpan)

    // Add space between words
    if (wordIndex < textWords.length - 1) {
      const space = document.createTextNode('\u00A0')
      element.appendChild(space)
    }
  })

  return {
    chars,
    words,
    revert: () => {
      element.innerHTML = originalHTML
    },
  }
}

export function splitTextIntoWords(element: HTMLElement): SplitResult {
  const originalHTML = element.innerHTML
  const text = element.textContent || ''
  const words: HTMLSpanElement[] = []

  element.innerHTML = ''

  const textWords = text.split(/\s+/).filter(Boolean)

  textWords.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span')
    wordSpan.className = 'split-word'
    wordSpan.textContent = word
    wordSpan.style.display = 'inline-block'
    words.push(wordSpan)

    element.appendChild(wordSpan)

    if (wordIndex < textWords.length - 1) {
      const space = document.createTextNode('\u00A0')
      element.appendChild(space)
    }
  })

  return {
    chars: [],
    words,
    revert: () => {
      element.innerHTML = originalHTML
    },
  }
}
