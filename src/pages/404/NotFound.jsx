import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

function NotFound() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#25344C",
        color: "white",
      }}
    >
      <Box
        sx={{
          // '@keyframes stars': {
          //     '0%': { backgroundPosition: '-100% 100%' },
          //     '100%': { backgroundPosition: '0 0 ' }
          // },
          // animation: 'stars 12s linear infinite alternate',
          width: "100%",
          height: "100%",
          // backgroundImage: 'url("src/assets/404/particles.png")',
          backgroundImage:
            'url("https://res.cloudinary.com/doam999z1/image/upload/v1758882862/warp_ckbdri.jpg")',
          // backgroundSize: 'contain',
          backgroundSize: "cover",
          // backgroundRepeat: 'repeat',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "100px", fontWeight: 800 }}>
          404
        </Typography>
        <Typography
          sx={{
            fontSize: "18px !important",
            lineHeight: "25px",
            fontWeight: 400,
            maxWidth: "350px",
            textAlign: "center",
          }}
        >
          {/* Yo Bro Wtf&nbsp; */}
          PAGE NOT FOUND&nbsp;
          <br />
          <Typography
            variant="span"
            // sx={{
            // position: 'relative',
            // '&:after': {
            //     position: 'absolute',
            //     content: '""',
            //     borderBottom: '3px solid #fdba26',
            //     left: 0,
            //     top: '43%',
            //     width: '100%'
            // }
            //}}
          >
            {/*&nbsp;SPACE&nbsp;*/}
            {/* Lost in the{" "} */}
            Are you{" "}
            <Typography
              variant="span"
              sx={{ color: "#E90239", fontWeight: 500 }}
            >
              {/* Warp */}
              Lost
            </Typography>
          </Typography>
          &nbsp;
          {/* <Typography variant="span" sx={{ fontWeight: 500 }}>
            Bro
          </Typography> */}
          ?<br />
          {/* Better go back... */}
        </Typography>
        <Box sx={{ width: "390px", height: "390px", position: "relative" }}>
          <img
            src="/assets/404/astronaut.svg"
            alt="astronaut"
            className="w-[50px] h-[50px] absolute top-[20px] right-[25px] animate-spin"
          />
          <img src="/assets/404/planet.svg" alt="planet" />
        </Box>
        <Link to="/" style={{ textDecoration: "none" }}>
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
    </Box>
  );
}

export default NotFound;
