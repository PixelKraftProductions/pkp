const appNamePattern = /(Snakesss)/gi;
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];

while (walker.nextNode()) {
  const node = walker.currentNode;
  if (appNamePattern.test(node.nodeValue ?? '')) {
    textNodes.push(node);
  }
  appNamePattern.lastIndex = 0;
}

for (const node of textNodes) {
  const fragment = document.createDocumentFragment();
  for (const part of (node.nodeValue ?? '').split(appNamePattern)) {
    if (/^Snakesss$/i.test(part)) {
      fragment.append(document.createTextNode(part.slice(0, 5)));
      const suffix = document.createElement('span');
      suffix.className = 'name-highlight';
      suffix.textContent = part.slice(5);
      fragment.append(suffix);
    } else {
      fragment.append(document.createTextNode(part));
    }
  }
  node.replaceWith(fragment);
}
