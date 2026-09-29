/** 서버 API를 붙일 때 사용할 공통 query key입니다. 아직 API는 연결하지 않습니다. */
export const queryKeys = {
  tasks: ['tasks'] as const,
  places: ['places'] as const,
  sharedLists: ['shared-lists'] as const,
};
