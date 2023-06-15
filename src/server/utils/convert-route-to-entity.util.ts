const mapping: Record<string, string> = {
  collaborations: 'collaboration',
  feedbacks: 'feedback',
  ideas: 'idea',
  organizations: 'organization',
  tasks: 'task',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
