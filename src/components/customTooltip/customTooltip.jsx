import { withStyles } from '@material-ui/core/styles';
import {
  Tooltip,
} from '@material-ui/core';
const CustomTooltip = withStyles((theme) => ({
  arrow: {
    color: '#262946',
},
tooltip: {
  backgroundColor: '#262946',
  color: 'rgba(170, 172, 174, 1)',
  boxShadow: theme.shadows[1],
  fontSize: 11,
  top:'-10px',
  textAlign:'left',
  padding: '8px 10px',
  '& span': {
    color: '#262946 !important',
  }
},
}))(Tooltip);

export default CustomTooltip;