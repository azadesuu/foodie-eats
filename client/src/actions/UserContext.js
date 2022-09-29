import { createContext } from "react";

export const UserContext = createContext(null);

// export function createStrictContext(options = {}) {
//     const Context = React.createContext(undefined);
//     Context.displayName = options.name; // for DevTools

//     function useContext() {
//       const context = React.useContext(Context);
//       if (context === undefined) {
//         throw new Error(
//           options.errorMessage || `${name || ""} Context Provider is missing`
//         );
//       }
//       return context;
//     }

//     return [Context.Provider, useContext];
//   }

//   export const [BananaProvider, useBanana] = createStrictContext()
