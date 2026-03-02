/**
 * Vertical Templates — Index
 * ===========================
 * All 12 built-in vertical templates available to new tenants.
 */

const conventions = require('./conventions');
const weddings = require('./weddings');
const socialMedia = require('./social-media');
const restaurants = require('./restaurants');
const realEstate = require('./real-estate');
const musicVideos = require('./music-videos');
const podcasts = require('./podcasts');
const fitness = require('./fitness');
const nightlife = require('./nightlife');
const corporate = require('./corporate');
const medical = require('./medical');
const education = require('./education');

const ALL_VERTICALS = {
    conventions,
    weddings,
    'social-media': socialMedia,
    restaurants,
    'real-estate': realEstate,
    'music-videos': musicVideos,
    podcasts,
    fitness,
    nightlife,
    corporate,
    medical,
    education,
};

module.exports = {
    ALL_VERTICALS,
    conventions, weddings, socialMedia, restaurants,
    realEstate, musicVideos, podcasts, fitness,
    nightlife, corporate, medical, education,
};
