import { MdInvertColors } from '@react-icons/all-files/md/MdInvertColors';
import { MdRefresh } from '@react-icons/all-files/md/MdRefresh';
import cloneDeep from 'lodash.clonedeep';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Letter } from '../components/Letter';
import { Letters } from '../components/Letters';
import { useSettings } from '../contexts';
import { LetterStatus } from '../enums';
import { useKeys } from '../hooks';
import { Theme } from '../models';
import { getRandomAnswer, validateWord } from '../services/word';
import { Icon } from '../ui-components/icon';
import styles from './Home.module.css';

type Guess = {
  complete: boolean;
  winner: boolean;
  letters: {
    value?: string;
    status?: LetterStatus;
  }[];
};
const defaultGuesses: Guess[] = [
  { complete: false, winner: false, letters: [] },
  { complete: false, winner: false, letters: [] },
  { complete: false, winner: false, letters: [] },
  { complete: false, winner: false, letters: [] },
  { complete: false, winner: false, letters: [] },
  { complete: false, winner: false, letters: [] },
];

const Home: FunctionalComponent = () => {
  const [guesses, setGuesses] = useState<Guess[]>(defaultGuesses);
  const [answer, setAnswer] = useState<{ word: string; index: number }>();

  const { settings, setSetting } = useSettings();

  const currentGuess = guesses[guesses.findIndex((a) => !a.complete) - 1]?.letters
    .map((a) => a.value)
    .join('');

  useEffect(resetGame, []);

  useKeys(
    {
      Backspace: removeLetter,
      SoftLeft: changeTheme,
      SoftRight: resetGame,
      ['*']: () => {
        // Required to get app into KaiStore
        (window as any).getKaiAd({
          publisher: 'bfa639b9-3ae0-4e79-8042-b41d65c59ea1',
          app: 'Wordly',
          onerror: (err: any) => console.error('Custom catch:', err),
          onready: (ad: any) => ad.call('display'),
        });
      },
    },
    {
      capture: true,
    }
  );

  function changeTheme() {
    setSetting('theme', settings.theme === Theme.Dark ? Theme.Light : Theme.Dark);
  }

  function resetGame() {
    setGuesses(defaultGuesses);
    setAnswer(getRandomAnswer());
  }

  function addLetter(letter: string) {
    if (guesses.some((a) => a.winner) || guesses[5].complete) return;

    const result = cloneDeep(guesses);
    const index = result.findIndex((a) => !a.complete);
    result[index].letters.push({ value: letter, status: LetterStatus.None });

    const guess = result[index].letters.map((a) => a.value).join('');

    if (guess.length === 5 && !validateWord(guess)) {
      result[index].letters = [];
    } else if (guess.length === 5) {
      const answerLetters = answer?.word.split('') || [];
      result[index].letters = result[index].letters.map((letter, idx) => ({
        value: letter.value,
        status:
          letter.value === answerLetters[idx]
            ? LetterStatus.FoundExactMatch
            : answerLetters.includes(letter.value as string)
            ? LetterStatus.FoundInWord
            : LetterStatus.NotFound,
      }));
      result[index].complete = true;
      result[index].winner = result[index].letters.every(
        (a) => a.status === LetterStatus.FoundExactMatch
      );
    }

    setGuesses(result);
  }

  function removeLetter() {
    if (guesses.some((a) => a.winner)) return;

    const index = guesses.findIndex((a) => !a.complete);
    const result = [...guesses];

    if (result[index].letters.length === 0) return;

    result[index].letters.pop();

    setGuesses(result);
  }

  return (
    <div class={styles.root}>
      <div class={styles.grid}>
        {guesses.map((guess) => (
          <div class={styles.row}>
            <Letter letter={guess.letters[0]?.value} status={guess.letters[0]?.status} />
            <Letter letter={guess.letters[1]?.value} status={guess.letters[1]?.status} />
            <Letter letter={guess.letters[2]?.value} status={guess.letters[2]?.status} />
            <Letter letter={guess.letters[3]?.value} status={guess.letters[3]?.status} />
            <Letter letter={guess.letters[4]?.value} status={guess.letters[4]?.status} />
          </div>
        ))}
      </div>
      <Letters answer={answer?.word} guess={currentGuess} onSelectLetter={addLetter} />
      <div class={styles.navbar}>
        <Icon icon={<MdInvertColors />} size="20" />
        <div>
          {`Wordly #${answer?.index}`}{' '}
          {guesses[5].complete && !guesses[5].winner ? `(${answer?.word})` : ''}
        </div>
        <Icon icon={<MdRefresh />} size="20" />
      </div>
    </div>
  );
};

export default Home;
