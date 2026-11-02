export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    service: "VideoFetch API",
    status: "ready",
    capabilities: ["health-check"],
    note: "This API does not extract media from third-party webpage URLs or bypass site restrictions."
  });
}
