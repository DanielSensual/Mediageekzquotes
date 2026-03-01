/**
 * Vertical Templates — Index
 * ===========================
 * All built-in vertical templates available to new tenants.
 */

const conventions = require('./conventions');
const weddings = require('./weddings');
const socialMedia = require('./social-media');
const restaurants = require('./restaurants');

const ALL_VERTICALS = { conventions, weddings, 'social-media': socialMedia, restaurants };

module.exports = { ALL_VERTICALS, conventions, weddings, socialMedia, restaurants };
