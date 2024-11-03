/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    tableName: params.tableName,
  };
}
