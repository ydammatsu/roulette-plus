import ModalUnstyled from "@mui/core/ModalUnstyled";
import { styled, Box } from "@mui/system";
import { Candidate } from "../stateManagement/states";

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
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  border: "2px solid #000",
  borderRadius: 15,
  p: 2,
  px: 4,
  pb: 3
};

export default function ModalUnstyledDemo(props: {
  winner: Candidate;
  open: boolean;
  handleClose: () => void;
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
          <h2 id="unstyled-modal-title">The winner is</h2>
          <h3 id="unstyled-modal-description">{props.winner.name} 🎉</h3>
        </Box>
      </StyledModal>
    </div>
  );
}
