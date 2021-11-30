/** @format */

const path = require("path");
const express = require("express");
// const api = require("./api");
const fs = require("fs");

const PORT = 3000;
const DIST_DIR = path.join(__dirname);

const app = express();

app.use(express.json());
// app.use("/api", api);

app.get(/.(jpg|png|js|css)$/, (req, res) => {
	sanitizeUrl(req);

	checkContentEncoding(req, res);
	if (checkIfFileAllowed(req)) sendFile(req, res);
	else res.status(404).end();
});

app.get(/.ico$/, (req, res) => {
	req.url = "/favicon.ico";
	sendFile(req, res);
});

app.get("/", (req, res) => {
	const INDEX_URL = "/index.html";

	req.url = INDEX_URL;
	checkContentEncoding(req, res);
	sendFile(req, res);
});

app.listen(PORT, () => {
	console.log(`App listening to ${PORT}...`);
});

const checkContentEncoding = (req, res) => {
	if (req.url.match(/.jpg|.png$/)) return;
	else if (req.acceptsEncodings("br")) {
		req.url += ".br";
		res.set("Content-Encoding", "br");
	} else if (req.acceptsEncodings("gzip")) {
		req.url += ".gz";
		res.set("Content-Encoding", "gzip");
	}
};

const getContentType = (fileName) => {
	if (fileName.match(/.js(.br|.gz)?$/)) return "text/javascript";
	else if (fileName.match(/.css(.br|.gz)?$/)) return "text/css";
	else if (fileName.match(/.html(.br|.gz)?$/)) return "text/html";
	else if (fileName.match(/.jpg(.br|.gz)?|.jpeg(.br|.gz)?$/))
		return "image/jpeg";
	else if (fileName.match(/.png(.br|.gz)?$/)) return "image/png";
	else if (fileName.match(/.ico$/)) return "image/vnd.microsoft.icon";
	else {
		console.error("Broken: ", fileName);
		return "";
	}
};

const checkIfFileAllowed = (req) => {
	if (fs.existsSync(DIST_DIR + req.url)) {
		return true;
	} else return false;
};

const sendFile = (req, res) => {
	res.set("Content-Type", getContentType(req.url));
	if (!req.url.match(/.html/))
		res.set("Cache-control", "public, max-age=31536000");
	res.sendFile(DIST_DIR + req.url);
};

const sanitizeUrl = (req) => {
	req.url = req.url.trim().toString();
};
