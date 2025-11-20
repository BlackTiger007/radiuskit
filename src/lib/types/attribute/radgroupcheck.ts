export const RADGROUPCHECK_ATTRIBUTES = [
	// Default
	'',

	// Standard-RADIUS-Attribute
	'User-Name',
	'User-Password',
	'NAS-IP-Address',
	'NAS-Port',
	'Service-Type',
	'Framed-IP-Address',
	'Framed-IP-Netmask',
	'Framed-MTU',
	'Called-Station-Id',
	'Calling-Station-Id',
	'NAS-Identifier',
	'Acct-Session-Id',
	'Acct-Status-Type',
	'Auth-Type',
	'Filter-Id',

	// Gruppen- und Policy-Attribute
	'Group-Name',
	'Max-Daily-Session',
	'Expiration',

	// Vendor-Specific Attributes (Beispiele)
	'Cisco-AVPair',
	'Mikrotik-Rate-Limit',
	'Mikrotik-Address-List',
	'Aruba-User-Role',
	'Juniper-Local-User-Name',
	'Juniper-Service-Type'
] as const;

export type RadGroupCheckAttribute = (typeof RADGROUPCHECK_ATTRIBUTES)[number];
