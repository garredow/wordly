import { useEffect, useState } from 'preact/hooks';
import { SelectablePriority } from '../enums';
import { scrollIntoViewH } from '../utils/navigation';

type Props = {
  priority?: SelectablePriority;
  capture?: boolean;
  onChange?: (selectedId: string) => void;
  onSelect?: (selectedId: string) => void;
};

type Return = {
  selectedId?: string;
};

export function useLetterScroller({
  priority = SelectablePriority.Low,
  capture = false,
  ...props
}: Props): Return {
  const [selectedId, setSelectedId] = useState<string>();

  function handleKeyPress(ev: KeyboardEvent): void {
    const target = ev.target as HTMLElement | null;

    // Check if valid key
    const shortcutKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const dpadKeys = ['ArrowLeft', 'ArrowRight', 'Enter'];

    if (![...dpadKeys, ...shortcutKeys].includes(ev.key)) return;

    const lowElements = document.querySelectorAll(
      `[data-selectable-priority='${SelectablePriority.Low}']`
    );
    const data = {
      priority: SelectablePriority.Low,
      results: Array.from(lowElements).map((element) => ({
        element,
        id: element.getAttribute('data-selectable-id') || '',
        shortcut: element.getAttribute('data-selectable-shortcut') || undefined,
      })),
    };

    ev.preventDefault();

    if (ev.key === 'Enter') {
      if (selectedId) {
        props.onSelect?.(selectedId);
      }
      return;
    }

    const currentIndex = data.results.findIndex((result) => result.id == selectedId);

    const shortcuts: any = {
      1: { startIndex: 0, endIndex: 0 },
      2: { startIndex: 0, endIndex: 2 },
      3: { startIndex: 3, endIndex: 5 },
      4: { startIndex: 6, endIndex: 8 },
      5: { startIndex: 9, endIndex: 11 },
      6: { startIndex: 12, endIndex: 14 },
      7: { startIndex: 15, endIndex: 18 },
      8: { startIndex: 19, endIndex: 21 },
      9: { startIndex: 22, endIndex: 25 },
    };

    const shortcut = shortcuts[ev.key];
    console.log('shortcut', shortcut);
    let nextIndex = currentIndex;
    if (shortcut) {
      nextIndex =
        currentIndex >= shortcut.startIndex && currentIndex < shortcut.endIndex
          ? currentIndex + 1
          : shortcut.startIndex;
    } else if (ev.key === 'ArrowLeft') {
      nextIndex--;
    } else if (ev.key === 'ArrowRight') {
      nextIndex++;
    }

    if (nextIndex < 0) {
      nextIndex = data.results.length - 1;
    } else if (nextIndex > data.results.length - 1) {
      nextIndex = 0;
    }

    setSelectedId(data.results[nextIndex]?.id);
    if (data.results[nextIndex]?.element) {
      (data.results[nextIndex].element as HTMLElement).focus({
        preventScroll: true,
      });
    }

    const scroller: HTMLElement | null = document.querySelector(
      `[data-selectable-scroller='${data.priority}']`
    );
    if (!scroller) return;

    scrollIntoViewH(scroller, data.results[nextIndex].element as HTMLElement);

    props.onChange?.(data.results[nextIndex]?.id);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, capture);

    return (): void => {
      document.removeEventListener('keydown', handleKeyPress, capture);
    };
  });

  return { selectedId };
}
