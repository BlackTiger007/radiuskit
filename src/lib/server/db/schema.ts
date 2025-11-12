import { nas, type Nas } from './schema/nas';
import { radacct, type Radacct } from './schema/radacct';
import { radcheck, type RadCheck } from './schema/radcheck';
import { radgroupcheck, type RadGroupCheck } from './schema/radgroupcheck';
import { radgroupreply, type RadGroupReply } from './schema/radgroupreply';
import { radpostauth, type RadPostAuth } from './schema/radpostauth';
import { radreply, type RadReply } from './schema/radreply';
import { radusergroup, type RadUserGroup } from './schema/radusergroup';
import { nasreload, type NasReload } from './schema/nasreload';
import { session, type Session } from './schema/session';
import { user, type User } from './schema/user';

export const schema = {
	nas,
	radacct,
	radcheck,
	radgroupcheck,
	radgroupreply,
	radpostauth,
	radreply,
	radusergroup,
	nasreload,
	session,
	user
};

export {
	nas,
	radacct,
	radcheck,
	radgroupcheck,
	radgroupreply,
	radpostauth,
	radreply,
	radusergroup,
	nasreload,
	session,
	user
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
	NasReload: NasReload;
	Session: Session;
	User: User;
}

export type {
	Nas,
	Radacct,
	RadCheck,
	RadGroupCheck,
	RadGroupReply,
	RadPostAuth,
	RadReply,
	RadUserGroup,
	NasReload,
	Session,
	User
};
