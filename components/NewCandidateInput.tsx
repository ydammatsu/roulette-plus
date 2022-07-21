import { FormEvent, HTMLProps, useState, KeyboardEvent } from 'react';

export const NewCandidateInput = (props: HTMLProps<HTMLInputElement>) => {
  const [composition, setComposition] = useState<'start' | 'update' | 'end'>(
    'start',
  );
  return (
    <input
      value={props.value}
      onCompositionStart={() => {
        setComposition('start');
      }}
      onCompositionUpdate={() => {
        setComposition('update');
      }}
      onCompositionEnd={() => {
        setComposition('end');
      }}
      onChange={(e: FormEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'Enter': {
            if (composition === 'update') {
              return;
            }
          }
        }
        props.onKeyDown && props.onKeyDown(e);
      }}
    />
  );
};
