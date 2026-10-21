/**
 * Joins the truthy class names into a single string.
 *
 * @param {...(string | false | null | undefined)} names
 * @returns {string}
 */
export function classNames(...names) {
    return names.filter(Boolean).join(' ')
}
