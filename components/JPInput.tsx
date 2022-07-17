import { FormEvent, HTMLProps, useState, KeyboardEvent } from "react";

export const JPInput = (props: HTMLProps<HTMLInputElement>) => {
  const [composition, setComposition] = useState<"start" | "update" | "end">(
    "start"
  );
  return (
    <input
      value={props.value}
      onCompositionStart={() => {
        console.log("composition start");
        setComposition("start");
      }}
      onCompositionUpdate={() => {
        console.log("composition update");
        setComposition("update");
      }}
      onCompositionEnd={() => {
        console.log("composition end");
        setComposition("end");
      }}
      onChange={(e: FormEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case "Enter": {
            if (composition === "update") {
              return;
            }
          }
        }
        props.onKeyDown && props.onKeyDown(e);
      }}
    />
  );
};
