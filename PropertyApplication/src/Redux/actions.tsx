export const ADD_PROPERTY = 'ADD_PROPERTY';
export const REMOVE_PROPERTY = 'REMOVE_PROPERTY';

export const addProperty = (property: any) => ({
  type: ADD_PROPERTY,
  payload: property,
});

export const removeProperty = (id: string) => ({
  type: REMOVE_PROPERTY,
  payload: id,
});
