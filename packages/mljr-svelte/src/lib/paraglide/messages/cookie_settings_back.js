/* eslint-disable */
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer, experimentalStaticLocale } from '../runtime.js';
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

const en_cookie_settings_back = /** @type {(inputs: {}) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to banner`)
};

const de_cookie_settings_back = /** @type {(inputs: {}) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zurück zum Banner`)
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{}} inputs
* @param {{ locale?: "en" | "de" }} options
* @returns {LocalizedString}
*/
/* @__NO_SIDE_EFFECTS__ */
export const cookie_settings_back = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.cookie_settings_back(inputs) 
	}
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	trackMessageCall("cookie_settings_back", locale)
	if (locale === "en") return en_cookie_settings_back(inputs)
	return de_cookie_settings_back(inputs)
};