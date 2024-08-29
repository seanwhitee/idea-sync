/**
 *
 * @param {*} endPoint
 * @returns
 */
const useCustomFetch = (endPoint) => {
  const isLoading = ref(false);
  const error = ref(null);
  /**
   *
   * @param {*} headers
   * @param {*} [params]
   * @param {*} [body]
   * @param {*} method
   * @returns
   */
  const fetch = async (headers, params, body, method) => {
    isLoading.value = true;
    try {
      const data = await $fetch(endPoint, {
        method: method,
        headers: headers,
        params: params,
        body: body,
      });

      if (!data) {
        return;
      }
      isLoading.value = false;
      return data;
    } catch (e) {
      isLoading.value = false;
      throw new Error(`Failed to fetch on url: ${endPoint}`);
    }
  };
  return { fetch, isLoading };
};
export default useCustomFetch;
