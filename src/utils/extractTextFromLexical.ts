/**
 * Extract plain text from Lexical editor data
 * Lexical stores content as { root: { children: [...] } }
 */
export function extractTextFromLexical(data: any): string {
  if (!data) return ''

  if (typeof data === 'string') {
    return data
  }

  if (!data.root || !data.root.children) {
    return ''
  }

  const extractText = (nodes: any[]): string => {
    return nodes
      .map((node) => {
        if (node.text) return node.text
        if (node.children) return extractText(node.children)
        return ''
      })
      .join('')
  }

  return extractText(data.root.children)
}
