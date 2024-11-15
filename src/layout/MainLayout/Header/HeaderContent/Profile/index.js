import PropTypes from "prop-types";
import { useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// project import
import MainCard from "../../../../../components/MainCard";
import Transitions from "../../../../../components/@extended/Transitions";

// assets
import { LogoutOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../store/reducers/auth";
import avatar from "../../../../../assets/images/users/Avatar.svg";

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const roleLabels = {
  admin: "Admin",
  teacher: "Giáo viên",
  student: "Học sinh",
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    localStorage.removeItem("tokens");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            src={avatar}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle1">{user?.username}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                            onClick={() => navigate("/admin/profile")}
                            className="cursor-pointer"
                          >
                            <Avatar
                              alt="profile user"
                              src={avatar}
                              sx={{ width: 32, height: 32 }}
                            />
                            <Stack>
                              <Typography variant="h6">
                                {user?.username}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {roleLabels[user?.role]}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Đăng xuất">
                            <IconButton
                              size="large"
                              color="secondary"
                              onClick={handleLogout}
                            >
                              <LogoutOutlined />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
