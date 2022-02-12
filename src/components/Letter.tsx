import { h } from 'preact';
import { LetterStatus } from '../enums';
import { ifClass, joinClasses } from '../utils/classes';
import styles from './Letter.module.css';

type Props = {
  letter?: string;
  status?: LetterStatus;
};

export function Letter(props: Props) {
  return (
    <div
      class={joinClasses(
        styles.root,
        ifClass(props.status === LetterStatus.FoundExactMatch, styles.match),
        ifClass(props.status === LetterStatus.FoundInWord, styles.inWord),
        ifClass(props.status === LetterStatus.NotFound, styles.notFound)
      )}
    >
      {props.letter}
    </div>
  );
}
