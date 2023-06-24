export function useDebounce(
  setQuery: React.Dispatch<React.SetStateAction<any>>,
  prop: string,
  delay?: number
) {
  let timeoutId: any;

  const debounce = (val: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setQuery((state: any) => ({ ...state, [prop]: val }));
    }, delay || 1000);
  };

  return { debounce };
}
