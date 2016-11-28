var jade = require('pug-runtime'); module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (getLocale, hash, onboarding, t) {
buf.push("<!DOCTYPE html><html" + (jade.attr("lang", getLocale().language, true, true)) + "><meta charset=\"utf-8\"><title>" + (jade.escape((jade_interp = t('error title')) == null ? '' : jade_interp)) + "</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"apple-touch-icon\" sizes=\"57x57\" href=\"/apple-touch-icon-57x57.png\"><link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"/apple-touch-icon-60x60.png\"><link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"/apple-touch-icon-72x72.png\"><link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"/apple-touch-icon-76x76.png\"><link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"/apple-touch-icon-114x114.png\"><link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"/apple-touch-icon-120x120.png\"><link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"/apple-touch-icon-144x144.png\"><link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"/apple-touch-icon-152x152.png\"><link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon-180x180.png\"><link rel=\"icon\" type=\"image/png\" href=\"/favicon-32x32.png\" sizes=\"32x32\"><link rel=\"icon\" type=\"image/png\" href=\"/favicon-194x194.png\" sizes=\"194x194\"><link rel=\"icon\" type=\"image/png\" href=\"/favicon-96x96.png\" sizes=\"96x96\"><link rel=\"icon\" type=\"image/png\" href=\"/android-chrome-192x192.png\" sizes=\"192x192\"><link rel=\"icon\" type=\"image/png\" href=\"/favicon-16x16.png\" sizes=\"16x16\"><link rel=\"manifest\" href=\"/manifest.json\"><meta name=\"msapplication-TileColor\" content=\"#20a8f1\"><meta name=\"msapplication-TileImage\" content=\"/mstile-144x144.png\"><meta name=\"theme-color\" content=\"#20a8f1\"><link rel=\"stylesheet\" href=\"/fonts/fonts.css\"><link rel=\"stylesheet\"" + (jade.attr("href", "/common" + (hash) + ".css", true, true)) + "><link rel=\"stylesheet\"" + (jade.attr("href", "/" + (onboarding?'onboarding':'app') + "" + (hash) + ".css", true, true)) + "><main role=\"application\"><section class=\"popup\"><header></header><div class=\"container\"><h1>" + (jade.escape(null == (jade_interp = t('error headline')) ? "" : jade_interp)) + "</h1><p>" + (jade.escape(null == (jade_interp = t('error reinsurance')) ? "" : jade_interp)) + "</p><p>" + (jade.escape(null == (jade_interp = t('error try to fix')) ? "" : jade_interp)) + "</p><ul><li>" + (jade.escape(null == (jade_interp = t('error wait a bit')) ? "" : jade_interp)) + "</li><li>" + (jade.escape(null == (jade_interp = t('error restart app')) ? "" : jade_interp)) + "</li><li>" + (jade.escape(null == (jade_interp = t('error reinstall app')) ? "" : jade_interp)) + "</li></ul><footer><p>" + (jade.escape(null == (jade_interp = t('error contact cozy team')) ? "" : jade_interp)) + "</p><ul><li>" + (jade.escape(null == (jade_interp = t('error contact forum')) ? "" : jade_interp)) + "<br><a href=\"https://forum.cozy.io\">https://forum.cozy.io</a></li><li>" + (jade.escape(null == (jade_interp = t('error contact email')) ? "" : jade_interp)) + "</li><li>" + (jade.escape(null == (jade_interp = t('error contact irc')) ? "" : jade_interp)) + "</li></ul></footer></div></section></main></html>");}.call(this,"getLocale" in locals_for_with?locals_for_with.getLocale:typeof getLocale!=="undefined"?getLocale:undefined,"hash" in locals_for_with?locals_for_with.hash:typeof hash!=="undefined"?hash:undefined,"onboarding" in locals_for_with?locals_for_with.onboarding:typeof onboarding!=="undefined"?onboarding:undefined,"t" in locals_for_with?locals_for_with.t:typeof t!=="undefined"?t:undefined));;return buf.join("");
}