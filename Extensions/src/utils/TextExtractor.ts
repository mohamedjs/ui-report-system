export class TextExtractor {
  static extractFirstVisibleText(element: Element): string {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    const firstTextNode = walker.nextNode();
    return firstTextNode ? firstTextNode.textContent?.trim() || '' : '';
  }
}