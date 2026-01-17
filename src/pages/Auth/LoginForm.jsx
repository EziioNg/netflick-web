import { Link, useSearchParams, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Zoom from "@mui/material/Zoom";
import Alert from "@mui/material/Alert";

import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";

import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { loginUserAPI } from "~/redux/user/userSlice";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log(errors)

  let [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get("registeredEmail");
  const verifiedEmail = searchParams.get("verifiedEmail");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLogIn = (data) => {
    // console.log('submit login: ', data)
    const { email, password } = data;
    toast
      .promise(dispatch(loginUserAPI({ email, password })), {
        pending: "Logging in...",
      })
      .then((res) => {
        // console.log(res)
        // nếu không có lỗi (login thành công) thì navigate về route /
        if (!res.error) {
          toast.success("Logged in successfully.");
          navigate("/user");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        <MuiCard
          // sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }
          sx={{
            minWidth: 380,
            maxWidth: 380,
            marginTop: "6em",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.15)", // lớp nền mờ trong suốt
            backdropFilter: "blur(5px)", // làm mờ nền phía sau
            WebkitBackdropFilter: "blur(3px)", // cho Safari
            border: "1px solid rgba(255, 255, 255, 0.3)", // viền mờ
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", // đổ bóng nhẹ
          }}
        >
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <LockIcon />
            </Avatar>
            {/*<img src="https://res.cloudinary.com/doam999z1/image/upload/v1754643053/1290288805177200681_bwonbr.png" alt="lock-icon"/>*/}
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/*Inquisitor*/}
            Welcome
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0 1em",
            }}
          >
            {verifiedEmail && (
              <Alert
                severity="success"
                // sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
                sx={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(3px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  ".MuiAlert-message": { overflow: "hidden" },
                }}
              >
                Your email&nbsp;
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold", "&:hover": { color: "#fdba26" } }}
                >
                  {verifiedEmail}
                </Typography>
                &nbsp;has been verified.
                <br />
                Now you can login to enjoy our services! Have a good day!
              </Alert>
            )}
            {registeredEmail && (
              <Alert
                severity="info"
                // sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
                sx={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(3px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  ".MuiAlert-message": { overflow: "hidden" },
                }}
              >
                An email has been sent to&nbsp;
                <Typography
                  variant="span"
                  sx={{ fontWeight: "bold", "&:hover": { color: "#fdba26" } }}
                >
                  {registeredEmail}
                </Typography>
                <br />
                Please check and verify your account before logging in!
              </Alert>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Box>
              <Typography>Hint: thphong16902@gmail.com</Typography>
              <Typography>Pass: Aa@123456</Typography>
            </Box>
          </Box>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                // autoComplete="nope"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255,255,255,0.1)", // giữ trong suốt
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fdba26", // border khi focus
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "rgba(255,255,255,0.9)", // màu chữ
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255,255,255,0.7)", // màu label
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fdba26", // màu label khi focus
                  },
                }}
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
                error={!!errors["email"]} // boolean kiểm tra nếu có lỗi
                {...register("email", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE,
                  },
                })}
              />
              {/* truyền errors của useForm cho prop errors của FieldErrorAlert nếu có lỗi */}
              <FieldErrorAlert errors={errors} fieldName={"email"} />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255,255,255,0.1)", // giữ trong suốt
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fdba26", // border khi focus
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "rgba(255,255,255,0.9)", // màu chữ
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255,255,255,0.7)", // màu label
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fdba26", // màu label khi focus
                  },
                }}
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                error={!!errors["password"]} // boolean kiểm tra nếu có lỗi
                {...register("password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                })}
              />
              {/* truyền errors của useForm cho prop errors của FieldErrorAlert nếu có lỗi */}
              <FieldErrorAlert errors={errors} fieldName={"password"} />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              className="interceptor-loading"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "12px",
                "&:hover": {
                  background: "rgba(0,0,0,0.8)",
                },
              }}
            >
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: "0 1em 1em 1em", textAlign: "center" }}>
            <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
              No Account?
            </Typography>
            <Link
              to="/register"
              style={{ textDecoration: "none", background: "none" }}
            >
              <Typography
                // sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
                sx={{
                  fontWeight: "bold",
                  color: "rgba(0,0,0,0.6)",
                  "&:hover": { color: "rgba(0,0,0,0.8)" },
                }}
              >
                Create one!
              </Typography>
            </Link>
            <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
              Forgot Password?
            </Typography>
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", background: "none" }}
            >
              <Typography
                // sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
                sx={{
                  fontWeight: "bold",
                  color: "rgba(0,0,0,0.6)",
                  "&:hover": { color: "rgba(0,0,0,0.8)" },
                }}
              >
                Reset your password!
              </Typography>
            </Link>
            <Link to="/" style={{ textDecoration: "none", background: "none" }}>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  borderColor: "white",
                  "&:hover": { color: "#fdba26", borderColor: "#fdba26" },
                }}
              >
                Go Home
              </Button>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  );
}

export default LoginForm;
