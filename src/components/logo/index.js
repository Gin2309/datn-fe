import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui
import { ButtonBase, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { activeItem } from "../../store/reducers/menu";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? "users" : to}
      sx={sx}
    >
      <Typography variant="h3" gutterBottom>
        DiNgay LaDi
      </Typography>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
