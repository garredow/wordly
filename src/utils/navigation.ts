export function scrollIntoView(
  scrollerElement: HTMLElement,
  element: HTMLElement,
  behavior: 'smooth' | 'auto' = 'smooth'
): void {
  const rect = element.getBoundingClientRect();

  if (rect.top - scrollerElement.offsetTop < 0) {
    scrollerElement.scroll({
      top: scrollerElement.scrollTop + rect.top - scrollerElement.offsetTop,
      behavior,
    });
    return;
  }

  const diff = rect.bottom - (scrollerElement.offsetHeight + scrollerElement.offsetTop);

  if (diff > 0) {
    scrollerElement.scroll({ top: scrollerElement.scrollTop + diff, behavior });
  }
}

export function scrollIntoViewH(
  scrollerElement: HTMLElement,
  element: HTMLElement,
  behavior: 'smooth' | 'auto' = 'smooth'
): void {
  const rect = element.getBoundingClientRect();

  if (rect.left - scrollerElement.offsetLeft < 0) {
    scrollerElement.scroll({
      left: scrollerElement.scrollLeft + rect.left - scrollerElement.offsetLeft,
      behavior,
    });
    return;
  }

  const diff = rect.right - (scrollerElement.offsetWidth + scrollerElement.offsetLeft);

  if (diff > 0) {
    scrollerElement.scroll({ left: scrollerElement.scrollLeft + diff, behavior });
  }
}
