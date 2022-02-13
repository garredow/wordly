import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { SelectablePriority } from '../enums';
import { useLetterScroller } from '../hooks';
import { ifClass, joinClasses } from '../utils/classes';
import styles from './Letters.module.css';

enum Status {
  None = 1,
  NotFound = 2,
  FoundInWord = 3,
  FoundExactMatch = 4,
}

const defaultLetters = {
  a: Status.None,
  b: Status.None,
  c: Status.None,
  d: Status.None,
  e: Status.None,
  f: Status.None,
  g: Status.None,
  h: Status.None,
  i: Status.None,
  j: Status.None,
  k: Status.None,
  l: Status.None,
  m: Status.None,
  n: Status.None,
  o: Status.None,
  p: Status.None,
  q: Status.None,
  r: Status.None,
  s: Status.None,
  t: Status.None,
  u: Status.None,
  v: Status.None,
  w: Status.None,
  x: Status.None,
  y: Status.None,
  z: Status.None,
};

type Props = {
  answer?: string;
  guess?: string;
  onSelectLetter: (letter: string) => void;
};

export function Letters(props: Props) {
  const [letters, setLetters] = useState(defaultLetters);

  useEffect(() => {
    if (props.guess?.length !== 5) return;

    const guessLetters = props.guess.split('');
    const answerLetters = props.answer?.split('') || [];

    const result = {} as any;
    guessLetters.forEach((letter, index) => {
      if (letter === answerLetters[index]) {
        result[letter] = Status.FoundExactMatch;
      } else if (answerLetters.includes(letter)) {
        result[letter] = Status.FoundInWord;
      } else {
        result[letter] = Status.NotFound;
      }
    });

    setLetters({
      ...letters,
      ...result,
    });
  }, [props.guess]);

  useEffect(() => {
    setLetters(defaultLetters);
  }, [props.answer]);

  const { selectedId } = useLetterScroller({
    priority: SelectablePriority.Low,
    onSelect: props.onSelectLetter,
  });

  return (
    <div class={styles.root} data-selectable-scroller={SelectablePriority.Low}>
      {Object.entries(letters).map(([letter, status]) => (
        <div
          class={joinClasses(
            styles.letter,
            ifClass(status === Status.FoundExactMatch, styles.match),
            ifClass(status === Status.FoundInWord, styles.inWord),
            ifClass(status === Status.NotFound, styles.notFound),
            ifClass(selectedId === letter, styles.selected)
          )}
          data-selectable-priority={SelectablePriority.Low}
          data-selectable-id={letter}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}
