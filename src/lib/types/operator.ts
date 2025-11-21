/**
 * RADIUS Attribute Operatoren
 * @see https://wiki.freeradius.org/config/Operators
 */
export const RADIUS_OPERATORS = [
	/**
	 * Setzt den Wert, falls das Attribut noch nicht existiert.
	 * (check: nur server config / reply: hinzufügen falls nicht vorhanden)
	 */
	'=',

	/**
	 * Ersetzt vorhandene Attribute oder fügt sie hinzu.
	 * (check/reply)
	 */
	':=',

	/**
	 * Vergleicht, ob das Attribut existiert und exakt diesen Wert hat.
	 * (nur check)
	 */
	'==',

	/**
	 * Fügt einen weiteren Wert für das Attribut hinzu.
	 * (check/reply)
	 */
	'+=',

	/**
	 * Prüft, ob das Attribut existiert und NICHT diesen Wert hat.
	 * (nur check)
	 */
	'!=',

	/**
	 * Prüft, ob der Attributwert größer ist als der angegebene.
	 * (nur check)
	 */
	'>',

	/**
	 * Prüft, ob der Attributwert größer oder gleich ist.
	 * (nur check)
	 */
	'>=',

	/**
	 * Prüft, ob der Attributwert kleiner ist.
	 * (nur check)
	 */
	'<',

	/**
	 * Prüft, ob der Attributwert kleiner oder gleich ist.
	 * (nur check)
	 */
	'<=',

	/**
	 * Regulärer Ausdruck: matcht, wenn der Wert dem Regex entspricht.
	 * (nur check)
	 */
	'=~',

	/**
	 * Regulärer Ausdruck: matcht, wenn der Wert NICHT dem Regex entspricht.
	 * (nur check)
	 */
	'!~',

	/**
	 * Prüft nur, ob das Attribut existiert – Wert egal.
	 * (nur check)
	 */
	'=*',

	/**
	 * Prüft, ob das Attribut NICHT existiert – Wert egal.
	 * (nur check)
	 */
	'!*'
] as const;

/**
 * Typ, abgeleitet aus der Konstanten.
 */
export type RadiusOperator = (typeof RADIUS_OPERATORS)[number];
