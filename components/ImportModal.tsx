import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled, Box } from "@mui/system";
import { ReactElement, useState } from "react";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  border-radius: 15px;
  backdrop-filter: blur(3px);
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const SubmitButton = styled("button")`
  &:hover {
    cursor: pointer;
  }
`;

const style = {
  width: '800px',
  height: '400px',
  border: "2px solid #000",
  borderRadius: 15,
  p: 2,
  px: 4,
  pb: 3,
  backgroundColor: 'white'
};

const ModalTitle = () => {
  return <h2>インポート</h2>
}

const ModalDescription = () => {
  return(
    <p style={{color: 'grey'}}>
      1. <a style={{color: 'blue'}} href="https://kob3l.csb.app/" target='_blank' rel="noopener noreferrer">https://kob3l.csb.app/</a> を開いてください<br/>
      2. 開発者ツール ＞ Console より<span style={{color: 'green'}}> localStorage.AppState </span>を実行して結果をコピーしてください<br/>
      3. データ欄にコピペし、ルーレット名を入力後、インポートボタンを押してください<br/>
    </p>
  )
}

const ImportForm = (props: { handleImport: (name: string, candidates: string[]) => void }) => {
  const [name, setName] = useState('')
  const [candidatesString, setCandidatesString] = useState('')

  return (
    <div style={{textAlign: 'center'}}>
      <label style={{width: 100}}>ルーレット名</label>
      <div style={{margin: "10px 0"}}>
        <input
          value={name}
          onChange={(e) => {setName(e.currentTarget.value)}}
        />
      </div>

      <label style={{width: 100}}>データ</label>
      <div>
        <input
          style={{margin: "10px 0"}}
          value={candidatesString}
          onChange={(e) => {setCandidatesString(e.currentTarget.value.trim().replace(/^'|'$/g, ''))}}
        />
      </div>

      <SubmitButton
        onClick={() => {
          if (name.trim().length === 0 || candidatesString.trim().length === 0) {
            alert('全て入力してください')
          } else {
            try {
              const candidates = JSON.parse(candidatesString).candidates.map((candidate: string) => {return JSON.stringify(candidate)})
              props.handleImport(name, candidates)
            } catch (error) {
              alert('データが不正です。')
            }
          }
        }}
      >
        インポート
      </SubmitButton>
    </div>
  )
}

export const ImportModal = (props: {
  open: boolean;
  handleClose: () => void;
  handleImport: (name: string, candidates: string[]) => void;
}) => {

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        <ModalTitle />
        <ModalDescription />
        <ImportForm handleImport={props.handleImport} />
      </Box>
    </StyledModal>
  );
}
