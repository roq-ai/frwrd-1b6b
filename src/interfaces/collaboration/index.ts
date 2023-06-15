import { UserInterface } from 'interfaces/user';
import { IdeaInterface } from 'interfaces/idea';
import { GetQueryInterface } from 'interfaces';

export interface CollaborationInterface {
  id?: string;
  user_id: string;
  idea_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  idea?: IdeaInterface;
  _count?: {};
}

export interface CollaborationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  idea_id?: string;
}
