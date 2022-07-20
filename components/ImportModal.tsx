import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled, Box } from "@mui/system";
import { ReactElement } from "react";

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

export default function ModalUnstyledDemo(props: {
  open: boolean;
  handleClose: () => void;
  children: ReactElement;
}) {
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={props.open}
        onClose={props.handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">インポート</h2>
          <p style={{color: 'grey'}}>
            1. <a style={{color: 'blue'}} href="https://kob3l.csb.app/" rel="noopener noreferrer">https://kob3l.csb.app/</a> を開いてください<br/>
            2. 開発者ツール ＞ Console より<span style={{color: 'green'}}>CopyToClipBoard(localStorage.AppSate)</span>を実行してください<br/>
            3. データ欄にコピペし、ルーレット名を入力後、インポートボタンを押してください<br/>
          </p>
          <div style={{textAlign: 'center'}}>
            <label style={{width: 100}}>ルーレット名</label>
            <div style={{margin: "10px 0"}}>
              <input/>
            </div>
            <label style={{width: 100}}>データ</label>
            <div style={{margin: "10px 0"}}>
              <input/>
            </div>
            <button onClick={props.handleClose}>インポート</button>
          </div>
        </Box>
      </StyledModal>
    </div>
  );
}
