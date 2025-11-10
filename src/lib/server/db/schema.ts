import { nas, type Nas } from './schema/nas';
import { radacct, type Radacct } from './schema/radacct';
import { radcheck, type RadCheck } from './schema/radcheck';
import { radgroupcheck, type RadGroupCheck } from './schema/radgroupcheck';
import { radgroupreply, type RadGroupReply } from './schema/radgroupreply';
import { radpostauth, type RadPostAuth } from './schema/radpostauth';
import { radreply, type RadReply } from './schema/radreply';
import { radusergroup, type RadUserGroup } from './schema/radusergroup';

export const schema = {
	nas,
	radacct,
	radcheck,
	radgroupcheck,
	radgroupreply,
	radpostauth,
	radreply,
	radusergroup
};

export {
	nas,
	radacct,
	radcheck,
	radgroupcheck,
	radgroupreply,
	radpostauth,
	radreply,
	radusergroup
};

export interface Schema {
	Nas: Nas;
	Radacct: Radacct;
	RadCheck: RadCheck;
	RadGroupCheck: RadGroupCheck;
	RadGroupReply: RadGroupReply;
	RadPostAuth: RadPostAuth;
	RadReply: RadReply;
	RadUserGroup: RadUserGroup;
}

export type {
	Nas,
	Radacct,
	RadCheck,
	RadGroupCheck,
	RadGroupReply,
	RadPostAuth,
	RadReply,
	RadUserGroup
};
