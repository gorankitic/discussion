// import { useCallback, useEffect, useState } from "react";

// // useAsync to trigger data fetching automatically on component mount
// export function useAsync(callback, dependencies = []) {
//     const { execute, ...state } = useAsyncInternal(callback, dependencies);

//     useEffect(() => {
//         execute();
//     }, [execute]);

//     return state;
// }

// // useAsyncFn to trigger data fetching (posting) manually in response to user actions
// export function useAsyncFn(callback, dependencies = []) {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [data, setData] = useState(null);

//     const execute = async (...args) => {
//         console.log(...args)
//         console.log(callback)
//         setLoading(true);
//         try {
//             const result = await callback(...args);
//             console.log(result)
//             setData(result);
//             return result
//         } catch (error) {
//             setError(error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     }

//     return { loading, error, data, execute };
// }