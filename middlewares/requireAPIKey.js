const requireAPIKey = (req, res, next) => {
    const apiKey = req.headers.apikey;
    if (!apiKey) {
        return res.status(401).json({ error: 'API key is required.' });
    }
    next();
};

module.exports = requireAPIKey;
