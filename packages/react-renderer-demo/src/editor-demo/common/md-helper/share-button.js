import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import ShareIcon from '@material-ui/icons/Share';

class ShareButton extends React.Component {
    state = {
      openTooltip: false,
    }

    handleTooltipClose = () => {
      this.setState({ openTooltip: false });
    }

    handleTooltipOpen = () => {
      this.setState({ openTooltip: true });
    }

    render() {
      const { text } = this.props;
      const { openTooltip } = this.state;

      return <ClickAwayListener onClickAway={ this.handleTooltipClose }>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={ this.handleTooltipClose  }
          open={ openTooltip }
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Copied"
        >
          <CopyToClipboard text={ `${window.location.href.replace(/#.*/, '')}#${text}` } onCopy={ this.handleTooltipOpen }>
            <Button size="small">
              <ShareIcon fontSize="small" />
            </Button>
          </CopyToClipboard>
        </Tooltip>
      </ClickAwayListener>;
    }
}

export default ShareButton;
