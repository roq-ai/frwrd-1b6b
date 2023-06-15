import { IdeaInterface } from 'interfaces/idea';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  title: string;
  description?: string;
  status: string;
  idea_id: string;
  created_at?: any;
  updated_at?: any;

  idea?: IdeaInterface;
  _count?: {};
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  idea_id?: string;
}
