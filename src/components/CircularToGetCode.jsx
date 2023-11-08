import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CircularTogetCode() {
  const [timer, setTimer] = React.useState(120);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        if (progress > 0) {
          setProgress(progress - 100 / 120);
        }
      } else {
        clearInterval(timerInterval);
        setTimer('time over')
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, progress]);

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div">
          {timer}
        </Typography>
      </Box>
    </Box>
  );
}
