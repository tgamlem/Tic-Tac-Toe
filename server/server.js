/** @format */

import path from "path";
import express from "express";
import api from "./api";
import fs from "fs";

const PORT = 3000;
const DIST_DIR = path.join(__dirname);

// create an empty web server
const app = express();

app.use(express.json());
app.use("/api", api);

// get files with the allowed extensions
app.get(/.(jpg|png|js|css)$/, (req, res) => {
	sanitizeUrl(req);

	checkContentEncoding(req, res);
	if (checkIfFileAllowed(req)) sendFile(req, res);
	else res.status(404).end();
});

// default the client to the home page
app.get("/", (req, res) => {
	const INDEX_URL = "/index.html";

	req.url = INDEX_URL;
	checkContentEncoding(req, res);
	sendFile(req, res);
});

// listen to the defined port for requests
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}...`);
});

// send compressed data to clients that can support gzip or brotli
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

// set content type of response based on the passed in filename
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

// only allow requests for files in the DIST_DIR
const checkIfFileAllowed = (req) => {
	if (fs.existsSync(DIST_DIR + req.url)) {
		return true;
	} else return false;
};

// send the response
const sendFile = (req, res) => {
	res.set("Content-Type", getContentType(req.url));
	if (!req.url.match(/.html/))
		res.set("Cache-control", "public, max-age=31536000");
	res.sendFile(DIST_DIR + req.url);
};

// trim any extra characters (mostly whitespace) off of url
const sanitizeUrl = (req) => {
	req.url = req.url.trim().toString();
};
