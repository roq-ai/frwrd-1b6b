import { CollaborationInterface } from 'interfaces/collaboration';
import { FeedbackInterface } from 'interfaces/feedback';
import { TaskInterface } from 'interfaces/task';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface IdeaInterface {
  id?: string;
  title: string;
  description?: string;
  innovator_id: string;
  created_at?: any;
  updated_at?: any;
  collaboration?: CollaborationInterface[];
  feedback?: FeedbackInterface[];
  task?: TaskInterface[];
  user?: UserInterface;
  _count?: {
    collaboration?: number;
    feedback?: number;
    task?: number;
  };
}

export interface IdeaGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  innovator_id?: string;
}
