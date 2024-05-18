// function debounce(callback: Function, time: number) {
//   return () => {
//     debounceRef.current && clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(async () => {
//       debounceRef.current = null;
//       await callback(arguments);
//     }, time);
//   };
// }
export function SearchForm(props: {
  onChange: (searchTerm: string) => void;
}) {
  return <input type="text"
    className="input input-bordered w-full max-w-xs"
    placeholder="search..."
    onChange={e => {
      const searchTerm = e.currentTarget.value;
      props.onChange(searchTerm);
    }} />;

}
