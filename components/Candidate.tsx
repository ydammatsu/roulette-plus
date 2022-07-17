import { FC, FormEvent } from "react";
import styled from "styled-components";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";

type RowWrapperProps = {
  highlight?: boolean;
  hide?: boolean;
};

const Wrapper = styled.div<RowWrapperProps>`
  display: grid;
  grid-template-columns: 20px 2fr 60px 60px;
  align-items: center;
  color: ${(props) => (props.hide ? "#ababab" : "none")};
  border-bottom: solid white 5px;
  input {
    color: ${(props) => (props.hide ? "#ababab" : "none")};
  }
`;

const Index = styled.div<{ highlight: boolean }>`
  color: ${(props) => (props.highlight ? "red" : "none")};
`;

const Input = styled.input`
  outline: none;
  border: none;
`;

type Props = {
  idx: number;
  hide: boolean;
  name: string;
  changeHandler: (s: string) => void;
  hideHandler: () => void;
  showHandler: () => void;
  deleteHandler: () => void;
  highlight?: boolean;
};


export const CandidateHeader: FC = () => {
  return (
    <Wrapper>
      <div>id</div>
      <div>name</div>
      <div></div>
      <div></div>
    </Wrapper>
  );
};

export const CandidateRow: FC<Props> = ({
  idx,
  hide,
  name,
  changeHandler,
  hideHandler,
  showHandler,
  deleteHandler,
  highlight
}) => {
  return (
    <Wrapper highlight={highlight ?? false} hide={hide}>
      <Index highlight={highlight ?? false}>{idx}</Index>
      <Input
        value={name}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          changeHandler(e.currentTarget.value);
        }}
      />
      <Switch
        checked={!hide}
        onChange={() => (hide ? showHandler() : hideHandler())}
      />
      <DeleteIcon onClick={deleteHandler} />
    </Wrapper>
  );
};
