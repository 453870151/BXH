import { withStyles } from '@material-ui/core/styles';
import {
  Tooltip,
} from '@material-ui/core';
const OKEXCustomTooltip = withStyles((theme) => ({
  arrow: {
    color: '#262946',
},
tooltip: {
  backgroundColor: '#1e212a',
  color: 'rgba(170, 172, 174, 1)',
  boxShadow: theme.shadows[1],
  fontSize: 11,
  top:'-10px',
  textAlign:'left',
  padding: '8px 10px',
},
}))(Tooltip);

export default OKEXCustomTooltip;