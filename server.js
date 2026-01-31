import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/download", (req, res) => {
  const url = req.body.url;

  exec(`yt-dlp -g "${url}"`, (err, stdout) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({
        success: true,
        link: stdout.split("\n")[0]
      });
    }
  });
});

app.listen(process.env.PORT || 3000);
