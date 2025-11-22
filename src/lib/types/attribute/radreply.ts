export const RADREPLAY_ATTRIBUTES = [
	// Default / generisch
	'',

	// Session Management
	'Session-Timeout', // maximale Sitzungsdauer in Sekunden
	'Idle-Timeout', // maximale Inaktivitätsdauer in Sekunden
	'Termination-Action', // Aktion bei Timeout (z.B. Disconnect)

	// Access Control / Auth
	'Framed-IP-Address', // zugewiesene IP-Adresse
	'Framed-IP-Netmask', // Netzmaske
	'Framed-Routing', // Routing-Typ
	'Framed-MTU', // MTU-Größe
	'Framed-Compression', // Kompressionsmethode

	// Accounting / Logging
	'Acct-Interim-Interval', // Intervall für Interim-Accounting
	'Acct-Session-Id', // Session-ID für Accounting

	// VLAN / QoS
	'Tunnel-Type', // z.B. VLAN, PPTP, L2TP
	'Tunnel-Medium-Type', // Typ des Tunnels
	'Tunnel-Private-Group-Id', // VLAN-ID
	'Class', // Klassifizierungsattribut für QoS

	// Vendor Specific Attributes (VSA)
	'Cisco-AVPair', // Cisco-spezifische Attribute
	'MikroTik-Rate-Limit', // Bandbreitenbegrenzung (Vendor spezifisch)
	'WISPr-Bandwidth-Max-Up', // WISPr spezifisch
	'WISPr-Bandwidth-Max-Down', // WISPr spezifisch

	// Messages / Notifications
	'Reply-Message', // Textnachricht an Client
	'Login-IP-Host', // Client-IP
	'Login-Service', // Service-Typ
	'Login-TCP-Port', // Portnummer

	// Authentication / Security
	'CHAP-Challenge', // CHAP Challenge für Authentifizierung
	'EAP-Message', // EAP-Message für Auth
	'Message-Authenticator' // Prüfsumme/Authentifizierung
] as const;

export type RadReplayAttribute = (typeof RADREPLAY_ATTRIBUTES)[number];
